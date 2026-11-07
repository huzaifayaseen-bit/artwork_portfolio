"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Artwork } from "@/types/portfolio";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { CategoryTabs, FilterCategory } from "@/components/gallery/CategoryTabs";
import { LightboxModal } from "@/components/gallery/LightboxModal";
import { Layers, ArrowRight } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export interface ArtGalleryProps {
  artworks: Artwork[];
  limit?: number;
  showViewAllLink?: boolean;
}

export const ArtGallery: React.FC<ArtGalleryProps> = ({
  artworks,
  limit,
  showViewAllLink = false,
}) => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const { playPageFlip } = useSound();

  const handleSelectArtwork = (art: Artwork) => {
    playPageFlip();
    setSelectedArtwork(art);
  };

  const categories: FilterCategory[] = [
    "All",
    "Character Art",
    "Book Cover",
    "Comic",
    "Manga",
    "Banner",
    "Emotes",
    "Mascot Logo",
  ];

  const artworkCounts = useMemo(() => {
    const counts: Record<FilterCategory, number> = {
      All: artworks.length,
      "Character Art": 0,
      "Book Cover": 0,
      Comic: 0,
      Manga: 0,
      Banner: 0,
      Emotes: 0,
      "Mascot Logo": 0,
    };
    artworks.forEach((art) => {
      if (counts[art.category] !== undefined) {
        counts[art.category]++;
      }
    });
    return counts;
  }, [artworks]);

  const filteredArtworks = useMemo(() => {
    const list =
      activeCategory === "All"
        ? artworks
        : artworks.filter((art) => art.category === activeCategory);
    return limit ? list.slice(0, limit) : list;
  }, [artworks, activeCategory, limit]);

  // Current index in filtered set for Lightbox navigation
  const currentIndex = useMemo(() => {
    if (!selectedArtwork) return -1;
    return filteredArtworks.findIndex((a) => a.id === selectedArtwork.id);
  }, [selectedArtwork, filteredArtworks]);

  const handlePrevArtwork = () => {
    if (currentIndex > 0) {
      playPageFlip();
      setSelectedArtwork(filteredArtworks[currentIndex - 1]);
    }
  };

  const handleNextArtwork = () => {
    if (currentIndex >= 0 && currentIndex < filteredArtworks.length - 1) {
      playPageFlip();
      setSelectedArtwork(filteredArtworks[currentIndex + 1]);
    }
  };

  // Dynamic masonry container layout based on active category
  const masonryContainerClass = useMemo(() => {
    if (activeCategory === "Banner") {
      return "columns-1 md:columns-2 gap-6 [column-fill:_balance]";
    }
    if (activeCategory === "Emotes") {
      return "columns-2 sm:columns-3 md:columns-4 lg:columns-6 gap-4 [column-fill:_balance]";
    }
    return "columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]";
  }, [activeCategory]);

  return (
    <section id="gallery" className="py-8 sm:py-12 scroll-mt-20">
      {/* Section Header & Stacked Filter Bar */}
      <div className="flex flex-col gap-6 mb-10">
        {/* Title, Badge & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-comic-cyan border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2.5 shadow-[2px_2px_0px_#000]">
              <Layers className="w-4 h-4" />
              PANEL ARCHIVE
            </div>
            <h2 className="font-comic text-5xl sm:text-7xl uppercase text-black tracking-wide leading-none">
              CURATED ARTWORKS
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-700 max-w-2xl font-sans">
              Explore sequential frames, high-octane character designs, and full-bleed cel-shaded comic illustrations.
            </p>
          </div>

          {showViewAllLink && (
            <Link
              href="/artworks"
              className="self-start md:self-end inline-flex items-center gap-2 font-btn text-xs font-bold uppercase tracking-wider bg-black hover:bg-neutral-800 text-white border-2 border-black px-4 py-2 shadow-neo-sm hover:shadow-neo transition-all"
            >
              <span>VIEW FULL ARCHIVE ({artworks.length}+)</span>
              <ArrowRight className="w-4 h-4 text-comic-yellow" />
            </Link>
          )}
        </div>

        {/* Full-width Category Tabs Filter Bar */}
        <div className="w-full pt-1 border-t-2 border-dashed border-black/15">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            artworkCounts={artworkCounts}
          />
        </div>
      </div>

      {/* Multi-Column Masonry Gallery Container */}
      {filteredArtworks.length > 0 ? (
        <div className={masonryContainerClass}>
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onSelect={handleSelectArtwork}
              activeFilter={activeCategory}
            />
          ))}
        </div>
      ) : (
        /* Comic Empty State Fallback */
        <div className="border-[3px] border-black bg-white p-12 text-center shadow-neo">
          <div className="inline-block bg-comic-yellow border-2 border-black px-4 py-2 font-comic text-xl font-black mb-3">
            EMPTY PANEL!
          </div>
          <p className="text-neutral-600 font-medium">
            No artworks archived under this category yet.
          </p>
        </div>
      )}

      {/* View All Footer for Limited Showcases */}
      {showViewAllLink && artworks.length > filteredArtworks.length && (
        <div className="mt-10 text-center">
          <Link
            href="/artworks"
            className="inline-flex items-center gap-2 font-btn text-sm font-bold uppercase tracking-wider bg-comic-yellow hover:bg-[#FFF033] text-black border-[3px] border-black px-6 py-3 shadow-neo hover:shadow-neo-lg transition-all"
          >
            <span>BROWSE ALL {artworks.length} CEL-SHADED ARTWORKS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Lightbox Modal */}
      <LightboxModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onPrev={handlePrevArtwork}
        onNext={handleNextArtwork}
        hasPrev={currentIndex > 0}
        hasNext={currentIndex >= 0 && currentIndex < filteredArtworks.length - 1}
      />
    </section>
  );
};
