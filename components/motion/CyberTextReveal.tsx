"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const matrixChars = "01#$%/\\▒░█⚡";

interface CyberTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  enableSound?: boolean;
}

// Web Audio API High-Tech Telemetry Data Packet Audio Synthesizer
const playDataTransmissionSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // 4 High-Frequency Telemetry Data Bleeps (pip-pip-peep-pop data transmission)
    const dataFrequencies = [1850, 2400, 3100, 2200];
    dataFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine"; // Pure clean digital data tone
      osc.frequency.setValueAtTime(freq, now + idx * 0.022);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.08, now + idx * 0.022 + 0.018);

      // Micro envelope per data packet
      gain.gain.setValueAtTime(0.025, now + idx * 0.022);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + idx * 0.022 + 0.018);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.022);
      osc.stop(now + idx * 0.022 + 0.018);
    });
  } catch (e) {
    // Graceful fallback
  }
};

export const CyberTextReveal: React.FC<CyberTextRevealProps> = ({
  text,
  className = "",
  delay = 0,
  enableSound = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasScrambled, setHasScrambled] = useState(false);
  const lastHoverTime = useRef(0);

  const triggerFastScramble = (playSound = false) => {
    if (playSound && enableSound) {
      playDataTransmissionSound();
    }

    let iterations = 0;
    const maxIterations = Math.min(text.length * 1.2, 14); // Fast, short decode (~0.3s)

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations / 1.2) {
              return text[index];
            }
            return matrixChars[Math.floor(Math.random() * matrixChars.length)];
          })
          .join("")
      );

      iterations += 1;
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 22);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      triggerFastScramble(false);
      setHasScrambled(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [text, delay]);

  const handleMouseEnter = () => {
    const now = Date.now();
    // Cooldown 1.2s to prevent annoying rapid hover loops
    if (now - lastHoverTime.current > 1200) {
      lastHoverTime.current = now;
      triggerFastScramble(true);
    }
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.4, delay }}
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono cursor-default select-none tracking-normal transition-colors duration-150 ${className}`}
    >
      {displayText}
    </motion.span>
  );
};

export default CyberTextReveal;
