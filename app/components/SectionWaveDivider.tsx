"use client";

import React, { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

type SectionWaveDividerProps = {
  /** Color class of the wave fill (typically matches the section below, e.g. 'text-white') */
  fillColor?: string;
  /** Optional container background (matches section above, e.g. 'bg-slate-100/90') */
  backgroundColor?: string;
  /** Height classes for responsive sizing */
  className?: string;
  /** Flip horizontally for variation between sections */
  flipX?: boolean;
};

export default function SectionWaveDivider({
  fillColor = "text-white",
  backgroundColor = "transparent",
  className = "h-10 sm:h-14 lg:h-20",
  flipX = false,
}: SectionWaveDividerProps) {
  const shouldReduceMotion = useReducedMotion();
  const rawId = useId();
  const gradientId = `waveGradient-${rawId.replace(/:/g, "")}`;

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none -my-px ${backgroundColor} ${className}`}
    >
      <div className={`relative w-full h-full ${flipX ? "-scale-x-100" : ""}`}>
        {/* Tier 1: Deep Ambient Parallax Crest (Slowest 32s, soft red tint) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.svg
            viewBox="0 0 2880 90"
            fill="currentColor"
            preserveAspectRatio="none"
            className="w-[200%] max-w-none h-full block text-rose-500/15"
            style={{ willChange: "transform" }}
            animate={
              shouldReduceMotion
                ? undefined
                : { transform: ["translate3d(0%, 0, 0)", "translate3d(-50%, 0, 0)"] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 32,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
          >
            <path d="M0,45 C360,15 720,65 1080,25 C1260,8 1350,30 1440,45 C1800,15 2160,65 2520,25 C2700,8 2790,30 2880,45 L2880,100 L0,100 Z" />
          </motion.svg>
        </div>

        {/* Tier 2: Mid-Ground Harmonic Swell (24s, soft rose tint) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.svg
            viewBox="0 0 2880 90"
            fill="currentColor"
            preserveAspectRatio="none"
            className="w-[200%] max-w-none h-full block text-rose-400/25"
            style={{ willChange: "transform" }}
            animate={
              shouldReduceMotion
                ? undefined
                : { transform: ["translate3d(-25%, 0, 0)", "translate3d(-75%, 0, 0)"] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 24,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
          >
            <path d="M0,28 C320,62 680,10 1040,48 C1240,68 1340,42 1440,28 C1760,62 2120,10 2480,48 C2680,68 2780,42 2880,28 L2880,100 L0,100 Z" />
          </motion.svg>
        </div>

        {/* Tier 3: Foreground Solid Transition Wave with Luminous Brand Stroke & Glow */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.svg
            viewBox="0 0 2880 90"
            preserveAspectRatio="none"
            className={`w-[200%] max-w-none h-full block ${fillColor} filter drop-shadow-[0_-4px_10px_rgba(192,29,22,0.22)]`}
            style={{ willChange: "transform" }}
            animate={
              shouldReduceMotion
                ? undefined
                : { transform: ["translate3d(0%, 0, 0)", "translate3d(-50%, 0, 0)"] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 16,
                    repeat: Infinity,
                    ease: "linear",
                  }
            }
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C01D16" />
                <stop offset="25%" stopColor="#F43F5E" />
                <stop offset="50%" stopColor="#FB7185" />
                <stop offset="75%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#C01D16" />
              </linearGradient>
            </defs>
            {/* Solid fill matching the next section */}
            <path
              d="M0,38 C340,68 700,16 1060,52 C1260,70 1350,50 1440,38 C1780,68 2140,16 2500,52 C2700,70 2790,50 2880,38 L2880,100 L0,100 Z"
              fill="currentColor"
            />
            {/* Crisp luminous crest stroke */}
            <path
              d="M0,38 C340,68 700,16 1060,52 C1260,70 1350,50 1440,38 C1780,68 2140,16 2500,52 C2700,70 2790,50 2880,38"
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </motion.svg>
        </div>
      </div>
    </div>
  );
}
