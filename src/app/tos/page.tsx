import React from "react";
import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TermsOfService } from "@/components/sections/TermsOfService";

export const metadata: Metadata = {
  title: "Terms of Service & Legal Codex // EMILIA - 2D Art Commissions",
  description: "Review Emilia's terms of service, PayPal billing policies, revision allowances, and strict anti-AI protections.",
};

export default function TosPage() {
  const data = getPortfolioData();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-comic-yellow selection:text-black">
      {/* Sticky Comic Navbar */}
      <Navbar profile={data.profile} queueData={data.queue} />

      {/* Main TOS Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TermsOfService tosData={data.termsOfService} />
      </main>

      {/* Comic Footer */}
      <Footer profile={data.profile} />
    </div>
  );
}