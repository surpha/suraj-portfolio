"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram, FaYoutube, FaSpotify, FaStrava, FaMedium } from "react-icons/fa6";
import { SiSubstack, SiHevy, SiLetterboxd } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import { IoRestaurant } from "react-icons/io5";
import { ContentRow as ContentRowType, MediaItem } from "@/types";
import { type IconType } from "react-icons";

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
  Hevy: "#2563eb",
  Letterboxd: "#00d735",
  Beli: "#ff6b35",
};

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
  Hevy: SiHevy,
  Letterboxd: SiLetterboxd,
  Beli: IoRestaurant,
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
      <div className="group/row relative -mx-1 overflow-visible">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-1 top-0 z-20 hidden h-full w-10 items-center justify-center bg-[#141414]/60 text-white opacity-0 transition-opacity group-hover/row:flex group-hover/row:opacity-100"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>

        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto px-1 py-6"
        >
          {row.items.map((item, index) => {
            const Icon = iconMap[item.title];
            const brandColor = brandColorMap[item.title];
            return (
              <motion.a
                key={item.id}
                href={item.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative flex w-[140px] flex-shrink-0 flex-col items-center gap-3 overflow-visible rounded-lg bg-[#181818] p-5 text-center transition-transform duration-300 hover:z-10 hover:scale-110 hover:bg-[#252525] hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)] sm:w-[160px]"
              >
                {/* Brand logo */}
                <div className="flex h-14 w-14 items-center justify-center">
                  {Icon ? (
                    <Icon
                      size={44}
                      className="transition-all duration-300 group-hover:scale-110"
                      style={{ color: brandColor ?? "rgba(255,255,255,0.4)" }}
                    />
                  ) : (
                    <span className="text-2xl font-bold text-white/30">{item.title.charAt(0)}</span>
                  )}
                </div>

                {/* Name only */}
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              </motion.a>
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
