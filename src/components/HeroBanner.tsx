"use client";

import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";
import { HeroConfig } from "@/types";

interface HeroBannerProps {
  hero: HeroConfig;
  domainTitle: string;
  resumeUrl: string;
  onMoreInfo?: () => void;
}

export default function HeroBanner({ hero, domainTitle, resumeUrl, onMoreInfo }: HeroBannerProps) {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-end bg-[#141414]">
      {/* Simulated billboard background with gradient noise */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]" />
        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 h-[72px] bg-gradient-to-b from-[#141414]/80 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl px-[4%] pb-[8%]"
      >
        {/* Netflix-style top-10 badge or category badge */}
        <div className="mb-4 flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-medium text-white/90">
            <span className="inline-block h-6 w-1 rounded-sm bg-[#e50914]" />
            {hero.badge}
          </span>
          <span className="text-sm text-white/50">•</span>
          <span className="text-sm text-white/50">{domainTitle}</span>
        </div>

        {/* Title — large Netflix billboard style */}
        <h1 className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          {hero.title}
        </h1>

        {/* Synopsis text */}
        <p className="mt-4 line-clamp-3 max-w-lg text-base leading-relaxed text-[#d2d2d2] sm:text-lg">
          {hero.description}
        </p>

        {/* Action buttons — Netflix Play + More Info */}
        <div className="mt-6 flex items-center gap-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-[4px] bg-white px-6 py-2 text-base font-semibold text-black transition-colors hover:bg-white/75"
          >
            <Play className="h-5 w-5 fill-black" />
            {hero.actionLabel}
          </a>
          <button
            onClick={onMoreInfo}
            className="inline-flex items-center gap-2 rounded-[4px] bg-[#6d6d6e]/70 px-6 py-2 text-base font-semibold text-white transition-colors hover:bg-[#6d6d6e]/40"
          >
            <Info className="h-5 w-5" />
            More Info
          </button>
        </div>
      </motion.div>
    </section>
  );
}
