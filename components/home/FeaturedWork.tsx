"use client";

import WrongWayAccent from "@/components/motion/WrongWayAccent";
import Button from "@/components/ui/Button";
import { caseStudies } from "@/content/work";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";

export const FeaturedWork: React.FC = () => {
  const featured = caseStudies.filter((item) => item.featured).slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-ink hairline-b bg-dot-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <WrongWayAccent text="FEATURED CASE STUDIES" />
              <span className="font-mono text-xs text-muted">
                <span className="index-num">(03)</span> Selected Client Archives
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-paper">
              SELECTED PRODUCTIONS
            </h2>
          </div>
          <Button href="/work" variant="ghost">
            View All Work
          </Button>
        </div>

        {/* Work Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((study, idx) => (
            <WorkCard key={study.slug} study={study} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

type WorkCardProps = {
  study: (typeof caseStudies)[0];
  index: number;
};

const WorkCard: React.FC<WorkCardProps> = ({ study, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const indexCodes = ["03a", "03b", "03c"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/work/${study.slug}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative flex flex-col glass-card glass-card-hover rounded-sm overflow-hidden"
      >
        {/* Media Thumbnail Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            poster={study.poster}
            className="w-full h-full object-cover filter contrast-110 saturate-90 transition-transform duration-700 group-hover:scale-105"
          >
            {study.video && <source src={study.video} type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Index & Category Tags */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-red-bright text-paper rounded-xs">
              ({indexCodes[index] || "03"})
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="text-[10px] font-mono uppercase px-2.5 py-1 bg-ink/90 text-paper hairline-box">
              {study.category}
            </span>
          </div>

          {/* Sliding Red Back Chevron Motif */}
          <div className="absolute bottom-4 right-4 h-10 w-10 bg-ink-raised/90 hairline-box rounded-sm flex items-center justify-center text-red-bright font-display text-lg font-extrabold transition-all duration-300 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg">
            ‹
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col justify-between gap-4 flex-grow">
          <div>
            {/* Ironic Caption per spec */}
            <span className="font-tagline text-xs text-red-bright block mb-1">
              “{study.ironicCaption}”
            </span>

            <span className="font-display text-xs font-bold text-muted uppercase tracking-widest block">
              {study.client}
            </span>

            <h3 className="font-display text-xl font-bold uppercase text-paper tracking-wide pt-1 group-hover:text-red-bright transition-colors">
              {study.title}
            </h3>
          </div>

          <p className="text-xs text-muted leading-relaxed line-clamp-2">
            {study.summary}
          </p>

          <div className="pt-2 hairline-t flex items-center justify-between text-xs font-mono text-muted">
            <span className="text-red-bright font-semibold">{study.result.split(",")[0]}</span>
            <span className="text-paper/60 group-hover:text-paper">Read Case Study ‹</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeaturedWork;
