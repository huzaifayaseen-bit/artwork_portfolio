"use client";

import React, { useEffect, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export const ArtworkProtectionToast: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTrigger = () => {
      setVisible(true);
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
      const timeout = setTimeout(() => {
        setVisible(false);
      }, 3200);
      setToastTimeout(timeout);
    };

    window.addEventListener("artwork-protected-triggered", handleTrigger);
    return () => {
      window.removeEventListener("artwork-protected-triggered", handleTrigger);
      if (toastTimeout) clearTimeout(toastTimeout);
    };
  }, [toastTimeout]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-150"
    >
      <div className="bg-white border-[3px] border-black p-3.5 sm:p-4 shadow-[6px_6px_0px_#000] flex items-center gap-3 select-none max-w-sm sm:max-w-md">
        <div className="w-10 h-10 bg-comic-yellow border-2 border-black flex-shrink-0 flex items-center justify-center shadow-[2px_2px_0px_#000]">
          <AlertTriangle className="w-5 h-5 text-black stroke-[2.5]" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-comic text-sm uppercase tracking-wide text-black leading-none mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-comic-pink stroke-[2.5]" />
            <span>ARTWORK COPYRIGHT PROTECTED</span>
          </div>
          <p className="font-nav text-xs font-bold text-neutral-800 leading-snug">
            ⚠️ Artwork Protected // Contact Emilia for licensed master files.
          </p>
        </div>
      </div>
    </div>
  );
};

export const triggerArtworkProtectedToast = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("artwork-protected-triggered"));
  }
};
