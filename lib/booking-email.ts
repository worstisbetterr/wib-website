// ==========================================
// WORSTISBETTERR TRANSACTIONAL BOOKING EMAILS
// Direct Resend Integration via projects@worstisbetterr.com
// ==========================================

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const FROM_EMAIL = "WORSTISBETTERR <projects@worstisbetterr.com>";
const REPLY_TO_EMAIL = "projects@worstisbetterr.com";
const AGENCY_EMAIL = "worstisbetterr@gmail.com";
const PERSONAL_CC_EMAIL = "pataniprameet@gmail.com";
const SITE_URL = "https://www.worstisbetterr.com";
const SHOWREEL_URL = "https://worstisbetterr.com/work";
const INSTAGRAM_URL = "https://instagram.com/worstisbetterr";
const LOGO_URL = "https://www.worstisbetterr.com/logos/wib_logo_typography_email.png";

const BTN_STYLE =
  "display:block;width:100%;box-sizing:border-box;background-color:#E62E30;background:#E62E30 linear-gradient(180deg,#E62E30 0%,#B8181A 100%);color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;text-align:center;padding:16px 20px;border-radius:6px;box-shadow:0 4px 14px rgba(230,46,48,0.35);";

export interface BookingData {
  id?: string;
  token: string;
  name: string;
  email: string;
  company: string;
  type?: string;
  whatBringsYouHere?: string;
  whatsNext?: string;
  whenToStart?: string;
  heardAboutUs?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  src?: string;
  lead?: string;
  startUtc: string;
  visitorTimeZone?: string;
  meetLink?: string;
  status?: string;
}

