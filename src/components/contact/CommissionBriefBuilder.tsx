"use client";

import React, { useState, useMemo } from "react";
import { ComicButton } from "@/components/ui/ComicButton";
import { useSound } from "@/context/SoundContext";
import {
  FileText,
  Copy,
  Check,
  Mail,
  ExternalLink,
  Sparkles,
  Layers,
  Clock,
  Shield,
  HelpCircle,
} from "lucide-react";

export interface CommissionBriefBuilderProps {
  discordTag: string;
  email: string;
}

const CATEGORIES = [
  "Character Design",
  "Manga / Comic Page",
  "Book Cover",
  "Twitch / YT Banner",
  "Emotes Set",
  "Mascot Logo",
];

const SCOPES = [
  { id: "bust", label: "Headshot / Bust", desc: "Focus on face, hair & expression" },
  { id: "half", label: "Half Body", desc: "Waist-up with hand pose & weapons" },
  { id: "full", label: "Full Character / Splash", desc: "Full stance with dynamic background" },
];

const TIMELINES = [
  { id: "flexible", label: "Flexible (2-3 Weeks)", note: "Standard pipeline queue" },
  { id: "standard", label: "Standard (1-2 Weeks)", note: "Regular turnaround" },
  { id: "rush", label: "Rush / Urgent (< 7 Days)", note: "+$50 Priority milestone" },
];

