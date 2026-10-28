"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export interface DiscordCopyButtonProps {
  discordTag: string;
}

export const DiscordCopyButton: React.FC<DiscordCopyButtonProps> = ({ discordTag }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(discordTag);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = discordTag;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <div className="bg-neutral-100 border-[3px] border-black px-4 py-2.5 font-mono text-sm font-bold text-black select-all">
        {discordTag}
      </div>

      <button
        onClick={handleCopy}
        className={`
          flex items-center justify-center gap-2
          border-[3px] border-black px-5 py-2.5
          font-btn text-xs sm:text-sm font-bold uppercase tracking-wider
          transition-all duration-75 select-none cursor-pointer
          ${
            copied
              ? "bg-comic-green text-black shadow-neo-sm translate-x-[1px] translate-y-[1px]"
              : "bg-comic-yellow text-black shadow-neo hover:shadow-neo-lg hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px]"
          }
        `}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 stroke-[3]" />
            <span>COPIED TO CLIPBOARD!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>COPY DISCORD TAG</span>
          </>
        )}
      </button>
    </div>
  );
};
