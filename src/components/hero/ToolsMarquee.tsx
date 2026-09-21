"use client";

import React from "react";

const tools = [
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Spring Boot",
  "AWS",
  "Python",
  "Git",
  "XSLT",
  "GhostDraft",
  "REST APIs",
  "SOAP",
  "XML / XPath",
  "Linux",
  "CI/CD",
];

export function ToolsMarquee() {
  const row = [...tools, ...tools]; // duplicated for a seamless loop
  return (
    <div
      aria-hidden
      className="tools-marquee relative overflow-hidden border-y border-amber-200/50 bg-amber-50/50 py-3"
    >
      <div className="marquee-track flex w-max items-center">
        {row.map((tool, i) => (
          <span key={i} className="flex items-center">
            <span className="mx-2 whitespace-nowrap rounded-full border border-amber-200/70 bg-white/80 px-4 py-1.5 text-xs font-semibold text-amber-900 shadow-sm">
              {tool}
            </span>
            <span className="text-[10px] text-amber-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
