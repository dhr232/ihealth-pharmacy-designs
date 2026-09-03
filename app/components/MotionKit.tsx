"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import { ReactNode } from "react";

// Brand24 / Webflow agency-style easing — smooth expo-out
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_IN_OUT_QUART: [number, number, number, number] = [0.77, 0, 0.175, 1];

const blurRevealVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE_OUT_EXPO },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export function BlurReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.3 }}
      variants={blurRevealVariants}
    >
      {children}
    </motion.div>
  );
}

export function SectionReveal({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUpVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}

export function HoverCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { y: -8, transition: { duration: 0.35, ease: EASE_IN_OUT_QUART } }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      whileHover={
        shouldReduceMotion
          ? undefined
          : { scale: 1.03, transition: { duration: 0.25, ease: EASE_OUT_EXPO } }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
}

export function ImagePlaceholder({ icon: Icon }: { icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <div className="flex aspect-video items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <Icon size={48} className="text-[var(--muted)]/40" />
    </div>
  );
}
