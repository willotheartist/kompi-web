import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

async function getUserLink(userId: string, id: string) {
  return prisma.link.findFirst({
    where: { id, workspace: { ownerId: userId } },
  });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;

    const link = await getUserLink(user.id, id);
    if (!link) {
      return new NextResponse("Not found", { status: 404 });
    }

    const events = await prisma.clickEvent.findMany({
      where: { linkId: link.id },
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    const totalClicks = events.length;

    const refMap = new Map<string, number>();
    for (const e of events) {
      const key = e.referer || "Direct";
      refMap.set(key, (refMap.get(key) || 0) + 1);
    }

    const topReferrers = [...refMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([referrer, count]) => ({ referrer, count }));

    return NextResponse.json({
      totalClicks,
      lastClickAt: events[0]?.createdAt ?? null,
      events,
      topReferrers,
    });
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
