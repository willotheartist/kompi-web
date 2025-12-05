"use client";

import React, {
  useState,
  useRef,
  ChangeEvent,
  useCallback,
  useEffect,
} from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import QRCode from "qrcode";

type QrMode = "url" | "text" | "email" | "phone" | "wifi" | "sms";

type ModuleShape = "square" | "rounded" | "dots";
type EyeShape = "square" | "rounded";
type FrameStyle = "none" | "label";

type QrState = {
  mode: QrMode;
  url: string;
  text: string;
  email: string;
  phone: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiSecurity: "WPA" | "WEP" | "nopass";
  smsNumber: string;
  smsMessage: string;
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  margin: number;
  errorCorrection: "L" | "M" | "Q" | "H";
  logoDataUrl: string | null;
  logoRemoveBg: boolean;
  showKompiMark: boolean;

  // NEW customization
  moduleShape: ModuleShape;
  eyeShape: EyeShape;
  gradientEnabled: boolean;
  gradientFrom: string;
  gradientTo: string;
  frameStyle: FrameStyle;
  frameText: string;
};

const DEFAULT_STATE: QrState = {
  mode: "url",
  url: "",
  text: "",
  email: "",
  phone: "",
  wifiSsid: "",
  wifiPassword: "",
  wifiSecurity: "WPA",
  smsNumber: "",
  smsMessage: "",
  foregroundColor: "#050505",
  backgroundColor: "#ffffff",
  size: 1000,
  margin: 2,
  errorCorrection: "M",
  logoDataUrl: null,
  logoRemoveBg: true,
  showKompiMark: true,

  moduleShape: "square",
  eyeShape: "square",
  gradientEnabled: false,
  gradientFrom: "#050505",
  gradientTo: "#050505",
  frameStyle: "none",
  frameText: "Scan me",
};

