"use client";

import React from "react";
import { TermsOfServiceData } from "@/types/portfolio";
import { Scale, CreditCard, ShieldAlert } from "lucide-react";

export interface TermsOfServiceProps {
  tosData?: TermsOfServiceData;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ tosData }) => {
  if (!tosData) return null;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Left Column: Pinned Sticky Overview Header */}
      <div className="lg:col-span-5 lg:sticky lg:top-24 select-none">
        <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest bg-[#FFE600] border-2 border-black px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#000] inline-block mb-3">
          BINDING CLIENT-ARTIST AGREEMENT
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-comic uppercase tracking-tight text-black leading-none">
          TERMS OF SERVICE // CODEX
        </h2>
        <p className="mt-4 text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-700 leading-relaxed max-w-md">
          {tosData.subtitle ||
            "Please review the binding operational standards below before commissioning. Transparent deliverables, milestone approvals, and copyright clarity."}
        </p>
        <div className="mt-6 hidden lg:flex items-center gap-2 text-xs font-bold font-nav text-neutral-500 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#FF6B35] animate-ping" />
          <span>Scroll to inspect operational codex cards ↓</span>
        </div>
      </div>

      {/* Right Column: Henrietta-Style Native Sticky Card Stack */}
      <div className="lg:col-span-7 flex flex-col gap-10 relative pb-16">
        {/* Card 01: Legal Codex // Rules */}
        <div className="sticky top-20 md:top-24 z-10 bg-[#FFFDF9] border-[4px] border-black rounded-3xl p-5 md:p-6 shadow-[8px_8px_0px_#000] rotate-[-1deg] transition-transform select-none max-h-[78vh] overflow-y-auto">
          <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b-2 border-black/15">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFE600] text-black border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
              <Scale className="w-3.5 h-3.5" />
              ⚖ {tosData.generalTerms?.badge || "LEGAL CODEX // RULES"}
            </span>
            <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest">
              01 // 03
            </span>
          </div>

          <h3 className="font-comic text-xl md:text-2xl font-black uppercase text-black tracking-wide mb-3">
            {tosData.generalTerms?.title || "GENERAL TERMS & USAGE"}
          </h3>

          <ul className="space-y-2.5 md:space-y-3 text-neutral-900 font-sans text-xs md:text-[13px] leading-relaxed text-black/90">
            {tosData.generalTerms?.rules?.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-[11px] flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p>{rule}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 02: PayPal Exclusive // Billing */}
        <div className="sticky top-24 md:top-28 z-20 bg-[#DCFCE7] border-[4px] border-black rounded-3xl p-5 md:p-6 shadow-[8px_8px_0px_#000] rotate-[1.5deg] transition-transform select-none max-h-[78vh] overflow-y-auto">
          <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b-2 border-black/15">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#4ADE80] text-black border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
              <CreditCard className="w-3.5 h-3.5" />
              💳 {tosData.paymentInvoicing?.badge || "PAYPAL EXCLUSIVE // BILLING"}
            </span>
            <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest">
              02 // 03
            </span>
          </div>

          <h3 className="font-comic text-xl md:text-2xl font-black uppercase text-black tracking-wide mb-3">
            {tosData.paymentInvoicing?.title || "PAYMENT & INVOICING PROTOCOL"}
          </h3>

          <ul className="space-y-2.5 md:space-y-3 text-neutral-900 font-sans text-xs md:text-[13px] leading-relaxed text-black/90">
            {tosData.paymentInvoicing?.rules?.map((rule, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-[11px] flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <p>{rule}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Card 03: Client & Artist Code // Anti-AI */}
        <div className="sticky top-28 md:top-32 z-30 bg-[#FEF08A] border-[4px] border-black rounded-3xl p-5 md:p-6 shadow-[8px_8px_0px_#000] rotate-[-0.5deg] transition-transform select-none max-h-[78vh] overflow-y-auto">
          <div className="flex items-center justify-between gap-3 mb-4 pb-2.5 border-b-2 border-black/15">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-black text-[#FFE600] border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
              <ShieldAlert className="w-3.5 h-3.5 text-[#FFE600]" />
              🛡 ANTI-AI &amp; CLIENT CODE
            </span>
            <span className="font-mono text-xs font-black text-neutral-600 uppercase tracking-widest">
              03 // 03
            </span>
          </div>

          <h3 className="font-comic text-xl md:text-2xl font-black uppercase text-black tracking-wide mb-3">
            ETHICS, ANTI-AI &amp; REVISIONS
          </h3>

          <ul className="space-y-2.5 md:space-y-3 text-neutral-900 font-sans text-xs md:text-[13px] leading-relaxed text-black/90">
            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-[11px] flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                01
              </span>
              <p>
                <strong>Strict Anti-AI Training Clause:</strong> Absolute zero tolerance for scraping, feeding, or training artwork into generative models, LoRAs, or crypto/NFT minting datasets.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-[11px] flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                02
              </span>
              <p>
                <strong>2x Revision Cycle:</strong> Exactly 2 complimentary revision passes included during the rough sketch &amp; inking phases. Post-render structural overhauls incur milestone surcharges.
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-[11px] flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                03
              </span>
              <p>
                <strong>Commercial Licensing Addon:</strong> Merchandise, stream brand kits, book cover wraps, and commercial campaigns require contract endorsement (+100% standard tier rate).
              </p>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-[11px] flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                04
              </span>
              <p>
                <strong>Client Response Window:</strong> Feedback on milestone WIPs requested within 48–72h to safeguard production schedule and queue delivery windows.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
