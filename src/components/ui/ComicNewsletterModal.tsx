"use client";

import React, { useState, useEffect } from "react";
import { X, Zap, Star, Rocket, Check, Shield } from "lucide-react";

export const ComicNewsletterModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already dismissed or subscribed in this browser
    const hasSeenModal = localStorage.getItem("hasSeenSquadModal");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("hasSeenSquadModal", "true");
    setIsOpen(false);
  };

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitted(true);
    localStorage.setItem("hasSeenSquadModal", "true");
    setTimeout(() => {
      setIsOpen(false);
    }, 2200);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-150 animate-in fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-md bg-white border-[4px] border-black shadow-[8px_8px_0px_#000] text-black select-none transition-transform duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Comic Sticker 1: Top-Left Lightning Bolt Badge */}
        <div className="absolute -top-4 -left-4 z-20 bg-comic-cyan border-[3px] border-black p-2.5 shadow-[3px_3px_0px_#000] rotate-[-12deg] flex items-center justify-center pointer-events-none">
          <Zap className="w-5 h-5 text-black fill-comic-yellow stroke-[2.5]" />
        </div>

        {/* Comic Sticker 2: Right-Side Comic Star Badge */}
        <div className="absolute -top-3 right-12 z-20 bg-comic-pink border-[3px] border-black px-2.5 py-1 shadow-[3px_3px_0px_#000] rotate-[8deg] flex items-center gap-1 pointer-events-none">
          <Star className="w-3.5 h-3.5 fill-comic-yellow text-black stroke-[2]" />
          <span className="font-nav text-[10px] font-black uppercase text-white tracking-widest">
            VIP PASS
          </span>
        </div>

        {/* Comic Sticker 3: Bottom-Left Tilted Yellow Sticker */}
        <div className="absolute -bottom-4 -left-3 z-20 bg-comic-yellow border-[3px] border-black px-3 py-1 shadow-[3px_3px_0px_#000] rotate-[-6deg] pointer-events-none">
          <span className="font-comic text-sm tracking-wider text-black font-bold">
            ★ 100% FREE ★
          </span>
        </div>

        {/* Top-Right Square Tactile Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute -top-3 -right-3 z-30 w-9 h-9 bg-comic-yellow hover:bg-comic-pink text-black hover:text-white border-[3px] border-black shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center font-comic text-xl font-bold transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 stroke-[3]" />
        </button>

        {/* Top Header Banner */}
        <div className="bg-comic-yellow border-b-[4px] border-black px-6 pt-6 pb-4 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-black text-comic-yellow px-2.5 py-0.5 font-nav text-[10px] font-black uppercase tracking-widest mb-1.5">
            <Zap className="w-3 h-3 fill-comic-yellow text-black" />
            COMMISSION DROP ALERT
          </div>
          <h2 className="font-comic text-4xl sm:text-5xl uppercase tracking-wider text-black leading-none drop-shadow-[2px_2px_0px_rgba(255,255,255,0.8)]">
            JOIN THE SQUAD!
          </h2>
          <p className="mt-2 font-nav text-xs font-bold text-neutral-800 uppercase tracking-wide">
            Fill out the form below to get instant queue priority &amp; exclusive slot drops.
          </p>
        </div>

        {/* Body Content / Form */}
        <div className="p-6 sm:p-7 pt-5">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 bg-comic-green border-[3px] border-black mx-auto flex items-center justify-center shadow-[4px_4px_0px_#000]">
                <Check className="w-8 h-8 text-black stroke-[3]" />
              </div>
              <h3 className="font-comic text-2xl uppercase tracking-wider text-black">
                YOU&apos;RE ON THE LIST!
              </h3>
              <p className="font-sans text-xs text-neutral-600 max-w-xs mx-auto">
                Priority access unlocked. Keep an eye on your inbox when new quarterly commission slots open up!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block font-nav text-xs font-black uppercase tracking-wider text-black mb-1.5 flex items-center gap-1">
                  <span className="text-comic-pink">⚡</span>
                  YOUR NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border-[3px] border-black px-3.5 py-2.5 font-nav text-xs font-bold text-black uppercase tracking-wider placeholder:text-neutral-400 placeholder:normal-case focus:bg-white focus:outline-none focus:ring-2 focus:ring-comic-yellow transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block font-nav text-xs font-black uppercase tracking-wider text-black mb-1.5 flex items-center gap-1">
                  <span>✉</span>
                  EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="hero@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAFAFA] border-[3px] border-black px-3.5 py-2.5 font-mono text-xs font-bold text-black placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-comic-yellow transition-all"
                />
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 bg-[#FF4D4D] hover:bg-[#FF3333] active:bg-[#E60000] text-white border-[3px] border-black py-3 px-4 font-btn text-base font-bold uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
              >
                <Rocket className="w-5 h-5" />
                <span>🚀 SIGN ME UP!</span>
              </button>

              {/* Trust Disclaimer */}
              <div className="pt-2 flex items-center justify-center gap-1.5 text-neutral-500 text-[10px] font-nav font-bold uppercase tracking-wider text-center">
                <Shield className="w-3.5 h-3.5 text-neutral-400" />
                <span>No spam ever. Unsubscribe at any time.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
