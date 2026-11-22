//src/app/api/kr-codes/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { KRStyleSchema, DEFAULT_KR_STYLE } from "@/lib/kr-design";
import { prisma } from "@/lib/prisma";
import { checkUrlSafety } from "@/lib/url-safety";
import { checkLinkCreationAllowed } from "@/lib/abuse";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";
const privateHeaders = { "Cache-Control": "private, no-store" };

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const FREE_QR_LIMIT = 5;




const CREATOR_QR_LIMIT = 1000000; // effectively unlimited for Creator

const BodySchema = z.object({
  destination: z.string().min(1).max(4096),
  title: z.string().max(120).optional(),
  createShortLink: z.boolean().optional().default(true),
  clientRequestId: z.string().uuid().optional(),
  // content type of the QR (website, file, app, social, other, etc.)
  type: z.string().optional(),
  utm: z
    .object({
      source: z.string().optional(),
      medium: z.string().optional(),
      campaign: z.string().optional(),
      term: z.string().optional(),
      content: z.string().optional(),
    })
    .optional(),
  style: KRStyleSchema.optional(),
});

const DEFAULT_STYLE = DEFAULT_KR_STYLE;

function generateCode(len = 6) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

type KRCodeRecord = Awaited<
  ReturnType<typeof prisma.kRCode.findMany>
>[number];

