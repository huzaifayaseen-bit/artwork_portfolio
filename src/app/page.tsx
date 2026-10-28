"use client";

import React from "react";
import Link from "next/link";
import { getPortfolioData } from "@/lib/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ArtGallery } from "@/components/sections/ArtGallery";
import { QueueTracker } from "@/components/pricing/QueueTracker";
import { PricingTierCard } from "@/components/commissions/PricingTierCard";
import { CommissionCalculator } from "@/components/pricing/CommissionCalculator";
import { ClientReviews } from "@/components/sections/ClientReviews";
import { TermsOfService } from "@/components/sections/TermsOfService";
import { ContactSection } from "@/components/sections/ContactSection";
import { CommissionBriefBuilder } from "@/components/contact/CommissionBriefBuilder";
import { Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export default function Home() {
  const data = getPortfolioData();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-comic-yellow selection:text-black">
      {/* Sticky Comic Navbar */}
      <Navbar profile={data.profile} queueData={data.queue} />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Hero Section (Identity & 2.5D Featured Art) */}
        <HeroSection profile={data.profile} />

        {/* Comic Section Divider */}
        <div className="h-[4px] bg-black my-4 shadow-neo-sm" />

        {/* 2. Featured Artworks Grid / Gallery Section (Visible on Mobile Unified Scroll) */}
        <section id="artworks-section" className="md:hidden py-8 scroll-mt-20">
          <ArtGallery artworks={data.artworks} />
          <div className="h-[4px] bg-black my-8 shadow-neo-sm" />
        </section>

        {/* 3. Live Queue Board & Commission Pricing Cards (Mobile Unified Scroll) */}
        <section id="pricing-section" className="md:hidden py-8 scroll-mt-20">
          {/* Live Commission Queue Board */}
          <QueueTracker queueData={data.queue} />

          {/* Pricing Header */}
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 bg-comic-pink text-white border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-4 h-4 fill-white" />
              AVAILABLE TIERS
            </div>
            <h2 className="font-comic text-5xl sm:text-6xl uppercase text-black tracking-wide leading-none">
              COMMISSION PRICING &amp; SERVICES
            </h2>
            <p className="mt-3 text-sm text-neutral-700 font-sans">
              Standardized rates for personal &amp; commercial cel-shaded art commissions. All tiers include full-resolution master files and milestone progress updates.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 gap-8 items-stretch pt-2">
            {data.commissionTiers.map((tier) => (
              <PricingTierCard
                key={tier.id}
                tier={tier}
                onSelectTier={() => {
                  const el = document.getElementById("contact-section");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/contact";
                  }
                }}
              />
            ))}
          </div>

          <div className="h-[4px] bg-black my-8 shadow-neo-sm" />
        </section>

        {/* 4. Interactive Commission Cost Calculator (Mobile Unified Scroll) */}
        <section id="calculator-section" className="md:hidden py-4 scroll-mt-20">
          <CommissionCalculator
            calculatorData={data.calculator}
            discordTag={data.profile.discordTag}
          />
          <div className="h-[4px] bg-black my-8 shadow-neo-sm" />
        </section>

        {/* 5. Client Reviews / Verified Social Proof (Desktop & Mobile) */}
        <section id="reviews-section" className="scroll-mt-20">
          <ClientReviews reviewsData={data.reviews} />
        </section>

        {/* 6. Commission Terms of Service (TOS) Summary (Mobile Unified Scroll) */}
        <section id="tos-section" className="md:hidden py-8 scroll-mt-20">
          <div className="h-[4px] bg-black mb-8 shadow-neo-sm" />
          <TermsOfService tosData={data.termsOfService} />
        </section>

        {/* 7. Contact & Commission Brief Builder (Mobile Unified Scroll) */}
        <section id="contact-section" className="md:hidden py-8 scroll-mt-20 space-y-6">
          <div className="h-[4px] bg-black mb-8 shadow-neo-sm" />
          <ContactSection profile={data.profile} />
          <CommissionBriefBuilder
            discordTag={data.profile.discordTag}
            email={data.profile.email}
          />
        </section>
      </main>

      {/* Comic Footer */}
      <Footer profile={data.profile} />
    </div>
  );
}