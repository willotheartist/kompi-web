"use client";

import { useState, useTransition, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link2, QrCode, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { PlanLimitModal } from "@/components/billing/plan-limit-modal";

type UtmState = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
};

type CreateLinkPageProps = {
  workspaceId: string;
};

export function CreateLinkPage({ workspaceId }: CreateLinkPageProps) {
  const router = useRouter();
  const [targetUrl, setTargetUrl] = useState("");
  const [domain, setDomain] = useState("kmp.li");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [withKompiCode, setWithKompiCode] = useState(false);
  const [qrColor, setQrColor] = useState("var(--color-text)");
  const [addToBio, setAddToBio] = useState(false);
  const [utmEnabled, setUtmEnabled] = useState(false);
  const [limitOpen, setLimitOpen] = useState(false);
  const [utm, setUtm] = useState<UtmState>({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });
  const [isPending, startTransition] = useTransition();

  // NEW: success popup state
  const [createdLinkId, setCreatedLinkId] = useState<string | null>(null);
  const [createdShortUrl, setCreatedShortUrl] = useState<string | null>(null);

  // dynamic plan usage
  const [linkCount, setLinkCount] = useState<number | null>(null);
  const [linkLimit, setLinkLimit] = useState<number | null>(null);
  const [planLabel, setPlanLabel] = useState<string>("Free plan limit");

  const qrColors = [
    "var(--color-text)",
    "var(--color-accent)",
    "var(--color-subtle)",
    "var(--color-border)",
    "var(--color-bg)",
    "var(--color-surface)",
  ];

  useEffect(() => {
    let aborted = false;

    async function fetchUsage() {
      try {
        const res = await fetch(`/api/links?workspaceId=${workspaceId}`);
        if (!res.ok) return;

        const data = await res.json();
        if (aborted) return;

        const count = Array.isArray(data.links) ? data.links.length : 0;
        const plan: string = data.workspace?.plan ?? "FREE";

        const limit = plan === "CREATOR" ? 100 : 20;
        const label =
          plan === "CREATOR" ? "Creator plan limit" : "Free plan limit";

        setLinkCount(count);
        setLinkLimit(limit);
        setPlanLabel(label);
      } catch {
        // ignore
      }
    }

    fetchUsage();
    return () => {
      aborted = true;
    };
  }, [workspaceId]);

  function updateUtm<K extends keyof UtmState>(key: K, value: string) {
    setUtm((prev) => ({ ...prev, [key]: value }));
  }

  function buildUtmUrl(raw: string): string | null {
    if (!utmEnabled) return raw.trim();

    const trimmed = raw.trim();
    if (!trimmed) return null;

    try {
      const url = new URL(trimmed);
      if (utm.source) url.searchParams.set("utm_source", utm.source);
      if (utm.medium) url.searchParams.set("utm_medium", utm.medium);
      if (utm.campaign) url.searchParams.set("utm_campaign", utm.campaign);
      if (utm.term) url.searchParams.set("utm_term", utm.term);
      if (utm.content) url.searchParams.set("utm_content", utm.content);
      return url.toString();
    } catch {
      return null;
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const base = targetUrl.trim();
    if (!base) {
      toast.error("Add a destination URL");
      return;
    }

    const finalUrl = buildUtmUrl(base);
    if (!finalUrl) {
      toast.error("Enter a valid URL including http:// or https://");
      return;
    }

    startTransition(async () => {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUrl: finalUrl,
          code: slug.trim() || undefined,
          workspaceId,
          title: title.trim() || undefined,
          options: {
            withKompiCode,
            qrColor,
            addToBio, // will become "add to K-Card" behavior
          },
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        const lower = msg.toLowerCase();
        if (
          lower.includes("free plan limit") ||
          lower.includes("creator plan limit")
        ) {
          setLimitOpen(true);
        } else {
          toast.error(msg || "Could not create link");
        }
        return;
      }

      const link = await res.json();
      toast.success("Short link created");

      if (link.id) {
        // Build short URL for the popup
        const shortUrl: string =
          link.shortUrl ??
          (link.code
            ? `${
                typeof window !== "undefined" ? window.location.origin : ""
              }/r/${link.code}`
            : "");

        setCreatedLinkId(link.id);
        setCreatedShortUrl(shortUrl || null);
        // stay on page, popup will show
      } else {
        router.push("/links");
      }
    });
  }

  const shortUrlPreview =
    domain && slug
      ? `https://${domain}/${slug}`
      : domain
      ? `https://${domain}/your-code`
      : "";

  const effectiveLimit = linkLimit ?? 20;
  const usageText =
    linkCount != null && linkLimit != null
      ? `You’re using ${linkCount} of ${linkLimit} links in this workspace.`
      : "Checking your link usage…";

  const handleGoToLinkPage = () => {
    if (!createdLinkId) return;
    router.push(`/links/${createdLinkId}`);
  };

  const handleCopyCreatedLink = async () => {
    if (!createdShortUrl || typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(createdShortUrl);
      toast.success("Link copied to clipboard");
    } catch {
      // ignore
    }
  };

  const handleCreateAnother = () => {
    router.push("/links/new");
  };

  const successOpen = !!createdLinkId;

  return (
    <>
      <main
        className="min-h-full w-full bg-[var(--color-bg)]"
        style={{
          fontFamily:
            "Inter Tight, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex w-full max-w-5xl flex-col gap-8 pb-16 pt-10"
        >
          {/* --------------------------------------------------- */}
          {/* HERO HEADER – Kompilink-style banner                */}
          {/* --------------------------------------------------- */}
          <header className="w-full">
            <div className="w-full rounded-[32px] bg-[#006476] px-6 py-6 sm:px-10 sm:py-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                {/* Left: image + text */}
                <div className="flex items-center gap-6">
                  {/* Stacked image card */}
                  <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
                    <div className="absolute -left-4 top-3 h-20 w-16 rounded-3xl bg-[#F5FF47]" />
                    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[#FF5A4A]">
                      <img
                        src="/kompi-business.png"
                        alt="Kompi link hero"
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="leading-tight">
                      <p
                        className="text-[28px] sm:text-[34px]"
                        style={{
                          fontFamily:
                            '"Inter Tight", system-ui, -apple-system, sans-serif',
                          color: "#F4FBFF",
                          fontWeight: 500,
                          fontStyle: "normal",
                        }}
                      >
                        Create a new
                      </p>
                      <p
                        className="text-[32px] sm:text-[38px]"
                        style={{
                          fontFamily: '"Instrument Serif", Georgia, serif',
                          color: "#F4FBFF",
                          fontWeight: 400,
                          fontStyle: "normal",
                        }}
                      >
                        Kompi link.
                      </p>
                    </div>

                    <p
                      className="max-w-xl text-[13px] sm:text-sm"
                      style={{
                        fontFamily:
                          '"Inter Tight", system-ui, -apple-system, sans-serif',
                        color: "rgba(244,251,255,0.9)",
                      }}
                    >
                      Shorten a URL, optionally generate a Kompi Code, and add
                      UTM tracking so every visit is measured.
                    </p>

                    <p
                      className="text-[11px] sm:text-xs"
                      style={{
                        fontFamily:
                          '"Inter Tight", system-ui, -apple-system, sans-serif',
                        color: "rgba(244,251,255,0.85)",
                      }}
                    >
                      {planLabel}: {usageText}
                    </p>
                  </div>
                </div>

                {/* Right: tiny stat pill */}
                <div className="flex justify-start lg:justify-end">
                  <div className="min-w-[210px] rounded-2xl bg-[rgba(0,0,0,0.18)] px-4 py-3 text-right">
                    <p
                      className="text-[11px] font-medium uppercase tracking-[0.12em]"
                      style={{ color: "rgba(244,251,255,0.8)" }}
                    >
                      {planLabel}
                    </p>
                    <p
                      className="text-2xl font-semibold leading-tight"
                      style={{ color: "#F5FF47" }}
                    >
                      {effectiveLimit} links
                    </p>
                    <p
                      className="text-[11px]"
                      style={{ color: "rgba(244,251,255,0.75)" }}
                    >
                      {usageText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* --------------------------------------------------- */}
          {/* Link details – primary card                         */}
          {/* --------------------------------------------------- */}
          <Card className="shadow-none rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-8 md:px-10 md:py-10">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#111827" }}
              >
                <Link2 className="h-5 w-5" style={{ color: "#D8FF3B" }} />
              </span>
              <div className="space-y-0.5">
                <h2 className="text-sm font-semibold text-[color:var(--color-text)]">
                  Link details
                </h2>
                <p className="text-sm text-[color:var(--color-subtle)]">
                  Set the destination URL, short link, and optional title.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* BIG destination URL – no eyebrow label */}
              <div className="space-y-3">
                <Input
                  id="destination-url"
                  placeholder="Paste your long link here"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="h-20 border-0 border-b-2 border-[var(--color-border)] bg-transparent px-0 text-[28px] font-medium text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] focus-visible:ring-0 focus-visible:border-[color:var(--color-text)] rounded-none md:text-[32px]"
                />
              </div>

              {/* Short link */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                  Short link
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="sm:w-52">
                    <Select value={domain} onValueChange={setDomain}>
                      <SelectTrigger className="h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0">
                        <SelectValue placeholder="Choose domain" />
                      </SelectTrigger>
                      <SelectContent className="border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)]">
                        {/* TODO: populate from workspace domains */}
                        <SelectItem value="kmp.li">kmp.li</SelectItem>
                        <SelectItem value="kompi.app">kompi.app</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="hidden text-sm text-[color:var(--color-subtle)] sm:inline">
                    /
                  </span>
                  <Input
                    placeholder="custom-code (optional)"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="h-10 flex-1 border-0 border-b border-[var(--color-border)] bg-transparent px-0 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] focus-visible:ring-0 focus-visible:border-[color:var(--color-text)] rounded-none"
                  />
                </div>
                {shortUrlPreview && (
                  <p className="text-xs text-[color:var(--color-subtle)]">
                    This will be your short link:{" "}
                    <span className="font-medium text-[color:var(--color-text)] underline decoration-[var(--color-accent)] underline-offset-4">
                      {shortUrlPreview}
                    </span>
                  </p>
                )}
              </div>

              {/* Title */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--color-subtle)]">
                  Title{" "}
                  <span className="font-normal normal-case">(optional)</span>
                </p>
                <Input
                  id="link-title"
                  placeholder="Give this link a friendly name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-10 border-0 border-b border-[var(--color-border)] bg-transparent px-0 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] focus-visible:ring-0 focus-visible:border-[color:var(--color-text)] rounded-none"
                />
              </div>
            </div>
          </Card>

          {/* Sharing options */}
          <Card className="shadow-none rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-8 md:px-10 md:py-10">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "#111827" }}
              >
                <QrCode className="h-5 w-5" style={{ color: "#D8FF3B" }} />
              </span>
              <div className="space-y-0.5">
                <h2 className="text-sm font-semibold text-[color:var(--color-text)]">
                  Sharing options
                </h2>
                <p className="text-sm text-[color:var(--color-subtle)]">
                  Generate a Kompi Code or attach this link to a K-Card.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Kompi Code toggle + inner settings */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4">
                <button
                  type="button"
                  onClick={() => setWithKompiCode((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-4"
                >
                  <div className="space-y-1 text-left">
                    <p className="text-sm font-medium text-[color:var(--color-text)]">
                      Generate a Kompi Code
                    </p>
                    <p className="text-sm text-[color:var(--color-subtle)]">
                      Create a scannable Kompi Code for this link to use on
                      print, packaging and signage.
                    </p>
                  </div>
                  <span
                    className={
                      "inline-flex h-6 w-11 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 transition-all " +
                      (withKompiCode ? "justify-end" : "justify-start")
                    }
                  >
                    <span className="h-4 w-4 rounded-full bg-[var(--color-accent)]" />
                  </span>
                </button>

                {withKompiCode && (
                  <div className="mt-4 grid gap-4 border-t border-[var(--color-border)] pt-4 md:grid-cols-[2fr,1fr]">
                    {/* Color + (future) logo */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-[color:var(--color-text)]">
                          Code color
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {qrColors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => setQrColor(color)}
                              className={
                                "flex h-9 w-9 items-center justify-center rounded-full border-2 transition " +
                                (qrColor === color
                                  ? "border-[var(--color-text)]"
                                  : "border-transparent")
                              }
                            >
                              <span
                                className="h-7 w-7 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-[color:var(--color-text)]">
                          Logo
                        </p>
                        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-subtle)]">
                            +
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-sm text-[color:var(--color-text)]">
                              Logo upload coming soon
                            </p>
                            <p className="text-xs text-[color:var(--color-subtle)]">
                              PNG · 1:1 aspect ratio · up to 5MB.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview box */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-[color:var(--color-text)]">
                        Preview
                      </p>
                      <div className="flex h-40 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                        <div
                          className="flex h-32 w-32 items-center justify-center rounded-xl border-4 bg-[var(--color-bg)]"
                          style={{ borderColor: qrColor }}
                        >
                          <QrCode
                            className="h-16 w-16"
                            style={{ color: qrColor }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-[color:var(--color-subtle)]">
                        More customizations will be available after creating the
                        link.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* K-Card toggle */}
              <button
                type="button"
                onClick={() => setAddToBio((prev) => !prev)}
                className={
                  "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition " +
                  (addToBio
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                    : "border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-surface)]")
                }
              >
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[color:var(--color-text)]">
                    Add to a K-Card
                  </p>
                  <p className="text-sm text-[color:var(--color-subtle)]">
                    Attach this link to your K-Card so it’s ready to share with
                    one tap.
                  </p>
                </div>
                <span
                  className={
                    "inline-flex h-6 w-11 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 transition-all " +
                    (addToBio ? "justify-end" : "justify-start")
                  }
                >
                  <span className="h-4 w-4 rounded-full bg-[var(--color-accent)]" />
                </span>
              </button>
            </div>
          </Card>

          {/* Advanced settings / UTM */}
          <Card className="shadow-none rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-8 md:px-10 md:py-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#111827" }}
                >
                  <SlidersHorizontal
                    className="h-5 w-5"
                    style={{ color: "#D8FF3B" }}
                  />
                </span>
                <div className="space-y-0.5">
                  <h2 className="text-sm font-semibold text-[color:var(--color-text)]">
                    Advanced settings
                  </h2>
                  <p className="text-sm text-[color:var(--color-subtle)]">
                    Track campaign performance with UTM parameters.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUtmEnabled((prev) => !prev)}
                className={
                  "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition " +
                  (utmEnabled
                    ? "bg-[var(--color-accent-soft)] text-[color:var(--color-text)]"
                    : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-text)]")
                }
              >
                {utmEnabled ? "UTM enabled" : "Enable UTM"}
              </button>
            </div>

            {utmEnabled ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-[color:var(--color-text)]">
                    UTM source
                  </label>
                  <Input
                    placeholder="facebook, newsletter"
                    value={utm.source}
                    onChange={(e) => updateUtm("source", e.target.value)}
                    className="h-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[color:var(--color-text)]">
                    UTM medium
                  </label>
                  <Input
                    placeholder="cpc, email"
                    value={utm.medium}
                    onChange={(e) => updateUtm("medium", e.target.value)}
                    className="h-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[color:var(--color-text)]">
                    UTM campaign
                  </label>
                  <Input
                    placeholder="spring_sale"
                    value={utm.campaign}
                    onChange={(e) => updateUtm("campaign", e.target.value)}
                    className="h-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-[color:var(--color-text)]">
                    UTM term (optional)
                  </label>
                  <Input
                    placeholder="keyword"
                    value={utm.term}
                    onChange={(e) => updateUtm("term", e.target.value)}
                    className="h-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm text-[color:var(--color-text)]">
                    UTM content (optional)
                  </label>
                  <Input
                    placeholder="banner_variant_a"
                    value={utm.content}
                    onChange={(e) => updateUtm("content", e.target.value)}
                    className="h-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-0"
                  />
                </div>
              </div>
            ) : (
              <p className="text-sm text-[color:var(--color-subtle)]">
                Turn on UTM parameters to append tracking tags to your
                destination URL automatically.
              </p>
            )}
          </Card>

          {/* Footer actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-full border border-[var(--color-border)] bg-transparent px-4 text-sm font-medium text-[color:var(--color-text)] hover:bg-[var(--color-surface)]"
              onClick={() => router.push("/links")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="h-10 rounded-full bg-[var(--color-accent)] px-6 text-sm font-semibold text-[color:var(--color-text)] disabled:opacity-70"
            >
              {isPending ? "Creating…" : "Create your link"}
            </Button>
          </div>
        </form>

        {/* --------------------------------------------------- */}
        {/* SUCCESS POPUP                                       */}
        {/* --------------------------------------------------- */}
        {successOpen && createdLinkId && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40">
            <div
              className="relative mx-4 w-full max-w-3xl rounded-[40px] px-8 py-10 text-center sm:px-12 sm:py-12"
              style={{ backgroundColor: "#004233" }}
            >
              {/* Close X – ALWAYS goes to link page */}
              <button
                type="button"
                onClick={handleGoToLinkPage}
                className="absolute right-6 top-6 text-2xl font-medium text-white"
                aria-label="Close"
              >
                ×
              </button>

              <p className="mb-6 text-lg font-medium text-white sm:text-2xl">
                Your link is ready 🔥
              </p>

              <p
                className="mb-10 text-3xl sm:text-4xl md:text-5xl"
                style={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  color: "#F9FF8A",
                  fontStyle: "italic",
                }}
              >
                {createdShortUrl || "kompi.app/r/your-code"}
              </p>

              <div className="mb-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:gap-6">
                <button
                  type="button"
                  onClick={handleGoToLinkPage}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[#F5FF47] px-6 py-3 text-base font-semibold text-[#003426]"
                >
                  Go to link page
                </button>
                <button
                  type="button"
                  onClick={handleCopyCreatedLink}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[#A8DFCF] px-6 py-3 text-base font-semibold text-[#003426]"
                >
                  Copy link
                </button>
              </div>

              <button
                type="button"
                onClick={handleCreateAnother}
                className="text-sm font-medium text-white underline-offset-4 hover:underline sm:text-base"
              >
                Create another link →
              </button>
            </div>
          </div>
        )}
      </main>

      <PlanLimitModal
        open={limitOpen}
        onOpenChange={setLimitOpen}
        limit={effectiveLimit}
        featureLabel="links"
      />
    </>
  );
}
