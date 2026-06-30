"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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

interface DomainSelectorProps {
  domains: DomainConfig[];
  personal: PersonalMetadata;
  onSelect: (domainId: string) => void;
}

const profileIcons: Record<string, ReactNode> = {
  experience: <Briefcase size={36} strokeWidth={1.5} />,
  education: <GraduationCap size={36} strokeWidth={1.5} />,
  "data-science": <BrainCircuit size={36} strokeWidth={1.5} />,
  sidequests: <Rocket size={36} strokeWidth={1.5} />,
  activities: <Activity size={36} strokeWidth={1.5} />,
  network: <Globe size={36} strokeWidth={1.5} />,
};

export default function DomainSelector({ domains, personal, onSelect }: DomainSelectorProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#141414] px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* About Me */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-center text-center"
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
        <p className="mb-8 text-base text-[#808080] sm:text-lg">
          Select a profile to explore
        </p>

        <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-6">
          {domains.map((domain, index) => (
            <motion.button
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              onClick={() => onSelect(domain.id)}
              className="group flex flex-col items-center gap-3"
            >
              <motion.div
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="flex h-[100px] w-[100px] items-center justify-center rounded-xl border border-[#333] bg-transparent text-[#808080] transition-colors group-hover:text-white sm:h-[120px] sm:w-[120px]"
              >
                {profileIcons[domain.id] ?? <Briefcase size={36} strokeWidth={1.5} />}
              </motion.div>

              <span className="text-xs text-[#808080] transition-colors group-hover:text-white sm:text-sm">
                {domain.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Recruiter CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => router.push("/recruiter")}
          className="mt-16 border border-[#808080] px-6 py-2 text-sm font-medium tracking-[0.2em] text-[#808080] transition-colors hover:border-white hover:text-white"
        >
          ARE YOU A RECRUITER?
        </motion.button>
      </motion.div>
    </div>
  );
}
