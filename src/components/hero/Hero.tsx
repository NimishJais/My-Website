"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export function Hero({ onOpenResumeModal }: HeroProps) {
  const fullText = "Hi! I'm Nimish . . .";
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Dynamic roles that recruiters/HR are actively searching for
  const roles = [
    {
      title: "GhostDraft Developer",
      prefix: "a",
      className: "text-teal-800 bg-teal-50/90 border-teal-300 shadow-teal-100/50",
      dot: "bg-teal-500",
    },
    {
      title: "AI Engineer",
      prefix: "an",
      className: "text-purple-800 bg-purple-50/90 border-purple-300 shadow-purple-100/50",
      dot: "bg-purple-500",
    },
    {
      title: "Implementation Engineer (System Integrations)",
      prefix: "an",
      className: "text-sky-800 bg-sky-50/90 border-sky-300 shadow-sky-100/50",
      dot: "bg-sky-500",
    },
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Cycle through the 3 target roles smoothly every 2.8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

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
      title: "1.5+Years Exp",
      accent: "hover:border-teal-300 hover:shadow-teal-100/50 border-t-teal-500",
    },
    {
      title: "Ghostdraft Development",
      accent: "hover:border-sky-300 hover:shadow-sky-100/50 border-t-sky-500",
    },
    {
      title: "AI Engineer",
      accent: "hover:border-purple-300 hover:shadow-purple-100/50 border-t-purple-500",
    },
    {
      title: "Software Developer",
      accent: "hover:border-emerald-300 hover:shadow-emerald-100/50 border-t-emerald-500",
    },
  ];

  return (
    <section
      id="hero"
      className="relative pt-28 sm:pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-x-clip"
    >
      {/* Ambient Warm Radiance Backdrop (Feathered seamlessly at bottom) */}
      <div
        className="absolute inset-x-0 top-0 h-[640px] pointer-events-none z-0 opacity-60"
        style={{
          background: "radial-gradient(ellipse 75% 55% at 50% 40%, rgba(245, 158, 11, 0.10) 0%, rgba(253, 186, 116, 0.10) 35%, rgba(253, 230, 211, 0.08) 65%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)"
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: Aesthetic realistic desk photo (below text on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-2 lg:order-1 relative"
          >
            {/* Soft warm lamp-like glow behind the photo */}
            <div
              aria-hidden
              className="absolute -inset-8 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245, 158, 11, 0.16) 0%, rgba(253, 186, 116, 0.10) 55%, transparent 100%)",
                filter: "blur(28px)",
              }}
            />
            {/* Feathered mask melts the photo into the warm cream background */}
            <div
              className="relative"
              style={{
                maskImage: "radial-gradient(ellipse 80% 74% at 50% 45%, black 52%, transparent 80%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 74% at 50% 45%, black 52%, transparent 80%)",
              }}
            >
              <Image
                src="/hero-desk.jpg"
                alt="Nimish's cozy developer workstation with laptop, vertical monitor, and coffee"
                width={1920}
                height={1280}
                priority
                className="w-full h-auto object-cover aspect-[3/2]"
              />
            </div>

            {/* Floating glass badge: availability */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-8 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-slate-900/5 text-xs font-semibold text-slate-800"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              Available to Hire
            </motion.div>

            {/* Floating glass badge: experience */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 right-8 px-3.5 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-slate-900/5 text-xs font-semibold text-slate-800"
            >
              1.5+ yrs experience
            </motion.div>

          </motion.div>

          {/* Right: Original text content (first on mobile) */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            {/* Main Headline with Left-to-Right Typewriter Animation */}
            <div className="min-h-[3.5rem] sm:min-h-[4.5rem] md:min-h-[5rem] flex items-center justify-center lg:justify-start mb-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight inline-flex items-center">
                <span>{displayedText}</span>
                <span
                  className={`inline-block w-1 md:w-1.5 h-9 sm:h-12 md:h-14 bg-teal-600 ml-1.5 rounded-sm ${isTypingComplete ? "animate-pulse" : ""
                    }`}
                />
              </h1>
            </div>

            {/* Dynamic "Looking for..." Recruiter Matcher */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-600 font-medium mb-3 min-h-[36px]"
            >
              <span className="text-slate-500">Looking for {roles[currentRoleIndex].prefix}</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRoleIndex}
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.95 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border shadow-xs font-bold text-xs sm:text-sm transition-all ${roles[currentRoleIndex].className}`}
                >
                  <span className={`w-2 h-2 rounded-full ${roles[currentRoleIndex].dot} animate-pulse`} />
                  <span>{roles[currentRoleIndex].title}</span>
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Direct Action CTA Buttons for Recruiters & HR */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-2 flex-wrap"
            >
              <a
                href="#contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-xs hover:-translate-y-0.5 hover:shadow-md"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Standardized 4 Profile Cards with Consistent Internal Padding */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4 max-w-4xl mx-auto mt-12 pt-6 border-t border-slate-200/50"
        >
          {stats.map((st, i) => (
            <div
              key={i}
              className={`p-5 sm:p-6 min-h-[96px] sm:min-h-[106px] flex items-center justify-center text-center rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xs hover:shadow-xl border-t-4 transition-all duration-300 hover:-translate-y-1 cursor-default ${st.accent}`}
            >
              <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
                {st.title}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
