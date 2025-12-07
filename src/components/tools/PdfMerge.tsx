// src/components/tools/PdfMerge.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Variant = "public" | "dashboard";

interface PdfMergeProps {
  variant?: Variant;
}

type PdfItem = {
  id: string;
  file: File;
};

async function getPdfLib() {
  const pdfLib = await import("pdf-lib");
  return pdfLib;
}

export function PdfMerge({ variant = "public" }: PdfMergeProps) {
  const [files, setFiles] = useState<PdfItem[]>([]);
  const [outputName, setOutputName] = useState("merged-document");
  const [isMerging, setIsMerging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mergedSize, setMergedSize] = useState<number | null>(null);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || !list.length) return;

    const next: PdfItem[] = [];
    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      if (file.type !== "application/pdf") continue;
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${i}`,
        file,
      });
    }

    if (!next.length) {
      setError("Please upload PDF files only.");
      return;
    }

    setError(null);
    setFiles((prev) => [...prev, ...next]);

    if (!outputName && next[0]) {
      setOutputName(next[0].file.name.replace(/\.pdf$/i, "") || "merged-document");
    }
  }

  function moveFile(id: string, direction: "up" | "down") {
    setFiles((current) => {
      const index = current.findIndex((item) => item.id === id);
      if (index === -1) return current.slice();
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= current.length) return current.slice();
      const next = current.slice();
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      return next;
    });
  }

  function removeFile(id: string) {
    setFiles((current) => current.filter((item) => item.id !== id));
  }

  async function handleMerge() {
    if (!files.length) {
      setError("Add at least two PDFs to merge.");
      return;
    }

    setError(null);
    setIsMerging(true);
    setMergedSize(null);

    try {
      const { PDFDocument } = await getPdfLib();
      const mergedPdf = await PDFDocument.create();

      for (const item of files) {
        const arrayBuffer = await item.file.arrayBuffer();
        const srcDoc = await PDFDocument.load(arrayBuffer);
        const pageIndices = srcDoc.getPageIndices();
        const copied = await mergedPdf.copyPages(srcDoc, pageIndices);
        copied.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save({ useObjectStreams: true });
      setMergedSize(mergedBytes.byteLength);

      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const safeName =
        (outputName || "merged-document").replace(/\.pdf$/i, "") + ".pdf";

      const a = document.createElement("a");
      a.href = url;
      a.download = safeName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      console.error(err);
      setError("We couldn’t merge these PDFs. Try fewer or smaller files.");
    } finally {
      setIsMerging(false);
    }
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

  const hasFiles = files.length > 0;

  const totalSize =
    files.reduce((sum, item) => sum + item.file.size, 0) || 0;

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
            Merge multiple PDFs into one clean document
          </h2>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">
            Upload PDFs, arrange the order, and download a single merged file for decks, proposals, and handouts.
          </p>
        </div>
        <span className="inline-flex items-center self-start rounded-full bg-[#F4F4F2] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
          PDF • MERGE TOOL
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start">
        {/* LEFT – upload + options */}
        <div className="space-y-4">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D4D4CF] bg-[#FBFBF8] px-4 py-8 text-center transition hover:border-[#111111] hover:bg-[#F5F5F0]">
            <p className="text-sm font-medium text-[#111827]">
              Drop PDFs here or click to upload
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              Add at least two PDFs. You can reorder them after uploading.
            </p>
            <input
              type="file"
              accept="application/pdf"
              multiple
              className="hidden"
              onChange={handleFiles}
            />
          </label>

          {error && (
            <p className="text-[11px] font-medium text-red-500">
              {error}
            </p>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4B5563]">
                Output file name
              </label>
              <input
                type="text"
                value={outputName}
                onChange={(e) => setOutputName(e.target.value)}
                placeholder="merged-document"
                className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
              />
              <p className="text-[11px] text-[#9CA3AF]">
                We&apos;ll add <code>.pdf</code> automatically.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4B5563]">
                Size overview
              </label>
              <div className="rounded-xl border border-[#E5E5E0] bg-[#F9FAFB] px-3 py-2 text-[11px] text-[#4B5563]">
                <p>
                  Source PDFs:{" "}
                  <span className="font-medium">
                    {(totalSize / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </p>
                {mergedSize !== null && (
                  <p className="mt-0.5">
                    Last merged file:{" "}
                    <span className="font-medium">
                      {(mergedSize / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#8B8B8B]">
              Arrange the documents in the order you want, then merge and download a single PDF.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90 disabled:opacity-60"
              disabled={!hasFiles || isMerging}
              onClick={handleMerge}
            >
              {isMerging
                ? "Merging PDFs…"
                : hasFiles
                ? "Merge PDFs"
                : "Add PDFs first"}
            </Button>
          </div>
        </div>

        {/* RIGHT – list of PDFs */}
        <div className="space-y-3 rounded-[24px] border border-[#E4E4DE] bg-[#FBFBF8] p-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium tracking-tight text-[#111111]">
              PDFs in this merge
            </h3>
            {hasFiles && (
              <span className="text-[11px] text-[#6B7280]">
                {files.length} file{files.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {hasFiles ? (
            <ul className="flex max-h-[360px] flex-col gap-2 overflow-auto pr-1">
              {files.map((item, index) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3F2FF] text-[11px] font-semibold text-[#1E3A8A]">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-[11px] font-medium text-[#111827]">
                      {item.file.name}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      {(item.file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      className="rounded-full border border-[#E5E5E0] bg-[#F9FAFB] px-2 py-[2px] text-[10px]"
                      onClick={() => moveFile(item.id, "up")}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-[#E5E5E0] bg-[#F9FAFB] px-2 py-[2px] text-[10px]"
                      onClick={() => moveFile(item.id, "down")}
                      disabled={index === files.length - 1}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-[#FFE4E6] bg-[#FEF2F2] px-2 py-[2px] text-[10px] text-[#B91C1C]"
                      onClick={() => removeFile(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[11px] text-[#9CA3AF]">
              PDFs you add will appear here. Use the arrows to change the merge
              order or remove files you don&apos;t need.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PdfMerge;
