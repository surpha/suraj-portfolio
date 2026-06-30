"use client";

import { useState, useEffect, useRef } from "react";
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
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top nav */}
      <nav
        className={`fixed left-0 right-0 top-0 z-40 flex items-center px-[4%] py-3 transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-black/70 to-transparent"
        }`}
      >
        {/* Logo / Brand */}
        <button
          onClick={onReset}
          className="mr-6 text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-70 sm:text-xl"
        >
          {personal.name.split(" ")[0]}
        </button>

        {/* Nav links — domain switching */}
        <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto sm:gap-3">
          {allDomains.map((d) => (
            <button
              key={d.id}
              onClick={() => onSwitchDomain(d.id)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-all sm:text-sm ${
                d.id === domain.id
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white/90"
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>

        {/* Right side — profile button with dropdown */}
        <div className="relative ml-auto" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-xs font-bold text-white transition-transform hover:scale-105"
          >
            SP
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-lg border border-white/10 bg-[#1a1a1a] shadow-2xl">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white/90 transition-colors hover:bg-white/5"
              >
                <span className="text-base">📄</span>
                View Resume
              </a>
              <a
                href="mailto:hello@surajphalod.com"
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white/90 transition-colors hover:bg-white/5"
              >
                <span className="text-base">✉️</span>
                Contact
              </a>
              <button
                onClick={() => { onReset(); setProfileOpen(false); }}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-white/90 transition-colors hover:bg-white/5"
              >
                <span className="text-base">🏠</span>
                Switch Profile
              </button>
            </div>
          )}
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
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{domain.hero.title}</h2>
            <p className="mt-2 text-base text-[#808080]">{domain.hero.description}</p>
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
