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

  const utmSource = url.searchParams.get("utm_source");
  const utmMedium = url.searchParams.get("utm_medium");
  const utmCampaign = url.searchParams.get("utm_campaign");

  try {
    await prisma.clickEvent.create({
      data: {
        linkId: link.id,
        referer,
        userAgent,
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
      },
    });
  } catch {
    // ignore logging errors
  }

  const target = normalizeTargetUrl(link.targetUrl);
  if (!target) {
    return new NextResponse("Invalid target", { status: 500 });
  }

  return NextResponse.redirect(target, 302);
}
