"use client";

import { useState } from "react";
import config from "@/data/configuration.json";
import { FullPortfolioConfig, DomainConfig } from "@/types";
import SummaryLanding from "@/components/SummaryLanding";
import DomainSelector from "@/components/DomainSelector";
import DashboardLayout from "@/components/DashboardLayout";

const portfolio = config as FullPortfolioConfig;
const domainList: DomainConfig[] = Object.values(portfolio.domains);

export default function Home() {
  const [view, setView] = useState<"landing" | "profiles" | "domain">("landing");
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);

  if (view === "domain" && currentDomain !== null) {
    return (
      <DashboardLayout
        domain={portfolio.domains[currentDomain]}
        personal={portfolio.personal}
        allDomains={domainList}
        onSwitchDomain={(id) => {
          setCurrentDomain(id);
          setView("domain");
        }}
        onReset={() => {
          setCurrentDomain(null);
          setView("profiles");
        }}
      />
    );
  }

  if (view === "profiles") {
    return (
      <DomainSelector
        domains={domainList}
        personal={portfolio.personal}
        onSelect={(id) => {
          setCurrentDomain(id);
          setView("domain");
        }}
      />
    );
  }

  return (
    <SummaryLanding
      personal={portfolio.personal}
      domains={domainList}
      onExplore={() => setView("profiles")}
      onSelectDomain={(id) => {
        setCurrentDomain(id);
        setView("domain");
      }}
    />
  );
}
