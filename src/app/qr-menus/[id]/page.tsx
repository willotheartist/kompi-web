// src/app/qr-menus/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft, ExternalLink, QrCode } from "lucide-react";

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

type MenuData = {
  id: string;
  title: string | null;
  slug: string | null;
  description: string | null;
  accentHex: string | null;
  sections: MenuSection[] | null;
};

export default function EditQrMenuPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [creatingCode, setCreatingCode] = useState(false);
  const [menu, setMenu] = useState<MenuData | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [accentHex, setAccentHex] = useState("#ff571f");
  const [sections, setSections] = useState<MenuSection[]>([]);

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

        const data = await res.json();
        const m: MenuData = data.menu ?? data;

        if (cancelled) return;

        setMenu(m);
        setTitle(m.title || "");
        setSlug(m.slug || "");
        setDescription(m.description || "");
        setAccentHex(m.accentHex || "#ff571f");
        setSections(
          Array.isArray(m.sections) ? (m.sections as MenuSection[]) : [],
        );
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          toast.error("Failed to load menu");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [id]);

  function addSection() {
    const newSection: MenuSection = {
      id: `sec-${Date.now()}`,
      name: "New section",
      items: [],
    };
    setSections((prev) => [...prev, newSection]);
  }

  function removeSection(sectionId: string) {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  }

  function updateSectionName(sectionId: string, name: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, name } : s)),
    );
  }

  function addItem(sectionId: string) {
    const newItem: MenuSectionItem = {
      id: `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: "New item",
      description: "",
      price: "",
      badge: "",
      isAvailable: true, // NEW default
    };

    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s,
      ),
    );
  }

  function removeItem(sectionId: string, itemId: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
          : s,
      ),
    );
  }

  function updateItem(
    sectionId: string,
    itemId: string,
    patch: Partial<MenuSectionItem>,
  ) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId ? { ...i, ...patch } : i,
              ),
            }
          : s,
      ),
    );
  }

  async function handleSave() {
    if (!id) {
      toast.error("Missing menu id");
      return;
    }

    const rawTitle = title.trim();
    const rawSlug = slug.trim();

    const autoSlug =
      !rawSlug && rawTitle
        ? rawTitle
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
        : rawSlug;

    const finalSlug = autoSlug || null;

    if (!rawSlug && autoSlug) {
      setSlug(autoSlug);
    }

    setSaving(true);
    try {
      const payload = {
        title: rawTitle || null,
        slug: finalSlug,
        description: description.trim() || null,
        accentHex: accentHex || "#ff571f",
        sections,
      };

      const res = await fetch(`/api/qr-menus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Failed to save menu";
        try {
          const txt = await res.text();
          if (txt) msg = txt;
        } catch {}
        throw new Error(msg);
      }

      toast.success("Menu saved");
      router.push("/dashboard/qr-menus");
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to save menu";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id) {
      toast.error("Missing menu id");
      return;
    }

    if (!confirm("Delete this menu? This cannot be undone.")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/qr-menus/${id}/delete`, {
        method: "DELETE",
      });

      if (!res.ok) {
        let msg = "Failed to delete menu";
        try {
          const txt = await res.text();
          if (txt) msg = txt;
        } catch {}
        throw new Error(msg);
      }

      toast.success("Menu deleted");
      router.push("/dashboard/qr-menus");
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to delete menu";
      toast.error(message);
    } finally {
      setDeleting(false);
    }
  }

  const publicPath = slug ? `/m/${slug}` : null;

  async function handleCopyPublicUrl() {
    const url = publicPath;
    if (!url) {
      toast.error("Set a slug first");
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Menu URL copied");
    } catch (err) {
      console.error(err);
      toast.error("Could not copy URL");
    }
  }

  async function handleCreateKompiCode() {
    if (!id) {
      toast.error("Missing menu id");
      return;
    }
    if (!slug) {
      toast.error("Set a slug first");
      return;
    }

    setCreatingCode(true);
    try {
      const res = await fetch(`/api/qr-menus/${id}/create-krcode`, {
        method: "POST",
      });

      if (!res.ok) {
        let msg = "Failed to create Kompi Code";
        try {
          const txt = await res.text();
          if (txt) msg = txt;
        } catch {}
        throw new Error(msg);
      }

      const data = (await res.json()) as { id: string };
      if (!data.id) {
        throw new Error("Missing Kompi Code id in response");
      }

      router.push(`/dashboard/kr-codes/${data.id}`);
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to create Kompi Code";
      toast.error(message);
    } finally {
      setCreatingCode(false);
    }
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push("/dashboard/qr-menus")}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px]"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-subtle)",
            }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>

          <div className="flex items-center gap-2">
            {publicPath && (
              <a
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
              </a>
            )}

            <Button
              type="button"
              size="sm"
              className="h-8 rounded-full px-3 text-[11px]"
              onClick={handleCreateKompiCode}
              disabled={creatingCode || loading || !slug}
            >
              {creatingCode ? "Creating code…" : "Create Kompi Code"}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 rounded-full px-3 text-[11px]"
              onClick={handleDelete}
              disabled={deleting || loading}
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>

            <Button
              type="button"
              size="sm"
              className="h-8 rounded-full px-4 text-[11px] font-medium"
              onClick={handleSave}
              disabled={saving || loading}
            >
              {saving ? "Saving…" : "Save menu"}
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          {/* Left: core info + sections */}
          <div className="space-y-5">
            {/* Core info */}
            <div
              className="rounded-2xl border px-4 py-4 sm:px-5 sm:py-5"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div className="mb-3 space-y-1">
                <p className="text-xs font-medium text-[var(--color-text)]">
                  Menu details
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Name your menu and set a short URL slug.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Menu name
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Pin-Pan Bar & Grill"
                    className="h-9 rounded-2xl text-sm"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-text)",
                      borderColor: "var(--color-border)",
                    }}
                    disabled={loading}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Public slug
                  </label>
                  <div className="flex items-center gap-2">
                    <div
                      className="rounded-full px-3 py-1.5 text-[11px]"
                      style={{
                        backgroundColor: "var(--color-bg)",
                        color: "var(--color-subtle)",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      /m/
                    </div>
                    <Input
                      value={slug}
                      onChange={(e) =>
                        setSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]/g, "-"),
                        )
                      }
                      placeholder="pin-pan"
                      className="h-9 rounded-2xl text-sm"
                      style={{
                        backgroundColor: "var(--color-bg)",
                        color: "var(--color-text)",
                        borderColor: "var(--color-border)",
                      }}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className="text-[11px]"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      Public URL: {slug ? `/m/${slug}` : "/m/<slug>"}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopyPublicUrl}
                      className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px]"
                      style={{
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text)",
                        backgroundColor: "var(--color-bg)",
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Description (optional)
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Neighbourhood bar & grill with craft beers, cocktails and comfort food."
                    className="rounded-2xl text-sm"
                    style={{
                      backgroundColor: "var(--color-bg)",
                      color: "var(--color-text)",
                      borderColor: "var(--color-border)",
                    }}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Sections + items */}
            <div
              className="rounded-2xl border px-4 py-4 sm:px-5 sm:py-5"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[var(--color-text)]">
                    Sections & items
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Group your items into sections like Starters, Mains, Drinks.
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="h-8 rounded-full px-3 text-[11px]"
                  onClick={addSection}
                  disabled={loading}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  Add section
                </Button>
              </div>

              {sections.length === 0 && (
                <div
                  className="rounded-2xl border border-dashed px-4 py-6 text-center text-xs"
                  style={{
                    borderColor: "var(--color-border)",
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-subtle)",
                  }}
                >
                  No sections yet. Start by adding a section for{" "}
                  <span className="font-medium">Starters</span> or{" "}
                  <span className="font-medium">Drinks</span>.
                </div>
              )}

              <div className="space-y-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-2xl border px-3 py-3"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-bg)",
                    }}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <Input
                        value={section.name}
                        onChange={(e) =>
                          updateSectionName(section.id, e.target.value)
                        }
                        className="h-8 rounded-2xl text-xs"
                        style={{
                          backgroundColor: "var(--color-surface)",
                          color: "var(--color-text)",
                          borderColor: "var(--color-border)",
                        }}
                        placeholder="Section name (e.g. Starters)"
                      />
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="inline-flex items-center justify-center rounded-full p-1.5"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-subtle)",
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {section.items.map((item) => {
                        const available = item.isAvailable !== false;

                        return (
                          <div
                            key={item.id}
                            className="grid gap-2 rounded-2xl bg-[var(--color-surface)] px-3 py-3 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_140px_40px]"
                          >
                            <div className="space-y-1.5">
                              <Input
                                value={item.name}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, {
                                    name: e.target.value,
                                  })
                                }
                                className="h-8 rounded-2xl text-xs"
                                style={{
                                  backgroundColor: "var(--color-bg)",
                                  color: "var(--color-text)",
                                  borderColor: "var(--color-border)",
                                }}
                                placeholder="Item name"
                              />
                              <Textarea
                                value={item.description || ""}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, {
                                    description: e.target.value,
                                  })
                                }
                                rows={2}
                                className="rounded-2xl text-xs"
                                style={{
                                  backgroundColor: "var(--color-bg)",
                                  color: "var(--color-text)",
                                  borderColor: "var(--color-border)",
                                }}
                                placeholder="Short description"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[11px] font-medium text-[var(--color-text)]">
                                Badge (optional)
                              </label>
                              <Input
                                value={item.badge || ""}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, {
                                    badge: e.target.value,
                                  })
                                }
                                className="h-8 rounded-2xl text-xs"
                                style={{
                                  backgroundColor: "var(--color-bg)",
                                  color: "var(--color-text)",
                                  borderColor: "var(--color-border)",
                                }}
                                placeholder="e.g. New, Spicy, Vegan"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[11px] font-medium text-[var(--color-text)]">
                                Price
                              </label>
                              <Input
                                value={item.price || ""}
                                onChange={(e) =>
                                  updateItem(section.id, item.id, {
                                    price: e.target.value,
                                  })
                                }
                                className="h-8 rounded-2xl text-xs"
                                style={{
                                  backgroundColor: "var(--color-bg)",
                                  color: "var(--color-text)",
                                  borderColor: "var(--color-border)",
                                }}
                                placeholder="€12"
                              />
                              {/* Availability pill */}
                              <button
                                type="button"
                                onClick={() =>
                                  updateItem(section.id, item.id, {
                                    isAvailable: !available,
                                  })
                                }
                                className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px]"
                                style={{
                                  border: "1px solid var(--color-border)",
                                  backgroundColor: available
                                    ? "var(--color-bg)"
                                    : "var(--color-surface)",
                                  color: available
                                    ? "var(--color-text)"
                                    : "var(--color-subtle)",
                                }}
                              >
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{
                                    backgroundColor: available
                                      ? "var(--color-text)"
                                      : "var(--color-subtle)",
                                  }}
                                />
                                {available ? "Available" : "Sold out"}
                              </button>
                            </div>

                            <div className="flex items-start justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  removeItem(section.id, item.id)
                                }
                                className="mt-5 inline-flex items-center justify-center rounded-full p-1.5"
                                style={{
                                  border: "1px solid var(--color-border)",
                                  color: "var(--color-subtle)",
                                }}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => addItem(section.id)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px]"
                        style={{
                          border: "1px dashed var(--color-border)",
                          color: "var(--color-subtle)",
                          backgroundColor: "var(--color-surface)",
                        }}
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add item
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: accent & helper */}
          <div className="space-y-4">
            <div
              className="rounded-2xl border px-4 py-4 sm:px-5 sm:py-5"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div className="mb-3 space-y-1">
                <p className="text-xs font-medium text-[var(--color-text)]">
                  Accent colour
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Used on the public menu for highlights and prices.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="color"
                  className="h-9 w-10 cursor-pointer rounded bg-transparent"
                  value={accentHex}
                  onChange={(e) => setAccentHex(e.target.value)}
                  disabled={loading}
                />
                <Input
                  value={accentHex}
                  onChange={(e) => setAccentHex(e.target.value)}
                  className="h-9 rounded-2xl text-xs"
                  style={{
                    backgroundColor: "var(--color-bg)",
                    color: "var(--color-text)",
                    borderColor: "var(--color-border)",
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div
              className="rounded-2xl border px-4 py-4 text-[11px]"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-subtle)",
              }}
            >
              <p className="mb-1 font-medium text-[var(--color-text)]">
                How to use this with Kompi Codes
              </p>
              <ol className="list-decimal space-y-1 pl-4">
                <li>Create or update this menu and save.</li>
                <li>
                  Click{" "}
                  <span className="font-semibold">Create Kompi Code</span> at
                  the top to auto-generate a QR for this menu.
                </li>
                <li>
                  You&apos;ll be taken to the Kompi Code where you can tweak
                  styling and download it.
                </li>
              </ol>
            </div>
          </div>
        </div>

        {loading && (
          <p
            className="text-[11px]"
            style={{ color: "var(--color-subtle)" }}
          >
            Loading menu…
          </p>
        )}
      </div>
    </main>
  );
}
