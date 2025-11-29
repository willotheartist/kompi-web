// src/components/dashboard/glass-card.tsx
"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export function GlassCard({ className, children, style }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("wf-dashboard-panel rounded-3xl p-5", className)}
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        // allow overrides from callers
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}
