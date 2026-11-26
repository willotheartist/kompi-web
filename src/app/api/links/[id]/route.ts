import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { ApiError, apiError } from "@/lib/api-errors";
import { normalizeLinkCode } from "@/lib/link-code";
import { checkUrlSafety } from "@/lib/url-safety";

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
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

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
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    const link = await getUserLink(user.id, id);
    if (!link) {
      return new NextResponse("Not found", { status: 404 });
    }

    const body = await req.json();

    // Build update payload defensively to keep TS + Prisma happy
    const data: {
      code?: string;
      targetUrl?: string;
      url?: string;
      title?: string;
      tags?: string[];
      isActive?: boolean;
    } = {};

    if (typeof body.code === "string") {
      if (await prisma.kRCode.count({ where: { shortCodeId: link.id } })) throw new ApiError("This address belongs to a QR code and cannot be renamed.", 409);
      data.code = normalizeLinkCode(body.code);
    }

    if (typeof body.targetUrl === "string") {
      const trimmed = body.targetUrl.trim();
      const targetUrl = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      const safety = await checkUrlSafety(targetUrl);
      if (!safety.ok) {
        return new NextResponse(
          safety.reason === "unsafe"
            ? "This destination has been flagged as unsafe."
            : "Enter a valid http(s) URL",
          { status: 400 }
        );
      }
      data.targetUrl = targetUrl;
    }



    if (typeof body.title === "string") {
      data.title = body.title;
    }

    if (Array.isArray(body.tags)) {
      if (!body.tags.every((tag: unknown) => typeof tag === "string" && tag.length <= 50) || body.tags.length > 20) throw new ApiError("Use up to 20 tags of 50 characters each.");
      data.tags = body.tags;
    }

    if (typeof body.isActive === "boolean") {
      data.isActive = body.isActive;
    }

    const updated = await prisma.link.update({
      where: { id: link.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return apiError(error);
  }
}

// Delete a link
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireUser();
    const { id } = await context.params;

    const link = await getUserLink(user.id, id);
    if (!link) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (await prisma.kRCode.count({ where: { shortCodeId: link.id } })) throw new ApiError("This link powers a QR code. Manage it from Your QR codes to protect printed copies.", 409);
    await prisma.link.delete({
      where: { id: link.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return apiError(error);
  }
}
