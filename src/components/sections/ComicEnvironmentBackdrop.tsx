"use client";

import React from "react";

export interface ComicEnvironmentBackdropProps {
  /** Normalized mouse offsets: x (-1 to 1), y (-1 to 1) */
  mouseX: number;
  mouseY: number;
}

/**
 * ComicEnvironmentBackdrop
 *
 * A handcrafted 2D comic & manga illustrator atelier environment.
 * Composed of authentic 2D vector elements:
 * - Layered stylized 2D anime clouds with cel-shading outlines & shadow fills
 * - Comic radial screentone & action speed burst anchored behind character art
 * - Hand-drawn ink flourishes, ink splatters, pencil construction crosshairs
 * - Manga Japanese dynamic sound-effect / registration stamps (スタジオ / "STUDIO")
 * - Differential 3-layer smooth 2D parallax responding dynamically to mouse movement
 */
export const ComicEnvironmentBackdrop: React.FC<ComicEnvironmentBackdropProps> = ({
  mouseX,
  mouseY,
}) => {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* ======================================================================= */}
      {/* LAYER 1: Deep Environmental Canvas (Halftone Screen + Studio Ink Wash)  */}
      {/* ======================================================================= */}
      <div
        className="absolute inset-0 transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mouseX * 8}px, ${mouseY * 8}px, 0)`,
        }}
      >
        {/* Soft Violet Organic Watercolor/Ink Stain (Left Upper Canvas) */}
        <div
          className="absolute -top-16 -left-20 w-[420px] h-[420px] rounded-full bg-comic-purple/15 blur-2xl animate-ink-float"
        />

        {/* Turquoise Ambient Cel Glow (Behind Character focal zone) */}
        <div
          className="absolute top-1/4 right-0 lg:right-16 w-[480px] h-[480px] rounded-full bg-comic-cyan/20 blur-3xl"
        />

        {/* Warm Golden Yellow Highlight Splash (Bottom Center-Left) */}
        <div
          className="absolute -bottom-20 left-1/4 w-[360px] h-[280px] rounded-full bg-comic-yellow/25 blur-2xl animate-paper-float"
        />
      </div>

      {/* ======================================================================= */}
      {/* LAYER 2: Midground 2D Cel-Shaded Elements (Manga Clouds, Burst & Screentone) */}
      {/* ======================================================================= */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mouseX * -16}px, ${mouseY * -16}px, 0)`,
        }}
      >
        {/* Cel-Shaded Manga Cloud #1 (Top Right, floating behind walk-cycle frame) */}
        <div className="absolute top-6 right-2 sm:right-16 lg:right-28 animate-cloud-drift-slow">
          <svg
            className="w-48 sm:w-64 md:w-80 h-auto drop-shadow-[4px_4px_0px_rgba(0,0,0,0.12)]"
            viewBox="0 0 260 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cloud Cel-Shadow Tone (Turquoise / Soft Indigo Tint) */}
            <path
              d="M50 110 C30 110 15 95 15 75 C15 58 28 44 45 42 C52 22 72 8 96 8 C122 8 143 24 148 46 C156 42 165 40 175 40 C202 40 225 62 225 90 C238 90 248 100 248 112 C248 126 236 136 220 136 L55 136 C53 136 51 136 50 110 Z"
              fill="#E0F7FA"
              fillOpacity="0.8"
            />
            {/* Cloud Main White Body with Comic Inking Line */}
            <path
              d="M48 106 C30 106 18 92 18 74 C18 58 30 46 46 44 C53 26 71 14 94 14 C118 14 138 29 144 50 C152 46 161 44 170 44 C195 44 216 64 216 89 C228 89 238 98 238 110 C238 122 228 132 214 132 L52 132 C38 132 38 106 48 106 Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Internal 2D Cel-Shade Line Accent */}
            <path
              d="M70 78 C90 70 120 74 140 86"
              stroke="#00E5FF"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M160 84 C175 80 195 85 205 94"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Cel-Shaded Manga Cloud #2 (Left Lower Area, floating near action triggers) */}
        <div className="hidden sm:block absolute bottom-12 -left-8 md:left-6 animate-cloud-drift-reverse">
          <svg
            className="w-40 sm:w-56 md:w-64 h-auto drop-shadow-[3px_3px_0px_rgba(0,0,0,0.08)]"
            viewBox="0 0 220 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cloud Shadow */}
            <path
              d="M40 95 C25 95 12 82 12 66 C12 52 23 40 37 38 C43 22 59 10 78 10 C99 10 116 23 121 41 C128 38 135 36 143 36 C165 36 183 54 183 76 C194 76 202 84 202 95 L40 95 Z"
              fill="#EDE7F6"
              fillOpacity="0.85"
            />
            {/* Cloud Body */}
            <path
              d="M38 90 C24 90 14 78 14 64 C14 51 24 41 37 39 C42 25 57 14 74 14 C94 14 110 26 115 42 C122 39 129 37 137 37 C158 37 175 53 175 74 C185 74 193 82 193 90 L38 90 Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Cel-shade accent mark */}
            <path
              d="M60 62 C75 56 100 60 114 70"
              stroke="#9933FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* 2D Manga Action Burst / Sunburst Radial Screentone behind character */}
        <div className="absolute right-0 sm:right-6 lg:right-24 top-10 sm:top-16 w-[340px] sm:w-[440px] md:w-[520px] aspect-square flex items-center justify-center animate-burst-pulse">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full text-black/15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Comic Speed Rays */}
            <g stroke="currentColor" strokeWidth="1.5">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i * 360) / 24;
                const rad = (angle * Math.PI) / 180;
                const x1 = 200 + Math.cos(rad) * 110;
                const y1 = 200 + Math.sin(rad) * 110;
                const x2 = 200 + Math.cos(rad) * 190;
                const y2 = 200 + Math.sin(rad) * 190;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    strokeDasharray={i % 2 === 0 ? "none" : "4 4"}
                    strokeWidth={i % 3 === 0 ? "2.5" : "1.2"}
                  />
                );
              })}
            </g>
            {/* Center Concentric Cel Circles */}
            <circle cx="200" cy="200" r="100" stroke="#FFE600" strokeWidth="3" strokeDasharray="8 6" opacity="0.7" />
            <circle cx="200" cy="200" r="130" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* LAYER 3: Foreground Hand-Drawn Sketch Inks & Studio Markings (Crisp)    */}
      {/* ======================================================================= */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mouseX * -26}px, ${mouseY * -26}px, 0)`,
        }}
      >
        {/* Japanese Studio Manga Stamp Seal (スタジオ // STUDIO EMILIA) */}
        <div className="hidden md:flex absolute top-6 left-12 lg:left-24 items-center gap-2 border-2 border-black bg-white/90 px-3 py-1.5 shadow-[3px_3px_0px_#000000] rotate-[-2deg] animate-sketch-wobble">
          <span className="w-2 h-2 bg-comic-pink border border-black" />
          <span className="font-comic tracking-widest text-xs uppercase text-black font-bold">
            スタジオ // 2D INK LAB
          </span>
          <span className="text-[10px] bg-black text-comic-yellow px-1 font-mono font-bold">
            SEC.01
          </span>
        </div>

        {/* Hand-Drawn 2D Crosshatch Ink Patch (Under Title Typography) */}
        <div className="absolute top-44 left-4 sm:left-10 lg:left-2 opacity-35 animate-sketch-wobble">
          <svg width="70" height="70" viewBox="0 0 60 60" fill="none" stroke="#000000" strokeWidth="1.5">
            <line x1="5" y1="10" x2="55" y2="10" />
            <line x1="5" y1="20" x2="55" y2="20" />
            <line x1="5" y1="30" x2="55" y2="30" />
            <line x1="5" y1="40" x2="55" y2="40" />
            <line x1="15" y1="5" x2="15" y2="50" />
            <line x1="30" y1="5" x2="30" y2="50" />
            <line x1="45" y1="5" x2="45" y2="50" />
            <line x1="10" y1="50" x2="50" y2="10" strokeDasharray="3 3" />
          </svg>
        </div>

        {/* Hand-Drawn Ink Sparkle Stars (✦) Floating Accents */}
        {/* Pink Sparkle Star */}
        <div className="absolute top-28 right-[46%] animate-paper-float">
          <svg
            className="w-8 h-8 text-comic-pink drop-shadow-[2px_2px_0px_#000000]"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="#000000"
            strokeWidth="1"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>

        {/* Yellow Sparkle Star */}
        <div className="hidden lg:block absolute bottom-24 right-[42%] animate-ink-float">
          <svg
            className="w-10 h-10 text-comic-yellow drop-shadow-[2px_2px_0px_#000000]"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="#000000"
            strokeWidth="1.2"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>

        {/* Turquoise Sparkle Star */}
        <div className="absolute bottom-12 left-1/3 animate-paper-float">
          <svg
            className="w-6 h-6 text-comic-cyan drop-shadow-[2px_2px_0px_#000000]"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="#000000"
            strokeWidth="1"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>

        {/* Hand-Drawn Ink Splatter Accents (Near Character Base) */}
        <div className="hidden sm:block absolute bottom-14 right-8 lg:right-20 opacity-70">
          <svg width="90" height="40" viewBox="0 0 90 40" fill="#000000">
            <circle cx="15" cy="18" r="4.5" />
            <circle cx="28" cy="12" r="2.5" />
            <circle cx="34" cy="24" r="1.5" />
            <circle cx="48" cy="16" r="3.5" />
            <circle cx="62" cy="22" r="2" />
            <circle cx="75" cy="14" r="4" />
            <circle cx="82" cy="28" r="1.5" />
          </svg>
        </div>

        {/* Technical Comic Drawing Board Crop Marks (Top Left & Bottom Right) */}
        <div className="absolute top-3 left-3 text-black/40 font-mono text-[9px] tracking-wider flex items-center gap-1">
          <span className="font-bold border border-black/40 px-1 py-0.5">X: 00</span>
          <span>DRAWING_BOARD // ART_01</span>
        </div>
        <div className="absolute bottom-3 right-3 text-black/40 font-mono text-[9px] tracking-wider hidden sm:block">
          <span>SAFE_PRINT_MARGIN: 300DPI ✦ CEL_SHADED</span>
        </div>
      </div>
    </div>
  );
};
