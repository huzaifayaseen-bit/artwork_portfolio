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
      <div className="bg-neutral-100 border-2 border-black rounded-xl px-4 py-2.5 font-mono text-sm font-bold text-black select-all">
        {discordTag}
      </div>

      <button
        onClick={handleCopy}
        className={`
          w-full sm:w-auto flex items-center justify-center gap-2
          border-2 border-black rounded-xl px-5 py-3 text-xs sm:text-sm
          font-btn font-bold uppercase tracking-wider
          transition-all duration-75 select-none cursor-pointer
          ${
            copied
              ? "bg-comic-green text-black shadow-[2px_2px_0px_#000] translate-x-[1px] translate-y-[1px]"
              : "bg-comic-yellow text-black shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:-translate-x-[1px] hover:-translate-y-[1px] active:translate-x-[1px] active:translate-y-[1px]"
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
