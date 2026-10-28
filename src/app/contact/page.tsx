import React from "react";
import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { CommissionBriefBuilder } from "@/components/contact/CommissionBriefBuilder";

export const metadata: Metadata = {
  title: "Contact & Direct Inquiries // EMILIA - 2D Cel-Shaded Artist",
  description: "Connect directly with Emilia via Discord, verified email, or social channels for custom art commissions and projects.",
};

export default function ContactPage() {
  const data = getPortfolioData();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-comic-yellow selection:text-black">
      {/* Sticky Comic Navbar */}
      <Navbar profile={data.profile} queueData={data.queue} />

      {/* Main Contact Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Direct Outreach Cards */}
        <ContactSection profile={data.profile} />

        {/* Interactive Commission Brief Builder Widget */}
        <CommissionBriefBuilder
          discordTag={data.profile.discordTag}
          email={data.profile.email}
        />
      </main>

      {/* Comic Footer */}
      <Footer profile={data.profile} />
    </div>
  );
}