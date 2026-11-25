"use client";

import { motion } from "framer-motion";
import React from "react";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <motion.div
        initial={{ y: "115%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.16, 1, 0.3, 1], // Custom luxury cubic-bezier easing
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default TextReveal;
