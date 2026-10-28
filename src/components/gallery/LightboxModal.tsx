import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Artwork } from "@/types/portfolio";
import { ComicBadge } from "@/components/ui/ComicBadge";
import { X, ZoomIn, ZoomOut, Calendar, Tag, Move, ShieldAlert } from "lucide-react";
import { triggerArtworkProtectedToast } from "@/components/ui/ArtworkProtectionToast";

export interface LightboxModalProps {
  artwork: Artwork | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ artwork, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const viewportRef = useRef<HTMLDivElement>(null);

  // Reset zoom & origin on artwork change
  useEffect(() => {
    setZoomLevel(1);
    setOrigin({ x: 50, y: 50 });
  }, [artwork]);

  // Handle escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (artwork) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [artwork, onClose]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setOrigin({ x, y });
  }, []);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    triggerArtworkProtectedToast();
  };

  if (!artwork) return null;

  const cycleZoom = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (zoomLevel === 1) {
      setZoomLevel(1.5);
    } else if (zoomLevel === 1.5) {
      setZoomLevel(2);
    } else {
      setZoomLevel(1);
      setOrigin({ x: 50, y: 50 });
    }
  };

  const isZoomed = zoomLevel > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Artwork inspection: ${artwork.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-[2px]"
      onClick={onClose}
    >
      {/* Modal Dialog Window */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative w-full max-w-5xl max-h-[92vh] flex flex-col md:flex-row
          bg-white border-[4px] border-black shadow-[10px_10px_0px_#000000]
          overflow-hidden select-none
        "
      >
        {/* Close Button Top-Right Corner */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="
            absolute top-3 right-3 z-30
            bg-comic-pink text-white border-2 border-black
            p-2 shadow-neo-sm hover:shadow-neo
            transition-all duration-75 hover:-translate-x-[1px] hover:-translate-y-[1px]
            active:translate-x-[1px] active:translate-y-[1px]
          "
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Image Inspection Viewport with Cursor-Tracking Pan & Zero Scrollbars */}
        <div
          ref={viewportRef}
          onMouseMove={handleMouseMove}
          onClick={cycleZoom}
          onContextMenu={handleContextMenu}
          className={`
            relative flex-1 bg-neutral-900 border-b-[4px] md:border-b-0 md:border-r-[4px] border-black
            flex items-center justify-center overflow-hidden min-h-[340px] md:min-h-[520px] p-4 select-none
            ${isZoomed ? "cursor-crosshair" : "cursor-zoom-in"}
          `}
        >
          {/* Zoom Control Bar */}
          <div
            className="absolute bottom-4 left-4 z-20 flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={cycleZoom}
              className="
                flex items-center gap-1.5 bg-comic-yellow text-black
                border-2 border-black px-3 py-1 font-btn text-xs font-bold
                shadow-neo-sm hover:shadow-neo transition-all duration-75 uppercase tracking-wider
              "
            >
              {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
              <span>ZOOM: {zoomLevel}x</span>
            </button>

            {isZoomed && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-black text-white px-2.5 py-1 font-nav text-[10px] font-bold uppercase tracking-wider border border-white">
                <Move className="w-3 h-3 text-comic-yellow" />
                MOVE MOUSE TO PAN
              </span>
            )}
          </div>

          {/* Zoom Container - Smooth cursor-tracking transform-origin with zero scrollbars */}
          <div
            onContextMenu={handleContextMenu}
            className="relative w-full h-full flex items-center justify-center select-none"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: isZoomed ? `${origin.x}% ${origin.y}%` : "center center",
              transition: isZoomed ? "transform 0.15s ease-out" : "transform 0.25s ease-out, transform-origin 0.25s ease-out",
            }}
          >
            <div className="relative w-[85vw] max-w-[500px] h-[50vh] sm:h-[60vh] max-h-[640px] select-none">
              <Image
                src={artwork.fullUrl}
                alt={artwork.title}
                fill
                draggable={false}
                sizes="(max-width: 768px) 85vw, 600px"
                className="object-contain pointer-events-none select-none no-drag"
                priority
              />

              {/* Transparent Protection Overlay: Sits directly above the image, intercepting right-clicks */}
              <div
                onContextMenu={handleContextMenu}
                className="absolute inset-0 z-10 select-none bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Metadata & Narrative Panel */}
        <div className="w-full md:w-[360px] bg-white p-5 sm:p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ComicBadge variant="cyan" size="sm">
                {artwork.category}
              </ComicBadge>
              <span className="flex items-center gap-1 text-xs text-neutral-500 font-bold">
                <Calendar className="w-3.5 h-3.5" />
                {artwork.date}
              </span>
            </div>

            <h2 className="font-comic text-4xl sm:text-5xl uppercase text-black tracking-wide leading-none">
              {artwork.title}
            </h2>

            <div className="w-12 h-1 bg-comic-yellow border-y border-black my-3" />

            <h5 className="font-nav text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
              PRODUCTION NOTES & CONTEXT
            </h5>
            <p className="text-sm text-neutral-700 leading-relaxed font-sans">
              {artwork.description}
            </p>

            <div className="mt-6">
              <h5 className="font-nav text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                PIECE TAGS
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {artwork.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-nav font-medium bg-neutral-100 border-2 border-black px-2 py-0.5 text-black uppercase tracking-wide"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t-[3px] border-black">
            <button
              onClick={onClose}
              className="
                w-full bg-black text-white border-2 border-black py-2.5
                font-btn text-sm font-bold uppercase tracking-wider
                shadow-neo-sm hover:bg-neutral-800 active:translate-x-[1px] active:translate-y-[1px]
              "
            >
              RETURN TO GALLERY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
