// src/app/api/qr-menus/[id]/create-krcode/route.ts
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
  params: Promise<{ id: string }>;
};

export async function POST(
  req: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const session = await auth();
    const user = session?.user as SessionUserWithId | undefined;
    const userId = user?.id ?? undefined;

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Menu id is required" }, { status: 400 });
    }

    const menu = await prisma.menu.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!menu || !menu.slug) {
      return NextResponse.json(
        { error: "Menu not found or not public" },
        { status: 404 }
      );
    }

    // Robust origin:
    const headerOrigin = req.headers.get("origin");
    const url = new URL(req.url);
    const urlOrigin = `${url.protocol}//${url.host}`;
    const envOrUrlOrigin = process.env.NEXT_PUBLIC_APP_URL ?? urlOrigin;
    const origin = headerOrigin ?? envOrUrlOrigin ?? "https://kompi.app";

    const destination = `${origin}/m/${menu.slug}`;

    const workspace = await prisma.workspace.findFirst({
      where: { ownerId: userId },
      orderBy: { createdAt: "asc" },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: "No workspace found for user" },
        { status: 400 }
      );
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

    return NextResponse.json({ success: true, krCode }, { status: 200 });
  } catch (err) {
    console.error("API_QR_MENUS_CREATE_KRCODE_ERROR", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
