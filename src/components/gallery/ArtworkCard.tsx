import React from "react";
import Image from "next/image";
import { Artwork } from "@/types/portfolio";
import { ComicBadge } from "@/components/ui/ComicBadge";
import { Eye } from "lucide-react";
import { triggerArtworkProtectedToast } from "@/components/ui/ArtworkProtectionToast";

export interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onSelect }) => {
  const isBanner = artwork.category.toLowerCase() === "banner";

  const categoryBadgeVariant: Record<string, "cyan" | "pink" | "yellow"> = {
    "Character Art": "cyan",
    "Book Cover": "yellow",
    "Comic": "pink",
    "Manga": "cyan",
    "Banner": "pink",
    "Emotes": "yellow",
    "Mascot Logo": "cyan",
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerArtworkProtectedToast();
  };

  return (
    <div
      onClick={() => onSelect(artwork)}
      onContextMenu={handleContextMenu}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(artwork);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View ${artwork.title} in Lightbox`}
      className={`
        group relative bg-white border-[3px] border-black
        shadow-neo hover:shadow-neo-lg
        transition-all duration-75 ease-out
        hover:-translate-x-[2px] hover:-translate-y-[2px]
        cursor-pointer overflow-hidden flex flex-col select-none
        focus:outline-none focus:ring-4 focus:ring-comic-yellow
        ${isBanner ? "col-span-full" : "col-span-1"}
      `}
    >
      {/* Comic Frame Top Tag */}
      <div className="flex items-center justify-between border-b-[3px] border-black bg-neutral-100 px-3 py-1.5 z-10">
        <span className="font-comic text-xs font-black tracking-widest text-neutral-600 uppercase">
          {artwork.id.toUpperCase()}
        </span>
        <ComicBadge
          variant={categoryBadgeVariant[artwork.category] || "yellow"}
          size="sm"
        >
          {artwork.category}
        </ComicBadge>
      </div>

      {/* Artwork Image Container */}
      <div
        onContextMenu={handleContextMenu}
        className={`
          relative w-full bg-neutral-900 overflow-hidden flex items-center justify-center select-none
          ${isBanner ? "aspect-[16/7] md:aspect-[3/1] lg:aspect-[16/6] p-0" : "aspect-[4/5] p-2"}
        `}
      >
        <div className="relative w-full h-full select-none">
          <Image
            src={artwork.thumbnailUrl}
            alt={artwork.title}
            fill
            draggable={false}
            sizes={isBanner ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            className={`${isBanner ? "object-cover" : "object-contain"} w-full h-full transition-transform duration-100 ease-out group-hover:scale-105 pointer-events-none select-none no-drag`}
            priority={artwork.featured}
          />
        </div>

        {/* Transparent Protection Overlay: Prevents direct right-click or drag from context menu */}
        <div
          onContextMenu={handleContextMenu}
          className="absolute inset-0 z-10 select-none bg-transparent"
        />

        {/* Hover Inspect Overlay */}
        <div className="
          absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100
          transition-opacity duration-75 flex items-center justify-center pointer-events-none
        ">
          <span className="
            flex items-center gap-1.5 bg-comic-yellow text-black
            border-2 border-black px-3 py-1 font-btn text-xs font-bold
            shadow-[3px_3px_0px_#000000] -rotate-3 tracking-wider uppercase
          ">
            <Eye className="w-4 h-4" />
            INSPECT PANEL
          </span>
        </div>
      </div>

      {/* Compact Info Deck */}
      <div className="border-t-[3px] border-black px-4 py-3 bg-white flex flex-col justify-between">
        <h4 className="font-comic text-xl sm:text-2xl uppercase text-black tracking-wide leading-tight group-hover:text-comic-pink transition-colors truncate">
          {artwork.title}
        </h4>
        <div className="mt-1 flex items-center justify-between text-xs font-nav text-neutral-500 uppercase tracking-wider font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-comic-yellow border border-black inline-block" />
            {artwork.tags && artwork.tags.length > 3 ? artwork.tags[3] : "FULL VECTOR INKS // 300 DPI"}
          </span>
          <span className="text-[11px] text-neutral-400">
            {artwork.date}
          </span>
        </div>
      </div>
    </div>
  );
};
