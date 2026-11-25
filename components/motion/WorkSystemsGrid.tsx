"use client";

import React from "react";

export default function WorkSystemsGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 🌟 1. FLOWING AMBIENT GRADIENT LIGHT ORBS (Rolex/High-End Liquid Atmosphere) */}
      <div 
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-gradient-to-tr from-red-bright/18 via-red-bright/6 to-transparent rounded-full blur-[160px] pointer-events-none transform-gpu animate-pulse"
        style={{ animationDuration: "12s" }}
      />
      <div 
        className="absolute top-[38%] right-[-10%] w-[850px] h-[850px] bg-gradient-to-bl from-red-bright/14 via-red-bright/4 to-transparent rounded-full blur-[180px] pointer-events-none transform-gpu animate-pulse"
        style={{ animationDuration: "16s", animationDelay: "3s" }}
      />
      <div 
        className="absolute top-[75%] left-[-10%] w-[900px] h-[700px] bg-gradient-to-tr from-red-bright/14 via-red-bright/5 to-transparent rounded-full blur-[170px] pointer-events-none transform-gpu animate-pulse"
        style={{ animationDuration: "14s", animationDelay: "6s" }}
      />

      {/* 2. SOFT ELEGANT LUXURY MASKED GRID (Refined 15% opacity - Not in your face) */}
      <div
        className="absolute inset-0 opacity-15 transform-gpu"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 75%, transparent 100%)",
        }}
      />

      {/* 3. FLOWING AMBIENT SCROLL VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink/90 pointer-events-none" />
    </div>
  );
}
