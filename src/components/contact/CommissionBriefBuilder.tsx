"use client";

import React, { useState, useMemo, useRef } from "react";
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
  Upload,
  Image as ImageIcon,
  X,
  AlertCircle,
} from "lucide-react";

export interface CommissionBriefBuilderProps {
  discordTag: string;
  email: string;
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
  selectedScope?: string;
  onScopeChange?: (scope: string) => void;
}

export interface ScopeOption {
  id: string;
  label: string;
  desc: string;
}

export const CATEGORY_SCOPES: Record<string, ScopeOption[]> = {
  "CHARACTER DESIGN": [
    { id: "bust", label: "Headshot / Bust ($40)", desc: "Focus on face, hair & expression" },
    { id: "half", label: "Half Body ($80)", desc: "Waist-up with hand pose & weapons" },
    { id: "full", label: "Full Character ($120)", desc: "Full stance with dynamic background" },
  ],
  "BOOK COVER": [
    { id: "ebook", label: "E-Book Front Cover ($80)", desc: "Digital front cover art & focal composition" },
    { id: "wrap", label: "Full Paperback Wrap (Front + Spine + Back) ($140)", desc: "Print-ready continuous spread jacket" },
    { id: "dustjacket", label: "Typographic Title + Illustrated Dust Jacket ($180)", desc: "Custom stylized typography + full wrap" },
  ],
  "MANGA / COMIC PAGE": [
    { id: "single-page", label: "Single Comic Page ($90)", desc: "Multi-panel ink & toned narrative page" },
    { id: "splash-spread", label: "Action Splash Spread ($150)", desc: "Double-page or climactic impact splash" },
    { id: "storyboard", label: "Storyboard / Draft Only ($50)", desc: "Pencil thumbnail layouts & pacing drafts" },
  ],
  "TWITCH / YT BANNER": [
    { id: "banner-header", label: "Standard Header Banner ($50)", desc: "Standard header banner for Twitch or YouTube" },
    { id: "social-pack", label: "Complete Social Media Pack ($90)", desc: "Header banner + avatar + offline screen assets" },
  ],
  "EMOTES SET": [
    { id: "emotes-3x", label: "3x Emotes Pack ($45)", desc: "3 custom expressive emote icons with all sizes" },
    { id: "emotes-6x", label: "6x Emotes Pack ($80)", desc: "6 custom expressive emote icons with all sizes" },
  ],
  "MASCOT LOGO": [
    { id: "mascot-cel", label: "Standard Cel Mascot ($70)", desc: "Clean cel-shaded mascot character icon" },
    { id: "mascot-vector", label: "Full Branding Vector Suite ($130)", desc: "Mascot mark + vector logos + usage guide" },
  ],
};

const CATEGORIES = [
  "CHARACTER DESIGN",
  "BOOK COVER",
  "MANGA / COMIC PAGE",
  "TWITCH / YT BANNER",
  "EMOTES SET",
  "MASCOT LOGO",
];

const TIMELINES = [
  { id: "flexible", label: "Flexible (2-3 Weeks)", note: "Standard pipeline queue" },
  { id: "standard", label: "Standard (1-2 Weeks)", note: "Regular turnaround" },
  { id: "rush", label: "Rush / Urgent (< 7 Days)", note: "+$50 Priority milestone" },
];

