"use client";

import React, { useState } from "react";
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
  // All accordion items open by default for immediate transparency
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "your-rights": true,
    "your-responsibilities": true,
    "artist-rights": true,
    "artist-responsibilities": true,
  });

  if (!tosData) return null;

  const toggleAccordion = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getGuidelineIcon = (type: TosGuidelineItem["iconType"]) => {
    switch (type) {
      case "rights":
        return <ShieldCheck className="w-5 h-5 text-comic-green stroke-[2.5]" />;
      case "responsibilities":
        return <AlertCircle className="w-5 h-5 text-comic-pink stroke-[2.5]" />;
      case "artist-rights":
        return <ShieldAlert className="w-5 h-5 text-comic-purple stroke-[2.5]" />;
      case "artist-responsibilities":
        return <CheckCircle2 className="w-5 h-5 text-comic-yellow stroke-[2.5]" />;
      default:
        return <Scale className="w-5 h-5 text-black" />;
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

  return (
    <section id="tos" className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="max-w-3xl mb-10">
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

      {/* Top 2 Neo-Brutalist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-12">
        {/* Card 1: General Terms */}
        <div className="bg-white border-[4px] border-black p-6 sm:p-8 shadow-neo flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-comic-yellow" />
                {tosData.generalTerms.badge}
              </span>
              <span className="font-comic text-xs tracking-widest text-neutral-500 uppercase">
                SEC. 01 // RULES
              </span>
            </div>

            <h3 className="font-comic text-2xl sm:text-3xl uppercase text-black tracking-wide mb-4">
              {tosData.generalTerms.title}
            </h3>

            <div className="w-12 h-1 bg-comic-yellow border-y border-black mb-5" />

            <ul className="space-y-3.5">
              {tosData.generalTerms.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black mt-2 flex-shrink-0" />
                  <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed">
                    {rule}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Payment & Invoicing */}
        <div className="bg-white border-[4px] border-black p-6 sm:p-8 shadow-neo flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5 text-comic-cyan" />
                {tosData.paymentInvoicing.badge}
              </span>
              <span className="font-comic text-xs tracking-widest text-neutral-500 uppercase">
                SEC. 02 // BILLING
              </span>
            </div>

            <h3 className="font-comic text-2xl sm:text-3xl uppercase text-black tracking-wide mb-4">
              {tosData.paymentInvoicing.title}
            </h3>

            <div className="w-12 h-1 bg-comic-cyan border-y border-black mb-5" />

            <ul className="space-y-3.5">
              {tosData.paymentInvoicing.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-comic-pink mt-2 flex-shrink-0 border border-black" />
                  <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed">
                    {rule}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Collapsible Section: Client & Artist Guidelines */}
      <div className="border-[4px] border-black bg-white p-6 sm:p-8 shadow-neo-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-[3px] border-black">
          <div>
            <h3 className="font-comic text-3xl sm:text-4xl uppercase text-black tracking-wide leading-none">
              {tosData.guidelinesTitle}
            </h3>
            <p className="font-nav text-xs uppercase tracking-wider text-neutral-500 mt-1 font-semibold">
              TRANSPARENT RIGHTS, RESPONSIBILITIES &amp; CODE OF ETHICS
            </p>
          </div>
          <span className="bg-comic-cyan border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider text-black w-fit">
            4 OPERATIONAL PANELS
          </span>
        </div>

        {/* 4 Collapsible Guideline Accordion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tosData.guidelines.map((item) => {
            const isOpen = openItems[item.id] ?? false;
            return (
              <div
                key={item.id}
                className="border-[3px] border-black bg-neutral-50 overflow-hidden shadow-neo-sm transition-all"
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="
                    w-full flex items-center justify-between p-4 bg-white
                    border-b-[3px] border-black text-left select-none
                    hover:bg-neutral-100 transition-colors
                  "
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 border-2 border-black shadow-[2px_2px_0px_#000] ${getBadgeStyle(item.colorVariant)}`}>
                      {getGuidelineIcon(item.iconType)}
                    </div>
                    <span className="font-comic text-xl sm:text-2xl uppercase tracking-wide text-black">
                      {item.title}
                    </span>
                  </div>

                  <div className={`transform transition-transform duration-100 p-1 border border-black bg-comic-yellow ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>

                {/* Collapsible Content Body */}
                {isOpen && (
                  <div className="p-4 sm:p-5 bg-neutral-50">
                    <ul className="space-y-3">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 bg-black mt-2 flex-shrink-0" />
                          <p className="font-sans text-xs sm:text-sm text-neutral-800 leading-relaxed">
                            {pt}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
