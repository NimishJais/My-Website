"use client";

import React, { useState } from "react";
import { PERSONAL_INFO } from "@/data/portfolioData";
import { 
  Download, 
  X, 
  FileText, 
  ExternalLink, 
  ShieldCheck 
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${PERSONAL_INFO.resumePdfUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl h-[88vh] flex flex-col rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-50 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Nimish_Jais_Resume.pdf
              </h4>
              <p className="text-[11px] text-slate-500">
                Official Resume • Sapiens Technologies • GhostDraft CCM & P&C Specialist
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Nimish_Jais_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium hidden sm:flex items-center gap-1.5 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in Tab</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full bg-slate-100">
          <iframe
            src={`${PERSONAL_INFO.resumePdfUrl}#toolbar=0&navpanes=0`}
            className="w-full h-full border-0"
            title="Nimish Jais Resume PDF"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 shrink-0">
          <span className="flex items-center gap-1.5 text-teal-800 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Verified PDF Document</span>
          </span>

          <button
            onClick={handleCopyLink}
            className="text-teal-700 font-medium hover:underline"
          >
            {copied ? "Copied Direct Link!" : "Copy Resume Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
