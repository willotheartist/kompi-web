import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

async function getUserLink(userId: string, id: string) {
  return prisma.link.findFirst({
    where: { id, workspace: { ownerId: userId } },
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireUser();
    const link = await getUserLink(user.id, params.id);
    if (!link) return new NextResponse("Not found", { status: 404 });

    const body = (await req.json().catch(() => ({}))) as {
      isActive?: boolean;
      targetUrl?: string;
      code?: string;
    };

    const data: {
      isActive?: boolean;
      targetUrl?: string;
      code?: string;
    } = {};

    if (typeof body.isActive === "boolean") data.isActive = body.isActive;
    if (typeof body.targetUrl === "string") data.targetUrl = body.targetUrl;

    if (body.code && body.code !== link.code) {
      const code = body.code.trim();
      if (!code) {
        return new NextResponse("Invalid code", { status: 400 });
      }
      const conflict = await prisma.link.findFirst({
        where: {
          code,
          workspaceId: link.workspaceId,
          NOT: { id: link.id },
        },
      });
      if (conflict) {
        return new NextResponse("Code already in use", { status: 409 });
      }
      data.code = code;
    }

    const updated = await prisma.link.update({
      where: { id: link.id },
      data,
    });

    return NextResponse.json(updated);
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireUser();
    const link = await getUserLink(user.id, params.id);
    if (!link) return new NextResponse("Not found", { status: 404 });

    await prisma.link.delete({ where: { id: link.id } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
