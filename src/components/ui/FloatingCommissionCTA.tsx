"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export interface FloatingCommissionCTAProps {
  statusText?: string;
}

export const FloatingCommissionCTA: React.FC<FloatingCommissionCTAProps> = ({
  statusText = "COMMISSIONS OPEN",
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 320px
      if (window.scrollY > 320) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <aside
      aria-label="Commission quick action"
      className="fixed bottom-5 right-5 z-40 animate-comic-snap select-none"
    >
      <Link
        href="#contact-section"
        onClick={(e) => {
          const el = document.getElementById("contact-section");
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
          }
        }}
        className="
          flex items-center gap-2.5 bg-comic-yellow hover:bg-[#FFF033] text-black
          border-[3px] border-black px-4 py-2.5 shadow-neo-lg hover:-translate-x-[2px] hover:-translate-y-[2px]
          transition-all cursor-pointer font-btn text-xs sm:text-sm font-bold uppercase tracking-wider
        "
      >
        <span className="w-2.5 h-2.5 rounded-none bg-comic-green border border-black animate-pulse flex-shrink-0" />
        <span className="hidden sm:inline font-comic text-base tracking-wide leading-none">
          {statusText}
        </span>
        <span className="inline sm:hidden font-comic text-base tracking-wide leading-none">
          COMMISSION ME
        </span>
        <div className="bg-black text-white p-1 border border-black flex items-center justify-center">
          <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      </Link>
    </aside>
  );
};
