"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import config from "@/data/configuration.json";
import { FullPortfolioConfig, DomainConfig } from "@/types";
import DomainSelector from "@/components/DomainSelector";
import DashboardLayout from "@/components/DashboardLayout";

const portfolio = config as FullPortfolioConfig;
const domainList: DomainConfig[] = Object.values(portfolio.domains);

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Netflix-style red glow behind name */}
      <div className="absolute h-[400px] w-[400px] rounded-full bg-[#e50914]/15 blur-[150px]" />

      <motion.div className="relative flex flex-col items-center">
        {/* Curved Netflix-logo-style SVG text */}
        <motion.svg
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewBox="0 0 700 200"
          className="w-[400px] sm:w-[600px] lg:w-[750px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="curve"
              d="M 50,160 Q 350,40 650,160"
              fill="transparent"
            />
          </defs>
          <text
            className="netflix-arc-text"
            fill="#e50914"
            textAnchor="middle"
          >
            <textPath href="#curve" startOffset="50%">
              {portfolio.personal.name.toUpperCase()}
            </textPath>
          </text>
        </motion.svg>

        {/* Red shadow accent line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.0, ease: "easeOut" }}
          className="mt-2 h-[3px] w-48 origin-center rounded-full bg-[#e50914] shadow-[0_0_20px_rgba(229,9,20,0.6)] sm:w-64"
        />

        {/* Subtitle fade-in */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-4 font-[family-name:var(--font-bebas)] text-lg tracking-[0.35em] text-[#808080] sm:text-xl"
        >
          PORTFOLIO
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

function IntroScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex min-h-screen flex-col items-center justify-center bg-[#141414] px-6 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
      >
        {portfolio.personal.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-4 max-w-xl text-lg text-[#b3b3b3] sm:text-xl"
      >
        {portfolio.personal.headline} at {portfolio.personal.company}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-2 max-w-lg text-sm text-[#808080] sm:text-base"
      >
        {portfolio.personal.education}
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={onContinue}
        className="mt-12 rounded bg-[#e50914] px-8 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-[#f40612]"
      >
        EXPLORE
      </motion.button>
    </motion.div>
  );
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [currentDomain, setCurrentDomain] = useState<string | null>(null);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            onFinish={() => {
              setShowSplash(false);
              setShowIntro(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showSplash && showIntro && (
          <IntroScreen onContinue={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showSplash && !showIntro && currentDomain === null && (
        <DomainSelector domains={domainList} onSelect={setCurrentDomain} />
      )}

      {!showSplash && !showIntro && currentDomain !== null && (
        <DashboardLayout
          domain={portfolio.domains[currentDomain]}
          personal={portfolio.personal}
          allDomains={domainList}
          onSwitchDomain={setCurrentDomain}
          onReset={() => setCurrentDomain(null)}
        />
      )}
    </>
  );
}
