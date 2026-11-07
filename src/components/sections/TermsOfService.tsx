"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TermsOfServiceData } from "@/types/portfolio";
import { Scale, CreditCard, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";

export interface TermsOfServiceProps {
  tosData?: TermsOfServiceData;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ tosData }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  if (!tosData) return null;

  return (
    <div className="w-full">
      {/* DESKTOP / TABLET: Sticky Horizontal Pinned Card Slider */}
      <div ref={containerRef} className="hidden md:block h-[250vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-[#FAF7F2]">
          {/* Top Pin Header */}
          <div className="text-center mb-8 px-4 select-none">
            <div className="inline-flex items-center gap-2 border-2 border-dashed border-black bg-white px-3.5 py-1 font-mono text-xs font-black uppercase tracking-wider mb-2.5 shadow-[2px_2px_0px_#000]">
              <Scale className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>LEGAL CODEX // OPERATIONAL PROTOCOL</span>
            </div>
            <h2 className="font-comic text-4xl lg:text-6xl uppercase text-black tracking-wide leading-none">
              TERMS OF SERVICE // OPERATIONAL CODEX
            </h2>
            <p className="mt-2 text-xs lg:text-sm font-mono uppercase tracking-widest text-neutral-600">
              BINDING CLIENT-ARTIST AGREEMENT • SCROLL TO EXPLORE PROTOCOLS →
            </p>
          </div>

          {/* Cards Track with Scroll-Driven Translation */}
          <div className="w-full overflow-hidden">
            <motion.div
              style={{ x: xTransform }}
              className="flex gap-8 items-center pl-[10vw] pr-[15vw] will-change-transform"
            >
              {/* Card 1: Legal Codex & Rights */}
              <div className="w-[85vw] max-w-[620px] shrink-0 bg-[#FFFDF9] border-[4px] border-black rounded-[2.5rem] p-8 md:p-10 shadow-[8px_8px_0px_#000] rotate-[-1deg] select-none">
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black/15">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE600] text-black border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                    <Scale className="w-4 h-4" />
                    ⚖ RULES OF ENGAGEMENT
                  </span>
                  <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest">
                    CARD 01 // 03
                  </span>
                </div>

                <h3 className="font-comic text-2xl lg:text-3xl uppercase text-black tracking-wide mb-4">
                  GENERAL TERMS &amp; USAGE RIGHTS
                </h3>

                <ul className="space-y-4 text-neutral-900 font-sans text-xs lg:text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      01
                    </span>
                    <p>
                      <strong>Personal Use License:</strong> Standard commissions are licensed exclusively for non-profit personal display (social avatars, banners, wallpapers, personal prints).
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      02
                    </span>
                    <p>
                      <strong>Official Verified Channels:</strong> All project communication, brief validations, and WIP approvals occur strictly via official Discord DM or verified email.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      03
                    </span>
                    <p>
                      <strong>Artist Moral Rights:</strong> The artist retains authorship and rights to display watermarked artwork, timelapses, and process files in portfolios and artbooks.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      04
                    </span>
                    <p>
                      <strong>Lossless Master Files:</strong> Full-resolution 300 DPI lossless master archives (PNG + transparent variants) delivered promptly upon project completion.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Card 2: Payment & Invoicing Protocol */}
              <div className="w-[85vw] max-w-[620px] shrink-0 bg-[#F0FDF4] border-[4px] border-black rounded-[2.5rem] p-8 md:p-10 shadow-[8px_8px_0px_#000] rotate-[1.5deg] select-none">
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black/15">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#4ADE80] text-black border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                    <CreditCard className="w-4 h-4" />
                    💳 PAYPAL EXCLUSIVE // BILLING
                  </span>
                  <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest">
                    CARD 02 // 03
                  </span>
                </div>

                <h3 className="font-comic text-2xl lg:text-3xl uppercase text-black tracking-wide mb-4">
                  PAYMENT &amp; INVOICING PROTOCOL
                </h3>

                <ul className="space-y-4 text-neutral-900 font-sans text-xs lg:text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      01
                    </span>
                    <p>
                      <strong>50% Upfront Deposit:</strong> Projects exceeding $100 USD require a 50% non-refundable deposit to lock in your live queue slot. Orders under $100 USD are paid 100% upfront.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      02
                    </span>
                    <p>
                      <strong>Milestone Delivery:</strong> Remaining 50% balance is invoiced after final render sign-off; high-resolution unwatermarked files release immediately upon cleared invoice.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      03
                    </span>
                    <p>
                      <strong>Anti-Chargeback Rule:</strong> Unauthorized disputes or fraudulent reversals result in immediate permanent queue blacklisting, license revocation, and DMCA claims.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      04
                    </span>
                    <p>
                      <strong>Currency Standard:</strong> Invoicing processed exclusively in USD ($) via PayPal Goods &amp; Services with full client purchase protection.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Card 3: Anti-AI & Client Code */}
              <div className="w-[85vw] max-w-[620px] shrink-0 bg-[#FEF08A] border-[4px] border-black rounded-[2.5rem] p-8 md:p-10 shadow-[8px_8px_0px_#000] rotate-[-0.5deg] select-none">
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black/15">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#FFE600] border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                    <ShieldAlert className="w-4 h-4 text-[#FFE600]" />
                    🛡 ANTI-AI &amp; CLIENT CODE
                  </span>
                  <span className="font-mono text-xs font-black text-neutral-600 uppercase tracking-widest">
                    CARD 03 // 03
                  </span>
                </div>

                <h3 className="font-comic text-2xl lg:text-3xl uppercase text-black tracking-wide mb-4">
                  ETHICS &amp; REVISION PROTOCOL
                </h3>

                <ul className="space-y-4 text-neutral-900 font-sans text-xs lg:text-sm leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      01
                    </span>
                    <p>
                      <strong>Strict Anti-AI Training Clause:</strong> Absolute zero tolerance for scraping, feeding, or training artwork into generative models, LoRAs, or crypto/NFT minting.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      02
                    </span>
                    <p>
                      <strong>2x Revision Cycle:</strong> 2 free iterative revisions included during the rough sketch &amp; inking stages. Post-render structural overhauls incur milestone surcharges.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
                      03
                    </span>
                    <p>
                      <strong>Commercial Licensing:</strong> Merchandise, stream assets, book wraps, and commercial marketing require contract addon endorsement (+100% standard rate).
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000]">
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
      </div>

      {/* MOBILE FALLBACK: Native Horizontal Snap Carousel */}
      <div className="block md:hidden py-4">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 border-2 border-dashed border-black bg-white px-3 py-1 font-mono text-[10px] font-black uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
            <Scale className="w-3.5 h-3.5" />
            <span>OPERATIONAL CODEX</span>
          </div>
          <h2 className="font-comic text-4xl uppercase text-black tracking-wide leading-none">
            TERMS OF SERVICE
          </h2>
          <p className="mt-1.5 text-xs font-mono uppercase tracking-wider text-neutral-600">
            SWIPE HORIZONTALLY TO REVIEW CARDS →
          </p>
        </div>

        {/* Snap Track */}
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 px-1 pb-4 scrollbar-none">
          {/* Mobile Card 1 */}
          <div className="w-[88vw] shrink-0 snap-center bg-[#FFFDF9] border-[3px] border-black rounded-3xl p-6 shadow-[5px_5px_0px_#000]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FFE600] text-black border-2 border-dashed border-black font-black text-[10px] uppercase rounded-lg mb-3 shadow-[1.5px_1.5px_0px_#000]">
              ⚖ RULES OF ENGAGEMENT
            </span>
            <h3 className="font-comic text-xl uppercase text-black tracking-wide mb-3">
              GENERAL TERMS &amp; USAGE
            </h3>
            <ul className="space-y-3 text-neutral-900 font-sans text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  01
                </span>
                <p><strong>Personal Use License:</strong> Standard commissions are licensed strictly for non-profit personal display.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  02
                </span>
                <p><strong>Communication:</strong> Project brief updates conducted exclusively via Discord DM or verified email.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  03
                </span>
                <p><strong>Lossless Masters:</strong> 300 DPI master files delivered immediately upon project sign-off.</p>
              </li>
            </ul>
          </div>

          {/* Mobile Card 2 */}
          <div className="w-[88vw] shrink-0 snap-center bg-[#F0FDF4] border-[3px] border-black rounded-3xl p-6 shadow-[5px_5px_0px_#000]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#4ADE80] text-black border-2 border-dashed border-black font-black text-[10px] uppercase rounded-lg mb-3 shadow-[1.5px_1.5px_0px_#000]">
              💳 PAYPAL EXCLUSIVE
            </span>
            <h3 className="font-comic text-xl uppercase text-black tracking-wide mb-3">
              BILLING &amp; DEPOSITS
            </h3>
            <ul className="space-y-3 text-neutral-900 font-sans text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  01
                </span>
                <p><strong>50% Upfront Deposit:</strong> Orders over $100 require a 50% non-refundable queue deposit.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  02
                </span>
                <p><strong>Balance on Completion:</strong> Remaining 50% cleared before release of unwatermarked PSD/PNGs.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  03
                </span>
                <p><strong>No Chargebacks:</strong> Fraudulent disputes trigger blacklisting and DMCA enforcement.</p>
              </li>
            </ul>
          </div>

          {/* Mobile Card 3 */}
          <div className="w-[88vw] shrink-0 snap-center bg-[#FEF08A] border-[3px] border-black rounded-3xl p-6 shadow-[5px_5px_0px_#000]">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black text-[#FFE600] border-2 border-dashed border-black font-black text-[10px] uppercase rounded-lg mb-3 shadow-[1.5px_1.5px_0px_#000]">
              🛡 ANTI-AI &amp; ETHICS
            </span>
            <h3 className="font-comic text-xl uppercase text-black tracking-wide mb-3">
              REVISIONS &amp; CODE
            </h3>
            <ul className="space-y-3 text-neutral-900 font-sans text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  01
                </span>
                <p><strong>Strict Anti-AI Clause:</strong> No feeding, training, or ingestion into AI models or LoRAs.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  02
                </span>
                <p><strong>2x Revision Rounds:</strong> 2 free revision passes during sketch &amp; linework stages.</p>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-black text-white font-mono font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  03
                </span>
                <p><strong>Commercial Rights:</strong> Commercial buyout add-on available for streaming &amp; merchandise.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
