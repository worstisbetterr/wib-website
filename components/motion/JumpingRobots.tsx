"use client";

import Cute3DRobotAvatar from "@/components/brand/Cute3DRobotAvatar";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const funnyPhrases = [
  "WOAH! LOOK AT THIS!",
  "WE MAKE THE WORST ADS! 😜",
  "CATCH ME IF YOU CAN! 🚀",
  "IS THIS ART OR A BUG? 🤔",
  "100% AI CERTIFIED! 🤖",
  "HEY! THAT TICKLES! 😂",
  "SYSTEM OVERLOAD! 💥",
  "DON'T CLICK ME! ⚡",
];

export const JumpingRobots: React.FC = () => {
  const [clickedBot, setClickedBot] = useState<number | null>(null);
  const [botPhrases, setBotPhrases] = useState<string[]>([
    "WOAH! LOOK AT THIS!",
    "WE MAKE THE WORST ADS! 😜",
    "CATCH ME IF YOU CAN! 🚀",
  ]);

  const handleBotClick = (index: number) => {
    setClickedBot(index);
    // Cycle to a random funny phrase
    const nextPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
    setBotPhrases((prev) => {
      const copy = [...prev];
      copy[index] = nextPhrase;
      return copy;
    });
    setTimeout(() => setClickedBot(null), 1000);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* 🤖 ROBOT #1 — Hopping Right Above WORSTISBETTERR Title */}
      <div className="absolute top-[12%] left-[10%] sm:left-[18%] md:left-[22%] pointer-events-auto">
        <motion.div
          animate={
            clickedBot === 0
              ? { y: [-20, -100, 0], rotate: [0, 360, 720], scale: [1, 1.4, 1] }
              : {
                  y: [0, -35, 0, -18, 0],
                  x: [0, 25, -15, 10, 0],
                  rotate: [0, -12, 10, -5, 0],
                }
          }
          transition={{
            duration: clickedBot === 0 ? 0.9 : 3.8,
            repeat: clickedBot === 0 ? 0 : Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center group cursor-pointer"
          onClick={() => handleBotClick(0)}
        >
          {/* Speech Bubble */}
          <motion.div
            animate={{ opacity: [0.8, 1, 0.8], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-black/90 text-[#00F0FF] border border-[#00F0FF]/40 font-mono text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider mb-1.5 shadow-2xl backdrop-blur-md whitespace-nowrap"
          >
            {botPhrases[0]}
          </motion.div>

          {/* Reference Image Cute 3D Robot Model */}
          <Cute3DRobotAvatar size={50} expression={clickedBot === 0 ? "shocked" : "happy"} isHovered={true} />

          {/* Dynamic Floor Shadow */}
          <motion.div
            animate={{ scale: [1, 0.4, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-10 bg-black/80 rounded-full blur-[3px] mt-1"
          />
        </motion.div>
      </div>

      {/* 🤖 ROBOT #2 — Cartwheeling Right Above WE MAKE THE WORST ADS Tagline */}
      <div className="absolute top-[28%] right-[8%] sm:right-[16%] md:right-[20%] pointer-events-auto">
        <motion.div
          animate={
            clickedBot === 1
              ? { y: [-20, -110, 0], rotate: [0, -360, -720], scale: [1, 1.5, 1] }
              : {
                  y: [0, -45, 0, -22, 0],
                  x: [0, -30, 15, -10, 0],
                  rotate: [0, 15, -18, 8, 0],
                }
          }
          transition={{
            duration: clickedBot === 1 ? 0.9 : 4.4,
            repeat: clickedBot === 1 ? 0 : Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="flex flex-col items-center group cursor-pointer"
          onClick={() => handleBotClick(1)}
        >
          {/* Speech Bubble */}
          <motion.div
            animate={{ opacity: [0.8, 1, 0.8], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            className="bg-black/90 text-red-bright border border-red-bright/40 font-mono text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider mb-1.5 shadow-2xl backdrop-blur-md whitespace-nowrap"
          >
            {botPhrases[1]}
          </motion.div>

          {/* Reference Image Cute 3D Robot Model */}
          <Cute3DRobotAvatar size={52} expression={clickedBot === 1 ? "shocked" : "wink"} isHovered={true} />

          {/* Dynamic Floor Shadow */}
          <motion.div
            animate={{ scale: [1, 0.4, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="h-1.5 w-10 bg-black/80 rounded-full blur-[3px] mt-1"
          />
        </motion.div>
      </div>

      {/* 🤖 ROBOT #3 — Bouncing Near Action Buttons */}
      <div className="absolute top-[52%] left-[12%] sm:left-[25%] pointer-events-auto">
        <motion.div
          animate={
            clickedBot === 2
              ? { y: [-20, -90, 0], rotate: [0, 360, 0], scale: [1, 1.4, 1] }
              : {
                  y: [0, -30, 0, -15, 0],
                  x: [0, 20, -10, 5, 0],
                  rotate: [0, -10, 12, -5, 0],
                }
          }
          transition={{
            duration: clickedBot === 2 ? 0.8 : 3.6,
            repeat: clickedBot === 2 ? 0 : Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="flex flex-col items-center group cursor-pointer"
          onClick={() => handleBotClick(2)}
        >
          {/* Speech Bubble */}
          <motion.div
            animate={{ opacity: [0.8, 1, 0.8], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
            className="bg-black/90 text-[#00F0FF] border border-[#00F0FF]/40 font-mono text-[9px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider mb-1.5 shadow-2xl backdrop-blur-md whitespace-nowrap"
          >
            {botPhrases[2]}
          </motion.div>

          {/* Reference Image Cute 3D Robot Model */}
          <Cute3DRobotAvatar size={48} expression={clickedBot === 2 ? "shocked" : "naughty"} isHovered={true} />

          {/* Dynamic Floor Shadow */}
          <motion.div
            animate={{ scale: [1, 0.4, 1], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="h-1.5 w-10 bg-black/80 rounded-full blur-[3px] mt-1"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default JumpingRobots;
