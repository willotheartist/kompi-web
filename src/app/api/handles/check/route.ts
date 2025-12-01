// src/app/api/handles/check/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeHandle(raw: string) {
  return raw
    .trim()
    .replace(/^@/, "") // strip leading @
    .toLowerCase();
}

function isValidHandle(handle: string) {
  // a–z, 0–9, dash, underscore, dot, 3–24 chars
  return /^[a-z0-9._-]{3,24}$/.test(handle);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("handle") ?? "";

  const handle = normalizeHandle(raw);

  if (!handle || !isValidHandle(handle)) {
    return NextResponse.json(
      { ok: false, reason: "invalid", message: "Handles must be 3–24 characters (letters, numbers, -, _ or .)." },
      { status: 400 }
    );
  }

  // 🔁 Adjust this to match your actual model if needed
  // Here I'm assuming BioPage has unique `slug`
  const existing = await prisma.bioPage.findUnique({
    where: { slug: handle },
    select: { id: true },
  });

  const available = !existing;

  return NextResponse.json({
    ok: true,
    handle,
    available,
  });
}
