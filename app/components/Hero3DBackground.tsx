"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShapes({ count = 18 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => {
    const out: number[] = [];
    for (let i = 0; i < count; i++) {
      out.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 4
      );
    }
    return new Float32Array(out);
  }, [count]);

  const speeds = useMemo(() => {
    return new Float32Array(
      Array.from({ length: count }, () => (Math.random() + 0.3) * 0.002)
    );
  }, [count]);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1, 0), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    const t = clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1] + Math.sin(t * speeds[i] * 200 + i) * 0.35;
      const z = positions[i * 3 + 2];
      const scale = 0.18 + Math.random() * 0.16;
      dummy.position.set(x, y, z);
      dummy.rotation.set(t * 0.1 + i, t * 0.05 + i, 0);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[geometry, undefined, count]} castShadow receiveShadow>
      <meshStandardMaterial
        color="#c01d16"
        roughness={0.4}
        metalness={0.05}
        transparent
        opacity={0.12}
      />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[4, 4, 8]} intensity={0.8} />
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>
    </>
  );
}

export default function Hero3DBackground() {
  return null;
}
