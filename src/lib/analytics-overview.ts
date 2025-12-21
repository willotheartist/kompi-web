// src/lib/analytics-overview.ts
import { prisma } from "@/lib/prisma";
import {
  endOfDay,
  startOfDay,
  subDays,
  differenceInCalendarDays,
  addDays,
  format as fmt,
} from "date-fns";

export type AnalyticsOverviewData = {
  dateRange: { from: Date; to: Date };
  totalEngagements: number;

  totals: {
    linkClicks: number;
    contactSubmissions: number;
    subscribers: number;
    kcardMessages: number;
  };

  previousPeriod: {
    from: Date;
    to: Date;
    totals: {
      linkClicks: number;
      contactSubmissions: number;
      subscribers: number;
      kcardMessages: number;
    };
    totalEngagements: number;
  };

  growth: {
    totalEngagementsPct: number;
    linkClicksPct: number;
    contactSubmissionsPct: number;
    subscribersPct: number;
  };

  topDate:
    | {
        date: string; // yyyy-MM-dd
        count: number;
      }
    | null;

  timeseries: { date: string; count: number }[];

  byDevice: { device: string; count: number }[];
  byReferrer: { referrer: string; count: number }[];
  byCountry: { country: string; count: number }[];

  byCampaign: { campaign: string; count: number }[];
  byUtmSource: { source: string; count: number }[];
  byUtmMedium: { medium: string; count: number }[];

  topLinks: {
    id: string;
    title: string | null;
    code: string | null;
    targetUrl: string;
    clicks: number;
    lastClickAt: string | null;
    utmCampaignTop: string | null;
  }[];
};

type GetOverviewArgs = {
  workspaceId: string;
  from?: Date;
  to?: Date;
};

function classifyDevice(userAgent: string | null | undefined): string {
  if (!userAgent) return "Unknown";
  const ua = userAgent.toLowerCase();

  // bots first (some bots include "mobile")
  if (ua.includes("bot") || ua.includes("spider") || ua.includes("crawl")) return "Bot";
  if (ua.includes("ipad") || ua.includes("tablet")) return "Tablet";
  if (ua.includes("iphone") || ua.includes("android") || ua.includes("mobile")) return "Mobile";
  return "Desktop";
}

