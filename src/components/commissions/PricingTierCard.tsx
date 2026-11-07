import React from "react";
import { CommissionTier } from "@/types/portfolio";
import { Clock, ArrowRight, Zap, Check } from "lucide-react";

export interface PricingTierCardProps {
  tier: CommissionTier;
  onSelectTier: (tier: CommissionTier) => void;
}

export const PricingTierCard: React.FC<PricingTierCardProps> = ({
  tier,
  onSelectTier,
}) => {
  // Determine distinct pastel / neo-brutalist bento background per tier
  const isTier1 = tier.id === "tier-bust" || tier.price < 100;
  const isTier2 = tier.popular || tier.id === "tier-half";
  const isTier3 = tier.id === "tier-full" || tier.price >= 200;

  const bgClass = isTier1
    ? "bg-[#E0F2FE]"
    : isTier2
    ? "bg-[#FEF08A]"
    : "bg-[#FED7AA]";

  // Convert raw deliverable strings into clean punchy micro-tag pills
  const formatDeliverableTag = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("300 dpi")) return "300 DPI PRINT";
    if (lower.includes("psd")) return "PSD SOURCE";
    if (lower.includes("revision")) return "2 FREE REVISIONS";
    if (lower.includes("commercial")) return "COMMERCIAL RIGHTS";
    if (lower.includes("transparent")) return "TRANSPARENT PNG";
    if (lower.includes("flat color")) return "COLOR + SCREENTONE";
    if (lower.includes("sfx") || lower.includes("halftone")) return "COMIC SFX FRAME";
    if (lower.includes("vector") || lower.includes("separated")) return "VECTOR INKS";
    if (lower.includes("discord")) return "DISCORD WIP CHANNEL";
    if (lower.includes("typography")) return "CUSTOM TITLE DECK";
    if (lower.includes("personal")) return "PERSONAL LICENSE";
    return text.toUpperCase();
  };

  return (
    <div
      className={`
        relative border-[3px] border-black rounded-2xl shadow-[5px_5px_0px_#000] p-5 sm:p-7
        flex flex-col justify-between transition-all duration-150 select-none
        hover:-translate-y-1 hover:shadow-[7px_7px_0px_#000] ${bgClass}
      `}
    >
      {/* Tier 2: Offset Rotated "MOST POPULAR" Badge */}
      {isTier2 && (
        <div className="absolute -top-3.5 right-4 z-20">
          <span className="inline-block bg-comic-pink text-white font-nav text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] rotate-2">
            ★ MOST POPULAR ★
          </span>
        </div>
      )}

      {/* Top Header & Price Block */}
      <div>
        {/* Tier Eyebrow / Number */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-[11px] font-black uppercase tracking-widest text-neutral-800 bg-white/70 px-2 py-0.5 rounded border border-black/30">
            {isTier1 ? "TIER 01 // ENTRY" : isTier2 ? "TIER 02 // ACTION" : "TIER 03 // MASTER"}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-nav font-bold text-neutral-800">
            <Clock className="w-3.5 h-3.5 text-black" />
            <span>{tier.turnaroundTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-comic text-3xl sm:text-4xl uppercase text-black tracking-wide leading-none mt-1">
          {tier.name}
        </h3>
        <p className="text-xs sm:text-sm text-neutral-800 font-sans mt-1.5 leading-snug">
          {tier.subtitle}
        </p>

        {/* Price Display */}
        <div className="mt-5 mb-6 pb-5 border-b-2 border-black/20 flex items-baseline gap-2">
          <span className="font-comic text-5xl sm:text-6xl text-black leading-none drop-shadow-[1px_1px_0px_rgba(0,0,0,0.2)]">
            ${tier.price}
          </span>
          <span className="font-nav text-xs font-black text-neutral-800 uppercase tracking-widest">
            {tier.currency} BASE
          </span>
        </div>

        {/* Deliverables as Comic Tags / Micro-Pills */}
        <div>
          <span className="block font-nav text-[10px] font-black uppercase tracking-widest text-neutral-700 mb-2.5">
            INCLUDED DELIVERABLES:
          </span>
          <div className="flex flex-wrap gap-2">
            {tier.deliverables.map((item, idx) => {
              const pillLabel = formatDeliverableTag(item);
              return (
                <span
                  key={idx}
                  title={item}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-black rounded-lg text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-neutral-50 transition-colors"
                >
                  <Check className="w-3 h-3 stroke-[3] text-black" />
                  <span>{pillLabel}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pinned Bottom High-Contrast Action Button */}
      <div className="mt-8 pt-4 border-t-2 border-black/20">
        <button
          type="button"
          onClick={() => onSelectTier(tier)}
          className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-white hover:text-black font-black text-sm uppercase py-3 px-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer font-btn group"
        >
          <span>ORDER THIS TIER</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
