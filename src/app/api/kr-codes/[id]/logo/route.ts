import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { prepareKRLogo } from "@/lib/kr-logo-image";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireUser(); const { id } = await ctx.params;
    const code = await prisma.kRCode.findFirst({ where: { id, userId: user.id } });
    if (!code) return new NextResponse("Not found", { status: 404 });
    const file = (await req.formData()).get("file");
    if (!(file instanceof File) || !["image/png","image/jpeg","image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) return new NextResponse("Use a PNG, JPG or WebP smaller than 5 MB", { status: 400 });
    const { dataUrl: logoUrl } = await prepareKRLogo(Buffer.from(await file.arrayBuffer()));
    const current = code.style && typeof code.style === "object" ? code.style : {};
    await prisma.kRCode.update({ where: { id }, data: { style: { ...current, logoUrl, logoEnabled: true, ecLevel: "H" } } });
    return NextResponse.json({ logoUrl });
  } catch { return new NextResponse("Could not upload this logo", { status: 400 }); }
}
