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
    <div className="w-full flex items-center gap-3 sm:gap-4 overflow-x-auto pb-3 pt-2 px-1 scrollbar-none flex-nowrap sm:flex-wrap">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`
              relative flex-shrink-0 inline-flex items-center gap-2.5
              border-[3px] border-black px-4 py-2 font-btn text-xs sm:text-sm font-bold uppercase tracking-wider
              cursor-pointer select-none brutal-card-interactive
              ${isActive ? "bg-comic-yellow text-black" : "bg-white text-black hover:bg-neutral-50"}
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
