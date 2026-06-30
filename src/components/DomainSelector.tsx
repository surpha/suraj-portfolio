"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { DomainConfig } from "@/types";
import * as THREE from "three";

interface DomainSelectorProps {
  domains: DomainConfig[];
  onSelect: (domainId: string) => void;
}

const domainDescriptions: Record<string, string> = {
  "data-science": "ML models & supply chain intelligence",
  sidequests: "Hardware builds, agencies & ventures",
  activities: "Running, music & lifestyle metrics",
  network: "Social links & digital presence",
};

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#6366f1"
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

export default function DomainSelector({ domains, onSelect }: DomainSelectorProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#0a0a0a]">
      {/* 3D Background */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#a855f7" />
          <AnimatedSphere />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      <div className="pointer-events-none absolute inset-0 bg-[#0a0a0a]/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Suraj Phalod
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-white/50 sm:text-lg">
            Data Science Manager at P&G. Builder. Runner. Explorer.
          </p>
        </motion.div>

        {/* Domain cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {domains.map((domain, index) => (
            <motion.button
              key={domain.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(domain.id)}
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-5 text-left backdrop-blur-sm transition-all hover:border-white/[0.12] hover:bg-white/[0.06]"
            >
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: [
                    "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    "linear-gradient(135deg, #f59e0b, #ef4444)",
                    "linear-gradient(135deg, #10b981, #06b6d4)",
                    "linear-gradient(135deg, #ec4899, #8b5cf6)",
                  ][index],
                }}
              >
                <span className="text-xl">
                  {["🧠", "🚀", "🏃", "🌐"][index]}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {domain.title}
                </h3>
                <p className="mt-0.5 text-xs text-white/40">
                  {domainDescriptions[domain.id] ?? domain.tagline}
                </p>
              </div>

              <span className="text-white/20 transition-colors group-hover:text-white/50">
                →
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
