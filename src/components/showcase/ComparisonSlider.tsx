"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ShowcaseComparison } from "@/types/portfolio";
import { SlidersHorizontal } from "lucide-react";

export interface ComparisonSliderProps {
  showcase: ShowcaseComparison;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({ showcase }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(clampedPercentage);
  }, []);

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Interactive comparison slider between lineart sketch and final cel-shaded render"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      className="
        relative w-full aspect-[16/10] sm:aspect-[16/9]
        border-[4px] border-black shadow-neo-lg
        overflow-hidden select-none cursor-ew-resize
        focus:outline-none focus:ring-4 focus:ring-comic-yellow
      "
    >
      {/* Background Layer: Final Cel-Shaded Render (Right / Underneath) */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        <Image
          src={showcase.renderImage}
          alt={showcase.renderLabel}
          fill
          className="object-cover"
          priority
        />
        {/* Render Label Ribbon */}
        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <span className="bg-comic-yellow text-black border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider shadow-neo-sm">
            {showcase.renderLabel}
          </span>
        </div>
      </div>

      {/* Foreground Clipped Layer: Sketch & Lineart (Left) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <div className="relative w-full h-full min-w-full">
          <Image
            src={showcase.sketchImage}
            alt={showcase.sketchLabel}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Sketch Label Ribbon */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="bg-white text-black border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider shadow-neo-sm">
            {showcase.sketchLabel}
          </span>
        </div>
      </div>

      {/* Divider Bar & Tactile Drag Handle */}
      <div
        className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        {/* Vertical Comic Divider Line */}
        <div className="w-[4px] h-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]" />

        {/* Tactile Handle Center Button */}
        <div
          className="
            absolute w-12 h-12 bg-comic-yellow text-black
            border-[3px] border-black rounded-full
            flex items-center justify-center
            shadow-neo-sm
          "
        >
          <SlidersHorizontal className="w-5 h-5 stroke-[2.5]" />
        </div>
      </div>
    </div>
  );
};
