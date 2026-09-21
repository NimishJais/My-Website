"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PROJECTS, ProjectItem } from "@/data/portfolioData";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  X
} from "lucide-react";

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Subtle 3D tilt: card leans toward the cursor, springs back on leave.
  const handleCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${(-py * 3.5).toFixed(2)}deg) rotateY(${(px * 3.5).toFixed(2)}deg) translateY(-3px)`;
  };

  const resetCardTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Portfolio & Architecture"
          title="Projects & Systems Architecture"
        />

        {/* Single Column Format */}
        <div className="space-y-6">
          {PROJECTS.map((project) => {
            return (
              <div
                key={project.id}
                onMouseMove={handleCardTilt}
                onMouseLeave={resetCardTilt}
                className="tilt-card p-6 md:p-8 rounded-2xl border border-slate-200 bg-white shadow-xs"
              >
                {/* Top Status & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                    {project.category}
                  </span>

                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium ${project.status === "Production"
                        ? "bg-teal-50 text-teal-800 border border-teal-200"
                        : project.status === "Completed"
                          ? "bg-sky-50 text-sky-800 border border-sky-200"
                          : "bg-purple-50 text-purple-800 border border-purple-200"
                      }`}
                  >
                    {project.status === "Production" ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                    )}
                    <span>{project.status}</span>
                  </span>
                </div>

                {/* Title & Tagline */}
                <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">
                  {project.title}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-teal-700 mb-3">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tech Tags & CTA Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 border border-slate-200 text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-slate-500 font-medium hidden md:inline">
                      {project.metrics}
                    </span>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
                    >
                      <span>Deep Dive Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
                      >
                        <span>Visit Live</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="max-w-xl w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs text-teal-700 uppercase font-bold">
                  {selectedProject.category} System Details
                </span>
                <h4 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedProject.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="my-4 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>{selectedProject.longDescription}</p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-900">
                  Architectural Specifications:
                </div>
                {selectedProject.architectureHighlights.map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div>
                <div className="text-xs font-bold text-slate-500 mb-1.5 uppercase">
                  Technologies Used:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded text-xs font-medium bg-slate-100 border border-slate-200 text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Visit Live Site</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
