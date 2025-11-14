// src/app/api/kr-codes/[id]/style/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const StyleSchema = z.object({
  fg: z.string().optional(),
  bg: z.string().optional(),
  size: z.number().int().min(120).max(1024).optional(),
  margin: z.number().int().min(0).max(16).optional(),
  logoUrl: z.string().url().nullable().optional(),
  cornerRadius: z.number().int().min(0).max(40).optional(),
  ecLevel: z.enum(["L", "M", "Q", "H"]).optional(),
});

type RouteContext = {
  params: { id: string };
};

type StyleObject = {
  fg?: string;
  bg?: string;
  size?: number;
  margin?: number;
  logoUrl?: string | null;
  cornerRadius?: number;
  ecLevel?: "L" | "M" | "Q" | "H";
  [key: string]: unknown;
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

  const style = (code.style ?? {}) as StyleObject;
  return NextResponse.json(style);
}

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext,
) {
  const { id } = params;

  const session = await getServerSession(authOptions);
  const userId =
    (session?.user as { id?: string } | undefined)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const code = await prisma.kRCode.findUnique({ where: { id } });
  if (!code) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (code.userId !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = StyleSchema.parse(
    await req.json().catch(() => ({})),
  );

  const currentStyle = (code.style ?? {}) as StyleObject;

  const updated = await prisma.kRCode.update({
    where: { id },
    data: { style: { ...currentStyle, ...parsed } },
  });

  return NextResponse.json(updated);
}
