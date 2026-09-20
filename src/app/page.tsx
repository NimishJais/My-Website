"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/hero/Hero";
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
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 relative selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Hero Section */}
      <Hero />

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
