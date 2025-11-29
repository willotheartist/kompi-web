import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

function slugify(v: string) {
  return v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 32);
}

async function generateUniqueSlug(base: string) {
  let slug = base || "workspace";
  let attempt = 1;

  while (attempt < 50) {
    const existing = await prisma.workspace.findUnique({ where: { slug } });
    if (!existing) return slug;

    attempt += 1;
    slug = `${base}-${attempt}`;
  }

  return `${base}-${Math.random().toString(36).slice(2, 8)}`;
}

// GET /api/workspaces
// Returns the current user's workspaces for selection UIs.
export async function GET(_req: Request) {
  const user = await requireUser();

  const workspaces = await prisma.workspace.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ workspaces });
}

// POST /api/workspaces
// Creates a new workspace for the current user.
export async function POST(req: Request) {
  const user = await requireUser();
  const body = await req.json().catch(() => ({}));
  const rawName = typeof body.name === "string" ? body.name : "";
  const name = rawName.trim();

  if (!name) {
    return new NextResponse("Workspace name is required", { status: 400 });
  }

  const baseSlug =
    slugify(name) || slugify(user.email ?? "") || `ws-${user.id.slice(0, 6)}`;
  const slug = await generateUniqueSlug(baseSlug);

  const workspace = await prisma.workspace.create({
    data: {
      name,
      slug,
      ownerId: user.id,
    },
  });

  return NextResponse.json(workspace, { status: 201 });
}
