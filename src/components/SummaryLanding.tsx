"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { PersonalMetadata, DomainConfig } from "@/types";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { ChevronRight } from "lucide-react";

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

interface SummaryLandingProps {
  personal: PersonalMetadata;
  domains: DomainConfig[];
  onExplore: () => void;
}

const socialLinks = [
  { icon: <FaGithub size={18} />, href: "https://github.com/surpha", label: "GitHub" },
  { icon: <FaLinkedinIn size={18} />, href: "https://www.linkedin.com/in/suraj-phalod-26a042204/", label: "LinkedIn" },
  { icon: <FaXTwitter size={18} />, href: "https://x.com/surpharosh", label: "X" },
  { icon: <SiSubstack size={16} />, href: "https://substack.com", label: "Substack" },
  { icon: <HiOutlineMail size={18} />, href: "mailto:hello@surajphalod.com", label: "Email" },
];

const experienceSnapshot = [
  { role: "Data Science Manager", company: "Procter & Gamble", period: "2023 — Present" },
  { role: "Data Scientist", company: "Procter & Gamble", period: "2021 — 2023" },
  { role: "Intern", company: "Procter & Gamble", period: "2020 — 2021" },
];

export default function SummaryLanding({ personal, domains, onExplore }: SummaryLandingProps) {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <ParticleField />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start"
        >
          <p className="text-sm tracking-widest text-[#6366f1] uppercase">
            Welcome
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
            {personal.name}
          </h1>

          <p className="mt-3 text-xl text-[#b3b3b3] sm:text-2xl">
            {personal.headline} at{" "}
            <span className="text-white">{personal.company}</span>
          </p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-[#888]"
          >
            {personal.about}
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex items-center gap-3"
          >
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#808080] transition-all hover:border-white/30 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium tracking-wider text-[#808080] transition-all hover:border-white/30 hover:text-white"
            >
              RESUME
            </a>
          </motion.div>
        </motion.div>

        {/* Experience snapshot */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-20"
        >
          <h2 className="mb-6 text-xs font-medium tracking-widest text-[#666] uppercase">
            Experience
          </h2>
          <div className="space-y-0 border-l border-white/10 pl-6">
            {experienceSnapshot.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                className="relative py-4"
              >
                {/* Dot */}
                <div className="absolute -left-[29px] top-[22px] h-2.5 w-2.5 rounded-full border border-white/20 bg-[#0a0a0a]">
                  <div className="absolute inset-[3px] rounded-full bg-[#6366f1]" />
                </div>

                <p className="text-sm font-semibold text-white">
                  {exp.role}
                </p>
                <p className="mt-0.5 text-sm text-[#808080]">
                  {exp.company} · {exp.period}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Domains preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-20"
        >
          <h2 className="mb-6 text-xs font-medium tracking-widest text-[#666] uppercase">
            Explore
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {domains.map((domain, i) => (
              <motion.button
                key={domain.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                onClick={onExplore}
                className="group flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-left transition-all hover:border-white/15 hover:bg-white/[0.04]"
              >
                <span className="text-sm text-[#999] transition-colors group-hover:text-white">
                  {domain.title}
                </span>
                <ChevronRight size={14} className="text-[#555] transition-colors group-hover:text-white" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-16 flex items-center gap-4"
        >
          <button
            onClick={onExplore}
            className="rounded-full bg-[#6366f1] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5558e6]"
          >
            Explore All Profiles
          </button>
          <a
            href="/recruiter"
            className="text-sm text-[#666] transition-colors hover:text-white"
          >
            Are you a recruiter? →
          </a>
        </motion.div>

        {/* Footer */}
        <p className="mt-24 text-xs text-[#444]">
          © {new Date().getFullYear()} {personal.name}
        </p>
      </div>
    </div>
  );
}
