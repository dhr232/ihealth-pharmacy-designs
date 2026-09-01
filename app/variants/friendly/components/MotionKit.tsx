"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";

const reduced = { opacity: 0, y: 16 };
const visible = { opacity: 1, y: 0 };

export function SectionReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={reduced}
      whileInView={visible}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function StaggerItem({ children, className = "", id }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
}

export function ImagePlaceholder({ label, icon: Icon, className = "" }: { label: string; icon?: React.ElementType; className?: string }) {
  return (
    <div className={`img-placeholder overflow-hidden ${className}`}>
      <div className="text-center">
        {Icon && <Icon size={40} className="mx-auto mb-3 text-[var(--muted)]" />}
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs text-[var(--muted)]">Image placeholder</p>
      </div>
    </div>
  );
}
