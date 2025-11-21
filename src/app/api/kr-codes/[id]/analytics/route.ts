import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function resolveParams(params: RouteContext["params"]) {
  return params instanceof Promise ? await params : params;
}

export async function GET(_req: Request, ctx: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await resolveParams(ctx.params);

    if (!id) {
      return new NextResponse("Missing id", { status: 400 });
    }

    const krc = await prisma.kRCode.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!krc) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (!krc.shortCodeId) {
      return NextResponse.json({
        krcode: {
          id: krc.id,
          title: krc.title,
          destination: krc.destination,
          createdAt: krc.createdAt,
        },
        link: null,
        summary: {
          totalScans: 0,
          lastScanAt: null as Date | null,
        },
        timeseries: [] as Array<{ date: string; count: number }>,
        referrers: [] as Array<{ referer: string | null; count: number }>,
        recentEvents: [] as Array<{
          id: string;
          createdAt: Date;
          referer: string | null;
          userAgent: string | null;
        }>,
      });
    }

    const link = await prisma.link.findUnique({
      where: { id: krc.shortCodeId },
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
        summary: {
          totalScans: 0,
          lastScanAt: null as Date | null,
        },
        timeseries: [] as Array<{ date: string; count: number }>,
        referrers: [] as Array<{ referer: string | null; count: number }>,
        recentEvents: [] as Array<{
          id: string;
          createdAt: Date;
          referer: string | null;
          userAgent: string | null;
        }>,
      });
    }

    const since = new Date();
    since.setDate(since.getDate() - 30);

    const events = await prisma.clickEvent.findMany({
      where: {
        linkId: link.id,
        createdAt: {
          gte: since,
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Build daily timeseries
    const dailyMap = new Map<string, number>();
    for (const ev of events) {
      const d = ev.createdAt;
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
    }

    const timeseries = Array.from(dailyMap.entries())
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([date, count]) => ({ date, count }));

    // Top referrers
    const refMap = new Map<string | null, number>();
    for (const ev of events) {
      const key = ev.referer ?? null;
      refMap.set(key, (refMap.get(key) ?? 0) + 1);
    }

    const referrers = Array.from(refMap.entries())
      .map(([referer, count]) => ({ referer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const lastScanAt = events.length
      ? events[events.length - 1]!.createdAt
      : null;

    const recentEvents = events
      .slice(-20)
      .reverse()
      .map((ev) => ({
        id: ev.id,
        createdAt: ev.createdAt,
        referer: ev.referer,
        userAgent: ev.userAgent,
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
        totalScans: link.clicks,
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
