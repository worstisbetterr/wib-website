"use client";

import { siteConfig } from "@/content/site";
import { motion } from "framer-motion";
import React from "react";

export const ClientLogos: React.FC = () => {
  // Duplicate array to achieve seamless infinite left-to-right marquee animation
  const duplicatedLogos = [...siteConfig.clientLogos, ...siteConfig.clientLogos, ...siteConfig.clientLogos];

  return (
    <section className="py-16 md:py-24 bg-ink hairline-b overflow-hidden">
      {/* Floating Logo Marquee Container (Sliding Left to Right - Clean NO text headers) */}
      <div className="relative w-full overflow-hidden flex">
        {/* Gradient Fades on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

        {/* Marquee Track moving from Left to Right */}
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 28,
            ease: "linear",
          }}
          className="flex items-center gap-8 whitespace-nowrap flex-nowrap min-w-max"
        >
          {duplicatedLogos.map((client, idx) => (
            <div
              key={idx}
              className="bg-ink-raised hairline-box px-9 py-6 rounded-sm flex flex-col items-center justify-center gap-1 group hover:border-red-bright/40 transition-all duration-300 min-w-[210px]"
            >
              <span className="font-display font-extrabold text-sm sm:text-base text-paper/85 group-hover:text-paper uppercase tracking-widest transition-colors">
                {client.name}
              </span>
              <span className="text-[9px] font-mono text-muted/60 uppercase">
                {client.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogos;
