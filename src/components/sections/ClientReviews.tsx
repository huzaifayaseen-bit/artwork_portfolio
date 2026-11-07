"use client";

import React from "react";
import Link from "next/link";
import { ReviewsData } from "@/types/portfolio";
import { Star, MessageSquareQuote, CheckCircle2, ArrowRight } from "lucide-react";

export interface ClientReviewsProps {
  reviewsData?: ReviewsData;
}

const PASTEL_THEMES = [
  {
    bg: "bg-[#FFE4E6]", // Soft Coral / Peach
    tagBg: "bg-[#FF2A6D]",
    tagText: "text-white",
    avatarBg: "bg-white text-black",
  },
  {
    bg: "bg-[#E0F2FE]", // Sky Blue / Mint
    tagBg: "bg-[#0284C7]",
    tagText: "text-white",
    avatarBg: "bg-white text-black",
  },
  {
    bg: "bg-[#EDE9FE]", // Soft Lilac / Purple
    tagBg: "bg-[#7C3AED]",
    tagText: "text-white",
    avatarBg: "bg-white text-black",
  },
  {
    bg: "bg-[#FEF08A]", // Pastel Butter Yellow
    tagBg: "bg-[#EAB308]",
    tagText: "text-black",
    avatarBg: "bg-white text-black",
  },
];

const getInitials = (name: string) => {
  const clean = name.replace(/^[@/]+/, "").trim();
  const parts = clean.split(/[\s/_-]+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase() || "CL";
};

export const ClientReviews: React.FC<ClientReviewsProps> = ({ reviewsData }) => {
  if (!reviewsData || !reviewsData.items || reviewsData.items.length === 0) return null;

  return (
    <section className="py-2 sm:py-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-comic-yellow text-black border-2 border-black px-3 py-0.5 font-nav text-xs font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
            <CheckCircle2 className="w-3.5 h-3.5 fill-black text-comic-yellow" />
            <span>{reviewsData.ratingBadge}</span>
          </div>
          <h2 className="font-comic text-4xl sm:text-6xl uppercase text-black tracking-wide leading-none">
            {reviewsData.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 font-sans max-w-2xl">
            {reviewsData.subtitle}
          </p>
        </div>

        <Link
          href="/pricing"
          className="self-start md:self-end inline-flex items-center gap-2 font-btn text-xs font-bold uppercase tracking-wider bg-black hover:bg-neutral-800 text-white border-2 border-black px-4 py-2 shadow-neo-sm hover:shadow-neo transition-all"
        >
          <span>VIEW COMMISSION RATES</span>
          <ArrowRight className="w-4 h-4 text-comic-yellow" />
        </Link>
      </div>

      {/* Infinite Auto-Scrolling Comic Marquee Strip */}
      <div className="relative w-full overflow-hidden py-4 px-2 sm:px-4 group">
        {/* Subtle Left & Right Comic Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none bg-gradient-to-r from-[#FEF9C3] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none bg-gradient-to-l from-[#FEF9C3] to-transparent" />

        {/* Seamless Scrolling Track (Duplicated items for flawless loop) */}
        <div className="animate-marquee group-hover:[animation-play-state:paused] flex gap-6 sm:gap-8 items-stretch will-change-transform pr-6">
          {[...reviewsData.items, ...reviewsData.items].map((review, index) => {
            const theme = PASTEL_THEMES[index % PASTEL_THEMES.length];
            const initials = getInitials(review.clientName);

            return (
              <div
                key={`${review.id}-${index}`}
                className={`
                  w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0 flex flex-col justify-between min-h-[220px]
                  ${theme.bg} border-[3px] border-black rounded-2xl p-6 shadow-[5px_5px_0px_#000]
                  transition-transform duration-150 hover:-translate-y-1
                  select-none
                `}
              >
                {/* Top Comic Bubble Glyph & Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 border-b-2 border-black/15 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 bg-white text-black border-2 border-black rounded-lg flex items-center justify-center shadow-[1px_1px_0px_#000]">
                        <MessageSquareQuote className="w-4 h-4" />
                      </span>
                      <span
                        className={`${theme.tagBg} ${theme.tagText} border-2 border-black font-black text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md shadow-[1.5px_1.5px_0px_#000]`}
                      >
                        {review.projectTag}
                      </span>
                    </div>

                    {/* 5 Solid Stars */}
                    <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-4 h-4 fill-[#FACC15] text-[#FACC15] text-base drop-shadow-[1px_1px_0px_#000]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Dialogue Quote Bubble */}
                  <div className="relative font-sans text-zinc-900 font-semibold text-sm leading-relaxed pr-2">
                    “{review.quote}”
                  </div>
                </div>

                {/* Bottom Author Row with Avatar */}
                <div className="mt-6 pt-4 border-t-2 border-dashed border-black/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border-2 border-black bg-white flex items-center justify-center font-black text-xs text-black shadow-[1.5px_1.5px_0px_#000] flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <span className="font-black text-xs text-black block tracking-tight">
                        {review.clientName}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-700 block tracking-tight">
                        {review.clientRole}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-neutral-600 font-bold uppercase ml-2 flex-shrink-0">
                    {review.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
