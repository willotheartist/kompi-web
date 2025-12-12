/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeTargetUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

type CodeParams = { code: string } | Promise<{ code: string }>;

async function resolveParams(params: CodeParams): Promise<{ code: string }> {
  return params instanceof Promise ? await params : params;
}

export async function GET(
  req: Request,
  ctx: { params: CodeParams }
) {
  const { code } = await resolveParams(ctx.params);

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
    // ✅ Match your Prisma schema: no _utmSource/_utmMedium/_utmCampaign fields here
    await prisma.clickEvent.create({
      data: {
        linkId: link.id,
        referer,
        userAgent,
        // If your ClickEvent model has an ip field, you can also add:
        // ip: req.headers.get("x-forwarded-for") || null,
      },
    });

    // also increment the simple counter used by dashboards
    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    });
  } catch (err) {
    // Don't silently swallow the bug again
    console.error("Error while logging ClickEvent for /r/[code]:", err);
  }

  const target = normalizeTargetUrl(link.targetUrl);
  if (!target) {
    return new NextResponse("Invalid target", { status: 500 });
  }

  return NextResponse.redirect(target, 302);
}
