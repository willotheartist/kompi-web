// src/app/(dashboard)/builder/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ensureWorkspaceForUser } from "@/lib/builder/ensure-workspace";
import { requireDbUser } from "@/lib/builder/authz";

export default async function BuilderIndexPage() {
  const auth = await requireDbUser();
  if (!auth.ok) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Kompi Builder</h1>
        <p style={{ marginTop: 8 }}>You must be signed in.</p>
      </div>
    );
  }

  // AUTO-CREATE a workspace if the user doesn't have one.
  const ws = await ensureWorkspaceForUser(auth.user.id);

  const sites = await prisma.builderSite.findMany({
    where: { workspaceId: ws.id },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, slug: true, createdAt: true, isPublished: true },
  });

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800 }}>Kompi Builder</h1>
          <p style={{ marginTop: 6, opacity: 0.8 }}>
            Workspace: {ws.name} ({ws.slug})
          </p>
        </div>

        <Link
          href="/builder/new"
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          + New site
        </Link>
      </div>

      <div style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>Your Builder Sites</h2>
        {sites.length === 0 ? (
          <p style={{ marginTop: 8, opacity: 0.8 }}>No sites yet. Create your first one.</p>
        ) : (
          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            {sites.map((s) => (
              <Link
                key={s.id}
                href={`/builder/${s.id}`}
                style={{
                  padding: 14,
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.12)",
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800 }}>{s.name}</div>
                  <div style={{ marginTop: 4, opacity: 0.7 }}>{s.slug}.kompi.page</div>
                </div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{s.isPublished ? "Published" : "Draft"}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
