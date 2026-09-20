"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hero3DDome } from "./Hero3DDome";

export function Hero() {
  const fullText = "Hi! I'm Nimish . . .";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typewriter effect for "Hi! I'm Nimish . . ."
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 110);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      value: "1.5+",
      label: "Enterprise Experience",
      detail: "Sapiens Technologies",
      accent: "hover:border-teal-300 hover:shadow-teal-100/50 border-t-teal-500",
    },
    {
      value: "Zero",
      label: "Production Defects",
      detail: "Ahead-of-Schedule Delivery",
      accent: "hover:border-sky-300 hover:shadow-sky-100/50 border-t-sky-500",
    },
    {
      value: "200+",
      label: "LeetCode Solved",
      detail: "Data Structures & Algos",
      accent: "hover:border-purple-300 hover:shadow-purple-100/50 border-t-purple-500",
    },
    {
      value: "Asia Book",
      label: "Record Holder",
      detail: "Leadership Distinction",
      accent: "hover:border-emerald-300 hover:shadow-emerald-100/50 border-t-emerald-500",
    },
  ];

  return (
    <section
      id="hero"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 light-mesh-bg border-b border-slate-200/80 overflow-hidden"
    >
      {/* Ambient Theme 4-Color Radiance Backdrop (Teal, Sky Blue, Violet, Emerald) */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[480px] pointer-events-none z-0 opacity-70"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 95%, rgba(45, 212, 191, 0.14) 0%, rgba(56, 189, 248, 0.12) 30%, rgba(168, 85, 247, 0.10) 60%, rgba(52, 211, 153, 0.08) 85%, transparent 100%)"
        }}
      />

      {/* 3D Radiating Kinetic Dome (Shifted down so only half height is visible) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bottom-[-180px] sm:bottom-[-210px] md:bottom-[-240px] w-[750px] sm:w-[980px] md:w-[1250px] h-[460px] sm:h-[520px] md:h-[580px] pointer-events-none z-0"
      >
        <Hero3DDome />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-2xs text-xs font-medium text-slate-700 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="font-semibold text-slate-900">Sapiens Technologies</span>
          <span className="text-slate-400">•</span>
          <span>Bangalore, India</span>
        </motion.div>

        {/* Main Headline with Left-to-Right Typewriter Animation */}
        <div className="min-h-[3.5rem] sm:min-h-[4.5rem] md:min-h-[5rem] flex items-center justify-center mb-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight inline-flex items-center">
            <span>{displayedText}</span>
            <span
              className={`inline-block w-1 md:w-1.5 h-9 sm:h-12 md:h-14 bg-teal-600 ml-1.5 rounded-sm ${
                isTypingComplete ? "animate-pulse" : ""
              }`}
            />
          </h1>
        </div>

        {/* Static, Crisp Subtitle & Specialization */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg sm:text-xl font-semibold text-teal-800 mb-4"
        >
          Associate Technical Analyst & Enterprise Document Automation Engineer
        </motion.p>

        {/* Professional Summary */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          Technical Implementation Engineer specializing in <strong className="text-slate-900 font-semibold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">GhostDraft CCM</strong>, <strong className="text-slate-900 font-semibold bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">XSLT Data Mapping</strong>, and <strong className="text-slate-900 font-semibold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100">P&C Insurance Systems</strong> at Sapiens Technologies.
        </motion.p>

        {/* Interactive Metrics Cards with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-200/50"
        >
          {stats.map((st, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl border-t-4 transition-all duration-300 hover:-translate-y-1 cursor-default ${st.accent}`}
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {st.value}
              </div>
              <div className="text-xs text-slate-700 font-semibold mt-1">
                {st.label}
              </div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                {st.detail}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