export function FreeQrGenerator() {
  const [state, setState] = useState<QrState>(DEFAULT_STATE);
  const [openSection, setOpenSection] =
    useState<"colors" | "logo" | "design" | null>("colors");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // visual size of preview square in the UI (download is still state.size)
  const previewSize = 220;

  /* ---------- helpers ---------- */

  const buildContent = useCallback((): string => {
    switch (state.mode) {
      case "url":
        return state.url.trim();
      case "text":
        return state.text.trim();
      case "email":
        return state.email.trim() ? `mailto:${state.email.trim()}` : "";
      case "phone":
        return state.phone.trim() ? `tel:${state.phone.trim()}` : "";
      case "wifi":
        return `WIFI:T:${state.wifiSecurity};S:${state.wifiSsid};P:${state.wifiPassword};${
          state.wifiSecurity === "nopass" ? "N:true;" : ""
        };`;
      case "sms":
        return state.smsNumber.trim()
          ? `SMSTO:${state.smsNumber.trim()}:${state.smsMessage}`
          : "";
      default:
        return "";
    }
  }, [state]);

  const content = buildContent();
  const hasContent = content.length > 0;

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setState((prev) => ({
        ...prev,
        logoDataUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });

  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const isEyeModule = (
    row: number,
    col: number,
    modulesCount: number
  ): boolean => {
    const inTopLeft = row <= 6 && col <= 6;
    const inTopRight = row <= 6 && col >= modulesCount - 7;
    const inBottomLeft = row >= modulesCount - 7 && col <= 6;
    return inTopLeft || inTopRight || inBottomLeft;
  };

  /* ---------- QR rendering (custom shapes + gradient) ---------- */

  const generateQr = useCallback(async () => {
    if (!hasContent || !canvasRef.current) {
      setHasGenerated(false);
      return;
    }

    setIsGenerating(true);
    try {
      const canvas = canvasRef.current;
      const size = state.size;

      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setHasGenerated(false);
        return;
      }

      // Clear + background
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = state.backgroundColor || "#ffffff";
      ctx.fillRect(0, 0, size, size);

      // Build QR matrix
      const qr = QRCode.create(content, {
        errorCorrectionLevel: state.errorCorrection,
      });

      const modulesCount = qr.modules.size;
      const marginModules = state.margin;

      // Reserve extra vertical space at the bottom when a label-frame is enabled,
      // so the "Scan me" pill sits OUTSIDE the QR code and stays scannable.
      const extraLabelCells = state.frameStyle === "label" ? 4 : 0;
      const totalCells = modulesCount + marginModules * 2 + extraLabelCells;

      const cellSize = size / totalCells;
      const offsetX = marginModules * cellSize;
      const offsetY = marginModules * cellSize;

      // Optional frame border around QR
      if (state.frameStyle === "label") {
        const framePadding = cellSize * 0.6;
        const frameX = offsetX - framePadding;
        const frameY = offsetY - framePadding;
        const frameW = modulesCount * cellSize + framePadding * 2;
        const frameH = modulesCount * cellSize + framePadding * 2;

        ctx.save();
        drawRoundedRect(ctx, frameX, frameY, frameW, frameH, framePadding);
        ctx.lineWidth = cellSize * 0.4;
        ctx.strokeStyle = state.foregroundColor || "#050505";
        ctx.stroke();
        ctx.restore();
      }

      // Gradient or flat color for modules
      let moduleFill: string | CanvasGradient;
      if (state.gradientEnabled) {
        const grad = ctx.createLinearGradient(0, 0, size, size);
        grad.addColorStop(0, state.gradientFrom || state.foregroundColor);
        grad.addColorStop(1, state.gradientTo || state.foregroundColor);
        moduleFill = grad;
      } else {
        moduleFill = state.foregroundColor || "#000000";
      }

      ctx.fillStyle = moduleFill;

      // Draw modules (body + eyes, with separate shapes)
      for (let r = 0; r < modulesCount; r++) {
        for (let c = 0; c < modulesCount; c++) {
          if (!qr.modules.get(r, c)) continue;

          const x = offsetX + c * cellSize;
          const y = offsetY + r * cellSize;

          const eye = isEyeModule(r, c, modulesCount);
          const shape: ModuleShape | EyeShape = eye
            ? state.eyeShape
            : state.moduleShape;

          ctx.beginPath();
          if (shape === "square") {
            ctx.rect(x, y, cellSize, cellSize);
          } else if (shape === "rounded") {
            drawRoundedRect(ctx, x, y, cellSize, cellSize, cellSize * 0.4);
          } else {
            // "dots" – circular modules
            const radius = cellSize * 0.48;
            const cx = x + cellSize / 2;
            const cy = y + cellSize / 2;
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      }

      // Center logo
      if (state.logoDataUrl) {
        try {
          const logoImg = await loadImage(state.logoDataUrl);
          const logoSize = size * 0.22;
          const logoX = size / 2 - logoSize / 2;
          const logoY = size / 2 - logoSize / 2;

          if (state.logoRemoveBg) {
            ctx.save();
            ctx.fillStyle = "#ffffff";
            drawRoundedRect(
              ctx,
              logoX,
              logoY,
              logoSize,
              logoSize,
              logoSize * 0.2
            );
            ctx.fill();
            ctx.restore();
          }

          ctx.save();
          drawRoundedRect(
            ctx,
            logoX,
            logoY,
            logoSize,
            logoSize,
            logoSize * 0.2
          );
          ctx.clip();
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          ctx.restore();
        } catch (err: unknown) {
          // eslint-disable-next-line no-console
          console.error("Failed loading logo image", err);
        }
      }

      // Kompi logo bottom-right (preserve aspect ratio, no pill)
      if (state.showKompiMark) {
        try {
          const kompiImg = await loadImage("/Kompiwhite.svg");
          const maxMarkSize = size * 0.16;
          const padding = size * 0.04;

          const scale = Math.min(
            maxMarkSize / kompiImg.width,
            maxMarkSize / kompiImg.height
          );
          const markW = kompiImg.width * scale;
          const markH = kompiImg.height * scale;

          const x = size - markW - padding;
          const y = size - markH - padding;

          ctx.save();
          ctx.drawImage(kompiImg, x, y, markW, markH);
          ctx.restore();
        } catch (err: unknown) {
          // eslint-disable-next-line no-console
          console.error("Failed loading Kompi logo", err);
        }
      }

      // Frame label baked into PNG (below QR)
      if (state.frameStyle === "label") {
        const labelText = state.frameText || "Scan me";

        ctx.save();
        ctx.font = `${cellSize * 1.2}px system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif`;
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";

        const metrics = ctx.measureText(labelText);
        const textWidth = metrics.width;
        const paddingX = cellSize * 1.2;
        const paddingY = cellSize * 0.9;

        const pillWidth = textWidth + paddingX * 2;
        const pillHeight = cellSize * 2.4;

        const pillX = size / 2 - pillWidth / 2;
        const pillY =
          offsetY + modulesCount * cellSize + cellSize * 0.8;

        // Dark pill
        drawRoundedRect(
          ctx,
          pillX,
          pillY,
          pillWidth,
          pillHeight,
          pillHeight / 2
        );
        ctx.fillStyle = "#050505";
        ctx.fill();

        // Text
        ctx.fillStyle = "#f5f3ee";
        ctx.fillText(
          labelText,
          size / 2,
          pillY + pillHeight / 2 + cellSize * 0.05
        );

        ctx.restore();
      }

      setHasGenerated(true);
    } catch (err: unknown) {
      // eslint-disable-next-line no-console
      console.error("QR generation failed", err);
      setHasGenerated(false);
    } finally {
      setIsGenerating(false);
    }
  }, [
    hasContent,
    content,
    state.size,
    state.margin,
    state.errorCorrection,
    state.foregroundColor,
    state.backgroundColor,
    state.logoDataUrl,
    state.logoRemoveBg,
    state.showKompiMark,
    state.moduleShape,
    state.eyeShape,
    state.gradientEnabled,
    state.gradientFrom,
    state.gradientTo,
    state.frameStyle,
    state.frameText,
  ]);

  // Real-time updates (debounced)  // Real-time updates (debounced)  // Real-time updates (debounced)
  useEffect(() => {
    if (!hasContent) {
      setHasGenerated(false);
      return;
    }
    const t = window.setTimeout(() => {
      void generateQr();
    }, 250);

    return () => window.clearTimeout(t);
  }, [hasContent, generateQr]);

  const handleDownload = () => {
    if (!canvasRef.current || !hasGenerated) return;

    const link = document.createElement("a");
    link.download = "kompi-qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const SectionToggle = ({
    id,
    title,
  }: {
    id: "colors" | "logo" | "design";
    title: string;
  }) => {
    const isOpen = openSection === id;
    return (
      <button
        type="button"
        onClick={() =>
          setOpenSection((prev) => (prev === id ? null : id))
        }
        className={cn(
          "flex w-full items-center justify-between rounded-[18px] border px-4 py-2 text-[13px] font-medium tracking-[0.06em]",
          "bg-[#f5f3ee] hover:bg-[#ece7dd] text-[#444036]"
        )}
      >
        <span>{title}</span>
        <span className="text-xs">{isOpen ? "−" : "+"}</span>
      </button>
    );
  };

  /* ---------- layout ---------- */

  return (
    <section className="min-h-[640px] bg-[#050816] py-10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:px-8">
        {/* LEFT: controls */}
        <Card className="space-y-6 rounded-[28px] border border-black/10 bg-[#f5f3ee] p-5 shadow-none">
          {/* Mode tabs */}
          <div className="flex flex-wrap gap-2">
            {(["url", "text", "email", "phone", "wifi", "sms"] as QrMode[]).map(
              (mode) => {
                const label =
                  mode === "url"
                    ? "URL"
                    : mode === "wifi"
                    ? "Wi-Fi"
                    : mode === "sms"
                    ? "SMS"
                    : mode[0].toUpperCase() + mode.slice(1);
                const active = state.mode === mode;

                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() =>
                      setState((prev) => ({ ...prev, mode }))
                    }
                    className={cn(
                      "min-w-[84px] rounded-[18px] border px-4 py-1.5 text-[11px] font-medium tracking-[0.08em]",
                      active
                        ? "border-black bg-white shadow-[0_2px_0_#000000] text-[#050505]"
                        : "border-transparent bg-[#e5e0d6] text-[#555555] hover:bg-[#ddd6c9]"
                    )}
                  >
                    {label}
                  </button>
                );
              }
            )}
          </div>

          {/* Enter content */}
          <div className="space-y-3 rounded-[24px] border border-black/10 bg-white px-4 py-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-[#77725f]">
                ENTER CONTENT
              </p>
              <span className="text-[10px] uppercase tracking-[0.14em] text-[#a39b8a]">
                Required
              </span>
            </div>

            {state.mode === "url" && (
              <Input
                placeholder="https://your-link.com"
                value={state.url}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, url: e.target.value }))
                }
                className="h-10 rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
              />
            )}

            {state.mode === "text" && (
              <Textarea
                rows={3}
                placeholder="Your message or text..."
                value={state.text}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, text: e.target.value }))
                }
                className="rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
              />
            )}

            {state.mode === "email" && (
              <Input
                type="email"
                placeholder="hello@example.com"
                value={state.email}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, email: e.target.value }))
                }
                className="h-10 rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
              />
            )}

            {state.mode === "phone" && (
              <Input
                type="tel"
                placeholder="+44 7700 900123"
                value={state.phone}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="h-10 rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
              />
            )}

            {state.mode === "wifi" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <p className="text-[11px] text-[#77725f]">
                    Wi-Fi network (SSID)
                  </p>
                  <Input
                    placeholder="MyWifiNetwork"
                    value={state.wifiSsid}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        wifiSsid: e.target.value,
                      }))
                    }
                    className="h-10 rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-[#77725f]">Password</p>
                  <Input
                    placeholder="Password"
                    value={state.wifiPassword}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        wifiPassword: e.target.value,
                      }))
                    }
                    className="h-10 rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-[#77725f]">Security</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(["WPA", "WEP", "nopass"] as const).map((sec) => {
                      const active = state.wifiSecurity === sec;
                      return (
                        <button
                          key={sec}
                          type="button"
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              wifiSecurity: sec,
                            }))
                          }
                          className={cn(
                            "rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.08em]",
                            active
                              ? "border-black bg-white shadow-[0_1px_0_#000000] text-[#050505]"
                              : "border-transparent bg-[#f0ede7] text-[#555555]"
                          )}
                        >
                          {sec === "nopass" ? "None" : sec}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {state.mode === "sms" && (
              <div className="space-y-3">
                <Input
                  type="tel"
                  placeholder="Recipient number"
                  value={state.smsNumber}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      smsNumber: e.target.value,
                    }))
                  }
                  className="h-10 rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
                />
                <Textarea
                  rows={2}
                  placeholder="SMS message (optional)"
                  value={state.smsMessage}
                  onChange={(e) =>
                    setState((prev) => ({
                      ...prev,
                      smsMessage: e.target.value,
                    }))
                  }
                  className="rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
                />
              </div>
            )}
          </div>

          {/* Dropdown sections */}
          <div className="space-y-3">
            {/* Set colors */}
            <div className="space-y-2 rounded-[20px] bg-[#f0ece4] p-3">
              <SectionToggle id="colors" title="Set colors" />
              {openSection === "colors" && (
                <div className="mt-3 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <ColorSwatch
                      label="QR color"
                      value={state.foregroundColor}
                      onChange={(v) =>
                        setState((prev) => ({ ...prev, foregroundColor: v }))
                      }
                    />
                    <ColorSwatch
                      label="Background"
                      value={state.backgroundColor}
                      onChange={(v) =>
                        setState((prev) => ({ ...prev, backgroundColor: v }))
                      }
                    />
                  </div>

                  {/* Gradient controls */}
                  <div className="rounded-[16px] bg-[#e5ded2] p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold tracking-[0.1em] text-[#5f584a]">
                        GRADIENT FILL
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            gradientEnabled: !prev.gradientEnabled,
                          }))
                        }
                        className={cn(
                          "rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.08em]",
                          state.gradientEnabled
                            ? "border-black bg-white shadow-[0_1px_0_#000000] text-[#050505]"
                            : "border-transparent bg-[#f0ede7] text-[#555555]"
                        )}
                      >
                        {state.gradientEnabled ? "On" : "Off"}
                      </button>
                    </div>

                    {state.gradientEnabled && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <ColorSwatch
                          label="From"
                          value={state.gradientFrom}
                          onChange={(v) =>
                            setState((prev) => ({ ...prev, gradientFrom: v }))
                          }
                        />
                        <ColorSwatch
                          label="To"
                          value={state.gradientTo}
                          onChange={(v) =>
                            setState((prev) => ({ ...prev, gradientTo: v }))
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Add logo image */}
            <div className="space-y-2 rounded-[20px] bg-[#f0ece4] p-3">
              <SectionToggle id="logo" title="Add logo image" />
              {openSection === "logo" && (
                <div className="mt-3 space-y-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex w-full items-center justify-between rounded-[18px] border border-dashed border-black/20 bg-[#f7f4ed] px-4 py-3 text-[11px] text-[#555555]"
                  >
                    <span>Select logo file (PNG, JPG, SVG)</span>
                    <span className="rounded-full bg-white px-4 py-2 text-[11px] font-medium">
                      Browse
                    </span>
                  </button>
                  {state.logoDataUrl && (
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={state.logoDataUrl}
                        alt="Logo preview"
                        className="h-10 w-10 rounded-2xl border border-black/10 bg-white object-contain"
                      />
                      <p className="text-[11px] text-[#77725f]">
                        Logo is centered inside the code. For best results use a
                        transparent PNG.
                      </p>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setState((prev) => ({
                          ...prev,
                          logoRemoveBg: !prev.logoRemoveBg,
                        }))
                      }
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[10px] font-medium tracking-[0.08em]",
                        state.logoRemoveBg
                          ? "border-black bg-white shadow-[0_1px_0_#000000] text-[#050505]"
                          : "border-transparent bg-[#f0ede7] text-[#555555]"
                      )}
                    >
                      {state.logoRemoveBg
                        ? "Remove background behind logo"
                        : "Keep QR behind logo"}
                    </button>
                    {state.logoDataUrl && (
                      <button
                        type="button"
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            logoDataUrl: null,
                          }))
                        }
                        className="text-[11px] text-[#a33a3a] underline-offset-4 hover:underline"
                      >
                        Remove logo
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </div>
              )}
            </div>

            {/* Customize design */}
            <div className="space-y-2 rounded-[20px] bg-[#f0ece4] p-3">
              <SectionToggle id="design" title="Customize design" />
              {openSection === "design" && (
                <div className="mt-3 space-y-3">
                  {/* Size slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-[#555555]">
                      <span>Pixel size</span>
                      <span className="font-semibold">{state.size}px</span>
                    </div>
                    <input
                      type="range"
                      min={400}
                      max={2000}
                      step={50}
                      value={state.size}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          size: Number(e.target.value),
                        }))
                      }
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#c8c3ba]"
                    />
                    <p className="text-[10px] text-[#9a9387]">
                      For print, use at least 1000px.
                    </p>
                  </div>

                  {/* Module + eye shapes + error correction */}
                  <div className="space-y-2">
                    {/* Module shapes */}
                    <div className="space-y-1">
                      <p className="text-[11px] text-[#77725f]">
                        Module style
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(
                          ["square", "rounded", "dots"] as ModuleShape[]
                        ).map((shape) => {
                          const label =
                            shape === "square"
                              ? "Square"
                              : shape === "rounded"
                              ? "Rounded"
                              : "Dots";
                          const active = state.moduleShape === shape;
                          return (
                            <button
                              key={shape}
                              type="button"
                              onClick={() =>
                                setState((prev) => ({
                                  ...prev,
                                  moduleShape: shape,
                                }))
                              }
                              className={cn(
                                "rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.08em]",
                                active
                                  ? "border-black bg-white shadow-[0_1px_0_#000000] text-[#050505]"
                                  : "border-transparent bg-[#f0ede7] text-[#555555]"
                              )}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Eye shapes */}
                    <div className="space-y-1">
                      <p className="text-[11px] text-[#77725f]">
                        Corner style
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(
                          ["square", "rounded"] as EyeShape[]
                        ).map((shape) => {
                          const label =
                            shape === "square" ? "Sharp" : "Rounded";
                          const active = state.eyeShape === shape;
                          return (
                            <button
                              key={shape}
                              type="button"
                              onClick={() =>
                                setState((prev) => ({
                                  ...prev,
                                  eyeShape: shape,
                                }))
                              }
                              className={cn(
                                "rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.08em]",
                                active
                                  ? "border-black bg-white shadow-[0_1px_0_#000000] text-[#050505]"
                                  : "border-transparent bg-[#f0ede7] text-[#555555]"
                              )}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Error correction */}
                    <div className="space-y-1">
                      <p className="text-[11px] text-[#77725f]">
                        QR reliability (error correction)
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(["L", "M", "Q", "H"] as const).map((level) => {
                          const active = state.errorCorrection === level;
                          return (
                            <button
                              key={level}
                              type="button"
                              onClick={() =>
                                setState((prev) => ({
                                  ...prev,
                                  errorCorrection: level,
                                }))
                              }
                              className={cn(
                                "rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.08em]",
                                active
                                  ? "border-black bg-white shadow-[0_1px_0_#000000] text-[#050505]"
                                  : "border-transparent bg-[#f0ede7] text-[#555555]"
                              )}
                            >
                              {level}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Margin */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] text-[#77725f]">
                      Quiet zone (margin)
                    </p>
                    <Input
                      type="number"
                      min={0}
                      max={10}
                      value={state.margin}
                      onChange={(e) =>
                        setState((prev) => ({
                          ...prev,
                          margin: Number(e.target.value) || 0,
                        }))
                      }
                      className="h-9 w-24 rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
                    />
                  </div>

                  {/* Frame with label */}
                  <div className="space-y-1.5">
                    <p className="text-[11px] text-[#77725f]">Frame</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            frameStyle: "none",
                          }))
                        }
                        className={cn(
                          "rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.08em]",
                          state.frameStyle === "none"
                            ? "border-black bg-white shadow-[0_1px_0_#000000] text-[#050505]"
                            : "border-transparent bg-[#f0ede7] text-[#555555]"
                        )}
                      >
                        None
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setState((prev) => ({
                            ...prev,
                            frameStyle: "label",
                          }))
                        }
                        className={cn(
                          "rounded-full border px-4 py-2 text-[11px] font-medium tracking-[0.08em]",
                          state.frameStyle === "label"
                            ? "border-black bg-white shadow-[0_1px_0_#000000] text-[#050505]"
                            : "border-transparent bg-[#f0ede7] text-[#555555]"
                        )}
                      >
                        Scan-me label
                      </button>
                    </div>

                    {state.frameStyle === "label" && (
                      <Input
                        value={state.frameText}
                        onChange={(e) =>
                          setState((prev) => ({
                            ...prev,
                            frameText: e.target.value,
                          }))
                        }
                        placeholder="Scan me"
                        className="mt-1 h-9 max-w-xs rounded-2xl border border-black/10 bg-[#f7f4ed] text-sm"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* RIGHT: preview */}
        <Card className="flex flex-col rounded-[28px] border border-black/10 bg-[#f5f3ee] p-5 shadow-none">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[#77725f]">
              PREVIEW
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e0ded9] px-3 py-1 text-[11px] text-[#444036]">
              <span className="inline-block h-2 w-2 rounded-full bg-[#16a34a]" />
              {hasGenerated ? "Ready to scan" : "Waiting for QR"}
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div
              className="relative flex items-center justify-center rounded-[30px] border border-black/10 bg-gradient-to-b from-[#f7f4ed] to-[#ebe5d8] p-6 shadow-[0_24px_40px_rgba(0,0,0,0.12)]"
              style={{
                width: previewSize + 56,
                height: previewSize + 56,
              }}
            >
              <div className="flex flex-col items-center gap-2">
                {/* Frame + QR */}
                <div
                  className={cn(
                    "flex items-center justify-center",
                    state.frameStyle === "label"
                      ? "rounded-[28px] border-2 border-[#050505] bg-white px-4 py-4"
                      : ""
                  )}
                >
                  <canvas
                    ref={canvasRef}
                    className="rounded-[22px] bg-white"
                    style={{
                      width: previewSize,
                      height: previewSize,
                      maxWidth: previewSize,
                      maxHeight: previewSize,
                    }}
                  />
                </div>

                {/* Frame label */}
                {state.frameStyle === "label" && (
                  <div className="rounded-full bg-[#050505] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f5f3ee]">
                    {state.frameText || "Scan me"}
                  </div>
                )}
              </div>

              {!hasGenerated && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[30px] text-[11px] text-[#8a8478]">
                  Enter content to generate your QR
                </div>
              )}
            </div>
          </div>

          {/* Theme shortcuts */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#77725f]">
              <span className="font-semibold uppercase tracking-[0.14em]">
                Themes
              </span>
              {[
                {
                  id: "classic",
                  label: "Classic",
                  fg: "#050505",
                  bg: "#ffffff",
                  moduleShape: "square" as ModuleShape,
                },
                {
                  id: "lime",
                  label: "Soft lime",
                  fg: "#050505",
                  bg: "#EBFF54",
                  moduleShape: "rounded" as ModuleShape,
                },
                {
                  id: "midnight",
                  label: "Midnight",
                  fg: "#f5f5f0",
                  bg: "#050816",
                  moduleShape: "dots" as ModuleShape,
                },
              ].map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      foregroundColor: theme.fg,
                      backgroundColor: theme.bg,
                      moduleShape: theme.moduleShape,
                      gradientEnabled: false,
                    }))
                  }
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-[11px] font-medium tracking-[0.08em] hover:bg-white"
                >
                  {theme.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Only Download now – QR auto-generates */}
              <button
                type="button"
                disabled={!hasGenerated}
                onClick={handleDownload}
                className={cn(
                  "inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.06em] transition",
                  hasGenerated
                    ? "border-black bg-[#050505] text-[#f5f3ee] hover:bg-black"
                    : "cursor-not-allowed border-[#c9c6bf] bg-[#e5e2dc] text-[#9d988c]"
                )}
              >
                Download PNG
              </button>
            </div>
          </div>

          <p className="mt-3 text-[10px] text-[#9a9387]">
            Tip: export at {state.size}px or higher and leave some white space
            around the code when printing.
          </p>
        </Card>
      </div>
    </section>
  );
}

/* -------- helper: color swatch -------- */

function ColorSwatch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-8 w-8 rounded-full border border-black/10 bg-white">
        <div
          className="absolute inset-[4px] rounded-full border border-black/10"
          style={{ backgroundColor: value }}
        />
        <input
          type="color"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] text-[#77725f]">{label}</span>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-0.5 h-8 w-32 rounded-2xl border border-black/10 bg-[#f7f4ed] px-2 text-[11px]"
        />
      </div>
    </div>
  );
}
