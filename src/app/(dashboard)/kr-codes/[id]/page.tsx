// src/app/(dashboard)/kr-codes/[id]/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prisma } from "@prisma/client";

type TimeseriesPoint = { date: string; count: number };
type ReferrerRow = { referer: string | null; count: number };
type EventRow = { id: string; createdAt: Date; referer: string | null; userAgent: string | null };

function hostFromReferer(referer: string | null) {
  if (!referer) return null;
  try {
    const u = new URL(referer);
    return u.host.replace(/^www\./, "");
  } catch {
    return referer;
  }
}

function prettyNumber(n: number) {
  return new Intl.NumberFormat().format(n);
}

function prettyDateTime(d: Date) {
  return d.toLocaleString([], {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function KrcodeAnalyticsPage(props: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await props.params;

  if (!id) redirect("/kr-codes/your");

  const krcode = await prisma.kRCode.findFirst({
    where: { id, userId: user.id },
    select: {
      id: true,
      title: true,
      destination: true,
      createdAt: true,
      shortCodeId: true,
    },
  });

  if (!krcode) {
    return (
      <main className="wf-dashboard-main w-full bg-[#EEF2F7]">
        <section className="wf-dashboard-content mx-auto w-full max-w-6xl px-3 pb-12 pt-8 md:px-6">
          <Card className="rounded-3xl border border-[#E3E8EF] bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-[#0B1220]">KR Code not found</div>
              <div className="mt-1 text-xs text-[#6B7280]">It may have been deleted or you don’t have access.</div>
              <div className="mt-4">
                <Link href="/kr-codes/your" className="text-xs font-medium underline underline-offset-4 hover:text-[#0B1220]">
                  Back to your codes
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  const link = krcode.shortCodeId
    ? await prisma.link.findUnique({
        where: { id: krcode.shortCodeId },
        select: { id: true, code: true, targetUrl: true, clicks: true },
      })
    : null;

  const since = new Date();
  since.setDate(since.getDate() - 30);

  const [totalScans, lastScanAgg, timeseriesRaw, referrersRaw, recentEvents] = link
    ? await Promise.all([
        prisma.clickEvent.count({ where: { linkId: link.id } }),
        prisma.clickEvent.aggregate({ where: { linkId: link.id }, _max: { createdAt: true } }),
        prisma.$queryRaw<Array<{ day: Date; count: bigint }>>(
          Prisma.sql`
            SELECT date_trunc('day', "createdAt") AS day, COUNT(*)::bigint AS count
            FROM "ClickEvent"
            WHERE "linkId" = ${link.id} AND "createdAt" >= ${since}
            GROUP BY 1
            ORDER BY 1 ASC
          `,
        ),
        prisma.$queryRaw<Array<{ referer: string | null; count: bigint }>>(
          Prisma.sql`
            SELECT "referer" as referer, COUNT(*)::bigint AS count
            FROM "ClickEvent"
            WHERE "linkId" = ${link.id} AND "createdAt" >= ${since}
            GROUP BY "referer"
            ORDER BY count DESC NULLS LAST
            LIMIT 8
          `,
        ),
        prisma.clickEvent.findMany({
          where: { linkId: link.id },
          orderBy: { createdAt: "desc" },
          take: 20,
          select: { id: true, createdAt: true, referer: true, userAgent: true },
        }),
      ])
    : [0, { _max: { createdAt: null as Date | null } }, [] as Array<{ day: Date; count: bigint }>, [] as Array<{ referer: string | null; count: bigint }>, [] as EventRow[]];

  const lastScanAt = link ? lastScanAgg._max.createdAt ?? null : null;

  const timeseries: TimeseriesPoint[] = timeseriesRaw.map((r) => ({
    date: r.day.toISOString().slice(0, 10),
    count: Number(r.count),
  }));

  const referrers: ReferrerRow[] = referrersRaw.map((r) => ({
    referer: r.referer ?? null,
    count: Number(r.count),
  }));

  const maxCount = Math.max(1, ...timeseries.map((p) => p.count));
  const topRefMax = Math.max(1, ...referrers.map((r) => r.count));

  const shortUrl = link?.code ? `/r/${link.code}` : null;

  return (
    <main className="wf-dashboard-main w-full">
      <div className="bg-[#EEF2F7]">
        <section className="wf-dashboard-content mx-auto w-full max-w-6xl px-3 pb-12 pt-8 md:px-6">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[12px] font-medium text-[#6B7280]">KR Codes</div>
              <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-[#0B1220] md:text-[34px]">
                Analytics & Insights
              </h1>
              <div className="mt-1 text-[12px] text-[#6B7280]">
                Created {krcode.createdAt.toLocaleDateString()}
                {lastScanAt ? ` · Last scan ${prettyDateTime(lastScanAt)}` : ""}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/kr-codes/your"
                className="inline-flex items-center justify-center rounded-full border border-[#D6DDE6] bg-white px-4 py-2 text-[12px] font-medium text-[#0B1220] hover:bg-[#F7FAFF]"
              >
                Back
              </Link>
              {link?.code && (
                <a
                  href={shortUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#0B1220] px-4 py-2 text-[12px] font-medium text-white hover:opacity-90"
                >
                  Open short link
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="rounded-[26px] border border-[#E3E8EF] bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-[12px] font-semibold text-[#0B1220]">Total scans</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="text-[34px] font-semibold tracking-tight text-[#0B1220]">{prettyNumber(totalScans)}</div>
                <div className="mt-1 text-[12px] text-[#6B7280]">All-time scans for this code</div>
              </CardContent>
            </Card>

            <Card className="rounded-[26px] border border-[#E3E8EF] bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-[12px] font-semibold text-[#0B1220]">KR Code</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="truncate text-[14px] font-semibold text-[#0B1220]">{krcode.title || "Untitled KR Code"}</div>
                <div className="mt-1 break-all text-[11px] text-[#6B7280]">{krcode.destination}</div>
                {link?.targetUrl && (
                  <div className="mt-3 text-[11px] text-[#6B7280]">
                    Target: <span className="break-all text-[#0B1220]">{link.targetUrl}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[26px] border border-[#E3E8EF] bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-[12px] font-semibold text-[#0B1220]">Quick details</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="space-y-2 text-[12px]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#6B7280]">Last 30 days</span>
                    <span className="font-semibold text-[#0B1220]">{prettyNumber(timeseries.reduce((s, p) => s + p.count, 0))}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#6B7280]">Top referrers</span>
                    <span className="font-semibold text-[#0B1220]">{referrers.length}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#6B7280]">Short link</span>
                    <span className="font-semibold text-[#0B1220]">{link?.code ? "Enabled" : "None"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Card className="rounded-[28px] border border-[#E3E8EF] bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-[12px] font-semibold text-[#0B1220]">Scans over last 30 days</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                {timeseries.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#E3E8EF] bg-[#F7FAFF] p-5 text-[12px] text-[#6B7280]">
                    No scans recorded in the last 30 days.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {timeseries.map((p) => {
                      const w = Math.max(2, Math.round((p.count / maxCount) * 100));
                      return (
                        <div key={p.date} className="flex items-center gap-3">
                          <div className="w-24 text-[11px] text-[#6B7280]">{p.date}</div>
                          <div className="flex-1">
                            <div className="h-2 w-full rounded-full bg-[#EEF2F7]">
                              <div className="h-2 rounded-full bg-[#0B1220]" style={{ width: `${w}%` }} />
                            </div>
                          </div>
                          <div className="w-10 text-right text-[11px] font-semibold text-[#0B1220]">{p.count}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border border-[#E3E8EF] bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-[12px] font-semibold text-[#0B1220]">Top referrers</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                {referrers.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#E3E8EF] bg-[#F7FAFF] p-5 text-[12px] text-[#6B7280]">
                    No referrer data yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {referrers.map((r, idx) => {
                      const host = hostFromReferer(r.referer);
                      const w = Math.max(6, Math.round((r.count / topRefMax) * 100));
                      return (
                        <div key={`${host ?? "direct"}-${idx}`} className="rounded-2xl border border-[#E3E8EF] bg-[#F7FAFF] px-4 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-[12px] font-semibold text-[#0B1220]">{host || "Direct / unknown"}</div>
                              <div className="mt-0.5 truncate text-[11px] text-[#6B7280]">{r.referer || "No referrer provided"}</div>
                            </div>
                            <div className="text-[12px] font-semibold text-[#0B1220]">{r.count}</div>
                          </div>
                          <div className="mt-3 h-2 w-full rounded-full bg-white">
                            <div className="h-2 rounded-full bg-[#0B1220]" style={{ width: `${w}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="rounded-[28px] border border-[#E3E8EF] bg-white shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-[12px] font-semibold text-[#0B1220]">Recent scans</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                {recentEvents.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#E3E8EF] bg-[#F7FAFF] p-5 text-[12px] text-[#6B7280]">
                    No scans recorded yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {recentEvents.map((ev) => (
                      <div
                        key={ev.id}
                        className="rounded-2xl border border-[#E3E8EF] bg-[#F7FAFF] px-4 py-3 md:flex md:items-center md:justify-between"
                      >
                        <div className="text-[12px] font-semibold text-[#0B1220]">{prettyDateTime(ev.createdAt)}</div>
                        <div className="mt-2 text-[11px] text-[#6B7280] md:mt-0 md:text-right">
                          <div className="truncate">{hostFromReferer(ev.referer) || "Direct / unknown"}</div>
                          <div className="mt-0.5 truncate">{ev.userAgent || "No user agent"}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-5 text-[12px] text-[#6B7280]">
              <Link href="/kr-codes/your" className="underline underline-offset-4 hover:text-[#0B1220]">
                Back to your codes
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
