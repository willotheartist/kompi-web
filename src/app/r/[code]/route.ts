// src/app/r/[code]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeTargetUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

type RouteContext = {
  params: Promise<{ code: string }>;
};

export async function GET(req: Request, ctx: RouteContext) {
  const { code } = await ctx.params;

  const link = await prisma.link.findFirst({
    where: { code, isActive: true },
  });

  if (!link) {
    return new NextResponse("Not found", { status: 404 });
  }

  const url = new URL(req.url);
  const referer = req.headers.get("referer") || null;
  const userAgent = req.headers.get("user-agent") || "";

  // If you later add UTM columns to ClickEvent, you can wire them back.
  const _utmSource = url.searchParams.get("utm_source");
  const _utmMedium = url.searchParams.get("utm_medium");
  const _utmCampaign = url.searchParams.get("utm_campaign");

  try {
    await prisma.clickEvent.create({
      data: {
        linkId: link.id,
        referer,
        userAgent,
      },
    });

    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });
  } catch (err) {
    console.error("Error while logging ClickEvent for /r/[code]:", err);
  }

  const target = normalizeTargetUrl(link.targetUrl);
  if (!target) {
    return new NextResponse("Invalid target", { status: 500 });
  }

  return NextResponse.redirect(target, 302);
}
