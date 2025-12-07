// src/components/tools/PdfConverter.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Variant = "public" | "dashboard";

interface PdfConverterProps {
  variant?: Variant;
}

type PdfSelection = {
  id: string;
  file: File;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/\.pdf$/i, "")
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function PdfConverter({ variant = "public" }: PdfConverterProps) {
  const [pdf, setPdf] = useState<PdfSelection | null>(null);
  const [title, setTitle] = useState("");
  const [ctaLabel, setCtaLabel] = useState("View PDF");
  const [customSlug, setCustomSlug] = useState("");
  const [generatedSlug, setGeneratedSlug] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"link" | "slug" | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || !list[0]) return;
    const file = list[0];
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setError(null);

    const id = `${file.name}-${file.size}-${file.lastModified}`;
    const baseSlug = slugify(file.name) || "pdf";
    setPdf({ id, file });
    setGeneratedSlug(baseSlug);
    setCustomSlug("");
    if (!title) {
      setTitle(file.name.replace(/\.pdf$/i, ""));
    }
  }

  function handleGenerate() {
    if (!pdf) {
      setError("Upload a PDF first.");
      return;
    }
    const baseSlug = customSlug.trim()
      ? slugify(customSlug)
      : generatedSlug || slugify(pdf.file.name) || "pdf";

    if (!baseSlug) {
      setError("We couldn't create a valid slug. Try typing a shorter one.");
      return;
    }

    setError(null);
    const link = `https://kompi.app/p/${baseSlug}`;
    setGeneratedSlug(baseSlug);
    setGeneratedUrl(link);
  }

  function handleCopy(value: string, type: "link" | "slug") {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
    setCopied(type);
    setTimeout(() => {
      setCopied((current) => (current === type ? null : current));
    }, 1500);
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

  const activeSlug = customSlug.trim()
    ? slugify(customSlug)
    : generatedSlug;

  return (
    <div
      className={[
        "w-full",
        "rounded-[32px] border border-[#E5E5E0] bg-white",
        "flex flex-col gap-6 sm:gap-7 lg:gap-8",
        wrapperPadding,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h2 className="text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[#111827]">
            Turn a PDF into a shareable Kompi-style link
          </h2>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">
            Plan the title, slug, and button text for your PDF link, then paste it straight into your Kompi workspace.
          </p>
        </div>
        <span className="inline-flex items-center self-start rounded-full bg-[#F4F4F2] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
          PDF • LINK PLANNER
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start">
        {/* LEFT – inputs */}
        <div className="space-y-5">
          {/* Upload */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D4D4CF] bg-[#FBFBF8] px-4 py-8 text-center transition hover:border-[#111111] hover:bg-[#F5F5F0]">
            <p className="text-sm font-medium text-[#111827]">
              Drop a PDF here or click to upload
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              We&apos;ll help you plan the link, slug, and CTA text.
            </p>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFile}
            />
          </label>

          {error && (
            <p className="text-[11px] font-medium text-red-500">
              {error}
            </p>
          )}

          {/* Title + CTA */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4B5563]">
                Link title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Brand deck, Case study, Menu"
                className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4B5563]">
                Button text
              </label>
              <input
                type="text"
                value={ctaLabel}
                onChange={(e) => setCtaLabel(e.target.value)}
                placeholder="View PDF, Download, Open menu..."
                className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
              />
            </div>
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#4B5563]">
              Custom slug (optional)
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-[#E5E5E0] bg-white px-3 py-2">
              <span className="text-xs text-[#9CA3AF]">
                kompi.app/p/
              </span>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder={generatedSlug || "your-pdf-link"}
                className="flex-1 border-none bg-transparent text-xs outline-none placeholder:text-[#D1D5DB]"
              />
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              Only letters, numbers, and dashes will be used.
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#4B5563]">
              Internal note (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Where you’ll use this link (e.g. IG bio, QR menu, sales emails)..."
              className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
            />
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#8B8B8B]">
              Once you&apos;re happy, click generate to get a slug and share link you can copy into Kompi.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90 disabled:opacity-60"
              onClick={handleGenerate}
              disabled={!pdf}
            >
              {pdf ? "Generate link details" : "Upload a PDF first"}
            </Button>
          </div>
        </div>

        {/* RIGHT – preview card */}
        <div className="space-y-3">
          {/* PDF summary */}
          <div className="space-y-2 rounded-[24px] border border-[#E5E5E0] bg-[#F7F7F3] p-4 text-xs">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                PDF SELECTED
              </p>
              <span className="text-[11px] text-[#6B7280]">
                {pdf
                  ? `${(pdf.file.size / (1024 * 1024)).toFixed(2)} MB`
                  : "0.00 MB"}
              </span>
            </div>
            {pdf ? (
              <p className="mt-1 truncate text-[#111827]">
                {pdf.file.name}
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-[#9CA3AF]">
                No PDF chosen yet.
              </p>
            )}
          </div>

          {/* Kompi-style link preview */}
          <div className="space-y-3 rounded-[24px] border border-[#E4E4DE] bg-[#FBFBF8] p-4 text-xs">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
              Kompi link preview
            </p>
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-sm font-medium text-[#111827]">
                {title || "PDF link title"}
              </p>
              <p className="mt-1 text-[11px] text-[#6B7280]">
                Button: <span className="font-medium">{ctaLabel || "View PDF"}</span>
              </p>
              <p className="mt-2 text-[11px] text-[#9CA3AF]">
                kompi.app/p/
                <span className="font-mono">
                  {activeSlug || "your-pdf-link"}
                </span>
              </p>
              {generatedUrl && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[#E5E5E0] bg-[#F9FAFB] px-3 py-1.5 text-[11px] font-medium"
                    onClick={() => handleCopy(generatedUrl, "link")}
                  >
                    {copied === "link" ? "Copied link" : "Copy share link"}
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="rounded-full border-[#E5E5E0] bg-[#F9FAFB] px-3 py-1.5 text-[11px] font-medium"
                    onClick={() => activeSlug && handleCopy(activeSlug, "slug")}
                    disabled={!activeSlug}
                  >
                    {copied === "slug" ? "Copied slug" : "Copy slug"}
                  </Button>
                </div>
              )}
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              In your Kompi dashboard, you&apos;ll attach this link to the actual PDF file so clicks are tracked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfConverter;
