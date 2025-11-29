import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type RouteParams = {
  params: unknown;
};

type SessionUserWithId = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

async function resolveId(rawParams: unknown): Promise<string | null> {
  try {
    if (!rawParams) return null;

    // If Next hands us a Promise-like params (some 16.x behaviours)
    if (
      typeof rawParams === "object" &&
      rawParams !== null &&
      "then" in rawParams &&
      typeof (rawParams as { then?: unknown }).then === "function"
    ) {
      const resolved = (await (rawParams as Promise<{ id?: unknown }>)) ?? {};
      const id = resolved.id;
      return typeof id === "string" ? id : null;
    }

    if (
      typeof rawParams === "object" &&
      rawParams !== null &&
      "id" in rawParams
    ) {
      const id = (rawParams as { id?: unknown }).id;
      return typeof id === "string" ? id : null;
    }

    return null;
  } catch {
    return null;
  }
}

// GET /api/qr-menus/[id]
export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    const user = session?.user as SessionUserWithId | undefined;
    const userId = user?.id ?? undefined;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = await resolveId(params);
    if (!id) {
      return NextResponse.json(
        { error: "Invalid menu id in route params" },
        { status: 400 }
      );
    }

    const menu = await prisma.menu.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!menu) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: menu.id,
      title: menu.title,
      slug: menu.slug,
      description: menu.description,
      logoUrl: menu.logoUrl,
      accentHex: menu.accentHex,
      backgroundHex: menu.backgroundHex,
      sections: menu.sections,
    });
  } catch (err: unknown) {
    console.error("QR-MENU GET ERROR", err);
    const message =
      err instanceof Error ? err.message : "Internal server error (GET)";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT /api/qr-menus/[id]
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await auth();
    const user = session?.user as SessionUserWithId | undefined;
    const userId = user?.id ?? undefined;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = await resolveId(params);
    if (!id) {
      return NextResponse.json(
        { error: "Invalid menu id in route params" },
        { status: 400 }
      );
    }

    let body: unknown = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const {
      title,
      slug,
      description,
      logoUrl,
      accentHex,
      backgroundHex,
      sections,
    } = (body ?? {}) as {
      title?: string | null;
      slug?: string | null;
      description?: string | null;
      logoUrl?: string | null;
      accentHex?: string | null;
      backgroundHex?: string | null;
      sections?: Prisma.InputJsonValue | null;
    };

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.menu.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Prisma knows the exact type for this field; reuse it instead of hand-rolling unions
    type SectionsField = Prisma.MenuUpdateInput["sections"];

    const existingSectionsRaw = existing.sections;
    let existingSections: SectionsField;

    if (existingSectionsRaw === null) {
      // Use the JsonNull sentinel for "real" JSON null
      existingSections = Prisma.JsonNull as SectionsField;
    } else {
      // Existing non-null JSON value
      existingSections = existingSectionsRaw as unknown as SectionsField;
    }

    const nextSections: SectionsField =
      sections !== undefined
        ? sections === null
          ? (Prisma.JsonNull as SectionsField)
          : (sections as SectionsField)
        : existingSections;

    try {
      const updated = await prisma.menu.update({
        where: { id },
        data: {
          title,
          slug,
          description: description ?? null,
          logoUrl: logoUrl ?? null,
          accentHex: accentHex ?? null,
          backgroundHex: backgroundHex ?? null,
          sections: nextSections,
        },
      });

      return NextResponse.json({
        id: updated.id,
        title: updated.title,
        slug: updated.slug,
        description: updated.description,
        logoUrl: updated.logoUrl,
        accentHex: updated.accentHex,
        backgroundHex: updated.backgroundHex,
        sections: updated.sections,
      });
    } catch (err: unknown) {
      if (
        err instanceof Prisma.PrismaClientKnownRequestError &&
        err.code === "P2002"
      ) {
        return NextResponse.json(
          { error: "Slug already in use. Choose a different one." },
          { status: 400 }
        );
      }
      throw err;
    }
  } catch (err: unknown) {
    console.error("QR-MENU UPDATE ERROR", err);
    const message =
      err instanceof Error ? err.message : "Internal server error (PUT)";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
