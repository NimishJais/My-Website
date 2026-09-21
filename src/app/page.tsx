"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
import { FloatingTechIcons } from "@/components/FloatingTechIcons";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { SkillsMatrix } from "@/components/skills/SkillsMatrix";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { Achievements } from "@/components/achievements/Achievements";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { ResumeModal } from "@/components/resume/ResumeModal";

export default function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-transparent text-slate-900 relative selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle paper-grain texture over the page */}
      <div aria-hidden className="paper-grain pointer-events-none fixed inset-0 z-[60] opacity-[0.035]" />

      {/* Scattered floating tech icons along the page edges */}
      <FloatingTechIcons />

      {/* Navigation */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Hero Section */}
      <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* About Section */}
      <AboutPhilosophy />

      {/* Experience & Career Journey */}
      <ExperienceTimeline />

      {/* Skills Matrix */}
      <SkillsMatrix />

      {/* Projects & Future Portfolio Showcase */}
      <ProjectShowcase />

      {/* Achievements & Distinctions */}
      <Achievements />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </main>
  );
}
