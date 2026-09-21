"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import {
  Trophy,
  Globe2,
  Award,
  Heart,
  Eye,
  ExternalLink,
  X,
} from "lucide-react";

type Distinction = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  org: string;
  year: string;
  summary: string;
  iconBg: string;
  image?: string;
  imageAlt?: string;
  courseUrl?: string;
};

export function Achievements() {
  const [viewing, setViewing] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);

  const distinctions: Distinction[] = [
    {
      icon: Trophy,
      title: "Company Bravo Award",
      org: "Sapiens Technologies",
      year: "2025",
      summary:
        "Recognized for ahead-of-schedule delivery, enabling extended QA cycles and a zero-defect production release.",
      iconBg: "bg-amber-100 text-amber-800 border-amber-200",
      image: "/bravo-award.jpg",
      imageAlt: "Sapiens Bravo Award — Thanks for Raising the Bar, awarded to Nimish Jais",
    },
    {
      icon: Award,
      title: "AI Coder: Complete Claude Code & Coding Agents Course",
      org: "Udemy • Ed Donner",
      year: "2026",
      summary:
        "Completed the 16.5-hour course on Claude Code and AI coding agents — agentic engineering workflows with modern AI coding tools.",
      iconBg: "bg-purple-100 text-purple-800 border-purple-200",
      image: "/ai-coder-certificate.png",
      imageAlt:
        "Udemy Certificate of Completion — AI Coder: Complete Claude Code & Coding Agents Course, awarded to Nimish Jais",
      courseUrl:
        "https://www.udemy.com/course/ai-coder-from-vibe-coder-to-agentic-engineer/",
    },
    {
      icon: Globe2,
      title: "Asia Book of Records",
      org: "ROTARACT",
      year: "2021",
      summary:
        "Led team during the landmark 'Defeat Diabetes' awareness and health drive certified by Asia Book of Records.",
      iconBg: "bg-teal-100 text-teal-800 border-teal-200",
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
                  <div
                    className={`w-9 h-9 rounded-xl border ${item.iconBg} flex items-center justify-center shrink-0`}
                  >
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

                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  {item.image && (
                    <button
                      onClick={() =>
                        setViewing({
                          src: item.image as string,
                          alt: item.imageAlt as string,
                          title: item.title,
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  )}
                  {item.courseUrl && (
                    <a
                      href={item.courseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Udemy Course</span>
                    </a>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                    {item.year}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple One-line Casual Hobbies Mention */}
        <div className="pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs sm:text-sm text-slate-600">
          <Heart className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            <strong className="text-slate-900 font-semibold">
              Casual Interests:
            </strong>{" "}
            Table Tennis, Mountain Hiking & Trekking, Travelling, and Reading.
          </span>
        </div>
      </div>

      {/* Certificate / Award Image Lightbox */}
      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setViewing(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl bg-white p-3 sm:p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-1 pb-2">
              <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                {viewing.title}
              </h4>
              <button
                onClick={() => setViewing(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <img
              src={viewing.src}
              alt={viewing.alt}
              className="w-full max-h-[75vh] object-contain rounded-xl border border-slate-100 bg-slate-50"
            />
          </div>
        </div>
      )}
    </section>
  );
}
