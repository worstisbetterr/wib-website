"use client";

import { motion } from "framer-motion";
import React from "react";

interface Cute3DRobotAvatarProps {
  className?: string;
  size?: number; // Size in pixels
  expression?: "happy" | "naughty" | "wink" | "shocked";
  isHovered?: boolean;
}

export const Cute3DRobotAvatar: React.FC<Cute3DRobotAvatarProps> = ({
  className = "",
  size = 64,
  expression = "happy",
  isHovered = false,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center select-none ${className}`}
      style={{ width: `${size}px`, height: `${size * 1.25}px` }}
    >
      {/* 1. Side Antennas with Glowing Cyan Tips */}
      <div className="absolute -top-2 w-full flex justify-between px-1.5 z-0">
        {/* Left Antenna */}
        <div className="flex flex-col items-center transform -rotate-12">
          <motion.span
            animate={{ scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]"
          />
          <span className="h-2.5 w-0.5 bg-zinc-400" />
        </div>
        {/* Right Antenna */}
        <div className="flex flex-col items-center transform rotate-12">
          <motion.span
            animate={{ scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="h-2 w-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]"
          />
          <span className="h-2.5 w-0.5 bg-zinc-400" />
        </div>
      </div>

      {/* 2. Glossy 3D Head Helmet (Reference Image matching) */}
      <motion.div
        animate={{ y: isHovered ? [0, -3, 0] : [0, -1.5, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="relative z-10 w-full aspect-[1.1/1] rounded-2xl bg-gradient-to-b from-white via-zinc-100 to-zinc-300 border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.4),0_0_15px_rgba(0,240,255,0.25)] p-1.5 flex items-center justify-center overflow-hidden"
      >
        {/* Helmet Side Ear Cups */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-5 w-2 rounded-l-full bg-zinc-300 border border-zinc-400 flex items-center justify-center">
          <span className="h-2 w-1 rounded-full bg-[#00F0FF]" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 h-5 w-2 rounded-r-full bg-zinc-300 border border-zinc-400 flex items-center justify-center">
          <span className="h-2 w-1 rounded-full bg-[#00F0FF]" />
        </div>

        {/* Rounded Dark Glass Visor Screen */}
        <div className="w-full h-full rounded-xl bg-zinc-950 border border-zinc-700/80 flex flex-col items-center justify-center p-1.5 relative overflow-hidden shadow-inner">
          {/* Cyan Glow Reflection Overhead */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-[#00F0FF]/30 to-transparent pointer-events-none" />

          {/* Cyan Oval Glowing Eyes & Expression */}
          <div className="w-full flex items-center justify-around px-2 pt-0.5">
            {/* Left Eye */}
            <motion.div
              animate={{
                scaleY: expression === "wink" ? [1, 0.1, 1] : isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: expression === "wink" ? 0.3 : 1.5, repeat: expression === "wink" ? 0 : Infinity }}
              className="h-4 w-3.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] flex items-center justify-center"
            >
              <div className="h-1.5 w-1 rounded-full bg-white/90" />
            </motion.div>

            {/* Right Eye */}
            <motion.div
              animate={{
                scaleY: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-4 w-3.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] flex items-center justify-center"
            >
              <div className="h-1.5 w-1 rounded-full bg-white/90" />
            </motion.div>
          </div>

          {/* Cute Cyan Glowing Smile Line */}
          <div className="mt-1 flex justify-center">
            {expression === "shocked" ? (
              <span className="h-2 w-2 rounded-full border-2 border-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
            ) : (
              <svg className="w-5 h-2 text-[#00F0FF] drop-shadow-[0_0_6px_#00F0FF]" viewBox="0 0 24 12" fill="none">
                <path d="M3 3C7 10 17 10 21 3" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </div>
      </motion.div>

      {/* 3. Neck Joint */}
      <div className="h-1.5 w-4 bg-zinc-700 border-x border-zinc-500 z-0 -my-0.5" />

      {/* 4. Glossy 3D Body Chest Plate */}
      <div className="relative z-10 w-[78%] h-[32%] rounded-xl bg-gradient-to-b from-white via-zinc-100 to-zinc-300 border border-white shadow-md flex items-center justify-between px-1.5 py-1">
        {/* Left Arm Joint */}
        <div className="h-3 w-1.5 rounded-l-md bg-zinc-400" />

        {/* Chest Core Glowing Cyan Button */}
        <div className="h-2.5 w-2.5 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF] flex items-center justify-center shadow-[0_0_6px_#00F0FF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] animate-pulse" />
        </div>

        {/* Right Arm Joint */}
        <div className="h-3 w-1.5 rounded-r-md bg-zinc-400" />
      </div>

      {/* 5. Cute Rounded 3D Feet */}
      <div className="w-[85%] flex justify-between px-1 -mt-0.5 z-0">
        <div className="h-3.5 w-4 rounded-t-lg bg-gradient-to-b from-white to-zinc-300 border border-zinc-400 shadow-sm" />
        <div className="h-3.5 w-4 rounded-t-lg bg-gradient-to-b from-white to-zinc-300 border border-zinc-400 shadow-sm" />
      </div>
    </div>
  );
};

export default Cute3DRobotAvatar;
