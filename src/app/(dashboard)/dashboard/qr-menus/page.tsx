// src/app/dashboard/qr-menus/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Plus, Pencil, ExternalLink, QrCode } from "lucide-react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";
import { MenuQrPreview } from "@/components/qr-menus/menu-qr-preview";

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
        {/* HERO HEADER */}
        <header className="w-full overflow-hidden rounded-[32px] bg-[#1E2330] px-6 py-6 sm:px-10 sm:py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: image + text */}
            <div className="flex items-center gap-6">
              {/* Image card */}
              <div className="relative h-28 w-28 shrink-0 sm:h-32 sm:w-32">
                <div className="h-full w-full rounded-[24px] bg-[#2B3245]" />
                <img
                  src="/kompi-business.png"
                  alt="Kompi QR Menu"
                  className="absolute inset-1 rounded-[22px] object-cover"
                  draggable={false}
                />
              </div>

              {/* Text block */}
              <div className="space-y-2">
                <div className="leading-tight">
                  {/* Inter Tight – line 1 */}
                  <p
                    className="text-[32px] sm:text-[40px]"
                    style={{
                      fontFamily:
                        '"Inter Tight", system-ui, -apple-system, sans-serif',
                      color: "#A5B0FF",
                      fontWeight: 500,
                      fontStyle: "normal",
                    }}
                  >
                    Create a new
                  </p>
                  {/* Instrument Serif – line 2 (NOT italic, NOT bold) */}
                  <p
                    className="text-[32px] sm:text-[40px]"
                    style={{
                      fontFamily: '"Instrument Serif", Georgia, serif',
                      color: "#A5B0FF",
                      fontWeight: 400,
                      fontStyle: "normal",
                    }}
                  >
                    QR Menu
                  </p>
                </div>

                <p
                  className="max-w-lg text-xs sm:text-sm sm:leading-snug"
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontFamily:
                      '"Inter Tight", system-ui, -apple-system, sans-serif',
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  Create simple, on-brand menus that live at a short URL and
                  scan perfectly from your Kompi Codes.
                </p>
              </div>
            </div>

            {/* Right: CTA button */}
            <div className="flex justify-start sm:justify-end">
              <Link
                href="/dashboard/qr-menus/new"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm shadow"
                style={{
                  backgroundColor: "#A5B0FF",
                  color: "#1E2330",
                  fontFamily:
                    '"Inter Tight", system-ui, -apple-system, sans-serif',
                  fontWeight: 600,
                  fontStyle: "normal",
                }}
              >
                <Plus className="h-4 w-4" />
                New QR Menu
              </Link>
            </div>
          </div>
        </header>
        {/* END HERO HEADER */}

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
                    className="rounded-2xl px-4 py-3"
                    style={{ backgroundColor: "var(--color-surface)" }}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      {/* Left: QR preview (desktop) */}
                      <div className="hidden sm:block">
                        <MenuQrPreview slug={menu.slug} compact />
                      </div>

                      {/* Middle: menu text */}
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

                      {/* Right: actions */}
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
