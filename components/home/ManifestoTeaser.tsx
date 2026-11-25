"use client";

import WrongWayAccent from "@/components/motion/WrongWayAccent";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ManifestoTeaser: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-ink-raised hairline-b relative overflow-hidden bg-dot-grid">
      {/* Corner Mark */}
      <div className="absolute top-6 right-8 text-muted/40 font-mono text-xs hidden md:block">
        + THESIS_PROPOSITION // 1989
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* Top Header & Red Index Superscript (Image 1 Style) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <WrongWayAccent text="PHILOSOPHY & THESIS" />
          <div className="font-mono text-xs text-muted flex items-center gap-2">
            <span className="index-num">(02)</span>
            <span>Discover the 'Worse is Better' doctrine</span>
          </div>
        </div>

        {/* Section Headline (Image 1 Style) */}
        <div className="max-w-4xl flex flex-col gap-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-paper leading-tight">
            Welcome to our studio! <br />
            <span className="font-tagline text-2xl sm:text-4xl text-muted font-normal lowercase tracking-normal">
              we help clients realize the full potential of generative latent cinema.
            </span>
          </h2>
        </div>

        {/* Asymmetric Multi-Column Layout (Direct Adaptation of Image 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-6">
          {/* Left Side: Overlapping Stacked Visual Cards & Big Statement (Image 1 Left Side) */}
          <div className="lg:col-span-6 relative flex flex-col gap-6">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden hairline-box bg-ink group">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
                alt="WIB Studio Latent Architecture"
                fill
                className="object-cover filter contrast-125 saturate-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-90" />

              {/* Overlapping Floating Red Accent Text Box (Image 1 & 3 Style) */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-6 rounded-sm border-l-4 border-red-bright">
                <span className="text-red-bright font-extrabold text-lg mr-2 font-display">
                  *
                </span>
                <p className="font-display text-lg sm:text-xl font-bold uppercase text-paper leading-snug inline">
                  We believe that commercial film should be both timeless and meaningful, where each detail reflects a sense of cold quality and performance.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Multi-Column Detailed Paragraph Text & Red Index Links (Image 1 Right Side) */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted leading-relaxed font-body">
              <div>
                <p className="mb-4">
                  In 1989, computer scientist Richard P. Gabriel published 'Worse is Better' — proving that streamlined, adaptable systems beat bloated, over-engineered perfectionism.
                </p>
                <p>
                  We apply that exact computer science law to commercial film: zero physical bloat, 100x faster iteration, and uncompromising latent craft.
                </p>
              </div>

              <div>
                <p className="mb-4">
                  Founded by <span className="text-paper font-semibold">Prameet Patani</span> & <span className="text-paper font-semibold">Saairaj Parab</span>, WIB operates at the intersection of generative neural diffusion and tier-one luxury art direction.
                </p>
                <p>
                  Every project is unique and requires a tailored latent pipeline, leading to the creation of highly functional visual assets for global deployment.
                </p>
              </div>
            </div>

            {/* Red Index Link Tag (Image 1 Superscript Style (2a)) */}
            <div className="pt-6 hairline-t flex items-center justify-between">
              <div className="font-mono text-xs text-muted">
                <span className="index-num">(2a)</span>
                <span>That's why we offer a full range of services.</span>
              </div>
              <Link
                href="/manifesto"
                className="group inline-flex items-center gap-2 font-display text-xs font-bold uppercase tracking-widest text-red-bright hover:underline"
              >
                <span>Read Full Manifesto</span>
                <span className="text-sm font-extrabold group-hover:-translate-x-1 transition-transform">
                  ‹
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoTeaser;
