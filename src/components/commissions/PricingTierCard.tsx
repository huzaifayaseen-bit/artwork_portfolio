import React from "react";
import { CommissionTier } from "@/types/portfolio";
import { ComicButton } from "@/components/ui/ComicButton";
import { Check, Clock, ShieldCheck, Zap } from "lucide-react";

export interface PricingTierCardProps {
  tier: CommissionTier;
  onSelectTier: (tier: CommissionTier) => void;
}

export const PricingTierCard: React.FC<PricingTierCardProps> = ({
  tier,
  onSelectTier,
}) => {
  return (
    <div
      className={`
        relative flex flex-col justify-between
        bg-white border-[3px] border-black
        transition-all duration-75
        ${
          tier.popular
            ? "shadow-neo-lg -translate-y-2 border-black"
            : "shadow-neo hover:shadow-neo-lg hover:-translate-x-[2px] hover:-translate-y-[2px]"
        }
      `}
    >
      {/* Popular Tier Comic Banner */}
      {tier.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-comic-pink text-white border-2 border-black px-4 py-1 font-nav text-xs font-bold uppercase tracking-wider shadow-neo-sm">
            ★ MOST COMMISSIONED ★
          </span>
        </div>
      )}

      {/* Card Header */}
      <div className={`p-6 border-b-[3px] border-black ${tier.popular ? "bg-comic-yellow/30" : "bg-neutral-50"}`}>
        <h3 className="font-comic text-3xl sm:text-4xl uppercase text-black tracking-wide">
          {tier.name}
        </h3>
        <p className="text-sm text-neutral-600 font-sans mt-1">
          {tier.subtitle}
        </p>

        {/* Price Tag */}
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="font-comic text-5xl sm:text-6xl text-black tracking-wide">
            ${tier.price}
          </span>
          <span className="font-nav text-xs font-bold text-neutral-600 uppercase tracking-wider">
            {tier.currency} BASE
          </span>
        </div>

        {/* Turnaround Badge */}
        <div className="mt-3 flex items-center gap-1.5 text-xs font-nav font-medium text-neutral-700">
          <Clock className="w-4 h-4 text-comic-pink" />
          <span>EST. TURNAROUND: {tier.turnaroundTime}</span>
        </div>
      </div>

      {/* Deliverables Checklist */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h5 className="font-nav text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
            INCLUDED DELIVERABLES:
          </h5>
          <ul className="space-y-2.5">
            {tier.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-800 font-sans">
                <div className="bg-comic-green border border-black p-0.5 mt-0.5 flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[3] text-black" />
                </div>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Commercial License Indicator & Action */}
        <div className="mt-6 pt-5 border-t-2 border-dashed border-neutral-300">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className={`w-4 h-4 ${tier.commercialUsage ? "text-comic-green" : "text-neutral-400"}`} />
            <span className="text-xs font-nav font-bold uppercase tracking-wide">
              {tier.commercialUsage ? "COMMERCIAL RIGHTS INCLUDED" : "PERSONAL USE LICENSE (COMMERCIAL +ADDON)"}
            </span>
          </div>

          <ComicButton
            onClick={() => onSelectTier(tier)}
            variant={tier.popular ? "accent" : "primary"}
            size="md"
            className="w-full"
            icon={<Zap className="w-4 h-4" />}
          >
            ORDER THIS TIER
          </ComicButton>
        </div>
      </div>
    </div>
  );
};
