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
    </div>
  );
}
