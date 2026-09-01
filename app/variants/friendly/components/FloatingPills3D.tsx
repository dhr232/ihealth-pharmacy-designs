"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const pills = [
  { src: "/pills-purple.png", alt: "Purple capsule", className: "pill-purple", top: "6%", left: "48%", width: 220, delay: 0, rotate: -25, floatY: -12 },
  { src: "/pills-blue.png", alt: "Blue capsule", className: "pill-blue", top: "32%", left: "10%", width: 200, delay: 0.8, rotate: 15, floatY: 10 },
  { src: "/pills-yellow.png", alt: "Yellow capsule", className: "pill-yellow", top: "46%", left: "62%", width: 180, delay: 1.4, rotate: 25, floatY: -14 },
  { src: "/pills-red.png", alt: "Red capsule", className: "pill-red", top: "68%", left: "20%", width: 195, delay: 2.2, rotate: -12, floatY: 12 },
];

const rings = [
  { color: "#6366f1", top: "2%", left: "72%", size: 48, delay: 0.3 },
  { color: "#3b82f6", top: "38%", left: "78%", size: 34, delay: 1.1 },
  { color: "#fbbf24", top: "58%", left: "82%", size: 26, delay: 1.8 },
  { color: "#6366f1", top: "78%", left: "58%", size: 42, delay: 2.5 },
];

export default function FloatingPills3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const items = containerRef.current?.querySelectorAll("[data-float]");
    if (!items) return;

    let rafId: number;
    const start = performance.now();

    const animate = (now: number) => {
      const t = (now - start) / 1000;
      items.forEach((el) => {
        const floatY = Number((el as HTMLElement).dataset.floaty);
        const delay = Number((el as HTMLElement).dataset.delay);
        const y = Math.sin(t * 1.2 + delay) * floatY;
        const x = Math.cos(t * 0.7 + delay) * 4;
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px) rotate(var(--rotate, 0deg))`;
      });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[420px] w-full max-w-[520px] md:h-[500px] lg:h-[540px]"
      aria-label="Decorative floating pharmacy capsules"
    >
      {rings.map((ring, i) => (
        <div
          key={`ring-${i}`}
          className="pointer-events-none absolute rounded-full border-2 opacity-80"
          style={{
            top: ring.top,
            left: ring.left,
            width: ring.size,
            height: ring.size,
            borderColor: ring.color,
            boxShadow: `0 0 18px ${ring.color}66`,
          }}
          data-float
          data-delay={ring.delay}
          data-floaty={3}
        />
      ))}

      {pills.map((pill, i) => (
        <div
          key={`pill-${i}`}
          className={`absolute drop-shadow-xl ${pill.className}`}
          style={{
            top: pill.top,
            left: pill.left,
            width: pill.width,
            height: pill.width * 1.1,
            ["--rotate" as string]: `${pill.rotate}deg`,
            filter: `drop-shadow(0 24px 36px ${pill.className === "pill-purple" ? "#6366f166" : pill.className === "pill-blue" ? "#3b82f166" : pill.className === "pill-yellow" ? "#fbbf2466" : "#ef444466"})`,
          }}
          data-float
          data-delay={pill.delay}
          data-floaty={pill.floatY}
        >
          <Image
            src={pill.src}
            alt={pill.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 160px, (max-width: 1024px) 190px, 220px"
            priority={i < 2}
          />
        </div>
      ))}
    </div>
  );
}
