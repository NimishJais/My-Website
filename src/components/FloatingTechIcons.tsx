"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  DockerIcon,
  KubernetesIcon,
  JenkinsIcon,
  SpringBootIcon,
} from "./hero/TechIcons";
import {
  AwsIcon,
  GitIcon,
  PythonIcon,
  LinuxIcon,
} from "./hero/TechBrandIcons";

interface FloatIcon {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  tint: string;
  pos: string;
  badge: string;
  icon: string;
  dur: number;
  delay: number;
}

// Desktop (lg+): ~9 icons scattered along the left/right page edges at various scroll depths
const desktopIcons: FloatIcon[] = [
  { Icon: DockerIcon, label: "Docker", tint: "text-amber-700", pos: "left-[2%] top-[7%]", badge: "w-14 h-14", icon: "w-7 h-7", dur: 6.2, delay: 0 },
  { Icon: KubernetesIcon, label: "Kubernetes", tint: "text-orange-700", pos: "right-[2.5%] top-[15%]", badge: "w-10 h-10", icon: "w-5 h-5", dur: 5.4, delay: 0.7 },
  { Icon: JenkinsIcon, label: "Jenkins", tint: "text-rose-700", pos: "left-[1.5%] top-[28%]", badge: "w-10 h-10", icon: "w-5 h-5", dur: 6.8, delay: 1.2 },
  { Icon: SpringBootIcon, label: "Spring Boot", tint: "text-amber-600", pos: "right-[2%] top-[38%]", badge: "w-14 h-14", icon: "w-7 h-7", dur: 5.8, delay: 0.3 },
  { Icon: AwsIcon, label: "AWS", tint: "text-orange-600", pos: "left-[2.5%] top-[50%]", badge: "w-10 h-10", icon: "w-5 h-5", dur: 6.4, delay: 1.6 },
  { Icon: GitIcon, label: "Git", tint: "text-rose-600", pos: "right-[1.5%] top-[60%]", badge: "w-8 h-8", icon: "w-4 h-4", dur: 5.2, delay: 0.9 },
  { Icon: PythonIcon, label: "Python", tint: "text-amber-700", pos: "left-[3%] top-[71%]", badge: "w-12 h-12", icon: "w-6 h-6", dur: 7.1, delay: 0.5 },
  { Icon: LinuxIcon, label: "Linux", tint: "text-orange-700", pos: "right-[2.5%] top-[82%]", badge: "w-10 h-10", icon: "w-5 h-5", dur: 6.0, delay: 1.9 },
  { Icon: DockerIcon, label: "Docker", tint: "text-amber-600", pos: "left-[2%] top-[93%]", badge: "w-8 h-8", icon: "w-4 h-4", dur: 5.6, delay: 1.1 },
];

// Mobile: 4 small icons tucked at the very edges, reduced presence
const mobileIcons: FloatIcon[] = [
  { Icon: DockerIcon, label: "Docker", tint: "text-amber-700", pos: "left-[1%] top-[8%]", badge: "w-8 h-8", icon: "w-4 h-4", dur: 6.2, delay: 0 },
  { Icon: KubernetesIcon, label: "Kubernetes", tint: "text-orange-700", pos: "right-[1%] top-[42%]", badge: "w-8 h-8", icon: "w-4 h-4", dur: 5.8, delay: 0.9 },
  { Icon: SpringBootIcon, label: "Spring Boot", tint: "text-amber-600", pos: "left-[1%] top-[68%]", badge: "w-8 h-8", icon: "w-4 h-4", dur: 6.6, delay: 0.4 },
  { Icon: JenkinsIcon, label: "Jenkins", tint: "text-rose-700", pos: "right-[1%] top-[88%]", badge: "w-8 h-8", icon: "w-4 h-4", dur: 6.0, delay: 1.3 },
];

function Badge({ Icon, label, tint, pos, badge, icon, dur, delay, opacity }: FloatIcon & { opacity: string }) {
  return (
    <motion.div
      title={label}
      aria-label={label}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
      className={`absolute ${pos} ${badge} ${opacity} items-center justify-center rounded-full bg-white/60 backdrop-blur-md border border-white/60 shadow-lg shadow-amber-900/10`}
      style={{ display: "flex" }}
    >
      <Icon className={`${icon} ${tint}`} />
    </motion.div>
  );
}

export function FloatingTechIcons() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      {/* Desktop scatter */}
      <div className="absolute inset-0 hidden lg:block">
        {desktopIcons.map((d, i) => (
          <Badge key={`d-${i}-${d.label}`} {...d} opacity="opacity-70" />
        ))}
      </div>
      {/* Mobile scatter */}
      <div className="absolute inset-0 lg:hidden">
        {mobileIcons.map((m, i) => (
          <Badge key={`m-${i}-${m.label}`} {...m} opacity="opacity-40" />
        ))}
      </div>
    </div>
  );
}
