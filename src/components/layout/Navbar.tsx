"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArtistProfile, QueueData } from "@/types/portfolio";
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
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
  const [pricingDropdownOpen, setPricingDropdownOpen] = useState<boolean>(false);
  const dropdownCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

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
      if (e.key === "Escape") {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (pricingDropdownOpen) setPricingDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, pricingDropdownOpen]);

  const handleMouseEnterPricing = () => {
    if (dropdownCloseTimeout.current) {
      clearTimeout(dropdownCloseTimeout.current);
      dropdownCloseTimeout.current = null;
    }
    setPricingDropdownOpen(true);
  };

  const handleMouseLeavePricing = () => {
    dropdownCloseTimeout.current = setTimeout(() => {
      setPricingDropdownOpen(false);
    }, 150);
  };

  const handlePricingKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setPricingDropdownOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!pricingDropdownOpen) {
        setPricingDropdownOpen(true);
      } else if (dropdownMenuRef.current) {
        const firstLink = dropdownMenuRef.current.querySelector<HTMLAnchorElement>("a");
        firstLink?.focus();
      }
    }
  };

  const handleDropdownMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setPricingDropdownOpen(false);
      return;
    }
    const focusable = dropdownMenuRef.current?.querySelectorAll<HTMLAnchorElement>("a");
    if (!focusable || focusable.length === 0) return;

    const items = Array.from(focusable);
    const currentIndex = items.indexOf(document.activeElement as HTMLAnchorElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % items.length;
      items[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + items.length) % items.length;
      items[prevIndex]?.focus();
    }
  };

  const handleNavClick = (
    e: React.MouseEvent,
    target: { href: string; sectionId?: string }
  ) => {
    playClick();
    setMobileMenuOpen(false);
    setPricingDropdownOpen(false);

    if (pathname === "/" && target.sectionId) {
      const el = document.getElementById(target.sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isPricingActive = pathname === "/pricing";
  const isGalleryActive = pathname === "/artworks";
  const isTosActive = pathname === "/tos";

  return (
    <>
      {/* Edge-to-edge Top Bar (Xotoe reference style) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b-[3px] border-black">
        <div className="max-w-6xl mx-auto h-16 md:h-20 px-6 flex items-center justify-between">
          {/* LEFT: EMILIA STUDIO logo in black */}
          <Link
            href="/"
            onClick={playClick}
            className="flex items-center gap-2 select-none cursor-pointer group"
            aria-label="EMILIA STUDIO - Home"
          >
            <span className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight text-black group-hover:text-comic-pink transition-colors">
              EMILIA
            </span>
            <span className="font-mono text-xs md:text-sm font-black uppercase bg-black text-white px-1.5 py-0.5 rounded border border-black group-hover:bg-[#FFE600] group-hover:text-black transition-colors">
              STUDIO
            </span>
          </Link>

          {/* CENTER: Clean horizontal navigation links in bold uppercase */}
          <nav className="hidden md:flex items-center gap-8">
            {/* PRICING with Dropdown Drawer */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnterPricing}
              onMouseLeave={handleMouseLeavePricing}
            >
              <Link
                href={pathname === "/" ? "#pricing" : "/pricing"}
                onClick={(e) =>
                  handleNavClick(e, { href: "/pricing", sectionId: "pricing" })
                }
                onKeyDown={handlePricingKeyDown}
                aria-haspopup="true"
                aria-expanded={pricingDropdownOpen}
                className={`
                  font-nav font-bold text-sm uppercase tracking-wider flex items-center gap-1 transition-colors py-2 select-none
                  ${isPricingActive || pricingDropdownOpen ? "text-black underline underline-offset-4" : "text-black/80 hover:text-black"}
                `}
              >
                <span>PRICING</span>
                <ChevronDown
                  className={`transition-transform duration-150 w-4 h-4 ${pricingDropdownOpen ? "rotate-180" : ""}`}
                />
              </Link>

              {/* Solid White Dropdown Drawer */}
              {pricingDropdownOpen && (
                <div
                  ref={dropdownMenuRef}
                  onKeyDown={handleDropdownMenuKeyDown}
                  className="absolute top-full left-0 z-[60] min-w-[240px] bg-white border-[3px] border-black rounded-xl shadow-[6px_6px_0px_#000] overflow-hidden select-none animate-comic-snap"
                >
                  <div className="flex flex-col divide-y-2 divide-black">
                    <Link
                      href={pathname === "/" ? "#pricing" : "/pricing"}
                      onClick={(e) =>
                        handleNavClick(e, {
                          href: "/pricing",
                          sectionId: "pricing",
                        })
                      }
                      className="group flex items-center justify-between px-4 py-3 font-nav font-bold text-sm uppercase tracking-wider text-black hover:bg-[#FFE600] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-black border border-black px-1 rounded">01</span>
                        <span>RATES &amp; TIERS</span>
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>

                    <Link
                      href={pathname === "/" ? "#calculator" : "/pricing#calculator"}
                      onClick={(e) =>
                        handleNavClick(e, {
                          href: "/pricing#calculator",
                          sectionId: "calculator",
                        })
                      }
                      className="group flex items-center justify-between px-4 py-3 font-nav font-bold text-sm uppercase tracking-wider text-black hover:bg-[#FFE600] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-black border border-black px-1 rounded">02</span>
                        <span>CALCULATOR</span>
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>

                    <Link
                      href={pathname === "/" ? "#tos" : "/tos"}
                      onClick={(e) =>
                        handleNavClick(e, { href: "/tos", sectionId: "tos" })
                      }
                      className="group flex items-center justify-between px-4 py-3 font-nav font-bold text-sm uppercase tracking-wider text-black hover:bg-[#FFE600] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-black border border-black px-1 rounded">03</span>
                        <span>COMMISSION TERMS</span>
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* GALLERY */}
            <Link
              href={pathname === "/" ? "#gallery" : "/artworks"}
              onClick={(e) =>
                handleNavClick(e, { href: "/artworks", sectionId: "gallery" })
              }
              className={`
                font-nav font-bold text-sm uppercase tracking-wider transition-colors py-2 select-none
                ${isGalleryActive ? "text-black underline underline-offset-4" : "text-black/80 hover:text-black"}
              `}
            >
              GALLERY
            </Link>

            {/* TOS */}
            <Link
              href={pathname === "/" ? "#tos" : "/tos"}
              onClick={(e) =>
                handleNavClick(e, { href: "/tos", sectionId: "tos" })
              }
              className={`
                font-nav font-bold text-sm uppercase tracking-wider transition-colors py-2 select-none
                ${isTosActive ? "text-black underline underline-offset-4" : "text-black/80 hover:text-black"}
              `}
            >
              TOS
            </Link>
          </nav>

          {/* RIGHT: SFX toggle + COMMISSION ME button + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Retro SFX Toggle */}
            <button
              type="button"
              onClick={toggleSFX}
              title="Toggle sound effects"
              aria-label="Toggle sound effects"
              className={`
                hidden sm:flex items-center gap-1.5 border-2 border-black rounded-lg font-comic uppercase tracking-wider
                shadow-[2px_2px_0px_#000] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]
                transition-all cursor-pointer select-none px-2.5 py-1.5 text-xs
                ${
                  sfxEnabled
                    ? "bg-[#FFE600] text-black hover:bg-[#FFF033]"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }
              `}
            >
              {sfxEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span className="font-bold text-[11px]">SFX</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 stroke-[2]" />
                  <span className="font-bold text-[11px]">MUTED</span>
                </>
              )}
            </button>

            {/* Primary Action Button: COMMISSION ME → */}
            <Link
              href={pathname === "/" ? "#contact" : "/contact"}
              onClick={(e) =>
                handleNavClick(e, { href: "/contact", sectionId: "contact" })
              }
              className="hidden sm:inline-flex items-center gap-1.5 bg-white hover:bg-black hover:text-white text-black font-black text-xs uppercase px-4 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer font-btn"
            >
              <span>COMMISSION ME</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Hamburger Button (< 768px) */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setMobileMenuOpen((prev) => !prev);
              }}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`
                md:hidden flex items-center justify-center rounded-lg
                border-2 border-black shadow-[2px_2px_0px_#000]
                active:shadow-none active:translate-x-[1px] active:translate-y-[1px]
                transition-colors cursor-pointer w-10 h-10
                ${
                  mobileMenuOpen
                    ? "bg-comic-pink text-white"
                    : "bg-white text-black hover:bg-neutral-100"
                }
              `}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[3]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[3]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Overlay Drawer (< 768px) */}
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
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b-[3px] border-black">
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl font-black uppercase text-black tracking-tight">
                    EMILIA
                  </span>
                  <span className="text-[10px] font-mono font-black bg-black text-white px-1.5 py-0.5 rounded border border-black">
                    STUDIO
                  </span>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-9 h-9 bg-comic-pink hover:bg-[#FFE600] text-white hover:text-black border-[3px] border-black rounded-xl shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center font-black transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[3]" />
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="flex flex-col gap-3 my-6">
                {[
                  {
                    label: "GALLERY",
                    href: "/artworks",
                    sectionId: "gallery",
                    emoji: "🎨",
                  },
                  {
                    label: "PRICING",
                    href: "/pricing",
                    sectionId: "pricing",
                    emoji: "⚡",
                  },
                  {
                    label: "INTERACTIVE CALCULATOR",
                    href: "/pricing#calculator",
                    sectionId: "calculator",
                    emoji: "🧮",
                  },
                  {
                    label: "TERMS OF SERVICE",
                    href: "/tos",
                    sectionId: "tos",
                    emoji: "📜",
                  },
                  {
                    label: "CONTACT",
                    href: "/contact",
                    sectionId: "contact",
                    emoji: "✉️",
                  },
                ].map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname?.startsWith(link.href);

                  return (
                    <Link
                      key={link.label}
                      href={
                        pathname === "/" && link.sectionId
                          ? `#${link.sectionId}`
                          : link.href
                      }
                      onClick={(e) =>
                        handleNavClick(e, {
                          href: link.href,
                          sectionId: link.sectionId,
                        })
                      }
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl border-2 font-nav font-bold uppercase tracking-wider text-sm transition-all
                        ${
                          isActive
                            ? "bg-[#FFE600] text-black border-black shadow-[3px_3px_0px_#000]"
                            : "bg-white text-black border-black hover:bg-neutral-50 shadow-[2px_2px_0px_#000]"
                        }
                      `}
                    >
                      <span className="text-base">{link.emoji}</span>
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t-2 border-black flex flex-col gap-3">
              <Link
                href={pathname === "/" ? "#contact" : "/contact"}
                onClick={(e) =>
                  handleNavClick(e, { href: "/contact", sectionId: "contact" })
                }
                className="w-full text-center py-3 bg-[#FFE600] hover:bg-[#FFF033] text-black font-black uppercase text-xs rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 font-btn transition-all"
              >
                COMMISSION ME →
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
