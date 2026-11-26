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

  // ORM queries only: production tables live in a non-default Postgres schema that raw SQL would miss.
  const [
    linkCount,
    cardCount,
    qrCount,
    linkClicksAll,
    qrClicksAll,
    allCardViews,
    allMessages,
    qrLinks,
    clickRows,
    viewRows,
    messageRows,
    recentLinks,
    recentCodes,
    cards,
  ] = await Promise.all([
    prisma.link.count({ where: { workspaceId, qrCodes: { none: {} } } }),
    prisma.kCard.count({ where: { workspaceId } }),
    prisma.kRCode.count({ where: { workspaceId } }),
    prisma.clickEvent.count({ where: { link: { workspaceId, qrCodes: { none: {} } } } }),
    prisma.clickEvent.count({ where: { link: { workspaceId, qrCodes: { some: {} } } } }),
    prisma.engagementEvent.count({ where: { workspaceId, type: "card_view" } }),
    prisma.kCardMessage.count({ where: { ownerId: userId, isSpam: false, OR: [{ workspaceId }, { workspaceId: null }] } }),
    prisma.kRCode.findMany({ where: { workspaceId, shortCodeId: { not: null } }, select: { shortCodeId: true } }),
    prisma.clickEvent.findMany({ where: { createdAt: { gte: since }, link: { workspaceId } }, select: { createdAt: true, linkId: true } }),
    prisma.engagementEvent.findMany({ where: { workspaceId, type: "card_view", createdAt: { gte: since } }, select: { createdAt: true } }),
    prisma.kCardMessage.findMany({
      where: { ownerId: userId, isSpam: false, OR: [{ workspaceId }, { workspaceId: null }], createdAt: { gte: since } },
      select: { createdAt: true },
    }),
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
  const qrLinkIds = new Set(qrLinks.map((q) => q.shortCodeId));

  // Fill a dense day-by-day series (UTC) so charts have no gaps.
  const map = new Map<string, DayPoint>();
  for (let i = 0; i < DAYS * 2; i++) {
    const d = new Date(since);
    d.setUTCDate(d.getUTCDate() + i);
    const key = dayKey(d);
    map.set(key, { date: key, links: 0, qr: 0, cards: 0, messages: 0 });
  }
  for (const row of clickRows) {
    const p = map.get(dayKey(row.createdAt));
    if (p) p[qrLinkIds.has(row.linkId) ? "qr" : "links"] += 1;
  }
  for (const row of viewRows) {
    const p = map.get(dayKey(row.createdAt));
    if (p) p.cards += 1;
  }
  for (const row of messageRows) {
    const p = map.get(dayKey(row.createdAt));
    if (p) p.messages += 1;
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
