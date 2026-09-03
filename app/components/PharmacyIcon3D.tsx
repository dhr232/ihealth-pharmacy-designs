"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function PharmacyIcon3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    const width = el.clientWidth;
    const height = el.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);
    const backLight = new THREE.DirectionalLight(0xc01d16, 0.4);
    backLight.position.set(-3, -2, -4);
    scene.add(backLight);

    const redMaterial = new THREE.MeshStandardMaterial({
      color: 0xc01d16,
      roughness: 0.3,
      metalness: 0.1,
    });
    const darkMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2328,
      roughness: 0.4,
      metalness: 0.1,
    });
    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.05,
    });

    const capsuleGroup = new THREE.Group();

    const topSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
      redMaterial
    );
    topSphere.position.y = 1;

    const bottomSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
      darkMaterial
    );
    bottomSphere.position.y = -1;

    const middleCyl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
      redMaterial
    );
    middleCyl.position.y = 0.5;

    const middleCyl2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
      darkMaterial
    );
    middleCyl2.position.y = -0.5;

    const crossBar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.12), whiteMaterial);
    crossBar.position.set(0, 0, 0.55);
    const crossVert = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.12), whiteMaterial);
    crossVert.position.set(0, 0, 0.55);

    capsuleGroup.add(topSphere, bottomSphere, middleCyl, middleCyl2, crossBar, crossVert);
    capsuleGroup.rotation.z = Math.PI / 4;
    group.add(capsuleGroup);

    const ringGeo = new THREE.TorusGeometry(1.6, 0.04, 16, 64);
    const ring = new THREE.Mesh(
      ringGeo,
      new THREE.MeshStandardMaterial({ color: 0xd8dce2, transparent: true, opacity: 0.6 })
    );
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    let time = 0;
    function animate() {
      rafRef.current = requestAnimationFrame(animate);
      time += 0.015;
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.003;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouseRef.current.y * 0.25,
          0.06
        );
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
          groupRef.current.rotation.z,
          -mouseRef.current.x * 0.25,
          0.06
        );
      }
      ring.rotation.z = time * 0.2;
      renderer.render(scene, camera);
    }
    animate();

    function handleMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function handleResize() {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    el.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (renderer.domElement.parentElement === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-[260px] w-full cursor-move rounded-xl"
      aria-label="Interactive 3D pharmacy capsule"
      role="img"
    />
  );
}
