// src/app/api/builder/sections/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { requireDbUser } from "@/lib/builder/authz";
import { validateSectionContent } from "@/lib/builder/validateSection";
import { NextResponse } from "next/server";

function jsonError(status: number, payload: unknown) {
  return new NextResponse(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const auth = await requireDbUser();
  if (!auth.ok) return new NextResponse("Unauthorized", { status: 401 });

  const body = await req.json().catch(() => ({} as any));

  const section = await prisma.builderSection.findFirst({
    where: { id, page: { site: { workspace: { ownerId: auth.user.id } } } },
    select: {
      id: true,
      type: true,
      variant: true,
      isHidden: true,
      content: true,
    },
  });

  if (!section) return new NextResponse("Not found", { status: 404 });

  const dataToUpdate: any = {};

  if (typeof body.isHidden === "boolean") {
    dataToUpdate.isHidden = body.isHidden;
  }

  if (body.content !== undefined) {
    // Validate + normalize with defaults so saving "{}" doesn't break required fields
    const validation = validateSectionContent(
      section.type as any,
      section.variant as any,
      body.content
    );

    if (!validation.ok) {
      return jsonError(400, {
        error: "Section content invalid",
        details: {
          sectionId: section.id,
          type: section.type,
          variant: section.variant,
          message: validation.error,
        },
      });
    }

    dataToUpdate.content = validation.normalized;
  }

  // Nothing to update
  if (Object.keys(dataToUpdate).length === 0) {
    return NextResponse.json({ ok: true, noop: true });
  }

  await prisma.builderSection.update({
    where: { id },
    data: dataToUpdate,
  });

  return NextResponse.json({ ok: true });
}
