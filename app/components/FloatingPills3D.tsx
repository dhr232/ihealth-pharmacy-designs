"use client";

import { useEffect, useRef } from "react";
import HappyCustomerCard from "./HappyCustomerCard";

const PILL_BASE = "/ihealth-pharmacy-designs/";

const pills = [
  { src: "pills-purple.png", alt: "Purple capsule", top: "10%", left: "55%", width: 210, delay: "0s", duration: "5.5s", rotate: -20 },
  { src: "pills-blue.png", alt: "Blue capsule", top: "28%", left: "18%", width: 195, delay: "1.2s", duration: "6s", rotate: 12 },
  { src: "pills-yellow.png", alt: "Yellow capsule", top: "44%", left: "58%", width: 175, delay: "2.4s", duration: "5s", rotate: 22 },
  { src: "pills-red.png", alt: "Red capsule", top: "62%", left: "28%", width: 190, delay: "3.6s", duration: "6.5s", rotate: -10 },
];

const rings = [
  { color: "#6366f1", top: "8%", left: "78%", size: 44, delay: "0.3s", duration: "7s" },
  { color: "#3b82f6", top: "34%", left: "8%", size: 32, delay: "1.5s", duration: "8s" },
  { color: "#fbbf24", top: "50%", left: "80%", size: 24, delay: "2.8s", duration: "6s" },
  { color: "#6366f1", top: "76%", left: "62%", size: 40, delay: "4s", duration: "7.5s" },
];

export default function FloatingPills3D({ showHappyCustomerCard = false }: { showHappyCustomerCard?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>("[data-parallax]");
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 18; // max parallax px
      targetY = y * 18;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      items.forEach((el, i) => {
        const depth = 1 + (i % 3) * 0.18;
        el.style.setProperty("--px", `${currentX * depth}px`);
        el.style.setProperty("--py", `${currentY * depth}px`);
      });
      rafId = requestAnimationFrame(animate);
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto h-[420px] w-full max-w-[520px] overflow-visible md:h-[500px] lg:h-[540px]"
      aria-label="Decorative floating pharmacy capsules"
    >
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% {
            transform: translate(var(--px, 0px), var(--py, 0px)) translateY(0px) rotate(var(--base-rotate, 0deg));
          }
          50% {
            transform: translate(var(--px, 0px), var(--py, 0px)) translateY(-8px) rotate(calc(var(--base-rotate, 0deg) + 2deg));
          }
        }

        @keyframes gentleRing {
          0%, 100% {
            transform: translate(var(--px, 0px), var(--py, 0px)) rotate(0deg);
          }
          50% {
            transform: translate(var(--px, 0px), var(--py, 0px)) rotate(180deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .float-item {
            animation: none !important;
          }
        }
      `}</style>

      {rings.map((ring, i) => (
        <div
          key={`ring-${i}`}
          data-parallax
          className="float-item pointer-events-none absolute rounded-full border-2 opacity-70"
          style={{
            top: ring.top,
            left: ring.left,
            width: ring.size,
            height: ring.size,
            borderColor: ring.color,
            boxShadow: `0 0 16px ${ring.color}55`,
            animation: `gentleRing ${ring.duration} linear infinite`,
            animationDelay: ring.delay,
            ["--base-rotate" as string]: "0deg",
          }}
        />
      ))}

      {pills.map((pill, i) => {
        const glowColor =
          pill.src.includes("purple")
            ? "#6366f1"
            : pill.src.includes("blue")
              ? "#3b82f6"
              : pill.src.includes("yellow")
                ? "#fbbf24"
                : "#ef4444";

        return (
          <div
            key={`pill-${i}`}
            data-parallax
            className="float-item absolute"
            style={{
              top: pill.top,
              left: pill.left,
              width: pill.width,
              height: pill.width * 1.1,
              filter: `drop-shadow(0 20px 30px ${glowColor}55)`,
              animation: `gentleFloat ${pill.duration} ease-in-out infinite`,
              animationDelay: pill.delay,
              ["--base-rotate" as string]: `${pill.rotate}deg`,
              transition: "filter 0.3s ease",
            }}
          >
            <img
              src={`${PILL_BASE}${pill.src}`}
              alt={pill.alt}
              className="h-full w-full object-contain"
              loading={i < 2 ? "eager" : "lazy"}
              style={{
                filter: "drop-shadow(0 0 0 transparent)",
              }}
            />
          </div>
        );
      })}

      {showHappyCustomerCard && (
        <div
          data-parallax
          className="float-item absolute z-10"
          style={{
            bottom: "4%",
            left: "2%",
            ["--base-rotate" as string]: "0deg",
          }}
        >
          <HappyCustomerCard />
        </div>
      )}
    </div>
  );
}
