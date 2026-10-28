"use client";

import React, { useState, useMemo } from "react";
import { ComicButton } from "@/components/ui/ComicButton";
import { useSound } from "@/context/SoundContext";
import {
  FileText,
  Check,
  Mail,
  Sparkles,
  Clock,
  Shield,
  Send,
  Loader2,
  RefreshCw,
  Zap,
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
  const [clientContact, setClientContact] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const resetForm = () => {
    setSelectedCategory("Character Design");
    setSelectedScope("Full Character / Splash");
    setRefLink("");
    setNotes("");
    setTimeline("Standard (1-2 Weeks)");
    setIsCommercial(false);
    setClientContact("");
    setStatus("idle");
    setErrorMessage("");
  };

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
      ...(clientContact.trim() ? [`• Client Contact: ${clientContact.trim()}`] : []),
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Hello Emilia! I generated this structured inquiry brief and would like to check your availability.`,
    ];
    return lines.join("\n");
  }, [selectedCategory, selectedScope, refLink, notes, timeline, isCommercial, clientContact]);

  const handleSubmitBrief = async () => {
    playClick();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/commission-brief", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          scope: selectedScope,
          referenceLink: refLink,
          notes,
          timeline,
          commercialUse: isCommercial,
          clientContact,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${res.status}`);
      }

      playSuccess();
      setStatus("success");
    } catch (error: any) {
      console.error("Submission error:", error);
      setStatus("error");
      setErrorMessage(error?.message || "Failed to transmit brief. Please try again.");
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
          Select your specs below to generate a standardized project brief sent directly to Emilia&apos;s transmission queue.
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
            {/* Client Contact Info (Optional) */}
            <div>
              <span className="block text-[11px] font-nav font-bold uppercase tracking-wider text-neutral-600 mb-1">
                YOUR DISCORD TAG OR EMAIL (FOR EMILIA TO DIRECTLY REPLY)
              </span>
              <input
                type="text"
                placeholder="e.g. your_discord_tag or client@example.com"
                value={clientContact}
                onChange={(e) => setClientContact(e.target.value)}
                className="w-full bg-neutral-50 border-2 border-black px-3.5 py-2 font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-comic-yellow"
              />
            </div>
          </div>
        </div>

        {/* Right Live Brief Preview & Actions (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-900 border-[3px] border-black p-6 sm:p-7 text-white shadow-neo flex flex-col justify-between">
          {status === "success" ? (
            /* Comic Success Screen */
            <div className="py-8 px-4 text-center flex flex-col items-center justify-center my-auto">
              <div className="w-16 h-16 bg-comic-yellow border-[3px] border-black rounded-full flex items-center justify-center shadow-neo mb-5 animate-comic-snap">
                <Zap className="w-9 h-9 text-black fill-black" />
              </div>
              <span className="bg-comic-green text-black font-nav text-xs font-bold px-3 py-1 uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
                TRANSMISSION CONFIRMED
              </span>
              <h4 className="font-comic text-2xl sm:text-3xl uppercase text-white tracking-wide leading-tight mb-3">
                COMMISSION BRIEF TRANSMITTED! ⚡
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed mb-6">
                Your brief has been delivered directly to Emilia&apos;s desk. We&apos;ll be in touch shortly!
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 border-[3px] border-black py-2.5 px-6 font-btn text-xs sm:text-sm font-bold uppercase tracking-wider bg-comic-yellow text-black hover:bg-[#FFF033] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px] shadow-neo transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>SEND ANOTHER INQUIRY</span>
              </button>
            </div>
          ) : (
            <>
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
                {/* Error Banner */}
                {status === "error" && (
                  <div className="bg-comic-pink border-[3px] border-black p-3 shadow-neo-sm text-black">
                    <div className="font-comic text-xs uppercase font-bold">TRANSMISSION FAILED</div>
                    <div className="font-nav text-[11px] mt-0.5">{errorMessage || "Could not transmit brief. Please try again."}</div>
                  </div>
                )}

                {/* Pure Form Submit Button */}
                <button
                  type="button"
                  disabled={status === "loading"}
                  onClick={handleSubmitBrief}
                  className={`
                    w-full flex items-center justify-center gap-2 border-[3px] border-black py-3 px-4
                    font-btn text-xs sm:text-sm font-bold uppercase tracking-wider
                    transition-all duration-75 select-none cursor-pointer shadow-neo
                    ${
                      status === "loading"
                        ? "bg-comic-cyan text-black cursor-wait"
                        : "bg-comic-yellow text-black hover:bg-[#FFF033] hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px]"
                    }
                  `}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>TRANSMITTING BRIEF...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT COMMISSION BRIEF</span>
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
                  Direct Inquiries &amp; Questions: <span className="text-white font-mono font-bold">{email}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};