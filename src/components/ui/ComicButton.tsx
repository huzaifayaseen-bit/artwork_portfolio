"use client";

import React from "react";
import { useSound } from "@/context/SoundContext";

export interface ComicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "dark" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const ComicButton: React.FC<ComicButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  className = "",
  onClick,
  ...props
}) => {
  const { playClick } = useSound();

  const variantStyles = {
    primary: "bg-comic-yellow text-black hover:bg-[#FFF033]",
    secondary: "bg-comic-cyan text-black hover:bg-[#33ECFF]",
    accent: "bg-comic-pink text-white hover:bg-[#FF4D7D]",
    dark: "bg-black text-white hover:bg-neutral-900",
    ghost: "bg-white text-black hover:bg-neutral-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-btn font-bold tracking-wider uppercase",
    md: "px-5 py-2.5 text-sm sm:text-base font-btn font-bold tracking-wider uppercase",
    lg: "px-7 py-3.5 text-base sm:text-lg font-btn font-bold tracking-wider uppercase",
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    if (onClick) onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        relative inline-flex items-center justify-center gap-2
        border-[3px] border-black
        shadow-neo active:shadow-neo-active
        transition-all duration-75 ease-out
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-neo-lg
        active:translate-x-[2px] active:translate-y-[2px]
        cursor-pointer select-none font-btn
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-neo
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
