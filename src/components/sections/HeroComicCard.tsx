"use client";

import React, { useState } from "react";
import Image from "next/image";
import { triggerArtworkProtectedToast } from "@/components/ui/ArtworkProtectionToast";
import { Sparkles, Play, Image as ImageIcon } from "lucide-react";

export interface HeroComicCardProps {
  imageSrc?: string;
  videoSrc?: string;
  characterTitle?: string;
  badgeTag?: string;
}

export const HeroComicCard: React.FC<HeroComicCardProps> = ({
  imageSrc = "/assets/artworks/artwork_samples/Character_art/24.jpg",
  videoSrc = "/hero-walk-cycle.mp4",
  characterTitle = "ORIGINAL CHARACTER // CEL MASTER",
  badgeTag = "FEATURED 2D ART",
}) => {
  const [activeMedia, setActiveMedia] = useState<"art" | "animation">("art");

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerArtworkProtectedToast();
  };

  return (
    <div className="relative w-full max-w-lg select-none">
      {/* Neo-brutalist Cyan & Violet Layered Comic Backdrops */}
      <div className="absolute -top-3 -right-3 w-full h-full bg-[#00E5FF] border-[3px] border-black z-0 pointer-events-none" />
      <div className="absolute -bottom-3 -left-3 w-full h-full bg-[#9933FF] border-[3px] border-black z-0 pointer-events-none" />

      {/* Main Illustration Panel */}
      <div className="relative z-10 bg-white border-[4px] border-black shadow-[8px_8px_0px_#000000] overflow-hidden flex flex-col">
        {/* Top Comic Banner & Mode Switcher */}
        <div className="flex items-center justify-between border-b-[3px] border-black bg-comic-yellow px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-comic-pink border border-black animate-pulse" />
            <span className="font-comic text-base tracking-wide text-black uppercase font-black">
              {badgeTag}
            </span>
          </div>

          {/* Quick toggle between Hi-Res Cel Illustration & 2D Animation */}
          {videoSrc && imageSrc && (
            <div className="flex items-center border-2 border-black bg-white shadow-[2px_2px_0px_#000]">
              <button
                type="button"
                onClick={() => setActiveMedia("art")}
                className={`flex items-center gap-1 px-2.5 py-0.5 font-nav text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  activeMedia === "art"
                    ? "bg-black text-white"
                    : "text-black hover:bg-neutral-100"
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>ILLUST</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMedia("animation")}
                className={`flex items-center gap-1 px-2.5 py-0.5 font-nav text-[11px] font-bold uppercase tracking-wider transition-colors border-l-2 border-black ${
                  activeMedia === "animation"
                    ? "bg-black text-white"
                    : "text-black hover:bg-neutral-100"
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>60 FPS</span>
              </button>
            </div>
          )}
        </div>

        {/* Featured Artwork Display Area */}
        <div
          onContextMenu={handleContextMenu}
          className="relative aspect-[4/5] w-full bg-[#111111] overflow-hidden select-none flex items-center justify-center"
        >
          {activeMedia === "animation" && videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          ) : (
            <div className="relative w-full h-full p-2">
              <Image
                src={imageSrc}
                alt="Emilia Featured 2D Cel-Shaded Artwork"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-contain pointer-events-none select-none no-drag"
              />
            </div>
          )}

          {/* Transparent Right-Click Protection Overlay */}
          <div
            onContextMenu={handleContextMenu}
            className="absolute inset-0 z-10 select-none bg-transparent"
          />

          {/* Floating Lower Comic Badges */}
          <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
            <div className="bg-white border-2 border-black px-3 py-1 font-comic text-xs sm:text-sm uppercase tracking-wide text-black shadow-[3px_3px_0px_#000] flex items-center gap-2">
              <span className="w-2 h-2 bg-comic-green border border-black" />
              <span>{characterTitle}</span>
            </div>

            <div className="bg-comic-cyan text-black border-2 border-black px-2.5 py-1 font-nav text-[10px] font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000]">
              VECTOR INKS // 300 DPI
            </div>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="bg-[#FAF7F2] border-t-[3px] border-black px-4 py-2 flex items-center justify-between text-xs font-nav font-bold uppercase tracking-wider">
          <span className="text-neutral-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-comic-purple fill-comic-purple" />
            PURE 2D CEL-SHADED PRODUCTION ASSET
          </span>
          <span className="text-neutral-500 font-mono">#SAMPLE-24</span>
        </div>
      </div>
    </div>
  );
};
