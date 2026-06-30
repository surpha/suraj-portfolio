"use client";

import { useState, useEffect } from "react";
import { Search, Bell } from "lucide-react";
import { DomainConfig, PersonalMetadata, MediaItem } from "@/types";
import HeroBanner from "./HeroBanner";
import ContentRow from "./ContentRow";
import InfoModal from "./InfoModal";
import NetworkHero from "./NetworkHero";

interface DashboardLayoutProps {
  domain: DomainConfig;
  personal: PersonalMetadata;
  allDomains: DomainConfig[];
  onSwitchDomain: (domainId: string) => void;
  onReset: () => void;
}

export default function DashboardLayout({
  domain,
  personal,
  allDomains,
  onSwitchDomain,
  onReset,
}: DashboardLayoutProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#141414]">
      {/* Netflix-style top nav — transparent → black on scroll */}
      <nav
        className={`fixed left-0 right-0 top-0 z-40 flex items-center px-[4%] py-3 transition-colors duration-500 ${
          scrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        {/* Logo / Brand */}
        <button
          onClick={onReset}
          className="mr-6 text-xl font-extrabold tracking-tight text-[#e50914] transition-opacity hover:opacity-80 sm:text-2xl"
        >
          SURAJFLIX
        </button>

        {/* Nav links — domain switching */}
        <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto sm:gap-4">
          {allDomains.map((d) => (
            <button
              key={d.id}
              onClick={() => onSwitchDomain(d.id)}
              className={`whitespace-nowrap px-1 py-1 text-xs font-medium transition-colors sm:text-sm ${
                d.id === domain.id
                  ? "text-white font-bold"
                  : "text-[#e5e5e5] hover:text-[#b3b3b3]"
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>

        {/* Right side icons */}
        <div className="ml-auto flex items-center gap-4">
          <Search className="h-4 w-4 text-white cursor-pointer hover:text-[#b3b3b3] transition-colors" />
          <Bell className="h-4 w-4 text-white cursor-pointer hover:text-[#b3b3b3] transition-colors" />
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-[4px] bg-[#e50914] text-xs font-bold text-white transition-colors hover:bg-[#f40612]"
          >
            SP
          </a>
        </div>
      </nav>

      {/* Hero Billboard — auto-cycling for Network, standard for others */}
      {domain.id === "network" && domain.rows[0] ? (
        <NetworkHero
          items={domain.rows.flatMap((r) => r.items)}
          resumeUrl={personal.resumeUrl}
        />
      ) : (
        <HeroBanner
          hero={domain.hero}
          domainTitle={domain.title}
          resumeUrl={personal.resumeUrl}
        />
      )}

      {/* Content rows — Netflix-style */}
      <div className="relative z-10 -mt-16 pb-16">
        {domain.rows.map((row) => (
          <ContentRow
            key={row.rowTitle}
            row={row}
            onItemClick={setSelectedItem}
          />
        ))}
      </div>

      {/* Detail modal */}
      <InfoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
