"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArtistProfile } from "@/types/portfolio";
import { ComicButton } from "@/components/ui/ComicButton";
import { triggerArtworkProtectedToast } from "@/components/ui/ArtworkProtectionToast";
import { ArrowUpRight, Zap, Compass, CheckCircle2 } from "lucide-react";

export interface HeroSectionProps {
  profile: ArtistProfile;
}

/** Configurable Die-Cut Emote Stickers */
const EMOTE_STICKERS = [
  {
    id: "emote-happy",
    src: "/assets/artworks/artwork_samples/emotes/1.png",
    alt: "Hand-drawn happy mascot emote sticker",
    tooltip: "CUSTOM EMOTES // HAND-DRAWN",
    positionClass: "-top-[24px] -right-[16px]",
    animationClass: "animate-sticker-1",
    initialRotate: "rotate-6",
    sizeClass: "w-18 h-18 sm:w-22 sm:h-22 lg:w-24 lg:h-24",
  },
  {
    id: "emote-love",
    src: "/assets/artworks/artwork_samples/emotes/3.png",
    alt: "Cel-shaded love mascot emote sticker",
    tooltip: "TWITCH & DISCORD // READY",
    positionClass: "-bottom-2 -left-2 sm:-bottom-3 sm:-left-3",
    animationClass: "animate-sticker-2",
    initialRotate: "-rotate-12",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18",
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setTilt({
          x: Math.max(-1, Math.min(1, x)),
          y: Math.max(-1, Math.min(1, y)),
        });
      });
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerArtworkProtectedToast();
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-[calc(100svh-4.5rem)] flex items-center pt-24 md:pt-28 pb-16 overflow-hidden bg-[#FF6B35] border-b-[4px] border-black w-full scroll-mt-20"
    >
      {/* 1. COMIC / ARCADE GEOMETRIC PATTERN OVERLAY */}
      <div className="absolute inset-0 pointer-events-none select-none -z-10" aria-hidden="true">
        {/* Subtle black dot matrix grid */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#000000_1.25px,transparent_1.25px)] [background-size:24px_24px] opacity-10"
        />

        {/* Ambient Cyan Wash (Top-Right focal area) */}
        <div
          className="absolute -top-12 -right-16 w-[560px] h-[560px] rounded-full bg-[#FFE600]/15 blur-3xl transition-transform duration-1000 ease-out"
          style={{ transform: `translate3d(${tilt.x * -14}px, ${tilt.y * -14}px, 0)` }}
        />
        {/* Ambient Violet Wash (Bottom-Left undercurrent) */}
        <div
          className="absolute bottom-4 left-10 w-[420px] h-[420px] rounded-full bg-[#000000]/10 blur-3xl transition-transform duration-1000 ease-out"
          style={{ transform: `translate3d(${tilt.x * 12}px, ${tilt.y * 12}px, 0)` }}
        />

        {/* Precision Registration Studio Grid Lines */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* 2. TECHNICAL VECTOR ACCENTS (Crosshairs - Clean) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        {/* Center-Grid Crosshair Accent */}
        <div className="absolute top-12 left-[48%] font-mono text-[13px] font-bold text-black/30 hidden md:block">
          +
        </div>
      </div>

      {/* Main Editorial Studio Grid: 2-Column Responsive Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] gap-8 sm:gap-10 lg:gap-[clamp(32px,4.5vw,68px)] items-center">
        {/* LEFT / INTRO COLUMN */}
        <div className="flex flex-col justify-center order-2 lg:order-1 min-w-0 max-w-[min(100%,38rem)]">
          {/* Studio Meta Badges (Single Row: INDEPENDENT STUDIO + COMMISSIONS OPEN) */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-white text-black border-2 border-black font-black text-[11px] uppercase tracking-wider rounded-lg px-2.5 py-0.5 shadow-[2px_2px_0px_#000]">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              INDEPENDENT STUDIO
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white text-black border-2 border-black rounded-full px-3 py-0.5 text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-emerald-600/30" />
              COMMISSIONS OPEN
            </span>
          </div>

          {/* Clean 2-Line Poster Headline */}
          <h1 className="mb-4 select-none leading-[1.05] font-archivo [text-wrap:balance] !normal-case" style={{ textTransform: "none" }}>
            <span className="block text-4xl md:text-5xl font-black text-black tracking-tight !normal-case" style={{ textTransform: "none" }}>
              Characters with
            </span>
            <span className="inline-block bg-[#FFE600] text-black border-[3px] border-black rounded-xl px-4 py-1 shadow-[4px_4px_0px_#000] -rotate-1 mt-2 whitespace-nowrap !normal-case text-4xl md:text-5xl font-black tracking-tight" style={{ textTransform: "none" }}>
              attitude &amp; soul.
            </span>
          </h1>

          {/* Crisp 1-2 Line Editorial Subtitle */}
          <p className="text-black/90 text-sm sm:text-base leading-relaxed max-w-lg mb-6 sm:mb-7 font-medium [text-wrap:balance]">
            Original 2D cel-shaded illustrations for authors, indie game directors, and collectors.
          </p>

          {/* Commission Conversion Triggers */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6 sm:mb-7">
            <Link
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#FFE600] text-black border-[3px] border-black rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all active:bg-black active:text-[#FFE600]"
            >
              <Zap className="w-4 h-4 fill-black stroke-black" />
              <span>COMMISSION ME</span>
            </Link>

            <Link
              href="#gallery"
              onClick={(e) => handleSmoothScroll(e, "gallery")}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white text-black border-[3px] border-black rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-all"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>EXPLORE ARTWORK</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>
          </div>

          {/* Studio Craft Badges (Scoped strictly to left column) */}
          <div className="w-full pt-4 sm:pt-5 border-t-2 border-black/20 flex flex-wrap lg:flex-nowrap items-center gap-x-5 lg:gap-x-6 gap-y-2 text-xs font-nav font-bold text-black/85">
            <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
              300 DPI Print Masters
            </span>
            <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
              Stepped Cel Values
            </span>
            <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
              Layered PSD + Vector Inks
            </span>
          </div>
        </div>

        {/* RIGHT / COLLAGE STAGE */}
        <div className="order-1 lg:order-2 w-full">
          {/* Collage Stage Container */}
          <div className="relative w-full max-w-[540px] lg:max-w-none mx-auto pt-2 pb-4 sm:pb-6 px-2 sm:px-4">
            {/* BRAND ACCENT GLOW BEHIND 3-IMAGE COLLAGE */}
            <div
              className="absolute inset-2 -z-20 pointer-events-none select-none blur-3xl opacity-10 transition-transform duration-700 ease-out"
              style={{
                background: "radial-gradient(circle at 60% 45%, #FFE600 0%, #FF2A6D 50%, #9933FF 85%)",
                transform: `translate3d(${tilt.x * -10}px, ${tilt.y * -10}px, 0)`,
              }}
              aria-hidden="true"
            />

            {/* ARTWORK COLLAGE COMPOSITION WITH INTENTIONAL STAGGER & CLEAR OVERLAPS */}
            <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[clamp(420px,52vh,500px)] max-h-[calc(100svh-4.5rem-80px)]">

              {/* 1. SECONDARY BACK LAYER (Top Left): Book Cover (Issue 10) - Tilted -2deg, top position adjusted for clean crop */}
              <div
                className="absolute top-0 left-0 w-[42%] sm:w-[40%] z-10 transition-transform duration-500 ease-out"
                style={{
                  transform: `translate3d(${tilt.x * 6}px, ${tilt.y * 6}px, 0)`,
                }}
              >
                {/* Violet Accent Underlay */}
                <div
                  className="absolute inset-0 bg-[#9933FF] translate-x-2 translate-y-2 -z-10 border border-black/80 -rotate-2"
                  aria-hidden="true"
                />
                <div
                  onContextMenu={handleContextMenu}
                  className="group relative bg-neutral-900 border-[3px] border-black -rotate-2 shadow-[6px_6px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:-rotate-3 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src="/assets/artworks/artwork_samples/Book cover/WhatsApp Image 2026-10-25 at 10.17.58 AM (1).jpeg"
                      alt="Editorial graphic novel cover artwork by Emilia"
                      fill
                      sizes="(max-width: 640px) 42vw, 24vw"
                      className="object-cover object-bottom filter contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* 2. PRIMARY FOCAL ARTWORK (Dominant Center-Right): Character 28 - Tilted +1.5deg with crisp Cyan backing */}
              <div
                className="absolute top-2 sm:top-3 right-0 sm:right-2 w-[64%] sm:w-[63%] z-20 transition-transform duration-500 ease-out"
                style={{
                  transform: `translate3d(${tilt.x * -6}px, ${tilt.y * -6}px, 0)`,
                }}
              >
                {/* Solid Cyan Offset Anchor Slab */}
                <div
                  className="absolute inset-0 bg-[#00E5FF] translate-x-3 translate-y-3 sm:translate-x-3.5 sm:translate-y-3.5 -z-10 border-2 border-black rotate-[1.5deg]"
                  aria-hidden="true"
                />

                <div
                  onContextMenu={handleContextMenu}
                  className="group relative bg-white border-[3px] border-black rotate-[1.5deg] shadow-[6px_6px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:rotate-1 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                    <Image
                      src="/assets/artworks/artwork_samples/Character_art/28.jpg"
                      alt="Featured character illustration of blue-haired girl by Emilia"
                      fill
                      priority
                      sizes="(max-width: 640px) 66vw, (max-width: 1024px) 50vw, 38vw"
                      className="object-cover object-top filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. TERTIARY ACCENT LAYER (Bottom Left): Character 10 Reaper - Overlaps only bottom corner of Book Cover, face unobstructed */}
              <div
                className="absolute bottom-1 sm:bottom-2 left-2 sm:left-4 w-[35%] sm:w-[33%] z-30 transition-transform duration-700 ease-out"
                style={{
                  transform: `translate3d(${tilt.x * 10}px, ${tilt.y * 10}px, 0)`,
                }}
              >
                {/* Dark Ink Offset Slab */}
                <div
                  className="absolute inset-0 bg-black translate-x-2 translate-y-2 -z-10 -rotate-1"
                  aria-hidden="true"
                />
                <div
                  onContextMenu={handleContextMenu}
                  className="group relative bg-white border-[3px] border-black -rotate-1 shadow-[5px_5px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:rotate-0 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
                    <Image
                      src="/assets/artworks/artwork_samples/Character_art/10.jpg"
                      alt="Kinetic reaper character illustration by Emilia"
                      fill
                      sizes="(max-width: 640px) 36vw, 20vw"
                      className="object-cover object-top filter contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* 4. PLAYFUL DECATHLAND-INSPIRED DIE-CUT EMOTE STICKERS */}
              {EMOTE_STICKERS.map((sticker) => (
                <div
                  key={sticker.id}
                  className={`absolute ${sticker.positionClass} z-30 pointer-events-auto select-none`}
                >
                  <div className={`group relative ${sticker.animationClass}`}>
                    {/* Tooltip Pill */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap bg-black text-[#FFE600] border border-black text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 shadow-[2px_2px_0px_#FFE600]">
                      {sticker.tooltip}
                    </div>

                    {/* Physical Die-Cut Vinyl Sticker Image */}
                    <div
                      onContextMenu={handleContextMenu}
                      className={`relative ${sticker.sizeClass} cursor-pointer die-cut-sticker ${sticker.initialRotate} active:scale-95`}
                    >
                      <Image
                        src={sticker.src}
                        alt={sticker.alt}
                        fill
                        sizes="80px"
                        className="object-contain no-drag"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Editorial Studio Watermark Stamp: aligned to bottom-right edge of focal card */}
              <div
                className="hidden sm:inline-flex items-center gap-2 absolute bottom-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-2 border-black px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neutral-800 shadow-[2px_2px_0px_#000000]"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-none inline-block" />
                <span>ATELIER EMILIA // COMPOSITION</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
