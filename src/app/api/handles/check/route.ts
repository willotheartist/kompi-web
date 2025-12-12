// src/app/api/handles/check/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeHandle(raw: string) {
  return raw.trim().replace(/^@/, "").toLowerCase();
}

function isValidHandle(handle: string) {
  return /^[a-z0-9._-]{3,24}$/.test(handle);
}

// Anything that exists as a top-level route should never be claimable as a handle.
const RESERVED = new Set([
  "api",
  "signin",
  "signup",
  "claim",
  "dashboard",
  "settings",
  "pricing",
  "links",
  "k",
  "k-cards",
  "qr-code",
  "qr-code-generator",
  "qr-menus",
  "kr-codes",
  "customers",
  "tools",
  "m",
  "p",
  "menu",
  "analytics",
  "reset-password",
  "forgot-password",
]);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("handle") ?? "";
  const handle = normalizeHandle(raw);

  if (!handle || !isValidHandle(handle)) {
    return NextResponse.json(
      {
        ok: false,
        reason: "invalid",
        message:
          "Handles must be 3–24 characters (letters, numbers, -, _ or .).",
      },
      { status: 400 }
    );
  }

  if (RESERVED.has(handle)) {
    return NextResponse.json({
      ok: true,
      handle,
      available: false,
      reason: "reserved",
    });
  }

  // We check all places a "handle" might already exist.
  // - Workspace.slug (you said this is the public handle you want)
  // - KCard.slug (current /k/[slug] public page)
  // - BioPage.slug (existing)
  // - Menu.slug (also top-level-ish in your app)
  const [workspace, kcard, bio, menu] = await Promise.all([
    prisma.workspace.findUnique({
      where: { slug: handle },
      select: { id: true },
    }),
    prisma.kCard.findFirst({
      where: { slug: handle, isPublic: true },
      select: { id: true },
    }),
    prisma.bioPage.findUnique({
      where: { slug: handle },
      select: { id: true },
    }),
    prisma.menu.findUnique({
      where: { slug: handle },
      select: { id: true },
    }),
  ]);

  const available = !(workspace || kcard || bio || menu);

  return NextResponse.json({
    ok: true,
    handle,
    available,
    takenBy: available
      ? null
      : workspace
        ? "workspace"
        : kcard
          ? "kcard"
          : bio
            ? "biopage"
            : "menu",
  });
}
