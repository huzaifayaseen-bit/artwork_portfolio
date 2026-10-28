"use client";

import React, { useState, useMemo } from "react";
import { CalculatorData, CalculatorScope } from "@/types/portfolio";
import { useSound } from "@/context/SoundContext";
import {
  Calculator,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
} from "lucide-react";

export interface CommissionCalculatorProps {
  calculatorData?: CalculatorData;
  discordTag?: string;
}

export const CommissionCalculator: React.FC<CommissionCalculatorProps> = ({
  calculatorData,
  discordTag = "emilia_art#0001",
}) => {
  const { playClick, playSuccess } = useSound();
  const defaultScope = calculatorData?.scopes[0]?.id || "scope-headshot";
  const [selectedScopeId, setSelectedScopeId] = useState<string>(defaultScope);
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<boolean>(false);

  if (!calculatorData) return null;

  const currentScope = useMemo(() => {
    return (
      calculatorData.scopes.find((s) => s.id === selectedScopeId) ||
      calculatorData.scopes[0]
    );
  }, [calculatorData.scopes, selectedScopeId]);

  const toggleAddon = (id: string) => {
    playClick();
    setSelectedAddons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Calculate pricing breakdown
  const pricingBreakdown = useMemo(() => {
    const base = currentScope ? currentScope.basePrice : 60;
    let extraCharAmount = 0;
    let flatAddonsTotal = 0;
    const activeAddonsList: { name: string; cost: number }[] = [];

    calculatorData.addons.forEach((addon) => {
      if (selectedAddons[addon.id]) {
        if (addon.type === "multiplier") {
          const cost = base * addon.value; // e.g. base * 0.5
          extraCharAmount += cost;
          activeAddonsList.push({ name: addon.name, cost });
        } else {
          flatAddonsTotal += addon.value;
          activeAddonsList.push({ name: addon.name, cost: addon.value });
        }
      }
    });

    const total = base + extraCharAmount + flatAddonsTotal;
    return {
      base,
      extraCharAmount,
      flatAddonsTotal,
      activeAddonsList,
      total,
    };
  }, [currentScope, calculatorData.addons, selectedAddons]);

  // Construct structured Discord brief
  const generateBriefText = () => {
    const lines = [
      `🎨 **COMMISSION INQUIRY // ESTIMATED BRIEF**`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `• **Scope**: ${currentScope.name} ($${currentScope.basePrice} USD)`,
      `• **Base Description**: ${currentScope.subtitle}`,
      `• **Selected Add-ons**:`,
    ];

    if (pricingBreakdown.activeAddonsList.length === 0) {
      lines.push(`  - None (Base scope only)`);
    } else {
      pricingBreakdown.activeAddonsList.forEach((item) => {
        lines.push(`  - ${item.name}: +$${item.cost} USD`);
      });
    }

    lines.push(`• **Calculated Estimate**: $${pricingBreakdown.total} USD`);
    lines.push(`• **Payment Method**: PayPal (USD)`);
    lines.push(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    lines.push(`Hello Emilia! I generated this estimated brief from your portfolio calculator and would like to commission this project.`);

    return lines.join("\n");
  };

  const handleCopyBriefAndOpenDiscord = async () => {
    const brief = generateBriefText();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(brief);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = brief;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);

      // Open Discord invite / web client
      window.open("https://discord.gg/emilia-art", "_blank", "noopener,noreferrer");
    } catch {
      playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
      window.open("https://discord.gg/emilia-art", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="mt-12 bg-white border-[4px] border-black p-6 sm:p-10 shadow-neo-lg relative overflow-hidden">
      {/* Top Graphic Decal Accent */}
      <div className="absolute top-0 right-0 bg-comic-yellow border-b-[3px] border-l-[3px] border-black px-4 py-1 font-nav text-xs font-bold uppercase tracking-wider">
        REAL-TIME ESTIMATOR
      </div>

      {/* Widget Header */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 bg-comic-cyan text-black border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
          <Calculator className="w-4 h-4 fill-black" />
          COST CALCULATOR
        </div>
        <h3 className="font-comic text-3xl sm:text-5xl uppercase text-black tracking-wide leading-none">
          {calculatorData.title}
        </h3>
        <p className="mt-2 text-sm text-neutral-700 font-sans">
          {calculatorData.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Scope & Addon Selectors (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Select Scope Tier */}
          <div>
            <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-comic-pink border border-black inline-block" />
              1. CHOOSE BASE SCOPE
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {calculatorData.scopes.map((scope) => {
                const isSelected = selectedScopeId === scope.id;
                return (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSelectedScopeId(scope.id);
                    }}
                    className={`
                      border-[3px] border-black p-4 text-left transition-all duration-75 select-none cursor-pointer flex flex-col justify-between
                      ${
                        isSelected
                          ? "bg-comic-yellow shadow-neo -translate-x-[2px] -translate-y-[2px]"
                          : "bg-white hover:bg-neutral-50 shadow-neo-sm active:translate-x-[1px] active:translate-y-[1px]"
                      }
                    `}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-comic text-lg uppercase tracking-wide text-black">
                          {scope.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 bg-black rounded-none" />
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-600 font-sans leading-tight">
                        {scope.subtitle}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t-2 border-dashed border-black/30 flex items-baseline gap-1">
                      <span className="font-comic text-2xl text-black">
                        ${scope.basePrice}
                      </span>
                      <span className="text-[10px] font-nav font-bold text-neutral-600 uppercase">
                        USD
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Select Add-ons */}
          <div>
            <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-600 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-comic-cyan border border-black inline-block" />
              2. OPTIONAL ADD-ONS &amp; LICENSING
            </label>

            <div className="space-y-2.5">
              {calculatorData.addons.map((addon) => {
                const isChecked = selectedAddons[addon.id] || false;
                const costDisplay =
                  addon.type === "multiplier"
                    ? `+$${currentScope.basePrice * addon.value} USD (+${addon.value * 100}%)`
                    : `+$${addon.value} USD`;

                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`
                      border-[3px] border-black p-3.5 flex items-start justify-between gap-4 cursor-pointer select-none transition-all duration-75
                      ${
                        isChecked
                          ? "bg-neutral-100 shadow-neo-sm -translate-x-[1px] -translate-y-[1px]"
                          : "bg-white hover:bg-neutral-50 shadow-[2px_2px_0px_#000]"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          w-5 h-5 border-2 border-black mt-0.5 flex items-center justify-center flex-shrink-0 transition-colors
                          ${isChecked ? "bg-comic-pink text-white" : "bg-white"}
                        `}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <h5 className="font-comic text-base uppercase tracking-wide text-black leading-tight">
                          {addon.name}
                        </h5>
                        <p className="text-xs text-neutral-600 font-sans mt-0.5">
                          {addon.description}
                        </p>
                      </div>
                    </div>

                    <span className="font-nav text-xs font-bold text-black uppercase tracking-wider whitespace-nowrap bg-white border border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                      {costDisplay}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Total Summary & Discord Action Trigger (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-900 border-[4px] border-black p-6 sm:p-7 text-white shadow-neo flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-neutral-700 pb-3 mb-4">
              <span className="font-comic text-sm tracking-widest text-comic-yellow uppercase">
                ESTIMATE SUMMARY
              </span>
              <span className="bg-comic-green text-black font-nav text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                PAYPAL (USD)
              </span>
            </div>

            {/* Scope Row */}
            <div className="flex items-center justify-between py-2 border-b border-neutral-800 text-sm font-sans">
              <span className="text-neutral-300">Base: {currentScope.name}</span>
              <span className="font-nav font-bold text-white">${currentScope.basePrice}</span>
            </div>

            {/* Active Addons Breakdown */}
            {pricingBreakdown.activeAddonsList.length > 0 ? (
              pricingBreakdown.activeAddonsList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-1.5 border-b border-neutral-800 text-xs font-sans text-neutral-400"
                >
                  <span className="truncate pr-2">• {item.name.replace(/\(\+.*?\)/, "")}</span>
                  <span className="font-nav font-semibold text-comic-cyan whitespace-nowrap">
                    +${item.cost}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-2 text-xs font-sans text-neutral-500 italic">
                No add-ons selected
              </div>
            )}

            {/* Grand Total Display */}
            <div className="mt-6 pt-4 border-t-2 border-white flex items-end justify-between">
              <div>
                <span className="font-nav text-xs font-bold text-neutral-400 uppercase tracking-widest block">
                  ESTIMATED TOTAL
                </span>
                <span className="text-[11px] text-neutral-500 font-sans block mt-0.5">
                  Deposit (50%): ${Math.round(pricingBreakdown.total * 0.5)} USD
                </span>
              </div>
              <div className="text-right">
                <span className="font-comic text-5xl sm:text-6xl text-comic-yellow leading-none block">
                  ${pricingBreakdown.total}
                </span>
                <span className="font-nav text-[11px] text-neutral-400 uppercase tracking-wider">
                  USD TOTAL
                </span>
              </div>
            </div>
          </div>

          {/* Action: Copy Brief & Direct Discord Order */}
          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={handleCopyBriefAndOpenDiscord}
              className={`
                w-full flex items-center justify-center gap-2 border-[3px] border-black py-3.5 px-4
                font-btn text-xs sm:text-sm font-bold uppercase tracking-wider
                transition-all duration-75 select-none cursor-pointer shadow-neo
                ${
                  copied
                    ? "bg-comic-green text-black translate-x-[2px] translate-y-[2px]"
                    : "bg-comic-yellow text-black hover:bg-[#FFF033] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px]"
                }
              `}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>BRIEF COPIED! OPENING DISCORD...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>ORDER VIA DISCORD (COPY BRIEF)</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

            <div className="text-center font-nav text-[11px] text-neutral-400 uppercase tracking-wide">
              Direct DM: <span className="text-white font-mono font-bold">{discordTag}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
