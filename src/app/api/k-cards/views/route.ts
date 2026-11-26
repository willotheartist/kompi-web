import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requestIp, rateLimit } from "@/lib/rate-limit";
import { apiError } from "@/lib/api-errors";
export async function POST(req: Request) { try { const { slug } = await req.json(); if (typeof slug !== "string" || slug.length > 100) return new NextResponse(null, { status: 400 }); if (/bot|crawl|spider|preview/i.test(req.headers.get("user-agent") || "")) return NextResponse.json({ ok: true }); await rateLimit(`card-view:${slug}`, requestIp(req), 30, 86400); const card = await prisma.kCard.findFirst({ where: { slug, isPublic: true, user: { bannedAt: null } }, select: { id: true, workspaceId: true } }); if (card?.workspaceId) await prisma.engagementEvent.create({ data: { workspaceId: card.workspaceId, type: "card_view", value: card.id } }); return NextResponse.json({ ok: true }); } catch(e) { return apiError(e); } }
