"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { DomainConfig, PersonalMetadata } from "@/types";
import {
  Briefcase,
  GraduationCap,
  BrainCircuit,
  Rocket,
  Activity,
  Globe,
} from "lucide-react";
import { type ReactNode } from "react";

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

interface DomainSelectorProps {
  domains: DomainConfig[];
  personal: PersonalMetadata;
  onSelect: (domainId: string) => void;
}

const domainMeta: Record<string, { icon: ReactNode; glow: string }> = {
  experience: {
    icon: <Briefcase size={36} strokeWidth={2} />,
    glow: "139, 92, 246",
  },
  education: {
    icon: <GraduationCap size={36} strokeWidth={2} />,
    glow: "59, 130, 246",
  },
  "data-science": {
    icon: <BrainCircuit size={36} strokeWidth={2} />,
    glow: "99, 102, 241",
  },
  sidequests: {
    icon: <Rocket size={36} strokeWidth={2} />,
    glow: "236, 72, 153",
  },
  activities: {
    icon: <Activity size={36} strokeWidth={2} />,
    glow: "34, 197, 94",
  },
  network: {
    icon: <Globe size={36} strokeWidth={2} />,
    glow: "6, 182, 212",
  },
};

export default function DomainSelector({ domains, personal, onSelect }: DomainSelectorProps) {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 py-16">
      <ParticleField />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* About Me */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {personal.name}
          </h1>
          <p className="mt-3 text-lg text-[#b3b3b3] sm:text-xl">
            {personal.headline} at {personal.company}
          </p>
          <p className="mt-1 max-w-md text-sm text-[#808080]">
            {personal.education}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-[#999]"
          >
            {personal.about}
          </motion.p>
        </motion.div>

        {/* Section label */}
        <p className="mb-8 text-sm tracking-widest text-[#666] uppercase">
          Select a profile to explore
        </p>

        <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-6">
          {domains.map((domain, index) => {
            const meta = domainMeta[domain.id] ?? domainMeta["data-science"];
            return (
              <motion.button
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => onSelect(domain.id)}
                className="neon-card group flex flex-col items-center gap-3"
                style={{ "--neon-rgb": meta.glow } as React.CSSProperties}
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="neon-card-inner flex h-[100px] w-[100px] items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[#808080] backdrop-blur-sm transition-all duration-300 group-hover:text-white sm:h-[120px] sm:w-[120px]"
                >
                  {meta.icon}
                </motion.div>

                <span className="text-xs font-semibold tracking-wide text-[#888] transition-colors group-hover:text-white sm:text-sm">
                  {domain.title}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Recruiter CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => router.push("/recruiter")}
          className="mt-16 border border-[#333] px-6 py-2 text-sm font-medium tracking-[0.2em] text-[#666] transition-all hover:border-[#6366f1]/50 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
        >
          ARE YOU A RECRUITER?
        </motion.button>
      </motion.div>
    </div>
  );
}
