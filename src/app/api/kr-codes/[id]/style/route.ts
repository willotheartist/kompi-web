// src/app/api/kr-codes/[id]/style/route.ts
import { NextRequest, NextResponse } from "next/server";
import { KRStyleSchema } from "@/lib/kr-design";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const StyleSchema = KRStyleSchema;

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
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const code = await prisma.kRCode.findUnique({ where: { id } });
  if (!code) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const style = (code.style ?? {}) as StyleObject;
  return NextResponse.json(style);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

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

  const result = StyleSchema.safeParse(await req.json().catch(() => ({})));
  if (!result.success) return NextResponse.json({ error: "Invalid design settings" }, { status: 400 });
  const parsed = result.data;

  const currentStyle = (code.style ?? {}) as StyleObject;

  const updated = await prisma.kRCode.update({
    where: { id },
    data: { style: { ...currentStyle, ...parsed } },
  });

  return NextResponse.json(updated);
}
