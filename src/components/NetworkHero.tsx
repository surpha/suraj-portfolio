"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram, FaYoutube, FaSpotify, FaStrava, FaMedium } from "react-icons/fa6";
import { SiSubstack } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { type IconType } from "react-icons";
import { MediaItem } from "@/types";

const iconMap: Record<string, IconType> = {
  GitHub: FaGithub,
  LinkedIn: FaLinkedinIn,
  "Twitter / X": FaXTwitter,
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  Spotify: FaSpotify,
  Substack: SiSubstack,
  Medium: FaMedium,
  Email: HiOutlineMail,
  Strava: FaStrava,
};

const brandColorMap: Record<string, string> = {
  GitHub: "#f0f6fc",
  LinkedIn: "#0a66c2",
  "Twitter / X": "#f0f0f0",
  Instagram: "#e4405f",
  YouTube: "#ff0000",
  Spotify: "#1db954",
  Substack: "#ff6719",
  Medium: "#f0f0f0",
  Email: "#ea4335",
  Strava: "#fc4c02",
};

interface NetworkHeroProps {
  items: MediaItem[];
  resumeUrl: string;
}

export default function NetworkHero({ items, resumeUrl }: NetworkHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const item = items[activeIndex];
  const Icon = iconMap[item.title];
  const color = brandColorMap[item.title] ?? "#ffffff";

  return (
    <section
      className="relative flex min-h-[85vh] flex-col justify-end bg-[#141414]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#141414]" />
        <div className="absolute inset-x-0 top-0 h-[72px] bg-gradient-to-b from-[#141414]/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-end gap-12 px-[4%] pb-[8%] lg:items-center">
        {/* Left: large rotating brand icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.5 }}
            className="hidden flex-shrink-0 lg:block"
          >
            {Icon && (
              <Icon
                size={180}
                style={{
                  color,
                  filter: `drop-shadow(0 0 40px ${color}40) drop-shadow(0 0 80px ${color}20)`,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Right: info panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            {/* Mobile icon */}
            <div className="mb-4 lg:hidden">
              {Icon && <Icon size={64} style={{ color }} />}
            </div>

            <div className="mb-4 flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-white/90">
                <span className="inline-block h-6 w-1 rounded-sm" style={{ backgroundColor: color }} />
                {item.tag}
              </span>
              <span className="text-sm text-white/50">•</span>
              <span className="text-sm text-white/50">The Network</span>
            </div>

            <h1 className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              {item.title}
            </h1>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-[#d2d2d2] sm:text-lg">
              {item.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-[4px] bg-white px-6 py-2 text-base font-semibold text-black transition-colors hover:bg-white/75"
                >
                  <ExternalLink className="h-5 w-5" />
                  Visit {item.title}
                </a>
              )}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[4px] bg-[#6d6d6e]/70 px-6 py-2 text-base font-semibold text-white transition-colors hover:bg-[#6d6d6e]/40"
              >
                Download Resume
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom progress indicators */}
      <div className="absolute bottom-6 right-[4%] z-10 flex items-center gap-1.5">
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={() => setActiveIndex(i)}
            className="group relative h-1 overflow-hidden rounded-full transition-all duration-300"
            style={{ width: i === activeIndex ? 32 : 12 }}
          >
            <div className="absolute inset-0 rounded-full bg-white/30" />
            {i === activeIndex && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: color }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
                key={`progress-${activeIndex}`}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
