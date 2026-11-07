"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TermsOfServiceData } from "@/types/portfolio";
import { Scale, CreditCard, ShieldAlert } from "lucide-react";

export interface TermsOfServiceProps {
  tosData?: TermsOfServiceData;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ tosData }) => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Map 0 to 1 scroll progress to translate cards from 0% to -65%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  if (!tosData) return null;

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-[#FAF7F2]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-6 md:px-16">
        {/* Section Header */}
        <div className="mb-6 md:mb-8 max-w-5xl mx-auto w-full text-center select-none">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest bg-[#FFE600] border-2 border-black px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#000] inline-block">
            BINDING CLIENT-ARTIST AGREEMENT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-comic uppercase tracking-tight mt-3 text-black">
            TERMS OF SERVICE // CODEX
          </h2>
          <p className="mt-1 text-xs font-mono uppercase tracking-widest text-neutral-600">
            SCROLL TO EXPLORE BINDING OPERATIONAL CLAUSES →
          </p>
        </div>

        {/* Animated Track (overflow clipped only on this inner row) */}
        <div className="w-full flex items-center">
          <motion.div
            style={{ x }}
            className="flex gap-6 md:gap-8 items-center pl-[5vw] pr-[15vw] will-change-transform"
          >
            {/* Card 1: Legal Codex */}
            <div className="w-[85vw] max-w-[560px] shrink-0 bg-[#FFFDF9] border-[3px] border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000] rotate-[-1deg] select-none">
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-black/15">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE600] text-black border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                  <Scale className="w-4 h-4" />
                  ⚖ RULES OF ENGAGEMENT
                </span>
                <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest">
                  01 // 03
                </span>
              </div>

              <h3 className="font-comic text-2xl md:text-3xl uppercase text-black tracking-wide mb-4">
                GENERAL TERMS &amp; USAGE
              </h3>

              <ul className="space-y-3.5 text-neutral-900 font-sans text-xs sm:text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    01
                  </span>
                  <p>
                    <strong>Personal Use License:</strong> Standard commissions are licensed strictly for non-profit personal display (social avatars, banners, wallpapers, personal prints).
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    02
                  </span>
                  <p>
                    <strong>Official Verified Channels:</strong> All project communication and WIP approvals occur strictly via official Discord DM or verified email.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    03
                  </span>
                  <p>
                    <strong>Artist Moral Rights:</strong> The artist retains authorship and moral rights to showcase watermarked artwork and timelapses in public portfolios.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    04
                  </span>
                  <p>
                    <strong>Lossless Master Deliverables:</strong> Full-resolution 300 DPI lossless master archives (PNG + transparent variants) delivered upon completion.
                  </p>
                </li>
              </ul>
            </div>

            {/* Card 2: Payment Protocol */}
            <div className="w-[85vw] max-w-[560px] shrink-0 bg-[#F0FDF4] border-[3px] border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000] rotate-[1.5deg] select-none">
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-black/15">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4ADE80] text-black border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                  <CreditCard className="w-4 h-4" />
                  💳 PAYPAL EXCLUSIVE // BILLING
                </span>
                <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest">
                  02 // 03
                </span>
              </div>

              <h3 className="font-comic text-2xl md:text-3xl uppercase text-black tracking-wide mb-4">
                PAYMENT &amp; INVOICING PROTOCOL
              </h3>

              <ul className="space-y-3.5 text-neutral-900 font-sans text-xs sm:text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    01
                  </span>
                  <p>
                    <strong>50% Upfront Deposit:</strong> Projects exceeding $100 USD require a 50% non-refundable deposit to lock in your live queue slot. Orders under $100 USD are paid 100% upfront.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    02
                  </span>
                  <p>
                    <strong>Milestone Delivery:</strong> Remaining 50% balance is invoiced after final render approval; high-resolution unwatermarked files release immediately upon cleared invoice.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    03
                  </span>
                  <p>
                    <strong>Anti-Chargeback Rule:</strong> Unauthorized disputes or fraudulent reversals result in immediate permanent queue blacklisting, license revocation, and DMCA claims.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    04
                  </span>
                  <p>
                    <strong>Currency Standard:</strong> Invoicing processed exclusively in USD ($) via PayPal Goods &amp; Services with full client purchase protection.
                  </p>
                </li>
              </ul>
            </div>

            {/* Card 3: Anti-AI & Client Adherence */}
            <div className="w-[85vw] max-w-[560px] shrink-0 bg-[#FEF08A] border-[3px] border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000] rotate-[-1deg] select-none">
              <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-black/15">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#FFE600] border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                  <ShieldAlert className="w-4 h-4 text-[#FFE600]" />
                  🛡 ANTI-AI &amp; CLIENT CODE
                </span>
                <span className="font-mono text-xs font-black text-neutral-600 uppercase tracking-widest">
                  03 // 03
                </span>
              </div>

              <h3 className="font-comic text-2xl md:text-3xl uppercase text-black tracking-wide mb-4">
                ETHICS &amp; REVISION PROTOCOL
              </h3>

              <ul className="space-y-3.5 text-neutral-900 font-sans text-xs sm:text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    01
                  </span>
                  <p>
                    <strong>Strict Anti-AI Training Clause:</strong> Absolute zero tolerance for scraping, feeding, or training artwork into generative models, LoRAs, or crypto/NFT minting.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    02
                  </span>
                  <p>
                    <strong>2x Revision Cycle:</strong> 2 free iterative revisions included during the rough sketch &amp; inking stages. Post-render structural overhauls incur milestone surcharges.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    03
                  </span>
                  <p>
                    <strong>Commercial Licensing:</strong> Merchandise, stream assets, book wraps, and commercial marketing require contract addon endorsement (+100% standard rate).
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    04
                  </span>
                  <p>
                    <strong>Response Window:</strong> Clients must review milestone WIPs within 48–72h to maintain queue position and planned completion dates.
                  </p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
