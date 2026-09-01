"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PILL_CONFIG = [
  { cap: "#5b4cdb", body: "#f8fafc", pos: [0.85, 0.95, 0.2], rot: [0.25, 0.35, -0.2], scale: 0.9 }, // purple top-right
  { cap: "#3b82f6", body: "#f8fafc", pos: [-0.55, 1.15, 0.5], rot: [-0.15, -0.25, 0.1], scale: 0.85 }, // blue upper-left
  { cap: "#f5b800", body: "#f8fafc", pos: [1.15, -0.55, 0.4], rot: [0.3, 0.15, 0.4], scale: 0.82 }, // yellow right
  { cap: "#ef4444", body: "#f8fafc", pos: [-0.35, -0.95, 0.6], rot: [-0.1, 0.45, -0.05], scale: 0.85 }, // red lower-left
];

const RING_CONFIG = [
  { color: "#6366f1", pos: [-0.25, 1.65, -0.5], size: 0.26 },
  { color: "#60a5fa", pos: [0.35, 0.35, -0.6], size: 0.2 },
  { color: "#fbbf24", pos: [0.55, 0.05, -0.4], size: 0.16 },
  { color: "#6366f1", pos: [1.55, -1.05, -0.5], size: 0.22 },
];

function createGradientTexture(colorA: string, colorB: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  // Soft transition from cap color to body color, not hard line
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, colorA);
  grad.addColorStop(0.42, colorA);
  grad.addColorStop(0.5, colorB);
  grad.addColorStop(1, colorB);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 256);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createGlowTexture(color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, color);
  grad.addColorStop(0.5, color + "66");
  grad.addColorStop(1, color + "00");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Pill({
  cap,
  body,
  position,
  rotation,
  scale,
}: {
  cap: string;
  body: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}) {
  const group = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Sprite>(null);

  const [gradientTex, glowTex, material] = useMemo(() => {
    const grad = createGradientTexture(cap, body);
    const glow = createGlowTexture(cap);
    const mat = new THREE.MeshPhysicalMaterial({
      map: grad,
      roughness: 0.08,
      metalness: 0.02,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      sheen: 0.4,
      sheenColor: new THREE.Color(cap),
      transmission: 0,
    });
    return [grad, glow, mat];
  }, [cap, body]);

  useFrame((state) => {
    if (!group.current || !glowRef.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 0.8 + position[0] * 2) * 0.08;
    group.current.rotation.x = rotation[0] + Math.sin(t * 0.4 + position[1]) * 0.04;
    group.current.rotation.y = rotation[1] + t * 0.12;
    group.current.rotation.z = rotation[2] + Math.cos(t * 0.3) * 0.03;
    glowRef.current.position.copy(group.current.position);
  });

  return (
    <group position={position} scale={scale}>
      <sprite ref={glowRef} scale={[2.2, 2.2, 1]} position={[0, 0, -0.4]}>
        <spriteMaterial map={glowTex} transparent opacity={0.5} depthWrite={false} />
      </sprite>

      <group ref={group}>
        <mesh castShadow receiveShadow material={material}>
          <capsuleGeometry args={[0.48, 1.35, 16, 32]} />
        </mesh>

        {/* Large soft highlight */}
        <mesh position={[0.18, 0.55, 0.36]} rotation={[0, 0, 0.25]} scale={[0.08, 0.55, 0.06]}>
          <capsuleGeometry args={[0.5, 1, 4, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.45} depthWrite={false} />
        </mesh>

        {/* Small highlight */}
        <mesh position={[0.22, 0.25, 0.38]} rotation={[0, 0, 0.3]} scale={[0.04, 0.22, 0.04]}>
          <capsuleGeometry args={[0.5, 1, 4, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.35} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function FloatingRing({
  color,
  position,
  size,
}: {
  color: string;
  position: [number, number, number];
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.22 + position[0];
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.06;
  });

  return (
    <mesh ref={ref} position={position} scale={size} castShadow receiveShadow>
      <torusGeometry args={[0.5, 0.07, 12, 48]} />
      <meshPhysicalMaterial color={color} roughness={0.15} metalness={0.05} clearcoat={0.5} />
    </mesh>
  );
}

function Scene({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useThree();

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.1, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.15, 0.04);
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 8]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, -2, 5]} intensity={0.4} />
      <pointLight position={[2, 2, 6]} intensity={0.6} />
      <pointLight position={[-2, -1, 4]} intensity={0.3} />

      {PILL_CONFIG.map((p, i) => (
        <Pill
          key={i}
          cap={p.cap}
          body={p.body}
          position={p.pos as [number, number, number]}
          rotation={p.rot as [number, number, number]}
          scale={p.scale}
        />
      ))}

      {RING_CONFIG.map((r, i) => (
        <FloatingRing key={i} color={r.color} position={r.pos as [number, number, number]} size={r.size} />
      ))}
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
      <Canvas camera={{ position: [0.2, -0.1, 6.8], fov: 36 }} shadows dpr={[1, 2]}>
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
