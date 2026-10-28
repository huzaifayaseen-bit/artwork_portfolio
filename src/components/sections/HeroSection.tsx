import React from "react";
import Link from "next/link";
import { ArtistProfile } from "@/types/portfolio";
import { ComicButton } from "@/components/ui/ComicButton";
import { HeroComicCard } from "@/components/sections/HeroComicCard";
import { Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export interface HeroSectionProps {
  profile: ArtistProfile;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile }) => {
  return (
    <section id="hero-section" className="pt-10 sm:pt-14 md:pt-16 pb-14 sm:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Bold Headline & Action Triggers */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status Badge */}
          <div className="animate-comic-snap inline-flex items-center gap-2 bg-comic-green text-black border-[3px] border-black px-3.5 py-1 font-nav text-xs sm:text-sm font-bold uppercase tracking-wider shadow-neo-sm mb-4">
            <span className="w-2.5 h-2.5 rounded-none bg-black animate-pulse" />
            <span>{profile.statusText}</span>
          </div>

          {/* Punchy Title */}
          <h1 className="animate-comic-snap animation-delay-80 font-comic text-6xl sm:text-8xl xl:text-9xl uppercase tracking-wide text-black leading-[0.9] mb-4">
            EMILIA // <br className="hidden sm:inline" />
            <span className="text-stroke-comic">2D CEL-SHADED ARTIST</span>
          </h1>

          {/* Tagline / Subtitle */}
          <div className="animate-comic-snap animation-delay-160 bg-comic-yellow border-[3px] border-black p-3.5 sm:p-4 shadow-neo-sm mb-6 max-w-xl">
            <p className="font-nav text-sm sm:text-base font-semibold uppercase text-black tracking-wide leading-snug">
              BOLD CHARACTERS. VIBRANT COLORS. CLEAN CEL-SHADING.
            </p>
          </div>

          <p className="animate-comic-snap animation-delay-240 text-sm sm:text-base text-neutral-800 font-sans leading-relaxed max-w-xl mb-8">
            I create expressive 2D cel-shaded character illustrations, fan art, and original character designs.
          </p>

          {/* Call to Actions */}
          <div className="animate-comic-snap animation-delay-240 flex flex-wrap items-center gap-4">
            <Link href="/artworks">
              <ComicButton variant="primary" size="lg" icon={<Zap className="w-5 h-5 fill-black" />}>
                VIEW ARTWORK
              </ComicButton>
            </Link>
            <Link href="/pricing">
              <ComicButton variant="accent" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                VIEW COMMISSIONS
              </ComicButton>
            </Link>
          </div>

          {/* Micro Value Highlights */}
          <div className="mt-8 flex flex-wrap gap-4 text-xs font-nav font-semibold text-neutral-700 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-comic-pink stroke-[2.5]" />
              300 DPI PRINT MASTER ASSETS
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-comic-cyan stroke-[2.5]" />
              VECTOR INKS &amp; PSD SOURCE FILES
            </span>
          </div>
        </div>

        {/* Right Column: Featured Character Showcase Panel with 2.5D Parallax */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full flex justify-center animate-comic-pop animation-delay-160">
            <HeroComicCard
              imageSrc={profile.heroCharacterImage}
              characterTitle="CYBER RONIN // REKKA"
              badgeTag="ISSUE #01"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
