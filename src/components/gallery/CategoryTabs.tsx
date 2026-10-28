"use client";

import React from "react";
import { ArtworkCategory } from "@/types/portfolio";
import { useSound } from "@/context/SoundContext";

export type FilterCategory = "All" | ArtworkCategory;

export interface CategoryTabsProps {
  categories: FilterCategory[];
  activeCategory: FilterCategory;
  onSelectCategory: (category: FilterCategory) => void;
  artworkCounts: Record<FilterCategory, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  artworkCounts,
}) => {
  const { playPageFlip } = useSound();

  const handleCategoryClick = (cat: FilterCategory) => {
    playPageFlip();
    onSelectCategory(cat);
  };

  return (
    <div className="w-full flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-none flex-nowrap sm:flex-wrap">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`
              relative flex-shrink-0 inline-flex items-center gap-2.5
              border-[3px] border-black px-4 py-2 font-btn text-xs sm:text-sm font-bold uppercase tracking-wider
              shadow-[4px_4px_0px_#000] active:shadow-none
              transition-all duration-75 select-none cursor-pointer
              ${
                isActive
                  ? "bg-comic-yellow text-black -translate-x-[2px] -translate-y-[2px] shadow-[6px_6px_0px_#000]"
                  : "bg-white text-black hover:bg-neutral-100 hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px]"
              }
            `}
          >
            <span className="whitespace-nowrap">{cat}</span>
            <span
              className={`
                inline-flex items-center justify-center min-w-[24px] h-[20px] px-1.5
                border-2 border-black text-[11px] font-mono font-black
                ${isActive ? "bg-black text-white" : "bg-neutral-100 text-black"}
              `}
            >
              {artworkCounts[cat] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
};
