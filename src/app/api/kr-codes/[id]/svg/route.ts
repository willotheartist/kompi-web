import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: { id: string };
};

type QRStyle = {
  fg?: string;
  bg?: string;
  size?: number;
  margin?: number;
  ecLevel?: "L" | "M" | "Q" | "H";
};

export async function GET(
  _req: NextRequest,
  { params }: RouteContext,
) {
  const { id } = params;

  const code = await prisma.kRCode.findUnique({ where: { id } });
  if (!code) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const style = (code.style ?? {}) as QRStyle;

  const svg = await QRCode.toString(code.destination, {
    type: "svg",
    color: {
      dark: style.fg ?? "#000000",
      light:
        (style.bg ?? "#ffffff") === "transparent"
          ? "#0000"
          : style.bg ?? "#ffffff",
    },
    errorCorrectionLevel: style.ecLevel ?? "M",
    margin: style.margin ?? 2,
    width: style.size ?? 240,
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store",
    },
  });
}
