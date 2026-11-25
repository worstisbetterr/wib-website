"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm, { BookingSubmitData } from "./BookingForm";
import ConfirmationView from "./ConfirmationView";
import HowItWorksChart from "./HowItWorksChart";
import ShowreelSection from "./ShowreelSection";

function BookPageContent() {
  const searchParams = useSearchParams();
  const src = searchParams.get("src") || "";
  const lead = searchParams.get("lead") || "";
  const urlType = searchParams.get("type")?.toLowerCase();

  // Two-way synced Brand / Agency state
  const [clientType, setClientType] = useState<"Brand" | "Agency">(
    urlType === "agency" ? "Agency" : "Brand"
  );

  // Sync if URL query param changes
  useEffect(() => {
    if (urlType === "agency") {
      setClientType("Agency");
    } else if (urlType === "brand") {
      setClientType("Brand");
    }
  }, [urlType]);

  // Visitor Time Zone (auto-detected on client mount)
  const [timeZone, setTimeZone] = useState<string>("Asia/Kolkata");
  const [hasDetectedTz, setHasDetectedTz] = useState(false);

  // Slots state
  const slotParam = searchParams.get("slot");
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(slotParam || null);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Flow state: 'form' | 'confirmed'
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [bookingResult, setBookingResult] = useState<any>(null);

  // Auto-detect visitor time zone once on mount
  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) {
        setTimeZone(detected);
      }
    } catch {
      // Fallback remains Asia/Kolkata
    }
    setHasDetectedTz(true);
  }, []);

  // Fetch open slots from API
  const fetchSlots = useCallback(async (tz: string) => {
    setLoadingSlots(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/booking?action=getSlots&tz=${encodeURIComponent(tz)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.slots)) {
        setSlots(data.slots);
      } else {
        setFetchError(
          data.message ||
            "Something went wrong syncing calendar. Please refresh or try again in a moment."
        );
      }
    } catch {
      setFetchError(
        "Something went wrong syncing calendar. Please refresh or try again in a moment."
      );
    } finally {
      setLoadingSlots(false);
    }
  }, []);

  useEffect(() => {
    if (hasDetectedTz) {
      fetchSlots(timeZone);
    }
  }, [hasDetectedTz, timeZone, fetchSlots]);

  // Handle slot selection
  const handleSelectSlot = (slotUtc: string) => {
    setSelectedSlot(slotUtc);
    setFormError(null);
  };

  // Handle final booking submission
  const handleBookingSubmit = async (formData: BookingSubmitData) => {
    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "book",
          ...formData,
        }),
      });

      const data = await res.json();

      if (data.success && data.booking) {
        setBookingResult(data.booking);
        setIsConfirmed(true);
        const widget = document.getElementById("booking-widget");
        if (widget) {
          widget.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (data.error === "SLOT_TAKEN") {
        setFormError("That slot was just taken. Please pick another available slot.");
        fetchSlots(timeZone);
      } else {
        setFormError(
          data.message ||
            "Something went wrong on our side. Please pick another time or retry."
        );
      }
    } catch {
      setFormError(
        "Something went wrong on our side. Please pick another time or retry."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0A0908] text-[#D6D3CD] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-16 flex flex-col gap-16 sm:gap-24">
        {/* ======================================================== */}
        {/* ROW 1: [Intro | Booking widget] SIDE BY SIDE ON DESKTOP  */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* LEFT: INTRO SECTION (Mobile: compact top, Desktop: sticky/prominent) */}
          <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6 lg:pt-2">
            {/* Label (Ubuntu Mono, uppercase) */}
            <div
              className="flex flex-wrap items-center gap-2 text-xs sm:text-sm uppercase tracking-wider"
              style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
            >
              <span className="font-bold text-[#FFFFFF]">
                BOOK A FREE CALL
              </span>
              <span className="text-[#57534C]">·</span>
              <span className="font-semibold text-[#8B877F]">
                30 MINUTES
              </span>
              <span className="text-[#57534C]">·</span>
              <span className="font-semibold text-[#8B877F]">
                GOOGLE MEET
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFFFF] leading-[1.12] tracking-tight">
              30 minutes with the worst agency in the world.
            </h1>

            {/* Body text */}
            <div className="flex flex-col gap-2.5 text-sm sm:text-base text-[#D6D3CD] leading-relaxed">
              <p>
                We&apos;re a Directed AI studio. Filmmakers write and direct every frame; AI is just our camera.
              </p>
              <p className="text-[#8B877F]">
                The name is a joke. The work isn&apos;t.
              </p>
            </div>

            {/* Founder info */}
            <div className="flex flex-col pt-3 border-t border-[#1F1D1A]">
              <span className="text-xs sm:text-sm font-bold text-[#FFFFFF]">
                Prameet Patani
              </span>
              <span className="text-[11px] sm:text-xs text-[#8B877F]">
                Co-founder, Worstisbetterr
              </span>
            </div>
          </div>

          {/* RIGHT: BOOKING WIDGET (Visible on mobile without scrolling past intro) */}
          <div
            id="booking-widget"
            className="lg:col-span-7 bg-[#100F0D] border border-[#2A2824] p-5 sm:p-8 rounded-[2px]"
          >
            {fetchError ? (
              <div className="py-12 border border-[#2A2824] rounded-[2px] p-6 text-center flex flex-col items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#E62E30]" />
                <p className="text-xs sm:text-sm font-medium text-[#FFFFFF]">
                  {fetchError}
                </p>
                <button
                  type="button"
                  onClick={() => fetchSlots(timeZone)}
                  className="font-bold text-xs uppercase tracking-widest text-[#E62E30] hover:underline cursor-pointer"
                  style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
                >
                  Retry Calendar Sync ←
                </button>
              </div>
            ) : isConfirmed && bookingResult ? (
              <ConfirmationView booking={bookingResult} />
            ) : (
              <BookingForm
                slots={slots}
                selectedSlot={selectedSlot}
                onSelectSlot={handleSelectSlot}
                timeZone={timeZone}
                onTimeZoneChange={(newTz) => setTimeZone(newTz)}
                loadingSlots={loadingSlots}
                onSubmit={handleBookingSubmit}
                submitting={submitting}
                serverError={formError}
                src={src}
                lead={lead}
                clientType={clientType}
                onTypeChange={setClientType}
              />
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* ROW 2: "HOW IT WORKS" — ANIMATED FLOW CHART              */}
        {/* ======================================================== */}
        <HowItWorksChart clientType={clientType} onTypeChange={setClientType} />

        {/* ======================================================== */}
        {/* ROW 3: SHOWREEL (38s Directed AI)                        */}
        {/* ======================================================== */}
        <ShowreelSection />
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0908] flex items-center justify-center text-[#FFFFFF]">
          <div className="w-8 h-8 border-2 border-[#E62E30] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BookPageContent />
    </Suspense>
  );
}
