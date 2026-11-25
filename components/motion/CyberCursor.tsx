"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const CyberCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Desktop pointer devices only
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.closest("button") ||
          target.closest("a") ||
          target.closest("input") ||
          target.closest("[role='button']") ||
          target.classList.contains("cursor-pointer");
        setIsHovered(!!isInteractive);
      }
    };

    const onMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 250);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
      }}
    >
      {/* Central Laser Dot */}
      <motion.div
        animate={{
          scale: isClicked ? 1.8 : isHovered ? 1.4 : 1,
        }}
        className="h-2 w-2 rounded-full bg-red-bright shadow-[0_0_10px_#E72D31] relative flex items-center justify-center z-10"
      >
        <span className="h-0.5 w-0.5 rounded-full bg-white" />
      </motion.div>

      {/* Sleek Outer Robotic Reticle Brackets */}
      <motion.div
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.5 : 1,
          rotate: isHovered ? 90 : 0,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className="absolute inset-0 -m-3 h-8 w-8 flex items-center justify-center pointer-events-none"
      >
        <div
          className={`h-full w-full rounded-full border ${
            isHovered
              ? "border-red-bright bg-red-bright/10 shadow-[0_0_12px_rgba(231,45,49,0.5)]"
              : "border-paper/40"
          } transition-colors duration-200 relative`}
        >
          {/* Micro Corner Reticle Crosshairs */}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-0.5 bg-red-bright" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-0.5 bg-red-bright" />
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 h-0.5 w-1 bg-red-bright" />
          <span className="absolute top-1/2 -right-1 -translate-y-1/2 h-0.5 w-1 bg-red-bright" />
        </div>
      </motion.div>

      {/* Click Shockwave Ring */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 -m-4 h-10 w-10 rounded-full border border-red-bright bg-red-bright/20 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CyberCursor;
