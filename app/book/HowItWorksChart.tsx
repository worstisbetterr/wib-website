"use client";

import React, { useState, useEffect, useRef } from "react";

interface HowItWorksChartProps {
  clientType: "Brand" | "Agency";
  onTypeChange: (type: "Brand" | "Agency") => void;
}

interface StepData {
  num: number;
  title: string;
  desc: string;
}

const BRAND_STEPS: { onCall: StepData[]; afterCall: StepData[] } = {
  onCall: [
    {
      num: 1,
      title: "1. We get to know your brand",
      desc: "Your vision, your audience, and what you want people to feel.",
    },
    {
      num: 2,
      title: "2. We show you what's possible",
      desc: "Everything Directed AI can do for a brand like yours: films, campaigns, characters, whole brand worlds.",
    },
    {
      num: 3,
      title: "3. We shape a plan around your vision",
      desc: "Together, we work out what to make first and where it can grow.",
    },
  ],
  afterCall: [
    {
      num: 4,
      title: "4. A short deck in your inbox",
      desc: "Everything we discussed, turned into a clear plan for your brand.",
    },
    {
      num: 5,
      title: "5. We start building",
      desc: "Your look is signed off first, then we build your ad in 2 days.",
    },
  ],
};

const AGENCY_STEPS: { onCall: StepData[]; afterCall: StepData[] } = {
  onCall: [
    {
      num: 1,
      title: "1. We get to know your agency",
      desc: "Your clients, your briefs, and where AI fits into your work.",
    },
    {
      num: 2,
      title: "2. We show you what's possible",
      desc: "Everything Directed AI can add to what you already offer your clients.",
    },
    {
      num: 3,
      title: "3. We shape how we'll work together",
      desc: "Live briefs, pitches, or AI as a new service for your clients. We plan the collaboration that fits.",
    },
  ],
  afterCall: [
    {
      num: 4,
      title: "4. A short deck in your inbox",
      desc: "A collaboration plan built from our conversation.",
    },
    {
      num: 5,
      title: "5. We start on your first project",
      desc: "Your client signs off the look, then we build the film in 2 days, credited as your production partner.",
    },
  ],
};

