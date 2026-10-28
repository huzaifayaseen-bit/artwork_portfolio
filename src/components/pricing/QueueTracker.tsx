"use client";

import React, { useMemo } from "react";
import { QueueData, CommissionSlot } from "@/types/portfolio";
import { Radio, Sparkles, Clock, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export interface QueueTrackerProps {
  queueData?: QueueData;
}

export const QueueTracker: React.FC<QueueTrackerProps> = ({ queueData }) => {
  if (!queueData || !queueData.slots || queueData.slots.length === 0) return null;

  const openSlotsCount = useMemo(() => {
    return queueData.slots.filter((s) => s.status === "OPEN").length;
  }, [queueData.slots]);

  const inProgressCount = useMemo(() => {
    return queueData.slots.filter((s) => s.status === "IN_PROGRESS").length;
  }, [queueData.slots]);

  return (
    <div className="mb-12">
      {/* Top Urgent Marquee Header Banner */}
      <div className="bg-black text-white border-[3px] border-black p-3 sm:px-6 sm:py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-neo">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-comic-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-comic-green border border-black"></span>
            </span>
            <span className="font-comic text-xl sm:text-2xl uppercase tracking-wider text-comic-yellow">
              {queueData.title}
            </span>
          </div>
          <span className="hidden md:inline-block text-neutral-500 font-bold">|</span>
          <span className="hidden md:inline-block font-nav text-xs uppercase tracking-wider text-neutral-300">
            {queueData.quarterLabel}
          </span>
        </div>

        {/* Dynamic urgency indicator */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="inline-flex items-center gap-1.5 bg-comic-pink text-white border-2 border-white px-2.5 py-0.5 font-nav text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>
              {openSlotsCount === 1
                ? "ONLY 1 SLOT REMAINING!"
                : `${openSlotsCount} SLOTS AVAILABLE`}
            </span>
          </div>

          <a
            href="/pricing"
            className="sm:hidden font-btn text-xs font-bold uppercase tracking-wider bg-comic-yellow text-black border border-black px-2 py-0.5"
          >
            CLAIM
          </a>
        </div>
      </div>

      {/* Main Board Container */}
      <div className="bg-white border-x-[3px] border-b-[3px] border-black p-5 sm:p-7 shadow-neo">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-neutral-200">
          <div>
            <p className="text-xs sm:text-sm text-neutral-700 font-sans">
              {queueData.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-nav font-bold text-neutral-600 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-comic-orange border border-black inline-block" />
              {inProgressCount} Active
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-neutral-800 border border-black inline-block" />
              {queueData.slots.filter((s) => s.status === "RESERVED").length} Reserved
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-comic-green border border-black inline-block" />
              {openSlotsCount} Open
            </span>
          </div>
        </div>

        {/* 4 Comic Slot Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {queueData.slots.map((slot) => {
            const isOpen = slot.status === "OPEN";
            const isInProgress = slot.status === "IN_PROGRESS";
            const isReserved = slot.status === "RESERVED";

            return (
              <div
                key={slot.id}
                className={`
                  border-[3px] border-black p-4 flex flex-col justify-between transition-all duration-150 relative
                  ${
                    isOpen
                      ? "bg-comic-yellow/15 border-comic-green shadow-neo hover:-translate-x-[2px] hover:-translate-y-[2px]"
                      : "bg-neutral-50 shadow-neo-sm"
                  }
                `}
              >
                {/* Top Slot Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-comic text-xl text-black uppercase tracking-wide">
                      SLOT #{slot.slotNumber}
                    </span>

                    {/* Status Badge */}
                    {isInProgress && (
                      <span className="font-nav text-[10px] font-bold uppercase tracking-wider bg-comic-orange text-white border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                        IN PROGRESS
                      </span>
                    )}
                    {isReserved && (
                      <span className="font-nav text-[10px] font-bold uppercase tracking-wider bg-neutral-800 text-white border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                        RESERVED
                      </span>
                    )}
                    {isOpen && (
                      <span className="inline-flex items-center gap-1 font-nav text-[10px] font-bold uppercase tracking-wider bg-comic-green text-black border-2 border-black px-2 py-0.5 shadow-[1px_1px_0px_#000]">
                        <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                        OPEN NOW
                      </span>
                    )}
                  </div>

                  {/* Stage Info */}
                  <div className="mb-2">
                    <div className="text-[10px] font-nav font-bold uppercase tracking-wider text-neutral-500 mb-0.5">
                      CURRENT STAGE
                    </div>
                    <div className="font-comic text-sm text-black uppercase leading-tight line-clamp-2">
                      {slot.stage}
                    </div>
                  </div>

                  {/* Client Identifier or ETA */}
                  <div className="pt-2 border-t border-neutral-200 mt-2 space-y-1">
                    {slot.clientMask && (
                      <div className="text-[11px] font-sans text-neutral-600 flex items-center justify-between">
                        <span className="text-neutral-400">Client:</span>
                        <span className="font-mono text-neutral-800 font-semibold">{slot.clientMask}</span>
                      </div>
                    )}
                    {slot.eta && (
                      <div className="text-[11px] font-sans text-neutral-600 flex items-center justify-between">
                        <span className="text-neutral-400">Target ETA:</span>
                        <span className={`font-nav font-bold ${isOpen ? "text-comic-purple" : "text-neutral-700"}`}>
                          {slot.eta}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom CTA / Status Indicator */}
                <div className="mt-4 pt-3 border-t-2 border-black/10">
                  {isOpen ? (
                    <a
                      href="#commissions"
                      className="
                        w-full flex items-center justify-center gap-1.5 bg-comic-green hover:bg-[#4ADE80] text-black
                        border-2 border-black py-2 px-3 font-btn text-xs font-bold uppercase tracking-wider
                        shadow-neo-sm hover:shadow-neo active:translate-x-[1px] active:translate-y-[1px] transition-all
                      "
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>CLAIM THIS SLOT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="text-center py-1.5 bg-neutral-200/80 border border-neutral-400 font-nav text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                      {isInProgress ? "🔒 LOCKED IN PIPELINE" : "⏳ AWAITING CLEARANCE"}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};