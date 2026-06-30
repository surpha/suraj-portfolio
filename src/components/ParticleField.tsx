"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 400 }) {
  const mesh = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.015;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.08;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        color="#8b8fff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GlowingPlanet({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.3;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.15;
    if (glowRef.current) {
      glowRef.current.position.copy(ref.current.position);
      glowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.1);
    }
  });

  return (
    <>
      {/* Outer glow */}
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[size * 2.5, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Planet core */}
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  const config = useMemo(() => ({
    startX: (Math.random() - 0.5) * 16,
    startY: 3 + Math.random() * 5,
    speed: 3 + Math.random() * 4,
    delay: Math.random() * 20,
    angle: -0.5 - Math.random() * 0.5,
    length: 0.8 + Math.random() * 1.2,
  }), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const cycle = ((t - config.delay) % 12);

    if (cycle < 0 || cycle > 1.5) {
      ref.current.visible = false;
      return;
    }

    ref.current.visible = true;
    const progress = cycle * config.speed;
    ref.current.position.x = config.startX + progress * Math.cos(config.angle);
    ref.current.position.y = config.startY + progress * Math.sin(config.angle);
    ref.current.position.z = -2;
    ref.current.rotation.z = config.angle;

    const fade = cycle < 0.3 ? cycle / 0.3 : cycle > 1.0 ? (1.5 - cycle) / 0.5 : 1;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = fade * 0.35;
  });

  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[config.length, 0.015]} />
      <meshBasicMaterial
        color="#c4b5fd"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingGrid() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const gridSize = 20;
    const divisions = 20;
    const step = gridSize / divisions;

    for (let i = -gridSize / 2; i <= gridSize / 2; i += step) {
      vertices.push(i, 0, -gridSize / 2, i, 0, gridSize / 2);
      vertices.push(-gridSize / 2, 0, i, gridSize / 2, 0, i);
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = -3 + Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <lineSegments ref={ref} geometry={geometry} rotation={[0.3, 0, 0]}>
      <lineBasicMaterial color="#6366f1" transparent opacity={0.06} />
    </lineSegments>
  );
}

export default function ParticleField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Stars />
        <FloatingGrid />

        {/* Subtle glowing planets */}
        <GlowingPlanet position={[-6, 3, -8]} color="#6366f1" size={0.4} speed={0.2} />
        <GlowingPlanet position={[7, -2, -10]} color="#8b5cf6" size={0.6} speed={0.15} />
        <GlowingPlanet position={[3, 5, -12]} color="#06b6d4" size={0.3} speed={0.25} />
        <GlowingPlanet position={[-5, -4, -9]} color="#ec4899" size={0.25} speed={0.18} />

        {/* Shooting stars */}
        <ShootingStar />
        <ShootingStar />
        <ShootingStar />
      </Canvas>
    </div>
  );
}
