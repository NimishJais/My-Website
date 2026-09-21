"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";

export function AboutPhilosophy() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="About Me"
          title="Professional Background"
        />

        {/* Clean 3-Pillar Prose Aligned with Plan.md */}
        <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
          <p>
            I am an <strong className="text-slate-900 font-semibold">Technical Analyst at Sapiens Technologies</strong> in Bangalore with 1.5+ years of multinational corporate experience spanning enterprise document automation, large-scale system integrations, and cutting-edge autonomous AI engineering.
          </p>
          <p>
            As a <strong className="text-teal-900 font-semibold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">GhostDraft Developer</strong>, I author complex dynamic templates, rule-based document logic. I have worked with building Ghostdraft Workflows, I-frame, Integrating AWS S3 bucket for forms storage, and complex scripting and mapping received Bravo Award for faster and effecient delivery.
          </p>
          <p>
            As an <strong className="text-sky-900 font-semibold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">Implementation Engineer (System Integrations)</strong>, I architect and maintain mission-critical integrations connecting core insurance product modules (Policy, Billing, Claims) with external systems and REST/SOAP APIs—earning.
          </p>
          <p>
            As an <strong className="text-purple-900 font-semibold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">AI Engineer</strong>, I am officially certified as an <em>AI Coder by Ed Donner</em> and actively advancing through core-track LLM Engineering. I aggressively build, fine-tune, and deploy autonomous AI agents, tool-calling chains, and automated developer copilots that bridge legacy enterprise systems with modern artificial intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}
