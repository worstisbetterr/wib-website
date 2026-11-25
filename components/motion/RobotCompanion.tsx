"use client";

import Cute3DRobotAvatar from "@/components/brand/Cute3DRobotAvatar";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const funnyPhrases = [
  "WE MAKE THE WORST ADS! 😜",
  "SCROLL DOWN WITH ME! 🚀",
  "YOU CLICKED ME! 😂",
  "100% AI CERTIFIED! 🤖",
  "WOAH! LOOK AT THIS WORK! ⚡",
  "IS THIS ART OR A BUG? 🤔",
  "PERCHED ON THE TEXT! 📌",
  "LET'S GOOOOO! 🔥",
];

export const RobotCompanion: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [speechBubble, setSpeechBubble] = useState("WE MAKE THE WORST ADS! 😜");
  const [botPos, setBotPos] = useState<{ x: string; y: string; label: string }>({
    x: "50%",
    y: "88vh",
    label: "SHOWREEL BOTTOM",
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);

      // Section 1: Hero Showreel Arrival (0 - 300px)
      if (currentY < 300) {
        setBotPos({ x: "50%", y: "88vh", label: "SHOWREEL BOTTOM" });
        setSpeechBubble("SCROLL DOWN TO EXPLORE! 🚀");
      }
      // Section 2: Headline & Tagline (300px - 1000px) -> Sitting directly on WORSTISBETTERR title text!
      else if (currentY >= 300 && currentY < 1000) {
        setBotPos({ x: "50%", y: "38vh", label: "SITTING ON WORSTISBETTERR TITLE" });
        setSpeechBubble("WE MAKE THE WORST ADS! 😜");
      }
      // Section 3: Featured Work Spotlight (1000px - 1700px) -> Perched on top of Featured Video Block!
      else if (currentY >= 1000 && currentY < 1700) {
        setBotPos({ x: "50%", y: "25vh", label: "PERCHED ON FEATURED VIDEO" });
        setSpeechBubble("WOAH! LOOK AT THIS FILM! ⚡");
      }
      // Section 4: Explore Vault CTA (1700px - 2400px) -> Sitting right on Explore Vault Headline!
      else if (currentY >= 1700 && currentY < 2400) {
        setBotPos({ x: "50%", y: "30vh", label: "SITTING ON VAULT HEADLINE" });
        setSpeechBubble("EXPLORE FULL WORK! 💥");
      }
      // Section 5: Testimonials & Footer (2400px+) -> Perched on top of center Testimonial card!
      else {
        setBotPos({ x: "50%", y: "32vh", label: "PERCHED ON TESTIMONIAL CARD" });
        setSpeechBubble("100% VERIFIED IMPACT! 🏆");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRobotClick = () => {
    setIsClicked(true);
    const nextPhrase = funnyPhrases[Math.floor(Math.random() * funnyPhrases.length)];
    setSpeechBubble(nextPhrase);
    setTimeout(() => setIsClicked(false), 900);
  };

  return (
    <motion.div
      animate={{
        left: botPos.x,
        top: botPos.y,
      }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
      }}
      className="fixed z-40 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none group"
      onClick={handleRobotClick}
      title="Click your WIB 3D Robot Companion!"
    >
      <motion.div
        animate={
          isClicked
            ? { y: [-10, -90, 0], rotate: [0, 360, 720], scale: [1, 1.45, 1] }
            : {
                y: [0, -18, 0, -8, 0],
                rotate: [0, -4, 4, -2, 0],
              }
        }
        transition={{
          duration: isClicked ? 0.85 : 3.5,
          repeat: isClicked ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center relative"
      >
        {/* Naughty Funny Speech Bubble */}
        <motion.div
          animate={{ opacity: [0.9, 1, 0.9], scale: [0.96, 1.04, 0.96] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-black/95 text-[#00F0FF] border border-[#00F0FF]/50 font-mono text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider mb-2 shadow-2xl backdrop-blur-md whitespace-nowrap relative"
        >
          {speechBubble}
          {/* Speech Bubble Arrow */}
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-black/95" />
        </motion.div>

        {/* Reference Image Single 3D Cute Robot Companion */}
        <div className="relative">
          <Cute3DRobotAvatar
            size={58}
            expression={isClicked ? "shocked" : "happy"}
            isHovered={true}
          />
        </div>

        {/* Dynamic Floor Shadow */}
        <motion.div
          animate={{ scale: [1, 0.5, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-12 bg-black/80 rounded-full blur-[4px] mt-1"
        />
      </motion.div>
    </motion.div>
  );
};

export default RobotCompanion;
