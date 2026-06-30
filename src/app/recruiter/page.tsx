"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import config from "@/data/configuration.json";
import { FullPortfolioConfig } from "@/types";

const portfolio = config as FullPortfolioConfig;
const { personal, domains } = portfolio;

const experienceItems = domains.experience?.rows?.[0]?.items ?? [];
const educationItems = domains.education?.rows?.[0]?.items ?? [];

export default function RecruiterPage() {
  return (
    <div className="min-h-screen bg-[#141414] px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-[#808080] transition-colors hover:text-white"
        >
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold sm:text-5xl">{personal.name}</h1>
          <p className="mt-2 text-xl text-[#b3b3b3]">
            {personal.headline}
          </p>
          <p className="mt-1 text-base text-[#808080]">
            {personal.company}
          </p>
        </motion.div>

        {/* Resume download */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex gap-4"
        >
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-[#e50914] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#f40612]"
          >
            Download Resume <ExternalLink size={14} />
          </a>
          <a
            href="mailto:hello@surajphalod.com"
            className="inline-flex items-center gap-2 rounded border border-[#808080] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white"
          >
            Contact Me
          </a>
        </motion.div>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12"
        >
          <h2 className="mb-4 text-2xl font-semibold text-white">Education</h2>
          <p className="text-base text-[#b3b3b3]">{personal.education}</p>
          <div className="mt-4 space-y-3">
            {educationItems.map((item) => (
              <div key={item.id} className="rounded bg-[#1a1a1a] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{item.title}</span>
                  <span className="text-xs text-[#808080]">{item.tag}</span>
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-[#808080]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <h2 className="mb-4 text-2xl font-semibold text-white">Experience</h2>
          <div className="space-y-3">
            {experienceItems.map((item) => (
              <div key={item.id} className="rounded bg-[#1a1a1a] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white">{item.title}</span>
                  <span className="text-xs text-[#808080]">{item.tag}</span>
                </div>
                {item.description && (
                  <p className="mt-1 text-sm text-[#808080]">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Key Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12"
        >
          <h2 className="mb-4 text-2xl font-semibold text-white">Links</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/surpha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded bg-[#1a1a1a] px-4 py-2 text-sm text-[#b3b3b3] transition-colors hover:text-white"
            >
              GitHub <ExternalLink size={12} />
            </a>
            <a
              href="https://www.linkedin.com/in/suraj-phalod-26a042204/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded bg-[#1a1a1a] px-4 py-2 text-sm text-[#b3b3b3] transition-colors hover:text-white"
            >
              LinkedIn <ExternalLink size={12} />
            </a>
            <a
              href="https://kaggle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded bg-[#1a1a1a] px-4 py-2 text-sm text-[#b3b3b3] transition-colors hover:text-white"
            >
              Kaggle <ExternalLink size={12} />
            </a>
          </div>
        </motion.section>

        <p className="mt-16 text-center text-xs text-[#555]">
          Built with Next.js · Hosted on Vercel
        </p>
      </div>
    </div>
  );
}
