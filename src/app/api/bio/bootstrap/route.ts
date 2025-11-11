import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Ensure demo user + default workspace exist (same pattern as before)
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { email: "demo@kompi.local" },
    });
  }

  let workspace = await prisma.workspace.findFirst({
    where: { slug: "default", ownerId: user.id },
  });

  if (!workspace) {
    workspace = await prisma.workspace.create({
      data: {
        name: "Default Workspace",
        slug: "default",
        ownerId: user.id,
      },
    });
  }

  // Create or fetch a bio page for this workspace
  let page = await prisma.bioPage.findFirst({
    where: { workspaceId: workspace.id, slug: "default" },
  });

  if (!page) {
    page = await prisma.bioPage.create({
      data: {
        workspaceId: workspace.id,
        slug: "default",
        title: "Kompi Links · Demo",
        description: "Your all-in-one link hub.",
      },
    });

    // Seed a couple of demo links
    await prisma.bioLink.createMany({
      data: [
        {
          bioPageId: page.id,
          label: "Visit Kompi Links home",
          url: "http://localhost:3000",
          sortOrder: 0,
        },
        {
          bioPageId: page.id,
          label: "Example external link",
          url: "https://example.com",
          sortOrder: 1,
        },
      ],
    });
  }

  const links = await prisma.bioLink.findMany({
    where: { bioPageId: page.id, isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return NextResponse.json({
    page,
    links,
  });
}
