"use client";

import { useState, useTransition, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Link2, QrCode, Target, SlidersHorizontal } from "lucide-react";
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
  const [qrColor, setQrColor] = useState("#000000");
  const [addToBio, setAddToBio] = useState(false);
  const [utmEnabled, setUtmEnabled] = useState(false);
  const [utm, setUtm] = useState<UtmState>({
    source: "",
    medium: "",
    campaign: "",
    term: "",
    content: "",
  });
  const [isPending, startTransition] = useTransition();

  const qrColors = [
    "#000000",
    "#f97316", // orange
    "#22c55e", // green
    "#3b82f6", // blue
    "#6366f1", // indigo
    "#a855f7", // purple
    "#ec4899", // pink
  ];

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
            addToBio,
          },
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        toast.error(msg || "Could not create link");
        return;
      }

      const link = await res.json();
      toast.success("Short link created");

      if (link.id) {
        router.push(`/links/${link.id}`);
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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-5xl flex-col gap-8 pb-16 pt-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/20">
              <Link2 className="h-5 w-5 text-sky-300" />
            </span>
            Create a new link
          </h1>
          <p className="text-base text-slate-200">
            Shorten a URL, optionally generate a Kompi Code, and add UTM
            tracking.
          </p>
        </div>
      </div>

      {/* Link details */}
      <Card className="border border-white/10 bg-slate-950/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.65)] backdrop-blur-2xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-sky-500/15">
              <Target className="h-5 w-5 text-sky-300" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-white">Link details</h2>
              <p className="text-sm text-slate-200">
                Destination URL, short link and optional title.
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-300">
            You have{" "}
            <span className="font-semibold text-sky-300">1,000</span> links
            remaining this month.
          </p>
        </div>

        <div className="space-y-5">
          {/* Destination URL */}
          <div className="space-y-2">
            <label
              htmlFor="destination-url"
              className="text-sm font-medium text-slate-100"
            >
              Destination URL
            </label>
            <Input
              id="destination-url"
              placeholder="https://example.com/my-long-url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="h-11 rounded-xl border-white/15 bg-white/5 text-base text-white placeholder:text-slate-500"
            />
          </div>

          {/* Short link */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-100">
              Short link
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="sm:w-44">
                <Select value={domain} onValueChange={setDomain}>
                  <SelectTrigger className="h-11 rounded-xl border-white/15 bg-white/5 text-base text-white">
                    <SelectValue placeholder="Choose domain" />
                  </SelectTrigger>
                  <SelectContent className="border-white/15 bg-slate-950/95 text-base text-white">
                    {/* TODO: populate from workspace domains */}
                    <SelectItem value="kmp.li">kmp.li</SelectItem>
                    <SelectItem value="kompi.app">kompi.app</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <span className="hidden text-lg text-slate-400 sm:inline">
                /
              </span>
              <Input
                placeholder="custom-code (optional)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="h-11 flex-1 rounded-xl border-white/15 bg-white/5 text-base text-white placeholder:text-slate-500"
              />
            </div>
            {shortUrlPreview && (
              <p className="text-sm text-slate-200">
                This will be your short link:{" "}
                <span className="font-medium text-sky-300">
                  {shortUrlPreview}
                </span>
              </p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="link-title"
              className="text-sm font-medium text-slate-100"
            >
              Title{" "}
              <span className="font-normal text-slate-300">(optional)</span>
            </label>
            <Input
              id="link-title"
              placeholder="Give this link a friendly name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11 rounded-xl border-white/15 bg-white/5 text-base text-white placeholder:text-slate-500"
            />
          </div>
        </div>
      </Card>

      {/* Sharing options */}
      <Card className="border border-white/10 bg-slate-950/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.65)] backdrop-blur-2xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500/15">
            <QrCode className="h-5 w-5 text-emerald-300" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-white">
              Sharing options
            </h2>
            <p className="text-sm text-slate-200">
              Generate a Kompi Code or add this link to a Kompi bio page.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Kompi Code toggle + inner settings */}
          <div className="rounded-xl border border-white/15 bg-slate-950/70 p-4">
            <button
              type="button"
              onClick={() => setWithKompiCode((prev) => !prev)}
              className="flex w-full items-center justify-between gap-4"
            >
              <div className="space-y-1 text-left">
                <p className="text-base font-medium text-white">
                  Generate a Kompi Code
                </p>
                <p className="text-sm text-slate-200">
                  Create a scannable Kompi Code for this link to use on print,
                  packaging and signage.
                </p>
              </div>
              <span
                className={
                  "inline-flex h-6 w-11 items-center rounded-full border border-white/20 bg-black/70 p-0.5 transition-all " +
                  (withKompiCode ? "justify-end" : "justify-start")
                }
              >
                <span className="h-4 w-4 rounded-full bg-white" />
              </span>
            </button>

            {withKompiCode && (
              <div className="mt-4 grid gap-4 border-t border-white/10 pt-4 md:grid-cols-[2fr,1fr]">
                {/* Color + (future) logo */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-slate-100">
                      Code color
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {qrColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setQrColor(color)}
                          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition ${
                            qrColor === color
                              ? "border-white"
                              : "border-transparent"
                          }`}
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
                    <p className="text-sm font-medium text-slate-100">Logo</p>
                    <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/20 bg-slate-950/60 px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-slate-950/80 text-sm text-slate-300">
                        +
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm text-slate-200">
                          Logo upload coming soon
                        </p>
                        <p className="text-xs text-slate-400">
                          PNG · 1:1 aspect ratio · up to 5MB.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview box */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-slate-100">
                    Preview
                  </p>
                  <div className="flex h-40 items-center justify-center rounded-xl border border-white/20 bg-white">
                    <div
                      className="flex h-32 w-32 items-center justify-center rounded-lg border-4"
                      style={{ borderColor: qrColor }}
                    >
                      <QrCode
                        className="h-16 w-16"
                        style={{ color: qrColor }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    More customizations will be available after creating the
                    link.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bio page toggle */}
          <button
            type="button"
            onClick={() => setAddToBio((prev) => !prev)}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition hover:border-sky-400/70 ${
              addToBio
                ? "border-sky-400/80 bg-sky-500/10"
                : "border-white/15 bg-slate-950/60"
            }`}
          >
            <div className="space-y-1">
              <p className="text-base font-medium text-white">
                Add to a Kompi bio page
              </p>
              <p className="text-sm text-slate-200">
                Attach this link to one of your Kompi bio pages so it appears
                instantly.
              </p>
            </div>
            <span
              className={
                "inline-flex h-6 w-11 items-center rounded-full border border-white/20 bg-black/70 p-0.5 transition-all " +
                (addToBio ? "justify-end" : "justify-start")
              }
            >
              <span className="h-4 w-4 rounded-full bg-white" />
            </span>
          </button>
        </div>
      </Card>

      {/* Advanced settings / UTM */}
      <Card className="border border-white/10 bg-slate-950/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.65)] backdrop-blur-2xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-500/15">
              <SlidersHorizontal className="h-5 w-5 text-purple-300" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Advanced settings
              </h2>
              <p className="text-sm text-slate-200">
                Track campaign performance with UTM parameters.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setUtmEnabled((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              utmEnabled
                ? "bg-purple-500/20 text-purple-100"
                : "bg-slate-900 text-slate-100"
            }`}
          >
            {utmEnabled ? "UTM enabled" : "Enable UTM"}
          </button>
        </div>

        {utmEnabled ? (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-slate-100">UTM source</label>
              <Input
                placeholder="facebook, newsletter"
                value={utm.source}
                onChange={(e) => updateUtm("source", e.target.value)}
                className="h-10 rounded-xl border-white/15 bg-white/5 text-base text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-100">UTM medium</label>
              <Input
                placeholder="cpc, email"
                value={utm.medium}
                onChange={(e) => updateUtm("medium", e.target.value)}
                className="h-10 rounded-xl border-white/15 bg-white/5 text-base text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-100">UTM campaign</label>
              <Input
                placeholder="spring_sale"
                value={utm.campaign}
                onChange={(e) => updateUtm("campaign", e.target.value)}
                className="h-10 rounded-xl border-white/15 bg-white/5 text-base text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-100">
                UTM term (optional)
              </label>
              <Input
                placeholder="keyword"
                value={utm.term}
                onChange={(e) => updateUtm("term", e.target.value)}
                className="h-10 rounded-xl border-white/15 bg-white/5 text-base text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm text-slate-100">
                UTM content (optional)
              </label>
              <Input
                placeholder="banner_variant_a"
                value={utm.content}
                onChange={(e) => updateUtm("content", e.target.value)}
                className="h-10 rounded-xl border-white/15 bg-white/5 text-base text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-200">
            Turn on UTM parameters to append tracking tags to your destination
            URL automatically.
          </p>
        )}
      </Card>

      {/* Footer actions */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-xl border-white/25 bg-transparent text-base text-slate-100 hover:bg-white/5"
          onClick={() => router.push("/links")}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="h-10 rounded-xl bg-sky-500 px-6 text-base font-semibold text-white hover:bg-sky-600"
        >
          {isPending ? "Creating…" : "Create your link"}
        </Button>
      </div>
    </form>
  );
}
