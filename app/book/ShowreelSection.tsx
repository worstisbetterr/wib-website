"use client";

import React, { useState } from "react";

export default function ShowreelSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const scrollToBooking = () => {
    const el = document.getElementById("booking-widget");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full flex flex-col items-center gap-8 py-16 sm:py-20 border-t border-[#1F1D1A]">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <span
          className="text-xs font-bold uppercase tracking-widest text-[#E62E30]"
          style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
        >
          THE WORK
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFFFF] tracking-tight">
          38 seconds of Directed AI.
        </h2>
      </div>

      {/* Video Container (16:9, rounded 4px, 1px border #2A2824) */}
      <div className="w-full max-w-4xl mx-auto aspect-video rounded-[4px] border border-[#2A2824] bg-[#100F0D] overflow-hidden relative">
        {!isPlaying ? (
          <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* Thumbnail */}
            <img
              src="https://i.ytimg.com/vi/TZsb6T9csno/maxresdefault.jpg"
              alt="Worstisbetterr 38s Showreel"
              className="w-full h-full object-cover brightness-95 group-hover:brightness-105 transition-all"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0A0908]/85 border border-[#2A2824] group-hover:border-[#E62E30] flex items-center justify-center transition-all group-hover:scale-105"
                aria-label="Play showreel video"
              >
                <svg
                  width="22"
                  height="24"
                  viewBox="0 0 22 24"
                  fill="none"
                  className="translate-x-0.5"
                >
                  <path d="M20 12L2 1.6077V22.3923L20 12Z" fill="#FFFFFF" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <iframe
            src="https://www.youtube-nocookie.com/embed/TZsb6T9csno?autoplay=1&rel=0"
            title="Worstisbetterr Showreel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        )}
      </div>

      {/* Fallback link */}
      <div className="flex flex-col items-center gap-6 mt-1">
        <a
          href="https://youtu.be/TZsb6T9csno"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8B877F] hover:text-[#D6D3CD] underline underline-offset-4 transition-colors"
          style={{ fontFamily: "var(--font-ubuntu-mono), monospace" }}
        >
          Watch on YouTube
        </a>

        {/* Scroll back link */}
        <button
          type="button"
          onClick={scrollToBooking}
          className="font-bold text-sm sm:text-base text-[#E62E30] hover:underline cursor-pointer transition-colors"
        >
          Seen enough? Pick a time ↑
        </button>
      </div>
    </section>
  );
}
