"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { siteConfig } from "@/content/site";
import BookingForm, { BookingSubmitData } from "../book/BookingForm";
import ConfirmationView from "../book/ConfirmationView";
import HowItWorksChart from "../book/HowItWorksChart";
import ShowreelSection from "../book/ShowreelSection";

function ContactPageContent() {
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
    <div className="bg-[#0A0908] text-[#D6D3CD] min-h-screen relative overflow-hidden">
      {/* 🌟 Signature Master Page Hero */}
      <PageHero
        eyebrow="AGAINST OUR BETTER JUDGMENT"
        title="START A PROJECT."
        description="Tell us about your brand, campaign goals, and timeline. Book a 30-minute discovery call directly on Google Meet."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 flex flex-col gap-16 sm:gap-24">
        {/* Qualifying Note Banner */}
        <ScrollReveal>
          <p className="font-mono text-xs text-[#E62E30] border-l-2 border-[#E62E30] bg-[#100F0D] px-4 py-3 rounded-r-sm tracking-wide">
            We are selective. We don&apos;t take every brief.
          </p>
        </ScrollReveal>

        {/* ======================================================== */}
        {/* MAIN SECTION: Booking System + Direct Channels Sidebar  */}
        {/* ======================================================== */}
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Booking System Container */}
          <div
            id="booking-widget"
            className="lg:col-span-8 bg-[#100F0D] border border-[#2A2824] p-5 sm:p-8 rounded-[2px] shadow-2xl relative"
          >
            {isConfirmed && bookingResult ? (
              <ConfirmationView booking={bookingResult} />
            ) : (
              <div className="flex flex-col gap-6">
                {fetchError && (
                  <div className="border border-[#E62E30]/40 bg-[#140D0D] p-4 rounded-[2px] flex items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm font-medium text-[#FFFFFF]">
                      {fetchError}
                    </p>
                    <button
                      type="button"
                      onClick={() => fetchSlots(timeZone)}
                      className="font-bold text-xs uppercase tracking-widest text-[#E62E30] hover:underline cursor-pointer"
                    >
                      Retry
                    </button>
                  </div>
                )}

                <BookingForm
                  slots={slots}
                  selectedSlot={selectedSlot}
                  onSelectSlot={handleSelectSlot}
                  timeZone={timeZone}
                  onTimeZoneChange={(newTz) => {
                    setTimeZone(newTz);
                    fetchSlots(newTz);
                  }}
                  loadingSlots={loadingSlots}
                  onSubmit={handleBookingSubmit}
                  submitting={submitting}
                  serverError={formError}
                  src={src}
                  lead={lead}
                  clientType={clientType}
                  onTypeChange={(newType) => setClientType(newType)}
                />
              </div>
            )}
          </div>

          {/* Right Sidebar Panel — DIRECT CHANNELS */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#100F0D] border border-[#2A2824] p-6 sm:p-8 rounded-[2px] flex flex-col gap-6 shadow-xl">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#E62E30] font-extrabold text-sm">‹</span>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#E62E30]">
                    DIRECT CHANNELS
                  </h3>
                </div>
                <div className="h-[1px] w-full bg-[#1F1D1A]" />
              </div>

              {/* Inquiries */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[#8B877F] font-mono uppercase tracking-wider">
                  Project &amp; Client Inquiries
                </span>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-mono text-sm text-[#FFFFFF] hover:text-[#E62E30] transition-colors underline underline-offset-4 font-bold"
                >
                  {siteConfig.contactEmail}
                </a>
              </div>

              {/* Founder Direct Line */}
              <div className="pt-4 border-t border-[#1F1D1A] flex flex-col gap-1">
                <span className="text-xs text-[#8B877F] font-mono uppercase tracking-wider">
                  Direct Founder Contact
                </span>
                <span className="text-xs text-[#FFFFFF] font-bold">
                  Prameet Patani
                </span>
                <span className="text-[11px] text-[#8B877F]">
                  Co-founder, Worstisbetterr
                </span>
              </div>

              {/* Socials & Connect */}
              <div className="pt-4 border-t border-[#1F1D1A] flex flex-col gap-3">
                <span className="text-xs text-[#8B877F] font-mono uppercase tracking-wider">
                  Connect
                </span>
                <div className="flex flex-col gap-2 text-xs font-mono text-[#D6D3CD]">
                  {siteConfig.socials.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#E62E30] transition-colors flex items-center justify-between py-1.5 border-b border-[#1F1D1A]"
                    >
                      <span>{social.platform}</span>
                      <span className="text-[#8B877F]">{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Need a different time note */}
            <div className="border border-[#2A2824] bg-[#100F0D] p-5 rounded-[2px] flex flex-col gap-1.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#8B877F]">
                NEED A DIFFERENT TIME?
              </span>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=worstisbetterr@gmail.com&su=Custom%20Meeting%20Time%20Request"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#E62E30] hover:underline inline-flex items-center gap-1.5"
              >
                <span>Email us directly</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* ======================================================== */}
        {/* ROW 2: "HOW IT WORKS" ANIMATED FLOW CHART                */}
        {/* ======================================================== */}
        <HowItWorksChart
          clientType={clientType}
          onTypeChange={(newType) => setClientType(newType)}
        />

        {/* ======================================================== */}
        {/* ROW 3: SHOWREEL VIDEO                                    */}
        {/* ======================================================== */}
        <ShowreelSection />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0908] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#E62E30] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
