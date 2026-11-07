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
    alt: "Hand-drawn happy emote sticker",
    tooltip: "CUSTOM EMOTES // HAND-DRAWN",
    positionClass: "-top-3 -right-2 sm:-top-5 sm:-right-4",
    animationClass: "animate-sticker-1",
    initialRotate: "rotate-6",
    sizeClass: "w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20",
  },
  {
    id: "emote-love",
    src: "/assets/artworks/artwork_samples/emotes/3.png",
    alt: "Cel-shaded love emote sticker",
    tooltip: "TWITCH & DISCORD // READY",
    positionClass: "-bottom-6 sm:-bottom-8 -left-3 sm:-left-6",
    animationClass: "animate-sticker-2",
    initialRotate: "-rotate-12",
    sizeClass: "w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
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
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden bg-[#FF6B35] border-b-[4px] border-black w-full"
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

      {/* 2. TECHNICAL VECTOR ACCENTS (Crosshairs & Watermarks - Cleanly Spaced) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0" aria-hidden="true">
        {/* Top-Right Watermark */}
        <div className="absolute top-6 right-4 sm:right-6 font-mono text-[9px] tracking-widest text-black/40 uppercase hidden sm:block">
          SYS.INK_V2 // 2026.STUDIO
        </div>

        {/* Center-Grid Crosshair Accent */}
        <div className="absolute top-12 left-[48%] font-mono text-[13px] font-bold text-black/30 hidden md:block">
          +
        </div>

        {/* Bottom-Left Crosshair */}
        <div className="absolute bottom-12 left-4 sm:left-6 font-mono text-[11px] font-bold text-black/40 flex items-center gap-1.5">
          <span>+</span>
          <span className="text-[9px] tracking-widest uppercase">COORD.24.X</span>
        </div>
      </div>

      {/* Main Editorial Studio Grid: 12 Columns */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* LEFT / INTRO COLUMN (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          {/* Studio Meta Status */}
          <div className="flex items-center mb-5">
            <span className="inline-flex items-center gap-1.5 bg-white text-black border-2 border-black rounded-full px-3 py-1 text-xs font-black shadow-[2px_2px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-emerald-600/30" />
              COMMISSIONS OPEN
            </span>
          </div>

          {/* Xotoe 2-Line Sentence-Case Title Lockup */}
          <h1 className="mb-2 select-none">
            <span className="text-5xl md:text-6xl font-black text-black tracking-tight leading-[1.08] block font-nav">
              Characters with
            </span>
            <span className="inline-block bg-[#FFE600] text-black border-[3px] border-black rounded-2xl px-4 py-1 pb-2 shadow-[5px_5px_0px_#000] -rotate-1 mt-1.5 font-black text-5xl md:text-6xl tracking-tight leading-none font-nav">
              attitude &amp; soul.
            </span>
          </h1>

          {/* Xotoe Sub-Kicker */}
          <p className="text-xs md:text-sm font-black uppercase tracking-[0.15em] text-black mt-6 mb-3">
            2D CEL-SHADED ILLUSTRATION • STORYBOARDS &amp; COVERS
          </p>

          {/* Editorial Style Narrative Introduction */}
          <p className="text-black/90 text-sm sm:text-base leading-relaxed max-w-lg mb-7 font-medium">
            Original 2D cel-shaded illustrations built with razor-sharp vector inking, stepped tonal separation, and high-impact comic sensibilities. Handcrafted for authors, indie game directors, and collectors.
          </p>

          {/* Commission Conversion Triggers */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <Link
              href="#contact-section"
              onClick={(e) => handleSmoothScroll(e, "contact-section")}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#FFE600] text-black border-[3px] border-black rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:bg-black active:text-[#FFE600]"
            >
              <Zap className="w-4 h-4 fill-black stroke-black" />
              <span>COMMISSION ME</span>
            </Link>

            <Link
              href="#artworks-section"
              onClick={(e) => handleSmoothScroll(e, "artworks-section")}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black border-[3px] border-black rounded-xl font-black text-sm uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>EXPLORE ARTWORK</span>
              <ArrowUpRight className="w-4 h-4 text-black stroke-[2.5]" />
            </Link>
          </div>

          {/* Studio Craft Badges */}
          <div className="pt-5 border-t-2 border-black/20 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-nav font-bold text-black/85">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
              300 DPI Print Masters
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
              Stepped Cel Values
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
              Layered PSD + Vector Inks
            </span>
          </div>
        </div>

        {/* RIGHT / 3. ARTWORK COLLAGE WITH SPRING PHYSICS & DIE-CUT EMOTE STICKERS (7 cols on lg) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          {/* Collage Stage Container */}
          <div className="relative w-full max-w-[580px] lg:max-w-none mx-auto pt-2 pb-6 sm:pb-8 px-2 sm:px-4">

            {/* BRAND ACCENT GLOW BEHIND 3-IMAGE COLLAGE */}
            <div
              className="absolute inset-2 -z-20 pointer-events-none select-none blur-3xl opacity-10 transition-transform duration-700 ease-out"
              style={{
                background: "radial-gradient(circle at 60% 45%, #FFE600 0%, #FF2A6D 50%, #9933FF 85%)",
                transform: `translate3d(${tilt.x * -10}px, ${tilt.y * -10}px, 0)`,
              }}
              aria-hidden="true"
            />

            {/* Integrated Cyan & Violet Structural Framing Underlays */}
            <div
              className="absolute inset-x-6 top-6 bottom-6 bg-gradient-to-br from-[#00E5FF]/15 via-transparent to-[#9933FF]/15 border border-black/10 -z-20 pointer-events-none"
              aria-hidden="true"
            />
            {/* Cyan structural backing block */}
            <div
              className="absolute top-2 sm:top-4 right-10 sm:right-20 w-48 sm:w-60 h-52 sm:h-64 bg-[#00E5FF]/20 border border-black/20 -z-10 pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: `translate3d(${tilt.x * -8}px, ${tilt.y * -8}px, 0)` }}
              aria-hidden="true"
            />
            {/* Violet geometric grounding block */}
            <div
              className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 w-44 sm:w-56 h-40 sm:h-52 bg-[#9933FF]/15 border border-black/20 -z-10 pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: `translate3d(${tilt.x * 10}px, ${tilt.y * 10}px, 0)` }}
              aria-hidden="true"
            />

            {/* ARTWORK COLLAGE COMPOSITION WITH SPRING HOVER PHYSICS */}
            <div className="relative w-full min-h-[420px] sm:min-h-[490px] lg:min-h-[520px]">

              {/* 1. SECONDARY BACK LAYER (Top Left): Editorial Graphic Novel Cover (Issue 10, 4/5 Aspect) */}
              <div
                className="absolute top-0 left-0 w-[42%] sm:w-[38%] z-10 transition-transform duration-500 ease-out"
                style={{
                  transform: `translate3d(${tilt.x * 6}px, ${tilt.y * 6}px, 0)`,
                }}
              >
                {/* Violet Accent Underlay */}
                <div
                  className="absolute inset-0 bg-[#9933FF] translate-x-1.5 translate-y-1.5 -z-10 border border-black/60"
                  aria-hidden="true"
                />
                <div
                  onContextMenu={handleContextMenu}
                  className="group relative bg-neutral-900 border-[2px] border-black shadow-[4px_4px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src="/assets/artworks/artwork_samples/Book cover/WhatsApp Image 2026-10-25 at 10.17.58 AM (1).jpeg"
                      alt="Editorial graphic novel cover by Emilia"
                      fill
                      sizes="(max-width: 640px) 42vw, 24vw"
                      className="object-cover object-center filter contrast-[1.02] transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* 2. PRIMARY FOCAL ARTWORK (Dominant Center-Right): Character 28 (CHARACTER-ART-29: Blue-haired girl with blue top hat, 1/1 Aspect) */}
              <div
                className="absolute top-4 sm:top-6 right-0 sm:right-2 w-[65%] sm:w-[66%] z-20 transition-transform duration-500 ease-out"
                style={{
                  transform: `translate3d(${tilt.x * -6}px, ${tilt.y * -6}px, 0)`,
                }}
              >
                {/* Solid Cyan Offset Anchor Slab */}
                <div
                  className="absolute inset-0 bg-[#00E5FF] translate-x-2.5 translate-y-2.5 sm:translate-x-3.5 sm:translate-y-3.5 -z-10 border-2 border-black"
                  aria-hidden="true"
                />

                <div
                  onContextMenu={handleContextMenu}
                  className="group relative bg-white border-[2.5px] sm:border-[3px] border-black shadow-[6px_6px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:rotate-1 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-950">
                    <Image
                      src="/assets/artworks/artwork_samples/Character_art/28.jpg"
                      alt="Featured character illustration by Emilia"
                      fill
                      priority
                      sizes="(max-width: 640px) 66vw, (max-width: 1024px) 50vw, 38vw"
                      className="object-cover object-top filter contrast-[1.03] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. TERTIARY ACCENT LAYER (Bottom Left): Character 10 Reaper (1/1 Aspect) */}
              <div
                className="absolute bottom-3 sm:bottom-5 left-5 sm:left-8 w-[36%] sm:w-[34%] z-30 transition-transform duration-700 ease-out"
                style={{
                  transform: `translate3d(${tilt.x * 10}px, ${tilt.y * 10}px, 0)`,
                }}
              >
                {/* Dark Ink Offset Slab */}
                <div
                  className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 -z-10"
                  aria-hidden="true"
                />
                <div
                  onContextMenu={handleContextMenu}
                  className="group relative bg-white border-[2px] border-black shadow-[4px_4px_0px_#000000] overflow-hidden cursor-pointer transition-all duration-[350ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-x-1 hover:-translate-y-2 hover:-rotate-1 hover:shadow-[8px_8px_0px_#000000] hover:z-40"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
                    <Image
                      src="/assets/artworks/artwork_samples/Character_art/10.jpg"
                      alt="Kinetic cel character illustration by Emilia"
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

              {/* Editorial Studio Watermark Stamp */}
              <div
                className="hidden sm:inline-flex items-center gap-2 absolute -bottom-1 right-2 z-30 bg-white/95 backdrop-blur-sm border border-black/80 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-neutral-600 shadow-[2px_2px_0px_#000000]"
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
