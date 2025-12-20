import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;

  const link = await prisma.link.findUnique({
    where: { id },
  });

  if (!link || !link.isActive) {
    return new NextResponse("Not found", { status: 404 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const fullUrl = `${baseUrl}/r/${link.code}`;

  try {
    const buffer = await QRCode.toBuffer(fullUrl, {
      type: "png",
      width: 512,
      margin: 1,
      color: {
        dark: "#111111",
        light: "#FFFFFF",
      },
    });

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="${link.code}.png"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Failed to generate QR", { status: 500 });
  }
}
