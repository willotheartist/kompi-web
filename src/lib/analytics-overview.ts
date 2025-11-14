// src/lib/analytics-overview.ts
import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay, subDays } from "date-fns";

export type AnalyticsOverviewData = {
  dateRange: { from: Date; to: Date };
  totalEngagements: number;
  topDate:
    | {
        date: string; // yyyy-MM-dd
        count: number;
      }
    | null;
  timeseries: { date: string; count: number }[];
  byDevice: { device: string; count: number }[];
  byReferrer: { referrer: string; count: number }[];
  byCountry: { country: string; count: number }[]; // placeholder until we add geo
};

type GetOverviewArgs = {
  workspaceId: string;
  from?: Date;
  to?: Date;
};

function classifyDevice(userAgent: string | null | undefined): string {
  if (!userAgent) return "Unknown";
  const ua = userAgent.toLowerCase();

  if (ua.includes("iphone") || ua.includes("android") || ua.includes("mobile")) {
    return "Mobile";
  }
  if (ua.includes("ipad") || ua.includes("tablet")) {
    return "Tablet";
  }
  if (ua.includes("bot") || ua.includes("spider") || ua.includes("crawl")) {
    return "Bot";
  }
  return "Desktop";
}

export async function getAnalyticsOverviewForWorkspace({
  workspaceId,
  from,
  to,
}: GetOverviewArgs): Promise<AnalyticsOverviewData> {
  const toDate = endOfDay(to ?? new Date());
  const fromDate = startOfDay(from ?? subDays(toDate, 7));

  // ClickEvent model: id, linkId, createdAt, ip, referer, userAgent, link
  const events = await prisma.clickEvent.findMany({
    where: {
      createdAt: {
        gte: fromDate,
        lte: toDate,
      },
      link: {
        workspaceId,
      },
    },
    select: {
      createdAt: true,
      referer: true,
      userAgent: true,
    },
  });

  const totalEngagements = events.length;

  // ---- Timeseries (by day) ----
  const timeseriesMap = new Map<string, number>();

  for (const ev of events) {
    const key = ev.createdAt.toISOString().slice(0, 10); // yyyy-MM-dd
    timeseriesMap.set(key, (timeseriesMap.get(key) ?? 0) + 1);
  }

  const timeseries = Array.from(timeseriesMap.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([date, count]) => ({ date, count }));

  const topDate =
    timeseries.length === 0
      ? null
      : timeseries.reduce(
          (top, current) => (current.count > top.count ? current : top),
          timeseries[0]
        );

  // ---- Device breakdown (derived from userAgent) ----
  const deviceMap = new Map<string, number>();
  for (const ev of events) {
    const device = classifyDevice(ev.userAgent);
    deviceMap.set(device, (deviceMap.get(device) ?? 0) + 1);
  }
  const byDevice = Array.from(deviceMap.entries()).map(([device, count]) => ({
    device,
    count,
  }));

  // ---- Referrer breakdown ----
  const referrerMap = new Map<string, number>();
  for (const ev of events) {
    const ref = ev.referer?.trim();
    const key = ref && ref !== "" ? ref : "Direct / Unknown";
    referrerMap.set(key, (referrerMap.get(key) ?? 0) + 1);
  }
  const byReferrer = Array.from(referrerMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([referrer, count]) => ({ referrer, count }));

  // ---- Location (placeholder) ----
  // You don't have geo fields on ClickEvent yet, so we return an empty array.
  const byCountry: { country: string; count: number }[] = [];

  return {
    dateRange: { from: fromDate, to: toDate },
    totalEngagements,
    topDate,
    timeseries,
    byDevice,
    byReferrer,
    byCountry,
  };
}
