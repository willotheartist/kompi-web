//src/app/qr-menus/[id]/service/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type MenuSectionItem = {
  id: string;
  name: string;
  description?: string;
  price?: string;
  badge?: string;
  isAvailable?: boolean;
};

type MenuSection = {
  id: string;
  name: string;
  items: MenuSectionItem[];
};

type MenuData = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  accentHex: string | null;
  backgroundHex: string | null;
  sections: MenuSection[] | null;
};

export default function QrMenuServiceModePage() {
  const params = useParams();
  const router = useRouter();
const id = (params?.id as string) || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [accentHex, setAccentHex] = useState<string>("#ff571f");
  const [backgroundHex, setBackgroundHex] = useState<string>("#064e3b");
  const [sections, setSections] = useState<MenuSection[]>([]);

  // Load menu
  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/qr-menus/${id}`, {
          method: "GET",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || "Failed to load menu");
        }

        const data = (await res.json()) as { menu?: MenuData } | MenuData;
        const m: MenuData = "menu" in data ? data.menu! : (data as MenuData);

        if (cancelled) return;

        setTitle(m.title || "");
        setSlug(m.slug || "");
        setDescription(m.description || "");
        setAccentHex(m.accentHex || "#ff571f");
        setBackgroundHex(m.backgroundHex || "#064e3b");
        setSections(
          Array.isArray(m.sections) ? (m.sections as MenuSection[]) : [],
        );
      } catch (err) {
        console.error(err);
        if (!cancelled) toast.error("Failed to load menu");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function save(updatedSections: MenuSection[]) {
    if (!id) return;

    setSaving(true);
    try {
      const payload = {
        title: title || null,
        slug: slug || null,
        description: description.trim() || null,
        accentHex: accentHex || "#ff571f",
        backgroundHex: backgroundHex || "#064e3b",
        sections: updatedSections,
      };

      const res = await fetch(`/api/qr-menus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Failed to update availability";
        try {
          const txt = await res.text();
          if (txt) msg = txt;
        } catch {}
        throw new Error(msg);
      }

      toast.success("Menu updated");
    } catch (err) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to update availability";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  function toggleItem(sectionId: string, itemId: string) {
    setSections((prev) => {
      const next = prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          items: section.items.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  isAvailable: item.isAvailable === false,
                }
              : item,
          ),
        };
      });

      void save(next);
      return next;
    });
  }

  const publicUrl = slug ? `/m/${slug}` : null;

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push(`/qr-menus/${id}`)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px]"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-subtle)",
            }}
          >
            ← Back to editor
          </button>

          {publicUrl && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px]"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              View live menu
            </a>
          )}
        </div>

        {/* Header */}
        <div
          className="rounded-3xl border px-4 py-4 sm:px-5 sm:py-5"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px]" style={{ color: "var(--color-subtle)" }}>
                Service mode · QR Menu
              </p>
              <h1 className="text-base font-semibold text-[var(--color-text)]">
                {title || "Menu"}
              </h1>
              {slug && (
                <p className="text-[11px]" style={{ color: "var(--color-subtle)" }}>
                  Public URL: {publicUrl}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span
                className="inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--color-success, #22c55e)" }}
              />
              <span style={{ color: "var(--color-subtle)" }}>
                Tap to mark items sold out or available
              </span>
            </div>
          </div>
        </div>

        {/* Sections & items */}
        <div
          className="flex-1 rounded-3xl border px-4 py-4 sm:px-5 sm:py-5"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          {loading ? (
            <p className="text-[11px]" style={{ color: "var(--color-subtle)" }}>
              Loading menu…
            </p>
          ) : sections.length === 0 ? (
            <p className="text-[11px]" style={{ color: "var(--color-subtle)" }}>
              No items yet. Add dishes in the main menu editor first.
            </p>
          ) : (
            <div className="space-y-5">
              {sections.map((section) => (
                <div key={section.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text)]">
                      {section.name || "Section"}
                    </h2>
                    <span
                      className="text-[10px]"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      {section.items.length} item
                      {section.items.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {section.items.map((item) => {
                      const available = item.isAvailable !== false;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleItem(section.id, item.id)}
                          className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition"
                          style={{
                            border: "1px solid var(--color-border)",
                            backgroundColor: available
                              ? "var(--color-bg)"
                              : "rgba(148, 27, 37, 0.06)",
                          }}
                        >
                          <div className="flex flex-col">
                            <span
                              className="font-medium"
                              style={{
                                color: available
                                  ? "var(--color-text)"
                                  : "rgba(15,23,42,0.7)",
                              }}
                            >
                              {item.name || "Untitled item"}
                            </span>
                            {item.price && (
                              <span
                                className="text-[11px]"
                                style={{ color: "var(--color-subtle)" }}
                              >
                                {item.price}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <div
                              className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                              style={{
                                border: "1px solid var(--color-border)",
                                backgroundColor: available
                                  ? "var(--color-surface)"
                                  : "rgba(148, 27, 37, 0.08)",
                              }}
                            >
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{
                                  backgroundColor: available
                                    ? "#22c55e"
                                    : "#b91c1c",
                                }}
                              />
                              <span>
                                {available ? "Available" : "Sold out"}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {saving && !loading && (
            <p
              className="mt-3 text-[10px]"
              style={{ color: "var(--color-subtle)" }}
            >
              Saving…
            </p>
          )}
        </div>

        <div className="text-[10px]" style={{ color: "var(--color-subtle)" }}>
          Changes here update the live menu instantly. Great for mid-service
          stock changes.
        </div>
      </div>
    </main>
  );
}
