"use client";

import React from "react";
import { formatFullDateTime, getGoogleCalendarUrl } from "./booking-utils";

interface ConfirmationViewProps {
  booking: {
    startUtc: string;
    visitorTimeZone: string;
    meetLink?: string;
    company?: string;
    token?: string;
  };
  showreelUrl?: string;
}

export default function ConfirmationView({
  booking,
  showreelUrl = "https://worstisbetterr.com/work",
}: ConfirmationViewProps) {
  const formattedTime = formatFullDateTime(
    booking.startUtc,
    booking.visitorTimeZone
  );

  const googleCalUrl = getGoogleCalendarUrl(
    booking.company || "Client",
    booking.startUtc,
    booking.meetLink
  );

  return (
    <div className="py-6 flex flex-col items-center text-center gap-6">
      {/* Indicator */}
      <div className="h-14 w-14 border border-[#E62E30] text-[#E62E30] rounded-full flex items-center justify-center text-xl font-bold">
        ✓
      </div>

      {/* Main Headline */}
      <div className="flex flex-col gap-2 max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#FFFFFF] tracking-tight">
          Worst decision you&apos;ll make all week. Good.
        </h2>
        <p className="text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
          The calendar invite and Google Meet link are on their way to your inbox.
        </p>
      </div>

      {/* Confirmed Card */}
      <div className="w-full bg-[#100F0D] border border-[#2A2824] p-5 rounded-[2px] text-left flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span
            className="text-[11px] font-bold uppercase tracking-widest text-[#E62E30]"
            style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
          >
            Confirmed 30-Minute Meeting ({booking.visitorTimeZone})
          </span>
          <span className="text-base sm:text-lg font-bold text-[#FFFFFF]">
            {formattedTime}
          </span>
        </div>

        {booking.meetLink && (
          <div className="pt-3 border-t border-[#1F1D1A] flex flex-col gap-1">
            <span
              className="text-[11px] font-mono uppercase tracking-wider text-[#8B877F]"
            >
              Google Meet Link
            </span>
            <a
              href={booking.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-mono text-[#E62E30] hover:underline break-all"
            >
              {booking.meetLink}
            </a>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center pt-2">
        {booking.meetLink && (
          <a
            href={booking.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] bg-[#E62E30] hover:bg-[#C91C2B] text-[#FFFFFF] transition-colors"
          >
            Join Google Meet →
          </a>
        )}

        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-[2px] bg-transparent text-[#D6D3CD] border border-[#2A2824] hover:border-[#57534C] hover:text-[#FFFFFF] transition-colors"
        >
          Add to Google Calendar
        </a>
      </div>
    </div>
  );
}
