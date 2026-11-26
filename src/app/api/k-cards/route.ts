import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCard, findOwnedCard } from "@/lib/card-service";
import { cardContentSchema } from "@/lib/card-content";
import { apiError, ApiError } from "@/lib/api-errors";
const headers = { "Cache-Control": "private, no-store" };
export async function GET(req: Request) { try { const user = await requireUser(); const cardId = new URL(req.url).searchParams.get("cardId"); return NextResponse.json({ kcard: await findOwnedCard(user.id, cardId) }, { headers }); } catch(e) { return apiError(e); } }
export async function POST(req: Request) { try { const user = await requireUser(); const body = await req.json().catch(() => ({})); const card = await createCard(user.id, typeof body.workspaceId === "string" ? body.workspaceId : null, { title: "My Kompi Card", links: [], socials: [], contact: { enabled: true, buttonLabel: "Get in touch" } }); return NextResponse.json({ kcard: card }, { status: 201, headers }); } catch(e) { return apiError(e); } }
export async function PUT(req: Request) {
 try { const user = await requireUser(); const raw = await req.json(); if (JSON.stringify(raw).length > 3000000) throw new ApiError("That image is too large. Choose a smaller image.", 413);
 const payload = cardContentSchema.parse(raw) as Prisma.InputJsonObject;
 const cardId = new URL(req.url).searchParams.get("cardId"); const existing = await findOwnedCard(user.id, cardId);
 const kcard = existing ? await prisma.kCard.update({ where: { id: existing.id }, data: { data: payload } }) : await createCard(user.id, null, payload);
 return NextResponse.json({ ok: true, kcard }, { headers }); } catch(e) { return apiError(e); }
}
