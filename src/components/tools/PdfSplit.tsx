// src/components/tools/PdfSplit.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Variant = "public" | "dashboard";

interface PdfSplitProps {
  variant?: Variant;
}

type Mode = "all" | "ranges";

async function getPdfLib() {
  const pdfLib = await import("pdf-lib");
  return pdfLib;
}

function parsePageRanges(input: string, maxPage: number): number[][] {
  const clean = input.replace(/\s+/g, "");
  if (!clean) return [];
  const parts = clean.split(",");
  const result: number[][] = [];

  for (const part of parts) {
    if (!part) continue;
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      let start = parseInt(startStr, 10);
      let end = parseInt(endStr, 10);
      if (Number.isNaN(start) || Number.isNaN(end)) continue;
      if (start > end) [start, end] = [end, start];
      start = Math.max(1, start);
      end = Math.min(maxPage, end);
      const range: number[] = [];
      for (let i = start; i <= end; i++) range.push(i);
      if (range.length) result.push(range);
    } else {
      let page = parseInt(part, 10);
      if (Number.isNaN(page)) continue;
      page = Math.min(Math.max(1, page), maxPage);
      result.push([page]);
    }
  }
  return result;
}

export function PdfSplit({ variant = "public" }: PdfSplitProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>("all");
  const [ranges, setRanges] = useState("1-3, 5");
  const [isSplitting, setIsSplitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || !list[0]) return;
    const pdfFile = list[0];
    if (pdfFile.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    setFile(pdfFile);
    setError(null);
    setPageCount(null);

    try {
      const { PDFDocument } = await getPdfLib();
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setPageCount(pdfDoc.getPageCount());
    } catch (err) {
      console.error(err);
      setError("We couldn’t read this PDF. Try another file.");
    }
  }

  async function handleSplit() {
    if (!file) {
      setError("Upload a PDF first.");
      return;
    }
    if (!pageCount || pageCount < 1) {
      setError("We couldn’t detect the number of pages in this file.");
      return;
    }

    setError(null);
    setIsSplitting(true);

    try {
      const { PDFDocument } = await getPdfLib();
      const arrayBuffer = await file.arrayBuffer();
      const srcDoc = await PDFDocument.load(arrayBuffer);

      if (mode === "all") {
        for (let i = 0; i < pageCount; i++) {
          const splitDoc = await PDFDocument.create();
          const [copiedPage] = await splitDoc.copyPages(srcDoc, [i]);
          splitDoc.addPage(copiedPage);

          const bytes = await splitDoc.save({ useObjectStreams: true });
          const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const baseName = file.name.replace(/\.pdf$/i, "") || "split";
          const name = `${baseName}-page-${i + 1}.pdf`;

          const a = document.createElement("a");
          a.href = url;
          a.download = name;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 2000);
        }
      } else {
        const groups = parsePageRanges(ranges, pageCount);
        if (!groups.length) {
          setError("Enter at least one valid page range.");
          setIsSplitting(false);
          return;
        }

        let index = 1;
        for (const group of groups) {
          const zeroBased = group.map((p) => p - 1);
          const splitDoc = await PDFDocument.create();
          const copiedPages = await splitDoc.copyPages(srcDoc, zeroBased);
          copiedPages.forEach((p) => splitDoc.addPage(p));

          const bytes = await splitDoc.save({ useObjectStreams: true });
          const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const baseName = file.name.replace(/\.pdf$/i, "") || "split";
          const name = `${baseName}-part-${index}.pdf`;
          index++;

          const a = document.createElement("a");
          a.href = url;
          a.download = name;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(url), 2000);
        }
      }
    } catch (err) {
      console.error(err);
      setError("We couldn’t split this PDF. Try a simpler file.");
    } finally {
      setIsSplitting(false);
    }
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

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
            Split a PDF into smaller, focused files
          </h2>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">
            Export every page as its own PDF, or split by custom page ranges for clients, modules, and handouts.
          </p>
        </div>
        <span className="inline-flex items-center self-start rounded-full bg-[#F4F4F2] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
          PDF • SPLIT TOOL
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start">
        {/* LEFT – upload + modes */}
        <div className="space-y-4">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D4D4CF] bg-[#FBFBF8] px-4 py-8 text-center transition hover:border-[#111111] hover:bg-[#F5F5F0]">
            <p className="text-sm font-medium text-[#111827]">
              Drop a PDF here or click to upload
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              We&apos;ll detect how many pages it has and let you choose how to split.
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

          <div className="space-y-3 rounded-[24px] border border-[#E5E5E0] bg-[#F9FAFB] p-4 text-xs">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
              Split mode
            </p>
            <div className="inline-flex w-full rounded-full bg-[#F4F4F2] p-1 text-xs">
              <button
                type="button"
                onClick={() => setMode("all")}
                className={[
                  "flex-1 rounded-full px-3 py-1.5",
                  mode === "all"
                    ? "bg-[#111111] text-white"
                    : "text-[#111111]",
                ].join(" ")}
              >
                Every page
              </button>
              <button
                type="button"
                onClick={() => setMode("ranges")}
                className={[
                  "flex-1 rounded-full px-3 py-1.5",
                  mode === "ranges"
                    ? "bg-[#111111] text-white"
                    : "text-[#111111]",
                ].join(" ")}
              >
                Custom ranges
              </button>
            </div>

            {mode === "ranges" && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#4B5563]">
                  Page ranges (e.g. 1-3, 5, 7-8)
                </label>
                <input
                  type="text"
                  value={ranges}
                  onChange={(e) => setRanges(e.target.value)}
                  className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
                />
                <p className="text-[11px] text-[#9CA3AF]">
                  Commas separate groups. Each group becomes its own PDF.
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#8B8B8B]">
              Ideal for splitting big decks, handbooks, and reports into bite-sized PDFs.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90 disabled:opacity-60"
              disabled={!file || isSplitting}
              onClick={handleSplit}
            >
              {isSplitting
                ? "Splitting PDF…"
                : file
                ? "Split PDF"
                : "Upload a PDF first"}
            </Button>
          </div>
        </div>

        {/* RIGHT – info */}
        <div className="space-y-3 rounded-[24px] border border-[#E4E4DE] bg-[#FBFBF8] p-4 text-xs">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
            PDF details
          </p>
          {file ? (
            <>
              <p className="truncate text-[11px] font-medium text-[#111827]">
                {file.name}
              </p>
              <p className="text-[11px] text-[#9CA3AF]">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
              {pageCount && (
                <p className="mt-1 text-[11px] text-[#4B5563]">
                  Detected{" "}
                  <span className="font-semibold">{pageCount}</span> page
                  {pageCount === 1 ? "" : "s"}.
                </p>
              )}
              <p className="mt-3 text-[11px] text-[#9CA3AF]">
                When you click split, your browser may ask you to allow
                multiple downloads—one per resulting PDF.
              </p>
            </>
          ) : (
            <p className="text-[11px] text-[#9CA3AF]">
              Upload a PDF to see its file size and page count, then choose how you want to split it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PdfSplit;
