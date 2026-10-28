"use client";

import React, { useMemo, useState } from "react";
import { Artwork } from "@/types/portfolio";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import { CategoryTabs, FilterCategory } from "@/components/gallery/CategoryTabs";
import { LightboxModal } from "@/components/gallery/LightboxModal";
import { Layers } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export interface ArtGalleryProps {
  artworks: Artwork[];
}

export const ArtGallery: React.FC<ArtGalleryProps> = ({ artworks }) => {
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
    if (activeCategory === "All") return artworks;
    return artworks.filter((art) => art.category === activeCategory);
  }, [artworks, activeCategory]);

  return (
    <section id="gallery" className="py-8 sm:py-12">
      {/* Section Header & Stacked Filter Bar */}
      <div className="flex flex-col gap-6 mb-10">
        {/* Title, Badge & Subtitle */}
        <div>
          <div className="inline-flex items-center gap-2 bg-comic-cyan border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2.5 shadow-[2px_2px_0px_#000]">
            <Layers className="w-4 h-4" />
            PANEL ARCHIVE
          </div>
          <h2 className="font-comic text-5xl sm:text-7xl uppercase text-black tracking-wide leading-none">
            CURATED ARTWORKS
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 max-w-2xl font-sans">
            Explore sequential frames, high-octane character design, and full-bleed cel-shaded comic illustrations.
          </p>
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

      {/* Gallery Grid */}
      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onSelect={handleSelectArtwork}
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

      {/* Lightbox Modal */}
      <LightboxModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </section>
  );
};
