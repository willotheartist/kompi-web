//src/components/tools/PdfConverter.tsx
"use client";

import * as React from "react";
import { useState } from "react";

type Variant = "public" | "dashboard";

interface PdfConverterProps {
  variant?: Variant;
}

type PdfSelection = {
  id: string;
  file: File;
  url: string;
};

type PdfjsViewport = { width: number; height: number };
type PdfjsPage = {
  getViewport: (opts: { scale: number }) => PdfjsViewport;
  render: (opts: { canvasContext: CanvasRenderingContext2D; viewport: PdfjsViewport }) => { promise: Promise<void> };
};
type PdfjsDocument = { getPage: (n: number) => Promise<PdfjsPage> };
type PdfjsLoadingTask = { promise: Promise<PdfjsDocument> };
type PdfjsLib = {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument: (src: { data: ArrayBuffer }) => PdfjsLoadingTask;
};

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function PdfConverter({ variant = "public" }: PdfConverterProps) {
  const [pdf, setPdf] = useState<PdfSelection | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isConvertingImage, setIsConvertingImage] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    if (!list || !list[0]) return;

    const file = list[0];
    if (file.type !== "application/pdf") {
      setMessage("Please upload a PDF file.");
      return;
    }

    const id = `${file.name}-${file.size}-${file.lastModified}`;
    const url = URL.createObjectURL(file);

    setPdf({ id, file, url });
    setMessage(null);
  }

  function clearFile() {
    if (pdf?.url) {
      URL.revokeObjectURL(pdf.url);
    }
    setPdf(null);
    setMessage(null);
    setIsConvertingImage(false);
  }

  function ensurePdfSelected() {
    if (!pdf) {
      setMessage("Upload a PDF first.");
      return false;
    }
    return true;
  }

  // Real, working conversion: PDF -> PNG (first page)
  async function handleConvertToImage() {
    if (!ensurePdfSelected() || !pdf) return;

    try {
      setIsConvertingImage(true);
      setMessage(null);

      const arrayBuffer = await pdf.file.arrayBuffer();

      const pdfjsLibMod = (await import("pdfjs-dist/build/pdf")) as unknown;
      const pdfjsLib = pdfjsLibMod as PdfjsLib;
      const workerSrc = (await import("pdfjs-dist/build/pdf.worker?url")).default;
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const doc = await loadingTask.promise;
      const page = await doc.getPage(1); // first page only for now

      const viewport = page.getViewport({ scale: 2 }); // higher scale = sharper
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Could not create canvas context.");
      }

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      await new Promise<void>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Could not create PNG blob."));
            const baseName = pdf.file.name.replace(/\.pdf$/i, "");
            downloadBlob(blob, `${baseName}-page-1.png`);
            resolve();
          },
          "image/png",
          1
        );
      });

      setMessage("Exported first page as PNG.");
    } catch (err) {
      console.error(err);
      setMessage("Could not convert this PDF to an image. Try a smaller file.");
    } finally {
      setIsConvertingImage(false);
    }
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

  const hasPdf = Boolean(pdf);

  const conversions = [
    {
      id: "word",
      label: "Word",
      ext: ".docx",
      iconBg: "#2563EB",
      available: false,
    },
    {
      id: "excel",
      label: "Excel",
      ext: ".xlsx",
      iconBg: "#16A34A",
      available: false,
    },
    {
      id: "powerpoint",
      label: "PowerPoint",
      ext: ".pptx",
      iconBg: "#EA580C",
      available: false,
    },
    {
      id: "image",
      label: isConvertingImage ? "Converting…" : "Image",
      ext: ".png (first page)",
      iconBg: "#FACC15",
      available: true,
      onClick: handleConvertToImage,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className={[
          "rounded-[32px] border border-[#E5E5E0] bg-[#F9FAFF]",
          "shadow-sm",
          wrapperPadding,
        ].join(" ")}
      >
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.03em] text-[#111827]">
              PDF converter
            </h2>
            <p className="text-xs text-[#6B7280]">
              Upload a PDF and export it into other formats.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#6B7280]">
            PDF • CONVERT
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.1fr)] lg:items-start">
          {/* LEFT – PDF area */}
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-[24px] bg-white p-6 sm:p-8 shadow-xs border border-[#E5E7EB]">
              {!pdf && (
                <label className="flex w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-[20px] border border-dashed border-[#D4D4CF] bg-[#F3F4F6] px-4 py-10 text-center transition hover:border-[#111827] hover:bg-white">
                  <p className="text-sm font-medium text-[#111827]">
                    Drop a PDF here or click to upload
                  </p>
                  <p className="mt-1 text-[11px] text-[#9CA3AF]">
                    We only use it locally in your browser.
                  </p>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleFile}
                  />
                </label>
              )}

              {pdf && (
                <div className="flex w-full max-w-md flex-col gap-4">
                  <div className="flex items-center gap-3 rounded-[18px] bg-[#F3F4F6] px-4 py-3">
                    <div className="flex h-10 w-8 items-center justify-center rounded-md bg-[#111827] text-[10px] font-semibold text-white">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#111827]">
                        {pdf.file.name}
                      </p>
                      <p className="text-[11px] text-[#9CA3AF]">
                        {(pdf.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="ml-auto text-[11px] font-medium text-[#6B7280] hover:text-[#111827]"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="relative flex h-40 items-center justify-center rounded-[18px] border border-dashed border-[#E5E7EB] bg-[#F9FAFB]">
                    <span className="text-[11px] text-[#9CA3AF]">
                      PDF preview (first page)
                    </span>
                    {/* You could embed an actual preview here later. */}
                  </div>
                </div>
              )}

              {message && (
                <p className="mt-4 text-[11px] text-[#EF4444]">{message}</p>
              )}
            </div>
          </div>

          {/* RIGHT – conversion options */}
          <div className="space-y-3 rounded-[24px] bg-white p-4 sm:p-5 border border-[#E5E7EB]">
            <p className="mb-1 text-sm font-semibold text-[#111827]">
              Convert to:
            </p>

            <div className="space-y-2">
              {conversions.map((option) => {
                const isImage = option.id === "image";
                const isDisabled = !hasPdf || !option.available || (isImage && isConvertingImage);

                const handleClick = () => {
                  if (isDisabled || !option.onClick) return;
                  option.onClick();
                };

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={handleClick}
                    disabled={isDisabled}
                    className={[
                      "flex w-full items-center justify-between rounded-[16px] border px-4 py-3 text-left transition",
                      "bg-[#F9FAFB] hover:bg-white hover:shadow-sm",
                      isDisabled
                        ? "cursor-not-allowed opacity-50 hover:bg-[#F9FAFB] hover:shadow-none"
                        : "cursor-pointer",
                    ].join(" ")}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold text-white"
                        style={{ backgroundColor: option.iconBg }}
                      >
                        {option.label[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111827]">
                          {option.label}
                        </p>
                        <p className="text-[11px] text-[#6B7280]">
                          {option.ext}
                        </p>
                      </div>
                    </div>
                    {!option.available && (
                      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#9CA3AF]">
                        Soon
                      </span>
                    )}
                    {option.available && (
                      <span className="text-xs text-[#9CA3AF]">›</span>
                    )}
                  </button>
                );
              })}
            </div>

            {!hasPdf && (
              <p className="mt-2 text-[11px] text-[#9CA3AF]">
                Upload a PDF on the left to enable conversion.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PdfConverter;
