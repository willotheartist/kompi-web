// src/app/(dashboard)/builder/[siteId]/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireDbUser } from "@/lib/builder/authz";

function SectionCard({
  type,
  variant,
  hidden,
  content,
}: {
  type: string;
  variant: string;
  hidden: boolean;
  content: any;
}) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 14,
        padding: 14,
        opacity: hidden ? 0.5 : 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 800 }}>
          {type} <span style={{ opacity: 0.6, fontWeight: 700 }}>· {variant}</span>
        </div>
        <div style={{ fontSize: 12, opacity: 0.7 }}>{hidden ? "Hidden" : "Visible"}</div>
      </div>
      <pre style={{ marginTop: 10, fontSize: 12, whiteSpace: "pre-wrap", opacity: 0.85 }}>
        {JSON.stringify(content, null, 2)}
      </pre>
    </div>
  );
}

export default async function BuilderSitePage({ params }: { params: Promise<{ siteId: string }> }) {
  const { siteId } = await params;

  const auth = await requireDbUser();
  if (!auth.ok) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Builder</h1>
        <p style={{ marginTop: 8 }}>You must be signed in.</p>
      </div>
    );
  }

  const site = await prisma.builderSite.findFirst({
    where: { id: siteId, workspace: { ownerId: auth.user.id } },
    include: {
      pages: {
        orderBy: { order: "asc" },
        include: { sections: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!site) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Builder</h1>
        <p style={{ marginTop: 8 }}>Site not found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 900 }}>{site.name}</h1>
          <div style={{ marginTop: 6, opacity: 0.75 }}>{site.slug}.kompi.page</div>
          <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href={`/builder/${site.id}/edit`}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                textDecoration: "none",
                fontWeight: 900,
                background: "rgba(0,0,0,0.04)",
              }}
            >
              Open editor
            </Link>
            <Link
              href={`/s/${site.slug}`}
              target="_blank"
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              View public render
            </Link>
          </div>
        </div>
        <div style={{ fontSize: 12, opacity: 0.75 }}>
          {site.isPublished ? "Published" : "Draft"} · Updated {site.updatedAt.toISOString()}
        </div>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
        <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, padding: 14 }}>
          <div style={{ fontWeight: 900 }}>Globals</div>
          <pre style={{ marginTop: 10, fontSize: 12, whiteSpace: "pre-wrap", opacity: 0.85 }}>
            {JSON.stringify({ brand: site.brand, navigation: site.navigation, globalCta: site.globalCta }, null, 2)}
          </pre>
        </div>

        {site.pages.map((p) => (
          <div key={p.id} style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 14, padding: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontWeight: 900 }}>
                {p.type} <span style={{ opacity: 0.6, fontWeight: 700 }}>· {p.title ?? ""}</span>
              </div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{p.path ?? ""}</div>
            </div>

            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {p.sections.map((s) => (
                <SectionCard key={s.id} type={s.type} variant={s.variant} hidden={s.isHidden} content={s.content} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
