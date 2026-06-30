"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Music,
  BookOpen,
  Mail,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { ContentRow as ContentRowType, MediaItem } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  "Twitter / X": Twitter,
  Instagram: Instagram,
  YouTube: Youtube,
  Spotify: Music,
  Substack: BookOpen,
  Medium: BookOpen,
  Email: Mail,
  Strava: Activity,
};

interface ContentRowProps {
  row: ContentRowType;
  onItemClick: (item: MediaItem) => void;
}

export default function ContentRow({ row, onItemClick }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative px-[4%] py-4">
      <h2 className="mb-1 text-sm font-bold text-[#e5e5e5] sm:text-base lg:text-xl">
        {row.rowTitle}
      </h2>

      {/* Scroll container with Netflix-style edge arrows */}
      <div className="group/row relative -mx-1">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-1 top-0 z-20 hidden h-full w-10 items-center justify-center bg-[#141414]/60 text-white opacity-0 transition-opacity group-hover/row:flex group-hover/row:opacity-100"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-[4px] overflow-x-auto px-1 py-3"
        >
          {row.items.map((item, index) => {
            const Icon = iconMap[item.title];
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onItemClick(item)}
                className="netflix-card group relative flex w-[230px] flex-shrink-0 flex-col overflow-hidden rounded-[4px] bg-[#181818] text-left transition-transform duration-300 hover:z-10 hover:scale-[1.4] hover:shadow-[0_0_20px_rgba(0,0,0,0.7)] sm:w-[250px] lg:w-[280px]"
              >
                {/* Card top — icon or fallback */}
                <div className="flex h-[140px] items-center justify-center bg-gradient-to-br from-[#333] to-[#1a1a1a]">
                  {Icon ? (
                    <Icon className="h-14 w-14 text-white/40 transition-colors group-hover:text-white/70" />
                  ) : (
                    <span className="text-lg font-bold text-white/20">{item.title}</span>
                  )}
                </div>

                {/* Card bottom info — hidden by default, shown on hover */}
                <div className="flex flex-col gap-1.5 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#46d369]">{item.tag}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-[#d2d2d2]">
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute -right-1 top-0 z-20 hidden h-full w-10 items-center justify-center bg-[#141414]/60 text-white opacity-0 transition-opacity group-hover/row:flex group-hover/row:opacity-100"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}
