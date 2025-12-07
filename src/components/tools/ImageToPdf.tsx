// src/components/tools/ImageToPdf.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type Variant = "public" | "dashboard";

interface ImageToPdfProps {
  variant?: Variant;
}

type ImageItem = {
  id: string;
  file: File;
  url: string;
};

type Orientation = "portrait" | "landscape";

// helper to load an image from a URL
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function ImageToPdf({ variant = "public" }: ImageToPdfProps) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [fileName, setFileName] = useState("images-to-pdf");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || !list.length) return;

    const next: ImageItem[] = [];
    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      if (!file.type.startsWith("image/")) continue;
      const url = URL.createObjectURL(file);
      next.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${i}`,
        file,
        url,
      });
    }

    if (!next.length) {
      setError("Please upload PNG or JPG images.");
      return;
    }

    setError(null);
    setImages((prev) => [...prev, ...next]);

    if (!fileName && next[0]) {
      setFileName(next[0].file.name.replace(/\.[^.]+$/, "") || "images-to-pdf");
    }
  }

  function moveImage(id: string, direction: "up" | "down") {
    setImages((current) => {
      const index = current.findIndex((img) => img.id === id);
      if (index === -1) return current.slice();
      const next = current.slice();
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= current.length) return current.slice();
      const [item] = next.splice(index, 1);
      next.splice(targetIndex, 0, item);
      return next;
    });
  }

  function removeImage(id: string) {
    setImages((current) => {
      const next = current.filter((img) => img.id !== id);
      return next;
    });
  }

  async function handleCreatePdf() {
    if (!images.length) {
      setError("Add at least one image first.");
      return;
    }
    if (typeof window === "undefined") {
      setError("PDF export can only run in the browser.");
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation: orientation === "portrait" ? "p" : "l",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      for (let idx = 0; idx < images.length; idx++) {
        const item = images[idx];
        const imgEl = await loadImage(item.url);

        const ratio = Math.min(
          pageWidth / imgEl.width,
          pageHeight / imgEl.height
        );
        const imgWidth = imgEl.width * ratio;
        const imgHeight = imgEl.height * ratio;
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;

        if (idx > 0) {
          doc.addPage();
        }

        doc.addImage(
          imgEl,
          item.file.type === "image/png" ? "PNG" : "JPEG",
          x,
          y,
          imgWidth,
          imgHeight
        );
      }

      const safeName =
        (fileName || "images-to-pdf").replace(/\.pdf$/i, "") + ".pdf";
      doc.save(safeName);
    } catch (err) {
      console.error(err);
      setError("We couldn’t create the PDF. Try fewer or smaller images.");
    } finally {
      setIsGenerating(false);
    }
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

  const hasImages = images.length > 0;

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
            Combine images into a single PDF
          </h2>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm">
            Upload PNG or JPG files, reorder them, and download a clean PDF.
          </p>
        </div>
        <span className="inline-flex items-center self-start rounded-full bg-[#F4F4F2] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
          IMAGE • PDF TOOL
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start">
        {/* LEFT – upload + options */}
        <div className="space-y-4">
          {/* Dropzone */}
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#D4D4CF] bg-[#FBFBF8] px-4 py-8 text-center transition hover:border-[#111111] hover:bg-[#F5F5F0]">
            <p className="text-sm font-medium text-[#111827]">
              Drop images here or click to upload
            </p>
            <p className="mt-1 text-xs text-[#6B7280]">
              PNG or JPG. We&apos;ll add one image per page.
            </p>
            <input
              type="file"
              accept="image/*"
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

          {/* File name + orientation */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4B5563]">
                PDF file name
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="images-to-pdf"
                className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4B5563]">
                Orientation
              </label>
              <div className="inline-flex w-full rounded-full bg-[#F4F4F2] p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setOrientation("portrait")}
                  className={[
                    "flex-1 rounded-full px-3 py-1.5",
                    orientation === "portrait"
                      ? "bg-[#111111] text-white"
                      : "text-[#111111]",
                  ].join(" ")}
                >
                  Portrait
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation("landscape")}
                  className={[
                    "flex-1 rounded-full px-3 py-1.5",
                    orientation === "landscape"
                      ? "bg-[#111111] text-white"
                      : "text-[#111111]",
                  ].join(" ")}
                >
                  Landscape
                </button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="text-xs text-[#8B8B8B]">
              Add images, set a file name, then create your PDF.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90 disabled:opacity-60"
              onClick={handleCreatePdf}
              disabled={!hasImages || isGenerating}
            >
              {isGenerating
                ? "Creating PDF…"
                : hasImages
                ? "Create PDF"
                : "Add images first"}
            </Button>
          </div>
        </div>

        {/* RIGHT – image list */}
        <div className="space-y-3 rounded-[24px] border border-[#E4E4DE] bg-[#FBFBF8] p-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-medium tracking-tight text-[#111111]">
              Pages in this PDF
            </h3>
            {hasImages && (
              <span className="text-[11px] text-[#6B7280]">
                {images.length} page{images.length === 1 ? "" : "s"}
              </span>
            )}
          </div>
          {hasImages ? (
            <ul className="flex max-h-[360px] flex-col gap-2 overflow-auto pr-1">
              {images.map((item, index) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3"
                >
                  <div className="h-14 w-14 overflow-hidden rounded-md border border-[#E5E5E0] bg-[#F9FAFB]">
                    <img
                      src={item.url}
                      alt={item.file.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-[11px] font-medium text-[#111827]">
                      {item.file.name}
                    </p>
                    <p className="text-[11px] text-[#9CA3AF]">
                      Page {index + 1}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      className="rounded-full border border-[#E5E5E0] bg-[#F9FAFB] px-2 py-[2px] text-[10px]"
                      onClick={() => moveImage(item.id, "up")}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-[#E5E5E0] bg-[#F9FAFB] px-2 py-[2px] text-[10px]"
                      onClick={() => moveImage(item.id, "down")}
                      disabled={index === images.length - 1}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-[#FFE4E6] bg-[#FEF2F2] px-2 py-[2px] text-[10px] text-[#B91C1C]"
                      onClick={() => removeImage(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[11px] text-[#9CA3AF]">
              Added images will appear here as pages in your PDF. Use the arrows to change the order or remove pages you don&apos;t need.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageToPdf;
