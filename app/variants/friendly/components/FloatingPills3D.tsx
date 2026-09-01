"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Capsule({
  position,
  rotation,
  scale,
  colorA,
  colorB,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  colorA: string;
  colorB: string;
}) {
  const group = useRef<THREE.Group>(null);

  const [geoA, geoB] = useMemo(() => {
    const full = new THREE.CapsuleGeometry(0.45, 1.2, 8, 16);
    const pos = full.attributes.position;
    const count = pos.count;
    const geoA = new THREE.BufferGeometry();
    const geoB = new THREE.BufferGeometry();

    geoA.setAttribute("position", pos.clone());
    geoA.setAttribute("normal", full.attributes.normal.clone());
    geoB.setAttribute("position", pos.clone());
    geoB.setAttribute("normal", full.attributes.normal.clone());

    const maskA = new Float32Array(count);
    const maskB = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const y = pos.getY(i);
      const t = THREE.MathUtils.smoothstep(y, -0.2, 0.2);
      maskA[i] = 1 - t;
      maskB[i] = t;
    }
    geoA.setAttribute("alphaToCoverage", new THREE.BufferAttribute(maskA, 1));
    geoB.setAttribute("alphaToCoverage", new THREE.BufferAttribute(maskB, 1));

    return [geoA, geoB];
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t + position[0]) * 0.12;
    group.current.rotation.x = rotation[0] + Math.sin(t * 0.5 + position[1]) * 0.08;
    group.current.rotation.y = rotation[1] + t * 0.15;
    group.current.rotation.z = rotation[2] + Math.cos(t * 0.3) * 0.05;
  });

  return (
    <group ref={group} position={position} scale={scale} castShadow receiveShadow>
      <mesh geometry={geoA} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={colorA}
          roughness={0.12}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh geometry={geoB} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={colorB}
          roughness={0.12}
          metalness={0.05}
          clearcoat={0.6}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Glossy highlight stripe */}
      <mesh position={[0.18, 0.35, 0.32]} rotation={[0, 0, 0.25]} scale={[0.06, 0.55, 0.06]}>
        <capsuleGeometry args={[0.5, 1, 4, 8]} />
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
    ref.current.rotation.z = state.clock.elapsedTime * 0.25 + position[0];
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.08;
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
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.15, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.2, 0.04);
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 5, 8]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, -3, 5]} intensity={0.5} />
      <pointLight position={[0, 0, 6]} intensity={0.8} />

      <Capsule position={[1.4, 0.9, 0]} rotation={[0.2, 0.5, -0.3]} scale={1.15} colorA="#3b82f6" colorB="#f8fafc" />
      <Capsule position={[-1.2, 1.4, -0.4]} rotation={[-0.3, -0.4, 0.2]} scale={1.05} colorA="#6366f1" colorB="#f8fafc" />
      <Capsule position={[0.6, -1.1, 0.3]} rotation={[0.4, 0.2, 0.5]} scale={0.95} colorA="#eab308" colorB="#f8fafc" />
      <Capsule position={[-0.7, -0.3, 0.6]} rotation={[-0.2, 0.6, -0.1]} scale={1.0} colorA="#ef4444" colorB="#f8fafc" />

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
