"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import { ReactNode } from "react";

// Webflow-style easing tokens
const EASE_OUT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_OUT },
  },
};

const staggerContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

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
          : { y: -6, transition: { duration: 0.3, ease: EASE_IN_OUT } }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
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
