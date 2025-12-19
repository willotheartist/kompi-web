"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { LinkSummary } from "@/components/dashboard/dashboard-types";
import { ArrowRight, Link2 } from "lucide-react";

// Format as "28 Nov" in a hydration-safe way (no locale differences)
const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatCreatedDate(dateInput: string): string {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  const day = d.getDate();
  const month = MONTHS_SHORT[d.getMonth()] ?? "";
  return `${day} ${month}`;
}

function getHostname(url: string | null): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

// Pattern: RecentTable_Dashboard – flat, linktree-style list
export function DashboardRecentLinks({ links }: { links: LinkSummary[] }) {
  const router = useRouter();
  const hasLinks = links.length > 0;
  const recent = hasLinks ? links.slice(0, 5) : [];

  return (
    <section className="flex h-full flex-col gap-4">
      {/* Header – same sizing language as Lifetime / Activity */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-(--color-text)">
          Recent links
        </h2>

        {hasLinks && (
          <Link
            href="/links"
            className="inline-flex items-center gap-1 text-sm font-medium text-(--color-subtle) hover:text-(--color-text)"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {!hasLinks ? (
        <div className="rounded-3xl border border-dashed border-(--color-border) px-4 py-5 sm:px-5">
          <p className="text-sm font-medium text-(--color-text)">
            No links yet.
          </p>
          <p className="mt-1 text-sm text-(--color-subtle)">
            Create your first Kompi link to see it appear here.
          </p>
          <button
            type="button"
            onClick={() => router.push("/links/new")}
            className="mt-3 inline-flex items-center gap-1 rounded-full border border-(--color-border) px-3 py-1.5 text-xs font-medium text-(--color-text) hover:bg-(--color-surface)"
          >
            <Link2 className="h-3.5 w-3.5" />
            Create a link
          </button>
        </div>
      ) : (
        <motion.div
          className="space-y-2"
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
          {recent.map((link) => {
            const short =
              link.shortUrl || (link.code ? `kompi.app/${link.code}` : "");
            const hostname = getHostname(link.targetUrl);
            const clicks = link.clicks ?? 0;
            const createdLabel = formatCreatedDate(link.createdAt);

            return (
              <motion.button
                key={link.id}
                type="button"
                onClick={() => router.push(`/links/${link.id}`)}
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
                className="group flex w-full items-center gap-3 rounded-[18px] border border-(--color-border) bg-[var(--color-surface)] px-3.5 py-3 text-left text-sm transition-colors sm:px-4 sm:py-3.5 hover:bg-[var(--color-bg)]"
              >
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-black/5">
                  <Link2 className="h-4 w-4 text-[color:var(--color-text)]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[color:var(--color-text)]">
                    {hostname || short || link.targetUrl}
                  </p>
                  {short && (
                    <p className="truncate text-[11px] text-[color:var(--color-subtle)]">
                      {short}
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-0.5 text-right">
                  <span className="text-sm font-semibold text-[color:var(--color-text)]">
                    {clicks.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[color:var(--color-subtle)]">
                    clicks · {createdLabel}
                  </span>
                </div>

                <ArrowRight className="h-3.5 w-3.5 flex-none opacity-40 transition-transform duration-150 group-hover:translate-x-0.5" />
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
