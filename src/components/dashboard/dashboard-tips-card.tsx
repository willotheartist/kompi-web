"use client";

import { GlassCard } from "@/components/dashboard/glass-card";
import { BookOpen, ArrowRight } from "lucide-react";

type TipItemProps = {
  label: string;
  title: string;
  href: string;
};

function TipItem({ label, title, href }: TipItemProps) {
  return (
    <li>
      <a
        href={href}
        className="group flex h-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition-colors hover:bg-[var(--color-surface)]"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-bg)",
        }}
      >
        <div className="flex flex-col gap-1">
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--color-subtle)" }}
          >
            {label}
          </span>
          <p className="text-sm font-medium truncate">{title}</p>
        </div>
        <ArrowRight
          className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
          style={{ color: "var(--color-subtle)" }}
        />
      </a>
    </li>
  );
}

// Pattern: TipsList_Mini
export function DashboardTipsCard() {
  return (
    <GlassCard className="space-y-4 bg-[var(--color-accent-soft)] border-none shadow-none">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full border"
            style={{
              borderColor: "var(--color-text)",
              backgroundColor: "transparent",
            }}
          >
            <BookOpen
              className="h-4 w-4"
              style={{ color: "var(--color-text)" }}
            />
          </div>
          <p
            className="text-xs font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--color-text)" }}
          >
            Tips &amp; playbooks
          </p>
        </div>

        <a
          href="/growth"
          className="text-[11px] font-medium underline-offset-2 hover:underline"
          style={{ color: "var(--color-text)" }}
        >
          View all
        </a>
      </div>

      <ul className="grid gap-2 sm:grid-cols-3">
        <TipItem
          label="Playbook"
          title="5 ways to use Kompi Codes..."
          href="/growth"
        />
        <TipItem
          label="Guide"
          title="Track campaigns with Kompi..."
          href="/growth"
        />
        <TipItem
          label="Inspiration"
          title="Brands connecting print & digital..."
          href="/growth"
        />
      </ul>
    </GlassCard>
  );
}