export default function HowItWorksChart({
  clientType,
  onTypeChange,
}: HowItWorksChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  // animStage from 0 to 9:
  // 0: Step 1, 1: Arrow 1, 2: Step 2, 3: Arrow 2, 4: Step 3,
  // 5: Arrow 3, 6: Step 4, 7: Arrow 4, 8: Step 5, 9: Completed
  const [animStage, setAnimStage] = useState(9); // default 9 for SSR / accessibility
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Intersection observer to trigger once when scrolled into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle sequential animation when inView or clientType changes
  useEffect(() => {
    if (!inView) return;

    // Check prefers-reduced-motion
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setAnimStage(9);
      return;
    }

    // Start sequence
    setAnimStage(0);
    const interval = setInterval(() => {
      setAnimStage((prev) => {
        if (prev >= 8) {
          clearInterval(interval);
          return 9;
        }
        return prev + 1;
      });
    }, 350);

    return () => clearInterval(interval);
  }, [inView, clientType]);

  const currentContent = clientType === "Agency" ? AGENCY_STEPS : BRAND_STEPS;

  // Arrow drawing helpers
  const isArrow1Drawn = animStage >= 1;
  const isArrow2Drawn = animStage >= 3;
  const isArrow3Drawn = animStage >= 5;
  const isArrow4Drawn = animStage >= 7;

  // Horizontal SVG arrow for desktop
  const renderHorizontalArrow = (isDrawn: boolean) => (
    <div className="hidden lg:flex items-center px-2 self-start mt-2 shrink-0">
      <svg width="34" height="12" viewBox="0 0 34 12" className="overflow-visible">
        <line
          x1="0"
          y1="6"
          x2="26"
          y2="6"
          stroke="#57534C"
          strokeWidth="1"
          strokeDasharray="26"
          strokeDashoffset={isDrawn ? 0 : 26}
          style={{ transition: "stroke-dashoffset 0.35s ease-out" }}
        />
        <path
          d="M25 2 L29 6 L25 10"
          fill="none"
          stroke="#E62E30"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: isDrawn ? 1 : 0,
            transition: "opacity 0.15s ease-out 0.2s",
          }}
        />
      </svg>
    </div>
  );

  // Downward SVG arrow for mobile
  const renderDownwardArrow = (isDrawn: boolean) => (
    <div className="lg:hidden flex items-center justify-center my-2 shrink-0">
      <svg width="12" height="26" viewBox="0 0 12 26" className="overflow-visible">
        <line
          x1="6"
          y1="0"
          x2="6"
          y2="18"
          stroke="#57534C"
          strokeWidth="1"
          strokeDasharray="18"
          strokeDashoffset={isDrawn ? 0 : 18}
          style={{ transition: "stroke-dashoffset 0.35s ease-out" }}
        />
        <path
          d="M2 17 L6 22 L10 17"
          fill="none"
          stroke="#E62E30"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: isDrawn ? 1 : 0,
            transition: "opacity 0.15s ease-out 0.2s",
          }}
        />
      </svg>
    </div>
  );

  return (
    <section ref={containerRef} className="w-full flex flex-col gap-8 py-16 sm:py-20 border-t border-[#1F1D1A]">
      {/* Header & Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-2">
          <span
            className="text-xs font-bold uppercase tracking-widest text-[#E62E30]"
            style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
          >
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFFFF] tracking-tight">
            A brainstorm, not a pitch.
          </h2>
        </div>

        {/* Brand / Agency Toggle */}
        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onTypeChange("Brand")}
            className={`px-4 py-2 rounded-[2px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              clientType === "Brand"
                ? "bg-[#FFFFFF] text-[#0A0908]"
                : "border border-[#2A2824] bg-transparent text-[#8B877F] hover:text-[#D6D3CD]"
            }`}
          >
            I&apos;m a brand
          </button>
          <button
            type="button"
            onClick={() => onTypeChange("Agency")}
            className={`px-4 py-2 rounded-[2px] text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              clientType === "Agency"
                ? "bg-[#FFFFFF] text-[#0A0908]"
                : "border border-[#2A2824] bg-transparent text-[#8B877F] hover:text-[#D6D3CD]"
            }`}
          >
            I&apos;m an agency
          </button>
        </div>
      </div>

      {/* Five-step chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 pt-4">
        {/* GROUP 1: ON THE CALL (Steps 1–3) */}
        <div className="lg:col-span-7 flex flex-col gap-5 lg:border-r lg:border-[#1F1D1A] lg:pr-8">
          <span
            className="text-[11px] font-bold uppercase tracking-widest text-[#8B877F]"
            style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
          >
            ON THE CALL
          </span>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-3 lg:gap-0">
            {/* Step 1 */}
            <div
              className="flex-1 flex flex-col gap-1.5"
              style={{
                opacity: animStage >= 0 ? 1 : 0,
                transform: animStage >= 0 ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
              }}
            >
              <h4 className="font-bold text-[#FFFFFF] text-sm sm:text-base leading-snug">
                {currentContent.onCall[0].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                {currentContent.onCall[0].desc}
              </p>
            </div>

            {/* Arrow 1 -> 2 */}
            {renderHorizontalArrow(isArrow1Drawn)}
            {renderDownwardArrow(isArrow1Drawn)}

            {/* Step 2 */}
            <div
              className="flex-1 flex flex-col gap-1.5"
              style={{
                opacity: animStage >= 2 ? 1 : 0,
                transform: animStage >= 2 ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
              }}
            >
              <h4 className="font-bold text-[#FFFFFF] text-sm sm:text-base leading-snug">
                {currentContent.onCall[1].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                {currentContent.onCall[1].desc}
              </p>
            </div>

            {/* Arrow 2 -> 3 */}
            {renderHorizontalArrow(isArrow2Drawn)}
            {renderDownwardArrow(isArrow2Drawn)}

            {/* Step 3 */}
            <div
              className="flex-1 flex flex-col gap-1.5"
              style={{
                opacity: animStage >= 4 ? 1 : 0,
                transform: animStage >= 4 ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
              }}
            >
              <h4 className="font-bold text-[#FFFFFF] text-sm sm:text-base leading-snug">
                {currentContent.onCall[2].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                {currentContent.onCall[2].desc}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile divider between Group 1 & Group 2 */}
        <div className="lg:hidden flex flex-col items-center">
          {renderDownwardArrow(isArrow3Drawn)}
          <div className="w-full border-t border-[#1F1D1A] my-2" />
        </div>

        {/* GROUP 2: AFTER THE CALL (Steps 4–5) */}
        <div className="lg:col-span-5 flex flex-col gap-5 lg:pl-8">
          <span
            className="text-[11px] font-bold uppercase tracking-widest text-[#8B877F]"
            style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
          >
            AFTER THE CALL
          </span>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-3 lg:gap-0">
            {/* Step 4 */}
            <div
              className="flex-1 flex flex-col gap-1.5"
              style={{
                opacity: animStage >= 6 ? 1 : 0,
                transform: animStage >= 6 ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
              }}
            >
              <h4 className="font-bold text-[#FFFFFF] text-sm sm:text-base leading-snug">
                {currentContent.afterCall[0].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                {currentContent.afterCall[0].desc}
              </p>
            </div>

            {/* Arrow 4 -> 5 */}
            {renderHorizontalArrow(isArrow4Drawn)}
            {renderDownwardArrow(isArrow4Drawn)}

            {/* Step 5 */}
            <div
              className="flex-1 flex flex-col gap-1.5"
              style={{
                opacity: animStage >= 8 ? 1 : 0,
                transform: animStage >= 8 ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
              }}
            >
              <h4 className="font-bold text-[#FFFFFF] text-sm sm:text-base leading-snug">
                {currentContent.afterCall[1].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#D6D3CD] leading-relaxed">
                {currentContent.afterCall[1].desc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Under-chart small centered text */}
      <p
        className="text-center text-xs text-[#8B877F] mt-6"
        style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
      >
        Every project starts with a conversation, not a contract.
      </p>
    </section>
  );
}
