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
};

const DEFAULT_STYLE: StyleState = {
  fg: "#FFFFFF",
  bg: "#020617",
  size: 192,
  margin: 2,
  ecLevel: "M",
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

  const form = useForm<FormValues>({
    // NOTE: There is a known type mismatch between this version of zod
    // and @hookform/resolvers. Runtime behavior is correct; we just
    // silence TS here.
    // @ts-expect-error zodResolver schema type signature mismatch
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

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-100">
          KR Codes™
        </h1>
        <p className="text-sm text-slate-400">
          Create new codes and track scans across all your campaigns.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
        {/* LEFT: create + list */}
        <div className="flex flex-col gap-6">
          {/* Create card */}
          <Card className="bg-slate-950/70 border-slate-800">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-slate-100">
                Create KR Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Hover banner */}
              <div className="rounded-xl bg-slate-900/80 px-4 py-2 text-xs text-slate-200">
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
                        "rounded-full px-3 py-1.5 text-xs font-medium tracking-wide uppercase border transition",
                        active
                          ? "border-slate-100 bg-slate-100 text-slate-950 shadow-sm"
                          : "border-slate-700/80 bg-slate-900/40 text-slate-200 hover:border-slate-400/80 hover:bg-slate-900",
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
                  <label className="text-xs font-medium text-slate-300">
                    Title (optional)
                  </label>
                  <Input
                    className="bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500"
                    placeholder="Spring campaign flyer"
                    {...form.register("title")}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Destination URL
                  </label>
                  <Input
                    className="bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500"
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
                  className="text-[11px] text-sky-400 hover:underline"
                >
                  {showUtms
                    ? "Hide UTM tracking"
                    : "Add UTM tracking (optional)"}
                </button>

                {showUtms && (
                  <div className="space-y-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">
                          UTM Source
                        </label>
                        <Input
                          className="bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          placeholder="poster"
                          {...form.register("utm_source")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">
                          UTM Medium
                        </label>
                        <Input
                          className="bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          placeholder="qr"
                          {...form.register("utm_medium")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">
                          UTM Campaign
                        </label>
                        <Input
                          className="bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          placeholder="spring_launch"
                          {...form.register("utm_campaign")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-slate-300">
                          UTM Term
                        </label>
                        <Input
                          className="bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500"
                          placeholder="headline_a"
                          {...form.register("utm_term")}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        UTM Content (optional)
                      </label>
                      <Textarea
                        rows={2}
                        className="bg-slate-900/80 border-slate-700 text-slate-100 placeholder:text-slate-500"
                        placeholder="Any extra labels for this code…"
                        {...form.register("utm_content")}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-2">
                  <div className="text-xs text-slate-400">
                    <div>Destination preview:</div>
                    <div className="mt-1 break-all text-[11px] text-slate-200">
                      {urlPreview || "—"}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={creating}
                    className="md:min-w-[160px] bg-slate-100 text-slate-950 hover:bg-white"
                  >
                    {creating ? "Creating…" : "Create KR Code"}
                  </Button>
                </div>

                {error && (
                  <p className="text-xs text-red-400 pt-1">{error}</p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* List / tracking */}
          <Card className="bg-slate-950/70 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm font-semibold text-slate-100">
                  Your KR Codes
                </CardTitle>
                <p className="mt-1 text-xs text-slate-400">
                  {workspace
                    ? `Workspace: ${workspace.name}`
                    : "No workspace yet — we’ll create one when you generate your first code."}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3"
                    >
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-3 w-40" />
                        <Skeleton className="h-3 w-64" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : codes.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-6 text-center text-sm text-slate-400">
                  No KR Codes yet. Create your first one above to start
                  tracking scans.
                </div>
              ) : (
                <div className="space-y-3">
                  {codes.map((code) => (
                    <div
                      key={code.id}
                      className="flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="hidden md:block rounded-lg bg-slate-900/80 p-2">
                          <QRCode
                            value={code.destination}
                            size={56}
                            fgColor="#FFFFFF"
                            bgColor="#020617"
                            level="M"
                          />
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-slate-100">
                            {code.title || "Untitled KR Code"}
                          </div>
                          <div className="text-[11px] text-slate-400 break-all">
                            {code.destination}
                          </div>
                          <div className="text-[11px] text-slate-500">
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
                          <span className="text-slate-400">
                            Total scans
                          </span>
                          <span className="text-base font-semibold text-slate-100">
                            {code.totalClicks ?? 0}
                          </span>
                        </div>
                        <Link
                          href={`/api/kr-codes/${code.id}/svg`}
                          target="_blank"
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-700 text-xs text-slate-100 hover:bg-slate-900/80"
                          >
                            Download SVG
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: preview + design */}
        <Card className="bg-slate-950/70 border-slate-800 h-full flex flex-col">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-slate-100">
              Live Preview & Design
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            {/* Preview */}
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                className="rounded-2xl p-4"
                style={{ backgroundColor: style.bg }}
              >
                <QRCode
                  value={urlPreview || "https://kompi.app"}
                  size={style.size}
                  fgColor={style.fg}
                  bgColor={style.bg}
                  level={style.ecLevel}
                />
              </div>
              <p className="text-xs text-center text-slate-400 max-w-xs">
                This is a preview of your KR Code. The final printed code
                will use your workspace’s domain and redirect through
                Kompi for full analytics.
              </p>
            </div>

            <div className="h-px w-full bg-slate-800/80" />

            {/* Design controls */}
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Foreground (dots)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
                      value={style.fg}
                      onChange={(e) =>
                        setStyle((s) => ({ ...s, fg: e.target.value }))
                      }
                    />
                    <Input
                      className="bg-slate-900/80 border-slate-700 text-slate-100 text-xs"
                      value={style.fg}
                      onChange={(e) =>
                        setStyle((s) => ({ ...s, fg: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Background
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      className="h-8 w-10 cursor-pointer rounded border border-slate-700 bg-transparent"
                      value={style.bg}
                      onChange={(e) =>
                        setStyle((s) => ({ ...s, bg: e.target.value }))
                      }
                    />
                    <Input
                      className="bg-slate-900/80 border-slate-700 text-slate-100 text-xs"
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
                  <label className="text-xs font-medium text-slate-300">
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
                    className="w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
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
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">
                  Error correction
                </label>
                <div className="flex gap-2 text-xs">
                  {(["L", "M", "Q", "H"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`rounded-full px-3 py-1 border text-[11px] ${
                        style.ecLevel === level
                          ? "border-slate-100 bg-slate-100 text-slate-950"
                          : "border-slate-700 text-slate-300 hover:border-slate-400"
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

              <p className="text-[11px] text-slate-500">
                Frames, logo upload, and advanced shapes will plug into
                this same design system later – without changing how you
                create codes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