export const CommissionBriefBuilder: React.FC<CommissionBriefBuilderProps> = ({
  discordTag,
  email,
}) => {
  const { playSuccess, playClick } = useSound();
  const [selectedCategory, setSelectedCategory] = useState<string>("Character Design");
  const [selectedScope, setSelectedScope] = useState<string>("Full Character / Splash");
  const [refLink, setRefLink] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("Standard (1-2 Weeks)");
  const [isCommercial, setIsCommercial] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate structured brief string
  const formattedBrief = useMemo(() => {
    const lines = [
      `*** 📋 COMMISSION INQUIRY BRIEF - EMILIA ART ***`,
      `• Category: ${selectedCategory}`,
      `• Scope: ${selectedScope}`,
      `• Reference Link: ${refLink.trim() || "[No link provided - will send via DM]"}`,
      `• Details & Notes: ${notes.trim() || "[Awaiting discussion on mood/pose]"}`,
      `• Timeline Target: ${timeline}`,
      `• Commercial Licensing: ${isCommercial ? "Commercial Buyout Rights Requested" : "Personal Use Only ($0)"}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hello Emilia! I generated this structured inquiry brief and would like to check your availability.`,
    ];
    return lines.join("\n");
  }, [selectedCategory, selectedScope, refLink, notes, timeline, isCommercial]);

  const handleCopyDiscordBrief = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(formattedBrief);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = formattedBrief;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);

      // Open Discord client or web app
      window.open("https://discord.gg/emilia-art", "_blank", "noopener,noreferrer");
    } catch {
      playSuccess();
      setCopied(true);
      setTimeout(() => setCopied(false), 3500);
      window.open("https://discord.gg/emilia-art", "_blank", "noopener,noreferrer");
    }
  };

  const mailtoUrl = useMemo(() => {
    const subject = encodeURIComponent(`Commission Inquiry: ${selectedCategory} - ${selectedScope}`);
    const body = encodeURIComponent(formattedBrief);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [email, selectedCategory, selectedScope, formattedBrief]);

  return (
    <div id="brief-builder" className="mt-12 bg-white border-[4px] border-black p-6 sm:p-10 shadow-neo-lg relative overflow-hidden">
      {/* Top Graphic Decal Accent */}
      <div className="absolute top-0 right-0 bg-comic-cyan border-b-[3px] border-l-[3px] border-black px-4 py-1 font-nav text-xs font-bold uppercase tracking-wider text-black">
        TRANSMISSION CODER
      </div>

      {/* Builder Header */}
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-2 bg-comic-yellow text-black border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-2 shadow-[2px_2px_0px_#000]">
          <FileText className="w-4 h-4 fill-black" />
          INTERACTIVE BRIEF BUILDER
        </div>
        <h3 className="font-comic text-3xl sm:text-5xl uppercase text-black tracking-wide leading-none">
          CONFIGURE YOUR COMMISSION BRIEF
        </h3>
        <p className="mt-2 text-sm text-neutral-700 font-sans">
          Select your specs below to generate a standardized, high-conversion project brief ready to send via Discord DM or Email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Category Selector */}
          <div>
            <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-comic-pink border border-black inline-block" />
              STEP 1: SELECT ARTWORK CATEGORY
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`
                      border-2 border-black p-2.5 text-center font-nav text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer
                      ${
                        isSelected
                          ? "bg-comic-yellow text-black shadow-neo-sm -translate-x-[1px] -translate-y-[1px]"
                          : "bg-white hover:bg-neutral-50 text-neutral-800"
                      }
                    `}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Project Scope & Reference URL */}
          <div>
            <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-comic-cyan border border-black inline-block" />
              STEP 2: PROJECT SCOPE &amp; DETAILS
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
              {SCOPES.map((sc) => {
                const isSelected = selectedScope === sc.label;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setSelectedScope(sc.label)}
                    className={`
                      border-2 border-black p-3 text-left transition-all select-none cursor-pointer flex flex-col justify-between
                      ${
                        isSelected
                          ? "bg-neutral-900 text-white shadow-neo-sm -translate-x-[1px] -translate-y-[1px]"
                          : "bg-white hover:bg-neutral-50 text-neutral-800"
                      }
                    `}
                  >
                    <span className="font-comic text-base uppercase tracking-wide">
                      {sc.label}
                    </span>
                    <span
                      className={`text-[10px] font-sans mt-1 ${
                        isSelected ? "text-neutral-300" : "text-neutral-500"
                      }`}
                    >
                      {sc.desc}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Reference URL Input */}
            <div className="space-y-3">
              <div>
                <span className="block text-[11px] font-nav font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  REFERENCE LINK (GDRIVE, DROPBOX, PINTEREST, IMGUR)
                </span>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={refLink}
                  onChange={(e) => setRefLink(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-black px-3.5 py-2 font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-comic-yellow"
                />
              </div>

              {/* Character & Scene Notes */}
              <div>
                <span className="block text-[11px] font-nav font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  CHARACTER &amp; SCENE NOTES (POSE, EXPRESSION, PALETTE, VIBE)
                </span>
                <textarea
                  rows={3}
                  placeholder="e.g. Dynamic action stance with energy blade, cybernetic arm glow, confident smirk, neon purple/teal atmospheric lighting..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-neutral-50 border-2 border-black p-3 font-sans text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-comic-yellow"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Timeline & Commercial Licensing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                TIMELINE TARGET
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-white border-2 border-black px-3 py-2 font-nav text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-comic-yellow cursor-pointer"
              >
                {TIMELINES.map((t) => (
                  <option key={t.id} value={t.label}>
                    {t.label} - {t.note}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                COMMERCIAL USAGE RIGHTS
              </label>
              <button
                type="button"
                onClick={() => setIsCommercial((prev) => !prev)}
                className={`
                  w-full border-2 border-black py-2 px-3 text-left font-nav text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer flex items-center justify-between
                  ${
                    isCommercial
                      ? "bg-comic-green text-black shadow-neo-sm"
                      : "bg-white text-neutral-700 hover:bg-neutral-50"
                  }
                `}
              >
                <span>{isCommercial ? "✓ COMMERCIAL BUYOUT" : "PERSONAL USE ONLY ($0)"}</span>
                <span className="text-[10px] underline">TOGGLE</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Live Brief Preview & Actions (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-900 border-[3px] border-black p-6 sm:p-7 text-white shadow-neo flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b-2 border-neutral-700 pb-3 mb-4">
              <span className="font-comic text-base tracking-widest text-comic-yellow uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 fill-comic-yellow" />
                TRANSMISSION PREVIEW
              </span>
              <span className="bg-white text-black font-nav text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                AUTO-FORMATTED
              </span>
            </div>

            {/* Stylized Terminal Box */}
            <div className="bg-black/90 border border-neutral-700 p-4 font-mono text-[11px] sm:text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-[320px] overflow-y-auto">
              {formattedBrief}
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="mt-6 space-y-3">
            {/* Discord 1-Click Brief Generator */}
            <button
              type="button"
              onClick={handleCopyDiscordBrief}
              className={`
                w-full flex items-center justify-center gap-2 border-[3px] border-black py-3 px-4
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
                  <span>✓ BRIEF COPIED! OPENING DISCORD...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>GENERATE &amp; COPY DISCORD BRIEF</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </>
              )}
            </button>

            {/* Secondary Email Mailto Trigger */}
            <a
              href={mailtoUrl}
              className="
                w-full flex items-center justify-center gap-2 border-2 border-white/60 bg-neutral-800 hover:bg-neutral-700 text-white
                py-2.5 px-4 font-nav text-xs font-bold uppercase tracking-wider transition-all
              "
            >
              <Mail className="w-4 h-4 text-comic-cyan" />
              <span>SEND PRE-FILLED EMAIL BRIEF</span>
            </a>

            <div className="text-center font-nav text-[10px] text-neutral-400 uppercase tracking-wide">
              Direct Discord Tag: <span className="text-white font-mono font-bold">{discordTag}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};