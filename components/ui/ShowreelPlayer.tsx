"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";

interface ShowreelPlayerProps {
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  showBadge?: boolean;
  badgeLabel?: string;
  clickText?: string;
}

const getYouTubeId = (url?: string): string | null => {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
};

export default function ShowreelPlayer({
  videoUrl = "/videos/hero_desktop.mp4",
  posterUrl,
  title = "WIB Concept Film",
  showBadge = true,
  badgeLabel = "WIB CONCEPT FILM",
  clickText = "CLICK TO PLAY",
}: ShowreelPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const youtubeId = getYouTubeId(videoUrl);
  const defaultPoster = youtubeId
    ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
    : "/videos/hero_poster.jpg";

  const activePoster = posterUrl || defaultPoster;

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (youtubeId) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch((err) => console.log("Autoplay blocked:", err));
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const target = containerRef.current || videoRef.current;
    if (!target) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      target.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-sm overflow-hidden bg-ink-raised border border-paper/15 shadow-2xl group"
    >
      {/* Aspect Ratio Container (16:9 widescreen) */}
      <div
        className="relative aspect-video w-full bg-black flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {youtubeId ? (
          isPlaying ? (
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <img
              src={activePoster}
              onError={() => setImageError(true)}
              alt={title}
              className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500"
            />
          )
        ) : (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={activePoster}
            preload="metadata"
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all duration-500"
          />
        )}

        {/* Dark Ambient Overlay before playing */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent flex flex-col justify-between p-6 sm:p-10 transition-opacity duration-300 pointer-events-none">
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              {showBadge ? (
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-bright bg-ink/90 border border-red-bright/40 px-3 py-1.5 rounded-sm shadow-md">
                  ● {badgeLabel}
                </span>
              ) : (
                <span />
              )}
              <span className="font-mono text-xs text-paper/70 tracking-wider hidden sm:inline">
                WIB // 2026
              </span>
            </div>

            {/* Center Play Icon Button */}
            <div className="self-center flex flex-col items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-bright/90 text-paper border border-paper/30 flex items-center justify-center shadow-2xl backdrop-blur-md transition-all pointer-events-auto"
              >
                <svg className="w-8 h-8 sm:w-10 sm:h-10 fill-current translate-x-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
              <span className="font-display text-xs font-bold uppercase tracking-widest text-paper/90 bg-ink/80 px-3 py-1 rounded-sm border border-paper/10">
                {clickText}
              </span>
            </div>
          </div>
        )}

        {/* Sleek Floating Icon Controls Bar when playing */}
        {isPlaying && !youtubeId && (
          <div
            className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 p-2 rounded-sm shadow-2xl transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={togglePlay}
              className="w-8 h-8 flex items-center justify-center rounded-sm text-paper hover:bg-red-bright hover:text-paper transition-colors"
              title={isPlaying ? "Pause" : "Play"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 translate-x-0.5" />}
            </button>

            <div className="w-[1px] h-4 bg-white/20" />

            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-sm text-paper hover:bg-red-bright hover:text-paper transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-red-bright" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>

            <div className="w-[1px] h-4 bg-white/20" />

            <button
              onClick={toggleFullscreen}
              className="w-8 h-8 flex items-center justify-center rounded-sm text-paper hover:bg-red-bright hover:text-paper transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
