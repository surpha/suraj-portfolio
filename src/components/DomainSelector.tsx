"use client";

import { motion } from "framer-motion";
import { DomainConfig } from "@/types";

interface DomainSelectorProps {
  domains: DomainConfig[];
  onSelect: (domainId: string) => void;
}

const profileIcons: Record<string, string> = {
  "data-science": "🧠",
  sidequests: "🚀",
  activities: "🏃",
  network: "🌐",
};

export default function DomainSelector({ domains, onSelect }: DomainSelectorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#141414] px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <h1 className="mb-2 text-4xl font-normal text-white sm:text-[3.5rem]">
          Suraj Phalod
        </h1>
        <p className="text-base text-[#808080] sm:text-lg">
          Select a profile to explore
        </p>

        <div className="mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-8">
          {domains.map((domain, index) => (
            <motion.button
              key={domain.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => onSelect(domain.id)}
              className="group flex flex-col items-center gap-3"
            >
              {/* Profile avatar */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`profile-avatar-${index} flex h-[120px] w-[120px] items-center justify-center rounded-md sm:h-[140px] sm:w-[140px] lg:h-[160px] lg:w-[160px]`}
                style={{
                  border: "3px solid transparent",
                }}
              >
                <span className="text-5xl sm:text-6xl">
                  {profileIcons[domain.id] ?? "📂"}
                </span>
              </motion.div>

              {/* Profile name */}
              <span className="text-sm text-[#808080] transition-colors group-hover:text-white sm:text-base">
                {domain.title}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Manage Profiles button (decorative, like Netflix) */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 border border-[#808080] px-6 py-2 text-sm font-medium tracking-[0.2em] text-[#808080] transition-colors hover:border-white hover:text-white"
        >
          MANAGE PROFILES
        </motion.button>
      </motion.div>
    </div>
  );
}
