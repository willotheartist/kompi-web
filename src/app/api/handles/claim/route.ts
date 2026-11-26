import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCard, findOwnedCard } from "@/lib/card-service";
import { validateHandle, assertHandleAvailable } from "@/lib/handles";
import { apiError } from "@/lib/api-errors";
export async function POST(req: Request) { try { const user = await requireUser(); const body = await req.json(); const handle = validateHandle(typeof body.handle === "string" ? body.handle : ""); const card = await findOwnedCard(user.id) || await createCard(user.id, null, { title: user.name || handle, links: [], socials: [], contact: { enabled: true, buttonLabel: "Get in touch" } });
 await prisma.$transaction(async tx => { await assertHandleAvailable(tx, handle, user.id, card.id); await tx.kCard.update({ where: { id: card.id }, data: { slug: handle } }); }); return NextResponse.json({ ok: true, handle, cardId: card.id }); } catch(e) { return apiError(e); } }
