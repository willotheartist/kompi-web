import { prisma } from "@/lib/prisma";
import { getPlanLimits, planName } from "@/lib/plan-limits";
import { PUBLIC_PROFILE_URL, SHORT_LINK_BASE_URL } from "@/lib/urls";

export type SeriesKey = "links" | "qr" | "cards" | "messages";
export type DayPoint = { date: string } & Record<SeriesKey, number>;

const DAYS = 30;

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** Everything the Overview needs, fetched in one parallel round trip. */
export async function getDashboardOverview(userId: string, workspace: { id: string; plan?: string | null }) {
  const workspaceId = workspace.id;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const since = new Date(today);
  since.setUTCDate(since.getUTCDate() - (DAYS * 2 - 1)); // current + previous window for deltas

  const [
    linkCount,
    cardCount,
    qrCount,
    allClicks,
    allCardViews,
    allMessages,
    clickDays,
    viewDays,
    messageDays,
    recentLinks,
    recentCodes,
    cards,
  ] = await Promise.all([
    prisma.link.count({ where: { workspaceId, qrCodes: { none: {} } } }),
    prisma.kCard.count({ where: { workspaceId } }),
    prisma.kRCode.count({ where: { workspaceId } }),
    prisma.$queryRaw<Array<{ qr: boolean; n: bigint }>>`
      SELECT EXISTS (SELECT 1 FROM "KRCode" q WHERE q."shortCodeId" = l.id) AS qr, count(*) AS n
      FROM "ClickEvent" e JOIN "Link" l ON l.id = e."linkId"
      WHERE l."workspaceId" = ${workspaceId}
      GROUP BY 1`,
    prisma.engagementEvent.count({ where: { workspaceId, type: "card_view" } }),
    prisma.kCardMessage.count({ where: { ownerId: userId, isSpam: false, OR: [{ workspaceId }, { workspaceId: null }] } }),
    prisma.$queryRaw<Array<{ d: Date; qr: boolean; n: bigint }>>`
      SELECT date_trunc('day', e."createdAt") AS d,
             EXISTS (SELECT 1 FROM "KRCode" q WHERE q."shortCodeId" = l.id) AS qr,
             count(*) AS n
      FROM "ClickEvent" e JOIN "Link" l ON l.id = e."linkId"
      WHERE l."workspaceId" = ${workspaceId} AND e."createdAt" >= ${since}
      GROUP BY 1, 2`,
    prisma.$queryRaw<Array<{ d: Date; n: bigint }>>`
      SELECT date_trunc('day', "createdAt") AS d, count(*) AS n
      FROM "EngagementEvent"
      WHERE "workspaceId" = ${workspaceId} AND type = 'card_view' AND "createdAt" >= ${since}
      GROUP BY 1`,
    prisma.$queryRaw<Array<{ d: Date; n: bigint }>>`
      SELECT date_trunc('day', "createdAt") AS d, count(*) AS n
      FROM "KCardMessage"
      WHERE "ownerId" = ${userId} AND "isSpam" = false AND ("workspaceId" = ${workspaceId} OR "workspaceId" IS NULL) AND "createdAt" >= ${since}
      GROUP BY 1`,
    prisma.link.findMany({
      where: { workspaceId, qrCodes: { none: {} } },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, code: true, targetUrl: true, clicks: true, isActive: true, createdAt: true },
    }),
    prisma.kRCode.findMany({
      where: { workspaceId },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, type: true, destination: true, shortCodeId: true, updatedAt: true, shortLink: { select: { clicks: true } } },
    }),
    prisma.kCard.findMany({
      where: { workspaceId },
      orderBy: { updatedAt: "desc" },
      take: 3,
      select: { id: true, data: true, slug: true, isPublic: true, updatedAt: true },
    }),
  ]);

  // Fill a dense day-by-day series (UTC) so charts have no gaps.
  const map = new Map<string, DayPoint>();
  for (let i = 0; i < DAYS * 2; i++) {
    const d = new Date(since);
    d.setUTCDate(d.getUTCDate() + i);
    const key = dayKey(d);
    map.set(key, { date: key, links: 0, qr: 0, cards: 0, messages: 0 });
  }
  for (const row of clickDays) {
    const p = map.get(dayKey(new Date(row.d)));
    if (p) p[row.qr ? "qr" : "links"] += Number(row.n);
  }
  for (const row of viewDays) {
    const p = map.get(dayKey(new Date(row.d)));
    if (p) p.cards += Number(row.n);
  }
  for (const row of messageDays) {
    const p = map.get(dayKey(new Date(row.d)));
    if (p) p.messages += Number(row.n);
  }
  const all = Array.from(map.values());
  const previous = all.slice(0, DAYS);
  const series = all.slice(DAYS);

  const sum = (pts: DayPoint[], k: SeriesKey) => pts.reduce((s, p) => s + p[k], 0);
  const delta = (k: SeriesKey) => {
    const cur = sum(series, k);
    const prev = sum(previous, k);
    if (!prev) return cur ? null : 0; // "new" rather than an infinite percentage
    return ((cur - prev) / prev) * 100;
  };

  const linkClicksAll = Number(allClicks.find((r) => !r.qr)?.n ?? 0);
  const qrClicksAll = Number(allClicks.find((r) => r.qr)?.n ?? 0);

  const metrics = (
    [
      { key: "links", label: "Link visits", allTime: linkClicksAll },
      { key: "qr", label: "QR scans", allTime: qrClicksAll },
      { key: "cards", label: "Card views", allTime: allCardViews },
      { key: "messages", label: "Messages", allTime: allMessages },
    ] as const
  ).map((m) => ({ ...m, period: sum(series, m.key), delta: delta(m.key), spark: series.map((p) => p[m.key]) }));

  return {
    plan: { name: planName(workspace.plan), id: workspace.plan ?? "FREE", limits: getPlanLimits(workspace.plan) },
    counts: { links: linkCount, cards: cardCount, qr: qrCount },
    metrics,
    series,
    recentLinks: recentLinks.map((l) => ({
      id: l.id,
      title: l.title,
      targetUrl: l.targetUrl,
      clicks: l.clicks,
      isActive: l.isActive,
      shortUrl: l.code ? `${SHORT_LINK_BASE_URL}/r/${l.code}` : null,
      createdAt: l.createdAt.toISOString(),
    })),
    recentCodes: recentCodes.map((c) => ({
      id: c.id,
      title: c.title,
      type: c.type,
      destination: c.destination,
      dynamic: Boolean(c.shortCodeId),
      scans: c.shortLink?.clicks ?? 0,
      updatedAt: c.updatedAt.toISOString(),
    })),
    cards: cards.map((c) => {
      const data = (c.data ?? {}) as { title?: string; subtitle?: string; avatarDataUrl?: string };
      return {
        id: c.id,
        title: data.title || "Untitled Card",
        subtitle: data.subtitle || "",
        avatar: data.avatarDataUrl || null,
        published: Boolean(c.isPublic && c.slug),
        url: c.slug ? `${PUBLIC_PROFILE_URL}/${c.slug}` : null,
        slug: c.slug,
        updatedAt: c.updatedAt.toISOString(),
      };
    }),
  };
}

export type DashboardOverview = Awaited<ReturnType<typeof getDashboardOverview>>;
