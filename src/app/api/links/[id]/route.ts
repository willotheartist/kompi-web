import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

type RouteContext = {
  params: { id: string };
};

async function getUserLink(userId: string, id: string) {
  return prisma.link.findFirst({
    where: {
      id,
      workspace: {
        ownerId: userId,
      },
    },
  });
}

// Get a single link (for analytics / editing)
export async function GET(_req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = params;

    const link = await getUserLink(user.id, id);
    if (!link) {
      return new NextResponse("Not found", { status: 404 });
    }

    return NextResponse.json(link);
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

// Update a link
export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = params;

    const link = await getUserLink(user.id, id);
    if (!link) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = await req.json();

    // Build update payload defensively
    const data: Record<string, unknown> = {};

    if (typeof body.code === "string") {
      data.code = body.code;
    }

    if (typeof body.targetUrl === "string") {
      data.targetUrl = body.targetUrl;
    }

    if (typeof body.url === "string") {
      // In case your schema uses `url` instead of `targetUrl`
      data.url = body.url;
    }

    if (typeof body.title === "string") {
      data.title = body.title;
    }

    if (Array.isArray(body.tags)) {
      data.tags = body.tags;
    }

    if (typeof body.isActive === "boolean") {
      data.isActive = body.isActive;
    }

    const updated = await prisma.link.update({
      where: { id: link.id },
      // Let Prisma validate fields – we avoid `any` via a generic record cast
      data: data as never,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/links/[id] error", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

// Delete a link
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = params;

    const link = await getUserLink(user.id, id);
    if (!link) {
      return new NextResponse("Not found", { status: 404 });
    }

    await prisma.link.delete({
      where: { id: link.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/links/[id] error", error);
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
