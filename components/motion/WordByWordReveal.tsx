"use client";

import { motion } from "framer-motion";
import React from "react";

interface WordByWordRevealProps {
  text: string;
  className?: string;
  delayOffset?: number;
  wordClassName?: string;
}

export const WordByWordReveal: React.FC<WordByWordRevealProps> = ({
  text,
  className = "",
  delayOffset = 0,
  wordClassName = "",
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delayOffset,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      className={`inline-flex flex-wrap justify-center gap-x-[0.28em] gap-y-1 ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className={`inline-block ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default WordByWordReveal;
