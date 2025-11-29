// src/app/dashboard/qr-menus/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Plus, Pencil, ExternalLink, QrCode } from "lucide-react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { CreateKrcodeButton } from "@/components/qr-menus/create-krcode-button";

export const dynamic = "force-dynamic";

type SessionUserWithId = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export default async function DashboardQrMenusPage() {
  const session = await auth();
  const userId =
    (session?.user as SessionUserWithId | undefined)?.id ?? undefined;

  if (!userId) {
    redirect("/signin");
  }

  const menus = await prisma.menu.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <DashboardLayout>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ color: "var(--color-subtle)" }}
            >
              Kompi · QR Menus
            </p>
            <h1 className="text-xl font-semibold tracking-tight text-[var(--color-text)] sm:text-2xl">
              QR menus for your venues.
            </h1>
            <p
              className="max-w-xl text-xs sm:text-sm"
              style={{ color: "var(--color-subtle)" }}
            >
              Create simple, on-brand menus that live at a short URL and scan
              perfectly from your Kompi Codes.
            </p>
          </div>

          <Link
            href="/dashboard/qr-menus/new"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shadow-sm"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-text)",
            }}
          >
            <Plus className="h-3.5 w-3.5" />
            New QR menu
          </Link>
        </header>

        {/* Empty state */}
        {menus.length === 0 && (
          <div
            className="mt-4 rounded-2xl border border-dashed px-4 py-8 text-center"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{ color: "var(--color-text)" }}
            >
              No QR menus yet.
            </p>
            <p
              className="mt-1 text-xs"
              style={{ color: "var(--color-subtle)" }}
            >
              Start by creating a menu for your bar, restaurant, cafe or venue.
            </p>
            <div className="mt-4">
              <Link
                href="/dashboard/qr-menus/new"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shadow-sm"
                style={{
                  backgroundColor: "var(--color-accent)",
                  color: "var(--color-text)",
                }}
              >
                <Plus className="h-3.5 w-3.5" />
                Create your first menu
              </Link>
            </div>
          </div>
        )}

        {/* List */}
        {menus.length > 0 && (
          <section className="mt-2 space-y-3">
            <div
              className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em]"
              style={{ color: "var(--color-subtle)" }}
            >
              <span>Menus</span>
              <span>{menus.length} active</span>
            </div>

            <div className="space-y-2">
              {menus.map((menu) => {
                const created =
                  menu.createdAt instanceof Date
                    ? menu.createdAt.toISOString().slice(0, 10)
                    : "";
                const publicPath =
                  menu.slug && typeof menu.slug === "string"
                    ? `/m/${menu.slug}`
                    : null;

                return (
                  <article
                    key={menu.id}
                    className="flex flex-col gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-[var(--color-text)]">
                          {menu.title || "Untitled menu"}
                        </h2>
                        {publicPath && (
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                            style={{
                              border: "1px solid var(--color-border)",
                              color: "var(--color-subtle)",
                            }}
                          >
                            {menu.slug}
                          </span>
                        )}
                      </div>
                      {menu.description && (
                        <p
                          className="line-clamp-2 text-xs"
                          style={{ color: "var(--color-subtle)" }}
                        >
                          {menu.description}
                        </p>
                      )}
                      <p
                        className="text-[11px]"
                        style={{ color: "var(--color-subtle)" }}
                      >
                        Created {created || "–"}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      {publicPath && (
                        <Link
                          href={publicPath}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
                          style={{
                            border: "1px solid var(--color-border)",
                            color: "var(--color-text)",
                          }}
                        >
                          <QrCode className="h-3.5 w-3.5" />
                          View public menu
                          <ExternalLink className="h-3 w-3 opacity-70" />
                        </Link>
                      )}

                      {/* 🔥 Auto-create via API, then push to /kr-codes/[id] */}
                      <CreateKrcodeButton menuId={menu.id} />

                      <Link
                        href={`/dashboard/qr-menus/${menu.id}`}
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium"
                        style={{
                          backgroundColor: "var(--color-accent-soft)",
                          color: "var(--color-text)",
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
