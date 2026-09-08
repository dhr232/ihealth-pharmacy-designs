"use client";

import React from "react";

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
  return (
    <div
      aria-hidden="true"
      className={`w-full overflow-hidden leading-none select-none pointer-events-none ${backgroundColor}`}
    >
      <svg
        viewBox="0 0 1440 90"
        fill="currentColor"
        preserveAspectRatio="none"
        className={`w-full block ${fillColor} ${className} ${flipX ? "-scale-x-100" : ""}`}
      >
        <path d="M0,32 C240,72 480,12 720,48 C960,84 1200,24 1440,40 L1440,90 L0,90 Z" />
      </svg>
    </div>
  );
}
