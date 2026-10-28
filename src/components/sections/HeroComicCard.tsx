"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { triggerArtworkProtectedToast } from "@/components/ui/ArtworkProtectionToast";

export interface HeroComicCardProps {
  imageSrc: string;
  characterTitle?: string;
  badgeTag?: string;
}

export const HeroComicCard: React.FC<HeroComicCardProps> = ({
  imageSrc,
  characterTitle = "CYBER RONIN // REKKA",
  badgeTag = "ISSUE #01",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate cursor position relative to card center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Max rotation angles (degrees)
    const maxRotate = 10;
    const rotateX = -mouseY * maxRotate; // Inverted so moving up tilts backwards
    const rotateY = mouseX * maxRotate;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`
    );
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly snap back to origin
    setTransformStyle(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    );
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerArtworkProtectedToast();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={handleContextMenu}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.08s ease-out"
          : "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        transformStyle: "preserve-3d",
      }}
      className="relative w-full max-w-md select-none will-change-transform cursor-pointer"
    >
      {/* 2.5D Comic Frame Backdrop Offset with slight negative depth */}
      <div
        style={{
          transform: "translateZ(-15px) translate(12px, 12px)",
        }}
        className="absolute inset-0 bg-comic-cyan border-[3px] border-black z-0 pointer-events-none"
      />

      {/* Main Showcase Panel (Z-layer 0) */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}
        className="relative z-10 bg-white border-[4px] border-black shadow-neo-lg overflow-hidden flex flex-col"
      >
        {/* Top Banner Ribbon - Parallax depth floating forward */}
        <div
          style={{
            transform: "translateZ(25px)",
            transformStyle: "preserve-3d",
          }}
          className="flex items-center justify-between border-b-[3px] border-black bg-comic-yellow px-4 py-2"
        >
          <span className="font-comic text-base tracking-wide text-black uppercase flex items-center gap-1.5 drop-shadow-[1px_1px_0px_#000]">
            <Sparkles className="w-4 h-4 fill-black text-black" />
            FEATURED KEYFRAME
          </span>
          <span className="bg-black text-white font-nav text-xs px-2.5 py-0.5 font-bold uppercase tracking-wider border border-black shadow-neo-sm">
            {badgeTag}
          </span>
        </div>

        {/* Character Visual Asset Base */}
        <div
          onContextMenu={handleContextMenu}
          className="relative aspect-[4/5] w-full bg-neutral-900 overflow-hidden select-none"
        >
          <Image
            src={imageSrc}
            alt={characterTitle}
            fill
            draggable={false}
            className="object-cover transition-transform duration-200 pointer-events-none select-none no-drag"
            priority
          />

          {/* Transparent Protection Overlay: Prevents direct right-click or drag from context menu */}
          <div
            onContextMenu={handleContextMenu}
            className="absolute inset-0 z-10 select-none bg-transparent"
          />

          {/* Halftone ambient depth layer */}
          <div className="absolute inset-0 bg-comic-dots opacity-20 pointer-events-none" />

          {/* Floating Comic Badge Overlay with prominent Parallax Depth */}
          <div
            style={{
              transform: "translateZ(35px)",
              transformStyle: "preserve-3d",
            }}
            className="absolute bottom-4 left-4 z-20 pointer-events-none"
          >
            <div className="bg-white border-[3px] border-black px-4 py-1.5 shadow-neo font-comic text-base sm:text-lg uppercase tracking-wide text-black flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-comic-pink border border-black animate-pulse" />
              <span>{characterTitle}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
