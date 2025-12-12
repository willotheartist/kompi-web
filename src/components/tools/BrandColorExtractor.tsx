"use client";

import * as React from "react";
import { useState, useRef } from "react";

type ExtractedColor = {
  hex: string;
  count: number;
};

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v)))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function extractColorsFromImageData(
  imageData: ImageData,
  maxColors: number = 6
): string[] {
  const { data, width, height } = imageData;
  if (!width || !height) return [];

  const bucketSize = 32;
  const buckets: Record<
    string,
    ExtractedColor & { r: number; g: number; b: number }
  > = {};

  const step = 4 * 4;
  for (let i = 0; i < data.length; i += step * 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 128) continue;

    const br = Math.floor(r / bucketSize);
    const bg = Math.floor(g / bucketSize);
    const bb = Math.floor(b / bucketSize);
    const key = `${br},${bg},${bb}`;

    if (!buckets[key]) {
      buckets[key] = { r: 0, g: 0, b: 0, count: 0, hex: "" };
    }
    buckets[key].r += r;
    buckets[key].g += g;
    buckets[key].b += b;
    buckets[key].count += 1;
  }

  return Object.values(buckets)
    .map((bucket) => ({
      hex: rgbToHex(
        bucket.r / bucket.count,
        bucket.g / bucket.count,
        bucket.b / bucket.count
      ),
      count: bucket.count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, maxColors)
    .map((c) => c.hex);
}

export function BrandColorExtractor() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setColors([]);
    setExportOpen(false);

    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    const img = new Image();
    img.onload = () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const maxSize = 900;
        let { width, height } = img;
        const scale = Math.min(maxSize / width, maxSize / height, 1);

        width = Math.round(width * scale);
        height = Math.round(height * scale);

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, width, height);
        const extracted = extractColorsFromImageData(
          ctx.getImageData(0, 0, width, height),
          6
        );
        setColors(extracted);
      } catch {
        setError("Could not extract colors from this image.");
      } finally {
        setIsLoading(false);
        setShowModal(false);
      }
    };

    img.onerror = () => {
      setError("Unable to load this image.");
      setIsLoading(false);
      setShowModal(false);
    };

    img.src = objectUrl;
  }

  function handleCopy(hex: string) {
    navigator.clipboard.writeText(hex).catch(() => {});
  }

  function copyHexList() {
    if (!colors.length) return;
    const text = colors.join(", ");
    navigator.clipboard.writeText(text).catch(() => {});
  }

  function copyCssVariables() {
    if (!colors.length) return;
    const lines = colors.map(
      (hex, index) => `  --brand-${index + 1}: ${hex};`
    );
    const css = `:root {\n${lines.join("\n")}\n}`;
    navigator.clipboard.writeText(css).catch(() => {});
  }

  function downloadJson() {
    if (!colors.length) return;
    const payload = { palette: colors };
    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kompi-palette.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const paletteColors =
    colors.length > 0
      ? colors
      : ["#4B4B7A", "#1D3D63", "#0470B8", "#E4A4C7", "#3B82F6"];

  const exportDisabled = colors.length === 0;

  return (
    <>
      {/* Outer container */}
      <div className="w-full max-w-6xl mx-auto rounded-[32px] bg-[#F5F5F5] p-6 sm:p-8 md:p-10">
        <div className="grid gap-6 md:gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] items-stretch">
          {/* LEFT PANEL */}
          <div className="flex flex-col justify-between rounded-[24px] bg-white/70 px-6 py-6 sm:px-7 sm:py-7 shadow-sm">
            <div className="space-y-6">
              {/* Palette label + strip */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-neutral-800">Palette</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex items-stretch">
                    <div className="flex w-full overflow-hidden rounded-[999px] bg-neutral-200 shadow-sm">
                      {paletteColors.map((hex, index) => (
                        <button
                          key={`${hex}-${index}`}
                          type="button"
                          onClick={() => colors.length > 0 && handleCopy(hex)}
                          className="relative flex-1 h-10 sm:h-11 transition hover:brightness-110"
                          style={{ backgroundColor: hex }}
                        >
                          {index === 0 && colors.length > 0 && (
                            <span className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white/90" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {isLoading && (
                <p className="text-xs text-neutral-500">Extracting colors…</p>
              )}

              {error && (
                <p className="text-xs text-red-500 pt-1">{error}</p>
              )}

              {!isLoading && !error && !imageUrl && (
                <p className="text-xs text-neutral-400">
                  Upload a logo, screenshot or brand image to generate a palette
                  you can reuse across your Kompi stack.
                </p>
              )}
            </div>

            {/* Bottom buttons */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(true);
                  setExportOpen(false);
                }}
                className="flex w-full items-center justify-center rounded-[18px] bg-[#E6E6E6] px-4 py-3 text-sm font-medium text-neutral-900 hover:bg-[#DDDDDD] transition"
              >
                Browse image
              </button>

              <div className="relative">
                <button
                  type="button"
                  disabled={exportDisabled}
                  onClick={() => {
                    if (exportDisabled) return;
                    setExportOpen((open) => !open);
                  }}
                  className="flex w-full items-center justify-center rounded-[18px] bg-[#2563F6] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1D4ED8] disabled:opacity-60 disabled:hover:bg-[#2563F6] transition"
                >
                  Export palette
                  <span className="ml-2 text-xs">▾</span>
                </button>

                {/* Export dropdown */}
                {exportOpen && !exportDisabled && (
                  <div className="absolute left-0 right-0 mt-2 rounded-[20px] bg-white shadow-xl border border-neutral-200 overflow-hidden z-20">
                    <button
                      type="button"
                      onClick={() => {
                        copyHexList();
                        setExportOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50"
                    >
                      <span className="h-6 w-6 rounded-full bg-[#2563F6]/10 flex items-center justify-center text-[12px]">
                        #
                      </span>
                      <span>Copy hex list</span>
                    </button>
                    <div className="h-px bg-neutral-100" />
                    <button
                      type="button"
                      onClick={() => {
                        copyCssVariables();
                        setExportOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50"
                    >
                      <span className="h-6 w-6 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[11px]">
                        {}
                      </span>
                      <span>Copy CSS variables</span>
                    </button>
                    <div className="h-px bg-neutral-100" />
                    <button
                      type="button"
                      onClick={() => {
                        downloadJson();
                        setExportOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-neutral-800 hover:bg-neutral-50"
                    >
                      <span className="h-6 w-6 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[12px]">
                        ⬇️
                      </span>
                      <span>Download JSON</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL – IMAGE AREA */}
          <div className="rounded-[24px] bg-white/80 p-4 sm:p-5 shadow-sm flex items-center justify-center">
            <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] rounded-[24px] overflow-hidden bg-neutral-200">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-tr from-[#1E3A8A] via-[#38BDF8] to-[#F472B6]" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for extraction */}
      <canvas ref={canvasRef} className="hidden" />

      {/* SIMPLE MODAL – only upload */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => !isLoading && setShowModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-[24px] bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <h2 className="text-sm font-semibold text-neutral-900">
                Select image
              </h2>
              <button
                type="button"
                onClick={() => !isLoading && setShowModal(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-500"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <label className="block cursor-pointer rounded-[20px] border border-dashed border-neutral-300 bg-neutral-50/80 px-6 py-10 text-center hover:border-neutral-400 hover:bg-neutral-50 transition">
                <div className="flex flex-col items-center gap-3">
                  <div className="h-10 w-10 rounded-xl border border-neutral-300 flex items-center justify-center text-neutral-400">
                    🖼
                  </div>
                  <p className="text-sm font-medium text-neutral-800">
                    Browse or drop image
                  </p>
                  <p className="text-xs text-neutral-400 max-w-xs">
                    PNG, JPG, or WebP. Kompi will pull a simple palette from the
                    whole image.
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              {isLoading && (
                <p className="mt-4 text-xs text-neutral-500">
                  Extracting colors…
                </p>
              )}

              {error && (
                <p className="mt-3 text-xs text-red-500">{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BrandColorExtractor;
