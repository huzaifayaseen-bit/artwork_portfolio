import React from "react";

export interface ComicBadgeProps {
  children: React.ReactNode;
  variant?: "yellow" | "pink" | "cyan" | "green" | "purple" | "dark" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export const ComicBadge: React.FC<ComicBadgeProps> = ({
  children,
  variant = "yellow",
  size = "md",
  className = "",
}) => {
  const variantStyles = {
    yellow: "bg-comic-yellow text-black border-black",
    pink: "bg-comic-pink text-white border-black",
    cyan: "bg-comic-cyan text-black border-black",
    green: "bg-comic-green text-black border-black",
    purple: "bg-comic-purple text-white border-black",
    dark: "bg-black text-white border-black",
    outline: "bg-white text-black border-black",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs font-nav font-bold tracking-wider",
    md: "px-3 py-1 text-xs sm:text-sm font-nav font-bold tracking-wider",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        border-2 shadow-[2px_2px_0px_#000000]
        uppercase select-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};
