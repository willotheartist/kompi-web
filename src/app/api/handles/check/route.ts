import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateHandle, assertHandleAvailable } from "@/lib/handles";
import { apiError, ApiError } from "@/lib/api-errors";
import { requestIp, rateLimit } from "@/lib/rate-limit";
export async function GET(req: Request) { try { await rateLimit("handle-check", requestIp(req), 120, 900); const handle = validateHandle(new URL(req.url).searchParams.get("handle") || ""); try { await prisma.$transaction(tx => assertHandleAvailable(tx, handle)); } catch(e) { if (e instanceof ApiError && e.status === 409) return NextResponse.json({ ok: true, handle, available: false }); throw e; } return NextResponse.json({ ok: true, handle, available: true }); } catch(e) { return apiError(e); } }
