"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

// 🌟 Unified Brand Easing & Timing Constants
export const EXPERT_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const REVEAL_DURATION = 0.7; // 700ms expensive, cinematic feel

/**
 * 1. Line / Text Mask Reveal
 * Animates text or elements wiping up out of an overflow-hidden wrapper.
 */
export const TextMaskReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  animateOnMount?: boolean;
}> = ({
  children,
  className = "",
  delay = 0,
  duration = REVEAL_DURATION,
  animateOnMount = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const animationProps = animateOnMount
    ? { animate: { y: "0%", opacity: 1 } }
    : { whileInView: { y: "0%", opacity: 1 }, viewport: { once: true, amount: 0 } };

  return (
    <div className={`overflow-hidden py-0.5 ${className}`}>
      <motion.div
        initial={{ y: "115%", opacity: 0 }}
        {...animationProps}
        transition={{
          duration,
          delay,
          ease: EXPERT_EASE,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * 2. Staggered Lines Reveal
 * Splits a text into lines and reveals each line with staggered mask wipes (~60ms).
 */
export const StaggeredLinesReveal: React.FC<{
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}> = ({ lines, className = "", lineClassName = "", delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <div key={i} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {lines.map((line, idx) => (
        <div key={idx} className="overflow-hidden py-0.5">
          <motion.div
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: REVEAL_DURATION,
              delay: delay + idx * 0.06,
              ease: EXPERT_EASE,
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

/**
 * 3. Ken Burns Settle for Background Media
 * Scales media down very slightly from 1.06 -> 1.0 while fading in.
 */
export const KenBurnsSettle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ scale: 1.06, opacity: 0.4 }}
      whileInView={{ scale: 1.0, opacity: 1 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{
        duration: 1.0,
        ease: EXPERT_EASE,
      }}
      className={`w-full h-full transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * 4. Parallax Background Container
 * Moves background elements slightly slower than scroll for physical depth.
 */
export const ParallaxBackground: React.FC<{
  children: React.ReactNode;
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
  range?: [string, string];
}> = ({
  children,
  containerRef,
  className = "",
  range = ["-5%", "5%"],
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], range);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div style={{ y }} className={`w-full h-full transform-gpu ${className}`}>
      {children}
    </motion.div>
  );
};

/**
 * 5. Staggered Container & Item Sequence (~80ms apart)
 */
export const StaggerContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}> = ({ children, className = "", delay = 0, staggerDelay = 0.08 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2, once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = "", yOffset = 24 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: REVEAL_DURATION,
            ease: EXPERT_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * 6. Subtle Looping Scroll Bob Cue
 */
export const ScrollBobCue: React.FC<{
  className?: string;
  label?: string;
}> = ({ className = "", label = "SCROLL" }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#9A9090] ${className}`}>
      <span>{label}</span>
      {shouldReduceMotion ? (
        <span>↓</span>
      ) : (
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ↓
        </motion.span>
      )}
    </div>
  );
};

/**
 * 7. Curated Chapter Progress Counter & Indicator (Fixed UI)
 */
export const ChapterProgressIndicator: React.FC<{
  currentChapter: number;
  totalChapters: number;
  chapterTitle?: string;
}> = ({ currentChapter, totalChapters, chapterTitle }) => {
  const shouldReduceMotion = useReducedMotion();
  const progressPercent = ((currentChapter + 1) / totalChapters) * 100;

  return (
    <div className="fixed bottom-8 left-6 sm:left-12 z-30 pointer-events-none hidden md:flex items-center gap-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10 text-paper font-mono text-xs shadow-2xl">
      <div className="flex items-center gap-2 tracking-widest font-semibold">
        <span className="text-paper">
          {String(currentChapter + 1).padStart(2, "0")}
        </span>
        <span className="text-[#9A9090]">/</span>
        <span className="text-[#9A9090]">
          {String(totalChapters).padStart(2, "0")}
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-16 h-[2px] bg-white/15 rounded-full overflow-hidden relative">
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-red-bright"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.5, ease: EXPERT_EASE }
          }
        />
      </div>

      {chapterTitle && (
        <span className="text-[10px] text-[#9A9090] uppercase tracking-wider truncate max-w-[120px]">
          {chapterTitle}
        </span>
      )}
    </div>
  );
};
