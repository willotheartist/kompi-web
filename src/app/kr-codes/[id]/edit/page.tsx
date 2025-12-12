"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/* ---- Content type meta (simple, for editing only) ---- */

const CONTENT_TYPES = [
  { id: "url", label: "URL / Website" },
  { id: "file", label: "File / PDF" },
  { id: "social", label: "Social / Bio" },
  { id: "app", label: "App / Store" },
  { id: "sms", label: "SMS" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "text", label: "Plain text" },
  { id: "wifi", label: "Wi-Fi" },
  { id: "location", label: "Location / Maps" },
  { id: "multi", label: "Multi-URL (experimental)" },
] as const;

type ContentTypeId = (typeof CONTENT_TYPES)[number]["id"];

/* ---- Types that mirror /api/kr-codes/[id]/analytics ---- */

type AnalyticsResponse = {
  krcode: {
    id: string;
    title: string | null;
    destination: string;
    type: string | null;
    createdAt: string;
  };
  link: {
    id: string;
    code: string | null;
    targetUrl: string;
    clicks: number;
  } | null;
  summary: {
    totalScans: number;
    lastScanAt: string | null;
  };
};

export default function EditKrcodePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [data, setData] = useState<AnalyticsResponse | null>(null);

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");

  const [initialTitle, setInitialTitle] = useState("");
  const [initialDestination, setInitialDestination] = useState("");

  const [contentType, setContentType] = useState<ContentTypeId | "">("");
  const [initialType, setInitialType] = useState<ContentTypeId | "">("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [origin, setOrigin] = useState("");

  // Get window.origin in a client-safe way
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  // Load analytics (includes krcode + link + summary)
  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/kr-codes/${id}/analytics`, {
          credentials: "include",
        });

        if (!res.ok) {
          if (res.status === 404) {
            setError("Kompi Code not found");
          } else {
            setError(`Failed to load code (status ${res.status})`);
          }
          return;
        }

        const json = (await res.json()) as AnalyticsResponse;
        if (cancelled) return;

        setData(json);

        // Editable title
        const t = json.krcode.title ?? "";
        setTitle(t);
        setInitialTitle(t);

        // Editable destination is the FINAL target URL:
        // - if short link: link.targetUrl
        // - else: krcode.destination
        const effectiveDestination =
          json.link?.targetUrl ?? json.krcode.destination;
        setDestination(effectiveDestination);
        setInitialDestination(effectiveDestination);

        // Editable content type (purely metadata)
        const ct = (json.krcode.type as ContentTypeId | null) ?? "";
        setContentType(ct || "");
        setInitialType(ct || "");
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load Kompi Code");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const hasShortLink = !!data?.link?.code;

  const shortUrl = useMemo(() => {
    if (!origin || !data?.link?.code) return "";
    return `${origin}/r/${data.link.code}`;
  }, [origin, data?.link?.code]);

  async function handleSave() {
    if (!id || !data) return;
    setSaving(true);
    setError(null);

    try {
      const trimmedTitle = title.trim();
      const trimmedDest = destination.trim();

      const payload: {
        title?: string | null;
        destination?: string;
        type?: string | null;
      } = {};

      // Only send fields that changed
      if (trimmedTitle !== initialTitle) {
        payload.title = trimmedTitle || null;
      }

      if (trimmedDest && trimmedDest !== initialDestination) {
        // This is the FINAL target URL (not the /r/ redirect)
        payload.destination = trimmedDest;
      }

      if (contentType !== initialType) {
        payload.type = contentType || null;
      }

      if (
        !("title" in payload) &&
        !("destination" in payload) &&
        !("type" in payload)
      ) {
        // Nothing changed; just go back
        router.push("/kr-codes");
        return;
      }

      const res = await fetch(`/api/kr-codes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(
          `Failed to save changes: ${res.status}${
            text ? ` – ${text}` : ""
          }`,
        );
      }

      router.push("/kr-codes");
    } catch (err) {
      console.error(err);
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  }

  if (!id) {
    return (
      <main className="wf-dashboard-main w-full bg-[var(--color-bg)]">
        <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-8">
          <p className="text-sm text-[color:var(--color-subtle)]">
            Missing Kompi Code id.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="wf-dashboard-main w-full bg-[var(--color-bg)]">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-3xl">
              Edit your Kompi Code
            </h1>
            <p className="mt-1 text-sm text-[color:var(--color-subtle)]">
              Update the title, content type, and where this code sends people.
              Design and analytics stay in sync.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {id && (
              <Link
                href={`/kr-codes/${id}`}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
              >
                View analytics
              </Link>
            )}
            <Link
              href="/kr-codes"
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
            >
              Back to Kompi Codes
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-60 w-full rounded-2xl" />
          </div>
        ) : error ? (
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <CardContent className="p-6">
              <p className="text-sm text-red-400">{error}</p>
            </CardContent>
          </Card>
        ) : !data ? (
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <CardContent className="p-6">
              <p className="text-sm text-[color:var(--color-subtle)]">
                Kompi Code not found.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            {/* LEFT: Details form */}
            <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
              <CardHeader className="border-b border-[var(--color-border)] pb-4">
                <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                  Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[color:var(--color-text)]">
                    Title{" "}
                    <span className="font-normal text-[color:var(--color-subtle)]">
                      (optional)
                    </span>
                  </label>
                  <Input
                    className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                    placeholder="Spring campaign flyer"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Content type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[color:var(--color-text)]">
                    Content type{" "}
                    <span className="font-normal text-[color:var(--color-subtle)]">
                      (for organization only)
                    </span>
                  </label>
                  <select
                    className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-xs text-[color:var(--color-text)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                    value={contentType}
                    onChange={(e) =>
                      setContentType(
                        (e.target.value as ContentTypeId) || "",
                      )
                    }
                  >
                    <option value="">Not set</option>
                    {CONTENT_TYPES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <p className="pt-1 text-[11px] text-[color:var(--color-subtle)]">
                    This doesn&apos;t change how the QR behaves – it just helps
                    keep your Kompi Codes organized.
                  </p>
                </div>

                {/* Destination */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[color:var(--color-text)]">
                    Final destination URL
                  </label>
                  <Input
                    className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                    placeholder="https://your-landing-page.com"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                  <p className="pt-1 text-[11px] text-[color:var(--color-subtle)] break-all">
                    {hasShortLink ? (
                      <>
                        People scan this Kompi Code → hit{" "}
                        <span className="font-mono">
                          {data.krcode.destination}
                        </span>{" "}
                        → then are redirected to this final URL.
                      </>
                    ) : (
                      <>
                        This URL is encoded directly into the QR. You can change
                        it at any time.
                      </>
                    )}
                  </p>
                </div>

                {error && (
                  <p className="pt-1 text-xs text-red-400">{error}</p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    disabled={saving}
                    onClick={handleSave}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[var(--color-accent-soft)] transition disabled:opacity-60"
                  >
                    {saving ? "Saving…" : "Save changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={saving}
                    onClick={() => router.push("/kr-codes")}
                    className="rounded-full px-4 py-2 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* RIGHT: Preview + quick stats/actions */}
            <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
              <CardHeader className="border-b border-[var(--color-border)] pb-4">
                <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                  Preview & quick stats
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 pt-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="inline-flex flex-col items-center justify-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4">
                    { }
                    <img
                      src={`/api/kr-codes/${data.krcode.id}/png`}
                      alt="Kompi Code preview"
                      className="h-48 w-48 rounded-2xl bg-white object-contain"
                    />
                  </div>

                  <div className="w-full space-y-1 text-xs text-[color:var(--color-subtle)]">
                    <div className="truncate text-[color:var(--color-text)]">
                      {data.krcode.title || "Untitled Kompi Code"}
                    </div>
                    <div className="break-all text-[11px]">
                      {hasShortLink
                        ? data.link?.targetUrl
                        : data.krcode.destination}
                    </div>
                    <div className="text-[11px]">
                      Created{" "}
                      {new Date(data.krcode.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Short link + scans */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 text-[11px] text-[color:var(--color-subtle)] space-y-2">
                  {hasShortLink ? (
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="uppercase tracking-[0.16em] text-[10px]">
                          Short link
                        </div>
                        <div className="truncate text-[color:var(--color-text)]">
                          {shortUrl}
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full px-3 py-1 text-[11px]"
                        onClick={async () => {
                          try {
                            if (shortUrl && navigator.clipboard) {
                              await navigator.clipboard.writeText(shortUrl);
                            }
                          } catch (err) {
                            console.error("Copy failed", err);
                          }
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  ) : (
                    <p>
                      This Kompi Code doesn&apos;t use a short link. New codes
                      created from the dashboard will automatically use your
                      workspace redirect.
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="uppercase tracking-[0.16em] text-[10px]">
                        Total scans
                      </div>
                      <div className="text-base font-semibold text-[color:var(--color-text)]">
                        {data.summary.totalScans}
                      </div>
                      {data.summary.lastScanAt && (
                        <div className="mt-0.5 text-[10px]">
                          Last scan{" "}
                          {new Date(
                            data.summary.lastScanAt,
                          ).toLocaleString()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full px-3 py-1"
                        onClick={() => {
                          const a = document.createElement("a");
                          a.href = `/api/kr-codes/${data.krcode.id}/png`;
                          a.target = "_blank";
                          a.rel = "noopener noreferrer";
                          a.click();
                        }}
                      >
                        Download PNG
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="rounded-full px-3 py-1"
                        onClick={() => {
                          const a = document.createElement("a");
                          a.href = `/api/kr-codes/${data.krcode.id}/svg`;
                          a.target = "_blank";
                          a.rel = "noopener noreferrer";
                          a.click();
                        }}
                      >
                        Download SVG
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[color:var(--color-subtle)]">
                  Changes here update the live Kompi Code immediately. Use the
                  analytics view to dig into placements and referrers.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </section>
    </main>
  );
}
