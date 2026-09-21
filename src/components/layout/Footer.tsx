"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { ArrowUp, Linkedin, Mail, FileText } from "lucide-react";

export function Footer({ onOpenResumeModal }: { onOpenResumeModal: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200/50 py-12 text-slate-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
          {/* Brand Info */}
          <div>
            <h4 className="text-base font-bold text-slate-900">
              {PERSONAL_INFO.name}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Associate Technical Analyst @ Sapiens Technologies • Bangalore, India
            </p>
          </div>

          {/* Direct Quick Links */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <button
              onClick={onOpenResumeModal}
              className="flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 transition-colors shadow-2xs"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
