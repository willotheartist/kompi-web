import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32) || "workspace";
}

async function uniqueSlug(base: string) {
  let slug = slugify(base);
  let i = 1;
  // simple loop; in practice collisions are unlikely
    while (true) {
    const existing = await prisma.workspace.findUnique({ where: { slug } });
    if (!existing) return slug;
    slug = `${slugify(base)}-${i++}`;
  }
}

export async function GET() {
  try {
    const user = await requireUser();
    const workspaces = await prisma.workspace.findMany({
      where: { ownerId: user.id },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(workspaces);
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const body = (await req.json().catch(() => ({}))) as { name?: string };
    const name = (body.name ?? "New workspace").toString().trim() || "Workspace";
    const slug = await uniqueSlug(name);

    const workspace = await prisma.workspace.create({
      data: { name, slug, ownerId: user.id },
    });

    return NextResponse.json(workspace, { status: 201 });
  } catch {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
