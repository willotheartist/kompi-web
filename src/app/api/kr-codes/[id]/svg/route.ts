import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: { id: string };
};

type Style = {
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

  const style: Style = (code.style as Style | null) ?? {};

  const fg = style.fg ?? "#000000";
  const rawBg = style.bg ?? "#ffffff";
  const bg = rawBg === "transparent" ? "#0000" : rawBg;
  const margin = style.margin ?? 2;
  const size = style.size ?? 240;
  const ecLevel = style.ecLevel ?? "M";

  const svg = await QRCode.toString(code.destination, {
    type: "svg",
    width: size,
    margin,
    errorCorrectionLevel: ecLevel,
    color: {
      dark: fg,
      light: bg,
    },
  });

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store",
    },
  });
}
