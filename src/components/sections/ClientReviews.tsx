"use client";

import React from "react";
import Link from "next/link";
import { ReviewsData } from "@/types/portfolio";
import { Star, MessageSquareQuote, CheckCircle2, ArrowRight } from "lucide-react";

export interface ClientReviewsProps {
  reviewsData?: ReviewsData;
}

export const ClientReviews: React.FC<ClientReviewsProps> = ({ reviewsData }) => {
  if (!reviewsData || !reviewsData.items || reviewsData.items.length === 0) return null;

  return (
    <section className="py-8 sm:py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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
      <div className="relative w-full overflow-hidden py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 group">
        {/* Subtle Left & Right Comic Edge Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none bg-gradient-to-r from-[#FAFAFA] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 z-10 pointer-events-none bg-gradient-to-l from-[#FAFAFA] to-transparent" />

        {/* Seamless Scrolling Track (Duplicated items for flawless loop) */}
        <div className="animate-marquee group-hover:[animation-play-state:paused] flex gap-6 sm:gap-8 items-stretch will-change-transform">
          {[...reviewsData.items, ...reviewsData.items].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="
                w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0 flex flex-col justify-between
                bg-white border-[3px] border-black p-5 sm:p-6 shadow-neo
                transition-all duration-100 hover:-translate-x-[2px] hover:-translate-y-[2px]
                select-none
              "
            >
              {/* Top Comic Bubble Glyph & Tag */}
              <div>
                <div className="flex items-center justify-between gap-2 border-b-2 border-black/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 bg-comic-pink text-white border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000]">
                      <MessageSquareQuote className="w-4 h-4" />
                    </span>
                    <span className="font-nav text-[11px] font-bold uppercase tracking-wider bg-neutral-100 border border-black px-2 py-0.5">
                      [{review.projectTag}]
                    </span>
                  </div>

                  {/* 5 Solid Stars */}
                  <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 fill-comic-yellow text-black stroke-[1.5]"
                      />
                    ))}
                  </div>
                </div>

                {/* Dialogue Quote Bubble */}
                <div className="relative font-sans text-neutral-800 text-sm leading-relaxed italic pr-2">
                  “{review.quote}”
                </div>
              </div>

              {/* Client Signature Colophon */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-black/20 flex items-center justify-between">
                <div>
                  <h4 className="font-comic text-lg uppercase text-black tracking-wide leading-tight">
                    {review.clientName}
                  </h4>
                  <p className="text-[11px] font-nav font-semibold text-neutral-500 uppercase tracking-wider">
                    {review.clientRole}
                  </p>
                </div>

                <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};