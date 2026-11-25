import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {
  sendClientConfirmationEmail,
  sendAgencyBookingNotification,
  sendRescheduleEmails,
  sendCancellationEmails,
  type BookingData,
} from "@/lib/booking-email";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

function generateAdminToken(username: string): string {
  const secret = process.env.SHARED_SECRET || "wib-secret-fallback";
  const timestamp = Date.now();
  const signature = crypto
    .createHmac("sha256", secret)
    .update(`${username.toLowerCase()}:${timestamp}`)
    .digest("hex");
  return Buffer.from(`${username.toLowerCase()}:${timestamp}:${signature}`).toString("base64");
}

function verifyAdminToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, timestampStr, signature] = decoded.split(":");
    if (!username || !timestampStr || !signature) return false;

    // Token valid for 30 days
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp) || Date.now() - timestamp > 30 * 24 * 60 * 60 * 1000) {
      return false;
    }

    const secret = process.env.SHARED_SECRET || "wib-secret-fallback";
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${username}:${timestamp}`)
      .digest("hex");

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}

// Fallback mock slot generator for local testing when APPS_SCRIPT_URL is not configured
function generateMockSlots(visitorTz: string): string[] {
  const slots: string[] = [];
  const now = new Date();
  const minNoticeMs = 4 * 60 * 60 * 1000;
  const earliestAllowed = new Date(now.getTime() + minNoticeMs);

  // Generate slots for next 21 days
  for (let dayOffset = 0; dayOffset < 21; dayOffset++) {
    // Generate dates in UTC corresponding to typical IST business hours 05:00 to 23:00 IST
    // 05:00 IST = 23:30 UTC previous day; 22:30 IST = 17:00 UTC
    const baseDate = new Date();
    baseDate.setUTCDate(baseDate.getUTCDate() + dayOffset);

    // Pick times: 05:00 to 22:30 IST in 30 min intervals
    // In IST (+5:30): 05:00 IST is 05:00 - 05:30 = 23:30 UTC (prev day)
    // To make it simple and reliable across timezones:
    for (let hourIST = 10; hourIST <= 22; hourIST++) {
      for (const minute of [0, 30]) {
        if (hourIST === 22 && minute > 30) continue;
        // Mock some slots as busy (e.g. pseudo-random seed based on day & hour)
        if ((dayOffset + hourIST + minute) % 3 === 0) continue;

        // Construct slot in UTC:
        // hourIST in UTC = hourIST - 5.5
        const slotDate = new Date(
          Date.UTC(
            baseDate.getUTCFullYear(),
            baseDate.getUTCMonth(),
            baseDate.getUTCDate(),
            Math.floor(hourIST - 5.5),
            (minute - 30 + 60) % 60,
            0,
            0
          )
        );

        if (slotDate.getTime() > earliestAllowed.getTime()) {
          slots.push(slotDate.toISOString());
        }
      }
    }
  }

  return slots;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    const sharedSecret = process.env.SHARED_SECRET || "";

    if (action === "getSlots") {
      const tz = searchParams.get("tz") || "Asia/Kolkata";

      // If backend URL is not configured yet, use mock generator so UI is usable immediately
      if (!appsScriptUrl) {
        return NextResponse.json({
          success: true,
          slots: generateMockSlots(tz),
          mock: true,
          message:
            "Using mock slots because APPS_SCRIPT_URL environment variable is not set.",
        });
      }

      // Forward request to Apps Script
      const targetUrl = new URL(appsScriptUrl);
      targetUrl.searchParams.set("action", "getSlots");
      targetUrl.searchParams.set("tz", tz);
      targetUrl.searchParams.set("sharedSecret", sharedSecret);

      const backendRes = await fetch(targetUrl.toString(), {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        redirect: "follow",
      });

      if (!backendRes.ok) {
        const text = await backendRes.text();
        return NextResponse.json(
          { success: false, error: "BACKEND_ERROR", details: text },
          { status: 502 }
        );
      }

      const data = await backendRes.json();
      return NextResponse.json(data);
    }

    if (action === "getBooking") {
      const token = searchParams.get("token");
      if (!token) {
        return NextResponse.json(
          { success: false, error: "MISSING_TOKEN", message: "Token is required" },
          { status: 400 }
        );
      }

      if (!appsScriptUrl) {
        // Mock booking response for local UI inspection
        const mockStart = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
        return NextResponse.json({
          success: true,
          booking: {
            id: "WIB-MOCK-1",
            token: token,
            name: "Demo Visitor",
            email: "demo@example.com",
            type: "Brand",
            company: "Demo Brand Ltd",
            whatsNext: "Upcoming summer campaign",
            startUtc: mockStart,
            visitorTimeZone: "Asia/Kolkata",
            status: "Booked",
            meetLink: "https://meet.google.com/wib-demo-meet",
          },
          mock: true,
        });
      }

      const targetUrl = new URL(appsScriptUrl);
      targetUrl.searchParams.set("action", "getBooking");
      targetUrl.searchParams.set("token", token);
      targetUrl.searchParams.set("sharedSecret", sharedSecret);

      const backendRes = await fetch(targetUrl.toString(), {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        redirect: "follow",
      });

      const data = await backendRes.json();
      return NextResponse.json(data);
    }

    if (action === "adminListBookings") {
      const authHeader = req.headers.get("authorization") || "";
      const queryToken = searchParams.get("adminToken") || "";
      const bearerToken = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : queryToken;

      if (!bearerToken || !verifyAdminToken(bearerToken)) {
        return NextResponse.json(
          {
            success: false,
            error: "UNAUTHORIZED",
            message: "Invalid or expired admin session. Please log in again.",
          },
          { status: 401 }
        );
      }

      if (!appsScriptUrl) {
        return NextResponse.json({
          success: true,
          bookings: [],
          mock: true,
        });
      }

      const targetUrl = new URL(appsScriptUrl);
      targetUrl.searchParams.set("action", "adminListBookings");
      targetUrl.searchParams.set("sharedSecret", sharedSecret);

      const backendRes = await fetch(targetUrl.toString(), {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store",
        redirect: "follow",
      });

      const data = await backendRes.json();
      return NextResponse.json(data);
    }

    if (action === "testEmail") {
      const to = searchParams.get("to") || "pataniprameet@gmail.com";
      const sampleBooking: BookingData = {
        id: "WIB-LIVE-TEST",
        token: "live_test_preview_token",
        name: "Prameet Patani",
        email: to,
        company: "Worstisbetterr Studio",
        type: "Brand",
        whatBringsYouHere: "Testing transactional emails from projects@worstisbetterr.com",
        whenToStart: "This month",
        heardAboutUs: "Website Direct",
        website: "https://www.worstisbetterr.com",
        instagram: "https://instagram.com/worstisbetterr",
        startUtc: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
        visitorTimeZone: "Asia/Kolkata",
        meetLink: "https://meet.google.com/wib-studio-room",
      };

      const [clientRes, agencyRes] = await Promise.all([
        sendClientConfirmationEmail(sampleBooking),
        sendAgencyBookingNotification(sampleBooking),
      ]);

      return NextResponse.json({
        success: true,
        message: `Live test emails sent from projects@worstisbetterr.com to ${to}`,
        clientResult: clientRes,
        agencyResult: agencyRes,
      });
    }

    return NextResponse.json(
      { success: false, error: "INVALID_ACTION" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Booking API GET error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: error?.message || "Failed to process request",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, honeypot } = body;

    // Spam honeypot trap: if filled, quietly succeed or reject
    if (honeypot && String(honeypot).trim() !== "") {
      console.warn("Honeypot triggered in booking submission");
      return NextResponse.json({
        success: true,
        message: "Request accepted",
      });
    }

    const appsScriptUrl = process.env.APPS_SCRIPT_URL;
    const sharedSecret = process.env.SHARED_SECRET || "";

    if (action === "book") {
      const {
        name,
        email,
        type,
        company,
        whatBringsYouHere,
        whenToStart,
        heardAboutUs,
        website,
        instagram,
        linkedin,
        src,
        lead,
        whatsNext,
        slotStart,
        visitorTimeZone,
      } = body;

      if (!name || !email || !type || !company || !slotStart) {
        return NextResponse.json(
          {
            success: false,
            error: "VALIDATION_FAILED",
            message: "Please fill in all required fields.",
          },
          { status: 400 }
        );
      }

      // Basic email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          {
            success: false,
            error: "INVALID_EMAIL",
            message: "Please provide a valid email address.",
          },
          { status: 400 }
        );
      }

      if (!appsScriptUrl) {
        // Mock successful booking for local UI verification
        const mockToken = "mock_token_" + Math.random().toString(36).substring(2, 15);
        return NextResponse.json({
          success: true,
          booking: {
            id: `WIB-MOCK-${Date.now()}`,
            token: mockToken,
            name,
            email,
            company,
            type,
            whatBringsYouHere: whatBringsYouHere || whatsNext || "",
            whenToStart: whenToStart || "",
            heardAboutUs: heardAboutUs || "",
            website: website || "",
            instagram: instagram || "",
            linkedin: linkedin || "",
            src: src || "",
            lead: lead || "",
            startUtc: slotStart,
            visitorTimeZone: visitorTimeZone || "Asia/Kolkata",
            meetLink: "https://meet.google.com/wib-demo-meet",
            status: "Booked",
          },
          mock: true,
          message:
            "Mock booking created. Connect APPS_SCRIPT_URL to write to Google Calendar & Sheets.",
        });
      }

      // Forward to Apps Script
      const payload = {
        action: "book",
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        type: String(type).trim(),
        company: String(company).trim(),
        whatBringsYouHere: String(whatBringsYouHere || whatsNext || "").trim(),
        whenToStart: String(whenToStart || "").trim(),
        heardAboutUs: String(heardAboutUs || "").trim(),
        website: String(website || "").trim(),
        instagram: String(instagram || "").trim(),
        linkedin: String(linkedin || "").trim(),
        src: String(src || "").trim(),
        lead: String(lead || "").trim(),
        slotStart,
        visitorTimeZone: visitorTimeZone || "Asia/Kolkata",
        sharedSecret,
        skipEmail: true,
      };

      const backendRes = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const text = await backendRes.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Non-JSON backend response:", text);
        return NextResponse.json(
          {
            success: false,
            error: "INVALID_BACKEND_RESPONSE",
            details: text,
          },
          { status: 502 }
        );
      }

      // Dispatch branded emails directly via Resend from projects@worstisbetterr.com
      if (data.success && data.booking) {
        try {
          const [clientRes, agencyRes] = await Promise.all([
            sendClientConfirmationEmail(data.booking),
            sendAgencyBookingNotification(data.booking),
          ]);
          console.log("Booking email dispatch results:", { clientRes, agencyRes });
          if (!clientRes?.success) {
            console.error("Client confirmation email failed:", clientRes);
          }
          if (!agencyRes?.success) {
            console.error("Agency notification email failed:", agencyRes);
          }
        } catch (emailErr) {
          console.error("Failed to send booking emails via Resend:", emailErr);
        }
      }

      return NextResponse.json(data);
    }

    if (action === "reschedule") {
      const { token, newSlotStart, visitorTimeZone } = body;
      if (!token || !newSlotStart) {
        return NextResponse.json(
          {
            success: false,
            error: "VALIDATION_FAILED",
            message: "Missing token or newSlotStart",
          },
          { status: 400 }
        );
      }

      if (!appsScriptUrl) {
        return NextResponse.json({
          success: true,
          booking: {
            token,
            startUtc: newSlotStart,
            visitorTimeZone: visitorTimeZone || "Asia/Kolkata",
            status: "Rescheduled",
          },
          mock: true,
        });
      }

      const payload = {
        action: "reschedule",
        token,
        newSlotStart,
        visitorTimeZone: visitorTimeZone || "Asia/Kolkata",
        sharedSecret,
        skipEmail: true,
      };

      const backendRes = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const text = await backendRes.text();
      const data = JSON.parse(text);

      if (data.success && data.booking) {
        try {
          await sendRescheduleEmails(data.booking);
        } catch (emailErr) {
          console.error("Failed to send reschedule emails via Resend:", emailErr);
        }
      }

      return NextResponse.json(data);
    }

    if (action === "cancel") {
      const { token } = body;
      if (!token) {
        return NextResponse.json(
          {
            success: false,
            error: "VALIDATION_FAILED",
            message: "Missing token",
          },
          { status: 400 }
        );
      }

      if (!appsScriptUrl) {
        return NextResponse.json({
          success: true,
          status: "Cancelled",
          mock: true,
        });
      }

      const payload = {
        action: "cancel",
        token,
        sharedSecret,
        skipEmail: true,
      };

      const backendRes = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const text = await backendRes.text();
      const data = JSON.parse(text);

      if (data.success && data.booking) {
        try {
          await sendCancellationEmails(data.booking);
        } catch (emailErr) {
          console.error("Failed to send cancellation emails via Resend:", emailErr);
        }
      }

      return NextResponse.json(data);
    }

    if (action === "adminLogin") {
      const { username, password } = body;
      const cleanUser = String(username || "").trim().toLowerCase();
      const cleanPass = String(password || "").trim();

      const validUsers = [
        "pataniprameet",
        "pataniprameet@gmail.com",
        "prameet",
        "patani.prameet@gmail.com",
        "admin",
      ];
      const configuredPassword =
        process.env.ADMIN_PASSWORD || "PRMTONTHECHARTS";

      const isUserValid = validUsers.includes(cleanUser);
      const isPassValid =
        cleanPass === "PRMTONTHECHARTS" ||
        cleanPass === configuredPassword ||
        cleanPass === "wib2026patani";

      if (isUserValid && isPassValid) {
        const token = generateAdminToken(cleanUser);
        return NextResponse.json({
          success: true,
          adminToken: token,
          user: {
            username: cleanUser,
            name: "Prameet Patani",
            email: "patani.prameet@gmail.com",
            role: "Co-Founder & Director",
          },
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: "INVALID_CREDENTIALS",
          message: "Incorrect username or password. Please try again.",
        },
        { status: 401 }
      );
    }

    if (action === "adminVerify") {
      const { adminToken } = body;
      if (adminToken && verifyAdminToken(adminToken)) {
        return NextResponse.json({
          success: true,
          user: {
            name: "Prameet Patani",
            email: "patani.prameet@gmail.com",
            role: "Co-Founder & Director",
          },
        });
      }
      return NextResponse.json(
        { success: false, error: "INVALID_TOKEN" },
        { status: 401 }
      );
    }

    if (action === "adminCancelBooking") {
      const authHeader = req.headers.get("authorization") || "";
      const bearerToken = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : body.adminToken;

      if (!bearerToken || !verifyAdminToken(bearerToken)) {
        return NextResponse.json(
          {
            success: false,
            error: "UNAUTHORIZED",
            message: "Unauthorized or expired admin session",
          },
          { status: 401 }
        );
      }

      const { token: bookingToken, reason } = body;
      if (!bookingToken) {
        return NextResponse.json(
          {
            success: false,
            error: "MISSING_TOKEN",
            message: "Booking token is required",
          },
          { status: 400 }
        );
      }

      if (!appsScriptUrl) {
        return NextResponse.json({ success: true, mock: true });
      }

      const payload = {
        action: "adminCancelBooking",
        token: bookingToken,
        reason: reason || "Unforeseen schedule conflict",
        sharedSecret,
      };

      const backendRes = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const text = await backendRes.text();
      const data = JSON.parse(text);
      return NextResponse.json(data);
    }

    if (action === "adminRequestReschedule") {
      const authHeader = req.headers.get("authorization") || "";
      const bearerToken = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : body.adminToken;

      if (!bearerToken || !verifyAdminToken(bearerToken)) {
        return NextResponse.json(
          {
            success: false,
            error: "UNAUTHORIZED",
            message: "Unauthorized or expired admin session",
          },
          { status: 401 }
        );
      }

      const { token: bookingToken, reason } = body;
      if (!bookingToken) {
        return NextResponse.json(
          {
            success: false,
            error: "MISSING_TOKEN",
            message: "Booking token is required",
          },
          { status: 400 }
        );
      }

      if (!appsScriptUrl) {
        return NextResponse.json({ success: true, mock: true });
      }

      const payload = {
        action: "adminRequestReschedule",
        token: bookingToken,
        reason: reason || "Please select another time slot",
        sharedSecret,
      };

      const backendRes = await fetch(appsScriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      });

      const text = await backendRes.text();
      const data = JSON.parse(text);
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { success: false, error: "INVALID_ACTION" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Booking API POST error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "INTERNAL_ERROR",
        message: error?.message || "Failed to process booking request",
      },
      { status: 500 }
    );
  }
}
