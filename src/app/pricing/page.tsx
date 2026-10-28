import React from "react";
import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CommissionPricing } from "@/components/sections/CommissionPricing";

export const metadata: Metadata = {
  title: "Pricing & Live Queue // EMILIA - 2D Cel-Shaded Commissions",
  description: "Check live queue slot availability, commission pricing tiers, and generate instant briefs with our interactive cost calculator.",
};

export default function PricingPage() {
  const data = getPortfolioData();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-comic-yellow selection:text-black">
      {/* Sticky Comic Navbar */}
      <Navbar profile={data.profile} queueData={data.queue} />

      {/* Main Pricing & Queue Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CommissionPricing
          tiers={data.commissionTiers}
          calculatorData={data.calculator}
          queueData={data.queue}
          discordTag={data.profile.discordTag}
        />
      </main>

      {/* Comic Footer */}
      <Footer profile={data.profile} />
    </div>
  );
}