// @ts-nocheck
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

function sanitizeSlug(input: string): string {
  const cleaned = input
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return cleaned || "links";
}

export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const workspaceId = searchParams.get("workspaceId");
    const workspace = await getActiveWorkspace(user.id, workspaceId);
    if (!workspace) return NextResponse.json(null);

    const bio = await prisma.bioPage.findFirst({
      where: { workspaceId: workspace.id },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(bio);
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => ({}))) as {
      title?: string;
      description?: string;
      slug?: string;
      workspaceId?: string;
    };

    const workspace = await getActiveWorkspace(
      user.id,
      body.workspaceId ?? null
    );
    if (!workspace) {
      return new NextResponse("Workspace not found", { status: 404 });
    }

    const safeTitle =
      typeof body.title === "string" ? body.title.slice(0, 120) : "";
    const safeDescription =
      typeof body.description === "string"
        ? body.description.slice(0, 280)
        : "";

    const baseSlug =
      (typeof body.slug === "string" && body.slug.trim()) ||
      workspace.slug ||
      `bio-${workspace.id.slice(0, 6)}`;
    const safeSlug = sanitizeSlug(baseSlug);

    // slug unique globally
    const conflict = await prisma.bioPage.findFirst({
      where: {
        slug: safeSlug,
        workspaceId: { not: workspace.id },
      },
    });
    if (conflict) {
      return new NextResponse("Slug already in use", { status: 409 });
    }

    const existing = await prisma.bioPage.findFirst({
      where: { workspaceId: workspace.id },
    });

    const bio = existing
      ? await prisma.bioPage.update({
          where: { id: existing.id },
          data: {
            slug: safeSlug,
            title: safeTitle,
            description: safeDescription || null,
          },
        })
      : await prisma.bioPage.create({
          data: {
            workspaceId: workspace.id,
            slug: safeSlug,
            title: safeTitle,
            description: safeDescription || null,
          },
        });

    return NextResponse.json(bio);
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
