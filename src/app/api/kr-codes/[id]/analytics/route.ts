// src/app/api/kr-codes/[id]/analytics/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { Prisma } from "@prisma/client";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type TimeseriesPoint = { date: string; count: number };
type ReferrerRow = { referer: string | null; count: number };
type EventRow = { id: string; createdAt: Date; referer: string | null; userAgent: string | null };

export async function GET(_req: Request, ctx: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await ctx.params;

    if (!id) return new NextResponse("Missing id", { status: 400 });

    const krc = await prisma.kRCode.findFirst({
      where: { id, userId: user.id },
      select: {
        id: true,
        title: true,
        destination: true,
        createdAt: true,
        shortCodeId: true,
      },
    });

    if (!krc) return new NextResponse("Not found", { status: 404 });

    if (!krc.shortCodeId) {
      return NextResponse.json({
        krcode: {
          id: krc.id,
          title: krc.title,
          destination: krc.destination,
          createdAt: krc.createdAt,
        },
        link: null,
        summary: { totalScans: 0, lastScanAt: null as Date | null },
        timeseries: [] as TimeseriesPoint[],
        referrers: [] as ReferrerRow[],
        recentEvents: [] as EventRow[],
      });
    }

    const link = await prisma.link.findUnique({
      where: { id: krc.shortCodeId },
      select: { id: true, code: true, targetUrl: true, clicks: true },
    });

    if (!link) {
      return NextResponse.json({
        krcode: {
          id: krc.id,
          title: krc.title,
          destination: krc.destination,
          createdAt: krc.createdAt,
        },
        link: null,
        summary: { totalScans: 0, lastScanAt: null as Date | null },
        timeseries: [] as TimeseriesPoint[],
        referrers: [] as ReferrerRow[],
        recentEvents: [] as EventRow[],
      });
    }

    const since = new Date();
    since.setDate(since.getDate() - 30);

    const [totalScans, lastScanAgg, timeseriesRaw, referrersRaw, recentEvents] = await Promise.all([
      prisma.clickEvent.count({ where: { linkId: link.id } }),
      prisma.clickEvent.aggregate({
        where: { linkId: link.id },
        _max: { createdAt: true },
      }),
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
    ]);

    const lastScanAt = lastScanAgg._max.createdAt ?? null;

    const timeseries: TimeseriesPoint[] = timeseriesRaw.map((r) => ({
      date: r.day.toISOString().slice(0, 10),
      count: Number(r.count),
    }));

    const referrers: ReferrerRow[] = referrersRaw.map((r) => ({
      referer: r.referer ?? null,
      count: Number(r.count),
    }));

    return NextResponse.json({
      krcode: {
        id: krc.id,
        title: krc.title,
        destination: krc.destination,
        createdAt: krc.createdAt,
      },
      link: {
        id: link.id,
        code: link.code,
        targetUrl: link.targetUrl,
        clicks: link.clicks,
      },
      summary: {
        totalScans,
        lastScanAt,
      },
      timeseries,
      referrers,
      recentEvents,
    });
  } catch (err) {
    console.error("GET /api/kr-codes/[id]/analytics error", err);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
