"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type TimeseriesPoint = {
  date: string;
  count: number;
};

type ReferrerRow = {
  referer: string | null;
  count: number;
};

type EventRow = {
  id: string;
  createdAt: string;
  referer: string | null;
  userAgent: string | null;
};

type AnalyticsResponse = {
  krcode: {
    id: string;
    title: string | null;
    destination: string;
    createdAt: string;
  };
  link: {
    id: string;
    code: string | null;
    targetUrl: string;
    clicks: number;
  } | null;
  summary: {
    totalScans: number;
    lastScanAt: string | null;
  };
  timeseries: TimeseriesPoint[];
  referrers: ReferrerRow[];
  recentEvents: EventRow[];
};

export default function KrcodeAnalyticsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/kr-codes/${id}/analytics`, {
          credentials: "include",
        });
        if (!res.ok) {
          if (res.status === 404) {
            setError("KR Code not found");
          } else {
            setError(`Failed with status ${res.status}`);
          }
          return;
        }
        const json = (await res.json()) as AnalyticsResponse;
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load analytics");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!id) {
    return (
      <main className="wf-dashboard-main w-full bg-[var(--color-bg)]">
        <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-8">
          <p className="text-sm text-[color:var(--color-subtle)]">
            Missing KR Code id.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="wf-dashboard-main w-full bg-[var(--color-bg)]">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-3xl">
              KR Code analytics
            </h1>
            <p className="mt-1 text-sm text-[color:var(--color-subtle)]">
              Detailed performance for this QR code.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
          >
            Back
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        ) : error ? (
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <CardContent className="p-6">
              <p className="text-sm text-red-400">{error}</p>
            </CardContent>
          </Card>
        ) : !data ? (
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <CardContent className="p-6">
              <p className="text-sm text-[color:var(--color-subtle)]">
                No analytics data available.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Summary card */}
            <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <CardHeader className="border-b border-[var(--color-border)] pb-4">
                <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 p-4 md:grid-cols-3">
                <div className="space-y-1">
                  <div className="text-xs text-[color:var(--color-subtle)]">
                    KR Code
                  </div>
                  <div className="text-sm font-medium text-[color:var(--color-text)]">
                    {data.krcode.title || "Untitled KR Code"}
                  </div>
                  <div className="break-all text-[11px] text-[color:var(--color-subtle)]">
                    {data.krcode.destination}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-[color:var(--color-subtle)]">
                    Total scans
                  </div>
                  <div className="text-2xl font-semibold text-[color:var(--color-text)]">
                    {data.summary.totalScans}
                  </div>
                  {data.summary.lastScanAt && (
                    <div className="text-[11px] text-[color:var(--color-subtle)]">
                      Last scan{" "}
                      {new Date(
                        data.summary.lastScanAt,
                      ).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-xs text-[color:var(--color-subtle)]">
                    Short link
                  </div>
                  {data.link ? (
                    <>
                      <div className="text-sm font-medium text-[color:var(--color-text)]">
                        {data.link.code
                          ? `${window.location.origin}/r/${data.link.code}`
                          : data.link.targetUrl}
                      </div>
                      <div className="mt-1 text-[11px] text-[color:var(--color-subtle)]">
                        Target: {data.link.targetUrl}
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-[color:var(--color-subtle)]">
                      No short link associated.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Timeseries + referrers */}
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader className="border-b border-[var(--color-border)] pb-4">
                  <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                    Scans over last 30 days
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {data.timeseries.length === 0 ? (
                    <p className="text-sm text-[color:var(--color-subtle)]">
                      No scans recorded in the last 30 days.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex flex-col gap-1 text-[11px] text-[color:var(--color-subtle)]">
                        {data.timeseries.map((point) => (
                          <div
                            key={point.date}
                            className="flex items-center gap-2"
                          >
                            <span className="w-24">
                              {point.date}
                            </span>
                            <div className="flex-1">
                              <div
                                className="h-1.5 rounded-full bg-[var(--color-border)]"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    point.count *
                                      (100 /
                                        Math.max(
                                          1,
                                          ...data.timeseries.map(
                                            (p) => p.count,
                                          ),
                                        )),
                                  )}%`,
                                }}
                              />
                            </div>
                            <span className="w-8 text-right text-[11px] text-[color:var(--color-text)]">
                              {point.count}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                <CardHeader className="border-b border-[var(--color-border)] pb-4">
                  <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                    Top referrers
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {data.referrers.length === 0 ? (
                    <p className="text-sm text-[color:var(--color-subtle)]">
                      No referrer data yet.
                    </p>
                  ) : (
                    <div className="space-y-2 text-[11px]">
                      {data.referrers.map((row, idx) => (
                        <div
                          key={`${row.referer ?? "direct"}-${idx}`}
                          className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2"
                        >
                          <span className="flex-1 truncate text-[color:var(--color-text)]">
                            {row.referer || "Direct / unknown"}
                          </span>
                          <span className="text-[color:var(--color-subtle)]">
                            {row.count} scans
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent events */}
            <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
              <CardHeader className="border-b border-[var(--color-border)] pb-4">
                <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                  Recent scans
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {data.recentEvents.length === 0 ? (
                  <p className="text-sm text-[color:var(--color-subtle)]">
                    No scans recorded yet.
                  </p>
                ) : (
                  <div className="space-y-1 text-[11px]">
                    {data.recentEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="flex flex-col gap-0.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="text-[color:var(--color-text)]">
                          {new Date(ev.createdAt).toLocaleString()}
                        </div>
                        <div className="md:text-right">
                          <div className="truncate text-[color:var(--color-subtle)]">
                            {ev.referer || "Direct / unknown"}
                          </div>
                          <div className="mt-0.5 truncate text-[color:var(--color-subtle)]">
                            {ev.userAgent || "No user agent"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="text-xs text-[color:var(--color-subtle)]">
              <Link
                href="/kr-codes"
                className="underline hover:text-[color:var(--color-text)]"
              >
                Back to KR Codes list
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
