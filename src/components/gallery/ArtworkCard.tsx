import React from "react";
import { Artwork } from "@/types/portfolio";
import { ArrowUpRight } from "lucide-react";
import { triggerArtworkProtectedToast } from "@/components/ui/ArtworkProtectionToast";

export interface ArtworkCardProps {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
  activeFilter?: string;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onSelect }) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerArtworkProtectedToast();
  };

  const handleInspectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(artwork);
  };

  return (
    <div className="break-inside-avoid mb-6 w-full">
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
        className="w-full relative overflow-hidden group border-[3px] border-black bg-white shadow-[4px_4px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all duration-200 ease-out rounded-none cursor-pointer select-none focus:outline-none focus:ring-4 focus:ring-comic-yellow"
      >
        {/* Featured Artwork Top Corner Ribbon */}
        {artwork.featured && (
          <div className="absolute top-0 right-0 z-20 overflow-hidden w-20 h-20 pointer-events-none">
            <div className="bg-comic-pink text-white font-nav text-[9px] font-black uppercase tracking-wider py-1 text-center -rotate-45 translate-x-4 translate-y-2 border-y border-black shadow-sm">
              FEATURED
            </div>
          </div>
        )}

        {/* Pure Artwork Image with Controlled Inner Zoom */}
        <img
          src={artwork.thumbnailUrl}
          alt={artwork.title}
          draggable={false}
          loading="lazy"
          className="w-full h-auto block object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out pointer-events-none select-none no-drag"
        />

        {/* Artwork Protection Context Shield */}
        <div
          onContextMenu={handleContextMenu}
          className="absolute inset-0 z-10 select-none bg-transparent"
        />

        {/* Slick Hover Overlay with Smooth Fade */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 pointer-events-none">
          {/* Animated Floating Content sliding up */}
          <div className="transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col gap-2.5">
            {/* Category Tag Pill */}
            <div className="bg-[#FFE600] text-black text-[11px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 border border-black w-fit shadow-[2px_2px_0px_#000]">
              {artwork.category}
            </div>

            {/* Artwork Title */}
            <h3 className="font-comic text-xl sm:text-2xl text-white tracking-wide uppercase leading-tight line-clamp-2 drop-shadow-sm">
              {artwork.title}
            </h3>

            {/* Interactive CTA Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={handleInspectClick}
                className="pointer-events-auto inline-flex items-center gap-1.5 bg-white hover:bg-comic-yellow text-black border-2 border-black px-3.5 py-1.5 font-btn text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <span>VIEW FULL ART</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
