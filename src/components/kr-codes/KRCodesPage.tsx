"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QRCode from "react-qr-code";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2 } from "lucide-react";

const FormSchema = z.object({
  title: z.string().max(120).optional(),
  destination: z.string().min(1, "Destination is required"),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

type KRCodeStyle = {
  fg?: string;
  bg?: string;
  size?: number;
  margin?: number;
  ecLevel?: "L" | "M" | "Q" | "H";
  [key: string]: unknown;
};

type KRCode = {
  id: string;
  title: string | null;
  destination: string;
  style: KRCodeStyle | null;
  createdAt: string;
  type?: string | null;
  totalClicks?: number | null;
};

type ListResponse = {
  workspace: { id: string; name: string } | null;
  codes: KRCode[];
};

const CONTENT_TYPES = [
  {
    id: "website",
    label: "URL",
    description: "Opens a website or landing page.",
  },
  {
    id: "file",
    label: "File / PDF",
    description: "Opens a PDF, image, or hosted document.",
  },
  {
    id: "app",
    label: "App / Store",
    description: "Links people to an app store page or download.",
  },
  {
    id: "social",
    label: "Social / Bio",
    description: "Leads to a social profile or Kompi bio page.",
  },
  {
    id: "other",
    label: "Other link",
    description: "Any other URL you want to track.",
  },
] as const;

type ContentTypeId = (typeof CONTENT_TYPES)[number]["id"];

type StyleState = {
  fg: string;
  bg: string;
  size: number;
  margin: number;
  ecLevel: "L" | "M" | "Q" | "H";
  logoUrl?: string | null;
};

const DEFAULT_STYLE: StyleState = {
  fg: "#FFFFFF",
  bg: "#020617",
  size: 192,
  margin: 2,
  ecLevel: "M",
  logoUrl: null,
};

function destinationPlaceholder(type: ContentTypeId) {
  switch (type) {
    case "website":
      return "https://example.com/landing";
    case "file":
      return "https://example.com/menu.pdf";
    case "app":
      return "https://apps.apple.com/app/...";
    case "social":
      return "https://instagram.com/yourhandle";
    case "other":
    default:
      return "https://...";
  }
}

export default function KRCodesPage() {
  const [workspace, setWorkspace] =
    useState<ListResponse["workspace"]>(null);
  const [codes, setCodes] = useState<KRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [style, setStyle] = useState<StyleState>(DEFAULT_STYLE);
  const [contentType, setContentType] =
    useState<ContentTypeId>("website");
  const [hoverType, setHoverType] =
    useState<ContentTypeId | null>(null);
  const [showUtms, setShowUtms] = useState(false);

  const [uploadingLogoFor, setUploadingLogoFor] = useState<string | null>(null);

  // which code’s download popover is open
  const [downloadMenuFor, setDownloadMenuFor] = useState<string | null>(
    null
  );
  // which code is currently asking for delete confirmation
  const [deleteIntentFor, setDeleteIntentFor] = useState<string | null>(
    null
  );

  const form = useForm<FormValues>({
    // @ts-ignore - zodResolver schema type signature mismatch
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      destination: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    },
  });

  const watchDestination = form.watch("destination");
  const utm_source = form.watch("utm_source");
  const utm_medium = form.watch("utm_medium");
  const utm_campaign = form.watch("utm_campaign");
  const utm_term = form.watch("utm_term");
  const utm_content = form.watch("utm_content");

  const activeType =
    CONTENT_TYPES.find((t) => t.id === (hoverType ?? contentType)) ??
    CONTENT_TYPES[0];

  const urlPreview = useMemo(() => {
    const destination = watchDestination;
    if (!destination) return "";

    try {
      const u = new URL(destination);
      if (utm_source) u.searchParams.set("utm_source", utm_source);
      if (utm_medium) u.searchParams.set("utm_medium", utm_medium);
      if (utm_campaign)
        u.searchParams.set("utm_campaign", utm_campaign);
      if (utm_term) u.searchParams.set("utm_term", utm_term);
      if (utm_content)
        u.searchParams.set("utm_content", utm_content);
      return u.toString();
    } catch {
      return destination;
    }
  }, [
    watchDestination,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  ]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/kr-codes", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }
        const data: ListResponse = await res.json();
        if (!cancelled) {
          setWorkspace(data.workspace);
          setCodes(data.codes ?? []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load KR Codes");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function onSubmit(values: FormValues) {
    setCreating(true);
    setError(null);

    const payload = {
      title: values.title || undefined,
      destination: urlPreview || values.destination,
      createShortLink: true,
      type: contentType,
      utm: {
        source: values.utm_source || undefined,
        medium: values.utm_medium || undefined,
        campaign: values.utm_campaign || undefined,
        term: values.utm_term || undefined,
        content: values.utm_content || undefined,
      },
      style: {
        fg: style.fg,
        bg: style.bg,
        size: style.size,
        margin: style.margin,
        ecLevel: style.ecLevel,
        logoUrl: style.logoUrl ?? null,
      },
    };

    try {
      const res = await fetch("/api/kr-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Failed to create KR Code: ${res.status} ${text}`,
        );
      }

      const created: KRCode = await res.json();
      setCodes((prev) => [created, ...prev]);
      form.reset();
      setStyle(DEFAULT_STYLE);
      setContentType("website");
      setShowUtms(false);
    } catch (err) {
      console.error(err);
      setError("Failed to create KR Code");
    } finally {
      setCreating(false);
    }
  }

  // Prefill the create form from an existing KR Code (lightweight "edit" flow).
  function handleEdit(code: KRCode) {
    form.reset({
      title: code.title ?? "",
      destination: code.destination,
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    });

    const styleFromCode = code.style;
    if (styleFromCode) {
      const { fg, bg, size, margin, ecLevel, logoUrl } = styleFromCode;
      setStyle((prev) => ({
        fg: (fg as string) || prev.fg,
        bg: (bg as string) || prev.bg,
        size: (size as number) || prev.size,
        margin: (margin as number) || prev.margin,
        ecLevel:
          (ecLevel as StyleState["ecLevel"]) || prev.ecLevel,
        logoUrl:
          (logoUrl as string | null | undefined) ??
          prev.logoUrl ??
          null,
      }));
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Delete KR Code and remove from list (called only after branded confirm).
  async function handleDelete(code: KRCode) {
    setError(null);
    try {
      const res = await fetch(`/api/kr-codes/${code.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }
      setCodes((prev) => prev.filter((c) => c.id !== code.id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete KR Code");
    } finally {
      setDeleteIntentFor((current) =>
        current === code.id ? null : current
      );
    }
  }

  return (
    <main className="wf-dashboard-main w-full bg-[var(--color-bg)]">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-8 md:gap-8 md:pb-12">
        {/* Dashboard/PageHeader */}
        <header className="wf-dashboard-header flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-3xl">
            KR Codes
            <span className="ml-1 font-serif italic text-[color:var(--color-subtle)]">
              ™
            </span>
          </h1>
          <p className="max-w-xl text-sm text-[color:var(--color-subtle)] md:text-base">
            Create new codes and track scans across all your campaigns
            from a single workspace view.
          </p>
        </header>

        {/* Row 1: create + preview */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
          {/* LEFT: create */}
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <CardHeader className="border-b border-[var(--color-border)] pb-4">
              <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                Create KR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {/* Hover banner */}
              <div className="rounded-xl bg-[var(--color-bg)] px-4 py-2 text-xs text-[color:var(--color-text)]">
                {activeType.description}
              </div>

              {/* Type pills */}
              <div className="flex flex-wrap gap-2">
                {CONTENT_TYPES.map((t) => {
                  const active = t.id === contentType;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setContentType(t.id)}
                      onMouseEnter={() => setHoverType(t.id)}
                      onMouseLeave={() => setHoverType(null)}
                      className={[
                        "rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] border transition",
                        active
                          ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)] shadow-sm"
                          : "border-[var(--color-border)] bg-[var(--color-bg)] text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]",
                      ].join(" ")}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>

              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[color:var(--color-text)]">
                    Title (optional)
                  </label>
                  <Input
                    className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                    placeholder="Spring campaign flyer"
                    {...form.register("title")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[color:var(--color-text)]">
                    Destination URL
                  </label>
                  <Input
                    className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                    placeholder={destinationPlaceholder(contentType)}
                    {...form.register("destination")}
                  />
                  {form.formState.errors.destination && (
                    <p className="text-xs text-red-400">
                      {form.formState.errors.destination.message}
                    </p>
                  )}
                </div>

                {/* UTM toggle */}
                <button
                  type="button"
                  onClick={() => setShowUtms((s) => !s)}
                  className="text-[11px] font-medium text-[color:var(--color-accent)] hover:underline"
                >
                  {showUtms
                    ? "Hide UTM tracking"
                    : "Add UTM tracking (optional)"}
                </button>

                {showUtms && (
                  <div className="space-y-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          UTM Source
                        </label>
                        <Input
                          className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                          placeholder="poster"
                          {...form.register("utm_source")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          UTM Medium
                        </label>
                        <Input
                          className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                          placeholder="qr"
                          {...form.register("utm_medium")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          UTM Campaign
                        </label>
                        <Input
                          className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                          placeholder="spring_launch"
                          {...form.register("utm_campaign")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          UTM Term
                        </label>
                        <Input
                          className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                          placeholder="headline_a"
                          {...form.register("utm_term")}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[color:var(--color-text)]">
                        UTM Content (optional)
                      </label>
                      <Textarea
                        rows={2}
                        className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                        placeholder="Any extra labels for this code…"
                        {...form.register("utm_content")}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-xs text-[color:var(--color-subtle)]">
                    <div>Destination preview:</div>
                    <div className="mt-1 break-all text-[11px] text-[color:var(--color-text)]">
                      {urlPreview || "—"}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={creating}
                    className="md:min-w-[160px] rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[color:var(--color-text)] hover:opacity-90 disabled:opacity-70"
                  >
                    {creating ? "Creating…" : "Create KR Code"}
                  </Button>
                </div>

                {error && (
                  <p className="pt-1 text-xs text-red-400">{error}</p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* RIGHT: preview + design */}
          <Card className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <CardHeader className="border-b border-[var(--color-border)] pb-4">
              <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                Live Preview &amp; Design
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 pt-4">
              {/* Preview */}
              <div className="flex flex-col items-center justify-center gap-4">
                <div
                  className="rounded-2xl p-4"
                  style={{ backgroundColor: style.bg }}
                >
                  <div className="relative inline-block">
                    <QRCode
                      value={urlPreview || "https://kompi.app"}
                      size={style.size}
                      fgColor={style.fg}
                      bgColor={style.bg}
                      level={style.logoUrl ? "H" : style.ecLevel}
                    />
                    {style.logoUrl && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <div
                          className="flex items-center justify-center rounded-md bg-white/90"
                          style={{
                            width: style.size * 0.22,
                            height: style.size * 0.22,
                          }}
                        >
                          <img
                            src={style.logoUrl}
                            alt="Logo"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="max-w-xs text-center text-xs text-[color:var(--color-subtle)]">
                  This is a preview of your KR Code. The final printed code
                  will use your workspace’s domain and redirect through Kompi
                  for full analytics.
                </p>
              </div>

              <div className="h-px w-full bg-[var(--color-border)]" />

              {/* Design controls */}
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[color:var(--color-text)]">
                      Foreground (dots)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
                        value={style.fg}
                        onChange={(e) =>
                          setStyle((s) => ({ ...s, fg: e.target.value }))
                        }
                      />
                      <Input
                        className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)]"
                        value={style.fg}
                        onChange={(e) =>
                          setStyle((s) => ({ ...s, fg: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-[color:var(--color-text)]">
                      Background
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
                        value={style.bg}
                        onChange={(e) =>
                          setStyle((s) => ({ ...s, bg: e.target.value }))
                        }
                      />
                      <Input
                        className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)]"
                        value={style.bg}
                        onChange={(e) =>
                          setStyle((s) => ({ ...s, bg: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[color:var(--color-text)]">
                      Size ({style.size}px)
                    </label>
                    <input
                      type="range"
                      min={128}
                      max={320}
                      value={style.size}
                      onChange={(e) =>
                        setStyle((s) => ({
                          ...s,
                          size: Number(e.target.value),
                        }))
                      }
                      className="w-full accent-[var(--color-accent)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[color:var(--color-text)]">
                      Margin ({style.margin})
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={8}
                      value={style.margin}
                      onChange={(e) =>
                        setStyle((s) => ({
                          ...s,
                          margin: Number(e.target.value),
                        }))
                      }
                      className="w-full accent-[var(--color-accent)]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[color:var(--color-text)]">
                    Error correction
                  </label>
                  <div className="flex gap-2 text-xs">
                    {(["L", "M", "Q", "H"] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        className={`rounded-full border px-3 py-1 text-[11px] ${
                          style.ecLevel === level
                            ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-bg)]"
                            : "border-[var(--color-border)] text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
                        }`}
                        onClick={() =>
                          setStyle((s) => ({ ...s, ecLevel: level }))
                        }
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-[color:var(--color-subtle)]">
                  Frames, logo upload, and advanced shapes will plug into
                  this same design system later – without changing how you
                  create codes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: full-width "Your KR Codes" */}
        <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-2 border-b border-[var(--color-border)] pb-4">
            <div>
              <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                Your KR Codes
              </CardTitle>
              <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                {workspace
                  ? `Workspace: ${workspace.name}`
                  : "No workspace yet — we’ll create one when you generate your first code."}
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3"
                  >
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-40 rounded-full" />
                      <Skeleton className="h-3 w-64 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : codes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center text-sm text-[color:var(--color-subtle)]">
                No KR Codes yet. Create your first one above to start
                tracking scans.
              </div>
            ) : (
              <div className="space-y-3">
                {codes.map((code) => {
                  const isMenuOpen = downloadMenuFor === code.id;
                  const isDeleteOpen = deleteIntentFor === code.id;
                  return (
                    <div
                      key={code.id}
                      className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="hidden rounded-xl bg-[var(--color-surface)] p-2 md:block">
                          <div className="relative inline-block">
                            {(() => {
                              const styleFromCode = (code.style ??
                                {}) as KRCodeStyle;
                              const hasLogo =
                                !!(styleFromCode.logoUrl as string | null | undefined);
                              const ecLevel =
                                (hasLogo ? "H" : styleFromCode.ecLevel) ?? "M";
                              return (
                                <QRCode
                                  value={code.destination}
                                  size={56}
                                  fgColor={styleFromCode.fg ?? "#FFFFFF"}
                                  bgColor={styleFromCode.bg ?? "#020617"}
                                  level={ecLevel as "L" | "M" | "Q" | "H"}
                                />
                              );
                            })()}
                            {(() => {
                              const styleFromCode = (code.style ??
                                {}) as KRCodeStyle;
                              const logo = styleFromCode.logoUrl as
                                | string
                                | null
                                | undefined;
                              if (!logo) return null;
                              return (
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                  <div
                                    className="flex items-center justify-center rounded-sm bg-white/90"
                                    style={{
                                      width: 56 * 0.2,
                                      height: 56 * 0.2,
                                    }}
                                  >
                                    <img
                                      src={logo}
                                      alt="Logo"
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-[color:var(--color-text)]">
                            {code.title || "Untitled KR Code"}
                          </div>
                          <div className="break-all text-[11px] text-[color:var(--color-subtle)]">
                            {code.destination}
                          </div>
                          <div className="text-[11px] text-[color:var(--color-subtle)]">
                            {code.type ? `Type: ${code.type} • ` : ""}
                            Created{" "}
                            {new Date(
                              code.createdAt,
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs">
                        <div className="flex flex-col items-end">
                          <span className="text-[color:var(--color-subtle)]">
                            Total scans
                          </span>
                          <span className="text-base font-semibold text-[color:var(--color-text)]">
                            {code.totalClicks ?? 0}
                          </span>
                        </div>

                        {/* Actions: Edit / Delete / Download + inline confirm */}
                        <div className="relative flex items-center gap-1.5">
                          {/* Edit icon button */}
                          <button
                            type="button"
                            onClick={() => handleEdit(code)}
                            aria-label="Edit KR Code"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>

                          {/* Logo upload */}
                          <div className="relative ml-1">
                            <input
                              id={`logo-upload-${code.id}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setUploadingLogoFor(code.id);
                                try {
                                  const fd = new FormData();
                                  fd.append("file", file);
                                  const res = await fetch(
                                    `/api/kr-codes/${code.id}/logo`,
                                    {
                                      method: "POST",
                                      body: fd,
                                      credentials: "include",
                                    },
                                  );
                                  if (!res.ok) {
                                    console.error(
                                      "Logo upload failed",
                                      await res.text(),
                                    );
                                  } else {
                                    const json = await res.json();
                                    setStyle((s) => ({
                                      ...s,
                                      logoUrl: json.logoUrl as string,
                                    }));
                                    setCodes((prev) =>
                                      prev.map((c) =>
                                        c.id === code.id
                                          ? {
                                              ...c,
                                              style: {
                                                ...(c.style ?? {}),
                                                logoUrl: json.logoUrl,
                                                ecLevel: "H",
                                              },
                                            }
                                          : c,
                                      ),
                                    );
                                  }
                                } catch (err) {
                                  console.error("Logo upload error", err);
                                } finally {
                                  setUploadingLogoFor((current) =>
                                    current === code.id ? null : current,
                                  );
                                  e.target.value = "";
                                }
                              }}
                            />
                            <label
                              htmlFor={`logo-upload-${code.id}`}
                              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] font-medium text-[color:var(--color-text)] hover:bg-[var(--color-bg)] cursor-pointer"
                            >
                              {uploadingLogoFor === code.id
                                ? "Uploading…"
                                : "Upload logo"}
                            </label>
                          </div>

                          {/* Delete icon button (opens confirm) */}
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteIntentFor((current) =>
                                current === code.id ? null : code.id
                              )
                            }
                            aria-label="Delete KR Code"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-red-500 hover:bg-[var(--color-bg)]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          <Link
                            href={`/kr-codes/${code.id}`}
                            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] font-medium text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                          >
                            Analytics
                          </Link>

                          {/* Download button + popover */}
                          <div className="relative ml-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-xs text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                              onClick={() =>
                                setDownloadMenuFor((current) =>
                                  current === code.id ? null : code.id
                                )
                              }
                            >
                              Download
                            </Button>

                            {isMenuOpen && (
                              <div
                                className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-md"
                                onMouseLeave={() =>
                                  setDownloadMenuFor(null)
                                }
                              >
                                <Link
                                  href={`/api/kr-codes/${code.id}/svg`}
                                  target="_blank"
                                  className="block rounded-xl px-3 py-2 text-[11px] text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                                  onClick={() => setDownloadMenuFor(null)}
                                >
                                  Download SVG
                                </Link>
                                <Link
                                  href={`/api/kr-codes/${code.id}/png`}
                                  target="_blank"
                                  className="block rounded-xl px-3 py-2 text-[11px] text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                                  onClick={() => setDownloadMenuFor(null)}
                                >
                                  Download PNG
                                </Link>
                              </div>
                            )}
                          </div>

                          {/* Inline delete confirmation popover */}
                          {isDeleteOpen && (
                            <div className="absolute right-0 top-full z-20 mt-2 w-60 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-md">
                              <p className="text-xs font-medium text-[color:var(--color-text)]">
                                Delete this{" "}
                                <span
                                  style={{
                                    fontFamily:
                                      "Instrument Serif, system-ui, serif",
                                    fontStyle: "italic",
                                  }}
                                >
                                  code
                                </span>
                                ?
                              </p>
                              <p className="mt-1 text-[11px] text-[color:var(--color-subtle)]">
                                This action can’t be undone and will stop
                                tracking scans from this KR Code.
                              </p>
                              <div className="mt-3 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleDelete(code)}
                                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-text)] px-3 py-1.5 text-xs font-semibold text-[var(--color-bg)] hover:opacity-90"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteIntentFor(null)}
                                  className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text)] hover:bg-[var(--color-surface)]"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