export const CommissionBriefBuilder: React.FC<CommissionBriefBuilderProps> = ({
  discordTag,
  email,
  selectedCategory: controlledCategory,
  onCategoryChange,
  selectedScope: controlledScope,
  onScopeChange,
}) => {
  const { playSuccess, playClick } = useSound();
  const [internalCategory, setInternalCategory] = useState<string>("CHARACTER DESIGN");
  const selectedCategory = controlledCategory !== undefined ? controlledCategory : internalCategory;

  const currentScopeOptions = useMemo(() => {
    return CATEGORY_SCOPES[selectedCategory] || CATEGORY_SCOPES["CHARACTER DESIGN"];
  }, [selectedCategory]);

  const [internalScope, setInternalScope] = useState<string>(CATEGORY_SCOPES["CHARACTER DESIGN"][2].label);
  const selectedScope = controlledScope !== undefined ? controlledScope : internalScope;

  const handleCategorySelect = (cat: string) => {
    playClick();
    if (controlledCategory === undefined) {
      setInternalCategory(cat);
    }
    onCategoryChange?.(cat);

    const scopesForCat = CATEGORY_SCOPES[cat] || CATEGORY_SCOPES["CHARACTER DESIGN"];
    const fallbackScope = scopesForCat[0]?.label || "Standard";
    if (controlledScope === undefined) {
      setInternalScope(fallbackScope);
    }
    onScopeChange?.(fallbackScope);
  };

  const handleScopeSelect = (scope: string) => {
    playClick();
    if (controlledScope === undefined) {
      setInternalScope(scope);
    }
    onScopeChange?.(scope);
  };
  const [refLink, setRefLink] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("Standard (1-2 Weeks)");
  const [isCommercial, setIsCommercial] = useState<boolean>(false);
  const [clientContact, setClientContact] = useState<string>("");
  const [contactError, setContactError] = useState<boolean>(false);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [receiptError, setReceiptError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const resetForm = () => {
    handleCategorySelect("CHARACTER DESIGN");
    setRefLink("");
    setNotes("");
    setTimeline("Standard (1-2 Weeks)");
    setIsCommercial(false);
    setClientContact("");
    setContactError(false);
    setReceiptFile(null);
    if (receiptPreview) {
      URL.revokeObjectURL(receiptPreview);
    }
    setReceiptPreview(null);
    setReceiptError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setStatus("idle");
    setErrorMessage("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setReceiptError("Invalid format. Please upload PNG, JPG, or WEBP.");
      setReceiptFile(null);
      if (receiptPreview) URL.revokeObjectURL(receiptPreview);
      setReceiptPreview(null);
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setReceiptError("File exceeds 5MB limit. Please upload a smaller image.");
      setReceiptFile(null);
      if (receiptPreview) URL.revokeObjectURL(receiptPreview);
      setReceiptPreview(null);
      return;
    }

    setReceiptError("");
    setReceiptFile(file);
    if (receiptPreview) URL.revokeObjectURL(receiptPreview);
    setReceiptPreview(URL.createObjectURL(file));
  };

  const removeReceiptFile = () => {
    setReceiptFile(null);
    if (receiptPreview) URL.revokeObjectURL(receiptPreview);
    setReceiptPreview(null);
    setReceiptError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isReceiptValid = !receiptError;

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
    if (!clientContact.trim()) {
      setContactError(true);
      const contactInput = document.getElementById("client-contact-input");
      if (contactInput) contactInput.focus();
      return;
    }

    if (receiptError) {
      const fileInput = fileInputRef.current;
      if (fileInput) fileInput.focus();
      return;
    }

    setContactError(false);
    setReceiptError("");
    playClick();
    setStatus("loading");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("category", selectedCategory);
      formData.append("scope", selectedScope);
      formData.append("referenceLink", refLink);
      formData.append("notes", notes);
      formData.append("timeline", timeline);
      formData.append("commercialUse", String(isCommercial));
      formData.append("clientContact", clientContact.trim());
      if (receiptFile) {
        formData.append("receipt", receiptFile);
      }

      const res = await fetch("/api/commission-brief", {
        method: "POST",
        body: formData,
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
    <div id="brief-builder" className="mt-8 pt-8 border-t-2 border-black/15 relative">
      {/* Builder Header */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-2">
          <div className="inline-flex items-center gap-2 bg-comic-yellow text-black border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider rounded-full shadow-[2px_2px_0px_#000]">
            <FileText className="w-4 h-4 fill-black" />
            INTERACTIVE BRIEF BUILDER
          </div>
          <div className="inline-flex items-center bg-comic-cyan text-black border-2 border-black px-3 py-1 font-nav text-xs font-bold uppercase tracking-wider rounded-full shadow-[2px_2px_0px_#000]">
            TRANSMISSION CODER
          </div>
        </div>
        <h3 className="font-comic text-3xl sm:text-5xl uppercase text-black tracking-wide leading-none">
          CONFIGURE YOUR COMMISSION BRIEF
        </h3>
        <p className="mt-2 text-sm text-neutral-700 font-sans max-w-xl">
          Select your specs below to generate a standardized project brief sent directly to Emilia&apos;s transmission queue.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive Form Fields (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Category Selector */}
          <div>
            <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2.5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-comic-pink border border-black rounded-sm inline-block" />
              STEP 1: SELECT ARTWORK CATEGORY
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategorySelect(cat)}
                    className={`
                      border-2 border-black rounded-xl p-2.5 text-center font-nav text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer
                      ${
                        isSelected
                          ? "bg-comic-yellow text-black shadow-[3px_3px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                          : "bg-white hover:bg-neutral-50 text-neutral-800 shadow-[2px_2px_0px_#000]"
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
              <span className="w-2.5 h-2.5 bg-comic-cyan border border-black rounded-sm inline-block" />
              STEP 2: PROJECT SCOPE &amp; DETAILS
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              {currentScopeOptions.map((sc) => {
                const isSelected = selectedScope === sc.label;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => handleScopeSelect(sc.label)}
                    className={`
                      border-2 border-black rounded-xl p-3 text-left transition-all select-none cursor-pointer flex flex-col justify-between
                      ${
                        isSelected
                          ? "bg-neutral-900 text-white shadow-[3px_3px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                          : "bg-white hover:bg-neutral-50 text-neutral-800 shadow-[2px_2px_0px_#000]"
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
                  className="w-full bg-neutral-50 border-2 border-black rounded-xl px-3.5 py-2 font-mono text-xs focus:bg-white focus:outline-none focus:ring-0 focus:shadow-[3px_3px_0px_#000] transition-shadow"
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
                  className="w-full bg-neutral-50 border-2 border-black rounded-xl p-3 font-sans text-xs focus:bg-white focus:outline-none focus:ring-0 focus:shadow-[3px_3px_0px_#000] transition-shadow"
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
                className="w-full bg-white border-2 border-black rounded-xl px-3 py-2 font-nav text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-0 focus:shadow-[3px_3px_0px_#000] cursor-pointer transition-shadow"
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
                  w-full border-2 border-black rounded-xl py-2 px-3 text-left font-nav text-xs font-bold uppercase tracking-wider transition-all select-none cursor-pointer flex items-center justify-between
                  ${
                    isCommercial
                      ? "bg-comic-green text-black shadow-[3px_3px_0px_#000] -translate-x-[1px] -translate-y-[1px]"
                      : "bg-white text-neutral-700 hover:bg-neutral-50 shadow-[2px_2px_0px_#000]"
                  }
                `}
              >
                <span>{isCommercial ? "✓ COMMERCIAL BUYOUT" : "PERSONAL USE ONLY ($0)"}</span>
                <span className="text-[10px] underline">TOGGLE</span>
              </button>
            </div>
            {/* Client Contact Info (Required) */}
            <div className="sm:col-span-2">
              <label htmlFor="client-contact-input" className="block text-[11px] font-nav font-bold uppercase tracking-wider text-neutral-600 mb-1 flex items-center justify-between">
                <span>YOUR DISCORD TAG OR EMAIL (REQUIRED) *</span>
                {contactError && (
                  <span className="text-comic-pink font-bold text-[10px] uppercase">REQUIRED TO TRANSMIT</span>
                )}
              </label>
              <input
                id="client-contact-input"
                type="text"
                required
                placeholder="e.g. your_discord_tag or client@example.com"
                value={clientContact}
                onChange={(e) => {
                  setClientContact(e.target.value);
                  if (contactError && e.target.value.trim()) {
                    setContactError(false);
                  }
                }}
                className={`w-full bg-neutral-50 border-2 rounded-xl px-3.5 py-2 font-mono text-xs focus:bg-white focus:outline-none transition-shadow ${
                  contactError
                    ? "border-comic-pink shadow-[3px_3px_0px_#FF2E93] bg-red-50/50"
                    : "border-black focus:shadow-[3px_3px_0px_#000]"
                }`}
              />
            </div>

            {/* Step 4: Proof of Payment / Deposit Screenshot (Optional) */}
            <div className="sm:col-span-2 pt-2 border-t-2 border-dashed border-neutral-300">
              <label className="block font-nav text-xs font-bold uppercase tracking-wider text-neutral-700 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  PROOF OF PAYMENT / DEPOSIT (OPTIONAL - FOR PRIORITY QUEUE)
                </span>
                <span className="text-[10px] font-mono text-neutral-500 font-normal">PNG, JPG, WEBP &lt; 5MB</span>
              </label>

              <input
                ref={fileInputRef}
                type="file"
                id="receipt-file-input"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />

              {!receiptFile ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all bg-neutral-50 hover:bg-neutral-100 flex flex-col items-center justify-center gap-2
                    ${receiptError ? "border-comic-pink bg-red-50/40" : "border-neutral-400 hover:border-black"}
                  `}
                >
                  <div className="w-10 h-10 rounded-full bg-comic-yellow/50 border border-black flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-neutral-800" />
                  </div>
                  <div>
                    <span className="font-nav text-xs font-bold uppercase tracking-wide text-neutral-800 block">
                      CLICK TO UPLOAD PAYMENT RECEIPT
                    </span>
                    <span className="text-[11px] text-neutral-500 font-sans block mt-0.5">
                      Screenshots from PayPal, Stripe, Ko-fi, Wise, or Bank Transfer
                    </span>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-black rounded-xl bg-comic-green/10 p-3 flex items-center justify-between gap-3 shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-3 min-w-0">
                    {receiptPreview ? (
                      <img
                        src={receiptPreview}
                        alt="Receipt preview"
                        className="w-12 h-12 object-cover border border-black rounded-lg flex-shrink-0 bg-white"
                      />
                    ) : (
                      <div className="w-12 h-12 border border-black rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-6 h-6 text-neutral-600" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-comic-green text-black font-nav text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider border border-black rounded">
                          ATTACHED
                        </span>
                        <p className="font-mono text-xs font-bold truncate text-black">{receiptFile.name}</p>
                      </div>
                      <p className="text-[10px] text-neutral-600 font-mono mt-0.5">
                        {(receiptFile.size / (1024 * 1024)).toFixed(2)} MB • {receiptFile.type.replace("image/", "").toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeReceiptFile}
                    className="p-1.5 border border-black rounded-lg bg-white hover:bg-comic-pink text-black transition-colors cursor-pointer flex-shrink-0"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {receiptError && (
                <div className="mt-2 text-comic-pink font-nav text-[11px] font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{receiptError}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Live Brief Preview & Actions (5 cols) */}
        <div className="lg:col-span-5 bg-neutral-900 border-[3px] border-black rounded-2xl p-6 sm:p-7 text-white shadow-[6px_6px_0px_#FFE600] flex flex-col justify-between">
          {status === "success" ? (
            /* Comic Success Screen */
            <div className="py-8 px-4 text-center flex flex-col items-center justify-center my-auto">
              <div className="w-16 h-16 bg-comic-yellow border-[3px] border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_#000] mb-5 animate-comic-snap">
                <Zap className="w-9 h-9 text-black fill-black" />
              </div>
              <span className="bg-comic-green text-black font-nav text-xs font-bold px-3 py-1 uppercase tracking-wider border-2 border-black rounded-full shadow-[2px_2px_0px_#000] mb-3">
                TRANSMISSION CONFIRMED
              </span>
              <h4 className="font-comic text-2xl sm:text-3xl uppercase text-white tracking-wide leading-tight mb-3">
                BRIEF TRANSMITTED TO EMILIA! ⚡
              </h4>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 max-w-sm mx-auto leading-relaxed mb-6">
                Check your Discord/Email soon for our reply. Your brief has been delivered directly to Emilia&apos;s desk.
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 border-2 border-black py-2.5 px-6 font-btn text-xs sm:text-sm font-bold uppercase tracking-wider bg-comic-yellow text-black hover:bg-[#FFF033] hover:-translate-x-[1px] hover:-translate-y-[1px] rounded-xl shadow-[3px_3px_0px_#000] transition-all cursor-pointer"
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
                  <span className="bg-white text-black font-nav text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-md">
                    AUTO-FORMATTED
                  </span>
                </div>

                {/* Stylized Terminal Box */}
                <div className="bg-black/90 border border-neutral-700 rounded-xl p-4 font-mono text-[11px] sm:text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-[320px] overflow-y-auto">
                  {formattedBrief}
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <div className="mt-6 space-y-3">
                {/* Error Banner */}
                {status === "error" && (
                  <div className="bg-comic-pink border-2 border-black rounded-xl p-3 shadow-[3px_3px_0px_#000] text-black">
                    <div className="font-comic text-xs uppercase font-bold">TRANSMISSION FAILED</div>
                    <div className="font-nav text-[11px] mt-0.5">{errorMessage || "Could not transmit brief. Please try again."}</div>
                  </div>
                )}

                {/* Pure Form Submit Button */}
                <button
                  type="button"
                  disabled={status === "loading" || !isReceiptValid || !clientContact.trim()}
                  onClick={handleSubmitBrief}
                  className={`
                    w-full flex items-center justify-center gap-2 border-2 border-black rounded-xl py-3 px-4
                    font-btn text-xs sm:text-sm font-bold uppercase tracking-wider
                    transition-all duration-75 select-none shadow-[3px_3px_0px_#000]
                    ${
                      status === "loading"
                        ? "bg-comic-cyan text-black cursor-wait"
                        : !isReceiptValid || !clientContact.trim()
                        ? "bg-neutral-300 text-neutral-500 border-neutral-600 cursor-not-allowed shadow-none opacity-80"
                        : "bg-comic-yellow text-black hover:bg-[#FFF033] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1px] active:translate-y-[1px] cursor-pointer"
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