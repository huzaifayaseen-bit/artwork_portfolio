import React from "react";
import { ShowcaseComparison } from "@/types/portfolio";
import { ComparisonSlider } from "@/components/showcase/ComparisonSlider";
import { Wand2, PenTool, CheckCircle2 } from "lucide-react";

export interface ShowcaseSectionProps {
  showcase: ShowcaseComparison;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({ showcase }) => {
  return (
    <section id="showcase" className="py-12 sm:py-16">
      <div className="border-[3px] border-black bg-comic-cyan/20 p-6 sm:p-10 shadow-neo">
        {/* Section Heading */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 bg-comic-yellow border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
            <Wand2 className="w-4 h-4 fill-black" />
            INTERACTIVE COMPARISON
          </div>
          <h2 className="font-comic text-5xl sm:text-7xl uppercase text-black tracking-wide leading-none">
            {showcase.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-neutral-800 font-sans">
            {showcase.subtitle}
          </p>
        </div>

        {/* The Comparison Slider */}
        <ComparisonSlider showcase={showcase} />

        {/* Explanatory Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white border-[3px] border-black p-5 shadow-neo-sm">
            <div className="flex items-center gap-2 font-comic text-xl uppercase text-black mb-2 tracking-wide">
              <PenTool className="w-4 h-4 text-comic-pink" />
              BLUEPRINT INK DRAFTING
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              Every piece begins with dynamic geometric perspective grids, anatomical construction circles, and expressive variable-width ink contours.
            </p>
          </div>

          <div className="bg-white border-[3px] border-black p-5 shadow-neo-sm">
            <div className="flex items-center gap-2 font-comic text-xl uppercase text-black mb-2 tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-comic-green" />
              MULTI-PASS CEL-SHADE VOLUME
            </div>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-sans">
              Stepped shadow values with zero-blur termination edges create punchy, readable forms that translate impeccably across print and digital screens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
