// src/app/api/settings/avatar/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs"; // we need filesystem access

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

async function getCurrentUserId() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  return user?.id ?? null;
}

function extFromMime(mime: string) {
  switch (mime) {
    case "image/png":
      return "png";
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return null;
  }
}

export async function POST(req: Request) {
  const userId = await getCurrentUserId();
  if (!userId) return new NextResponse("Unauthorized", { status: 401 });

  const form = await req.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return new NextResponse("Missing file", { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return new NextResponse("Unsupported file type", { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return new NextResponse("File too large", { status: 400 });
  }

  const ext = extFromMime(file.type);
  if (!ext) return new NextResponse("Unsupported file type", { status: 400 });

  const bytes = Buffer.from(await file.arrayBuffer());

  const dir = path.join(process.cwd(), "public", "uploads", "avatars");
  await fs.mkdir(dir, { recursive: true });

  const filename = `${userId}-${Date.now()}.${ext}`;
  const fullPath = path.join(dir, filename);

  await fs.writeFile(fullPath, bytes);

  const publicUrl = `/uploads/avatars/${filename}`;

  await prisma.user.update({
    where: { id: userId },
    data: { image: publicUrl },
    select: { id: true },
  });

  return NextResponse.json({ image: publicUrl });
}
