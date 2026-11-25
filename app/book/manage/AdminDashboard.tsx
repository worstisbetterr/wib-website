"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { formatFullDateTime } from "../booking-utils";

export interface AdminBooking {
  id: string;
  token: string;
  createdAt: string;
  name: string;
  email: string;
  type: string;
  company: string;
  whatBringsYouHere?: string;
  whenToStart?: string;
  heardAboutUs?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  src?: string;
  lead?: string;
  whatsNext?: string;
  startUtc: string;
  startIndia: string;
  visitorTimeZone: string;
  eventId: string;
  meetLink: string;
  status: string;
}

export default function AdminDashboard({
  onSwitchToClientView,
  hasClientToken,
}: {
  onSwitchToClientView?: () => void;
  hasClientToken?: boolean;
}) {
  // Auth state
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Login form state
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Bookings list state
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "completed" | "cancelled">("all");

  // Action Modals (Cancel / Reschedule with custom reason)
  const [activeModal, setActiveModal] = useState<{
    type: "cancel" | "reschedule";
    booking: AdminBooking;
  } | null>(null);
  const [customReason, setCustomReason] = useState<string>("");
  const [modalSubmitting, setModalSubmitting] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // 1. Check existing session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("wib_admin_token");
    const savedUser = localStorage.getItem("wib_admin_user");

    if (savedToken) {
      setAdminToken(savedToken);
      if (savedUser) {
        try {
          setAdminUser(JSON.parse(savedUser));
        } catch {
          // ignore
        }
      }
    }
    setAuthChecking(false);
  }, []);

  // 2. Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!usernameInput.trim() || !passwordInput.trim()) {
      setLoginError("Please enter both ID/Email and Password.");
      return;
    }

    setLoginLoading(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "adminLogin",
          username: usernameInput.trim(),
          password: passwordInput.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.adminToken) {
        setAdminToken(data.adminToken);
        setAdminUser(data.user);
        localStorage.setItem("wib_admin_token", data.adminToken);
        localStorage.setItem("wib_admin_user", JSON.stringify(data.user));
        setPasswordInput("");
      } else {
        setLoginError(data.message || "Invalid credentials. Please verify ID and password.");
      }
    } catch {
      setLoginError("Network error while logging in. Please check your connection.");
    } finally {
      setLoginLoading(false);
    }
  };

  // 3. Handle Logout
  const handleLogout = () => {
    setAdminToken(null);
    setAdminUser(null);
    localStorage.removeItem("wib_admin_token");
    localStorage.removeItem("wib_admin_user");
    setBookings([]);
  };

  // 4. Fetch All Bookings
  const fetchBookings = useCallback(async (token: string) => {
    setLoadingBookings(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/booking?action=adminListBookings`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else if (data.error === "UNAUTHORIZED") {
        handleLogout();
        setLoginError("Your session has expired. Please log in again.");
      } else {
        setFetchError(data.message || "Failed to load bookings from database.");
      }
    } catch {
      setFetchError("Unable to connect to the bookings database.");
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  useEffect(() => {
    if (adminToken) {
      fetchBookings(adminToken);
    }
  }, [adminToken, fetchBookings]);

  // Open Cancel Modal
  const openCancelModal = (booking: AdminBooking) => {
    const firstName = booking.name ? booking.name.split(" ")[0] : "there";
    setActiveModal({ type: "cancel", booking });
    setCustomReason(
      `Hi ${firstName}, I have an unexpected commercial film production shoot conflict on this day and won't be able to make our scheduled call. I sincerely apologize for the inconvenience. Please use the link below to select any new time that works best for you.`
    );
    setModalError(null);
  };

  // Open Reschedule Modal
  const openRescheduleModal = (booking: AdminBooking) => {
    const firstName = booking.name ? booking.name.split(" ")[0] : "there";
    setActiveModal({ type: "reschedule", booking });
    setCustomReason(
      `Hi ${firstName}, could we please reschedule our meeting to a different day or time? Please click below to choose any time slot that suits you best.`
    );
    setModalError(null);
  };

  // Submit Modal Action (Cancel or Reschedule)
  const handleModalSubmit = async () => {
    if (!activeModal || !adminToken) return;

    if (!customReason.trim()) {
      setModalError("Please provide a reason or note for the brand.");
      return;
    }

    setModalSubmitting(true);
    setModalError(null);

    try {
      const endpointAction =
        activeModal.type === "cancel" ? "adminCancelBooking" : "adminRequestReschedule";

      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          action: endpointAction,
          token: activeModal.booking.token || activeModal.booking.id,
          reason: customReason.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        const actionLabel =
          activeModal.type === "cancel"
            ? "Meeting cancelled & email sent to client."
            : "Reschedule request email sent to client.";
        setToastMessage(actionLabel);
        setTimeout(() => setToastMessage(null), 5000);

        // Update local state
        if (activeModal.type === "cancel") {
          setBookings((prev) =>
            prev.map((b) =>
              b.id === activeModal.booking.id || b.token === activeModal.booking.token
                ? { ...b, status: "Cancelled" }
                : b
            )
          );
        }

        setActiveModal(null);
      } else {
        setModalError(data.message || "Failed to process action. Please try again.");
      }
    } catch {
      setModalError("Connection error while processing action.");
    } finally {
      setModalSubmitting(false);
    }
  };

  // Copy helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Metrics computation
  const metrics = useMemo(() => {
    const now = new Date().getTime();
    let upcoming = 0;
    let completed = 0;
    let cancelled = 0;

    for (const b of bookings) {
      if (b.status === "Cancelled") {
        cancelled++;
      } else {
        const slotTime = new Date(b.startUtc).getTime();
        if (slotTime > now) {
          upcoming++;
        } else {
          completed++;
        }
      }
    }

    return { total: bookings.length, upcoming, completed, cancelled };
  }, [bookings]);

  // Filtered Bookings
  const filteredBookings = useMemo(() => {
    const now = new Date().getTime();
    return bookings.filter((b) => {
      // 1. Status Filter
      if (statusFilter === "cancelled" && b.status !== "Cancelled") return false;
      if (statusFilter === "upcoming") {
        if (b.status === "Cancelled") return false;
        const slotTime = new Date(b.startUtc).getTime();
        if (slotTime <= now) return false;
      }
      if (statusFilter === "completed") {
        if (b.status === "Cancelled") return false;
        const slotTime = new Date(b.startUtc).getTime();
        if (slotTime > now) return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchCompany = b.company?.toLowerCase().includes(q);
        const matchName = b.name?.toLowerCase().includes(q);
        const matchEmail = b.email?.toLowerCase().includes(q);
        const matchWhatsNext = b.whatsNext?.toLowerCase().includes(q);
        const matchType = b.type?.toLowerCase().includes(q);
        return matchCompany || matchName || matchEmail || matchWhatsNext || matchType;
      }

      return true;
    });
  }, [bookings, statusFilter, searchQuery]);

  if (authChecking) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-paper">
        <div className="w-8 h-8 border-2 border-red-bright border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase tracking-widest text-muted">
          AUTHENTICATING CONSOLE...
        </span>
      </div>
    );
  }

  // ==========================================
  // VIEW 1: LOGIN FORM
  // ==========================================
  if (!adminToken) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 sm:px-0">
        <div className="bg-ink-raised border border-paper/15 rounded-xl p-8 sm:p-10 shadow-2xl flex flex-col gap-8">
          <div className="flex flex-col gap-2.5 text-center items-center">
            <div className="w-12 h-12 rounded-full bg-red-bright/15 text-red-bright border border-red-bright/30 flex items-center justify-center text-xl font-black mb-1">
              ⚡
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-bright animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-bright">
                ADMIN CONSOLE
              </span>
            </div>
            <h2 className="text-2xl font-bold text-paper">
              WIB Discovery Calls
            </h2>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              Sign in to manage all client meetings, view project briefs, and send cancellation or reschedule notices.
            </p>
          </div>

          {loginError && (
            <div className="text-xs sm:text-sm font-medium text-red-bright border-l-3 border-red-bright bg-[#140D0D] px-4 py-3 rounded-r-md">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-paper uppercase tracking-wider">
                Admin ID
              </label>
              <input
                type="text"
                required
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="pataniprameet"
                className="bg-[#140D0D] border border-paper/20 px-4 py-3 rounded-md text-sm text-paper placeholder:text-muted/40 focus:outline-none focus:border-red-bright focus:ring-1 focus:ring-red-bright transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-paper uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                className="bg-[#140D0D] border border-paper/20 px-4 py-3 rounded-md text-sm text-paper placeholder:text-muted/40 focus:outline-none focus:border-red-bright focus:ring-1 focus:ring-red-bright transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="mt-2 group inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3.5 rounded-md bg-red-gradient text-paper shadow-xl hover:shadow-red-bright/30 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loginLoading ? "VERIFYING..." : "SIGN IN TO DASHBOARD"}</span>
              <span className="font-extrabold group-hover:-translate-x-0.5 transition-transform">
                ‹
              </span>
            </button>
          </form>

          {hasClientToken && onSwitchToClientView && (
            <div className="pt-4 border-t border-paper/10 text-center">
              <button
                type="button"
                onClick={onSwitchToClientView}
                className="text-xs text-muted hover:text-paper underline underline-offset-4"
              >
                ← Back to individual booking view
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: LOGGED-IN ADMIN CONSOLE
  // ==========================================
  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-gradient text-paper font-semibold text-sm px-6 py-3.5 rounded-lg shadow-2xl border border-red-bright/50 animate-bounce">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-paper/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
              CONSOLE ACTIVE
            </span>
            <span className="text-muted/40">·</span>
            <span className="text-xs text-muted">
              Logged in as <strong className="text-paper">{adminUser?.name || "Prameet Patani"}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-paper uppercase tracking-tight">
            BOOKING MANAGEMENT
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fetchBookings(adminToken)}
            disabled={loadingBookings}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-md bg-[#140D0D] border border-paper/20 hover:border-paper/40 text-paper transition-all cursor-pointer disabled:opacity-50"
            title="Refresh bookings from Google Sheets"
          >
            <span>{loadingBookings ? "SYNCING..." : "REFRESH ↻"}</span>
          </button>

          {hasClientToken && onSwitchToClientView && (
            <button
              type="button"
              onClick={onSwitchToClientView}
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-paper px-3 py-2 border border-paper/10 rounded-md hover:border-paper/30"
            >
              Client View
            </button>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-md bg-transparent border border-red-bright/40 text-red-bright hover:bg-red-bright/10 transition-all cursor-pointer"
          >
            SIGN OUT
          </button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-ink-raised border border-paper/10 p-5 rounded-lg flex flex-col gap-1 shadow-md">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Total Bookings
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-paper">
            {metrics.total}
          </span>
        </div>

        <div className="bg-ink-raised border border-paper/10 p-5 rounded-lg flex flex-col gap-1 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Upcoming Calls
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {metrics.upcoming}
          </span>
        </div>

        <div className="bg-ink-raised border border-paper/10 p-5 rounded-lg flex flex-col gap-1 shadow-md">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted">
            Completed / Past
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-paper/70">
            {metrics.completed}
          </span>
        </div>

        <div className="bg-ink-raised border border-paper/10 p-5 rounded-lg flex flex-col gap-1 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted">
              Cancelled
            </span>
            <span className="w-2 h-2 rounded-full bg-red-bright" />
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-red-bright">
            {metrics.cancelled}
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-ink-raised border border-paper/10 p-4 rounded-lg shadow-md">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { key: "all", label: `All (${metrics.total})` },
              { key: "upcoming", label: `Upcoming (${metrics.upcoming})` },
              { key: "completed", label: `Completed (${metrics.completed})` },
              { key: "cancelled", label: `Cancelled (${metrics.cancelled})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`px-3.5 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                statusFilter === tab.key
                  ? "bg-red-gradient text-paper shadow-md shadow-red-bright/20"
                  : "bg-[#140D0D] border border-paper/15 text-muted hover:text-paper hover:border-paper/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search company, client, email..."
            className="w-full bg-[#140D0D] border border-paper/20 rounded-md py-2 pl-3 pr-8 text-xs sm:text-sm text-paper placeholder:text-muted/40 focus:outline-none focus:border-red-bright"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-paper"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Bookings List */}
      {fetchError && (
        <div className="py-8 border border-red-bright/30 bg-[#140D0D] rounded-lg p-6 text-center space-y-3">
          <p className="text-sm font-semibold text-red-bright">{fetchError}</p>
          <button
            type="button"
            onClick={() => fetchBookings(adminToken)}
            className="text-xs font-bold uppercase tracking-widest text-paper hover:underline"
          >
            TRY SYNCING AGAIN ‹
          </button>
        </div>
      )}

      {loadingBookings ? (
        <div className="py-24 flex flex-col items-center justify-center gap-4 text-paper bg-ink-raised border border-paper/10 rounded-lg">
          <div className="w-8 h-8 border-2 border-red-bright border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-muted">
            FETCHING BOOKINGS FROM GOOGLE SHEETS...
          </span>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="py-20 border border-dashed border-paper/15 rounded-lg p-8 text-center bg-ink-raised">
          <p className="text-base font-semibold text-paper">No bookings match this filter.</p>
          <p className="text-xs text-muted mt-1">
            {searchQuery
              ? `No results for "${searchQuery}". Clear your search query.`
              : "No sessions recorded under this status yet."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filteredBookings.map((b) => {
            const isCancelled = b.status === "Cancelled";
            const slotTimeMs = new Date(b.startUtc).getTime();
            const isPast = slotTimeMs <= Date.now();

            // Format date in IST
            let formattedIST = "N/A";
            try {
              formattedIST = new Intl.DateTimeFormat("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
              }).format(new Date(b.startUtc));
            } catch {
              formattedIST = b.startIndia || b.startUtc;
            }

            // Format date in Client local timezone
            let formattedClient = "N/A";
            try {
              formattedClient = formatFullDateTime(b.startUtc, b.visitorTimeZone);
            } catch {
              formattedClient = b.startUtc;
            }

            return (
              <div
                key={b.id || b.token}
                className={`bg-ink-raised border rounded-xl p-6 sm:p-7 flex flex-col gap-6 transition-all shadow-xl ${
                  isCancelled
                    ? "border-paper/5 opacity-60"
                    : isPast
                    ? "border-paper/10"
                    : "border-paper/20 hover:border-red-bright/40"
                }`}
              >
                {/* Card Top: Timing & Status Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-paper/10">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm sm:text-base font-bold text-paper">
                        🇮🇳 {formattedIST} (IST)
                      </span>
                      {b.visitorTimeZone && b.visitorTimeZone !== "Asia/Kolkata" && (
                        <>
                          <span className="text-muted/40">·</span>
                          <span className="text-xs sm:text-sm text-muted font-normal">
                            🌐 {formattedClient}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {isCancelled ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-bright/15 text-red-bright border border-red-bright/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-bright" />
                        Cancelled
                      </span>
                    ) : isPast ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-paper/10 text-muted border border-paper/15">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Upcoming Call
                      </span>
                    )}

                    {b.type && (
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#140D0D] border border-paper/15 text-paper">
                        {b.type}
                      </span>
                    )}
                  </div>
                </div>

                {/* Company & Client Details */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left Column (col-span-7): Company & Contact */}
                  <div className="md:col-span-7 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Company / Brand
                      </span>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-paper">
                        {b.company || "Unnamed Brand"}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-muted text-xs">Contact Person</span>
                        <span className="font-semibold text-paper">{b.name || "N/A"}</span>
                      </div>

                      <div className="flex flex-col gap-0.5">
                        <span className="text-muted text-xs">Work Email</span>
                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${b.email}`}
                            className="font-semibold text-red-bright hover:underline truncate"
                          >
                            {b.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => handleCopy(b.email, b.id || b.token)}
                            className="text-xs text-muted hover:text-paper"
                            title="Copy email"
                          >
                            {copiedId === (b.id || b.token) ? "✓" : "❐"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (col-span-5): Brief & Answers */}
                  <div className="md:col-span-5 flex flex-col gap-2.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                      What Brings Them Here
                    </span>
                    <div className="bg-[#140D0D] border border-paper/15 p-3.5 rounded-lg text-xs sm:text-sm text-paper/90 leading-relaxed font-normal flex flex-col gap-2">
                      <p className="font-semibold text-paper">
                        {b.whatBringsYouHere || b.whatsNext || "Not specified"}
                      </p>
                      {(b.whenToStart || b.heardAboutUs) && (
                        <div className="pt-2 border-t border-paper/10 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                          {b.whenToStart && (
                            <span>
                              Looking to start:{" "}
                              <strong className="text-paper">{b.whenToStart}</strong>
                            </span>
                          )}
                          {b.heardAboutUs && (
                            <span>
                              Via: <strong className="text-paper">{b.heardAboutUs}</strong>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Socials & Attribution Links */}
                    {(b.website || b.instagram || b.linkedin || b.src || b.lead) && (
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                        {b.website && (
                          <a
                            href={b.website.startsWith("http") ? b.website : `https://${b.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-[#140D0D] border border-paper/15 hover:border-red-bright text-paper hover:text-red-bright transition-colors"
                          >
                            Website ↗
                          </a>
                        )}
                        {b.instagram && (
                          <a
                            href={b.instagram.startsWith("http") ? b.instagram : `https://instagram.com/${b.instagram.replace(/^@/, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-[#140D0D] border border-paper/15 hover:border-red-bright text-paper hover:text-red-bright transition-colors"
                          >
                            Instagram ↗
                          </a>
                        )}
                        {b.linkedin && (
                          <a
                            href={b.linkedin.startsWith("http") ? b.linkedin : `https://${b.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-[#140D0D] border border-paper/15 hover:border-red-bright text-paper hover:text-red-bright transition-colors"
                          >
                            LinkedIn ↗
                          </a>
                        )}
                        {b.src && (
                          <span className="px-2 py-1 rounded bg-paper/5 text-muted text-[11px] font-mono">
                            src: {b.src}
                          </span>
                        )}
                        {b.lead && (
                          <span className="px-2 py-1 rounded bg-paper/5 text-muted text-[11px] font-mono">
                            lead: {b.lead}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Meet Link & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-paper/10">
                  <div className="flex items-center gap-3">
                    {b.meetLink ? (
                      <a
                        href={b.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-md bg-red-gradient text-paper shadow-md hover:shadow-red-bright/30 hover:brightness-110 transition-all"
                      >
                        <span>JOIN GOOGLE MEET</span>
                        <span className="font-extrabold">‹</span>
                      </a>
                    ) : (
                      <span className="text-xs text-muted">Meet link generated</span>
                    )}

                    <span className="text-xs text-muted/60">
                      ID: {b.id || "WIB"}
                    </span>
                  </div>

                  {/* Admin Actions (Only active if not cancelled) */}
                  {!isCancelled && (
                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => openRescheduleModal(b)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-md bg-[#140D0D] border border-paper/20 hover:border-paper/40 text-paper hover:text-red-bright transition-all cursor-pointer"
                        title="Request client to reschedule"
                      >
                        Request Reschedule
                      </button>

                      <button
                        type="button"
                        onClick={() => openCancelModal(b)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-md bg-transparent border border-red-bright/40 text-red-bright hover:bg-red-bright/10 transition-all cursor-pointer"
                        title="Cancel meeting & send re-book email"
                      >
                        Cancel Call
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================== */}
      {/* ACTION MODAL (CANCEL / RESCHEDULE)        */}
      {/* ========================================== */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-ink-raised border border-paper/20 rounded-xl p-6 sm:p-8 max-w-xl w-full shadow-2xl flex flex-col gap-6">
            <div className="flex items-center justify-between pb-3 border-b border-paper/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-bright" />
                <h3 className="text-lg font-bold text-paper uppercase tracking-wider">
                  {activeModal.type === "cancel"
                    ? "Cancel Call & Send Re-Book Email"
                    : "Request Client to Reschedule"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="text-muted hover:text-paper text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Target Booking Info */}
            <div className="bg-[#140D0D] border border-paper/15 p-4 rounded-lg flex flex-col gap-1 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Target Meeting:</span>
                <span className="font-bold text-paper">
                  {activeModal.booking.company} ({activeModal.booking.name})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Recipient Email:</span>
                <span className="font-mono text-red-bright">
                  {activeModal.booking.email}
                </span>
              </div>
            </div>

            {modalError && (
              <div className="text-xs sm:text-sm font-medium text-red-bright border-l-3 border-red-bright bg-[#140D0D] px-4 py-3 rounded-r-md">
                {modalError}
              </div>
            )}

            {/* Message / Reason Input */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-paper">
                {activeModal.type === "cancel"
                  ? "Reason / Note to Client (included in email)"
                  : "Note to Client explaining the reschedule"}
              </label>
              <textarea
                rows={4}
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="State your reason clearly..."
                className="w-full bg-[#140D0D] border border-paper/20 rounded-md p-3.5 text-xs sm:text-sm text-paper placeholder:text-muted/40 focus:outline-none focus:border-red-bright leading-relaxed resize-none"
              />
              <p className="text-xs text-muted leading-relaxed">
                {activeModal.type === "cancel"
                  ? "This will cancel the session, delete the Google Calendar event, and automatically send an email to the client with this note and a direct button to re-book."
                  : "This will send an email with your note and a direct link allowing the client to pick a new date and time that works for them."}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-paper/10">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                disabled={modalSubmitting}
                className="text-xs font-semibold text-muted hover:text-paper px-4 py-2.5 border border-paper/15 rounded-md hover:border-paper/30 transition-all cursor-pointer"
              >
                Dismiss
              </button>

              <button
                type="button"
                onClick={handleModalSubmit}
                disabled={modalSubmitting}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-md bg-red-gradient text-paper shadow-lg hover:shadow-red-bright/30 hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
              >
                <span>
                  {modalSubmitting
                    ? "SENDING EMAIL..."
                    : activeModal.type === "cancel"
                    ? "CONFIRM CANCELLATION"
                    : "SEND RESCHEDULE REQUEST"}
                </span>
                <span className="font-extrabold">‹</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
