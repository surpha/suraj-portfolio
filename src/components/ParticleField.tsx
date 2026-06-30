"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 300 }) {
  const mesh = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
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
      <lineBasicMaterial color="#6366f1" transparent opacity={0.08} />
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
        <Particles />
        <FloatingGrid />
      </Canvas>
    </div>
  );
}
