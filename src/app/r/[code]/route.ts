// src/app/r/[code]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeTargetUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return trimmed;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function safeParseUrl(raw: string): URL | null {
  try {
    const normalized = normalizeTargetUrl(raw);
    if (!normalized) return null;
    return new URL(normalized);
  } catch {
    return null;
  }
}

function firstIpFromXff(xff: string | null): string | null {
  if (!xff) return null;
  const first = xff.split(",")[0]?.trim();
  return first ? first : null;
}

function normalizeReferrerHost(referer: string | null): string {
  const r = (referer || "").trim();
  if (!r) return "direct";
  if (r === "about:blank") return "direct";

  // App referrers (common on mobile)
  if (/^(android-app|ios-app):\/\//i.test(r)) {
    const m = r.match(/^(android-app|ios-app):\/\/([^/]+)/i);
    const bundle = (m?.[2] || "").toLowerCase();

    if (!bundle) return "app";
    if (bundle.includes("instagram")) return "instagram";
    if (bundle.includes("tiktok")) return "tiktok";
    if (bundle.includes("facebook")) return "facebook";
    if (bundle.includes("twitter") || bundle.includes("x")) return "x";
    if (bundle.includes("youtube")) return "youtube";
    return `app:${bundle}`;
  }

  // Some referrers come as bare hosts or odd values; try to normalize
  const maybeUrl = /^https?:\/\//i.test(r) ? r : `https://${r}`;

  try {
    const url = new URL(maybeUrl);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();

    const map: Array<[RegExp, string]> = [
      [/^(t\.co|twitter\.com|x\.com)$/i, "x"],
      [/^(instagram\.com|l\.instagram\.com)$/i, "instagram"],
      [/^(tiktok\.com|vm\.tiktok\.com)$/i, "tiktok"],
      [/^(youtube\.com|youtu\.be)$/i, "youtube"],
      [/^(facebook\.com|m\.facebook\.com|l\.facebook\.com|fb\.com)$/i, "facebook"],
      [/^(linkedin\.com|lnkd\.in)$/i, "linkedin"],
      [/^(pinterest\.com|pin\.it)$/i, "pinterest"],
      [/^(reddit\.com|old\.reddit\.com)$/i, "reddit"],
      [/^(google\.[a-z.]+)$/i, "google"],
      [/^(bing\.com)$/i, "bing"],
      [/^(duckduckgo\.com)$/i, "duckduckgo"],
    ];

    for (const [re, label] of map) {
      if (re.test(host)) return label;
    }

    return host || "direct";
  } catch {
    return "unknown";
  }
}

function header(req: Request, name: string): string | null {
  return req.headers.get(name) ?? req.headers.get(name.toLowerCase()) ?? null;
}

/**
 * Geo capture:
 * - Prefer edge-enriched headers (middleware on Vercel).
 * - Fallback to provider headers if present.
 */
function getGeoFromHeaders(req: Request): {
  country: string | null;
  region: string | null;
  city: string | null;
} {
  const country =
    header(req, "x-edge-country") ||
    header(req, "x-vercel-ip-country") ||
    header(req, "cf-ipcountry") ||
    null;

  const region =
    header(req, "x-edge-region") ||
    header(req, "x-vercel-ip-country-region") ||
    header(req, "x-vercel-ip-region") ||
    null;

  const city =
    header(req, "x-edge-city") ||
    header(req, "x-vercel-ip-city") ||
    null;

  return {
    country: country ? country.trim().toUpperCase() : null,
    region: region ? region.trim() : null,
    city: city ? city.trim() : null,
  };
}

type RouteContext = {
  params: Promise<{ code: string }>;
};

export async function GET(req: Request, ctx: RouteContext) {
  const { code } = await ctx.params;

  const link = await prisma.link.findFirst({
    where: { code, isActive: true },
    select: {
      id: true,
      targetUrl: true,
    },
  });

  if (!link) return new NextResponse("Not found", { status: 404 });

  const reqUrl = new URL(req.url);

  const referer = req.headers.get("referer") || null;
  const userAgent = req.headers.get("user-agent") || null;
  const referrerHost = normalizeReferrerHost(referer);

  // capture IP if available (works behind proxies/CDNs)
  const ip =
    firstIpFromXff(req.headers.get("x-forwarded-for")) ||
    firstIpFromXff(req.headers.get("x-edge-ip")) ||
    req.headers.get("x-real-ip") ||
    null;

  const { country, region, city } = getGeoFromHeaders(req);

  // 1) UTMs from the short-link request (highest priority)
  let utmSource = reqUrl.searchParams.get("utm_source");
  let utmMedium = reqUrl.searchParams.get("utm_medium");
  let utmCampaign = reqUrl.searchParams.get("utm_campaign");
  let utmTerm = reqUrl.searchParams.get("utm_term");
  let utmContent = reqUrl.searchParams.get("utm_content");

  // 2) Fallback: UTMs baked into the destination URL (what CreateLinkPage does today)
  const destUrl = safeParseUrl(link.targetUrl);
  if (destUrl) {
    if (!utmSource) utmSource = destUrl.searchParams.get("utm_source");
    if (!utmMedium) utmMedium = destUrl.searchParams.get("utm_medium");
    if (!utmCampaign) utmCampaign = destUrl.searchParams.get("utm_campaign");
    if (!utmTerm) utmTerm = destUrl.searchParams.get("utm_term");
    if (!utmContent) utmContent = destUrl.searchParams.get("utm_content");
  }

  try {
    // write the event first; best-effort link counter second
    await prisma.clickEvent.create({
      data: {
        linkId: link.id,
        ip,
        referer,
        referrerHost,
        userAgent,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
        country,
        region,
        city,
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
  if (!target) return new NextResponse("Invalid target", { status: 500 });

  return NextResponse.redirect(target, 302);
}
