import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { findOwnedCard } from "@/lib/card-service";
import { validateHandle, assertHandleAvailable } from "@/lib/handles";
import { apiError, ApiError } from "@/lib/api-errors";
export async function GET(req: Request) { try { const user = await requireUser(); const card = await findOwnedCard(user.id, new URL(req.url).searchParams.get("cardId")); return NextResponse.json({ slug: card?.slug || "", isPublic: card?.isPublic || false }, { headers: { "Cache-Control": "private, no-store" } }); } catch(e) { return apiError(e); } }
export async function POST(req: Request) { try {
 const user = await requireUser(); const body = z.object({ cardId: z.string().optional(), slug: z.string(), isPublic: z.boolean() }).parse(await req.json());
 const card = await findOwnedCard(user.id, body.cardId); if (!card) throw new ApiError("Create and save your Card before publishing.", 404);
 const slug = card.slug === body.slug.trim().toLowerCase() ? card.slug : validateHandle(body.slug);
 const updated = await prisma.$transaction(async tx => { await assertHandleAvailable(tx, slug, user.id, card.id); return tx.kCard.update({ where: { id: card.id }, data: { slug, isPublic: body.isPublic } }); });
 return NextResponse.json({ ok: true, slug: updated.slug, isPublic: updated.isPublic });
 } catch(e) { return apiError(e); } }