function formatDateTime(startUtc: string, visitorTz: string = "Asia/Kolkata") {
  const date = new Date(startUtc);
  const safeVisitorTz = visitorTz || "Asia/Kolkata";

  let visitorDayDate = "";
  let visitorTime = "";
  try {
    visitorDayDate = new Intl.DateTimeFormat("en-US", {
      timeZone: safeVisitorTz,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
    visitorTime = new Intl.DateTimeFormat("en-US", {
      timeZone: safeVisitorTz,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    visitorDayDate = date.toDateString();
    visitorTime = date.toTimeString();
  }

  let indiaDayDate = "";
  let indiaTime = "";
  try {
    indiaDayDate = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
    indiaTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    indiaDayDate = visitorDayDate;
    indiaTime = visitorTime;
  }

  return {
    visitorDayDate,
    visitorTime,
    visitorFull: `${visitorDayDate} at ${visitorTime}`,
    indiaDayDate,
    indiaTime: `${indiaTime} IST`,
    indiaFull: `${indiaDayDate} at ${indiaTime} IST`,
  };
}

function wrapDarkEmailTemplate(contentHtml: string, eyebrow: string, preheader: string): string {
  const tag = eyebrow || "30M SESSION";
  const preview = preheader || "Worstisbetterr — Directed AI Studio session.";

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Worstisbetterr</title>
<!--[if mso]>
<noscript>
<xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
</noscript>
<![endif]-->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Ubuntu+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root { color-scheme: light only; supported-color-schemes: light only; }
body, .wib-body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0A0908 !important; background: #0A0908 linear-gradient(180deg, #0A0908 0%, #0A0908 100%) !important; color: #D6D3CD !important; font-family: 'Ubuntu', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; -webkit-text-size-adjust: 100% !important; -ms-text-size-adjust: 100% !important; }
.wib-card { background-color: #100F0D !important; background: #100F0D linear-gradient(180deg, #100F0D 0%, #100F0D 100%) !important; border: 1px solid #2A2824 !important; }
.wib-box { background-color: #140D0D !important; background: #140D0D linear-gradient(160deg, #171010 0%, #0F0E0D 100%) !important; border: 1px solid #2A2824 !important; }
[data-ogsc] body, [data-ogsb] body, [data-ogsc] .wib-body, [data-ogsb] .wib-body { background-color: #0A0908 !important; background: #0A0908 linear-gradient(180deg, #0A0908 0%, #0A0908 100%) !important; }
[data-ogsc] .wib-card, [data-ogsb] .wib-card { background-color: #100F0D !important; background: #100F0D linear-gradient(180deg, #100F0D 0%, #100F0D 100%) !important; }
[data-ogsc] .wib-box, [data-ogsb] .wib-box { background-color: #140D0D !important; background: #140D0D linear-gradient(160deg, #171010 0%, #0F0E0D 100%) !important; }
@media (prefers-color-scheme: dark) {
  body, .wib-body { background-color: #0A0908 !important; background: #0A0908 linear-gradient(180deg, #0A0908 0%, #0A0908 100%) !important; }
  .wib-card { background-color: #100F0D !important; background: #100F0D linear-gradient(180deg, #100F0D 0%, #100F0D 100%) !important; }
  .wib-box { background-color: #140D0D !important; background: #140D0D linear-gradient(160deg, #171010 0%, #0F0E0D 100%) !important; }
}
@media only screen and (max-width: 520px) {
  .card-outer-td { padding: 16px 10px !important; }
  .card-inner-td { padding: 24px 18px !important; }
  .hero-headline { font-size: 22px !important; }
  .time-numeral { font-size: 24px !important; }
  .header-logo { max-width: 140px !important; }
}
</style>
</head>
<body class="wib-body" style="margin:0;padding:0;width:100% !important;background-color:#0A0908;background:#0A0908 linear-gradient(180deg,#0A0908 0%,#0A0908 100%);color:#D6D3CD;font-family:'Ubuntu',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
<div style="display:none;font-size:1px;color:#0A0908;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
  ${preview} &#847; &zwnj; &nbsp; &#8199; &shy;
</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0A0908;background:#0A0908 linear-gradient(180deg,#0A0908 0%,#0A0908 100%);margin:0;padding:0;border-collapse:collapse;">
  <tr>
    <td align="center" class="card-outer-td" style="padding:28px 14px;background-color:#0A0908;background:#0A0908 linear-gradient(180deg,#0A0908 0%,#0A0908 100%);">
      <!-- Obsidian Monolith Card Container -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="wib-card" style="max-width:560px;width:100%;background-color:#100F0D;background:#100F0D linear-gradient(180deg,#100F0D 0%,#100F0D 100%);border:1px solid #2A2824;border-radius:8px;overflow:hidden;box-shadow:0 0 45px rgba(230,46,48,0.12),0 20px 50px rgba(0,0,0,0.9);border-collapse:separate;">
        <!-- Top Ambient Crimson Light Bar -->
        <tr>
          <td height="3" style="height:3px;background-color:#E62E30;background:linear-gradient(90deg,#100F0D 0%,#E62E30 50%,#100F0D 100%);line-height:3px;font-size:1px;padding:0;margin:0;">&nbsp;</td>
        </tr>
        <tr>
          <td class="card-inner-td" style="padding:32px 28px;background-color:#100F0D;background:#100F0D linear-gradient(180deg,#100F0D 0%,#100F0D 100%);">
            <!-- Header Row -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;border-collapse:collapse;">
              <tr>
                <td align="left" style="vertical-align:middle;">
                  <a href="${SITE_URL}" target="_blank" style="text-decoration:none;display:inline-block;"><img src="${LOGO_URL}" alt="WORSTISBETTERR" class="header-logo" width="150" height="21" border="0" style="width:150px;max-width:150px;height:auto;display:block;border:0;outline:none;text-decoration:none;" /></a>
                </td>
                <td align="right" style="vertical-align:middle;white-space:nowrap;padding-left:8px;">
                  <div style="display:inline-block;background-color:#140D0D;background:#140D0D linear-gradient(180deg,#140D0D 0%,#140D0D 100%);border:1px solid #E62E30;border-radius:20px;padding:5px 12px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#FFFFFF;letter-spacing:0.1em;text-transform:uppercase;">
                    <span style="display:inline-block;width:6px;height:6px;background-color:#E62E30;border-radius:50%;vertical-align:middle;margin-right:6px;box-shadow:0 0 6px #E62E30;"></span>${tag}
                  </div>
                </td>
              </tr>
            </table>

            ${contentHtml}

            <!-- Footer Section -->
            <div style="margin-top:28px;padding-top:18px;border-top:1px solid #1F1D1A;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#57534C;line-height:1.8;">
              WORSTISBETTERR · DIRECTED AI STUDIO · MUMBAI · GLOBAL<br>
              <a href="${SITE_URL}" target="_blank" style="color:#8B877F;text-decoration:none;font-weight:bold;">worstisbetterr.com</a> · 
              <a href="${INSTAGRAM_URL}" target="_blank" style="color:#8B877F;text-decoration:none;">@worstisbetterr</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

function generateIcsCalendar(
  booking: BookingData,
  status: "CONFIRMED" | "CANCELLED" = "CONFIRMED",
  sequence: number = 0
): string {
  const date = new Date(booking.startUtc);
  const startIso = date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const endDate = new Date(date.getTime() + 30 * 60 * 1000);
  const endIso = endDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const nowIso = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid = `${booking.token || Date.now()}@worstisbetterr.com`;
  const company = booking.company || "Discovery Call";
  const meet = booking.meetLink || "https://meet.google.com";
  const method = status === "CANCELLED" ? "CANCEL" : "REQUEST";

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Worstisbetterr//WIB Studio Booking//EN",
    "CALSCALE:GREGORIAN",
    `METHOD:${method}`,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${nowIso}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    `SUMMARY:Worstisbetterr x ${company}`,
    `DESCRIPTION:30-minute discovery call with Prameet Patani (Worstisbetterr).\\n\\nGoogle Meet Room: ${meet}\\n\\nReschedule or Cancel: ${SITE_URL}/book/manage?t=${booking.token}`,
    `LOCATION:${meet}`,
    "ORGANIZER;CN=Worstisbetterr:mailto:projects@worstisbetterr.com",
    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=${booking.name}:mailto:${booking.email}`,
    `STATUS:${status}`,
    `SEQUENCE:${sequence}`,
    "TRANSP:OPAQUE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

async function sendViaResend(options: {
  to: string[];
  cc?: string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: Array<{ filename: string; content: string }>;
}) {
  try {
    const payload: any = {
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      reply_to: options.replyTo || REPLY_TO_EMAIL,
    };
    if (options.cc && options.cc.length > 0) {
      payload.cc = options.cc;
    }
    if (options.text) {
      payload.text = options.text;
    }
    if (options.attachments && options.attachments.length > 0) {
      payload.attachments = options.attachments;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend API rejected email:", res.status, data);
      return { success: false, status: res.status, error: data };
    }
    return { success: true, data };
  } catch (err: any) {
    console.error("Resend dispatch error:", err);
    return { success: false, error: err?.message };
  }
}

// ----------------------------------------------------------------------
// 1. CLIENT CONFIRMATION EMAIL
// ----------------------------------------------------------------------
export async function sendClientConfirmationEmail(booking: BookingData) {
  const dt = formatDateTime(booking.startUtc, booking.visitorTimeZone);
  const firstName = (booking.name || "there").split(" ")[0];
  const subject = `Booked: Worstisbetterr x ${booking.company}, ${dt.visitorDayDate}`;

  const rescheduleLink = `${SITE_URL}/book/manage?t=${encodeURIComponent(booking.token)}&action=reschedule`;
  const cancelLink = `${SITE_URL}/book/manage?t=${encodeURIComponent(booking.token)}&action=cancel`;

  const date = new Date(booking.startUtc);
  const startIso = date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const endIso = new Date(date.getTime() + 30 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const meetLink = booking.meetLink || "";

  const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Worstisbetterr x ${booking.company}`
  )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
    `Discovery call with Prameet Patani (Worstisbetterr).\n\nJoin Google Meet: ${meetLink}\n\nReschedule / Cancel:\n${SITE_URL}/book/manage?t=${booking.token}`
  )}&location=${encodeURIComponent(meetLink)}`;

  const contentHtml = `
    <div style="margin-bottom:20px;">
      <h1 class="hero-headline text-white" style="margin:0 0 6px 0;font-size:24px;font-weight:700;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;letter-spacing:-0.01em;line-height:1.25;font-family:'Ubuntu',sans-serif;">
        You're booked with Prameet.
      </h1>
      <p class="text-body" style="margin:0;font-size:14px;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;line-height:1.5;font-family:'Ubuntu',sans-serif;">
        Discovery call scheduled for <strong class="text-white" style="color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;">${booking.company}</strong>.
      </p>
    </div>

    <!-- Time Capsule Box -->
    <div class="wib-box" style="background-color:#131210;background:#131210;border:1px solid #24221F;border-left:3px solid #E62E30;border-radius:6px;padding:16px 16px;margin-bottom:22px;box-sizing:border-box;">
      <div style="margin-bottom:3px;">
        <span class="time-numeral text-white" style="font-size:24px;font-weight:700;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;font-family:'Ubuntu',sans-serif;letter-spacing:-0.01em;">
          ${dt.visitorTime}
        </span>
        <span class="text-red" style="font-size:13px;font-weight:700;color:#E62E30 !important;-webkit-text-fill-color:#E62E30 !important;font-family:'Ubuntu Mono',monospace,sans-serif;margin-left:4px;">
          ${booking.visitorTimeZone || "Asia/Kolkata"}
        </span>
      </div>
      <div class="text-white" style="font-size:14px;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;font-weight:500;margin-bottom:2px;font-family:'Ubuntu',sans-serif;">
        ${dt.visitorDayDate}
      </div>
      <div class="text-muted" style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:12px;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;margin-bottom:12px;">
        ${dt.indiaTime} (Mumbai)
      </div>
      <div>
        <span style="display:inline-block;margin:2px 4px 2px 0;background-color:#0A0908;border:1px solid #1E1C1A;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#D6D3CD !important;-webkit-text-fill-color:#D6D3CD !important;">30 Minutes</span>
        <span style="display:inline-block;margin:2px 4px 2px 0;background-color:#0A0908;border:1px solid #1E1C1A;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#D6D3CD !important;-webkit-text-fill-color:#D6D3CD !important;">Google Meet</span>
        <span style="display:inline-block;margin:2px 0 2px 0;background-color:#1A0D0E;border:1px solid #4D1A1C;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#FF4D4F !important;-webkit-text-fill-color:#FF4D4F !important;">No Deck, No Pressure</span>
      </div>
    </div>

    <!-- Action Button -->
    <div style="margin-bottom:22px;">
      <a href="${meetLink}" target="_blank" style="${BTN_STYLE}">
        Join Google Meet ›
      </a>
      <div style="text-align:center;margin-top:12px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;">
        <a href="${gCalUrl}" target="_blank" style="color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;text-decoration:none;">+ Add to Calendar</a>
        <span style="margin:0 6px;color:#2E2A24;">•</span>
        <a href="${rescheduleLink}" target="_blank" style="color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;text-decoration:none;">Reschedule</a>
        <span style="margin:0 6px;color:#2E2A24;">•</span>
        <a href="${cancelLink}" target="_blank" style="color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;text-decoration:none;">Cancel</a>
      </div>
    </div>

    <!-- Showreel Note -->
    <div style="border-top:1px solid #1A1816;padding-top:16px;">
      <div class="text-muted" style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">
        WHAT WE'LL DO
      </div>
      <p class="text-muted" style="margin:0 0 10px 0;font-size:13px;color:#D6D3CD !important;-webkit-text-fill-color:#D6D3CD !important;line-height:1.6;font-family:'Ubuntu',sans-serif;">
        Together we'll explore what Directed AI can achieve for ${booking.company}, review live category references, and map what to build first.
      </p>
      <p style="margin:0;font-size:12px;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;font-family:'Ubuntu Mono',monospace,sans-serif;">
        Until then: <a href="${SHOWREEL_URL}" target="_blank" style="color:#E62E30 !important;-webkit-text-fill-color:#E62E30 !important;text-decoration:underline;">Watch 38s Showreel →</a>
      </p>
    </div>
  `;

  const html = wrapDarkEmailTemplate(
    contentHtml,
    "CONFIRMED",
    `We are on for ${dt.visitorDayDate} at ${dt.visitorTime} (${booking.visitorTimeZone || "IST"}). Google Meet link ready.`
  );

  const textFallback = `Worstisbetterr x ${booking.company}
Discovery Call with Prameet Patani (Co-Founder, Worstisbetterr)

Date & Time: ${dt.visitorFull} (${booking.visitorTimeZone || "Asia/Kolkata"})
India Time: ${dt.indiaFull}
Duration: 30 Minutes
Location: Google Meet

Join Google Meet: ${meetLink}

Reschedule Call: ${rescheduleLink}
Cancel Booking: ${cancelLink}

We're looking forward to speaking with you.
Worstisbetterr · Directed AI Studio · worstisbetterr.com`;

  const icsString = generateIcsCalendar(booking, "CONFIRMED", 0);
  const icsBase64 = Buffer.from(icsString, "utf-8").toString("base64");

  return sendViaResend({
    to: [booking.email],
    replyTo: REPLY_TO_EMAIL,
    subject,
    html,
    text: textFallback,
    attachments: [
      {
        filename: "invite.ics",
        content: icsBase64,
      },
    ],
  });
}

// ----------------------------------------------------------------------
// 2. AGENCY NOTIFICATION EMAIL (TO WORSTISBETTERR, CC PRAMEET)
// ----------------------------------------------------------------------
export async function sendAgencyBookingNotification(booking: BookingData) {
  const dt = formatDateTime(booking.startUtc, booking.visitorTimeZone);
  const startTiming = booking.whenToStart || "soon";
  const subject = `New booking: ${booking.company} (${booking.type || "Brand"}) · starts ${startTiming} · ${dt.indiaFull}`;

  const socialsList: string[] = [];
  if (booking.website)
    socialsList.push(
      `<a href="${booking.website}" target="_blank" style="color:#E62E30 !important;-webkit-text-fill-color:#E62E30 !important;text-decoration:underline;font-weight:bold;">Website</a>`
    );
  if (booking.instagram)
    socialsList.push(
      `<a href="${booking.instagram}" target="_blank" style="color:#E62E30 !important;-webkit-text-fill-color:#E62E30 !important;text-decoration:underline;font-weight:bold;">Instagram</a>`
    );
  if (booking.linkedin)
    socialsList.push(
      `<a href="${booking.linkedin}" target="_blank" style="color:#E62E30 !important;-webkit-text-fill-color:#E62E30 !important;text-decoration:underline;font-weight:bold;">LinkedIn</a>`
    );
  const socialsHtml =
    socialsList.length > 0
      ? socialsList.join(" · ")
      : '<span style="color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;">None provided</span>';

  const attributionItems: string[] = [];
  if (booking.src) attributionItems.push(`Source: ${booking.src}`);
  if (booking.lead) attributionItems.push(`Lead ID: ${booking.lead}`);
  const attributionStr = attributionItems.join(" · ");

  const meetLink = booking.meetLink || "";

  const contentHtml = `
    <div style="margin-bottom:20px;">
      <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;font-weight:700;color:#E62E30 !important;-webkit-text-fill-color:#E62E30 !important;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">
        NEW CLIENT BOOKING · ${(booking.type || "BRAND").toUpperCase()}
      </div>
      <h1 class="hero-headline text-white" style="margin:0 0 6px 0;font-size:26px;font-weight:700;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;letter-spacing:-0.01em;font-family:'Ubuntu',sans-serif;line-height:1.2;">
        ${booking.company}
      </h1>
      <div style="font-size:14px;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;line-height:1.4;font-family:'Ubuntu',sans-serif;">
        ${booking.name} &nbsp;·&nbsp; <a href="mailto:${booking.email}" style="color:#E62E30 !important;-webkit-text-fill-color:#E62E30 !important;text-decoration:none;font-weight:500;">${booking.email}</a>
      </div>
    </div>

    <!-- Schedule Time Capsule -->
    <div class="wib-box" style="padding:16px 16px;background-color:#131210;background:#131210;border:1px solid #24221F;border-left:3px solid #E62E30;border-radius:6px;margin-bottom:22px;box-sizing:border-box;">
      <div style="font-size:18px;font-weight:700;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;margin-bottom:2px;font-family:'Ubuntu',sans-serif;">
        ${dt.indiaFull}
      </div>
      <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:12px;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;margin-bottom:12px;">
        ${dt.visitorFull} (${booking.visitorTimeZone || "Asia/Kolkata"})
      </div>
      <div>
        <span style="display:inline-block;margin:2px 4px 2px 0;background:#0A0908;border:1px solid #1E1C1A;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#D6D3CD !important;-webkit-text-fill-color:#D6D3CD !important;">30 Minutes</span>
        <span style="display:inline-block;margin:2px 4px 2px 0;background:#0A0908;border:1px solid #1E1C1A;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#D6D3CD !important;-webkit-text-fill-color:#D6D3CD !important;">Google Meet</span>
        <span style="display:inline-block;margin:2px 0 2px 0;background:#1A0D0E;border:1px solid #4D1A1C;border-radius:3px;padding:3px 8px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#FF4D4F !important;-webkit-text-fill-color:#FF4D4F !important;">Starts ${booking.whenToStart || "This month"}</span>
      </div>
    </div>

    <!-- Client Brief Dossier (Stacked Layout) -->
    <div style="margin-bottom:24px;">
      <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;letter-spacing:0.14em;text-transform:uppercase;padding-bottom:6px;border-bottom:1px solid #1E1C1A;margin-bottom:10px;">
        CLIENT BRIEF &amp; CONTEXT
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
        <tr><td style="padding:10px 0;border-bottom:1px solid #161513;">
          <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#7A766F !important;-webkit-text-fill-color:#7A766F !important;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:5px;">WHAT BRINGS THEM HERE</div>
          <div style="font-size:14px;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;line-height:1.5;font-weight:400;font-family:'Ubuntu',sans-serif;">${booking.whatBringsYouHere || booking.whatsNext || "N/A"}</div>
        </td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #161513;">
          <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#7A766F !important;-webkit-text-fill-color:#7A766F !important;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:5px;">TARGET TIMELINE</div>
          <div style="font-size:14px;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;line-height:1.5;font-weight:400;font-family:'Ubuntu',sans-serif;">${booking.whenToStart || "N/A"}</div>
        </td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #161513;">
          <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#7A766F !important;-webkit-text-fill-color:#7A766F !important;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:5px;">REFERRAL SOURCE</div>
          <div style="font-size:14px;color:#FFFFFF !important;-webkit-text-fill-color:#FFFFFF !important;line-height:1.5;font-weight:400;font-family:'Ubuntu',sans-serif;">${booking.heardAboutUs || "N/A"}</div>
        </td></tr>
        <tr><td style="padding:10px 0;border-bottom:1px solid #161513;">
          <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#7A766F !important;-webkit-text-fill-color:#7A766F !important;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:5px;">WEB &amp; SOCIALS</div>
          <div style="font-size:14px;line-height:1.5;">${socialsHtml}</div>
        </td></tr>
        ${
          attributionStr
            ? `<tr><td style="padding:10px 0;">
          <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:10px;font-weight:700;color:#7A766F !important;-webkit-text-fill-color:#7A766F !important;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:5px;">CAMPAIGN ATTRIBUTION</div>
          <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:12px;color:#8B877F !important;-webkit-text-fill-color:#8B877F !important;">${attributionStr}</div>
        </td></tr>`
            : ""
        }
      </table>
    </div>

    <!-- Action Button -->
    <div style="margin-bottom:20px;">
      <a href="${meetLink}" target="_blank" style="${BTN_STYLE}">
        Open Google Meet Room ›
      </a>
      <div class="text-muted" style="text-align:center;margin-top:10px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#7A766F !important;-webkit-text-fill-color:#7A766F !important;">
        ${meetLink || "N/A"}
      </div>
    </div>
  `;

  const html = wrapDarkEmailTemplate(
    contentHtml,
    "BRIEFING",
    `New booking: ${booking.company} (${booking.type || "Brand"}) · ${dt.indiaFull}`
  );

  return sendViaResend({
    to: [AGENCY_EMAIL],
    cc: [PERSONAL_CC_EMAIL],
    replyTo: booking.email || REPLY_TO_EMAIL,
    subject,
    html,
  });
}

// ----------------------------------------------------------------------
// 3. RESCHEDULE EMAILS (CLIENT & AGENCY)
// ----------------------------------------------------------------------
export async function sendRescheduleEmails(booking: BookingData) {
  const dt = formatDateTime(booking.startUtc, booking.visitorTimeZone);
  const firstName = (booking.name || "there").split(" ")[0];
  const clientSubject = `Rescheduled: Worstisbetterr x ${booking.company}, ${dt.visitorDayDate}`;

  const rescheduleLink = `${SITE_URL}/book/manage?t=${encodeURIComponent(booking.token)}&action=reschedule`;
  const cancelLink = `${SITE_URL}/book/manage?t=${encodeURIComponent(booking.token)}&action=cancel`;
  const meetLink = booking.meetLink || "";

  const clientContentHtml = `
    <div style="margin-bottom:22px;">
      <h1 class="hero-headline" style="margin:0 0 8px 0;font-size:26px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;line-height:1.2;font-family:'Ubuntu',sans-serif;">
        New time confirmed, ${firstName}.
      </h1>
      <p style="margin:0;font-size:14px;color:#D6D3CD;line-height:1.6;font-family:'Ubuntu',sans-serif;">
        Discovery call updated for <strong style="color:#FFFFFF;">${booking.company}</strong>.
      </p>
    </div>

    <div class="wib-box" style="background-color:#140D0D;background:#140D0D linear-gradient(160deg,#171010 0%,#0F0E0D 100%);border:1px solid #2A2824;border-radius:6px;padding:20px 18px;margin-bottom:24px;box-sizing:border-box;">
      <div style="margin-bottom:4px;">
        <span class="time-numeral" style="font-size:26px;font-weight:700;color:#FFFFFF;font-family:'Ubuntu',sans-serif;letter-spacing:-0.01em;">
          ${dt.visitorTime}
        </span>
        <span style="font-size:14px;font-weight:700;color:#E62E30;font-family:'Ubuntu Mono',monospace,sans-serif;margin-left:6px;">
          ${booking.visitorTimeZone || "Asia/Kolkata"}
        </span>
      </div>
      <div style="font-size:14px;color:#FFFFFF;font-weight:500;margin-bottom:4px;font-family:'Ubuntu',sans-serif;">
        ${dt.visitorDayDate}
      </div>
      <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:12px;color:#8B877F;">
        ${dt.indiaTime} (Mumbai)
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <a href="${meetLink}" target="_blank" style="${BTN_STYLE}">
        Join Google Meet ›
      </a>
      <div style="text-align:center;margin-top:12px;font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;color:#8B877F;">
        <a href="${rescheduleLink}" target="_blank" style="color:#8B877F;text-decoration:none;">Reschedule</a>
        <span style="margin:0 8px;color:#2A2824;">•</span>
        <a href="${cancelLink}" target="_blank" style="color:#8B877F;text-decoration:none;">Cancel Call</a>
      </div>
    </div>
  `;

  const clientHtml = wrapDarkEmailTemplate(
    clientContentHtml,
    "RESCHEDULED",
    `Your call is moved to ${dt.visitorDayDate} at ${dt.visitorTime} (${booking.visitorTimeZone || "IST"}).`
  );

  const agencySubject = `Rescheduled: ${booking.company} (${booking.type || "Brand"}), ${dt.indiaFull}`;
  const agencyContentHtml = `
    <div style="margin-bottom:20px;">
      <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;font-weight:700;color:#E62E30;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">
        CALL RESCHEDULED · ${(booking.type || "BRAND").toUpperCase()}
      </div>
      <h1 class="hero-headline text-white" style="margin:0 0 6px 0;font-size:26px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;font-family:'Ubuntu',sans-serif;line-height:1.2;">
        ${booking.company}
      </h1>
      <div style="font-size:14px;color:#8B877F;line-height:1.4;font-family:'Ubuntu',sans-serif;">
        ${booking.name} &nbsp;·&nbsp; <a href="mailto:${booking.email}" style="color:#E62E30;text-decoration:none;font-weight:500;">${booking.email}</a>
      </div>
    </div>

    <div class="wib-box" style="padding:16px 16px;background-color:#131210;border:1px solid #24221F;border-left:3px solid #E62E30;border-radius:6px;margin-bottom:22px;box-sizing:border-box;">
      <div style="font-size:18px;font-weight:700;color:#FFFFFF;margin-bottom:2px;font-family:'Ubuntu',sans-serif;">
        ${dt.indiaFull}
      </div>
      <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:12px;color:#8B877F;margin-bottom:12px;">
        ${dt.visitorFull} (${booking.visitorTimeZone || "Asia/Kolkata"})
      </div>
    </div>

    <div style="margin-bottom:20px;">
      <a href="${meetLink}" target="_blank" style="${BTN_STYLE}">
        Open Google Meet Room ›
      </a>
    </div>
  `;

  const agencyHtml = wrapDarkEmailTemplate(
    agencyContentHtml,
    "RESCHEDULED",
    `Rescheduled: ${booking.company} · ${dt.indiaFull}`
  );

  const rescheduleIcs = Buffer.from(
    generateIcsCalendar(booking, "CONFIRMED", 1),
    "utf-8"
  ).toString("base64");

  return Promise.all([
    sendViaResend({
      to: [booking.email],
      replyTo: REPLY_TO_EMAIL,
      subject: clientSubject,
      html: clientHtml,
      attachments: [
        {
          filename: "invite.ics",
          content: rescheduleIcs,
        },
      ],
    }),
    sendViaResend({
      to: [AGENCY_EMAIL],
      cc: [PERSONAL_CC_EMAIL],
      replyTo: booking.email || REPLY_TO_EMAIL,
      subject: agencySubject,
      html: agencyHtml,
    }),
  ]);
}

// ----------------------------------------------------------------------
// 4. CANCELLATION EMAILS (CLIENT & AGENCY)
// ----------------------------------------------------------------------
export async function sendCancellationEmails(booking: BookingData) {
  const dt = formatDateTime(booking.startUtc, booking.visitorTimeZone);
  const firstName = (booking.name || "there").split(" ")[0];
  const clientSubject = `Cancelled: Worstisbetterr x ${booking.company}`;

  const clientContentHtml = `
    <div style="margin-bottom:22px;">
      <h1 class="hero-headline" style="margin:0 0 8px 0;font-size:26px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;line-height:1.2;font-family:'Ubuntu',sans-serif;">
        Call cancelled.
      </h1>
      <p style="margin:0;font-size:14px;color:#D6D3CD;line-height:1.6;font-family:'Ubuntu',sans-serif;">
        No problem at all, ${firstName}. We've cancelled the calendar invite.
      </p>
    </div>

    <div class="wib-box" style="background-color:#140D0D;background:#140D0D linear-gradient(160deg,#171010 0%,#0F0E0D 100%);border:1px solid #2A2824;border-radius:6px;padding:20px 18px;margin-bottom:24px;box-sizing:border-box;">
      <p style="margin:0 0 16px 0;font-size:13px;color:#D6D3CD;line-height:1.6;font-family:'Ubuntu',sans-serif;">
        Whenever you'd like to explore Directed AI for ${booking.company}, pick a new slot on our live schedule:
      </p>
      <a href="${SITE_URL}/book" target="_blank" style="${BTN_STYLE}">
        Re-Book Call With Prameet ›
      </a>
    </div>
  `;

  const clientHtml = wrapDarkEmailTemplate(
    clientContentHtml,
    "CANCELLED",
    `Your call on ${dt.visitorDayDate} is cancelled.`
  );

  const agencySubject = `Cancelled: ${booking.company} (${booking.type || "Brand"}), ${dt.indiaFull}`;
  const agencyContentHtml = `
    <div style="margin-bottom:20px;">
      <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:11px;font-weight:700;color:#E62E30;letter-spacing:0.14em;text-transform:uppercase;margin-bottom:6px;">
        CALL CANCELLED · ${(booking.type || "BRAND").toUpperCase()}
      </div>
      <h1 class="hero-headline text-white" style="margin:0 0 6px 0;font-size:26px;font-weight:700;color:#FFFFFF;letter-spacing:-0.01em;font-family:'Ubuntu',sans-serif;line-height:1.2;">
        ${booking.company}
      </h1>
      <div style="font-size:14px;color:#8B877F;line-height:1.4;font-family:'Ubuntu',sans-serif;">
        ${booking.name} &nbsp;·&nbsp; <a href="mailto:${booking.email}" style="color:#E62E30;text-decoration:none;font-weight:500;">${booking.email}</a>
      </div>
    </div>

    <div class="wib-box" style="padding:16px 16px;background-color:#131210;border:1px solid #24221F;border-left:3px solid #E62E30;border-radius:6px;margin-bottom:22px;box-sizing:border-box;">
      <div style="font-size:16px;font-weight:700;color:#FFFFFF;margin-bottom:4px;font-family:'Ubuntu',sans-serif;">
        Original Slot: ${dt.indiaFull}
      </div>
      <div style="font-family:'Ubuntu Mono',monospace,sans-serif;font-size:12px;color:#8B877F;">
        Status: Booking has been marked CANCELLED in database and calendar event removed.
      </div>
    </div>
  `;

  const agencyHtml = wrapDarkEmailTemplate(
    agencyContentHtml,
    "CANCELLED",
    `Cancelled: ${booking.company} · ${dt.indiaFull}`
  );

  const cancelIcs = Buffer.from(
    generateIcsCalendar(booking, "CANCELLED", 2),
    "utf-8"
  ).toString("base64");

  return Promise.all([
    sendViaResend({
      to: [booking.email],
      replyTo: REPLY_TO_EMAIL,
      subject: clientSubject,
      html: clientHtml,
      attachments: [
        {
          filename: "invite.ics",
          content: cancelIcs,
        },
      ],
    }),
    sendViaResend({
      to: [AGENCY_EMAIL],
      cc: [PERSONAL_CC_EMAIL],
      replyTo: booking.email || REPLY_TO_EMAIL,
      subject: agencySubject,
      html: agencyHtml,
    }),
  ]);
}
