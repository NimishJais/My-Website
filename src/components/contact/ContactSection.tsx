"use client";

import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PERSONAL_INFO } from "@/data/portfolioData";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

export function ContactSection() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <SectionHeading badge="Get In Touch" title="Contact Me" />

        <p className="text-center text-sm sm:text-base text-slate-600 mb-8">
          The best way to reach me is by email — I usually respond within a
          day.
        </p>

        <div className="space-y-4">
          {/* Email Card */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-center justify-between hover:border-amber-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase">
                  Primary Email
                </div>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm font-semibold text-slate-900 hover:text-amber-700 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            <button
              onClick={() => handleCopy(PERSONAL_INFO.email, "email")}
              title="Copy email"
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {copiedField === "email" ? (
                <Check className="w-4 h-4 text-amber-700" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Phone Card */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-center justify-between hover:border-orange-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-700">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase">
                  Phone Number
                </div>
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="text-sm font-semibold text-slate-900 hover:text-orange-700 transition-colors"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>

            <button
              onClick={() => handleCopy(PERSONAL_INFO.phone, "phone")}
              title="Copy phone"
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {copiedField === "phone" ? (
                <Check className="w-4 h-4 text-orange-700" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* LinkedIn */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-center justify-between hover:border-rose-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase">
                  Professional Network
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  linkedin.com/in/nimish-jais
                </span>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="Open LinkedIn"
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* GitHub */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-center justify-between hover:border-amber-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-slate-400 uppercase">
                  Code & Projects
                </div>
                <span className="text-sm font-semibold text-slate-900">
                  github.com/NimishJais
                </span>
              </div>
            </div>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              title="Open GitHub"
              className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
