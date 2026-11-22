import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import sharp from "sharp";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(); const { id } = await ctx.params;
    const code = await prisma.kRCode.findFirst({ where: { id, userId: user.id } });
    if (!code) return new NextResponse("Not found", { status: 404 });
    const file = (await req.formData()).get("file");
    if (!(file instanceof File) || !["image/png","image/jpeg","image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) return new NextResponse("Use a PNG, JPG or WebP smaller than 5 MB", { status: 400 });
    const bytes = await sharp(Buffer.from(await file.arrayBuffer()), { limitInputPixels: 20_000_000 }).resize(384,384,{fit:"inside",withoutEnlargement:true}).png().toBuffer();
    const logoUrl = `data:image/png;base64,${bytes.toString("base64")}`;
    if (logoUrl.length > 700000) return new NextResponse("Try a smaller logo", { status: 400 });
    const current = code.style && typeof code.style === "object" ? code.style : {};
    await prisma.kRCode.update({ where: { id }, data: { style: { ...current, logoUrl, logoEnabled: true, ecLevel: "H" } } });
    return NextResponse.json({ logoUrl });
  } catch { return new NextResponse("Could not upload this logo", { status: 400 }); }
}
