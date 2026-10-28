import React from "react";

export interface ComicCardProps {
  title?: string;
  badge?: string;
  badgeColor?: "yellow" | "pink" | "cyan" | "green" | "purple";
  className?: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

export const ComicCard: React.FC<ComicCardProps> = ({
  title,
  badge,
  badgeColor = "yellow",
  className = "",
  children,
  headerRight,
}) => {
  const badgeColors = {
    yellow: "bg-comic-yellow text-black",
    pink: "bg-comic-pink text-white",
    cyan: "bg-comic-cyan text-black",
    green: "bg-comic-green text-black",
    purple: "bg-comic-purple text-white",
  };

  return (
    <div
      className={`
        relative bg-white border-[3px] border-black
        shadow-neo transition-all duration-75
        ${className}
      `}
    >
      {(title || badge || headerRight) && (
        <div className="flex items-center justify-between border-b-[3px] border-black bg-neutral-100 px-4 py-2.5">
          <div className="flex items-center gap-2">
            {badge && (
              <span
                className={`
                  border-2 border-black px-2 py-0.5 text-xs font-black uppercase tracking-wider
                  ${badgeColors[badgeColor]}
                `}
              >
                {badge}
              </span>
            )}
            {title && (
              <h3 className="font-comic text-base font-black tracking-wide text-black uppercase">
                {title}
              </h3>
            )}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
};
