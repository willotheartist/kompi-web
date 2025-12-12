//src/components/dashboard/dashboard-tips-card.tsx
"use client";

import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type TipItemProps = {
  label: string;
  title: string;
  href: string;
};

function TipItem({ label, title, href }: TipItemProps) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.22, 0.61, 0.36, 1],
          },
        },
      }}
      className="h-full"
    >
      <Link
        href={href}
        className="group flex h-full items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-left transition-colors hover:bg-[var(--color-bg)]"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
            {label}
          </span>
          <p className="truncate text-sm font-medium text-[color:var(--color-text)]">
            {title}
          </p>
        </div>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[color:var(--color-subtle)] transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.li>
  );
}

// Pattern: TipsList_Mini – flat, same header rhythm as other sections
export function DashboardTipsCard() {
  return (
    <section className="flex h-full flex-col gap-4">
      {/* Header – same visual weight as Lifetime / Activity / Recent links */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-[color:var(--color-text)]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-text)]">
            <BookOpen className="h-4 w-4 text-[color:var(--color-text)]" />
          </span>
          <span>Tips &amp; playbooks</span>
        </h2>

        <Link href="/growth"
          className="text-sm font-medium text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
        >
          View all
        </Link>
      </div>

      <motion.ul
        className="grid gap-2 sm:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.06,
              delayChildren: 0.04,
            },
          },
        }}
      >
        <TipItem
          label="Playbook"
          title="5 ways to use Kompi Codes…"
          href="/growth"
        />
        <TipItem
          label="Guide"
          title="Track campaigns with Kompi…"
          href="/growth"
        />
        <TipItem
          label="Inspiration"
          title="Brands connecting print & digital…"
          href="/growth"
        />
      </motion.ul>
    </section>
  );
}
