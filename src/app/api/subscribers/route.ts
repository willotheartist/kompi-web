// src/app/api/subscribers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Helper: get or create a default list in a workspace
async function getOrCreateDefaultList(workspaceId: string) {
  let list = await prisma.subscriberList.findFirst({
    where: { workspaceId },
    orderBy: { createdAt: "asc" },
  });

  if (!list) {
    list = await prisma.subscriberList.create({
      data: {
        workspaceId,
        name: "Default list",
      },
    });
  }

  return list;
}

// GET /api/subscribers
// List subscribers for active workspace (optionally by listId)
export async function GET(req: NextRequest) {
  const user = await requireUser();

  const { searchParams } = new URL(req.url);
  const workspaceIdParam = searchParams.get("workspaceId") || undefined;
  const listIdParam = searchParams.get("listId") || undefined;

  const workspace = await getActiveWorkspace(user.id, workspaceIdParam);

  if (!workspace) {
    return new NextResponse("Workspace not found", { status: 404 });
  }

  let listId = listIdParam;

  if (!listId) {
    const defaultList = await getOrCreateDefaultList(workspace.id);
    listId = defaultList.id;
  }

  const list = await prisma.subscriberList.findUnique({
    where: { id: listId },
    include: {
      subscribers: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!list || list.workspaceId !== workspace.id) {
    return new NextResponse("List not found", { status: 404 });
  }

  return NextResponse.json({
    list: {
      id: list.id,
      name: list.name,
      workspaceId: list.workspaceId,
    },
    subscribers: list.subscribers,
  });
}

// POST /api/subscribers
// Upsert a subscriber into a list
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
    listId: bodyListId,
    email,
    phone,
    sourceSlug,
    sourceType,
    tags,
  } = (body ?? {}) as {
    listId?: string;
    email?: string | null;
    phone?: string | null;
    sourceSlug?: string | null;
    sourceType?: string | null;
    tags?: string[] | null;
  };

  if (!email && !phone) {
    return new NextResponse("Email or phone is required", { status: 400 });
  }

  let listId = bodyListId;
  if (!listId) {
    const defaultList = await getOrCreateDefaultList(workspace.id);
    listId = defaultList.id;
  }

  // Ensure the list belongs to this workspace
  const list = await prisma.subscriberList.findUnique({
    where: { id: listId },
  });

  if (!list || list.workspaceId !== workspace.id) {
    return new NextResponse("List not found", { status: 404 });
  }

  const cleanedEmail = email?.trim().toLowerCase() || null;
  const cleanedPhone = phone?.trim() || null;
  const finalTags = Array.isArray(tags) ? tags : [];

  // Simple: always create (you can later enhance with true upsert logic)
  const subscriber = await prisma.subscriber.create({
    data: {
      listId: list.id,
      email: cleanedEmail,
      phone: cleanedPhone,
      sourceSlug: sourceSlug || null,
      sourceType: sourceType || null,
      tags: finalTags,
    },
  });

  return NextResponse.json(subscriber, { status: 201 });
}

// PATCH /api/subscribers
// Update tags or basic fields for a subscriber by id
export async function PATCH(req: NextRequest) {
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
    email,
    phone,
    tags,
  } = (body ?? {}) as {
    id?: string;
    email?: string | null;
    phone?: string | null;
    tags?: string[] | null;
  };

  if (!id) {
    return new NextResponse("Subscriber id is required", { status: 400 });
  }

  const existing = await prisma.subscriber.findUnique({
    where: { id },
    include: {
      list: true,
    },
  });

  if (!existing || existing.list.workspaceId !== workspace.id) {
    return new NextResponse("Subscriber not found", { status: 404 });
  }

  const updated = await prisma.subscriber.update({
    where: { id },
    data: {
      email: email !== undefined ? email : existing.email,
      phone: phone !== undefined ? phone : existing.phone,
      tags: Array.isArray(tags) ? tags : existing.tags,
    },
  });

  return NextResponse.json(updated);
}

// DELETE /api/subscribers
// Delete a subscriber by id
export async function DELETE(req: NextRequest) {
  const user = await requireUser();

  const { searchParams } = new URL(req.url);
  const workspaceIdParam = searchParams.get("workspaceId") || undefined;
  const id = searchParams.get("id") || undefined;

  const workspace = await getActiveWorkspace(user.id, workspaceIdParam);

  if (!workspace) {
    return new NextResponse("Workspace not found", { status: 404 });
  }

  if (!id) {
    return new NextResponse("Subscriber id is required", { status: 400 });
  }

  const existing = await prisma.subscriber.findUnique({
    where: { id },
    include: { list: true },
  });

  if (!existing || existing.list.workspaceId !== workspace.id) {
    return new NextResponse("Subscriber not found", { status: 404 });
  }

  await prisma.subscriber.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
