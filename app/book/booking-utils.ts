export interface BookingDetails {
  id?: string;
  token?: string;
  name?: string;
  email?: string;
  type?: "Brand" | "Agency" | string;
  company?: string;
  websiteOrSocial?: string;
  whatsNext?: string;
  startUtc: string;
  visitorTimeZone: string;
  meetLink?: string;
  status: "Booked" | "Rescheduled" | "Cancelled" | string;
}

export const COMMON_TIMEZONES = [
  { value: "Asia/Kolkata", label: "India (IST, GMT+5:30)" },
  { value: "America/New_York", label: "New York (ET, GMT-5 / GMT-4)" },
  { value: "America/Los_Angeles", label: "Los Angeles / SF (PT, GMT-8 / GMT-7)" },
  { value: "America/Chicago", label: "Chicago (CT, GMT-6 / GMT-5)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Berlin", label: "Berlin / Paris / Amsterdam (CET/CEST)" },
  { value: "Asia/Dubai", label: "Dubai / UAE (GST, GMT+4)" },
  { value: "Asia/Singapore", label: "Singapore / HK (SGT, GMT+8)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST, GMT+9)" },
  { value: "Australia/Sydney", label: "Sydney (AEST/AEDT, GMT+10 / +11)" },
];

/**
 * Returns local hour and minute in visitor timezone.
 */
export function getLocalHourMinute(
  utcIsoString: string,
  timeZone: string
): { hour: number; minute: number } {
  try {
    const date = new Date(utcIsoString);
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const hourPart = parts.find((p) => p.type === "hour");
    const minPart = parts.find((p) => p.type === "minute");
    let hour = hourPart ? parseInt(hourPart.value, 10) : date.getUTCHours();
    if (hour === 24) hour = 0;
    const minute = minPart ? parseInt(minPart.value, 10) : date.getUTCMinutes();
    return { hour, minute };
  } catch {
    const d = new Date(utcIsoString);
    return { hour: d.getUTCHours(), minute: d.getUTCMinutes() };
  }
}

/**
 * Ensures the slot falls during civilized waking/business hours in the visitor's local timezone
 * (Between 08:30 AM and 09:00 PM local time).
 * This eliminates awkward midnight/3 AM slots for international prospects.
 */
export function isDaylightSlot(utcIsoString: string, timeZone: string): boolean {
  const { hour, minute } = getLocalHourMinute(utcIsoString, timeZone);
  const totalMinutes = hour * 60 + minute;
  // 08:30 AM = 510 min; 09:00 PM (21:00) = 1260 min
  return totalMinutes >= 510 && totalMinutes <= 1260;
}

/**
 * Formats a UTC ISO timestamp into a local date string (YYYY-MM-DD) for a given timezone.
 */
export function getLocalDateKey(utcIsoString: string, timeZone: string): string {
  try {
    const date = new Date(utcIsoString);
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formatter.format(date); // YYYY-MM-DD
  } catch {
    return new Date(utcIsoString).toISOString().split("T")[0];
  }
}

/**
 * Formats a UTC timestamp into a time string (e.g. "14:30" or "2:30 PM") in visitor's timezone.
 */
export function formatSlotTime(utcIsoString: string, timeZone: string): string {
  try {
    const date = new Date(utcIsoString);
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return new Date(utcIsoString).toLocaleTimeString();
  }
}

/**
 * Formats full human-readable date & time in visitor timezone.
 * e.g., "Thursday, 12 Nov 2026 at 2:30 PM (Asia/Kolkata)"
 */
export function formatFullDateTime(utcIsoString: string, timeZone: string): string {
  try {
    const date = new Date(utcIsoString);
    const dateStr = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
    return `${dateStr} (${timeZone})`;
  } catch {
    return `${new Date(utcIsoString).toLocaleString()} (${timeZone})`;
  }
}

/**
 * Categorizes a slot into MORNING, AFTERNOON, or EVENING in visitor's local time.
 */
export function getSlotPeriod(
  utcIsoString: string,
  timeZone: string
): "morning" | "afternoon" | "evening" {
  const { hour, minute } = getLocalHourMinute(utcIsoString, timeZone);
  const totalMinutes = hour * 60 + minute;
  if (totalMinutes < 720) return "morning"; // Before 12:00 PM
  if (totalMinutes < 1020) return "afternoon"; // 12:00 PM - 5:00 PM
  return "evening"; // 5:00 PM onwards
}

/**
 * Groups an array of UTC ISO slot strings by their date in the visitor's timezone.
 * Enforces:
 * 1. 5-day booking window (max 5 days ahead)
 * 2. Daylight filter (eliminates midnight/early morning slots in visitor's city)
 */
export function groupSlotsByDate(
  slots: string[],
  timeZone: string,
  maxDaysAhead: number = 5
): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  const now = new Date();
  const maxAllowedMs = now.getTime() + maxDaysAhead * 24 * 60 * 60 * 1000;

  for (const slot of slots) {
    const slotTime = new Date(slot).getTime();
    if (slotTime > maxAllowedMs) continue; // Respect 5-day window

    // Respect normal daytime/waking hours in visitor timezone
    if (!isDaylightSlot(slot, timeZone)) {
      continue;
    }

    const dateKey = getLocalDateKey(slot, timeZone);
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(slot);
  }

  // Sort slots inside each date
  for (const dateKey of Object.keys(grouped)) {
    grouped[dateKey].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }

  return grouped;
}

/**
 * Builds Google Calendar web add link for 1-click addition on confirmation.
 */
export function getGoogleCalendarUrl(
  company: string,
  startUtc: string,
  meetLink?: string
): string {
  try {
    const start = new Date(startUtc);
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    const formatGCal = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const title = `Worstisbetterr x ${company}`;
    const details = `30-minute meeting with Prameet Patani (Worstisbetterr).\n\nJoin Google Meet: ${
      meetLink || "Link in calendar invite"
    }`;
    const location = meetLink || "Google Meet";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${formatGCal(start)}/${formatGCal(
      end
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}`;
  } catch {
    return "#";
  }
}
