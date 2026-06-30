"use client";

import { motion } from "framer-motion";
import { HeroConfig } from "@/types";

interface HeroBannerProps {
  hero: HeroConfig;
  domainTitle: string;
}

export default function HeroBanner({ hero, domainTitle }: HeroBannerProps) {
  return (
    <section className="relative flex min-h-[80vh] flex-col justify-end bg-[#0a0a0a]">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-x-0 top-0 h-[72px] bg-gradient-to-b from-[#0a0a0a]/80 to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-xl px-[4%] pb-[8%]"
      >
        {/* Category badge */}
        <div className="mb-4 flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-sm font-medium text-white/80">
            <span className="inline-block h-5 w-1 rounded-full bg-gradient-to-b from-purple-500 to-blue-500" />
            {hero.badge}
          </span>
          <span className="text-sm text-white/40">•</span>
          <span className="text-sm text-white/40">{domainTitle}</span>
        </div>

        {/* Title */}
        <h1 className="text-[2.5rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
          {hero.title}
        </h1>

        {/* Description */}
        <p className="mt-4 line-clamp-3 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
          {hero.description}
        </p>
      </motion.div>
    </section>
  );
}
