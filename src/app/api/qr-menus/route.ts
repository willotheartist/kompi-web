import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type SessionUserWithId = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export async function GET() {
  try {
    const session = await auth();
    const user = session?.user as SessionUserWithId | undefined;
    const userId = user?.id ?? undefined;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const menus = await prisma.menu.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(menus);
  } catch (error: unknown) {
    console.error("[QR-MENUS_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const user = session?.user as SessionUserWithId | undefined;
    const userId = user?.id ?? undefined;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const title = (body?.title ?? "").trim();
    const slug = (body?.slug ?? "").trim().toLowerCase();
    const description =
      (body?.description as string | undefined)?.trim() || null;
    const accentHex =
      (body?.accentHex as string | undefined)?.trim() || null;

    // Use Prisma's own type for the sections field
    type SectionsField = Prisma.MenuCreateInput["sections"];

    const sectionsRaw = body?.sections as unknown;

    const normalizedSections: unknown =
      Array.isArray(sectionsRaw) ||
      (typeof sectionsRaw === "object" && sectionsRaw !== null)
        ? sectionsRaw
        : [];

    const sections: SectionsField = normalizedSections as SectionsField;

    if (!title || !slug) {
      return new NextResponse("Title and slug are required", { status: 400 });
    }

    const created = await prisma.menu.create({
      data: {
        userId,
        title,
        slug,
        description,
        accentHex,
        sections,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: unknown) {
    console.error("[QR-MENUS_POST]", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return new NextResponse("Slug already in use", { status: 409 });
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
