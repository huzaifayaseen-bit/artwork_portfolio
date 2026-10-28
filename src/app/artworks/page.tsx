import React from "react";
import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtGallery } from "@/components/sections/ArtGallery";

export const metadata: Metadata = {
  title: "Artworks Gallery // EMILIA - 2D Cel-Shaded Portfolio",
  description: "Browse 70+ cel-shaded character art, comic panels, manga pages, emotes, and book cover illustrations.",
};

export default function ArtworksPage() {
  const data = getPortfolioData();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-comic-yellow selection:text-black">
      {/* Sticky Comic Navbar */}
      <Navbar profile={data.profile} queueData={data.queue} />

      {/* Main Art Gallery Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ArtGallery artworks={data.artworks} />
      </main>

      {/* Comic Footer */}
      <Footer profile={data.profile} />
    </div>
  );
}