"use client";

import React, { useState, useEffect, useRef } from "react";
import { TermsOfServiceData, TosGuidelineItem } from "@/types/portfolio";
import {
  FileText,
  CreditCard,
  ChevronDown,
  ShieldCheck,
  AlertCircle,
  ShieldAlert,
  CheckCircle2,
  Scale,
} from "lucide-react";

export interface TermsOfServiceProps {
  tosData?: TermsOfServiceData;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ tosData }) => {
  const [activeTabId, setActiveTabId] = useState<string>("your-rights");
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("tos-visible");
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -50px 0px" }
    );

    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);

    return () => observer.disconnect();
  }, []);

  if (!tosData) return null;

  const getGuidelineIcon = (type: TosGuidelineItem["iconType"]) => {
    switch (type) {
      case "rights":
        return <ShieldCheck className="w-5 h-5 stroke-[2.5]" />;
      case "responsibilities":
        return <AlertCircle className="w-5 h-5 stroke-[2.5]" />;
      case "artist-rights":
        return <ShieldAlert className="w-5 h-5 stroke-[2.5]" />;
      case "artist-responsibilities":
        return <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />;
      default:
        return <FileText className="w-5 h-5 stroke-[2.5]" />;
    }
  };

  const getBadgeStyle = (variant: TosGuidelineItem["colorVariant"]) => {
    switch (variant) {
      case "green":
        return "bg-comic-green text-black";
      case "pink":
        return "bg-comic-pink text-white";
      case "purple":
        return "bg-comic-purple text-white";
      case "yellow":
        return "bg-comic-yellow text-black";
      default:
        return "bg-white text-black";
    }
  };

  const highlightKeyPhrases = (text: string) => {
    const phrases = [
      "50% Upfront Deposit",
      "50% upfront non-refundable deposit",
      "2 Free Revision Rounds",
      "2 free revision rounds",
      "Strict Anti-AI Clause",
      "Strict Anti-AI Protection",
      "No Chargeback Clause",
      "100% full payment upfront",
      "Rough Sketch & Lineart phase",
      "exclusive PayPal",
      "non-profit personal use",
      "300 DPI master files",
    ];

    let replaced = text;
    phrases.forEach((phrase) => {
      const regex = new RegExp(`(${phrase})`, "gi");
      replaced = replaced.replace(regex, "<strong>$1</strong>");
    });

    return <span dangerouslySetInnerHTML={{ __html: replaced }} />;
  };

  const activeGuideline =
    tosData.guidelines.find((g) => g.id === activeTabId) || tosData.guidelines[0];

  return (
    <section id="tos" className="py-2 sm:py-4">
      {/* Section Header */}
      <div className="max-w-3xl mb-8 md:mb-12">
        <div className="inline-flex items-center gap-2 bg-comic-yellow text-black border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
          <Scale className="w-4 h-4 fill-black" />
          COMMISSION CONTRACT
        </div>
        <h2 className="font-comic text-5xl sm:text-7xl uppercase text-black tracking-wide leading-none">
          {tosData.title}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-neutral-700 font-sans">
          {tosData.subtitle}
        </p>
      </div>

      {/* Alternating Zig-Zag Cards */}
      <div className="space-y-8 md:space-y-12 mb-12 sm:mb-16">
        {/* Card 1: Legal Codex / General Terms (Left-Aligned) */}
        <div
          ref={card1Ref}
          className="tos-slide-left max-w-2xl mr-auto bg-[#FFFBEB] border-[3px] border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000] transition-transform hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#FFE600] font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#FFE600]">
                <Scale className="w-3.5 h-3.5" />
                LEGAL CODEX // RULES
              </span>
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-500 uppercase">
                SEC. 01 // RULES
              </span>
            </div>

            <h3 className="font-comic text-2xl sm:text-3xl uppercase text-black tracking-wide mb-4">
              {tosData.generalTerms.title}
            </h3>

            <div className="w-12 h-1 bg-comic-yellow border-y border-black mb-6" />

            <ul className="space-y-4">
              {tosData.generalTerms.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-black text-white font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-neutral-900 leading-relaxed font-medium">
                    {highlightKeyPhrases(rule)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: PayPal Exclusive / Payment & Invoicing (Right-Aligned & Offset) */}
        <div
          ref={card2Ref}
          className="tos-slide-right max-w-2xl ml-auto mt-8 md:mt-12 bg-[#F0FDF4] border-[3px] border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000] transition-transform hover:-translate-y-1"
        >
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#4ADE80] font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#4ADE80]">
                <CreditCard className="w-3.5 h-3.5" />
                PAYPAL EXCLUSIVE // BILLING
              </span>
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-500 uppercase">
                SEC. 02 // BILLING
              </span>
            </div>

            <h3 className="font-comic text-2xl sm:text-3xl uppercase text-black tracking-wide mb-4">
              {tosData.paymentInvoicing.title}
            </h3>

            <div className="w-12 h-1 bg-[#4ADE80] border-y border-black mb-6" />

            <ul className="space-y-4">
              {tosData.paymentInvoicing.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-black text-white font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-neutral-900 leading-relaxed font-medium">
                    {highlightKeyPhrases(rule)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Streamlined Compact Guidelines Drawer / Tabs */}
      <div className="border-[3px] border-black bg-white rounded-3xl p-6 sm:p-8 shadow-[6px_6px_0px_#000]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-[3px] border-black">
          <div>
            <h3 className="font-comic text-2xl sm:text-3xl uppercase text-black tracking-wide leading-none">
              {tosData.guidelinesTitle}
            </h3>
            <p className="font-nav text-xs uppercase tracking-wider text-neutral-500 mt-1 font-semibold">
              CODE OF ETHICS, OPERATIONAL RIGHTS &amp; RESPONSIBILITIES
            </p>
          </div>
          <span className="bg-comic-cyan border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider text-black rounded-full shadow-[2px_2px_0px_#000] w-fit">
            INTERACTIVE DRAWER
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-6">
          {tosData.guidelines.map((item) => {
            const isActive = item.id === activeTabId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTabId(item.id)}
                className={`
                  inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border-2 border-black font-nav text-xs font-black uppercase tracking-wider cursor-pointer transition-all
                  ${
                    isActive
                      ? `${getBadgeStyle(item.colorVariant)} shadow-[3px_3px_0px_#000] -translate-y-0.5`
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 shadow-[1.5px_1.5px_0px_#000]"
                  }
                `}
              >
                {getGuidelineIcon(item.iconType)}
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Panel Content */}
        {activeGuideline && (
          <div className="bg-neutral-50 border-2 border-black rounded-2xl p-5 sm:p-6 shadow-[3px_3px_0px_#000] animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] ${getBadgeStyle(
                  activeGuideline.colorVariant
                )}`}
              >
                {getGuidelineIcon(activeGuideline.iconType)}
              </div>
              <h4 className="font-comic text-xl sm:text-2xl uppercase tracking-wide text-black">
                {activeGuideline.title}
              </h4>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t-2 border-dashed border-black/20">
              {activeGuideline.points.map((pt, pIdx) => (
                <li
                  key={pIdx}
                  className="flex items-start gap-3 bg-white border border-black/30 rounded-xl p-3 shadow-[1.5px_1.5px_0px_#000]"
                >
                  <span className="w-5 h-5 rounded-full bg-black text-white font-mono text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {pIdx + 1}
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
                    {pt}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
