import React from "react";
import Image from "next/image";
import { Wrench } from "lucide-react";

interface ToolItem {
  name: string;
  label: string;
  logo: string;
  delay: string;
}

const TOOLS: ToolItem[] = [
  {
    name: "Clip Studio Paint",
    label: "CLIP STUDIO PAINT",
    logo: "/logos/clip-studio-paint.svg",
    delay: "0s",
  },
  {
    name: "Photoshop",
    label: "PHOTOSHOP",
    logo: "/logos/photoshop.svg",
    delay: "-0.9s",
  },
  {
    name: "Illustrator",
    label: "ILLUSTRATOR",
    logo: "/logos/illustrator.svg",
    delay: "-1.8s",
  },
  {
    name: "Procreate",
    label: "PROCREATE",
    logo: "/logos/procreate.svg",
    delay: "-2.7s",
  },
];

export const ToolsOfTheTrade: React.FC = () => {
  return (
    <div id="tools-section" className="py-2">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFE600] text-black border-2 border-black px-3.5 py-1 font-nav text-xs font-black uppercase tracking-wider mb-3 shadow-[2px_2px_0px_#000]">
            <Wrench className="w-3.5 h-3.5 stroke-[2.5]" />
            STUDIO PIPELINE
          </div>
          <h2 className="font-comic text-4xl sm:text-6xl md:text-7xl uppercase text-black tracking-wide leading-none">
            TOOLS OF THE TRADE
          </h2>
          <p className="mt-3 text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-600">
            INDUSTRY-STANDARD DIGITAL HARDWARE &amp; CREATIVE SUITES
          </p>
        </div>

        {/* 4 Large Brand Logos Row (2x2 on mobile, centered 4-item row on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto items-center justify-items-center">
          {TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="flex flex-col items-center justify-center cursor-pointer group select-none"
            >
              <div
                className="tool-float-item relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center"
                style={{ animationDelay: tool.delay }}
              >
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-contain pointer-events-none"
                />
              </div>
              <span className="mt-4 font-mono font-black text-xs sm:text-sm tracking-wider uppercase text-black group-hover:text-[#2B6BFF] transition-colors">
                {tool.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
