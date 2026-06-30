"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { PersonalMetadata, DomainConfig } from "@/types";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import {
  Briefcase,
  GraduationCap,
  BrainCircuit,
  Rocket,
  Activity,
  Globe,
  ExternalLink,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { type ReactNode } from "react";

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

interface SummaryLandingProps {
  personal: PersonalMetadata;
  domains: DomainConfig[];
  onExplore: () => void;
  onSelectDomain: (id: string) => void;
}

const socialLinks = [
  { icon: <FaGithub size={18} />, href: "https://github.com/surpha", label: "GitHub" },
  { icon: <FaLinkedinIn size={18} />, href: "https://www.linkedin.com/in/suraj-phalod-26a042204/", label: "LinkedIn" },
  { icon: <FaXTwitter size={18} />, href: "https://x.com/surpharosh", label: "X" },
  { icon: <FaInstagram size={18} />, href: "https://www.instagram.com/surpharosh", label: "Instagram" },
  { icon: <SiSubstack size={16} />, href: "https://substack.com", label: "Substack" },
  { icon: <HiOutlineMail size={18} />, href: "mailto:hello@surajphalod.com", label: "Email" },
];

const experienceSnapshot = [
  { role: "Data Science Manager", company: "Procter & Gamble", period: "2023 — Present", current: true },
  { role: "Data Scientist", company: "Procter & Gamble", period: "2021 — 2023", current: false },
  { role: "Intern", company: "Procter & Gamble", period: "2020 — 2021", current: false },
];

const featuredProjects = [
  { title: "Sanyam App", desc: "NFC-based distraction blocker for Android", tag: "Hardware" },
  { title: "Shiva Kingdom Farm Stay", desc: "Heritage Airbnb in Udaipur with AI guest agents", tag: "Hospitality" },
  { title: "SOCaiL Media", desc: "AI-assisted digital marketing framework", tag: "Agency" },
];

const domainIcons: Record<string, ReactNode> = {
  experience: <Briefcase size={20} strokeWidth={2} />,
  education: <GraduationCap size={20} strokeWidth={2} />,
  "data-science": <BrainCircuit size={20} strokeWidth={2} />,
  sidequests: <Rocket size={20} strokeWidth={2} />,
  activities: <Activity size={20} strokeWidth={2} />,
  network: <Globe size={20} strokeWidth={2} />,
};

const domainGlow: Record<string, string> = {
  experience: "139, 92, 246",
  education: "59, 130, 246",
  "data-science": "99, 102, 241",
  sidequests: "236, 72, 153",
  activities: "34, 197, 94",
  network: "6, 182, 212",
};

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 20 } as const,
  animate: { opacity: 1, y: 0 } as const,
  transition: { duration: 0.5, delay },
});

export default function SummaryLanding({ personal, domains, onExplore, onSelectDomain }: SummaryLandingProps) {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <ParticleField />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Top bar — name + socials */}
        <motion.nav
          {...anim(0)}
          className="mb-10 flex items-center justify-between"
        >
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {personal.name}
          </h1>
          <div className="flex items-center gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#aaa] transition-all hover:bg-white/5 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-[#aaa] transition-all hover:border-white/25 hover:text-white"
            >
              Resume <ExternalLink size={11} />
            </a>
            <Link
              href="/recruiter"
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-[#aaa] transition-all hover:border-white/25 hover:text-white"
            >
              Recruiter
            </Link>
          </div>
        </motion.nav>

        {/* ===== MAIN CONTENT AREA (top ~75%) ===== */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* LEFT: About me + photo — spans 2 cols */}
          <motion.div
            {...anim(0.1)}
            className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm lg:col-span-2"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              {/* Photo */}
              <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#6366f1]/20 to-[#8b5cf6]/20 sm:h-32 sm:w-32">
                  <Image
                  src="/IMG-20260424-WA0154.jpg"
                  alt="Suraj Phalod"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  {personal.name}
                </h2>
                <p className="mt-2 text-lg text-[#b3b3b3]">
                  {personal.headline}
                </p>
                <div className="mt-2 flex items-center gap-2 text-sm text-[#aaa]">
                  <MapPin size={14} />
                  <span>{personal.company} · Mumbai, India</span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-base leading-relaxed text-[#bbb]">
              {personal.about}
            </p>
            <p className="mt-3 text-sm text-[#bbb]">
              {personal.education}
            </p>
          </motion.div>

          {/* RIGHT: Experience */}
          <motion.div
            {...anim(0.2)}
            className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
                Experience
              </h3>
              <span className="text-xs text-[#bbb]">{experienceSnapshot.length} positions</span>
            </div>
            <div className="flex flex-1 flex-col justify-center space-y-5">
              {experienceSnapshot.map((exp, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04]">
                    <Briefcase size={16} className="text-[#6366f1]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-medium text-white">
                      {exp.role}
                      {exp.current && (
                        <span className="ml-2 inline-block rounded-full bg-[#6366f1]/15 px-2.5 py-0.5 text-[11px] font-medium text-[#6366f1]">
                          Current
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-[#aaa]">
                      {exp.company} · {exp.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Featured Projects — full width */}
          <motion.div
            {...anim(0.3)}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 backdrop-blur-sm lg:col-span-3"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xs font-semibold tracking-wide text-white uppercase">
                Featured Projects
              </h3>
              <button
                onClick={() => onSelectDomain("sidequests")}
                className="flex items-center gap-1 text-xs text-[#6366f1] transition-colors hover:text-white"
              >
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {featuredProjects.map((proj, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                  className="group cursor-pointer rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-[#bbb]">
                      {proj.tag}
                    </span>
                    <ArrowRight size={12} className="text-[#888] transition-colors group-hover:text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{proj.title}</h4>
                  <p className="mt-1 text-xs text-[#aaa]">{proj.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===== BOTTOM SECTION (~25%) — Domain cards ===== */}
        <motion.div {...anim(0.5)} className="mt-8">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wide text-white uppercase">
              Explore
            </h3>
            <button
              onClick={onExplore}
              className="flex items-center gap-1 text-xs text-[#6366f1] transition-colors hover:text-white"
            >
              All Profiles <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {domains.map((domain, i) => {
              const glow = domainGlow[domain.id] ?? "99, 102, 241";
              return (
                <motion.button
                  key={domain.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.04, duration: 0.3 }}
                  onClick={() => onSelectDomain(domain.id)}
                  className="neon-card group flex flex-col items-center gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-6 transition-all hover:border-white/15 hover:bg-white/[0.04]"
                  style={{ "--neon-rgb": glow } as React.CSSProperties}
                >
                  <div className="neon-card-inner flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 text-[#aaa] transition-all group-hover:text-white">
                    {domainIcons[domain.id] ?? <Briefcase size={20} />}
                  </div>
                  <span className="text-sm font-semibold text-[#bbb] transition-colors group-hover:text-white">
                    {domain.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-between border-t border-white/[0.04] pt-6">
          <p className="text-xs text-[#666]">
            © {new Date().getFullYear()} {personal.name}
          </p>
          <a
            href="/recruiter"
            className="text-xs text-[#888] transition-colors hover:text-white"
          >
            Are you a recruiter? →
          </a>
        </div>
      </div>
    </div>
  );
}
