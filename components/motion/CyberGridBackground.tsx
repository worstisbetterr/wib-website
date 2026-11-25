"use client";

import { motion, useSpring } from "framer-motion";
import React, { useEffect, useState } from "react";

export const CyberGridBackground: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  // Smooth Spring Mouse Coordinates for grid spotlighting
  const mouseX = useSpring(-1000, { stiffness: 70, damping: 22 });
  const mouseY = useSpring(-1000, { stiffness: 70, damping: 22 });

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

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#080808]">
      {/* 1. Precise Tactical Grid Lines Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0c_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0c_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* 2. Floating Ambient Light Orbs Drifting in Background */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-red-bright/10 rounded-full blur-[180px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 60, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/3 w-[550px] h-[550px] bg-[#00F0FF]/5 rounded-full blur-[160px]"
      />

      {/* 3. Interactive Mouse Spotlight Grid Illuminator (Desktop only) */}
      {isDesktop && (
        <motion.div
          className="absolute w-[800px] h-[800px] -ml-[400px] -mt-[400px] rounded-full blur-[120px] opacity-90 transition-opacity duration-300"
          style={{
            left: mouseX,
            top: mouseY,
            background:
              "radial-gradient(circle, rgba(231, 45, 49, 0.16) 0%, rgba(231, 45, 49, 0.04) 45%, transparent 70%)",
          }}
        />
      )}

      {/* 4. Subtle Animated Vertical Laser Beam Scanline */}
      <motion.div
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-bright/35 to-transparent opacity-60 shadow-[0_0_15px_#E72D31]"
      />

      {/* 5. Edge Vignette Darkening */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none opacity-80" />
    </div>
  );
};

export default CyberGridBackground;
