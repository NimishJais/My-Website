"use client";

import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { 
  FileCode2, 
  ShieldCheck, 
  Code2, 
  Check 
} from "lucide-react";

export function SkillsMatrix() {
  const documentSkills = [
    "GhostDraft CCM",
    "XSLT 2.0 / 1.0",
    "XPath & XQuery",
    "XML Schema & DTD",
    "Template Design & Composition",
    "Dynamic Form Rules & Logic",
    "Data Mapping & Transformations",
    "Iframe & Embedded Integration",
    "Multi-Channel PDF & Print Streams",
    "State Compliance Formatting"
  ];

  const domainSkills = [
    "P&C Insurance Lifecycle",
    "Policy Administration Systems (PAS)",
    "Billing & Premium Invoicing",
    "Claims Processing & FNOL",
    "Sapiens Enterprise Suite",
    "REST & SOAP APIs",
    "AWS S3 Cloud Storage Integration",
    "Defect Triage & Log Diagnostics",
    "Regression & Release Testing",
    "Zero-Defect Production Delivery"
  ];

  const fullStackSkills = [
    "Java (Core & Advanced)",
    "Spring Boot",
    "React.js",
    "TypeScript / JavaScript",
    "SQL (MySQL / PostgreSQL)",
    "Data Structures & Algorithms (200+ Solved)",
    "RESTful API Design",
    "HTML5 & CSS3 / Tailwind",
    "Git & GitHub Version Control",
    "Postman API Testing",
    "Agile / Scrum & JIRA",
    "Linux CLI & Automation Scripts"
  ];

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Technical Skills"
          title="Skills & Technical Capabilities"
        />

        {/* 3 Cards Layout: 2 on Top, 1 Full-Width at Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Document Automation & CCM */}
          <div className="p-6 md:p-7 rounded-2xl border border-teal-200 bg-white shadow-xs flex flex-col justify-between hover:border-teal-300 hover:shadow-sm transition-all">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-teal-100">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                  <FileCode2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Document Automation & CCM
                  </h3>
                  <span className="text-xs text-teal-700 font-medium">
                    GhostDraft, XSLT, XML & Composition
                  </span>
                </div>
              </div>

              {/* Skills Badge Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {documentSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-teal-50/60 border border-teal-200 text-teal-950 hover:bg-teal-100/70 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: P&C Insurance Workflows & Integrations */}
          <div className="p-6 md:p-7 rounded-2xl border border-purple-200 bg-white shadow-xs flex flex-col justify-between hover:border-purple-300 hover:shadow-sm transition-all">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-purple-100">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    P&C Workflows & Enterprise Integrations
                  </h3>
                  <span className="text-xs text-purple-700 font-medium">
                    Policy, Billing, Claims, APIs & AWS S3
                  </span>
                </div>
              </div>

              {/* Skills Badge Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {domainSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-50/60 border border-purple-200 text-purple-950 hover:bg-purple-100/70 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-purple-600" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Full-Stack Development & Data Logic (Full Width) */}
          <div className="col-span-1 md:col-span-2 p-6 md:p-7 rounded-2xl border border-sky-200 bg-white shadow-xs flex flex-col justify-between hover:border-sky-300 hover:shadow-sm transition-all">
            <div>
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-sky-100">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Full-Stack Software Development & Algorithmic Logic
                  </h3>
                  <span className="text-xs text-sky-700 font-medium">
                    Java, Spring Boot, React, SQL, Algorithms & Cloud Tooling
                  </span>
                </div>
              </div>

              {/* Skills Badge Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {fullStackSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-sky-50/60 border border-sky-200 text-sky-950 hover:bg-sky-100/70 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-sky-600" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
