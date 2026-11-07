"use client";

import React, { useState, useEffect } from "react";

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed bottom-5 right-5 z-40
        group flex items-center justify-center w-11 h-11
        bg-[#FFE600] text-black border-2 border-black rounded-xl
        shadow-[3px_3px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5
        active:bg-black active:text-white transition-all cursor-pointer
        ${visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}
        duration-300
      `}
    >
      <span className="font-black text-lg group-hover:-translate-y-0.5 transition-transform select-none">
        ↑
      </span>
    </button>
  );
};
