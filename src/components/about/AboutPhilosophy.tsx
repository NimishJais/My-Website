"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";

export function AboutPhilosophy() {
  return (
    <section id="about" className="py-14 md:py-18 bg-white border-b border-slate-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="About Me"
          title="Professional Background"
        />

        {/* Clean Cardless Prose */}
        <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
          <p>
            I am an <strong className="text-slate-900 font-semibold">Associate Technical Analyst at Sapiens Technologies</strong> in Bangalore, specializing in GhostDraft CCM document automation, XSLT data mapping, and P&C Insurance workflows.
          </p>
          <p>
            My core responsibilities involve authoring complex document templates, rule-based logic, and dynamic forms, as well as transforming structured XML payloads and database sources via XSLT stylesheets.
          </p>
          <p>
            I configure and maintain integrations connecting GhostDraft with core enterprise product modules (Policy, Billing, Claims) and external systems via REST/SOAP APIs and AWS S3 cloud storage workflows.
          </p>
        </div>
      </div>
    </section>
  );
}
