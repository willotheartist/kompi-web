// src/app/api/discount-codes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

export const dynamic = "force-dynamic";

// GET /api/discount-codes
// List discount codes for the active workspace
export async function GET(req: NextRequest) {
  const user = await requireUser();

  const { searchParams } = new URL(req.url);
  const workspaceIdParam = searchParams.get("workspaceId") || undefined;
  const workspace = await getActiveWorkspace(user.id, workspaceIdParam);

  if (!workspace) {
    return new NextResponse("Workspace not found", { status: 404 });
  }

  const codes = await prisma.discountCode.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ codes });
}

// POST /api/discount-codes
// Create a new discount code (or update an existing one if id is provided)
export async function POST(req: NextRequest) {
  const user = await requireUser();

  const { searchParams } = new URL(req.url);
  const workspaceIdParam = searchParams.get("workspaceId") || undefined;
  const workspace = await getActiveWorkspace(user.id, workspaceIdParam);

  if (!workspace) {
    return new NextResponse("Workspace not found", { status: 404 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new NextResponse("Invalid JSON", { status: 400 });
  }

  const {
    id,
    code,
    description,
    isSubscriberOnly,
    isActive,
    expiresAt,
  } = (body ?? {}) as {
    id?: string;
    code?: string;
    description?: string | null;
    isSubscriberOnly?: boolean;
    isActive?: boolean;
    expiresAt?: string | null;
  };

  if (!code || !code.trim()) {
    return new NextResponse("Code is required", { status: 400 });
  }

  const data = {
    workspaceId: workspace.id,
    code: code.trim(),
    description: description?.trim() || null,
    isSubscriberOnly: Boolean(isSubscriberOnly),
    isActive: isActive !== undefined ? Boolean(isActive) : true,
    expiresAt: expiresAt ? new Date(expiresAt) : null,
  };

  if (id) {
    const updated = await prisma.discountCode.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  }

  const created = await prisma.discountCode.create({ data });
  return NextResponse.json(created, { status: 201 });
}
