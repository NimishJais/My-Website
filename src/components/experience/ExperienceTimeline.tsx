"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { EXPERIENCES, EDUCATIONS } from "@/data/portfolioData";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronRight
} from "lucide-react";

export function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience");

  return (
    <section id="experience" className="py-14 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Career & Education"
          title="Work Experience & Qualifications"
        />

        {/* 2 Switcher Buttons (Default to Work Experience) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "experience"
                  ? "bg-white text-teal-900 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4 text-teal-600" />
              <span>Work Experience</span>
            </button>

            <button
              onClick={() => setActiveTab("education")}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "education"
                  ? "bg-white text-purple-900 shadow-xs border border-slate-200/60"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>Education & Qualifications</span>
            </button>
          </div>
        </div>

        {/* Content: Work Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-6 md:p-8 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-xs transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200/80">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="text-xl font-bold text-slate-900">
                        {exp.role}
                      </h4>
                      {exp.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-teal-700 mt-1">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {exp.location}
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-700 mt-4 mb-5 leading-relaxed font-normal">
                  {exp.summary}
                </p>

                {/* Bullet Points */}
                <div className="space-y-2.5 mb-6">
                  {exp.achievements.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-200/80">
                  <span className="text-xs font-semibold text-slate-500 mr-1.5">Tech & Tools:</span>
                  {exp.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Content: Education Tab */}
        {activeTab === "education" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATIONS.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 md:p-7 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200/80">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 mb-1.5">
                        {edu.grade}
                      </span>
                      <h4 className="text-base font-bold text-slate-900">
                        {edu.degree}
                      </h4>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 font-medium shrink-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 my-3 leading-relaxed">
                    {edu.details}
                  </p>

                  <div className="space-y-1.5 my-3">
                    <div className="text-[11px] font-bold text-slate-500 uppercase">
                      Coursework Highlights:
                    </div>
                    {edu.coursework.map((course, cIdx) => (
                      <div
                        key={cIdx}
                        className="flex items-center gap-1.5 text-xs text-slate-700"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/80 mt-2">
                  {edu.badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-slate-600 border border-slate-200"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
