"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

// Pattern: ActivityMiniChart
export function DashboardActivityCard() {
  return (
    <GlassCard className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <div>
          <p
            className="text-xs uppercase tracking-[0.16em]"
            style={{ color: "var(--color-subtle)" }}
          >
            Activity
          </p>
          <h3 className="text-base font-semibold">
            Clicks &amp; scans at a glance
          </h3>
        </div>
        <BarChart3
          className="h-5 w-5"
          style={{ color: "var(--color-subtle)" }}
        />
      </div>

      <div
        className="h-24 rounded-2xl flex items-end gap-1 px-2 pb-2"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        {[8, 10, 7, 12, 16, 14, 18].map((v, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: `${v * 4}%`,
              opacity: 1,
            }}
            transition={{ delay: 0.04 * i, duration: 0.3 }}
            className="flex-1 rounded-full"
            style={{
              backgroundColor: "var(--color-accent-soft)",
            }}
          />
        ))}
      </div>
      <p
        className="mt-1 text-xs"
        style={{ color: "var(--color-subtle)" }}
      >
        This view will reflect your live analytics as you grow
        traffic across Kompi links and Kompi Codes™.
      </p>
    </GlassCard>
  );
}
