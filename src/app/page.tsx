"use client";

import React from "react";
import { getPortfolioData } from "@/lib/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { PricingTierCard } from "@/components/commissions/PricingTierCard";
import { CommissionCalculator } from "@/components/pricing/CommissionCalculator";
import { ClientReviews } from "@/components/sections/ClientReviews";
import { TermsOfService } from "@/components/sections/TermsOfService";
import { ContactSection } from "@/components/sections/ContactSection";
import { CommissionBriefBuilder } from "@/components/contact/CommissionBriefBuilder";
import { FloatingCommissionCTA } from "@/components/ui/FloatingCommissionCTA";
import { Sparkles, HelpCircle } from "lucide-react";

export default function Home() {
  const data = getPortfolioData();
  const [calculatorScopeId, setCalculatorScopeId] = React.useState<string>("scope-headshot");
  const [briefCategory, setBriefCategory] = React.useState<string>("Character Design");
  const [briefScope, setBriefScope] = React.useState<string>("Headshot / Bust");

  const handleCalculatorScopeChange = (scopeId: string) => {
    setCalculatorScopeId(scopeId);
    if (scopeId === "scope-headshot") {
      setBriefScope("Headshot / Bust");
      setBriefCategory("Character Design");
    } else if (scopeId === "scope-halfbody") {
      setBriefScope("Half Body");
      setBriefCategory("Character Design");
    } else if (scopeId === "scope-fullbody") {
      setBriefScope("Full Character / Splash");
      setBriefCategory("Character Design");
    }
  };

  const handleTierSelect = (tierId: string) => {
    if (tierId === "tier-bust") {
      handleCalculatorScopeChange("scope-headshot");
    } else if (tierId === "tier-half") {
      handleCalculatorScopeChange("scope-halfbody");
    } else if (tierId === "tier-full") {
      handleCalculatorScopeChange("scope-fullbody");
    }
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectTier = () => {
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-comic-yellow selection:text-black">
      {/* Sticky Comic Navbar */}
      <Navbar profile={data.profile} queueData={data.queue} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Hero Section */}
        <HeroSection profile={data.profile} />

        {/* 2. Curated Artworks Gallery Section (Directly under Hero) */}
        <section id="artworks-section" className="py-16 md:py-24 scroll-mt-20 border-t-4 border-black">
          <ArtGallery artworks={data.artworks} limit={12} showViewAllLink={true} />
        </section>

        {/* 3. Commission Pricing Cards */}
        <section id="pricing-section" className="py-16 md:py-24 scroll-mt-20 border-t-4 border-black">
          {/* Pricing Header */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 bg-comic-pink text-white border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2 rounded-full shadow-[2px_2px_0px_#000]">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-2">
            {data.commissionTiers.map((tier) => (
              <PricingTierCard
                key={tier.id}
                tier={tier}
                onSelectTier={() => handleTierSelect(tier.id)}
              />
            ))}
          </div>

          {/* Custom Project Note */}
          <div className="mt-8 bg-white border-[3px] border-black rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-6 h-6 text-comic-purple flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-comic text-xl uppercase text-black tracking-wide">
                  HAVE A MULTI-CHARACTER, COMIC BOOK, OR COMMERCIAL PROJECT?
                </h4>
                <p className="text-xs text-neutral-600 mt-0.5 font-sans">
                  Multi-page sequences, character turnaround sheets, and commercial marketing receive custom bundled rates.
                </p>
              </div>
            </div>

            <button
              onClick={handleSelectTier}
              className="flex-shrink-0 font-btn text-xs font-bold uppercase tracking-wider bg-comic-yellow border-2 border-black rounded-xl px-4 py-2 hover:bg-[#FFF033] shadow-[3px_3px_0px_#000] inline-block cursor-pointer transition-all"
            >
              REQUEST CUSTOM QUOTE
            </button>
          </div>
        </section>

        {/* 4. Interactive Commission Cost Calculator */}
        <section id="calculator-section" className="py-16 md:py-24 scroll-mt-20 border-t-4 border-black">
          <CommissionCalculator
            calculatorData={data.calculator}
            discordTag={data.profile.discordTag}
            selectedScopeId={calculatorScopeId}
            onScopeChange={handleCalculatorScopeChange}
          />
        </section>

        {/* 5. Client Reviews / Verified Social Proof */}
        <section id="reviews-section" className="scroll-mt-20 py-16 md:py-24 border-t-4 border-black">
          <ClientReviews reviewsData={data.reviews} />
        </section>

        {/* 6. Commission Terms of Service (TOS) Summary */}
        <section id="tos-section" className="py-16 md:py-24 scroll-mt-20 border-t-4 border-black">
          <TermsOfService tosData={data.termsOfService} />
        </section>

        {/* 7. Contact & Commission Brief Builder */}
        <section id="contact-section" className="py-16 md:py-24 scroll-mt-20 space-y-8 border-t-4 border-black">
          <ContactSection profile={data.profile} />
          <CommissionBriefBuilder
            discordTag={data.profile.discordTag}
            email={data.profile.email}
            selectedCategory={briefCategory}
            onCategoryChange={setBriefCategory}
            selectedScope={briefScope}
            onScopeChange={setBriefScope}
          />
        </section>
      </main>

      {/* Floating Persistent Commission Action CTA */}
      <FloatingCommissionCTA statusText={data.profile.statusText} />

      {/* Comic Footer */}
      <Footer profile={data.profile} />
    </div>
  );
}
