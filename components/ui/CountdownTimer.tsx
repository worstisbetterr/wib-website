"use client";

import React, { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({
  targetDateStr = "2026-09-15T00:00:00+05:30",
}: {
  targetDateStr?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const targetDate = new Date(targetDateStr).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  if (!mounted) return null;

  return (
    <div className="w-full bg-gradient-to-b from-ink-raised via-ink to-black border border-red-bright/30 rounded-sm p-6 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden my-8">
      {/* Background Ambient Glow & Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-bright/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-red-bright/10 blur-3xl pointer-events-none" />

      {/* Header Badge & Hype Copy */}
      <div className="relative z-10 flex flex-col items-center text-center gap-4 mb-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-bright/15 border border-red-bright/40 font-mono text-xs font-bold text-red-bright tracking-widest uppercase">
          <span className="h-2 w-2 rounded-full bg-red-bright animate-ping" />
          <span>FIRST DROP // SEPTEMBER 15TH</span>
        </div>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-paper tracking-wider max-w-4xl leading-tight">
          DROPPING OUR <br />
          FIRST PROJECT ON <br />
          <span className="text-red-bright">SEPTEMBER 15TH.</span>
        </h2>
      </div>

      {/* Countdown Timer Display Boxes */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
        <TimerBox label="DAYS" value={timeLeft.days} />
        <TimerBox label="HOURS" value={timeLeft.hours} />
        <TimerBox label="MINUTES" value={timeLeft.minutes} />
        <TimerBox label="SECONDS" value={timeLeft.seconds} isPulsing />
      </div>

      {/* Bottom Priority Brief Callout */}
      <div className="relative z-10 mt-12 pt-8 border-t border-paper/10 flex justify-center">
        <a
          href="/contact"
          className="inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-red-bright to-red-dark hover:brightness-110 text-paper font-display text-xs font-extrabold uppercase tracking-widest rounded-sm transition-all shadow-lg hover:scale-[1.02] active:scale-[0.99]"
        >
          <span>SUBMIT BRIEF NOW</span>
          <span className="font-display text-sm font-extrabold">‹</span>
        </a>
      </div>
    </div>
  );
}

function TimerBox({
  label,
  value,
  isPulsing = false,
}: {
  label: string;
  value: number;
  isPulsing?: boolean;
}) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-ink border border-paper/15 rounded-sm relative shadow-inner group hover:border-red-bright/50 transition-colors">
      <div
        className={`font-mono text-4xl sm:text-6xl lg:text-7xl font-extrabold text-paper tracking-wider ${
          isPulsing ? "text-red-bright" : ""
        }`}
      >
        {formatted}
      </div>
      <div className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-muted/70 uppercase mt-3">
        {label}
      </div>
    </div>
  );
}
