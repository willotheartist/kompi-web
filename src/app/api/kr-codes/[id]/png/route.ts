import { NextResponse } from "next/server";
import * as QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function resolveParams(params: RouteContext["params"]) {
  return params instanceof Promise ? await params : params;
}

export async function GET(_req: Request, ctx: RouteContext) {
  const { id } = await resolveParams(ctx.params);

  if (!id) {
    return new NextResponse("Missing id", { status: 400 });
  }

  const krc = await prisma.kRCode.findUnique({
    where: { id },
  });

  if (!krc) {
    return new NextResponse("Not found", { status: 404 });
  }

  type QRStyle = {
    fg?: string;
    bg?: string;
    margin?: number;
    ecLevel?: "L" | "M" | "Q" | "H";
  };

  const rawStyle = krc.style as unknown;
  const style: QRStyle =
    rawStyle && typeof rawStyle === "object"
      ? (rawStyle as QRStyle)
      : {};

  const fg = style.fg ?? "#000000";
  const bg = style.bg ?? "#FFFFFF";

  const buffer = await QRCode.toBuffer(krc.destination, {
    errorCorrectionLevel: style.ecLevel ?? "M",
    margin: style.margin ?? 2,
    color: {
      dark: fg,
      light: bg,
    },
  });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="krcode-${id}.png"`,
    },
  });
}
