// src/app/api/builder/health/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const count = await prisma.builderSite.count();
  return NextResponse.json({ ok: true, builderSites: count });
}
