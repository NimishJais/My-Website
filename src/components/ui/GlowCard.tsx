"use client";

import React from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export function GlowCard({
  children,
  className = "",
  interactive = false,
  onClick,
}: GlowCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-slate-200 bg-white transition-all duration-200 shadow-xs ${
        interactive
          ? "hover:border-slate-300 hover:shadow-md cursor-pointer"
          : "hover:border-slate-300/80"
      } ${className}`}
    >
      {children}
    </div>
  );
}
