"use client";

import React from "react";
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

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none select-none pointer-events-none -my-px ${backgroundColor}`}
    >
      <svg
        viewBox="0 0 1440 90"
        fill="currentColor"
        preserveAspectRatio="none"
        className={`w-[110%] -ml-[5%] block ${fillColor} ${className} ${flipX ? "-scale-x-100" : ""}`}
      >
        {/* Layer 1: Back Crest / Swell Wave (gentle translucent parallax) */}
        <motion.path
          d="M0,45 C220,18 440,68 700,24 C940,-8 1180,52 1440,28 L1440,96 L0,96 Z"
          className="opacity-35"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -32, 0],
                  y: [0, -4, 0],
                  scaleY: [1, 1.06, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />

        {/* Layer 2: Foreground Solid Transition Wave */}
        <motion.path
          d="M0,32 C240,72 480,12 720,48 C960,84 1200,24 1440,40 L1440,96 L0,96 Z"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 24, 0],
                  y: [0, 2, 0],
                  scaleY: [1, 0.97, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      </svg>
    </div>
  );
}
