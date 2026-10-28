"use client";

import React from "react";
import { CommissionTier, CalculatorData, QueueData } from "@/types/portfolio";
import { PricingTierCard } from "@/components/commissions/PricingTierCard";
import { CommissionCalculator } from "@/components/pricing/CommissionCalculator";
import { QueueTracker } from "@/components/pricing/QueueTracker";
import { Sparkles, HelpCircle } from "lucide-react";

export interface CommissionPricingProps {
  tiers: CommissionTier[];
  calculatorData?: CalculatorData;
  queueData?: QueueData;
  discordTag?: string;
}

export const CommissionPricing: React.FC<CommissionPricingProps> = ({
  tiers,
  calculatorData,
  queueData,
  discordTag,
}) => {
  const handleSelectTier = (tier: CommissionTier) => {
    window.location.href = "/contact";
  };

  return (
    <section id="commissions" className="py-12 sm:py-16">
      {/* Live Commission Queue Board */}
      <QueueTracker queueData={queueData} />

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 bg-comic-pink text-white border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
          <Sparkles className="w-4 h-4 fill-white" />
          AVAILABLE TIERS
        </div>
        <h2 className="font-comic text-5xl sm:text-7xl uppercase text-black tracking-wide leading-none">
          COMMISSION PRICING &amp; SERVICES
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-700 font-sans">
          Standardized rates for personal &amp; commercial cel-shaded art commissions. All tiers include full-resolution master files and milestone progress updates.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
        {tiers.map((tier) => (
          <PricingTierCard
            key={tier.id}
            tier={tier}
            onSelectTier={handleSelectTier}
          />
        ))}
      </div>

      {/* Interactive Commission Calculator Widget */}
      <CommissionCalculator
        calculatorData={calculatorData}
        discordTag={discordTag}
      />

      {/* Terms & Workflow Mini Note */}
      <div className="mt-10 bg-white border-[3px] border-black p-5 sm:p-6 shadow-neo-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <HelpCircle className="w-6 h-6 text-comic-purple flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-comic text-xl uppercase text-black tracking-wide">
              HAVE A CUSTOM PROJECT OR COMIC BOOK SEQUENCE?
            </h4>
            <p className="text-xs text-neutral-600 mt-0.5 font-sans">
              Multi-page comic anthologies, character design sheets, and commercial marketing campaigns receive custom bundled rates.
            </p>
          </div>
        </div>

        <a href="/contact" className="flex-shrink-0">
          <span className="font-btn text-xs font-bold uppercase tracking-wider bg-comic-yellow border-2 border-black px-4 py-2 hover:bg-[#FFF033] shadow-neo-sm inline-block">
            REQUEST CUSTOM QUOTE
          </span>
        </a>
      </div>
    </section>
  );
};
