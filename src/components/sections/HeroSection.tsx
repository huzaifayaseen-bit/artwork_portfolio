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
      className="relative w-full bg-[#FF6B35] border-b-[4px] border-black pt-20 pb-10 sm:pt-24 sm:pb-12 lg:py-24 px-4 sm:px-6 min-h-0 lg:min-h-[calc(100vh-80px)] flex flex-col justify-center overflow-hidden scroll-mt-20"
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
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] gap-8 sm:gap-10 lg:gap-[clamp(32px,4.5vw,68px)] items-center">
        {/* LEFT / INTRO COLUMN */}
        <div className="flex flex-col justify-center order-1 min-w-0 max-w-[min(100%,38rem)]">
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
          <h1 className="mb-4 select-none leading-tight font-archivo [text-wrap:balance] !normal-case text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight" style={{ textTransform: "none" }}>
            <span className="block !normal-case" style={{ textTransform: "none" }}>
              Characters with
            </span>
            <span className="inline-block bg-[#DFF0FF] text-black border-[3px] border-black rounded-xl px-3 sm:px-4 py-1 shadow-[4px_4px_0px_#000] -rotate-1 mt-2 whitespace-nowrap !normal-case text-3xl sm:text-4xl md:text-5xl font-black tracking-tight" style={{ textTransform: "none" }}>
              attitude &amp; soul.
            </span>
          </h1>

          {/* Crisp 1-2 Line Editorial Subtitle */}
          <p className="text-black/90 text-sm sm:text-base leading-relaxed max-w-lg mb-6 sm:mb-7 font-medium [text-wrap:balance]">
            Original 2D cel-shaded illustrations for authors, indie game directors, and collectors.
          </p>

          {/* Commission Conversion Triggers */}
          <div className="flex flex-row items-center gap-2.5 w-full sm:w-auto my-4">
            <Link
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FFE600] text-black border-2 border-black rounded-xl font-black text-xs uppercase tracking-wider brutal-card-interactive text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black active:bg-black active:text-[#FFE600]"
            >
              <Zap className="w-3.5 h-3.5 fill-black stroke-black" />
              <span>COMMISSION ME</span>
            </Link>

            <Link
              href="#gallery"
              onClick={(e) => handleSmoothScroll(e, "gallery")}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-black border-2 border-black rounded-xl font-black text-xs uppercase tracking-wider brutal-card-interactive text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <Compass className="w-3.5 h-3.5 text-black" />
              <span>EXPLORE ARTWORK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            </Link>
          </div>

          {/* Studio Craft Badges (Scoped strictly to left column) */}
          <div className="w-full pt-3 sm:pt-4 border-t-2 border-black/20 flex flex-wrap items-center justify-start gap-x-4 gap-y-1.5 text-[11px] sm:text-xs font-bold text-black/90 mt-2">
            <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              300 DPI Print Masters
            </span>
            <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              Stepped Cel Values
            </span>
            <span className="inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap">
              <CheckCircle2 className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              Layered PSD + Vector Inks
            </span>
          </div>
        </div>

        {/* RIGHT / COLLAGE STAGE */}
        <div className="order-2 mt-6 lg:mt-0 w-full flex justify-center">
          {/* Locked Proportions Collage Container */}
          <div className="relative w-[300px] sm:w-[350px] lg:w-[460px] h-[360px] sm:h-[400px] lg:h-[480px] mx-auto mt-4 lg:mt-0 select-none">
            {/* BRAND ACCENT GLOW BEHIND 3-IMAGE COLLAGE */}
            <div
              className="absolute inset-2 -z-20 pointer-events-none select-none blur-3xl opacity-10 transition-transform duration-700 ease-out"
              style={{
                background: "radial-gradient(circle at 60% 45%, #FFE600 0%, #FF2A6D 50%, #9933FF 85%)",
                transform: `translate3d(${tilt.x * -10}px, ${tilt.y * -10}px, 0)`,
              }}
              aria-hidden="true"
            />

            {/* 1. SECONDARY BACK LAYER (Top Left): Book Cover (Issue 10) - Tilted -2deg */}
            <div
              className="absolute top-0 left-2 w-[150px] sm:w-[180px] lg:w-[220px] z-10 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${tilt.x * 6}px, ${tilt.y * 6}px, 0)`,
              }}
            >
              {/* Violet Accent Underlay */}
              <div
                className="absolute inset-0 bg-[#9933FF] translate-x-2 translate-y-2 -z-10 border border-black/80 -rotate-2 rounded-xl"
                aria-hidden="true"
              />
              <div
                onContextMenu={handleContextMenu}
                className="group relative bg-neutral-900 border-[3px] border-black rounded-xl -rotate-2 shadow-[4px_4px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:-rotate-3 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                  <Image
                    src="/assets/artworks/artwork_samples/Book cover/WhatsApp Image 2026-10-25 at 10.17.58 AM (1).jpeg"
                    alt="Editorial graphic novel cover artwork by Emilia"
                    fill
                    sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 220px"
                    className="object-cover object-bottom filter contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* 2. PRIMARY FOCAL ARTWORK (Dominant Center-Right): Character 28 - Tilted +1.5deg with crisp Cyan backing */}
            <div
              className="absolute top-3 right-0 w-[190px] sm:w-[230px] lg:w-[300px] z-20 transition-transform duration-500 ease-out"
              style={{
                transform: `translate3d(${tilt.x * -6}px, ${tilt.y * -6}px, 0)`,
              }}
            >
              {/* Solid Cyan Offset Anchor Slab */}
              <div
                className="absolute inset-0 bg-[#00E5FF] translate-x-2.5 translate-y-2.5 sm:translate-x-3 sm:translate-y-3 -z-10 border-2 border-black rotate-1 rounded-2xl"
                aria-hidden="true"
              />

              <div
                onContextMenu={handleContextMenu}
                className="group relative bg-white border-[3px] border-black rounded-2xl rotate-1 shadow-[5px_5px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:rotate-1 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                  <Image
                    src="/assets/artworks/artwork_samples/Character_art/28.jpg"
                    alt="Featured character illustration of blue-haired girl by Emilia"
                    fill
                    priority
                    sizes="(max-width: 640px) 190px, (max-width: 1024px) 230px, 300px"
                    className="object-cover object-top filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

            {/* 3. TERTIARY ACCENT LAYER: Character 10 Reaper - Tucked directly underneath family portrait */}
            <div
              className="absolute top-[170px] sm:top-[190px] lg:top-[240px] left-4 lg:left-8 w-[130px] sm:w-[150px] lg:w-[190px] z-30 transition-transform duration-700 ease-out"
              style={{
                transform: `translate3d(${tilt.x * 10}px, ${tilt.y * 10}px, 0)`,
              }}
            >
              {/* Dark Ink Offset Slab */}
              <div
                className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 -z-10 -rotate-1 rounded-xl"
                aria-hidden="true"
              />
              <div
                onContextMenu={handleContextMenu}
                className="group relative bg-white border-[3px] border-black rounded-xl -rotate-1 shadow-[4px_4px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:rotate-0 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
                  <Image
                    src="/assets/artworks/artwork_samples/Character_art/10.jpg"
                    alt="Kinetic reaper character illustration by Emilia"
                    fill
                    sizes="(max-width: 640px) 130px, (max-width: 1024px) 150px, 190px"
                    className="object-cover object-top filter contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Chibi Love Emote sticker pinned right to bottom edge of Reaper card */}
              <div className="absolute -bottom-3 -left-3 z-40 pointer-events-auto select-none">
                <div className="group relative animate-sticker-2">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap bg-black text-[#FFE600] border border-black text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 shadow-[2px_2px_0px_#FFE600]">
                    TWITCH &amp; DISCORD // READY
                  </div>
                  <div
                    onContextMenu={handleContextMenu}
                    className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 cursor-pointer die-cut-sticker -rotate-12 active:scale-95 drop-shadow-[2px_2px_0px_#000]"
                  >
                    <Image
                      src="/assets/artworks/artwork_samples/emotes/3.png"
                      alt="Cel-shaded love mascot emote sticker"
                      fill
                      sizes="(max-width: 768px) 48px, 56px"
                      className="object-contain shrink-0 no-drag"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Happy Emote Sticker pinned near top-right corner of anime card */}
            <div className="absolute top-1 right-2 z-40 pointer-events-auto select-none">
              <div className="group relative animate-bounce [animation-duration:3s]">
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 whitespace-nowrap bg-black text-[#FFE600] border border-black text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 shadow-[2px_2px_0px_#FFE600]">
                  CUSTOM EMOTES // HAND-DRAWN
                </div>
                <div
                  onContextMenu={handleContextMenu}
                  className="relative w-12 h-12 md:w-14 md:h-14 shrink-0 cursor-pointer die-cut-sticker rotate-6 active:scale-95 drop-shadow-[2px_2px_0px_#000]"
                >
                  <Image
                    src="/assets/artworks/artwork_samples/emotes/1.png"
                    alt="Hand-drawn happy mascot emote sticker"
                    fill
                    sizes="(max-width: 768px) 48px, 56px"
                    className="object-contain shrink-0 no-drag"
                  />
                </div>
              </div>
            </div>

            {/* Editorial Studio Watermark Stamp pinned to bottom edge of collage container */}
            <div
              className="inline-flex items-center gap-1.5 absolute bottom-1 right-2 z-40 bg-white/95 backdrop-blur-sm border-2 border-black px-2 py-0.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-neutral-800 shadow-[2px_2px_0px_#000000]"
              aria-hidden="true"
            >
              <span className="w-1.5 h-1.5 bg-[#00E5FF] rounded-none inline-block" />
              <span>ATELIER EMILIA // COMPOSITION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
