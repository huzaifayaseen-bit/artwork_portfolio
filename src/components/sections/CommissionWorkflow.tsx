"use client";

import React from "react";
import Link from "next/link";
import { MessageSquareText, FileCheck, Palette, PackageCheck, ArrowRight, ShieldCheck } from "lucide-react";

export const CommissionWorkflow: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "BRIEF & ESTIMATE",
      badge: "DAY 1",
      badgeColor: "bg-comic-cyan text-black",
      icon: MessageSquareText,
      desc: "Share your character reference sheets, moodboards, and intended usage (personal or commercial). You'll receive a clear timeline and quote.",
      highlight: "Guaranteed fixed quote",
    },
    {
      num: "02",
      title: "DEPOSIT & SKETCH",
      badge: "DAYS 2-4",
      badgeColor: "bg-comic-yellow text-black",
      icon: FileCheck,
      desc: "Lock your queue slot with a 50% deposit (PayPal invoice). Review rough thumbnail sketches, anatomy framing, and dynamic pose options.",
      highlight: "2 free revision rounds",
    },
    {
      num: "03",
      title: "INKS & CEL-SHADING",
      badge: "DAYS 5-9",
      badgeColor: "bg-comic-pink text-white",
      icon: Palette,
      desc: "Precision vector lineart drafting followed by bold stepped cel-shading values and color flats. Milestone approval preview sent directly to you.",
      highlight: "Color palette sign-off",
    },
    {
      num: "04",
      title: "MASTER DELIVERY",
      badge: "DAYS 10-14",
      badgeColor: "bg-comic-green text-black",
      icon: PackageCheck,
      desc: "After final balance settlement, receive full 300 DPI print-ready master PNGs, transparent background cuts, and layered source PSDs.",
      highlight: "300 DPI + Layered PSD",
    },
  ];

  return (
    <section id="workflow-section" className="py-10 sm:py-14 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-comic-purple text-white border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2.5 shadow-[2px_2px_0px_#000]">
            <ShieldCheck className="w-4 h-4 fill-white" />
            <span>TRANSPARENT CLIENT PIPELINE</span>
          </div>
          <h2 className="font-comic text-4xl sm:text-6xl uppercase text-black tracking-wide leading-none">
            HOW COMMISSIONS WORK
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-700 font-sans max-w-2xl">
            A collaborative 4-step creative process designed for zero surprises, milestone checkpoints, and international client peace of mind.
          </p>
        </div>

        <Link
          href="#contact-section"
          className="self-start md:self-end inline-flex items-center gap-2 font-btn text-xs font-bold uppercase tracking-wider bg-comic-yellow hover:bg-[#FFF033] text-black border-2 border-black px-4 py-2 shadow-neo-sm hover:shadow-neo transition-all"
        >
          <span>SUBMIT COMMISSION BRIEF</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Process Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.num}
              className="relative flex flex-col justify-between bg-white border-[3px] border-black p-5 sm:p-6 shadow-neo hover:shadow-neo-lg hover:-translate-x-1 hover:-translate-y-1 transition-all select-none"
            >
              {/* Top Row: Number & Badge */}
              <div>
                <div className="flex items-center justify-between border-b-2 border-black/10 pb-3 mb-4">
                  <span className="font-comic text-3xl font-black text-black leading-none">
                    {step.num}
                  </span>
                  <span
                    className={`font-nav text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000] ${step.badgeColor}`}
                  >
                    {step.badge}
                  </span>
                </div>

                {/* Step Title & Icon */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 bg-black text-comic-yellow border-2 border-black flex items-center justify-center shadow-[1px_1px_0px_#000] flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-comic text-xl sm:text-2xl uppercase text-black tracking-wide leading-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed mt-2">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Micro Highlight */}
              <div className="mt-5 pt-3 border-t-2 border-dashed border-black/15 flex items-center gap-1.5 font-nav text-[11px] font-bold uppercase text-neutral-800">
                <span className="w-2 h-2 bg-comic-green border border-black inline-block" />
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
