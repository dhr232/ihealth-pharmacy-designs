"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COLORS: { cap: string; body: string }[] = [
  { cap: "#2563eb", body: "#f8fafc" },
  { cap: "#7c3aed", body: "#f8fafc" },
  { cap: "#eab308", body: "#f8fafc" },
  { cap: "#dc2626", body: "#f8fafc" },
];

function TwoToneCapsule({
  position,
  rotation,
  scale,
  capColor,
  bodyColor,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  capColor: string;
  bodyColor: string;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t + position[0]) * 0.12;
    group.current.rotation.x = rotation[0] + Math.sin(t * 0.5 + position[1]) * 0.06;
    group.current.rotation.y = rotation[1] + t * 0.12;
    group.current.rotation.z = rotation[2] + Math.cos(t * 0.3) * 0.04;
  });

  const sharedMaterial = {
    roughness: 0.12,
    metalness: 0.05,
    clearcoat: 0.7,
    clearcoatRoughness: 0.08,
  };

  return (
    <group ref={group} position={position} scale={scale} castShadow receiveShadow>
      {/* Body (lower white half) */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.78, 32, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial {...sharedMaterial} color={bodyColor} />
      </mesh>
      <mesh position={[0, -0.35, 0]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.78, 32, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial {...sharedMaterial} color={bodyColor} />
      </mesh>
      {/* Half-sphere bottom */}
      <mesh position={[0, -0.74, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.42, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshPhysicalMaterial {...sharedMaterial} color={bodyColor} />
      </mesh>

      {/* Cap (upper colored half) */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.78, 32, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial {...sharedMaterial} color={capColor} />
      </mesh>
      <mesh position={[0, 0.35, 0]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.78, 32, 1, false, 0, Math.PI]} />
        <meshPhysicalMaterial {...sharedMaterial} color={capColor} />
      </mesh>
      {/* Half-sphere top */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.42, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial {...sharedMaterial} color={capColor} />
      </mesh>

      {/* Gloss highlight */}
      <mesh position={[0.16, 0.45, 0.28]} rotation={[0, 0, 0.2]} scale={[0.05, 0.4, 0.04]}>
        <capsuleGeometry args={[0.5, 0.8, 4, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function FloatingRing({
  position,
  color,
  size,
}: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.2 + position[0];
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.06;
  });

  return (
    <mesh ref={ref} position={position} scale={size} castShadow receiveShadow>
      <torusGeometry args={[0.5, 0.08, 12, 48]} />
      <meshPhysicalMaterial color={color} roughness={0.2} metalness={0.1} clearcoat={0.4} />
    </mesh>
  );
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.12, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.18, 0.04);
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 8]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, -3, 5]} intensity={0.5} />
      <pointLight position={[0, 0, 6]} intensity={0.7} />

      <TwoToneCapsule position={[1.4, 0.9, 0]} rotation={[0.2, 0.5, -0.3]} scale={1.15} capColor={COLORS[0].cap} bodyColor={COLORS[0].body} />
      <TwoToneCapsule position={[-1.2, 1.4, -0.4]} rotation={[-0.3, -0.4, 0.2]} scale={1.05} capColor={COLORS[1].cap} bodyColor={COLORS[1].body} />
      <TwoToneCapsule position={[0.6, -1.1, 0.3]} rotation={[0.4, 0.2, 0.5]} scale={0.95} capColor={COLORS[2].cap} bodyColor={COLORS[2].body} />
      <TwoToneCapsule position={[-0.7, -0.3, 0.6]} rotation={[-0.2, 0.6, -0.1]} scale={1.0} capColor={COLORS[3].cap} bodyColor={COLORS[3].body} />

      <FloatingRing position={[-1.8, 0.2, -1]} color="#60a5fa" size={0.55} />
      <FloatingRing position={[1.9, -0.6, -0.8]} color="#818cf8" size={0.45} />
      <FloatingRing position={[0.2, 2.0, -1.2]} color="#facc15" size={0.35} />
      <FloatingRing position={[0.9, 1.9, -0.6]} color="#60a5fa" size={0.3} />
    </group>
  );
}

export default function FloatingPills3D() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="h-[420px] w-full md:h-[520px] lg:h-[580px]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }}
    >
      <Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} shadows dpr={[1, 2]}>
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
