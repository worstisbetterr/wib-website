"use client";

import Cute3DRobotAvatar from "@/components/brand/Cute3DRobotAvatar";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export const RobotCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate custom robot cursor on desktop pointer devices
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
      setTimeout(() => setIsClicked(false), 300);
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
      <motion.div
        animate={{
          scale: isClicked ? 1.35 : isHovered ? 1.2 : 1,
          rotate: isHovered ? [0, -12, 12, 0] : 0,
        }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className="relative flex items-center justify-center"
      >
        {/* Cyan Radar Halo on Hover */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1.9], opacity: [0.8, 0.4, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeOut" }}
            className="absolute h-12 w-12 rounded-full border border-[#00F0FF] bg-[#00F0FF]/15 pointer-events-none"
          />
        )}

        {/* Shockwave Burst on Click */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute h-14 w-14 rounded-full border-2 border-[#00F0FF] bg-[#00F0FF]/25 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Reference Image Cute 3D Robot Avatar Pointer */}
        <Cute3DRobotAvatar
          size={36}
          expression={isClicked ? "shocked" : isHovered ? "wink" : "happy"}
          isHovered={isHovered}
        />
      </motion.div>
    </div>
  );
};

export default RobotCursor;