function pctGrowth(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function tidyUtm(v: string | null | undefined): string {
  const s = (v ?? "").trim();
  return s.length ? s : "—";
}

function tidyCountryBucket(v: string | null | undefined): string {
  const s = (v ?? "").trim().toUpperCase();
  if (!s) return "UNKNOWN";
  if (/^[A-Z]{2}$/.test(s)) return s;
  return "UNKNOWN";
}

function tidyReferrerKey(referrerHost: string | null | undefined, referer: string | null | undefined): string {
  const host = (referrerHost ?? "").trim();
  if (host) return host.replace(/^www\./i, "").toLowerCase();

  const raw = (referer ?? "").trim();
  if (!raw) return "direct";
  if (raw === "about:blank") return "direct";

  // app-style referers
  if (/^(android-app|ios-app):\/\//i.test(raw)) return "app";

  // Try parsing as URL; if it's a bare host, prefix https://
  const maybeUrl = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const url = new URL(maybeUrl);
    const h = (url.hostname || "").replace(/^www\./i, "").toLowerCase();
    return h || "unknown";
  } catch {
    return "unknown";
  }
}

async function countContactSubmissions(workspaceId: string, from: Date, to: Date) {
  return prisma.contactSubmission.count({
    where: {
      createdAt: { gte: from, lte: to },
      form: { workspaceId },
    },
  });
}

async function countSubscribers(workspaceId: string, from: Date, to: Date) {
  return prisma.subscriber.count({
    where: {
      createdAt: { gte: from, lte: to },
      list: { workspaceId },
    },
  });
}

async function countKcardMessages(workspaceId: string, from: Date, to: Date) {
  return prisma.kCardMessage.count({
    where: {
      workspaceId,
      createdAt: { gte: from, lte: to },
      isSpam: false,
    },
  });
}

export async function getAnalyticsOverviewForWorkspace({
  workspaceId,
  from,
  to,
}: GetOverviewArgs): Promise<AnalyticsOverviewData> {
  const toDate = endOfDay(to ?? new Date());
  const fromDate = startOfDay(from ?? subDays(toDate, 7));

  const daySpan = Math.max(1, differenceInCalendarDays(toDate, fromDate) + 1);
  const prevTo = endOfDay(subDays(fromDate, 1));
  const prevFrom = startOfDay(subDays(prevTo, daySpan - 1));

  // ---- Click events for current period ----
  const clickEvents = await prisma.clickEvent.findMany({
    where: {
      createdAt: { gte: fromDate, lte: toDate },
      link: { workspaceId },
    },
    select: {
      createdAt: true,
      referer: true,
      referrerHost: true,
      userAgent: true,
      linkId: true,
      utmCampaign: true,
      utmSource: true,
      utmMedium: true,
      country: true,
    },
  });

  // ---- Click events for previous period ----
  const prevLinkClicks = await prisma.clickEvent.count({
    where: {
      createdAt: { gte: prevFrom, lte: prevTo },
      link: { workspaceId },
    },
  });

  const linkClicks = clickEvents.length;

  const [
    contactSubmissions,
    subscribers,
    kcardMessages,
    prevContactSubmissions,
    prevSubscribers,
    prevKcardMessages,
  ] = await Promise.all([
    countContactSubmissions(workspaceId, fromDate, toDate),
    countSubscribers(workspaceId, fromDate, toDate),
    countKcardMessages(workspaceId, fromDate, toDate),

    countContactSubmissions(workspaceId, prevFrom, prevTo),
    countSubscribers(workspaceId, prevFrom, prevTo),
    countKcardMessages(workspaceId, prevFrom, prevTo),
  ]);

  const totalEngagements = linkClicks + contactSubmissions + subscribers + kcardMessages;
  const prevTotalEngagements =
    prevLinkClicks + prevContactSubmissions + prevSubscribers + prevKcardMessages;

  // ---- Timeseries (full range with zeros) ----
  const timeseriesMap = new Map<string, number>();
  for (const ev of clickEvents) {
    // Use ISO date slice to stay stable across timezones
    const key = ev.createdAt.toISOString().slice(0, 10);
    timeseriesMap.set(key, (timeseriesMap.get(key) ?? 0) + 1);
  }

  const timeseries: { date: string; count: number }[] = [];
  for (let i = 0; i < daySpan; i++) {
    const d = addDays(fromDate, i);
    const key = fmt(d, "yyyy-MM-dd");
    timeseries.push({ date: key, count: timeseriesMap.get(key) ?? 0 });
  }

  const topDate =
    timeseries.length === 0
      ? null
      : timeseries.reduce((top, cur) => (cur.count > top.count ? cur : top), timeseries[0]);

  // ---- Device breakdown ----
  const deviceMap = new Map<string, number>();
  for (const ev of clickEvents) {
    const device = classifyDevice(ev.userAgent);
    deviceMap.set(device, (deviceMap.get(device) ?? 0) + 1);
  }
  const byDevice = Array.from(deviceMap.entries()).map(([device, count]) => ({ device, count }));

  // ---- Referrer breakdown ----
  const referrerMap = new Map<string, number>();
  for (const ev of clickEvents) {
    const key = tidyReferrerKey(ev.referrerHost, ev.referer);
    referrerMap.set(key, (referrerMap.get(key) ?? 0) + 1);
  }
  const byReferrer = Array.from(referrerMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([referrer, count]) => ({ referrer, count }));

  // ---- Countries (include UNKNOWN bucket so UI never shows "no data") ----
  const countryMap = new Map<string, number>();
  for (const ev of clickEvents) {
    const bucket = tidyCountryBucket(ev.country);
    countryMap.set(bucket, (countryMap.get(bucket) ?? 0) + 1);
  }

  const byCountry = Array.from(countryMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([country, count]) => ({ country, count }));

  // ---- UTMs ----
  const campaignMap = new Map<string, number>();
  const sourceMap = new Map<string, number>();
  const mediumMap = new Map<string, number>();

  for (const ev of clickEvents) {
    const camp = tidyUtm(ev.utmCampaign);
    const src = tidyUtm(ev.utmSource);
    const med = tidyUtm(ev.utmMedium);
    campaignMap.set(camp, (campaignMap.get(camp) ?? 0) + 1);
    sourceMap.set(src, (sourceMap.get(src) ?? 0) + 1);
    mediumMap.set(med, (mediumMap.get(med) ?? 0) + 1);
  }

  const byCampaign = Array.from(campaignMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([campaign, count]) => ({ campaign, count }));

  const byUtmSource = Array.from(sourceMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([source, count]) => ({ source, count }));

  const byUtmMedium = Array.from(mediumMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([medium, count]) => ({ medium, count }));

  // ---- Top links ----
  const linkCounts = new Map<string, number>();
  const linkLastClick = new Map<string, Date>();
  const linkCampaignTop = new Map<string, Map<string, number>>();

  for (const ev of clickEvents) {
    linkCounts.set(ev.linkId, (linkCounts.get(ev.linkId) ?? 0) + 1);

    const last = linkLastClick.get(ev.linkId);
    if (!last || ev.createdAt > last) linkLastClick.set(ev.linkId, ev.createdAt);

    const c = tidyUtm(ev.utmCampaign);
    if (!linkCampaignTop.has(ev.linkId)) linkCampaignTop.set(ev.linkId, new Map());
    const m = linkCampaignTop.get(ev.linkId)!;
    m.set(c, (m.get(c) ?? 0) + 1);
  }

  const topLinkIds = Array.from(linkCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([linkId]) => linkId);

  const links = topLinkIds.length
    ? await prisma.link.findMany({
        where: { id: { in: topLinkIds }, workspaceId },
        select: { id: true, title: true, code: true, targetUrl: true },
      })
    : [];

  const topLinks = topLinkIds
    .map((id) => {
      const link = links.find((l) => l.id === id);
      const clicks = linkCounts.get(id) ?? 0;
      const lastClickAt = linkLastClick.get(id) ?? null;

      const campaignCounts = linkCampaignTop.get(id);
      let utmCampaignTop: string | null = null;
      if (campaignCounts && campaignCounts.size) {
        const best = Array.from(campaignCounts.entries()).sort((a, b) => b[1] - a[1])[0];
        utmCampaignTop = best ? best[0] : null;
      }

      return {
        id,
        title: link?.title ?? null,
        code: link?.code ?? null,
        targetUrl: link?.targetUrl ?? "",
        clicks,
        lastClickAt: lastClickAt ? lastClickAt.toISOString() : null,
        utmCampaignTop,
      };
    })
    .filter((x) => x.targetUrl);

  return {
    dateRange: { from: fromDate, to: toDate },
    totalEngagements,
    totals: { linkClicks, contactSubmissions, subscribers, kcardMessages },

    previousPeriod: {
      from: prevFrom,
      to: prevTo,
      totals: {
        linkClicks: prevLinkClicks,
        contactSubmissions: prevContactSubmissions,
        subscribers: prevSubscribers,
        kcardMessages: prevKcardMessages,
      },
      totalEngagements: prevTotalEngagements,
    },

    growth: {
      totalEngagementsPct: pctGrowth(totalEngagements, prevTotalEngagements),
      linkClicksPct: pctGrowth(linkClicks, prevLinkClicks),
      contactSubmissionsPct: pctGrowth(contactSubmissions, prevContactSubmissions),
      subscribersPct: pctGrowth(subscribers, prevSubscribers),
    },

    topDate,
    timeseries,
    byDevice,
    byReferrer,
    byCountry,
    byCampaign,
    byUtmSource,
    byUtmMedium,
    topLinks,
  };
}
