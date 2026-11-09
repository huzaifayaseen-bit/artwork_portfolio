import React from "react";
import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/portfolioData";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArtGallery } from "@/components/sections/ArtGallery";

export const metadata: Metadata = {
  title: "Art Gallery // EMILIA - Curated Cel-Shaded Artworks",
  description: "Explore 70+ curated 2D cel-shaded illustrations, sequential comic frames, book covers, and character designs.",
};

export default function GalleryPage() {
  const data = getPortfolioData();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-comic-yellow selection:text-black">
      {/* Sticky Comic Navbar */}
      <Navbar profile={data.profile} queueData={data.queue} />

      {/* Main Art Gallery Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-8">
        <ArtGallery artworks={data.artworks} />
      </main>

      {/* Comic Footer */}
      <Footer profile={data.profile} />
    </div>
  );
}
