"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SEGMENTS = 28;
const COLORS = ["#60a5fa", "#f87171", "#facc15", "#a3e635", "#c084fc", "#fb923c"];
const LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function CarouselModel({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  const [bodyGeo, compartmentGeos, labelTexture, displayScreen] = useMemo(() => {
    // Main disc
    const discGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.35, 64);
    discGeo.rotateX(Math.PI / 2);

    // Compartment pockets around the rim
    const pockets: THREE.BufferGeometry[] = [];
    for (let i = 0; i < SEGMENTS; i++) {
      const angle = (i / SEGMENTS) * Math.PI * 2;
      const w = 0.22;
      const d = 0.18;
      const geo = new THREE.BoxGeometry(w, d, 0.32);
      geo.rotateZ(angle);
      geo.translate(Math.cos(angle) * 1.28, Math.sin(angle) * 1.28, 0.05);
      pockets.push(geo);
    }

    // Label texture canvas
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, 1024, 1024);

    // Draw colored label blocks around center
    for (let i = 0; i < SEGMENTS; i++) {
      const angle = ((i + 0.5) / SEGMENTS) * Math.PI * 2;
      const cx = 512 + Math.cos(angle) * 260;
      const cy = 512 + Math.sin(angle) * 260;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fillRect(-35, -20, 70, 40);
      ctx.fillStyle = "#1f2937";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(LABELS[i % 7], 0, 0);
      ctx.restore();
    }

    // Center "ADVANCE" badge
    ctx.beginPath();
    ctx.arc(512, 512, 70, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ADVANCE", 512, 492);
    ctx.font = "16px sans-serif";
    ctx.fillText("CAROUSEL", 512, 522);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16;

    // Digital display screen (small canvas)
    const dCanvas = document.createElement("canvas");
    dCanvas.width = 256;
    dCanvas.height = 96;
    const dCtx = dCanvas.getContext("2d")!;
    dCtx.fillStyle = "#d1d5db";
    dCtx.fillRect(0, 0, 256, 96);
    dCtx.fillStyle = "#1f2937";
    dCtx.font = "bold 48px sans-serif";
    dCtx.textAlign = "center";
    dCtx.textBaseline = "middle";
    dCtx.fillText("08:00", 128, 48);
    const dTex = new THREE.CanvasTexture(dCanvas);

    return [discGeo, pockets, tex, dTex];
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    // Gentle idle rotation
    group.current.rotation.z += 0.0015;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.25, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.current.x * 0.35, 0.05);
  });

  const compartmentMeshes = useMemo(() => {
    return compartmentGeos.map((geo, i) => (
      <mesh key={i} geometry={geo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.25}
          metalness={0.05}
          transmission={0.15}
          thickness={0.1}
          clearcoat={0.3}
        />
      </mesh>
    ));
  }, [compartmentGeos]);

  return (
    <group ref={group} scale={1.1}>
      {/* Stand */}
      <mesh position={[0, -1.6, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 0.8, 0.5]} />
        <meshPhysicalMaterial color="#e2e8f0" roughness={0.2} metalness={0.1} transmission={0.4} thickness={0.2} />
      </mesh>
      <mesh position={[0, -2.05, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.12, 0.7]} />
        <meshPhysicalMaterial color="#e2e8f0" roughness={0.2} metalness={0.1} transmission={0.4} thickness={0.2} />
      </mesh>

      {/* Main disc body */}
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#f8fafc"
          roughness={0.2}
          metalness={0.05}
          transmission={0.1}
          thickness={0.2}
          clearcoat={0.25}
        />
      </mesh>

      {/* Top label face */}
      <mesh position={[0, 0, 0.19]} castShadow receiveShadow>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial map={labelTexture} transparent />
      </mesh>

      {/* Compartment pockets */}
      {compartmentMeshes}

      {/* Inner raised ring */}
      <mesh position={[0, 0, 0.15]} castShadow receiveShadow>
        <torusGeometry args={[0.85, 0.08, 16, 64]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.25} metalness={0.05} />
      </mesh>

      {/* Digital display housing */}
      <mesh position={[0, 0, 0.28]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.35, 0.08]} />
        <meshPhysicalMaterial color="#e5e7eb" roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0.34]} castShadow receiveShadow>
        <planeGeometry args={[0.7, 0.25]} />
        <meshBasicMaterial map={displayScreen} />
      </mesh>

      {/* Top latch */}
      <mesh position={[0, 1.55, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.15, 0.3]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.2} transmission={0.2} thickness={0.15} />
      </mesh>

      {/* Front dispensing cup */}
      <mesh position={[0, -0.95, 0.25]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.35, 24]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.2} transmission={0.3} thickness={0.15} />
      </mesh>
    </group>
  );
}

export default function CarouselDispenser3D() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="h-[360px] w-full md:h-[420px]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      }}
    >
      <Canvas camera={{ position: [0, 0, 5.5], fov: 38 }} shadows dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 4, 6]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-4, -2, 4]} intensity={0.5} />
        <pointLight position={[0, 0, 3]} intensity={0.6} />
        <CarouselModel mouse={mouse} />
      </Canvas>
    </div>
  );
}
