"use client";

import { motion } from "framer-motion";

type DashboardActivityStripProps = {
  clicks?: number;
  scans?: number;
  linksCreated?: number;
  codesCreated?: number;
};

export function DashboardActivityStrip({
  clicks = 0,
  scans = 0,
  linksCreated = 0,
  codesCreated = 0,
}: DashboardActivityStripProps) {
  const items: { label: string; value: number }[] = [
    { label: "Clicks", value: clicks },
    { label: "Scans", value: scans },
    { label: "Links", value: linksCreated },
    { label: "Kompi Codes", value: codesCreated },
  ];

  return (
    <section className="flex h-full flex-col gap-4">
      {/* Header – match Lifetime totals style */}
      <h2 className="text-xl font-semibold text-[color:var(--color-text)]">
        Activity
      </h2>

      {/* Stat row – flat, like Lifetime totals, with luxe staggered motion */}
      <motion.div
        className="grid gap-3 sm:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.05,
            },
          },
        }}
      >
        {items.map((item) => (
          <motion.div
            key={item.label}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.45,
                  ease: [0.22, 0.61, 0.36, 1],
                },
              },
            }}
          >
            <StatPill label={item.label} value={item.value} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

type StatPillProps = {
  label: string;
  value: number;
};

function StatPill({ label, value }: StatPillProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl bg-[var(--color-surface)] px-4 py-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-subtle)]">
        {label}
      </span>
      <span className="mt-1 text-2xl font-semibold leading-tight text-[color:var(--color-text)]">
        {value.toLocaleString()}
      </span>
    </div>
  );
}
