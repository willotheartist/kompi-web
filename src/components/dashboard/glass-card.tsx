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
      className={cn(
        "bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl",
        "shadow-[0_18px_55px_rgba(3,7,18,0.75)] p-5",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
