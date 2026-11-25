"use client";

import { motion, useReducedMotion } from "framer-motion";
import React from "react";

type WrongWayAccentProps = {
  text?: string;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export const WrongWayAccent: React.FC<WrongWayAccentProps> = ({
  text = "‹ REVERSED DIRECTION",
  className = "",
  orientation = "horizontal",
}) => {
  const shouldReduceMotion = useReducedMotion();

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x: 40 };

  const animate = shouldReduceMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <span className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-red-bright/60" />
      <span
        className="font-display text-[10px] md:text-xs font-bold uppercase tracking-widest text-red-bright inline-flex items-center gap-1.5"
      >
        <span className="font-extrabold text-sm text-red-bright animate-pulse">‹</span>
        <span>{text}</span>
      </span>
      <span className="h-[1px] w-12 md:w-20 bg-red-bright/30" />
    </motion.div>
  );
};

export default WrongWayAccent;
