"use client";

import { caseStudies } from "@/content/work";
import React from "react";

export const WorkStrip: React.FC = () => {
  return (
    <section className="py-12 bg-ink-raised hairline-b overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <span className="font-display text-xs font-bold uppercase tracking-widest text-muted flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-bright animate-ping" />
          <span>AUTOPLAY REEL CLIP STREAM</span>
        </span>
        <span className="font-mono text-xs text-muted">01 — 04 LOOPS</span>
      </div>

      {/* Ticker / Carousel Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
        {caseStudies.map((study) => (
          <div
            key={study.slug}
            className="group relative h-48 sm:h-64 rounded-sm overflow-hidden hairline-box bg-ink"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={study.poster}
              className="w-full h-full object-cover filter contrast-110 saturate-90 transition-transform duration-500 group-hover:scale-105"
            >
              {study.video && <source src={study.video} type="video/mp4" />}
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent p-4 flex flex-col justify-between">
              <span className="self-end text-[10px] font-mono px-2 py-0.5 bg-ink/80 text-paper border border-hairline uppercase">
                {study.category}
              </span>
              <div>
                <span className="font-display text-xs font-bold text-red-bright uppercase tracking-wider block">
                  {study.client}
                </span>
                <p className="font-display text-sm font-semibold text-paper truncate">
                  {study.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkStrip;
