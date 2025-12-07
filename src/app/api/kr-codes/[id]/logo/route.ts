//src/app/api/kr-codes/[id]/logo/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function resolveParams(params: RouteContext["params"]) {
  return params instanceof Promise ? await params : params;
}

export async function POST(req: Request, ctx: RouteContext) {
  try {
    const user = await requireUser();
    const { id } = await resolveParams(ctx.params);

    if (!id) {
      return new NextResponse("Missing id", { status: 400 });
    }

    const krc = await prisma.kRCode.findFirst({
      where: { id, userId: user.id },
    });

    if (!krc) {
      return new NextResponse("Not found", { status: 404 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return new NextResponse("Missing file", { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return new NextResponse("File must be an image", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads", "krcodes");
    await fs.mkdir(uploadDir, { recursive: true });

    const ext =
      file.type === "image/png"
        ? "png"
        : file.type === "image/jpeg"
        ? "jpg"
        : "png";
    const fileName = `${id}.${ext}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    const logoUrl = `/uploads/krcodes/${fileName}`;

    const existingStyle = (krc.style as unknown) || {};
    const updatedStyle =
      existingStyle && typeof existingStyle === "object"
        ? { ...(existingStyle as Record<string, unknown>), logoUrl, ecLevel: "H" }
        : { logoUrl, ecLevel: "H" as const };

    await prisma.kRCode.update({
      where: { id },
      data: { style: updatedStyle },
    });

    return NextResponse.json({ logoUrl }, { status: 200 });
  } catch (err) {
    console.error("POST /api/kr-codes/[id]/logo error", err);
    return new NextResponse("Upload failed", { status: 500 });
  }
}
