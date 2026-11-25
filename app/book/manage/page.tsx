"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SlotPicker from "../SlotPicker";
import AdminDashboard from "./AdminDashboard";
import {
  formatFullDateTime,
  BookingDetails,
} from "../booking-utils";

function ManageBookingContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("t") || "";
  const [showAdminView, setShowAdminView] = useState<boolean>(!token);

  useEffect(() => {
    if (!token) {
      setShowAdminView(true);
    }
  }, [token]);

  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(token));
  const [error, setError] = useState<string | null>(null);

  // Time zone for viewing/rescheduling
  const [timeZone, setTimeZone] = useState<string>("Asia/Kolkata");

  // Mode: 'view' | 'reschedule' | 'confirm-cancel' | 'cancelled' | 'rescheduled'
  const [mode, setMode] = useState<
    "view" | "reschedule" | "confirm-cancel" | "cancelled" | "rescheduled"
  >("view");

  // Reschedule state
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [newSelectedSlot, setNewSelectedSlot] = useState<string | null>(null);
  const [rescheduling, setRescheduling] = useState<boolean>(false);
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);

  // Cancel state
  const [cancelling, setCancelling] = useState<boolean>(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  // Auto-detect visitor time zone once
  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) setTimeZone(detected);
    } catch {
      // Fallback
    }
  }, []);

  // Fetch booking details
  const fetchBooking = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/booking?action=getBooking&token=${encodeURIComponent(token)}`);
      const data = await res.json();

      if (data.success && data.booking) {
        setBooking(data.booking);
        if (data.booking.visitorTimeZone) {
          setTimeZone(data.booking.visitorTimeZone);
        }
        if (data.booking.status === "Cancelled") {
          setMode("cancelled");
        }
      } else {
        setError(data.message || "We couldn't find a booking with this token.");
      }
    } catch {
      setError("Unable to connect to the booking service. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  // Fetch slots when user clicks Reschedule
  const handleOpenReschedule = async () => {
    setMode("reschedule");
    setLoadingSlots(true);
    setRescheduleError(null);
    try {
      const res = await fetch(`/api/booking?action=getSlots&tz=${encodeURIComponent(timeZone)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.slots)) {
        setSlots(data.slots);
      } else {
        setRescheduleError("Failed to fetch open slots.");
      }
    } catch {
      setRescheduleError("Network error while fetching slots.");
    } finally {
      setLoadingSlots(false);
    }
  };

  // Confirm Reschedule
  const handleConfirmReschedule = async () => {
    if (!newSelectedSlot || !token) return;

    setRescheduling(true);
    setRescheduleError(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reschedule",
          token,
          newSlotStart: newSelectedSlot,
          visitorTimeZone: timeZone,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBooking((prev) =>
          prev
            ? {
                ...prev,
                startUtc: newSelectedSlot,
                status: "Rescheduled",
              }
            : null
        );
        setMode("rescheduled");
      } else if (data.error === "SLOT_TAKEN") {
        setRescheduleError("That slot was just taken. Please pick another.");
        handleOpenReschedule();
      } else {
        setRescheduleError(data.message || "Failed to reschedule. Please try again.");
      }
    } catch {
      setRescheduleError("Connection error while rescheduling.");
    } finally {
      setRescheduling(false);
    }
  };

  // Confirm Cancellation
  const handleConfirmCancel = async () => {
    if (!token) return;

    setCancelling(true);
    setCancelError(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "cancel",
          token,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setBooking((prev) => (prev ? { ...prev, status: "Cancelled" } : null));
        setMode("cancelled");
      } else {
        setCancelError(data.message || "Failed to cancel booking.");
      }
    } catch {
      setCancelError("Connection error while cancelling.");
    } finally {
      setCancelling(false);
    }
  };

  if (showAdminView) {
    return (
      <div className="bg-ink text-paper min-h-screen relative overflow-hidden">
        <PageHero
          compact
          eyebrow="STUDIO ADMIN CONSOLE"
          title="MANAGE BOOKINGS."
          description="View all booked client sessions, attendee details, and manage cancellations or reschedule notices."
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <AdminDashboard
            hasClientToken={Boolean(token)}
            onSwitchToClientView={() => setShowAdminView(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ink text-paper min-h-screen relative overflow-hidden">
      <PageHero
        compact
        eyebrow="MANAGE MEETING"
        title="YOUR BOOKING."
        description="Reschedule or cancel your 30-minute meeting with Prameet Patani."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex justify-end pb-4">
          <button
            type="button"
            onClick={() => setShowAdminView(true)}
            className="text-xs font-semibold text-muted hover:text-red-bright uppercase tracking-wider transition-colors cursor-pointer"
          >
            Switch to Admin Console ↗
          </button>
        </div>

        <ScrollReveal className="bg-ink-raised border border-paper/10 p-6 sm:p-10 rounded-sm shadow-2xl">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-red-bright border-t-transparent rounded-full animate-spin" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                LOCATING YOUR BOOKING...
              </span>
            </div>
          ) : error ? (
            <div className="py-12 border border-paper/15 rounded-sm p-6 text-center space-y-4">
              <span className="w-2 h-2 rounded-full bg-red-bright inline-block" />
              <p className="font-mono text-sm text-paper">{error}</p>
              <div>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-sm bg-red-gradient text-paper shadow-lg hover:shadow-red-bright/20"
                >
                  <span>BOOK A NEW CALL</span>
                  <span>‹</span>
                </Link>
              </div>
            </div>
          ) : mode === "cancelled" ? (
            <div className="py-8 flex flex-col items-center text-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  STATUS: CANCELLED
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-paper tracking-wide">
                CANCELLED. WHENEVER YOU&apos;D LIKE TO PICK IT UP AGAIN, THE LINK IS RIGHT HERE.
              </h2>
              <p className="font-body text-sm text-muted max-w-md">
                The Google Calendar event has been removed and an email confirmation has been sent.
              </p>
              <div className="pt-4">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-sm bg-red-gradient text-paper shadow-lg hover:shadow-red-bright/20"
                >
                  <span>BOOK A NEW CALL</span>
                  <span>‹</span>
                </Link>
              </div>
            </div>
          ) : mode === "rescheduled" && booking ? (
            <div className="py-8 flex flex-col items-center text-center gap-6">
              <div className="h-16 w-16 bg-red-bright/20 text-red-bright border border-red-bright/40 rounded-full flex items-center justify-center font-display text-2xl font-extrabold shadow-lg">
                ✓
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-paper tracking-wide">
                DONE. YOUR CALL HAS BEEN MOVED.
              </h2>
              <p className="font-body text-sm text-paper/80">
                We&apos;ve updated your Google Calendar invite and sent a new confirmation email.
              </p>

              <div className="w-full max-w-md bg-ink border border-paper/15 p-5 rounded-sm text-left flex flex-col gap-2">
                <span className="font-mono text-xs text-red-bright uppercase tracking-widest">
                  NEW TIME ({timeZone})
                </span>
                <span className="font-mono text-sm font-bold text-paper">
                  {formatFullDateTime(booking.startUtc, timeZone)}
                </span>
                {booking.meetLink && (
                  <div className="pt-2 border-t border-paper/10">
                    <a
                      href={booking.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-red-bright hover:underline break-all"
                    >
                      {booking.meetLink}
                    </a>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setMode("view")}
                className="font-mono text-xs text-muted hover:text-paper underline"
              >
                Back to booking details
              </button>
            </div>
          ) : mode === "reschedule" ? (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between pb-4 border-b border-paper/10">
                <div className="flex items-center gap-2">
                  <span className="text-red-bright font-extrabold text-sm">‹</span>
                  <span className="font-display text-xs font-bold uppercase tracking-wider text-paper">
                    RESCHEDULE 30-MINUTE CALL
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMode("view")}
                  className="font-mono text-xs text-muted hover:text-paper underline"
                >
                  Cancel reschedule
                </button>
              </div>

              {rescheduleError && (
                <div className="font-mono text-xs text-red-bright border-l-2 border-red-bright bg-ink px-4 py-3 rounded-r-sm">
                  {rescheduleError}
                </div>
              )}

              <SlotPicker
                slots={slots}
                selectedSlot={newSelectedSlot}
                onSelectSlot={(slotUtc) => setNewSelectedSlot(slotUtc)}
                timeZone={timeZone}
                onTimeZoneChange={(newTz) => setTimeZone(newTz)}
                loading={loadingSlots}
              />

              {newSelectedSlot && (
                <div className="pt-6 border-t border-paper/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">
                      NEW TIME SELECTED
                    </span>
                    <span className="font-mono text-xs text-paper font-bold">
                      {formatFullDateTime(newSelectedSlot, timeZone)}
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={rescheduling}
                    onClick={handleConfirmReschedule}
                    className="inline-flex items-center justify-center gap-2 font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-sm bg-red-gradient text-paper shadow-lg hover:shadow-red-bright/20 disabled:opacity-50"
                  >
                    <span>{rescheduling ? "MOVING EVENT..." : "CONFIRM NEW TIME"}</span>
                    <span>‹</span>
                  </button>
                </div>
              )}
            </div>
          ) : mode === "confirm-cancel" && booking ? (
            <div className="py-6 flex flex-col gap-6 border border-red-bright/40 bg-ink p-6 rounded-sm">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-bright font-extrabold text-sm">‹</span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                    CONFIRM CANCELLATION
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-paper">
                  ARE YOU SURE YOU WANT TO CANCEL THIS CALL?
                </h3>
                <p className="font-body text-xs text-muted">
                  This will release the slot, remove the Google Calendar invite, and notify Prameet.
                </p>
              </div>

              {cancelError && (
                <div className="font-mono text-xs text-red-bright border-l-2 border-red-bright bg-ink-raised px-4 py-3">
                  {cancelError}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-paper/10">
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={handleConfirmCancel}
                  className="inline-flex items-center justify-center font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-sm bg-red-gradient text-paper shadow-lg hover:shadow-red-bright/20 disabled:opacity-50"
                >
                  {cancelling ? "CANCELLING..." : "YES, CANCEL CALL"}
                </button>
                <button
                  type="button"
                  disabled={cancelling}
                  onClick={() => setMode("view")}
                  className="inline-flex items-center justify-center font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-sm bg-transparent text-paper border border-paper/20 hover:bg-paper/5"
                >
                  KEEP BOOKING
                </button>
              </div>
            </div>
          ) : booking ? (
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-red-bright font-extrabold text-sm">‹</span>
                  <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-red-bright">
                    {booking.status === "Rescheduled" ? "RESCHEDULED CALL" : "SCHEDULED CALL"}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold uppercase text-paper tracking-wide">
                  WORSTISBETTERR X {booking.company || "CLIENT"}
                </h2>
                <p className="font-body text-sm text-muted">
                  30-minute video call with Prameet Patani on Google Meet.
                </p>
              </div>

              <div className="bg-ink border border-paper/15 p-6 rounded-sm flex flex-col gap-4 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">
                      DATE & TIME ({timeZone})
                    </span>
                    <span className="font-mono text-sm text-paper font-bold">
                      {formatFullDateTime(booking.startUtc, timeZone)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">
                      ATTENDEE
                    </span>
                    <span className="font-mono text-sm text-paper">
                      {booking.name} ({booking.email})
                    </span>
                  </div>
                </div>

                {booking.meetLink && (
                  <div className="pt-3 border-t border-paper/10 flex flex-col gap-1">
                    <span className="font-mono text-xs text-muted uppercase tracking-wider">
                      GOOGLE MEET LINK
                    </span>
                    <a
                      href={booking.meetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-red-bright hover:underline break-all"
                    >
                      {booking.meetLink}
                    </a>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-paper/10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleOpenReschedule}
                  className="inline-flex items-center justify-center gap-2 font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-sm bg-red-gradient text-paper shadow-lg hover:shadow-red-bright/20"
                >
                  <span>RESCHEDULE CALL</span>
                  <span>‹</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("confirm-cancel")}
                  className="inline-flex items-center justify-center font-display text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-sm bg-transparent text-muted hover:text-red-bright border border-paper/20 hover:border-red-bright/40 transition-colors"
                >
                  CANCEL CALL
                </button>
              </div>
            </div>
          ) : null}
        </ScrollReveal>
      </div>
    </div>
  );
}

export default function ManagePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-ink flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-red-bright border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ManageBookingContent />
    </Suspense>
  );
}
