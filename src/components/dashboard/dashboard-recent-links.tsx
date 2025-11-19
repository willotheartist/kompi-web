"use client";

import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/dashboard/glass-card";
import type { LinkSummary } from "@/components/dashboard/dashboard-types";

// Pattern: RecentTable_Dashboard
export function DashboardRecentLinks({ links }: { links: LinkSummary[] }) {
  const router = useRouter();

  return (
    <GlassCard>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p
            className="text-xs uppercase tracking-[0.16em]"
            style={{ color: "var(--color-subtle)" }}
          >
            Recent links
          </p>
          <h3 className="text-base font-semibold">
            Your latest{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
                fontStyle: "italic",
              }}
            >
              Kompi links
            </span>{" "}
            at a glance
          </h3>
        </div>
      </div>

      {links.length === 0 ? (
        <p
          className="text-sm"
          style={{ color: "var(--color-subtle)" }}
        >
          You don&apos;t have any Kompi links yet. Create one above
          and it will appear here instantly.
        </p>
      ) : (
        <div className="space-y-2">
          {links.map((link) => {
            const short =
              link.shortUrl ||
              (link.code ? `kompi.app/${link.code}` : null);
            const created = link.createdAt.slice(0, 10);
            const clicks =
              typeof link.clicks === "number" ? link.clicks : 0;

            return (
              <button
                key={link.id}
                onClick={() => router.push(`/links/${link.id}`)}
                className="w-full text-left rounded-2xl px-4 py-3 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 transition-colors"
                style={{
                  backgroundColor: "var(--color-bg)",
                }}
              >
                <div className="flex-1 min-w-0">
                  {short && (
                    <p className="text-sm font-semibold truncate">
                      {short}
                    </p>
                  )}
                  <p
                    className="text-xs md:text-sm truncate"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    {link.targetUrl}
                  </p>
                </div>
                <div
                  className="flex items-center gap-6 text-xs md:text-sm"
                  style={{ color: "var(--color-subtle)" }}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">
                      {clicks}
                    </span>
                    <span className="text-[10px]">
                      clicks
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-semibold">
                      {created}
                    </span>
                    <span className="text-[10px]">
                      created
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </GlassCard>
  );
}
