"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { Trophy, Globe2, Code2, Heart } from "lucide-react";

export function Achievements() {
  const distinctions = [
    {
      icon: Trophy,
      title: "Company Bravo Award",
      org: "Sapiens Technologies",
      year: "2025",
      summary: "Recognized for ahead-of-schedule delivery, enabling extended QA cycles and a zero-defect production release.",
      iconBg: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      icon: Globe2,
      title: "Asia Book of Records",
      org: "ROTARACT",
      year: "2021",
      summary: "Led team during the landmark 'Defeat Diabetes' awareness and health drive certified by Asia Book of Records.",
      iconBg: "bg-teal-100 text-teal-800 border-teal-200",
    },
    {
      icon: Code2,
      title: "200+ Competitive Algorithmic Solutions",
      org: "LeetCode & Platforms",
      year: "Active",
      summary: "Solved 200+ algorithmic challenges covering Dynamic Programming, Graph Traversal, and Trees.",
      iconBg: "bg-purple-100 text-purple-800 border-purple-200",
    },
  ];

  return (
    <section id="achievements" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Honors & Certifications"
          title="Awards & Certifications"
        />

        {/* Compact, Cardless Distinctions List */}
        <div className="divide-y divide-slate-100 mb-8">
          {distinctions.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-xl border ${item.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {item.title}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">
                        • {item.org}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <span className="self-start sm:self-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 shrink-0">
                  {item.year}
                </span>
              </div>
            );
          })}
        </div>

        {/* Simple One-line Casual Hobbies Mention */}
        <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <Heart className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            <strong className="text-slate-900 font-semibold">Casual Interests:</strong> Table Tennis, Mountain Hiking & Trekking, Travelling, and Reading.
          </span>
        </div>
      </div>
    </section>
  );
}
