// src/components/tools/PdfToImage.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Variant = "public" | "dashboard";

interface PdfToImageProps {
  variant?: Variant;
}

type OutputFormat = "png" | "jpg";

type PdfSelection = {
  id: string;
  file: File;
};

type ExportedImage = {
  pageNumber: number;
  url: string;
  filename: string;
};

// lazy, browser-only pdf.js import using the webpack bundle
type PdfJsModule = {
  getDocument: (options: { data: ArrayBuffer }) => {
    promise: Promise<{
      numPages: number;
      getPage: (pageNumber: number) => Promise<{
        getViewport: (options: { scale: number }) => {
          width: number;
          height: number;
        };
        render: (options: {
          canvasContext: CanvasRenderingContext2D;
          viewport: { width: number; height: number };
        }) => { promise: Promise<unknown> };
      }>;
    }>;
  };
};

let pdfjsPromise: Promise<PdfJsModule> | null = null;

async function getPdfJs(): Promise<PdfJsModule> {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist/webpack") as unknown as Promise<PdfJsModule>;
  }
  return pdfjsPromise;
}

function parsePageSelection(
  mode: "all" | "range",
  range: string,
  totalPages: number
): number[] {
  if (mode === "all") {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  const parts = range.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (!trimmed.includes("-")) {
      const n = Number(trimmed);
      if (!Number.isNaN(n) && n >= 1 && n <= totalPages) pages.add(n);
      continue;
    }

    const [startRaw, endRaw] = trimmed.split("-");
    const start = Number(startRaw);
    const end = Number(endRaw);
    if (
      Number.isNaN(start) ||
      Number.isNaN(end) ||
      start < 1 ||
      end < 1 ||
      start > end
    )
      continue;

    for (let i = start; i <= end && i <= totalPages; i++) {
      pages.add(i);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export function PdfToImage({ variant = "public" }: PdfToImageProps) {
  const [pdf, setPdf] = useState<PdfSelection | null>(null);
  const [format, setFormat] = useState<OutputFormat>("png");
  const [pageMode, setPageMode] = useState<"all" | "range">("all");
  const [range, setRange] = useState("1-3");
  const [isConverting, setIsConverting] = useState(false);
  const [exports, setExports] = useState<ExportedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || !list[0]) return;
    const file = list[0];
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setError(null);
    setExports([]);
    setPdf({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
    });
  }

  async function handleConvert() {
    if (!pdf) return;
    if (typeof window === "undefined") {
      setError("PDF export can only run in the browser.");
      return;
    }

    setError(null);
    setIsConverting(true);
    setExports([]);

    try {
      const arrayBuffer = await pdf.file.arrayBuffer();
      const pdfjsLib = await getPdfJs();

      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const doc = await loadingTask.promise;
      const totalPages: number = doc.numPages;

      const pageNumbers = parsePageSelection(pageMode, range, totalPages);
      if (!pageNumbers.length) {
        setError("No valid pages found in your selection.");
        setIsConverting(false);
        return;
      }

      const generated: ExportedImage[] = [];

      for (const pageNumber of pageNumbers) {
        const page = await doc.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        const mimeType = format === "png" ? "image/png" : "image/jpeg";
        const quality = format === "jpg" ? 0.92 : undefined;

        const dataUrl = canvas.toDataURL(mimeType, quality);
        const safeBase = pdf.file.name.replace(/\.pdf$/i, "") || "page";
        const filename = `${safeBase}-page-${pageNumber}.${format}`;

        generated.push({ pageNumber, url: dataUrl, filename });
      }

      setExports(generated);
    } catch (err) {
      console.error(err);
      setError("We couldn’t read that PDF. Try another file.");
    } finally {
      setIsConverting(false);
    }
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

  const hasExports = exports.length > 0;

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
            Export PDF pages as images
          </h2>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">
            Upload a PDF, pick pages, and download them as PNG or JPG.
          </p>
        </div>
        <div className="inline-flex items-center self-start rounded-full bg-[#F4F4F2] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
          PDF • IMAGE TOOL
        </div>
      </div>

      {/* Upload + options row */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start">
        {/* Upload + format/pages */}
        <div className="space-y-4">
          {/* Dropzone */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D4D4CF] bg-[#FBFBF8] px-4 py-8 text-center transition hover:border-[#111111] hover:bg-[#F5F5F0]">
            <p className="text-sm font-medium text-[#111827]">
              Drop a PDF here or click to upload
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              Max a few dozen pages for fastest exports.
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

          {/* Options */}
          <div className="grid gap-3 sm:grid-cols-2">
            {/* Output format */}
            <div className="space-y-2 rounded-2xl bg-[#FBFBF8] p-3">
              <p className="text-xs font-medium text-[#111827]">
                Output format
              </p>
              <div className="inline-flex w-full rounded-full bg-[#F4F4F2] p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setFormat("png")}
                  className={[
                    "flex-1 rounded-full px-3 py-1.5",
                    format === "png"
                      ? "bg-[#111111] text-white"
                      : "text-[#111111]",
                  ].join(" ")}
                >
                  PNG
                </button>
                <button
                  type="button"
                  onClick={() => setFormat("jpg")}
                  className={[
                    "flex-1 rounded-full px-3 py-1.5",
                    format === "jpg"
                      ? "bg-[#111111] text-white"
                      : "text-[#111111]",
                  ].join(" ")}
                >
                  JPG
                </button>
              </div>
            </div>

            {/* Pages to export */}
            <div className="space-y-2 rounded-2xl bg-[#FBFBF8] p-3">
              <p className="text-xs font-medium text-[#111827]">
                Pages to export
              </p>
              <div className="inline-flex w-full rounded-full bg-[#F4F4F2] p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setPageMode("all")}
                  className={[
                    "flex-1 rounded-full px-3 py-1.5",
                    pageMode === "all"
                      ? "bg-[#111111] text-white"
                      : "text-[#111111]",
                  ].join(" ")}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setPageMode("range")}
                  className={[
                    "flex-1 rounded-full px-3 py-1.5",
                    pageMode === "range"
                      ? "bg-[#111111] text-white"
                      : "text-[#111111]",
                  ].join(" ")}
                >
                  Range
                </button>
              </div>
              {pageMode === "range" && (
                <input
                  type="text"
                  value={range}
                  onChange={(e) => setRange(e.target.value)}
                  placeholder="e.g. 1-3, 5, 7"
                  className="mt-2 w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
                />
              )}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#8B8B8B]">
              Upload, choose pages, then export.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90 disabled:opacity-60"
              onClick={handleConvert}
              disabled={!pdf || isConverting}
            >
              {isConverting
                ? "Exporting…"
                : pdf
                ? "Export pages as images"
                : "Upload a PDF first"}
            </Button>
          </div>
        </div>

        {/* File + exports */}
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

          {/* Exported images */}
          <div className="space-y-2 rounded-[24px] border border-[#E4E4DE] bg-[#FBFBF8] p-3 text-xs">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-medium tracking-tight text-[#111111]">
                Exported images
              </h3>
              {hasExports && (
                <span className="text-[11px] text-[#6B7280]">
                  {exports.length} page{exports.length === 1 ? "" : "s"}
                </span>
              )}
            </div>
            {hasExports ? (
              <ul className="grid gap-3 sm:grid-cols-2 max-h-[360px] overflow-auto pr-1">
                {exports.map((item) => (
                  <li
                    key={item.filename}
                    className="flex flex-col gap-2 rounded-2xl bg-white p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[#111827]">
                        {item.filename}
                      </span>
                      <span className="rounded-full bg-[#F3F4F6] px-2 py-[2px] text-[10px] font-medium uppercase tracking-[0.16em] text-[#6B7280]">
                        PAGE {item.pageNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-16 w-16 overflow-hidden rounded-md border border-[#E5E5E0] bg-[#F9FAFB]">
                        <img
                          src={item.url}
                          alt={item.filename}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <a
                        href={item.url}
                        download={item.filename}
                        className="inline-flex items-center justify-center rounded-full bg-[#111111] px-4 py-1.5 text-[11px] font-medium text-white hover:bg-black"
                      >
                        Download
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[11px] text-[#9CA3AF]">
                Your exported pages will show up here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfToImage;
