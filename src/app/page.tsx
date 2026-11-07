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
import { ToolsOfTheTrade } from "@/components/sections/ToolsOfTheTrade";
import { ContactSection } from "@/components/sections/ContactSection";
import { CommissionBriefBuilder } from "@/components/contact/CommissionBriefBuilder";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { Sparkles, HelpCircle } from "lucide-react";

export default function Home() {
  const data = getPortfolioData();
  const [calculatorScopeId, setCalculatorScopeId] = React.useState<string>("scope-headshot");
  const [briefCategory, setBriefCategory] = React.useState<string>("CHARACTER DESIGN");
  const [briefScope, setBriefScope] = React.useState<string>("Headshot / Bust ($40)");

  const handleCalculatorScopeChange = (scopeId: string) => {
    setCalculatorScopeId(scopeId);
    if (scopeId === "scope-headshot") {
      setBriefScope("Headshot / Bust ($40)");
      setBriefCategory("CHARACTER DESIGN");
    } else if (scopeId === "scope-halfbody") {
      setBriefScope("Half Body ($80)");
      setBriefCategory("CHARACTER DESIGN");
    } else if (scopeId === "scope-fullbody") {
      setBriefScope("Full Character ($120)");
      setBriefCategory("CHARACTER DESIGN");
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
    const el = document.getElementById("contact") || document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectTier = () => {
    const el = document.getElementById("contact") || document.getElementById("contact-section");
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

      {/* Main Full-Bleed Page Container */}
      <main className="flex-1 w-full">
        {/* Section 1: Hero (Electric Orange) */}
        <HeroSection profile={data.profile} />

        {/* Section 2: Curated Artworks / Gallery (Clean Off-White) */}
        <section
          id="gallery"
          className="w-full bg-[#FAF8F5] border-b-[3px] border-black py-14 md:py-18 px-6 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <ArtGallery artworks={data.artworks} limit={12} showViewAllLink={true} />
          </div>
        </section>

        {/* Section 3: Tools of the Trade / Studio Pipeline (Transitional Shelf - Compact py-10) */}
        <section
          id="tools"
          className="w-full border-b-[3px] border-black bg-[#FFFDF7] py-10 px-6 scroll-mt-20"
        >
          <ToolsOfTheTrade />
        </section>

        {/* Section 4: Client Transmissions / Reviews (Soft Neo-Yellow / Butter) */}
        <section
          id="reviews"
          className="w-full bg-[#FEF9C3] border-b-[3px] border-black py-14 md:py-18 px-6 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <ClientReviews reviewsData={data.reviews} />
          </div>
        </section>

        {/* Section 5: Commission Pricing & Services (Pure White Bento) */}
        <section
          id="pricing"
          className="w-full bg-[#FFFFFF] border-b-[3px] border-black py-14 md:py-18 px-6 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            {/* Pricing Header */}
            <div className="max-w-3xl mb-8 md:mb-12">
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
            <div className="mt-8 sm:mt-10 bg-white border-[3px] border-black rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
          </div>
        </section>

        {/* Section 6: Interactive Commission Calculator (Soft Neo-Brutalist Lavender) */}
        <section
          id="calculator"
          className="w-full bg-[#EDE9FE] border-b-[3px] border-black py-14 md:py-18 px-6 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <CommissionCalculator
              calculatorData={data.calculator}
              discordTag={data.profile.discordTag}
              selectedScopeId={calculatorScopeId}
              onScopeChange={handleCalculatorScopeChange}
            />
          </div>
        </section>

        {/* Section 7: Terms of Service // Codex (Soft Sage / Mint) */}
        <section
          id="tos"
          className="w-full bg-[#ECFDF5] border-b-[3px] border-black pt-14 md:pt-18 pb-32 px-6 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto">
            <TermsOfService tosData={data.termsOfService} />
          </div>
        </section>

        {/* Section 8: Start a Project / Commission Brief & Contact (Crisp Neo-Cyan) */}
        <section
          id="contact"
          className="w-full bg-[#E0F2FE] border-b-[3px] border-black py-14 md:py-18 px-6 scroll-mt-20"
        >
          <div className="max-w-6xl mx-auto space-y-12">
            <ContactSection profile={data.profile} />
            <CommissionBriefBuilder
              discordTag={data.profile.discordTag}
              email={data.profile.email}
              selectedCategory={briefCategory}
              onCategoryChange={setBriefCategory}
              selectedScope={briefScope}
              onScopeChange={setBriefScope}
            />
          </div>
        </section>
      </main>

      {/* Floating Scroll to Top Action */}
      <ScrollToTop />

      {/* Comic Footer */}
      <Footer profile={data.profile} />
    </div>
  );
}
