"use client";
import PageHero from "@/components/ui/PageHero";
import {
  KenBurnsSettle,
  StaggerContainer,
  StaggerItem,
  TextMaskReveal,
} from "@/components/motion/MotionSystem";
import { caseStudies } from "@/content/work";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = caseStudies.find((item) => item.slug === params.slug);

  if (!study) {
    notFound();
  }

  // Find next project
  const currentIndex = caseStudies.findIndex((item) => item.slug === params.slug);
  const nextIndex = (currentIndex + 1) % caseStudies.length;
  const nextStudy = caseStudies[nextIndex];

  // Best stills (2-4 images)
  const stillsList = study.stills && study.stills.length > 0
    ? study.stills
    : [study.poster];

  return (
    <article className="min-h-screen bg-ink text-paper selection:bg-red-bright selection:text-paper">
      {/* 1. TITLE BLOCK — Identical PageHero to Contact Page */}
      <PageHero
        eyebrow={`CLIENT — ${study.client}`}
        title={study.title}
        description={study.summary}
      >
        <Link
          href="/work"
          className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-muted hover:text-paper transition-colors uppercase tracking-widest -mb-2"
        >
          <span>←</span>
          <span>ALL PROJECTS</span>
        </Link>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col gap-16 sm:gap-24">
        {/* 2. HERO FILM (Dominates Page) */}
        <section>
          <KenBurnsSettle className="w-full">
            <CustomHeroVideo
              src={study.video}
              poster={study.poster}
              title={study.title}
            />
          </KenBurnsSettle>
        </section>

        {/* 3. OVERVIEW & MINIMAL META */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-16 pt-8 border-t border-white/10 items-start">
          {/* Left: Minimal Meta */}
          <StaggerItem className="md:col-span-4 flex flex-col gap-6 font-mono text-xs">
            <div>
              <span className="text-[#9A9090] block uppercase tracking-widest mb-1">CLIENT</span>
              <span className="text-paper font-display text-lg font-bold uppercase tracking-wide">
                {study.client}
              </span>
            </div>

            <div>
              <span className="text-muted block uppercase tracking-widest mb-1">CATEGORY</span>
              <span className="text-paper font-display text-sm font-semibold uppercase tracking-wider">
                {study.category}
              </span>
            </div>

            <div>
              <span className="text-muted block uppercase tracking-widest mb-1">YEAR</span>
              <span className="text-paper font-mono text-sm font-semibold">
                {study.year || "2026"}
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-paper hover:text-red-bright transition-colors border-b border-paper/20 pb-1"
              >
                <span>Start a similar project</span>
                <span className="text-red-bright font-extrabold text-xs transition-transform duration-300 group-hover:translate-x-1">
                  ‹
                </span>
              </Link>
            </div>
          </StaggerItem>

          {/* Right: Short Idea & Result Summary (No jargon) */}
          <StaggerItem className="md:col-span-8 flex flex-col gap-6 font-body text-base sm:text-lg text-muted leading-relaxed">
            <p>{study.summary}</p>
            {study.result && (
              <p className="text-paper font-medium border-l-2 border-red-bright/60 pl-4 py-1">
                {study.result}
              </p>
            )}
          </StaggerItem>
        </StaggerContainer>

        {/* 4. STILLS (Large Frames, Breathing Space, No Captions) */}
        <section className="flex flex-col gap-12 sm:gap-20 pt-12 border-t border-paper/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
            {stillsList.map((stillUrl, idx) => (
              <StaggerContainer key={idx} className="w-full">
                <StaggerItem yOffset={30}>
                  <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-black border border-white/10 shadow-2xl group">
                    <img
                      src={stillUrl}
                      alt={`${study.title} Still ${idx + 1}`}
                      className="w-full h-full object-cover filter contrast-[1.05] brightness-95 transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </StaggerItem>
              </StaggerContainer>
            ))}
          </div>
        </section>

        {/* 5. NEXT PROJECT (Full-Width Cinematic Showcase Block) */}
        <section className="pt-16 border-t border-white/10 flex flex-col gap-6">
          <Link
            href={`/work/${nextStudy.slug}`}
            className="group relative w-full h-[50vh] sm:h-[65vh] rounded-sm overflow-hidden border border-white/10 flex flex-col justify-end p-8 sm:p-14 bg-black shadow-2xl"
          >
            {/* Background Image / Poster with Subtle Zoom on Hover */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={nextStudy.poster}
                alt={nextStudy.title}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-75 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100808] via-[#100808]/50 to-transparent pointer-events-none" />
            </div>

            {/* Overlaid Next Project Info */}
            <div className="relative z-10 flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-red-bright font-semibold">
                <span>NEXT PROJECT →</span>
              </div>
              <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase text-paper tracking-wide leading-none group-hover:text-red-bright transition-colors drop-shadow-md">
                {nextStudy.title}
              </h3>
              <span className="font-mono text-xs uppercase tracking-widest text-[#9A9090] mt-1">
                {nextStudy.client}
              </span>
            </div>
          </Link>

          {/* Quiet Back Link */}
          <div className="flex justify-start pt-2">
            <Link
              href="/work"
              className="font-mono text-xs text-[#9A9090] hover:text-paper uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>Back to all projects</span>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}

const CustomHeroVideo: React.FC<{
  src?: string;
  poster: string;
  title: string;
}> = ({ src, poster, title }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="relative w-full aspect-video sm:aspect-[21/9] bg-black rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
      {src && isClient ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={poster}
          className="w-full h-full object-cover filter contrast-[1.05] brightness-95"
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover filter contrast-[1.05]"
        />
      )}

      {/* Subtle Custom Overlay Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/10 text-paper font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
        <button
          onClick={togglePlay}
          className="hover:text-red-bright transition-colors uppercase font-semibold tracking-wider"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "PAUSE" : "PLAY"}
        </button>
        <span className="text-white/20">•</span>
        <button
          onClick={toggleMute}
          className="hover:text-red-bright transition-colors uppercase font-semibold tracking-wider"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "UNMUTE" : "MUTED"}
        </button>
        <span className="text-white/20">•</span>
        <button
          onClick={toggleFullscreen}
          className="hover:text-red-bright transition-colors uppercase font-semibold tracking-wider"
          aria-label="Fullscreen"
        >
          FULLSCREEN
        </button>
      </div>
    </div>
  );
};
