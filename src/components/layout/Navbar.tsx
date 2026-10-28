"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArtistProfile, QueueData } from "@/types/portfolio";
import {
  MessageCircle,
  Volume2,
  VolumeX,
  Menu,
  X,
  Home,
  Palette,
  Zap,
  FileText,
  Mail,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useSound } from "@/context/SoundContext";

export interface NavbarProps {
  profile: ArtistProfile;
  queueData?: QueueData;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, queueData }) => {
  const pathname = usePathname();
  const { sfxEnabled, toggleSFX, playClick } = useSound();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const openSlots = queueData?.slots?.filter((s) => s.status === "OPEN").length ?? 1;

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "HOME", href: "/", sectionId: "hero-section", emoji: "🏠" },
    { label: "GALLERY", href: "/artworks", sectionId: "artworks-section", emoji: "🎨" },
    { label: "PRICING & QUEUE", href: "/pricing", sectionId: "pricing-section", emoji: "⚡" },
    { label: "TERMS OF SERVICE", href: "/tos", sectionId: "tos-section", emoji: "📜" },
    { label: "CONTACT", href: "/contact", sectionId: "contact-section", emoji: "✉️" },
  ];

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    playClick();
    setMobileMenuOpen(false);

    // On mobile and on homepage, smooth scroll directly to the section if present
    if (pathname === "/" && link.sectionId) {
      const el = document.getElementById(link.sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-[4px] border-b-[3px] border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand / Artist Identifier */}
          <Link href="/" onClick={playClick} className="flex items-center gap-2.5 mr-3 lg:mr-6 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 border-[3px] border-black bg-comic-yellow overflow-hidden shadow-[2px_2px_0px_#000] group-hover:rotate-6 transition-transform duration-200 flex-shrink-0">
              <Image
                src="/assets/artworks/artwork_samples/pfp/28.jpg"
                alt={`${profile.name} Avatar`}
                fill
                sizes="40px"
                className="object-cover w-full h-full pointer-events-none select-none"
                priority
              />
            </div>
            <span className="font-comic text-2xl sm:text-3xl tracking-wider font-extrabold text-black uppercase">
              EMILIA
            </span>
          </Link>

          {/* Desktop Multi-page Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-3">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={playClick}
                  className={`
                    font-nav text-xs lg:text-sm font-bold uppercase tracking-wider px-3 py-1.5 transition-all
                    ${
                      isActive
                        ? "bg-comic-yellow text-black border-2 border-black shadow-[2px_2px_0px_#000] -translate-y-0.5"
                        : "text-black hover:text-comic-pink hover:bg-neutral-100 border-2 border-transparent"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Controls & Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Retro SFX Neo-Brutalist Toggle */}
            <button
              type="button"
              onClick={toggleSFX}
              title={sfxEnabled ? "Mute Comic SFX" : "Enable Comic SFX"}
              aria-label={sfxEnabled ? "Mute sound effects" : "Enable sound effects"}
              className={`
                flex items-center gap-1.5 border-[3px] border-black px-2 sm:px-2.5 py-1 font-comic text-xs uppercase tracking-wider
                shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]
                transition-all cursor-pointer select-none
                ${
                  sfxEnabled
                    ? "bg-comic-yellow text-black hover:bg-[#FFF033]"
                    : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                }
              `}
            >
              {sfxEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="font-bold hidden xs:inline">SFX: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 stroke-[2]" />
                  <span className="font-bold hidden xs:inline">SFX: OFF</span>
                </>
              )}
            </button>

            {/* Desktop Live Queue Indicator */}
            <Link
              href="/pricing"
              onClick={playClick}
              className="hidden md:inline-flex items-center gap-1.5 bg-comic-green/20 border-2 border-black px-2.5 py-1 text-xs font-nav font-bold uppercase tracking-wider text-black hover:bg-comic-green/40 transition-colors"
              title="View Live Queue"
            >
              <span className="w-2 h-2 bg-comic-green border border-black animate-ping" />
              <span>QUEUE: {openSlots} SLOT{openSlots === 1 ? "" : "S"} LEFT</span>
            </Link>

            {/* Hire Artist Button (Desktop & Tablet) */}
            <Link href="/contact" onClick={playClick} className="hidden sm:inline-block">
              <button className="flex items-center gap-1.5 bg-comic-yellow text-black border-2 border-black px-3.5 sm:px-4 py-1.5 font-btn text-xs font-bold uppercase tracking-wider shadow-neo-sm hover:shadow-neo hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer">
                <MessageCircle className="w-4 h-4" />
                <span>HIRE ARTIST</span>
              </button>
            </Link>

            {/* Neo-Brutalist Comic Hamburger Button (< 768px) */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setMobileMenuOpen((prev) => !prev);
              }}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`
                md:hidden flex items-center justify-center w-10 h-10
                border-[3px] border-black shadow-[3px_3px_0px_#000]
                active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                transition-all cursor-pointer
                ${mobileMenuOpen ? "bg-comic-pink text-white" : "bg-comic-yellow text-black hover:bg-[#FFF033]"}
              `}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[3]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[3]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Overlay Drawer (< 768px) Outside header constraints */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Right-Aligned Drawer Panel */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            className="
              fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-xs h-full
              bg-white border-l-[4px] border-black p-6
              shadow-[-8px_0px_0px_#000] overflow-y-auto select-none
              flex flex-col justify-between
            "
          >
            {/* Top Area: Header + Navigation Links */}
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b-[3px] border-black">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-9 h-9 border-[3px] border-black bg-comic-yellow overflow-hidden shadow-[2px_2px_0px_#000] flex-shrink-0">
                    <Image
                      src="/assets/artworks/artwork_samples/pfp/28.jpg"
                      alt={`${profile.name} Avatar`}
                      fill
                      sizes="36px"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-comic text-2xl font-black text-black leading-none uppercase tracking-wide">
                      EMILIA
                    </span>
                    <span className="font-nav text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-0.5">
                      NAVIGATION MENU
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 bg-comic-pink hover:bg-comic-yellow text-white hover:text-black border-[3px] border-black shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center font-black transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[3]" />
                </button>
              </div>

              {/* Navigation Links List (Full-Width Neo-Brutalist Buttons) */}
              <nav className="flex flex-col gap-3 my-6">
                {navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname?.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={pathname === "/" && link.sectionId ? `#${link.sectionId}` : link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`
                        w-full text-left font-black tracking-wider text-base py-3 px-4
                        border-[3px] border-black flex items-center justify-between
                        active:translate-x-1 active:translate-y-1 shadow-[4px_4px_0px_#000] active:shadow-none
                        transition-all cursor-pointer font-comic
                        ${
                          isActive
                            ? "bg-comic-yellow text-black -translate-x-0.5 -translate-y-0.5 shadow-[5px_5px_0px_#000]"
                            : "bg-yellow-300 hover:bg-yellow-400 text-black"
                        }
                      `}
                    >
                      <span className="flex items-center gap-2.5">
                        <span>{link.emoji}</span>
                        <span>{link.label}</span>
                      </span>
                      <span className="text-sm font-sans font-black">»</span>
                    </Link>
                  );
                })}

                {/* Primary Commission CTA */}
                <Link
                  href={pathname === "/" ? "#contact-section" : "/contact"}
                  onClick={(e) => {
                    playClick();
                    setMobileMenuOpen(false);
                    if (pathname === "/") {
                      const el = document.getElementById("contact-section");
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="
                    mt-1 w-full text-center font-comic font-black tracking-wider text-base py-3 px-4
                    border-[3px] border-black bg-comic-pink hover:bg-[#FF1A53] text-white
                    flex items-center justify-center gap-2
                    shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1
                    transition-all cursor-pointer uppercase
                  "
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  <span>START COMMISSION BRIEF</span>
                </Link>
              </nav>
            </div>

            {/* Drawer Footer with Queue, Discord & SFX */}
            <div className="pt-4 border-t-[3px] border-black space-y-2.5">
              {/* Queue Status Comic Pill */}
              <div className="flex items-center justify-between bg-comic-green/20 border-2 border-black p-2.5">
                <span className="font-nav text-xs font-bold uppercase tracking-wider text-black flex items-center gap-2">
                  <span className="w-2 h-2 bg-comic-green border border-black animate-ping" />
                  LIVE QUEUE:
                </span>
                <span className="font-mono text-xs font-black uppercase bg-black text-white px-2 py-0.5 border border-black">
                  {openSlots} SLOT{openSlots === 1 ? "" : "S"} LEFT
                </span>
              </div>

              {/* SFX Quick Toggle in Drawer */}
              <button
                type="button"
                onClick={toggleSFX}
                className={`
                  w-full flex items-center justify-between border-2 border-black p-2 font-comic text-xs uppercase tracking-wider
                  shadow-neo-sm active:shadow-none transition-all cursor-pointer
                  ${
                    sfxEnabled
                      ? "bg-comic-yellow text-black"
                      : "bg-neutral-200 text-neutral-700"
                  }
                `}
              >
                <span className="flex items-center gap-2 font-bold font-nav text-xs">
                  {sfxEnabled ? <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" /> : <VolumeX className="w-3.5 h-3.5 stroke-[2]" />}
                  SFX AUDIO:
                </span>
                <span className="font-bold font-mono">
                  {sfxEnabled ? "[ 🔊 ON ]" : "[ 🔇 OFF ]"}
                </span>
              </button>

              {/* Discord Handle Pill */}
              <div className="flex items-center justify-between border-2 border-black bg-neutral-100 p-2">
                <span className="font-nav text-[11px] font-bold text-neutral-600 uppercase">
                  DISCORD TAG:
                </span>
                <span className="font-mono text-xs font-black text-black">
                  {profile.discordTag}
                </span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
