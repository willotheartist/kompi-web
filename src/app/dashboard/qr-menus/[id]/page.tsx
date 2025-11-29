// src/app/dashboard/qr-menus/[id]/page.tsx
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
  logoUrl: string | null;
  accentHex: string | null;
  backgroundHex: string | null;
  sections: MenuSection[] | null;
};

export default function EditQrMenuPage() {
  const params = useParams();
  const router = useRouter();
  const id = (params?.id as string) || "";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [menu, setMenu] = useState<MenuData | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [logoUrl, setLogoUrl] = useState("");
  const [accentHex, setAccentHex] = useState("#ff571f");
  const [backgroundHex, setBackgroundHex] = useState("#050609");

  const [sections, setSections] = useState<MenuSection[]>([]);

  // Shared "Typeform-ish" input style: flat, underlined, no box, no shadows.
  const fieldStyle = {
    backgroundColor: "transparent",
    borderRadius: 0,
    border: "none",
    borderBottom: "1px solid var(--color-border)",
    color: "var(--color-text)",
    paddingLeft: 0,
    paddingRight: 0,
    boxShadow: "none",
    outline: "none",
  } as const;

  const textAreaStyle = {
    ...fieldStyle,
    paddingTop: "0.35rem",
    paddingBottom: "0.35rem",
    minHeight: "3.5rem",
  } as const;

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
        setLogoUrl(m.logoUrl || "");
        setAccentHex(m.accentHex || "#ff571f");
        setBackgroundHex(m.backgroundHex || "#050609");
        setSections(
          Array.isArray(m.sections) ? (m.sections as MenuSection[]) : []
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
      prev.map((s) => (s.id === sectionId ? { ...s, name } : s))
    );
  }

  function addItem(sectionId: string) {
    const newItem: MenuSectionItem = {
      id: `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: "New item",
      description: "",
      price: "",
      badge: "",
    };

    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
      )
    );
  }

  function removeItem(sectionId: string, itemId: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
          : s
      )
    );
  }

  function updateItem(
    sectionId: string,
    itemId: string,
    patch: Partial<MenuSectionItem>
  ) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId ? { ...i, ...patch } : i
              ),
            }
          : s
      )
    );
  }

  async function handleSave() {
    if (!id) {
      toast.error("Missing menu id");
      return;
    }

    const rawTitle = title.trim();
    const rawSlug = slug.trim();
    const rawLogo = logoUrl.trim();

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
        logoUrl: rawLogo || null,
        accentHex: accentHex || "#ff571f",
        backgroundHex: backgroundHex || "#050609",
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
        } catch {
          // ignore
        }
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
        } catch {
          // ignore body read errors
        }
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
                boxShadow: "none",
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
                    placeholder="New Restaurant"
                    className="h-9 rounded-none border-none shadow-none text-sm px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={fieldStyle}
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
                            .replace(/[^a-z0-9-]/g, "-")
                        )
                      }
                      placeholder="new-restaurant"
                      className="h-9 rounded-none border-none shadow-none text-sm px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={fieldStyle}
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
                    placeholder="Short description that appears at the top of the menu."
                    className="rounded-none border-none shadow-none text-sm px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={textAreaStyle}
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
                boxShadow: "none",
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
                    Organise dishes into sections like Starters, Mains,
                    Desserts or Drinks.
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

              <div className="space-y-6">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-2xl border px-4 py-4"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-bg)",
                      boxShadow: "none",
                    }}
                  >
                    {/* Section header */}
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Input
                        value={section.name}
                        onChange={(e) =>
                          updateSectionName(section.id, e.target.value)
                        }
                        className="h-9 text-sm font-medium border-none shadow-none rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        style={fieldStyle}
                        placeholder="Section name (e.g. Starters)"
                      />
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="inline-flex items-center justify-center rounded-full p-1.5"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-subtle)",
                          backgroundColor: "transparent",
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Items */}
                    <div className="space-y-5">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className="space-y-3 rounded-xl px-1 py-1"
                          style={{ boxShadow: "none" }}
                        >
                          {/* Name + description */}
                          <div className="space-y-1.5">
                            <Input
                              value={item.name}
                              onChange={(e) =>
                                updateItem(section.id, item.id, {
                                  name: e.target.value,
                                })
                              }
                              className="h-8 text-sm border-none shadow-none rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              style={fieldStyle}
                              placeholder="New item"
                            />
                            <Textarea
                              value={item.description || ""}
                              onChange={(e) =>
                                updateItem(section.id, item.id, {
                                  description: e.target.value,
                                })
                              }
                              rows={2}
                              className="text-xs border-none shadow-none rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              style={textAreaStyle}
                              placeholder="Short description"
                            />
                          </div>

                          {/* Badge + price + delete */}
                          <div className="mt-1 grid itemsEnd gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_40px]">
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
                                className="h-8 text-xs border-none shadow-none rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                style={fieldStyle}
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
                                className="h-8 text-xs border-none shadow-none rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                style={fieldStyle}
                                placeholder="£9.50"
                              />
                            </div>

                            <div className="flex items-end justify-end">
                              <button
                                type="button"
                                onClick={() => removeItem(section.id, item.id)}
                                className="inline-flex items-center justify-center rounded-full p-1.5"
                                style={{
                                  border: "1px solid var(--color-border)",
                                  color: "var(--color-subtle)",
                                  backgroundColor: "transparent",
                                }}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => addItem(section.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-dashed px-4 py-1.5 text-[11px]"
                        style={{
                          borderColor: "var(--color-border)",
                          color: "var(--color-subtle)",
                          backgroundColor: "transparent",
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

          {/* Right: branding & helper */}
          <div className="space-y-4">
            {/* Branding */}
            <div
              className="rounded-2xl border px-4 py-4 sm:px-5 sm:py-5"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
                boxShadow: "none",
              }}
            >
              <div className="mb-3 space-y-1">
                <p className="text-xs font-medium text-[var(--color-text)]">
                  Branding
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Logo, accent colour and page background used on the live QR
                  menu.
                </p>
              </div>

              <div className="space-y-3">
                {/* Logo URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Logo URL (optional)
                  </label>
                  <Input
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="h-9 rounded-none border-none shadow-none text-xs px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={fieldStyle}
                    placeholder="https://…/logo.png"
                    disabled={loading}
                  />
                  {logoUrl.trim() && (
                    <div className="mt-1 inline-flex items-center gap-2 text-[11px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoUrl}
                        alt="Logo preview"
                        className="h-6 w-6 rounded-full border border-[color:var(--color-border)] object-cover"
                      />
                      <span style={{ color: "var(--color-subtle)" }}>
                        Preview
                      </span>
                    </div>
                  )}
                </div>

                {/* Accent colour */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Accent colour
                  </label>
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
                      className="h-9 rounded-none border-none shadow-none text-xs px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={fieldStyle}
                      disabled={loading}
                    />
                  </div>
                  <p
                    className="text-[11px]"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Used for headings, badges and prices.
                  </p>
                </div>

                {/* Background colour */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Page background colour
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="h-9 w-10 cursor-pointer rounded bg-transparent"
                      value={backgroundHex}
                      onChange={(e) => setBackgroundHex(e.target.value)}
                      disabled={loading}
                    />
                    <Input
                      value={backgroundHex}
                      onChange={(e) => setBackgroundHex(e.target.value)}
                      className="h-9 rounded-none border-none shadow-none text-xs px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={fieldStyle}
                      disabled={loading}
                    />
                  </div>
                  <p
                    className="text-[11px]"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Used behind the whole menu page.
                  </p>
                </div>
              </div>
            </div>

            {/* Helper / QR instructions */}
            <div
              className="rounded-2xl border px-4 py-4 text-[11px]"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
                color: "var(--color-subtle)",
                boxShadow: "none",
              }}
            >
              <p className="mb-1 font-medium text-[var(--color-text)]">
                How to use this with Kompi Codes
              </p>
              <ol className="list-decimal space-y-1 pl-4">
                <li>Create or update this menu and save.</li>
                <li>Copy the public URL {publicPath || "/m/<slug>"}.</li>
                <li>
                  Generate a Kompi Code that points to this URL and print it on
                  your tables, flyers or posters.
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
