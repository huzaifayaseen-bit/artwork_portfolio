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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const dropdownCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const dropdownMenuRef = useRef<HTMLDivElement | null>(null);

  const openSlots = queueData?.slots?.filter((s) => s.status === "OPEN").length ?? 1;

  // Track scroll position for compact pill morphing
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setIsScrolled(scrollTop > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Floating Neo-Brutalist Island Container with Scroll-Triggered Shrink Animation */}
      <header
        className={`
          fixed left-4 right-4 z-50 mx-auto border-2 border-black flex items-center justify-between
          transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
          ${
            isScrolled
              ? "max-w-4xl !bg-white py-1.5 px-5 top-2.5 shadow-[3px_3px_0px_#000] rounded-full"
              : "max-w-7xl bg-[#FF6B35] py-3 sm:py-3.5 px-4 sm:px-6 lg:px-8 top-3.5 shadow-[4px_4px_0px_#000] rounded-2xl"
          }
        `}
      >
        {/* 1. LEFT: Desktop Navigation Links with Pricing Dropdown Drawer */}
        <div className={`hidden lg:flex items-center transition-all duration-300 ${isScrolled ? "gap-0.5 xl:gap-1" : "gap-1 xl:gap-2"}`}>
          {/* PRICING with Neo-Brutalist Dropdown Drawer */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterPricing}
            onMouseLeave={handleMouseLeavePricing}
          >
            <Link
              href={pathname === "/" ? "#pricing-section" : "/pricing"}
              onClick={(e) =>
                handleNavClick(e, { href: "/pricing", sectionId: "pricing-section" })
              }
              onKeyDown={handlePricingKeyDown}
              aria-haspopup="true"
              aria-expanded={pricingDropdownOpen}
              className={`
                font-nav font-bold uppercase tracking-wider border-2 transition-all flex items-center gap-1 select-none
                ${pricingDropdownOpen ? "rounded-t-full rounded-b-none border-b-black" : "rounded-full"}
                ${isScrolled ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"}
                ${
                  isPricingActive || pricingDropdownOpen
                    ? "bg-[#FFE600] text-black border-black shadow-[2px_2px_0px_#000]"
                    : "text-black border-transparent hover:border-black hover:bg-[#FFE600] hover:shadow-[2px_2px_0px_#000]"
                }
              `}
            >
              <span>PRICING</span>
              <ChevronDown
                className={`transition-transform duration-150 ${
                  isScrolled ? "w-3 h-3" : "w-3.5 h-3.5"
                } ${pricingDropdownOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {/* Neo-Brutalist Solid White Dropdown Drawer */}
            {pricingDropdownOpen && (
              <div
                ref={dropdownMenuRef}
                onKeyDown={handleDropdownMenuKeyDown}
                className="absolute top-[calc(100%+8px)] left-0 z-[60] min-w-[240px] max-w-[calc(100vw-32px)] bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_#000] overflow-hidden select-none animate-comic-snap"
              >
                <div className="flex flex-col divide-y-2 divide-black">
                  <Link
                    href={pathname === "/" ? "#calculator-section" : "/pricing#calculator"}
                    onClick={(e) =>
                      handleNavClick(e, {
                        href: "/pricing#calculator",
                        sectionId: "calculator-section",
                      })
                    }
                    className="group flex items-center justify-between px-4 py-3 font-nav font-bold text-[14px] sm:text-[15px] uppercase tracking-[0.05em] text-black hover:bg-[#FFE600] focus-visible:bg-[#FFE600] focus-visible:outline-none transition-colors duration-120 cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="bg-transparent text-black border-2 border-black px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-mono font-black shadow-[1px_1px_0px_#000]">
                        01
                      </span>
                      <span>CALCULATOR</span>
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:translate-x-0.5 transition-all text-sm font-black">
                      →
                    </span>
                  </Link>

                  <Link
                    href={pathname === "/" ? "#pricing-section" : "/pricing"}
                    onClick={(e) =>
                      handleNavClick(e, {
                        href: "/pricing",
                        sectionId: "pricing-section",
                      })
                    }
                    className="group flex items-center justify-between px-4 py-3 font-nav font-bold text-[14px] sm:text-[15px] uppercase tracking-[0.05em] text-black hover:bg-[#FFE600] focus-visible:bg-[#FFE600] focus-visible:outline-none transition-colors duration-120 cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="bg-transparent text-black border-2 border-black px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-mono font-black shadow-[1px_1px_0px_#000]">
                        02
                      </span>
                      <span>RATES &amp; TIERS</span>
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:translate-x-0.5 transition-all text-sm font-black">
                      →
                    </span>
                  </Link>

                  <Link
                    href={pathname === "/" ? "#tos-section" : "/tos"}
                    onClick={(e) =>
                      handleNavClick(e, { href: "/tos", sectionId: "tos-section" })
                    }
                    className="group flex items-center justify-between px-4 py-3 font-nav font-bold text-[14px] sm:text-[15px] uppercase tracking-[0.05em] text-black hover:bg-[#FFE600] focus-visible:bg-[#FFE600] focus-visible:outline-none transition-colors duration-120 cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="bg-transparent text-black border-2 border-black px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-mono font-black shadow-[1px_1px_0px_#000]">
                        03
                      </span>
                      <span>COMMISSION TERMS</span>
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:translate-x-0.5 transition-all text-sm font-black">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* GALLERY Link */}
          <Link
            href={pathname === "/" ? "#artworks-section" : "/artworks"}
            onClick={(e) =>
              handleNavClick(e, { href: "/artworks", sectionId: "artworks-section" })
            }
            className={`
              font-nav font-bold uppercase tracking-wider rounded-full border-2 transition-all select-none
              ${isScrolled ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"}
              ${
                isGalleryActive
                  ? "bg-[#FFE600] text-black border-black shadow-[2px_2px_0px_#000]"
                  : "text-black border-transparent hover:border-black hover:bg-[#FFE600] hover:shadow-[2px_2px_0px_#000]"
              }
            `}
          >
            GALLERY
          </Link>

          {/* TOS Link */}
          <Link
            href={pathname === "/" ? "#tos-section" : "/tos"}
            onClick={(e) =>
              handleNavClick(e, { href: "/tos", sectionId: "tos-section" })
            }
            className={`
              font-nav font-bold uppercase tracking-wider rounded-full border-2 transition-all select-none
              ${isScrolled ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"}
              ${
                isTosActive
                  ? "bg-[#FFE600] text-black border-black shadow-[2px_2px_0px_#000]"
                  : "text-black border-transparent hover:border-black hover:bg-[#FFE600] hover:shadow-[2px_2px_0px_#000]"
              }
            `}
          >
            TOS
          </Link>
        </div>

        {/* 2. CENTER: Bored Cow Style Chunky Stacked Brand Mark */}
        <div className="flex-1 lg:flex-initial flex justify-start lg:justify-center">
          <Link
            href="/"
            onClick={playClick}
            className="flex flex-col items-center justify-center leading-[0.85] select-none cursor-pointer group"
            aria-label="EMILIA STUDIO - Home"
          >
            <span
              className={`
                font-black tracking-normal uppercase font-display text-black group-hover:text-comic-pink transition-all duration-300 drop-shadow-[1px_1px_0px_#000]
                ${isScrolled ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl"}
              `}
            >
              EMILIA
            </span>
            <span
              className={`
                font-black tracking-widest uppercase font-mono bg-black text-[#FFE600] rounded-sm group-hover:bg-[#FFE600] group-hover:text-black border border-black shadow-[1px_1px_0px_#000] transition-all duration-300 -mt-0.5
                ${isScrolled ? "text-[8px] px-1 py-0.2" : "text-[10px] px-1.5 py-0.5"}
              `}
            >
              STUDIO
            </span>
          </Link>
        </div>

        {/* 3. RIGHT: Audio Toggle + Live Queue Pill Badge + COMMISSION ME CTA + Mobile Hamburger */}
        <div className={`flex items-center transition-all duration-300 ${isScrolled ? "gap-1.5 sm:gap-2" : "gap-2 sm:gap-2.5"}`}>
          {/* Retro SFX Neo-Brutalist Toggle */}
          <button
            type="button"
            onClick={toggleSFX}
            title="Toggle sound effects"
            aria-label="Toggle sound effects"
            className={`
              hidden sm:flex items-center gap-1 border-2 border-black rounded-lg font-comic uppercase tracking-wider
              shadow-[2px_2px_0px_#000] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]
              transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black
              ${isScrolled ? "px-1.5 py-0.5 text-[10px]" : "px-2 py-1 text-xs"}
              ${
                sfxEnabled
                  ? "bg-[#FFE600] text-black hover:bg-[#FFF033]"
                  : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
              }
            `}
          >
            {sfxEnabled ? (
              <>
                <Volume2 className={isScrolled ? "w-3 h-3 stroke-[2.5]" : "w-3.5 h-3.5 stroke-[2.5]"} />
                <span className="font-bold hidden md:inline text-[10px]">SFX</span>
              </>
            ) : (
              <>
                <VolumeX className={isScrolled ? "w-3 h-3 stroke-[2]" : "w-3.5 h-3.5 stroke-[2]"} />
                <span className="font-bold hidden md:inline text-[10px]">MUTED</span>
              </>
            )}
          </button>

          {/* Primary Action Button: COMMISSION ME (White on top, Yellow when scrolled) */}
          <Link
            href={pathname === "/" ? "#contact-section" : "/contact"}
            onClick={(e) =>
              handleNavClick(e, { href: "/contact", sectionId: "contact-section" })
            }
            className="hidden sm:inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xl"
          >
            <span
              className={`
                text-black font-black uppercase border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-300 cursor-pointer inline-flex items-center gap-1 font-btn
                ${
                  isScrolled
                    ? "px-3 py-1.5 text-[11px] rounded-full bg-[#FFE600] hover:bg-[#FFF033]"
                    : "px-4 py-2 text-xs rounded-xl bg-white hover:bg-neutral-100"
                }
              `}
            >
              <span>COMMISSION ME</span>
              <ArrowRight className={isScrolled ? "w-3 h-3" : "w-3.5 h-3.5"} />
            </span>
          </Link>

          {/* Neo-Brutalist Comic Hamburger Button (< 1024px) */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`
              lg:hidden flex items-center justify-center rounded-xl
              border-2 border-black shadow-[2px_2px_0px_#000]
              active:shadow-none active:translate-x-[1px] active:translate-y-[1px]
              transition-all duration-300 cursor-pointer
              ${isScrolled ? "w-8 h-8" : "w-9 h-9"}
              ${
                mobileMenuOpen
                  ? "bg-comic-pink text-white"
                  : "bg-[#FFE600] text-black hover:bg-[#FFF033]"
              }
            `}
          >
            {mobileMenuOpen ? (
              <X className={isScrolled ? "w-4 h-4 stroke-[3]" : "w-5 h-5 stroke-[3]"} />
            ) : (
              <Menu className={isScrolled ? "w-4 h-4 stroke-[3]" : "w-5 h-5 stroke-[3]"} />
            )}
          </button>
        </div>
      </header>

      {/* Full Screen Overlay Drawer (< 1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
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
                <div className="flex flex-col items-start leading-[0.85]">
                  <span className="font-display text-2xl font-black uppercase text-black tracking-tight drop-shadow-[1px_1px_0px_#000]">
                    EMILIA
                  </span>
                  <span className="text-[10px] font-mono font-black bg-black text-[#FFE600] px-1.5 py-0.5 rounded-sm border border-black shadow-[1px_1px_0px_#000] -mt-0.5">
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
                    sectionId: "artworks-section",
                    emoji: "🎨",
                  },
                  {
                    label: "PRICING",
                    href: "/pricing",
                    sectionId: "pricing-section",
                    emoji: "⚡",
                  },
                  {
                    label: "INTERACTIVE CALCULATOR",
                    href: "/pricing#calculator",
                    sectionId: "calculator-section",
                    emoji: "🧮",
                  },
                  {
                    label: "TERMS OF SERVICE",
                    href: "/tos",
                    sectionId: "tos-section",
                    emoji: "📜",
                  },
                  {
                    label: "CONTACT",
                    href: "/contact",
                    sectionId: "contact-section",
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
                      onClick={(e) => handleNavClick(e, link)}
                      className={`
                        w-full text-left font-black tracking-wider text-sm py-3 px-4 rounded-xl
                        border-[3px] border-black flex items-center justify-between
                        active:translate-x-1 active:translate-y-1 shadow-[4px_4px_0px_#000] active:shadow-none
                        transition-all cursor-pointer font-comic
                        ${
                          isActive
                            ? "bg-[#FFE600] text-black -translate-x-0.5 -translate-y-0.5 shadow-[5px_5px_0px_#000]"
                            : "bg-neutral-100 hover:bg-[#FFE600] text-black"
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
                  onClick={(e) =>
                    handleNavClick(e, {
                      href: "/contact",
                      sectionId: "contact-section",
                    })
                  }
                  className="w-full text-center font-btn font-black text-sm uppercase py-3.5 px-4 rounded-xl bg-comic-pink text-white border-[3px] border-black shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all mt-2"
                >
                  ⚡ COMMISSION ME NOW
                </Link>
              </nav>
            </div>

            {/* Mobile Footer Status */}
            <div className="pt-4 border-t-2 border-black flex items-center justify-between text-xs font-nav font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>SLOTS: {openSlots} LEFT</span>
              </span>
              <button
                type="button"
                onClick={toggleSFX}
                className="font-mono text-[10px] uppercase font-bold underline"
              >
                SFX: {sfxEnabled ? "ON" : "OFF"}
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
