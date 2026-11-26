// src/app/api/kr-codes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { checkUrlSafety } from "@/lib/url-safety";
import { z } from "zod";
import { KRStyleSchema } from "@/lib/kr-design";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// --- shared schema for edits (all optional) ---
const EditBodySchema = z.object({
  destination: z.string().min(1).max(4096).optional(),
  title: z.string().max(120).nullable().optional(),
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

// --- NEW: GET /api/kr-codes/[id] (fetch single code) ---
export async function GET(_req: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing KR Code id" },
        { status: 400 }
      );
    }

    const krcode = await prisma.kRCode.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!krcode) {
      return NextResponse.json(
        { error: "KR Code not found" },
        { status: 404 }
      );
    }

    const link = krcode.shortCodeId ? await prisma.link.findUnique({ where: { id: krcode.shortCodeId }, select: { targetUrl: true } }) : null;
    return NextResponse.json({ ...krcode, targetUrl: link?.targetUrl ?? krcode.destination }, { status: 200 });
  } catch (err) {
    if (err && typeof err === "object" && "digest" in err && String(err.digest).startsWith("NEXT_REDIRECT")) return NextResponse.json({ error: "Sign in to access your saved code." }, { status: 401 });
    console.error("GET /api/kr-codes/[id] error", err);
    return NextResponse.json(
      { error: "Failed to load KR Code" },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing KR Code id" },
        { status: 400 },
      );
    }

    // Ensure the KR Code belongs to the current user
    const existing = await prisma.kRCode.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "KR Code not found" },
        { status: 404 },
      );
    }

    await prisma.$transaction(async tx => {
      await tx.kRCode.delete({ where: { id } });
      if (existing.shortCodeId && !await tx.kRCode.count({ where: { shortCodeId: existing.shortCodeId } })) await tx.link.update({ where: { id: existing.shortCodeId }, data: { isActive: false } });
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    if (err && typeof err === "object" && "digest" in err && String(err.digest).startsWith("NEXT_REDIRECT")) return NextResponse.json({ error: "Sign in to access your saved code." }, { status: 401 });
    console.error("DELETE /api/kr-codes/[id] error", err);
    return NextResponse.json(
      { error: "Failed to delete KR Code" },
      { status: 500 },
    );
  }
}

// --- PATCH /api/kr-codes/[id] for editing ---
export async function PATCH(req: NextRequest, context: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Missing KR Code id" },
        { status: 400 },
      );
    }

    const existing = await prisma.kRCode.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        workspace: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "KR Code not found" },
        { status: 404 },
      );
    }

    const rawBody = await req.json().catch(() => ({}));
    const body = EditBodySchema.parse(rawBody);

    // --- recompute final URL (for the destination / link target) ---
    let finalUrl: string | null = null;

    if (body.destination) {
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
        finalUrl = u.toString();
      } catch {
        finalUrl = body.destination;
      }
    }

    // --- build KRCode update payload ---
    const updateData: Parameters<
      typeof prisma.kRCode.update
    >[0]["data"] = {};

    if (body.title !== undefined) {
      updateData.title = body.title ?? null;
    }

    if (body.type !== undefined) {
      updateData.type = body.type ?? null;
    }

    if (body.style) {
      // Preserve valid settings that a partial style update does not include.
      updateData.style = { ...(existing.style && typeof existing.style === "object" ? existing.style : {}), ...body.style };
    }

    // If we have a short link, update its targetUrl.
    // If not, update the KRCode.destination directly.
    if (finalUrl) {
      if (existing.shortCodeId) {
        const safety = await checkUrlSafety(finalUrl);
        if (!safety.ok) {
          return new NextResponse(
            safety.reason === "unsafe"
              ? "This destination has been flagged as unsafe."
              : "Enter a valid http(s) URL",
            { status: 400 },
          );
        }

        await prisma.link.update({
          where: { id: existing.shortCodeId },
          data: {
            targetUrl: finalUrl,
          },
        });

        // existing.destination already points at /r/[code],
        // so we don't change krcode.destination here.
      } else {
        updateData.destination = finalUrl;
      }
    }

    const updated = await prisma.kRCode.update({
      where: { id },
      data: updateData,
    });

    const link = updated.shortCodeId ? await prisma.link.findUnique({ where: { id: updated.shortCodeId }, select: { targetUrl: true } }) : null;
    return NextResponse.json({ ...updated, targetUrl: link?.targetUrl ?? updated.destination }, { status: 200, headers: { "Cache-Control": "private, no-store" } });
  } catch (err) {
    if (err && typeof err === "object" && "digest" in err && String(err.digest).startsWith("NEXT_REDIRECT")) return NextResponse.json({ error: "Sign in to access your saved code." }, { status: 401 });
    if (err instanceof z.ZodError) return NextResponse.json({ error: "Check your content and design settings." }, { status: 400 });
    console.error("PATCH /api/kr-codes/[id] error", err);
    return NextResponse.json(
      { error: "Failed to update KR Code" },
      { status: 500 },
    );
  }
}
