// src/components/dashboard/glass-card.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({ className, children }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn("wf-dashboard-panel rounded-3xl p-5", className)}
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}
    >
      {children}
    </motion.div>
  );
}
