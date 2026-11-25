"use client";

import React, { useMemo, useState, useEffect } from "react";
import {
  COMMON_TIMEZONES,
  formatSlotTime,
  getLocalDateKey,
  getSlotPeriod,
  groupSlotsByDate,
} from "./booking-utils";

interface SlotPickerProps {
  slots: string[];
  selectedSlot: string | null;
  onSelectSlot: (slotUtc: string) => void;
  timeZone: string;
  onTimeZoneChange: (tz: string) => void;
  loading?: boolean;
}

export default function SlotPicker({
  slots,
  selectedSlot,
  onSelectSlot,
  timeZone,
  onTimeZoneChange,
  loading = false,
}: SlotPickerProps) {
  // 5-day rolling window with local daylight filter
  const groupedSlots = useMemo(() => {
    return groupSlotsByDate(slots, timeZone, 5);
  }, [slots, timeZone]);

  const availableDateKeys = useMemo(() => {
    return Object.keys(groupedSlots).sort();
  }, [groupedSlots]);

  // Selected date key
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(() => {
    if (selectedSlot) {
      return getLocalDateKey(selectedSlot, timeZone);
    }
    return availableDateKeys[0] || null;
  });

  useEffect(() => {
    if (selectedSlot) {
      setSelectedDateKey(getLocalDateKey(selectedSlot, timeZone));
    }
  }, [selectedSlot, timeZone]);

  useEffect(() => {
    if (!selectedDateKey && availableDateKeys.length > 0) {
      setSelectedDateKey(availableDateKeys[0]);
    } else if (selectedDateKey && !availableDateKeys.includes(selectedDateKey) && availableDateKeys.length > 0) {
      setSelectedDateKey(availableDateKeys[0]);
    }
  }, [availableDateKeys, selectedDateKey]);

  // Active slots for selected date
  const daySlots = selectedDateKey ? groupedSlots[selectedDateKey] || [] : [];

  // Categorize slots by Morning / Afternoon / Evening
  const categorizedSlots = useMemo(() => {
    const morning: string[] = [];
    const afternoon: string[] = [];
    const evening: string[] = [];

    for (const slot of daySlots) {
      const period = getSlotPeriod(slot, timeZone);
      if (period === "morning") morning.push(slot);
      else if (period === "afternoon") afternoon.push(slot);
      else evening.push(slot);
    }

    return { morning, afternoon, evening };
  }, [daySlots, timeZone]);

  // Generate 5 rolling days
  const rollingDays = useMemo(() => {
    const days: { dateKey: string; weekday: string; dayNum: string; monthStr: string; isToday: boolean; hasSlots: boolean }[] = [];
    const now = new Date();
    const todayKey = getLocalDateKey(now.toISOString(), timeZone);

    for (let i = 0; i < 5; i++) {
      const d = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      const key = getLocalDateKey(d.toISOString(), timeZone);
      const parts = key.split("-").map(Number);
      const localDateObj = new Date(parts[0], parts[1] - 1, parts[2]);

      const weekday = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone }).format(localDateObj);
      const dayNum = new Intl.DateTimeFormat("en-US", { day: "numeric", timeZone }).format(localDateObj);
      const monthStr = new Intl.DateTimeFormat("en-US", { month: "short", timeZone }).format(localDateObj);

      days.push({
        dateKey: key,
        weekday: i === 0 ? "Today" : weekday,
        dayNum,
        monthStr: monthStr,
        isToday: key === todayKey,
        hasSlots: Boolean(groupedSlots[key] && groupedSlots[key].length > 0),
      });
    }
    return days;
  }, [timeZone, groupedSlots]);

  return (
    <div className="flex flex-col gap-8">
      {/* Top Bar: Timezone Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1F1D1A]">
        <span
          className="text-xs font-bold uppercase tracking-wider text-[#8B877F]"
          style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
        >
          Select date and slot ({timeZone})
        </span>

        <div className="relative inline-block">
          <select
            value={timeZone}
            onChange={(e) => onTimeZoneChange(e.target.value)}
            className="appearance-none bg-[#100F0D] text-[#D6D3CD] text-xs font-mono py-2 pl-3 pr-8 rounded-[2px] border border-[#2A2824] hover:border-[#57534C] focus:outline-none focus:border-[#E62E30] transition-colors cursor-pointer"
          >
            {COMMON_TIMEZONES.some((tz) => tz.value === timeZone) ? null : (
              <option value={timeZone}>{timeZone}</option>
            )}
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value} className="bg-[#0A0908] text-[#D6D3CD]">
                {tz.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#8B877F]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-16 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-2 border-[#E62E30] border-t-transparent rounded-full animate-spin" />
          <span
            className="text-xs text-[#8B877F]"
            style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
          >
            Checking open slots...
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {/* 1. Day Selector Cards */}
          <div className="flex flex-col gap-3">
            <span
              className="text-xs font-bold uppercase tracking-wider text-[#8B877F]"
              style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
            >
              1. Date (5-day window)
            </span>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {rollingDays.map((day) => {
                const isSelected = selectedDateKey === day.dateKey;
                const isAvailable = day.hasSlots;

                return (
                  <button
                    key={day.dateKey}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedDateKey(day.dateKey)}
                    className={`py-3.5 px-1.5 rounded-[2px] flex flex-col items-center justify-center transition-all border cursor-pointer ${
                      isSelected
                        ? "bg-[#100F0D] border-2 border-[#E62E30] text-[#FFFFFF]"
                        : isAvailable
                        ? "bg-[#100F0D] border border-[#2A2824] hover:border-[#57534C] text-[#D6D3CD]"
                        : "bg-[#0A0908] border border-[#1F1D1A] text-[#57534C] cursor-not-allowed opacity-40"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-mono tracking-wide ${
                        isSelected ? "text-[#E62E30] font-bold" : "text-[#8B877F]"
                      }`}
                    >
                      {day.weekday}
                    </span>
                    <span className="text-xl sm:text-2xl font-bold my-0.5">
                      {day.dayNum}
                    </span>
                    <span className="text-[10px] font-mono text-[#8B877F]">
                      {day.monthStr}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Time Slots */}
          <div className="flex flex-col gap-6 pt-4 border-t border-[#1F1D1A]">
            <span
              className="text-xs font-bold uppercase tracking-wider text-[#8B877F]"
              style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
            >
              2. 30-Minute Time Slot
            </span>

            {daySlots.length === 0 ? (
              <div className="py-10 border border-[#2A2824] rounded-[2px] p-4 text-center bg-[#100F0D]">
                <p className="text-xs text-[#8B877F]">
                  No open slots on this day. Please select another date above.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* MORNING */}
                {categorizedSlots.morning.length > 0 && (
                  <div className="flex flex-col gap-2.5">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider text-[#8B877F]"
                    >
                      Morning (8:30 AM – 12:00 PM)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {categorizedSlots.morning.map((slotUtc) => {
                        const isSelected = selectedSlot === slotUtc;
                        const label = formatSlotTime(slotUtc, timeZone);
                        return (
                          <button
                            key={slotUtc}
                            type="button"
                            onClick={() => onSelectSlot(slotUtc)}
                            className={`py-2.5 px-3 rounded-[2px] text-xs sm:text-sm font-mono font-medium transition-all border cursor-pointer ${
                              isSelected
                                ? "bg-[#100F0D] border-2 border-[#E62E30] text-[#FFFFFF] font-bold"
                                : "bg-[#100F0D] hover:border-[#57534C] border border-[#2A2824] text-[#D6D3CD]"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* AFTERNOON */}
                {categorizedSlots.afternoon.length > 0 && (
                  <div className="flex flex-col gap-2.5">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider text-[#8B877F]"
                    >
                      Afternoon (12:00 PM – 5:00 PM)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {categorizedSlots.afternoon.map((slotUtc) => {
                        const isSelected = selectedSlot === slotUtc;
                        const label = formatSlotTime(slotUtc, timeZone);
                        return (
                          <button
                            key={slotUtc}
                            type="button"
                            onClick={() => onSelectSlot(slotUtc)}
                            className={`py-2.5 px-3 rounded-[2px] text-xs sm:text-sm font-mono font-medium transition-all border cursor-pointer ${
                              isSelected
                                ? "bg-[#100F0D] border-2 border-[#E62E30] text-[#FFFFFF] font-bold"
                                : "bg-[#100F0D] hover:border-[#57534C] border border-[#2A2824] text-[#D6D3CD]"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* EVENING */}
                {categorizedSlots.evening.length > 0 && (
                  <div className="flex flex-col gap-2.5">
                    <span
                      className="text-[11px] font-mono uppercase tracking-wider text-[#8B877F]"
                    >
                      Evening (5:00 PM – 9:00 PM)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {categorizedSlots.evening.map((slotUtc) => {
                        const isSelected = selectedSlot === slotUtc;
                        const label = formatSlotTime(slotUtc, timeZone);
                        return (
                          <button
                            key={slotUtc}
                            type="button"
                            onClick={() => onSelectSlot(slotUtc)}
                            className={`py-2.5 px-3 rounded-[2px] text-xs sm:text-sm font-mono font-medium transition-all border cursor-pointer ${
                              isSelected
                                ? "bg-[#100F0D] border-2 border-[#E62E30] text-[#FFFFFF] font-bold"
                                : "bg-[#100F0D] hover:border-[#57534C] border border-[#2A2824] text-[#D6D3CD]"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
