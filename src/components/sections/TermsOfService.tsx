"use client";

import React, { useState } from "react";
import { TermsOfServiceData } from "@/types/portfolio";
import { Scale, CreditCard, ShieldAlert, ChevronDown, CheckCircle2 } from "lucide-react";
import { useSound } from "@/context/SoundContext";

export interface TermsOfServiceProps {
  tosData?: TermsOfServiceData;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ tosData }) => {
  const { playClick } = useSound();
  const [openAccordion, setOpenAccordion] = useState<string | null>("your-rights");

  if (!tosData) return null;

  const toggleAccordion = (id: string) => {
    playClick();
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-8 md:mb-12 max-w-4xl mx-auto text-center select-none">
        <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest bg-[#FFE600] border-2 border-black px-3.5 py-1 rounded-full shadow-[2px_2px_0px_#000] inline-block mb-3">
          BINDING CLIENT-ARTIST AGREEMENT
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-comic uppercase tracking-tight text-black leading-none">
          TERMS OF SERVICE // CODEX
        </h2>
        <p className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-700 max-w-2xl mx-auto">
          {tosData.subtitle}
        </p>
      </div>

      {/* 2-Column Bento Grid: Core Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12">
        {/* Card 1: Legal Codex */}
        <div className="bg-[#FFFDF9] border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_#000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-black/15">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFE600] text-black border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                <Scale className="w-4 h-4" />
                ⚖ {tosData.generalTerms.badge}
              </span>
              <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest">
                CARD // 01
              </span>
            </div>

            <h3 className="font-comic text-2xl sm:text-3xl uppercase text-black tracking-wide mb-5">
              {tosData.generalTerms.title}
            </h3>

            <ul className="space-y-3.5 text-neutral-900 font-sans text-xs sm:text-sm leading-relaxed">
              {tosData.generalTerms.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p>{rule}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: Payment Protocol */}
        <div className="bg-[#F0FDF4] border-[3px] border-black rounded-3xl p-6 sm:p-8 shadow-[5px_5px_0px_#000] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-black/15">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#4ADE80] text-black border-2 border-dashed border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
                <CreditCard className="w-4 h-4" />
                💳 {tosData.paymentInvoicing.badge}
              </span>
              <span className="font-mono text-xs font-black text-neutral-500 uppercase tracking-widest">
                CARD // 02
              </span>
            </div>

            <h3 className="font-comic text-2xl sm:text-3xl uppercase text-black tracking-wide mb-5">
              {tosData.paymentInvoicing.title}
            </h3>

            <ul className="space-y-3.5 text-neutral-900 font-sans text-xs sm:text-sm leading-relaxed">
              {tosData.paymentInvoicing.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-mono font-black text-xs flex items-center justify-center shrink-0 border-2 border-black shadow-[1.5px_1.5px_0px_#000] mt-0.5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p>{rule}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Xotoe-Style Interactive Guidelines Accordion */}
      {tosData.guidelines && tosData.guidelines.length > 0 && (
        <div className="bg-white border-[3px] border-black rounded-2xl p-6 sm:p-8 shadow-[5px_5px_0px_#000]">
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00E5FF] text-black border-2 border-black font-black text-xs uppercase rounded-lg shadow-[2px_2px_0px_#000]">
              <ShieldAlert className="w-4 h-4" />
              OPERATIONAL GUIDELINES
            </span>
            <h4 className="font-comic text-2xl sm:text-3xl uppercase text-black tracking-wide">
              {tosData.guidelinesTitle || "CLIENT & ARTIST CODES"}
            </h4>
          </div>

          <div className="space-y-3">
            {tosData.guidelines.map((g) => {
              const isOpen = openAccordion === g.id;
              return (
                <div
                  key={g.id}
                  className="border-2 border-black rounded-xl overflow-hidden shadow-[2px_2px_0px_#000] transition-all bg-[#FAF9F6]"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(g.id)}
                    className="w-full flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 text-left font-comic text-lg sm:text-xl uppercase tracking-wide text-black hover:bg-[#FFE600]/30 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />
                      {g.title}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-black stroke-[2.5] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 py-4 bg-white border-t-2 border-black text-xs sm:text-sm font-sans text-neutral-800 space-y-2.5">
                      {g.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                          <p>{pt}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
