// src/app/dashboard/qr-menus/[id]/create-krcode/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

type SessionUserWithId = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type RouteContext = {
  params:
    | { id?: string }
    | Promise<{ id?: string }>
    | undefined;
};

async function resolveId(raw: RouteContext["params"]): Promise<string | null> {
  if (!raw) return null;

  // Handle Next 16 weirdness where params can be a Promise
  if (raw instanceof Promise) {
    const resolved = (await raw) ?? {};
    const id = (resolved as { id?: unknown }).id;
    return typeof id === "string" ? id : null;
  }

  if (typeof raw === "object" && raw !== null && "id" in raw) {
    const id = (raw as { id?: unknown }).id;
    return typeof id === "string" ? id : null;
  }

  return null;
}

export async function GET(
  req: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const session = await auth();
    const user = session?.user as SessionUserWithId | undefined;
    const userId = user?.id ?? undefined;

    if (!userId) {
      const signin = new URL("/signin", req.url);
      return NextResponse.redirect(signin);
    }

    const id = await resolveId(context.params);
    if (!id) {
      const fallback = new URL("/dashboard/qr-menus", req.url);
      return NextResponse.redirect(fallback);
    }

    const menu = await prisma.menu.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!menu || !menu.slug) {
      const fallback = new URL("/dashboard/qr-menus", req.url);
      return NextResponse.redirect(fallback);
    }

    const url = new URL(req.url);
    const origin = `${url.protocol}//${url.host}`;
    const destination = `${origin}/m/${menu.slug}`;

    const workspace = await prisma.workspace.findFirst({
      where: { ownerId: userId },
      orderBy: { createdAt: "asc" },
    });

    if (!workspace) {
      const fallback = new URL("/dashboard/qr-menus", req.url);
      return NextResponse.redirect(fallback);
    }

    let krCode = await prisma.kRCode.findFirst({
      where: {
        userId,
        workspaceId: workspace.id,
        destination,
      },
    });

    if (!krCode) {
      krCode = await prisma.kRCode.create({
        data: {
          userId,
          workspaceId: workspace.id,
          title: menu.title || "QR Menu",
          destination,
          type: "menu",
        },
      });
    }

    // ✅ Take the user straight to the created code
    const target = new URL(`/kr-codes/${krCode.id}`, req.url);
    return NextResponse.redirect(target);
  } catch (err) {
    console.error("DASHBOARD_QR_MENUS_CREATE_KRCODE_ERROR", err);
    const fallback = new URL("/dashboard/qr-menus", req.url);
    return NextResponse.redirect(fallback);
  }
}
