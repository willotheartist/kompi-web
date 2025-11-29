"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowLeft, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

export default function NewQrMenuPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [accentHex, setAccentHex] = useState("#C4F28B");
  const [sections, setSections] = useState<MenuSection[]>([
    {
      id: `sec-${Date.now()}`,
      name: "Starters",
      items: [],
    },
  ]);

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
      name: "",
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
    const rawTitle = title.trim();
    const rawSlug = slug.trim();

    if (!rawTitle) {
      toast.error("Give your menu a name.");
      return;
    }

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
        title: rawTitle,
        slug: finalSlug,
        description: description.trim() || null,
        accentHex: accentHex || "#C4F28B",
        sections,
      };

      const res = await fetch("/api/qr-menus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Failed to create menu";
        try {
          const txt = await res.text();
          if (txt) msg = txt;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      toast.success("Menu created");
      router.push("/dashboard/qr-menus");
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "Failed to create menu";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  const publicPath = slug ? `/m/${slug}` : "/m/<slug>";

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
            <Button
              type="button"
              size="sm"
              className="h-8 rounded-full px-4 text-[11px] font-medium"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving…" : "Create menu"}
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          {/* Left: core info + sections */}
          <div className="space-y-5">
            {/* Core info */}
            <div
              className="rounded-3xl border px-5 py-5 sm:px-6 sm:py-6"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div className="mb-4 space-y-1">
                <p className="text-xs font-medium text-[var(--color-text)]">
                  Menu details
                </p>
                <p
                  className="text-[11px]"
                  style={{ color: "var(--color-subtle)" }}
                >
                  Name your menu and set a short URL.
                </p>
              </div>

              <div className="space-y-4">
                {/* Menu name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Menu name
                  </label>
                  <div
                    className="border-b pb-2 text-sm"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Pin-Pan Bar &amp; Grill"
                      className="h-auto w-full border-none bg-transparent px-0 py-0 text-sm focus-visible:ring-0"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                        color: "var(--color-text)",
                      }}
                    />
                  </div>
                </div>

                {/* Slug */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Public slug
                  </label>
                  <div className="flex flex-col gap-1.5">
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
                      <div
                        className="flex-1 border-b pb-2"
                        style={{ borderColor: "var(--color-border)" }}
                      >
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
                          className="h-auto w-full border-none bg-transparent px-0 py-0 text-sm focus-visible:ring-0"
                          style={{
                            boxShadow: "none",
                            borderRadius: 0,
                            color: "var(--color-text)",
                          }}
                        />
                      </div>
                    </div>
                    <p
                      className="text-[11px]"
                      style={{ color: "var(--color-subtle)" }}
                    >
                      Public URL: {publicPath}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--color-text)]">
                    Description (optional)
                  </label>
                  <div
                    className="border-b pb-2"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Neighbourhood bar & grill with craft beers, cocktails and comfort food."
                      className="w-full resize-none border-none bg-transparent px-0 py-0 text-sm focus-visible:ring-0"
                      style={{
                        boxShadow: "none",
                        borderRadius: 0,
                        color: "var(--color-text)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sections + items */}
            <div
              className="rounded-3xl border px-5 py-5 sm:px-6 sm:py-6"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-[var(--color-text)]">
                    Sections & items
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: "var(--color-subtle)" }}
                  >
                    Organise dishes into sections like Starters, Mains, Desserts
                    or Drinks.
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="h-8 rounded-full px-3 text-[11px]"
                  onClick={addSection}
                  disabled={saving}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  Add section
                </Button>
              </div>

              <div className="space-y-4">
                {sections.map((section) => (
                  <div
                    key={section.id}
                    className="rounded-3xl border px-4 py-4"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-bg)",
                    }}
                  >
                    {/* Section header */}
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div
                        className="flex-1 border-b pb-2"
                        style={{ borderColor: "var(--color-border)" }}
                      >
                        <Input
                          value={section.name}
                          onChange={(e) =>
                            updateSectionName(section.id, e.target.value)
                          }
                          className="h-auto w-full border-none bg-transparent px-0 py-0 text-base font-semibold focus-visible:ring-0"
                          style={{
                            boxShadow: "none",
                            borderRadius: 0,
                            color: "var(--color-text)",
                          }}
                          placeholder="Section name (e.g. Starters)"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="inline-flex items-center justify-center rounded-full p-1.5"
                        style={{
                          border: "1px solid var(--color-border)",
                          color: "var(--color-subtle)",
                          backgroundColor: "var(--color-surface)",
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                      {section.items.map((item) => {
                        const available = item.isAvailable !== false;

                        return (
                          <div
                            key={item.id}
                            className="rounded-3xl bg-[var(--color-surface)] px-3 py-3"
                          >
                            {/* Name + description */}
                            <div className="space-y-2">
                              <div
                                className="border-b pb-2"
                                style={{ borderColor: "var(--color-border)" }}
                              >
                                <Input
                                  value={item.name}
                                  onChange={(e) =>
                                    updateItem(section.id, item.id, {
                                      name: e.target.value,
                                    })
                                  }
                                  className="h-auto w-full border-none bg-transparent px-0 py-0 text-sm font-medium focus-visible:ring-0"
                                  style={{
                                    boxShadow: "none",
                                    borderRadius: 0,
                                    color: "var(--color-text)",
                                  }}
                                  placeholder="Item name"
                                />
                              </div>

                              <div
                                className="border-b pb-2"
                                style={{ borderColor: "var(--color-border)" }}
                              >
                                <Textarea
                                  value={item.description || ""}
                                  onChange={(e) =>
                                    updateItem(section.id, item.id, {
                                      description: e.target.value,
                                    })
                                  }
                                  rows={2}
                                  className="w-full resize-none border-none bg-transparent px-0 py-0 text-sm focus-visible:ring-0"
                                  style={{
                                    boxShadow: "none",
                                    borderRadius: 0,
                                    color: "var(--color-text)",
                                  }}
                                  placeholder="Short description"
                                />
                              </div>
                            </div>

                            {/* Badge + price + delete */}
                            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end">
                              <div className="flex-1 space-y-1.5">
                                <label className="text-[11px] font-medium text-[var(--color-text)]">
                                  Badge (optional)
                                </label>
                                <div
                                  className="border-b pb-2"
                                  style={{ borderColor: "var(--color-border)" }}
                                >
                                  <Input
                                    value={item.badge || ""}
                                    onChange={(e) =>
                                      updateItem(section.id, item.id, {
                                        badge: e.target.value,
                                      })
                                    }
                                    className="h-auto w-full border-none bg-transparent px-0 py-0 text-sm focus-visible:ring-0"
                                    style={{
                                      boxShadow: "none",
                                      borderRadius: 0,
                                      color: "var(--color-text)",
                                    }}
                                    placeholder="e.g. New, Spicy, Vegan"
                                  />
                                </div>
                              </div>

                              <div className="w-28 space-y-1.5">
                                <label className="text-[11px] font-medium text-[var(--color-text)]">
                                  Price
                                </label>
                                <div
                                  className="border-b pb-2"
                                  style={{ borderColor: "var(--color-border)" }}
                                >
                                  <Input
                                    value={item.price || ""}
                                    onChange={(e) =>
                                      updateItem(section.id, item.id, {
                                        price: e.target.value,
                                      })
                                    }
                                    className="h-auto w-full border-none bg-transparent px-0 py-0 text-sm focus-visible:ring-0"
                                    style={{
                                      boxShadow: "none",
                                      borderRadius: 0,
                                      color: "var(--color-text)",
                                    }}
                                    placeholder="£9.50"
                                  />
                                </div>

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

                              <div className="flex items-end justify-end">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeItem(section.id, item.id)
                                  }
                                  className="inline-flex items-center justify-center rounded-full p-1.5"
                                  style={{
                                    border: "1px solid var(--color-border)",
                                    color: "var(--color-subtle)",
                                    backgroundColor: "var(--color-bg)",
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => addItem(section.id)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px]"
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
              className="rounded-3xl border px-5 py-5 sm:px-6 sm:py-6"
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
                />
                <div
                  className="flex-1 border-b pb-2"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <Input
                    value={accentHex}
                    onChange={(e) => setAccentHex(e.target.value)}
                    className="h-auto w-full border-none bg-transparent px-0 py-0 text-xs focus-visible:ring-0"
                    style={{
                      boxShadow: "none",
                      borderRadius: 0,
                      color: "var(--color-text)",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl border px-5 py-5 text-[11px]"
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
                <li>Create this menu and save it.</li>
                <li>Copy the public URL {publicPath}.</li>
                <li>
                  Generate a Kompi Code that points to this URL and print it on
                  your tables, flyers or posters.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
