// src/app/m/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type MenuSectionItem = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  badge?: string;
  isAvailable?: boolean; // NEW
};

type MenuSection = {
  id: string;
  name: string;
  items: MenuSectionItem[];
};

// Support both normal and Promise-style params
async function resolveParams(
  rawParams: unknown,
): Promise<{ slug: string } | null> {
  try {
    if (!rawParams) return null;

    // Promise-like (some Next setups)
    if (
      typeof rawParams === "object" &&
      rawParams !== null &&
      "then" in rawParams &&
      typeof (rawParams as { then?: unknown }).then === "function"
    ) {
      const resolved = (await (rawParams as Promise<{ slug?: unknown }>)) ?? {};
      const slug = resolved.slug;
      return typeof slug === "string" ? { slug } : null;
    }

    // Plain object with slug
    if (
      typeof rawParams === "object" &&
      rawParams !== null &&
      "slug" in rawParams
    ) {
      const slug = (rawParams as { slug?: unknown }).slug;
      return typeof slug === "string" ? { slug } : null;
    }

    return null;
  } catch {
    return null;
  }
}

type PageProps = {
  params: unknown;
};

export const dynamic = "force-dynamic";

function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace("#", "").trim();
  if (cleaned.length !== 6 && cleaned.length !== 3) {
    return `rgba(0,0,0,${alpha})`;
  }

  let r: number, g: number, b: number;

  if (cleaned.length === 3) {
    const rHex = cleaned[0] + cleaned[0];
    const gHex = cleaned[1] + cleaned[1];
    const bHex = cleaned[2] + cleaned[2];
    r = parseInt(rHex, 16);
    g = parseInt(gHex, 16);
    b = parseInt(bHex, 16);
  } else {
    r = parseInt(cleaned.slice(0, 2), 16);
    g = parseInt(cleaned.slice(2, 4), 16);
    b = parseInt(cleaned.slice(4, 6), 16);
  }

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return `rgba(0,0,0,${alpha})`;
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default async function PublicMenuPage({ params }: PageProps) {
  const resolved = await resolveParams(params);
  const slug = resolved?.slug;

  if (!slug) {
    notFound();
  }

  const menu = await prisma.menu.findUnique({
    where: { slug },
  });

  if (!menu) {
    notFound();
  }

  // Brand colours
  const accent = menu.accentHex || "#0f766e"; // default warm/teal accent
  const wallBackground = menu.backgroundHex || "#064e3b"; // what the "wall" looks like

  const sections: MenuSection[] = Array.isArray(menu.sections)
    ? (menu.sections as MenuSection[])
    : [];

  const updatedAt =
    menu.updatedAt instanceof Date
      ? menu.updatedAt
      : new Date(menu.updatedAt as unknown as string);

  const lastUpdatedLabel = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(updatedAt);

  const borderColor = hexToRgba("#020617", 0.18);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: wallBackground }}
    >
      <div className="mx-auto flex w-full max-w-4xl justify-center px-4 py-10 sm:px-6 lg:px-8">
        {/* Flat printed sheet – no shadow, no rounded SaaS card */}
        <div
          className="w-full border bg-[#fdfbf5] px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10"
          style={{
            borderColor,
          }}
        >
          {/* Header */}
          <header className="flex flex-col items-center gap-4 border-b pb-5 text-center sm:items-start sm:text-left">
            <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                {menu.logoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={menu.logoUrl}
                    alt={menu.title || "Menu logo"}
                    className="h-12 w-12 flex-shrink-0 object-contain"
                    style={{ borderRadius: 0 }}
                  />
                )}
                <div className="space-y-1">
                  <p
                    className="text-[11px] uppercase tracking-[0.2em]"
                    style={{ color: hexToRgba("#020617", 0.55) }}
                  >
                    QR Menu
                  </p>
                  <h1
                    className="text-2xl font-semibold tracking-[0.04em] sm:text-3xl"
                    style={{ color: "#020617" }}
                  >
                    {menu.title || "Menu"}
                  </h1>
                </div>
              </div>

              <div
                className="text-[11px] leading-tight"
                style={{ color: hexToRgba("#020617", 0.6) }}
              >
                <p>Last updated {lastUpdatedLabel}</p>
                <p className="mt-0.5">Powered by Kompi · QR Menu</p>
              </div>
            </div>

            {menu.description && (
              <p
                className="mt-2 max-w-2xl text-sm leading-relaxed"
                style={{ color: hexToRgba("#020617", 0.75) }}
              >
                {menu.description}
              </p>
            )}
          </header>

          {/* Sections */}
          <section className="mt-6">
            {sections.length === 0 && (
              <p
                className="border-t border-dashed pt-6 text-center text-xs"
                style={{ borderColor, color: hexToRgba("#020617", 0.65) }}
              >
                This menu is still being set up. Please check again soon.
              </p>
            )}

            {sections.length > 0 && (
              <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                {sections.map((section) => (
                  <article key={section.id} className="space-y-2">
                    <header className="border-b pb-1.5">
                      <h2
                        className="text-xs font-semibold uppercase tracking-[0.25em]"
                        style={{ color: accent }}
                      >
                        {section.name || "Section"}
                      </h2>
                    </header>

                    <div className="space-y-2 pt-1.5">
                      {section.items.map((item) => {
                        const available = item.isAvailable !== false;

                        return (
                          <div key={item.id} className="space-y-0.5">
                            <div className="flex items-baseline justify-between gap-3">
                              <div className="flex flex-wrap items-baseline gap-2">
                                <h3
                                  className="text-sm font-medium"
                                  style={{
                                    color: available
                                      ? "#111827"
                                      : hexToRgba("#020617", 0.45),
                                    textDecoration: available
                                      ? "none"
                                      : "line-through",
                                  }}
                                >
                                  {item.name || "Item"}
                                </h3>
                                {item.badge && item.badge.trim() && (
                                  <span
                                    className="text-[10px] font-semibold uppercase tracking-[0.16em]"
                                    style={{ color: accent }}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                                {!available && (
                                  <span
                                    className="text-[10px] uppercase tracking-[0.16em]"
                                    style={{ color: hexToRgba("#b91c1c", 0.9) }}
                                  >
                                    Sold out
                                  </span>
                                )}
                              </div>

                              {item.price && item.price.trim() && (
                                <p
                                  className="whitespace-nowrap text-sm font-semibold"
                                  style={{
                                    color: available
                                      ? accent
                                      : hexToRgba("#020617", 0.4),
                                  }}
                                >
                                  {item.price}
                                </p>
                              )}
                            </div>

                            {item.description && item.description.trim() && (
                              <p
                                className="text-[11px] leading-snug"
                                style={{
                                  color: available
                                    ? hexToRgba("#020617", 0.7)
                                    : hexToRgba("#020617", 0.45),
                                }}
                              >
                                {item.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Footer note */}
          <footer className="mt-8 border-t pt-3 text-center text-[11px]">
            <span style={{ color: hexToRgba("#020617", 0.7) }}>
              If something looks wrong, ask the staff – this menu is live and
              updates in real time.
            </span>
          </footer>
        </div>
      </div>
    </main>
  );
}
