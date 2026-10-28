"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";

interface SoundContextType {
  sfxEnabled: boolean;
  toggleSFX: () => void;
  playClick: () => void;
  playPageFlip: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  sfxEnabled: true,
  toggleSFX: () => {},
  playClick: () => {},
  playPageFlip: () => {},
  playSuccess: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sfx_enabled");
      if (stored !== null) {
        setSfxEnabled(stored === "true");
      }
    } catch {
      // Graceful fallback for non-storage environments
    }
  }, []);

  // Lazily get or resume Web Audio Context
  const getAudioContext = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtxClass) return null;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume().catch(() => {});
      }

      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  // 1. Snappy 8-Bit Comic Click Blip / Pop (~50ms)
  const playClick = useCallback(() => {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      // Quick pitch drop: 600Hz down to 240Hz
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.055);
    } catch {
      // AudioContext fallback
    }
  }, [sfxEnabled, getAudioContext]);

  // 2. Comic Page Flip / Whoosh Sweep (~80ms)
  const playPageFlip = useCallback(() => {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.08; // 80ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate soft noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter for swoosh resonance
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.04);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      filter.Q.setValueAtTime(3.0, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.085);
    } catch {
      // Web Audio fallback
    }
  }, [sfxEnabled, getAudioContext]);

  // 3. Comic Victory / Transmission Chime (~200ms)
  const playSuccess = useCallback(() => {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Note 1: E5 (659Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(659.25, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.1);

      // Note 2: B5 (987.77Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(987.77, now + 0.08);
      gain2.gain.setValueAtTime(0.14, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.23);
    } catch {
      // Web Audio fallback
    }
  }, [sfxEnabled, getAudioContext]);

  const toggleSFX = useCallback(() => {
    setSfxEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sfx_enabled", String(next));
      } catch {}

      if (next) {
        // Play sample preview when unmuting
        setTimeout(() => {
          const ctx = getAudioContext();
          if (ctx) {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(523.25, now); // C5
            osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.08); // G5
            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.11);
          }
        }, 20);
      }
      return next;
    });
  }, [getAudioContext]);

  return (
    <SoundContext.Provider
      value={{
        sfxEnabled,
        toggleSFX,
        playClick,
        playPageFlip,
        playSuccess,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