export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");

    const workspace = await getActiveWorkspace(user.id, workspaceId);
    if (!workspace) {
      return NextResponse.json({ workspace: null, codes: [] });
    }

    const codes = await prisma.kRCode.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: "desc" },
    });

    const linkIds = codes
      .map((c) => c.shortCodeId)
      .filter((id): id is string => Boolean(id));

    const links = linkIds.length ? await prisma.link.findMany({ where: { id: { in: linkIds } }, select: { id: true, targetUrl: true } }) : [];
    const targetByLink = new Map(links.map(link => [link.id, link.targetUrl]));

    const events =
      linkIds.length === 0
        ? []
        : await prisma.clickEvent.groupBy({
            by: ["linkId"],
            where: { linkId: { in: linkIds } },
            _count: { _all: true },
          });

    const scansByLinkId = new Map<string, number>(
      events.map((e) => [e.linkId, e._count._all]),
    );

    const enriched: Array<KRCodeRecord & { totalClicks: number }> =
      codes.map((c) => ({
        ...c,
        targetUrl: c.shortCodeId ? targetByLink.get(c.shortCodeId) ?? c.destination : c.destination,
        totalClicks: c.shortCodeId
          ? scansByLinkId.get(c.shortCodeId) ?? 0
          : 0,
      }));

    return NextResponse.json({ workspace, codes: enriched }, { headers: privateHeaders });
  } catch (err) {
    if (err && typeof err === "object" && "digest" in err && String(err.digest).startsWith("NEXT_REDIRECT")) return new NextResponse("Unauthorized", { status: 401 });
    console.error("GET /api/kr-codes error", err);
    return NextResponse.json({ error: "Your codes could not be loaded. Please try again." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();

    const rawBody = await req.json().catch(() => ({}));
    const body = BodySchema.parse(rawBody);

    // Try to treat destination as URL for UTMs; fall back if it's not valid
    const finalUrl = (() => {
      try {
        const u = new URL(body.destination);
        if (body.utm?.source)
          u.searchParams.set("utm_source", body.utm.source);
        if (body.utm?.medium)
          u.searchParams.set("utm_medium", body.utm.medium);
        if (body.utm?.campaign)
          u.searchParams.set("utm_campaign", body.utm.campaign);
        if (body.utm?.term)
          u.searchParams.set("utm_term", body.utm.term);
        if (body.utm?.content)
          u.searchParams.set("utm_content", body.utm.content);
        return u.toString();
      } catch {
        return body.destination;
      }
    })();

    const { searchParams } = new URL(req.url);
    const workspaceIdFromQuery = searchParams.get("workspaceId");

    const workspace =
      (await getActiveWorkspace(user.id, workspaceIdFromQuery)) ??
      (await prisma.workspace.create({
        data: {
          name: "My workspace",
          slug: `ws-${user.id.slice(0, 6)}`,
          ownerId: user.id,
        },
      }));

    // A stable draft ID makes network retries and double submissions idempotent.
    const recordId = body.clientRequestId ? `kr_${body.clientRequestId.replace(/-/g, "")}` : undefined;
    const findRetry = async () => {
      if (!recordId) return null;
      const previous = await prisma.kRCode.findFirst({ where: { id: recordId, userId: user.id, workspaceId: workspace.id } });
      if (!previous) return null;
      const link = previous.shortCodeId ? await prisma.link.findUnique({ where: { id: previous.shortCodeId }, select: { targetUrl: true } }) : null;
      return { ...previous, targetUrl: link?.targetUrl ?? previous.destination };
    };
    const previous = await findRetry();
    if (previous) return NextResponse.json(previous, { headers: privateHeaders });

    // --- plan-based KR / QR limits ---
    const qrLimit =
      workspace.plan === "CREATOR" ? CREATOR_QR_LIMIT : FREE_QR_LIMIT;

    const qrCount = await prisma.kRCode.count({
      where: { workspaceId: workspace.id },
    });

    if (qrCount >= qrLimit) {
      return new NextResponse(
        "You’ve reached your limit on the Free plan. You can create up to 5 Kompi Codes™ per workspace on the Free plan. Upgrade to the Creator plan (£9.99/mo) to create more codes and unlock full access to Kompi tools.",
        { status: 402 },
      );
    }
    // ----------------------------------
// ----------------------------------

    if (body.createShortLink) {
      const blocked = await checkLinkCreationAllowed(user);
      if (blocked) return new NextResponse(blocked, { status: 429 });

      const safety = await checkUrlSafety(finalUrl);
      if (!safety.ok) {
        return new NextResponse(
          safety.reason === "unsafe"
            ? "This destination has been flagged as unsafe."
            : "Enter a valid http(s) URL",
          { status: 400 },
        );
      }

    }

    let krc;
    try {
      krc = await prisma.$transaction(async tx => {
        let shortLinkId: string | null = null;
        let qrDestination = finalUrl;
        if (body.createShortLink) {
          let code: string;
          while (true) {
            const candidate = generateCode();
            if (!await tx.link.findFirst({ where: { code: candidate } })) {
              code = candidate;
              break;
            }
          }
          const link = await tx.link.create({ data: {
            workspaceId: workspace.id, code, targetUrl: finalUrl, isActive: true,
          } });
          shortLinkId = link.id;
          qrDestination = `${APP_URL}/r/${link.code}`;
        }
        return tx.kRCode.create({ data: {
          ...(recordId ? { id: recordId } : {}),
          workspaceId: workspace.id, userId: user.id,
          title: body.title ?? null, destination: qrDestination,
          shortCodeId: shortLinkId, type: body.type ?? null,
          style: { ...DEFAULT_STYLE, ...(body.style ?? {}) },
        } });
      });
    } catch (error) {
      // The losing concurrent request rolls its link back with the transaction.
      if (recordId && error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        const retry = await findRetry();
        if (retry) return NextResponse.json(retry, { headers: privateHeaders });
      }
      throw error;
    }
    return NextResponse.json({ ...krc, targetUrl: finalUrl }, { status: 201, headers: privateHeaders });
  } catch (err) {
    if (err instanceof z.ZodError) return NextResponse.json({ error: "Check your content and design settings." }, { status: 400 });
    if (err && typeof err === "object" && "digest" in err && String(err.digest).startsWith("NEXT_REDIRECT")) return new NextResponse("Sign in to save your code.", { status: 401 });
    console.error("POST /api/kr-codes error", err);
    return new NextResponse("Bad Request", { status: 400 });
  }
}
