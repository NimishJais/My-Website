import React from "react";

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  badge,
  title,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const cleanTitle = title.replace("//", "").trim();

  return (
    <div className={`mb-8 md:mb-10 ${isCenter ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}`}>
      {/* Light Soft Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold tracking-wide mb-2.5">
        {badge}
      </div>

      {/* Main Headline */}
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
        {cleanTitle}
      </h2>

      {/* Hand-drawn warm underline flourish */}
      <svg
        viewBox="0 0 120 12"
        aria-hidden
        className={`h-2.5 w-28 mt-1.5 ${isCenter ? "mx-auto" : ""}`}
      >
        <path
          d="M3 8.5 C 28 3.5, 52 10, 78 6.5 S 108 4, 117 6"
          stroke="#d97706"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
