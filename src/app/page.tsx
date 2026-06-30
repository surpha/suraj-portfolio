"use client";

import { useState } from "react";
import config from "@/data/configuration.json";
import { FullPortfolioConfig, DomainConfig } from "@/types";
import DomainSelector from "@/components/DomainSelector";
import DashboardLayout from "@/components/DashboardLayout";

const portfolio = config as FullPortfolioConfig;
const domainList: DomainConfig[] = Object.values(portfolio.domains);

export default function Home() {
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);

  if (currentDomain === null) {
    return (
      <DomainSelector domains={domainList} onSelect={setCurrentDomain} />
    );
  }

  const activeDomain = portfolio.domains[currentDomain];

  return (
    <DashboardLayout
      domain={activeDomain}
      personal={portfolio.personal}
      allDomains={domainList}
      onSwitchDomain={setCurrentDomain}
      onReset={() => setCurrentDomain(null)}
    />
  );
}
