"use client";

import { useState, useEffect } from "react";
import { DomainConfig, PersonalMetadata, MediaItem } from "@/types";
import HeroBanner from "./HeroBanner";
import ContentRow from "./ContentRow";
import InfoModal from "./InfoModal";
import NetworkHero from "./NetworkHero";
import EducationTimeline from "./EducationTimeline";

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
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top nav */}
      <nav
        className={`fixed left-0 right-0 top-0 z-40 flex items-center px-3 py-2.5 transition-all duration-500 sm:px-[4%] sm:py-3 ${
          scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        {/* Logo / Brand */}
        <button
          onClick={onReset}
          className="mr-3 flex-shrink-0 text-base font-bold tracking-tight text-white transition-opacity hover:opacity-70 sm:mr-6 sm:text-xl"
        >
          {personal.name.split(" ")[0]}
        </button>

        {/* Nav links — domain switching */}
        <div className="scrollbar-hide flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto sm:gap-3">
          {allDomains.map((d) => (
            <button
              key={d.id}
              onClick={() => onSwitchDomain(d.id)}
              className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium transition-all sm:px-3 sm:text-sm ${
                d.id === domain.id
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white/90"
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>

        {/* Right side — Resume & Contact */}
        <div className="ml-2 flex flex-shrink-0 items-center gap-1.5 sm:ml-auto sm:gap-2">
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80 transition-all hover:border-white/25 hover:text-white sm:text-xs"
          >
            Resume
          </a>
          <a
            href="mailto:hello@surajphalod.com"
            className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-white/80 transition-all hover:border-white/25 hover:text-white sm:text-xs"
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero Billboard — auto-cycling for Network, standard for others */}
      {domain.id === "network" && domain.rows[0] ? (
        <NetworkHero
          items={domain.rows.flatMap((r) => r.items)}
        />
      ) : domain.id === "education" ? null : (
        <HeroBanner
          hero={domain.hero}
          domainTitle={domain.title}
        />
      )}

      {/* Education timeline layout */}
      {domain.id === "education" && domain.educationEntries ? (
        <div className="pt-24">
          <div className="mx-auto max-w-4xl px-6 sm:px-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Education</h2>
          </div>
          <EducationTimeline entries={domain.educationEntries} />

          {/* Extracurriculars rows below */}
          <div className="pb-16">
            {domain.rows.map((row) => (
              <ContentRow
                key={row.rowTitle}
                row={row}
                onItemClick={setSelectedItem}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Standard content rows */
        <div className="relative z-10 -mt-16 pb-16">
          {domain.rows.map((row) => (
            <ContentRow
              key={row.rowTitle}
              row={row}
              onItemClick={setSelectedItem}
            />
          ))}
        </div>
      )}

      {/* Detail modal */}
      <InfoModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
