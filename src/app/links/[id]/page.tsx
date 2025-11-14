import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  LinkAnalyticsClient,
  LinkAnalyticsViewModel,
} from "@/components/links/link-analytics-client";

type PageProps = {
  params: { id: string };
};

type ClickEventRecord = Awaited<
  ReturnType<typeof prisma.clickEvent.findMany>
>[number];

function getDeviceBucket(ua: string | null): string {
  if (!ua) return "Other";
  const s = ua.toLowerCase();
  if (s.includes("mobile") || s.includes("iphone") || s.includes("android"))
    return "Mobile";
  if (s.includes("ipad") || s.includes("tablet")) return "Tablet";
  if (s.includes("windows") || s.includes("macintosh") || s.includes("linux"))
    return "Desktop";
  return "Other";
}

export default async function Page({ params }: PageProps) {
  const { id } = params;
  if (!id) notFound();

  let link = await prisma.link.findUnique({ where: { id } });

  // Also allow looking up by code if direct ID lookup fails
  if (!link) {
    link = await prisma.link.findFirst({ where: { code: id } });
  }
  if (!link) notFound();

  const [totalClicks, events] = await Promise.all([
    prisma.clickEvent.count({ where: { linkId: link.id } }),
    prisma.clickEvent.findMany({
      where: { linkId: link.id },
      orderBy: { createdAt: "desc" },
      take: 365,
    }),
  ]);

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  const last7 = events.filter((e: ClickEventRecord) => {
    const createdAt = new Date(e.createdAt);
    return createdAt >= sevenDaysAgo;
  }).length;

  const last30 = events.filter((e: ClickEventRecord) => {
    const createdAt = new Date(e.createdAt);
    return createdAt >= thirtyDaysAgo;
  }).length;

  // Previous 7 days window for growth %
  const prev7Start = new Date(sevenDaysAgo);
  prev7Start.setDate(prev7Start.getDate() - 7);

  const prev7 = events.filter((e: ClickEventRecord) => {
    const createdAt = new Date(e.createdAt);
    return createdAt >= prev7Start && createdAt < sevenDaysAgo;
  }).length;

  const growth7 =
    prev7 === 0
      ? last7 > 0
        ? 100
        : 0
      : Math.round(((last7 - prev7) / prev7) * 100);

  // Daily breakdown (last 14 days)
  const days = 14;
  const daily: { label: string; count: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const day = new Date(now);
    day.setDate(now.getDate() - i);

    const label = `${day.getMonth() + 1}/${day.getDate()}`;

    const start = new Date(day);
    start.setHours(0, 0, 0, 0);

    const end = new Date(day);
    end.setHours(23, 59, 59, 999);

    const count = events.filter((e: ClickEventRecord) => {
      const createdAt = new Date(e.createdAt);
      return createdAt >= start && createdAt <= end;
    }).length;

    daily.push({ label, count });
  }

  // Top referrers
  const refCounts = new Map<string, number>();
  for (const e of events) {
    const key = e.referer || "Direct";
    refCounts.set(key, (refCounts.get(key) || 0) + 1);
  }

  const topReferrers = Array.from(refCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, count]) => ({ label, count }));

  // Device breakdown
  const deviceCounts = new Map<string, number>();
  for (const e of events) {
    const bucket = getDeviceBucket(e.userAgent || null);
    deviceCounts.set(bucket, (deviceCounts.get(bucket) || 0) + 1);
  }

  const devices = Array.from(deviceCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => {
      const pct =
        totalClicks === 0 ? 0 : Math.round((count / totalClicks) * 100);
      return { label, count, pct };
    });

  const createdLabel = link.createdAt.toISOString().slice(0, 10);
  const code = link.code ?? null;

  const base =
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const shortUrl = code ? `${base}/r/${code}` : null;

  const vm: LinkAnalyticsViewModel = {
    id: link.id,
    code,
    targetUrl: link.targetUrl,
    shortUrl,
    createdLabel,
    totalClicks,
    last7,
    last30,
    growth7,
    days,
    daily,
    topReferrers,
    devices,
  };

  return (
    <DashboardLayout>
      <LinkAnalyticsClient vm={vm} />
    </DashboardLayout>
  );
}
