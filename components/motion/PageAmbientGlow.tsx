"use client";

import { motion, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

export const PageAmbientGlow: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  // Smooth Spring Mouse Tracking for ambient full-page glow
  const mouseX = useSpring(-500, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(-500, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsDesktop(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Full-Page Interactive Cursor Ambient Radial Spotlight */}
      <motion.div
        className="absolute w-[900px] h-[900px] -ml-[450px] -mt-[450px] rounded-full blur-[140px] opacity-70 transition-opacity duration-500"
        style={{
          left: mouseX,
          top: mouseY,
          background: "radial-gradient(circle, rgba(231, 45, 49, 0.08) 0%, rgba(231, 45, 49, 0.02) 50%, transparent 75%)",
        }}
      />

      {/* Subtle HUD Fixed Corner Micro-Accents */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-2 font-mono text-[9px] text-paper/40 tracking-widest uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-red-bright animate-pulse" />
        <span>WIB STUDIO // AI-NATIVE CORE</span>
      </div>

      <div className="fixed bottom-6 right-6 z-40 hidden lg:flex items-center gap-2 font-mono text-[9px] text-paper/40 tracking-widest uppercase">
        <span>LATENCY: 8ms</span>
        <span className="text-red-bright/60">•</span>
        <span>STATUS: ACTIVE</span>
      </div>
    </div>
  );
};

export default PageAmbientGlow;
