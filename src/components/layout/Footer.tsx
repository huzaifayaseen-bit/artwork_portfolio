import React from "react";
import Link from "next/link";
import { ArtistProfile } from "@/types/portfolio";

export interface FooterProps {
  profile: ArtistProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  return (
    <footer className="mt-16 border-t-[4px] border-black bg-neutral-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-comic-yellow text-black border-2 border-black px-2.5 py-0.5 font-comic text-sm">
            2D CEL ART
          </span>
          <span className="font-nav text-xs font-semibold uppercase tracking-wider text-neutral-300">
            © {new Date().getFullYear()} {profile.name}. ALL RIGHTS RESERVED.
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-nav text-neutral-400 uppercase tracking-wider">
          <Link href="/artworks" className="hover:text-comic-yellow transition-colors">
            Artworks
          </Link>
          <span>•</span>
          <Link href="/pricing" className="hover:text-comic-yellow transition-colors">
            Pricing
          </Link>
          <span>•</span>
          <Link href="/tos" className="hover:text-comic-yellow transition-colors">
            TOS
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-comic-yellow transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};