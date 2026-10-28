import React from "react";
import Link from "next/link";
import { ComicButton } from "@/components/ui/ComicButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
      <div className="max-w-md w-full border-[4px] border-black bg-white p-8 shadow-neo text-center">
        <div className="inline-block bg-comic-pink text-white border-2 border-black px-3.5 py-1 font-nav text-xs font-bold uppercase tracking-wider mb-4 shadow-neo-sm">
          ERROR // 404
        </div>
        <h1 className="font-comic text-6xl uppercase text-black tracking-wide mb-3 leading-none">
          LOST IN THE PANELS!
        </h1>
        <p className="text-sm text-neutral-700 font-sans mb-6">
          The requested page or artwork asset does not exist in this issue.
        </p>
        <Link href="/">
          <ComicButton variant="primary" size="md">
            RETURN TO COVER
          </ComicButton>
        </Link>
      </div>
    </div>
  );
}
