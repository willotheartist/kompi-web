//src/components/qr-code-generator/QrGenerator.tsx

"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling from "qr-code-styling";
import Link from "next/link";

type QrType = "url" | "text" | "email" | "phone" | "sms" | "wifi";
type LogoScale = "small" | "medium" | "large";
type DotStyle = "square" | "rounded" | "circle" | "diamond" | "star" | "plus";
type QrQuality = "low" | "medium" | "high";

// Map Kompi's dot style names to qr-code-styling types
type DotEngineType =
  | "square"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";

type DesignTab = "shape" | "frame" | "logo";

const qrTypes: { key: QrType; label: string }[] = [
  { key: "url", label: "Link" },
  { key: "text", label: "Text" },
  { key: "email", label: "E-mail" },
  { key: "phone", label: "Call" },
  { key: "sms", label: "SMS" },
  { key: "wifi", label: "Wi-Fi" },
];

const qrTypeIcons: Record<QrType, string> = {
  url: "🔗",
  text: "📝",
  email: "✉️",
  phone: "📞",
  sms: "💬",
  wifi: "📶",
};

function mapDotStyle(dotStyle: DotStyle): DotEngineType {
  switch (dotStyle) {
    case "square":
      return "square";
    case "rounded":
      return "rounded";
    case "circle":
      return "dots";
    case "diamond":
      return "classy";
    case "star":
      return "classy-rounded";
    case "plus":
      return "extra-rounded";
    default:
      return "square";
  }
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.max(0, Math.min(radius, Math.min(width / 2, height / 2)));
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

export function QrGenerator() {
  const [activeType, setActiveType] = useState<QrType>("url");

  // Content
  const [url, setUrl] = useState("");
  const [textContent, setTextContent] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [smsNumber, setSmsNumber] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEncryption, setWifiEncryption] =
    useState<"WPA" | "WEP" | "nopass">("WPA");

  // Appearance
  const [fgColor, setFgColor] = useState("#111827");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [margin, setMargin] = useState(2);

  const [cardPadding, setCardPadding] = useState(8);
  const [borderColor, setBorderColor] = useState("#e5e7eb");
  const [borderWidth, setBorderWidth] = useState(8);
  const [borderStyle, setBorderStyle] = useState<"solid" | "dashed">("solid");

  // QR dot style & quality
  const [dotStyle, setDotStyle] = useState<DotStyle>("square");
  const [qrQuality, setQrQuality] = useState<QrQuality>("medium");
  const [activeDesignTab, setActiveDesignTab] = useState<DesignTab>("shape");

  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoShape, setLogoShape] = useState<"square" | "circle">("square");
  const [logoScale, setLogoScale] = useState<LogoScale>("medium");
  const [removeLogoBg, setRemoveLogoBg] = useState(true);

  const [frameText, setFrameText] = useState("");
  const [frameBgColor, setFrameBgColor] = useState("#f9fafb");
  const [frameTextColor, setFrameTextColor] = useState("#111827");
  const [showFrame, setShowFrame] = useState(true);

  const [loading, setLoading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const baseObjectUrlRef = useRef<string | null>(null);
  const lastQualityRef = useRef<QrQuality | null>(null);

  const hasQr = !!qrDataUrl;

  // ---------- helpers ----------

  const buildValueForQr = (): string | null => {
    switch (activeType) {
      case "url": {
        const v = url.trim();
        return v || null;
      }
      case "text": {
        const v = textContent.trim();
        return v || null;
      }
      case "email": {
        const addr = emailAddress.trim();
        if (!addr) return null;
        const params = new URLSearchParams();
        if (emailSubject.trim()) params.set("subject", emailSubject.trim());
        if (emailBody.trim()) params.set("body", emailBody.trim());
        const qs = params.toString();
        return qs ? `mailto:${addr}?${qs}` : `mailto:${addr}`;
      }
      case "phone": {
        const v = phoneNumber.trim();
        return v ? `tel:${v}` : null;
      }
      case "sms": {
        const number = smsNumber.trim();
        if (!number) return null;
        const message = smsMessage.trim();
        return message ? `SMSTO:${number}:${message}` : `SMSTO:${number}`;
      }
      case "wifi": {
        const ssid = wifiSsid.trim();
        if (!ssid) return null;
        const enc = wifiEncryption;
        const pwd = wifiPassword.trim();
        const parts = [
          "WIFI:",
          `T:${enc};`,
          `S:${ssid};`,
          enc !== "nopass" && pwd ? `P:${pwd};` : "",
          ";",
        ];
        return parts.join("");
      }
      default:
        return null;
    }
  };

  const encodedValue = buildValueForQr();
  const canGenerate = !!encodedValue;

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = "kompi-qr.png";
    link.click();
  };

  const handleCopyValue = async () => {
    if (!encodedValue) return;
    try {
      await navigator.clipboard.writeText(encodedValue);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const cardCornerRadius = 24;

  // ---------- live preview using qr-code-styling + canvas ----------

  useEffect(() => {
    const baseSize =
      qrQuality === "low" ? 512 : qrQuality === "high" ? 2048 : 1024;

    if (!qrInstanceRef.current || lastQualityRef.current !== qrQuality) {
      qrInstanceRef.current = new QRCodeStyling({
        width: baseSize,
        height: baseSize,
      });
      lastQualityRef.current = qrQuality;
    }

    const instance = qrInstanceRef.current;
    if (!instance) return;

    if (!encodedValue) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQrDataUrl(null);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const effectiveMargin = logoDataUrl ? Math.max(margin, 4) : margin;

        instance.update({
          data: encodedValue,
          margin: effectiveMargin,
          qrOptions: {
            errorCorrectionLevel: "H",
          },
          dotsOptions: {
            type: mapDotStyle(dotStyle),
            color: fgColor,
          },
          backgroundOptions: {
            color: bgColor,
          },
          image: logoDataUrl || undefined,
          imageOptions: {
            hideBackgroundDots: removeLogoBg,
            // Make S / M / L logo sizes clearly different
            imageSize:
              logoScale === "small"
                ? 0.12
                : logoScale === "large"
                ? 0.28
                : 0.18,
            crossOrigin: "anonymous",
          },
        });

        const blob = (await instance.getRawData("png")) as Blob | null;
        if (cancelled || !blob) return;

        const objectUrl = URL.createObjectURL(blob);
        baseObjectUrlRef.current = objectUrl;

        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
          if (cancelled) {
            URL.revokeObjectURL(objectUrl);
            return;
          }

          const qrSize = img.width; // square
          const hasFrameLabel = showFrame && frameText.trim().length > 0;
          const padding = (cardPadding / 100) * qrSize;
          const frameBarHeight = hasFrameLabel ? qrSize / 8 : 0;

          const cardWidth = qrSize + padding * 2;
          const cardHeight = qrSize + padding * 2 + frameBarHeight;

          const canvas = document.createElement("canvas");
          canvas.width = cardWidth;
          canvas.height = cardHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            URL.revokeObjectURL(objectUrl);
            return;
          }

          const radius = Math.min(
            cardCornerRadius,
            cardWidth / 2,
            cardHeight / 2
          );

          ctx.save();

          // Card background + border as layered rounded rectangles
          const borderPx = borderWidth > 0 ? borderWidth * (qrSize / 512) : 0;

          if (borderPx > 0) {
            // Outer border layer
            ctx.fillStyle = borderColor;
            drawRoundedRect(ctx, 0, 0, cardWidth, cardHeight, radius);
            ctx.fill();

            // Inner card layer (background), inset by border width
            ctx.fillStyle = "#f9fafb";
            drawRoundedRect(
              ctx,
              borderPx,
              borderPx,
              cardWidth - borderPx * 2,
              cardHeight - borderPx * 2,
              Math.max(0, radius - borderPx)
            );
            ctx.fill();
          } else {
            // No border – single flat card
            ctx.fillStyle = "#f9fafb";
            drawRoundedRect(ctx, 0, 0, cardWidth, cardHeight, radius);
            ctx.fill();
          }

          // QR image (square, untouched by card shape)
          const qrX = padding;
          const qrY = padding;
          ctx.drawImage(img, qrX, qrY, qrSize, qrSize);

          // Frame label (below QR)
          if (hasFrameLabel) {
            const barPaddingY = padding / 2;
            const barY = qrY + qrSize + barPaddingY;
            const barHeight = frameBarHeight - barPaddingY;

            const barRadius = 16 * (qrSize / 512);

            ctx.fillStyle = frameBgColor;
            drawRoundedRect(ctx, qrX, barY, qrSize, barHeight, barRadius);
            ctx.fill();

            ctx.fillStyle = frameTextColor;
            ctx.font = `${18 * (qrSize / 512)}px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const text = frameText.trim();
            const textX = qrX + qrSize / 2;
            const textY = barY + barHeight / 2;
            const maxWidth = qrSize - 24 * (qrSize / 512);

            ctx.fillText(text, textX, textY, maxWidth);
          }

          // --- Kompi branding (always on, anchored to QR bottom-right) ---
          const brandText = "kompi";
          const brandFontSize = 22 * (qrSize / 512);
          const brandPaddingX = padding * 0.8;
          const brandPaddingY = padding * 0.8;

          const brandX = qrX + qrSize - brandPaddingX;
          const brandY = qrY + qrSize - brandPaddingY;

          ctx.fillStyle = "#4F46E5";
          ctx.font = `600 ${brandFontSize}px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
          ctx.textAlign = "right";
          ctx.textBaseline = "bottom";
          ctx.fillText(brandText, brandX, brandY);
          // --------------------------------------------------------

          ctx.restore();

          const finalUrl = canvas.toDataURL("image/png");
          setQrDataUrl(finalUrl);

          URL.revokeObjectURL(objectUrl);
          baseObjectUrlRef.current = null;
          setLoading(false);
        };

        img.onerror = () => {
          URL.revokeObjectURL(objectUrl);
          baseObjectUrlRef.current = null;
          if (!cancelled) {
            setLoading(false);
          }
        };

        img.src = objectUrl;
      } catch (err) {
        console.error("Failed to generate styled QR", err);
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    encodedValue,
    fgColor,
    bgColor,
    margin,
    dotStyle,
    logoDataUrl,
    logoScale,
    removeLogoBg,
    borderWidth,
    borderColor,
    borderStyle,
    cardPadding,
    frameText,
    frameBgColor,
    frameTextColor,
    showFrame,
    qrQuality,
  ]);

  // Clean up any QR object URL on unmount
  useEffect(() => {
    return () => {
      if (baseObjectUrlRef.current) {
        URL.revokeObjectURL(baseObjectUrlRef.current);
        baseObjectUrlRef.current = null;
      }
    };
  }, []);

  // ---------- UI ----------

  return (
    <section className="bg-[#f5f3ee] px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Hero */}
        <header className="space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Free QR code generator
          </p>
          <h1
            className="text-[28px] font-semibold tracking-tight text-slate-950 sm:text-[32px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Clean, custom QR codes
            <br />
            that just{" "}
            <span className="wf-serif-accent italic">work.</span>
          </h1>
          <p className="max-w-2xl text-sm leading-tight text-slate-600">
            Paste a link or add content, style the QR card to match your brand,
            then download a sharp PNG that&apos;s ready for menus, flyers,
            packaging and more.
          </p>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.1fr)]">
          {/* LEFT: content + design */}
          <div className="space-y-5">
            {/* STEP 1 – CONTENT */}
            <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-none lg:p-7">
              <div className="mb-5 flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-[11px] bg-slate-900 text-[11px] font-semibold text-white">
                  1
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-950">
                    Choose what your QR does
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    Pick a content type, then fill in the details. This is what
                    opens when someone scans your QR code.
                  </p>
                </div>
              </div>

              {/* Content type selector */}
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  QR content
                </p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {qrTypes.map((type) => {
                    const isActive = type.key === activeType;
                    return (
                      <button
                        key={type.key}
                        type="button"
                        onClick={() => setActiveType(type.key)}
                        className={[
                          "flex flex-col items-start gap-1 rounded-[14px] border px-2.5 py-2 text-left transition-colors",
                          isActive
                            ? "border-slate-900 bg-slate-900 text-slate-50 shadow-[0_2px_0_#000000]"
                            : "border-black/10 bg-slate-50/70 text-slate-600 hover:bg-slate-100",
                        ].join(" ")}
                      >
                        <span className="text-base">
                          {qrTypeIcons[type.key]}
                        </span>
                        <span className="text-[11px] font-medium">
                          {type.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content fields */}
              <div className="mt-6 space-y-4 text-sm">
                {activeType === "url" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-900">
                      Destination URL
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://your-restaurant.com/menu"
                      className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                    <p className="text-[11px] text-slate-500">
                      Use the full link including{" "}
                      <span className="font-mono text-[10px]">
                        https://
                      </span>
                      .
                    </p>
                  </div>
                )}

                {activeType === "text" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-900">
                      Text to show on scan
                    </label>
                    <textarea
                      rows={3}
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Scan me to see this text…"
                      className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                )}

                {activeType === "email" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-900">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-900">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder="Subject line"
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-900">
                          Message
                        </label>
                        <input
                          type="text"
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                          placeholder="Thanks for reaching out…"
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeType === "phone" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-900">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 555 123 4567"
                      className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                )}

                {activeType === "sms" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-slate-900">
                      SMS details
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        type="tel"
                        value={smsNumber}
                        onChange={(e) => setSmsNumber(e.target.value)}
                        placeholder="Number"
                        className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                        placeholder="Message"
                        className="rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeType === "wifi" && (
                  <div className="space-y-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-900">
                          Network name (SSID)
                        </label>
                        <input
                          type="text"
                          value={wifiSsid}
                          onChange={(e) => setWifiSsid(e.target.value)}
                          placeholder="My Wi-Fi"
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-900">
                          Password
                        </label>
                        <input
                          type="text"
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          placeholder="••••••••"
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-900">
                          Encryption
                        </label>
                        <select
                          value={wifiEncryption}
                          onChange={(e) =>
                            setWifiEncryption(
                              e.target.value as "WPA" | "WEP" | "nopass"
                            )
                          }
                          className="mt-1 w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none"
                        >
                          <option value="WPA">WPA</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">No password</option>
                        </select>
                      </div>
                      <p className="self-end text-[11px] leading-relaxed text-slate-500">
                        Wi-Fi details are encoded directly in the QR. They never
                        leave this page.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2 – DESIGN */}
            <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-none lg:p-7">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-[11px] bg-slate-900 text-[11px] font-semibold text-white">
                    2
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-950">
                      Design your QR card
                    </p>
                    <p className="text-[11px] leading-relaxed text-slate-600">
                      Adjust the dot style, colours, frame and logo so it feels
                      on-brand but still easy to scan.
                    </p>
                  </div>
                </div>
                {loading && canGenerate && (
                  <span className="text-[11px] text-slate-500">
                    Updating preview…
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div className="mb-4 inline-flex rounded-full bg-slate-100 p-1 text-[11px]">
                {[
                  { key: "shape", label: "Shape & colour" },
                  { key: "frame", label: "Frame & label" },
                  { key: "logo", label: "Center logo" },
                ].map((tab) => {
                  const isActive = activeDesignTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() =>
                        setActiveDesignTab(tab.key as DesignTab)
                      }
                      className={[
                        "rounded-full px-3 py-1.5 font-medium transition",
                        isActive
                          ? "bg-white text-slate-950 shadow-none"
                          : "text-slate-500",
                      ].join(" ")}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="space-y-4">
                {/* TAB: SHAPE & COLOUR */}
                {activeDesignTab === "shape" && (
                  <div className="space-y-4">
                    {/* Dot style */}
                    <section className="space-y-3 rounded-2xl border border-black/5 bg-slate-50/70 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-950">
                          Dot style
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Keep strong contrast between foreground and
                          background.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px]">
                        {(
                          [
                            { key: "square", label: "Square" },
                            { key: "rounded", label: "Rounded" },
                            { key: "circle", label: "Circle" },
                            { key: "diamond", label: "Diamond" },
                            { key: "star", label: "Star" },
                            { key: "plus", label: "Plus" },
                          ] as { key: DotStyle; label: string }[]
                        ).map((opt) => {
                          const isActive = dotStyle === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setDotStyle(opt.key)}
                              className={[
                                "flex items-center gap-2 rounded-full border px-3 py-1.5 transition-colors",
                                isActive
                                  ? "border-slate-900 bg-slate-900 text-slate-50"
                                  : "border-black/10 bg-white text-slate-600 hover:bg-slate-100",
                              ].join(" ")}
                            >
                              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-black/10 bg-slate-100">
                                <span className="block h-3 w-3 rounded-[3px] bg-slate-900" />
                              </span>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    {/* Colours + quiet zone */}
                    <section className="grid gap-4 text-[11px] md:grid-cols-3">
                      <div className="space-y-2 rounded-2xl border border-black/5 bg-white p-3">
                        <p className="text-[11px] font-medium text-slate-700">
                          Foreground
                        </p>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center">
                            <span
                              className="block h-6 w-6 rounded-full border border-black/10"
                              style={{ backgroundColor: fgColor }}
                            />
                            <input
                              type="color"
                              value={fgColor}
                              onChange={(e) => setFgColor(e.target.value)}
                              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />
                          </label>
                          <span className="text-slate-500">
                            Dark modules
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 rounded-2xl border border-black/5 bg-white p-3">
                        <p className="text-[11px] font-medium text-slate-700">
                          Background
                        </p>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center">
                            <span
                              className="block h-6 w-6 rounded-full border border-black/10"
                              style={{ backgroundColor: bgColor }}
                            />
                            <input
                              type="color"
                              value={bgColor}
                              onChange={(e) => setBgColor(e.target.value)}
                              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            />
                          </label>
                          <span className="text-slate-500">
                            Behind QR
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2 rounded-2xl border border-black/5 bg-white p-3">
                        <p className="text-[11px] font-medium text-slate-700">
                          Quiet zone
                        </p>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={0}
                            max={4}
                            step={1}
                            value={margin}
                            onChange={(e) =>
                              setMargin(Number(e.target.value))
                            }
                            className="flex-1"
                          />
                          <span className="w-5 text-right text-slate-500">
                            {margin}
                          </span>
                        </div>
                      </div>
                    </section>

                    {/* Quality */}
                    <section className="space-y-2 rounded-2xl border border-black/5 bg-slate-50/80 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold text-slate-900">
                          Download quality
                        </p>
                        <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[9px] font-medium tracking-wide text-slate-50">
                          PNG size
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px]">
                        {[
                          {
                            key: "low",
                            label: "Low",
                            detail: "512px • quick share",
                          },
                          {
                            key: "medium",
                            label: "Medium",
                            detail: "1024px • default",
                          },
                          {
                            key: "high",
                            label: "High",
                            detail: "2048px • print",
                          },
                        ].map((opt) => {
                          const isActive = qrQuality === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() =>
                                setQrQuality(opt.key as QrQuality)
                              }
                              className={[
                                "flex flex-col items-start gap-[2px] rounded-full border px-3 py-1.5 text-left transition-colors",
                                isActive
                                  ? "border-slate-900 bg-slate-900 text-slate-50"
                                  : "border-black/10 bg-white text-slate-600 hover:bg-slate-100",
                              ].join(" ")}
                            >
                              <span className="text-[11px] font-semibold">
                                {opt.label}
                              </span>
                              <span className="text-[10px] opacity-80">
                                {opt.detail}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-slate-500">
                        “High” is best for printed menus, posters and packaging.
                      </p>
                    </section>
                  </div>
                )}

                {/* TAB: FRAME & LABEL */}
                {activeDesignTab === "frame" && (
                  <div className="space-y-4">
                    {/* Padding & border */}
                    <section className="space-y-3 rounded-2xl border border-black/5 bg-slate-50/70 p-4">
                      <p className="text-xs font-semibold text-slate-950">
                        Padding & border
                      </p>
                      <div className="grid gap-4 text-[11px] md:grid-cols-3">
                        <div className="space-y-2">
                          <p className="text-slate-500">Padding</p>
                          <p className="text-[10px] text-slate-500">
                            Extra space around the QR inside the card.
                          </p>
                          <div className="flex items-center gap-3">
                            <input
                              type="range"
                              min={0}
                              max={18}
                              step={1}
                              value={cardPadding}
                              onChange={(e) => setCardPadding(Number(e.target.value))}
                              className="flex-1"
                            />
                            <span className="w-8 text-right text-slate-500">
                              {cardPadding}
                            </span>
                          </div>
                        </div>

                        
                        <div className="space-y-2">
                          <p className="text-slate-500">
                            Border & width
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <label className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center">
                                <span
                                  className="block h-6 w-6 rounded-full border border-black/10"
                                  style={{ backgroundColor: borderColor }}
                                />
                                <input
                                  type="color"
                                  value={borderColor}
                                  onChange={(e) =>
                                    setBorderColor(e.target.value)
                                  }
                                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                />
                              </label>
                              <span className="text-slate-500">
                                Card border
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min={0}
                                max={16}
                                step={1}
                                value={borderWidth}
                                onChange={(e) =>
                                  setBorderWidth(
                                    Number(e.target.value)
                                  )
                                }
                                className="flex-1"
                              />
                              <span className="w-5 text-right text-slate-500">
                                {borderWidth}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-slate-500">Border style</p>
                          <select
                            value={borderStyle}
                            onChange={(e) =>
                              setBorderStyle(
                                e.target.value as "solid" | "dashed"
                              )
                            }
                            className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none"
                          >
                            <option value="solid">Solid</option>
                            <option value="dashed">Dashed</option>
                          </select>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className={[
                                "h-px flex-1 border-t border-slate-900",
                                borderStyle === "dashed"
                                  ? "border-dashed"
                                  : "",
                              ].join(" ")}
                            />
                            <span className="text-[10px] text-slate-500">
                              Preview
                            </span>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Frame label */}
                    <section className="space-y-3 rounded-2xl border border-black/5 bg-white p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-slate-950">
                          Frame label
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowFrame((v) => !v)}
                          className={[
                            "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-[10px] transition-colors",
                            showFrame
                              ? "border-slate-900 bg-slate-900 text-slate-50"
                              : "border-black/10 bg-slate-50 text-slate-600",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "relative flex h-4 w-7 items-center rounded-full border border-black/20 bg-slate-100 transition-colors",
                              showFrame && "border-slate-900",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "absolute h-3 w-3 translate-x-[2px] rounded-full bg-slate-400 transition-transform",
                                showFrame &&
                                  "translate-x-[14px] bg-slate-50",
                              ].join(" ")}
                            />
                          </span>
                          {showFrame ? "On" : "Off"}
                        </button>
                      </div>

                      <div
                        className={[
                          "space-y-3",
                          !showFrame && "opacity-50",
                        ].join(" ")}
                      >
                        <div className="space-y-2">
                          <label className="text-[11px] text-slate-600">
                            Text
                          </label>
                          <input
                            type="text"
                            value={frameText}
                            onChange={(e) =>
                              setFrameText(e.target.value)
                            }
                            placeholder="Scan me"
                            disabled={!showFrame}
                            className="w-full rounded-2xl border border-black/10 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed"
                          />
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="block text-[11px] text-slate-600">
                              Frame background
                            </label>
                            <label className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center">
                              <span
                                className="block h-6 w-6 rounded-full border border-black/10"
                                style={{ backgroundColor: frameBgColor }}
                              />
                              <input
                                type="color"
                                value={frameBgColor}
                                onChange={(e) =>
                                  setFrameBgColor(e.target.value)
                                }
                                disabled={!showFrame}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                              />
                            </label>
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] text-slate-600">
                              Text colour
                            </label>
                            <label className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center">
                              <span
                                className="block h-6 w-6 rounded-full border border-black/10"
                                style={{ backgroundColor: frameTextColor }}
                              />
                              <input
                                type="color"
                                value={frameTextColor}
                                onChange={(e) =>
                                  setFrameTextColor(e.target.value)
                                }
                                disabled={!showFrame}
                                className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* TAB: LOGO */}
                {activeDesignTab === "logo" && (
                  <div className="space-y-4">
                    <section className="space-y-3 rounded-2xl border border-black/5 bg-white p-4">
                      <p className="text-xs font-semibold text-slate-950">
                        Center logo
                      </p>

                      <div className="space-y-2">
                        <label className="text-[11px] text-slate-600">
                          Upload logo
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="w-full text-[11px] text-slate-500 file:mr-2 file:cursor-pointer file:rounded-xl file:border file:border-black/10 file:bg-white file:px-3 file:py-1.5 file:text-[11px] file:font-medium file:text-slate-900"
                        />
                      </div>

                      <div className="mt-3 flex flex-wrap justify-between gap-6">
                        <div className="min-w-[120px] flex-1 space-y-2">
                          <p className="text-[11px] font-medium text-slate-800">
                            Shape
                          </p>
                          <div className="inline-flex gap-2">
                            {["square", "circle"].map((shape) => {
                              const isActive = logoShape === shape;
                              return (
                                <button
                                  key={shape}
                                  type="button"
                                  onClick={() =>
                                    setLogoShape(
                                      shape as "square" | "circle"
                                    )
                                  }
                                  className={[
                                    "rounded-full border px-4 py-1.5 text-[11px] capitalize transition-colors",
                                    isActive
                                      ? "border-slate-900 bg-slate-900 text-slate-50"
                                      : "border-black/10 bg-slate-50 text-slate-600 hover:bg-slate-100",
                                  ].join(" ")}
                                >
                                  {shape}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="min-w-[140px] flex-1 space-y-2">
                          <p className="text-[11px] font-medium text-slate-800">
                            Size
                          </p>
                          <div className="inline-flex gap-2">
                            {(
                              ["small", "medium", "large"] as LogoScale[]
                            ).map((size) => {
                              const isActive = logoScale === size;
                              return (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() => setLogoScale(size)}
                                  className={[
                                    "rounded-full border px-4 py-1.5 text-[11px] capitalize transition-colors",
                                    isActive
                                      ? "border-slate-900 bg-slate-900 text-slate-50"
                                      : "border-black/10 bg-slate-50 text-slate-600 hover:bg-slate-100",
                                  ].join(" ")}
                                >
                                  {size}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <p className="mt-3 text-[11px] text-slate-500">
                        Use a simple logo with good contrast. Avoid covering too
                        much of the centre area.
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-2 pt-1">
                        <p className="text-[11px] text-slate-600">
                          Remove background behind logo
                        </p>
                        <button
                          type="button"
                          onClick={() => setRemoveLogoBg((v) => !v)}
                          className={[
                            "inline-flex items-center gap-2 rounded-full border px-2 py-1 text-[10px] transition-colors",
                            removeLogoBg
                              ? "border-slate-900 bg-slate-900 text-slate-50"
                              : "border-black/10 bg-slate-50 text-slate-600",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "relative flex h-4 w-7 items-center rounded-full border border-black/20 bg-slate-100 transition-colors",
                              removeLogoBg && "border-slate-900",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "absolute h-3 w-3 translate-x-[2px] rounded-full bg-slate-400 transition-transform",
                                removeLogoBg &&
                                  "translate-x-[14px] bg-slate-50",
                              ].join(" ")}
                            />
                          </span>
                          {removeLogoBg ? "On" : "Off"}
                        </button>
                      </div>
                    </section>
                  </div>
                )}
              </div>

              {/* Upsell */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-black/10 bg-slate-50 px-3.5 py-3 text-[11px] text-slate-800">
                <span className="mt-[2px] inline-flex h-5 min-w-[40px] items-center justify-center rounded-[12px] bg-slate-900 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-50">
                  Pro
                </span>
                <span>
                  Want dynamic QR codes you can edit later and track?{" "}
                  <Link
                    href="/signin"
                    className="font-medium underline underline-offset-2"
                  >
                    Create a free Kompi account
                  </Link>
                  .
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: preview / step 3 */}
          <aside className="rounded-[32px] border border-black/5 bg-white/95 p-6 shadow-[0_14px_40px_rgba(15,23,42,0.24)] lg:sticky lg:top-24 lg:self-start lg:p-7">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-[11px] bg-slate-900 text-[11px] font-semibold text-white">
                  3
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-slate-950">
                    Download QR code
                  </p>
                  <p className="text-[11px] leading-relaxed text-slate-600">
                    This is exactly what people will scan from menus, posters
                    and cards.
                  </p>
                </div>
              </div>
              {canGenerate && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-medium text-slate-700">
                  Live preview
                </span>
              )}
            </div>

            {/* Apple Wallet–style flat preview */}
            <div className="flex items-center justify-center rounded-[24px] bg-[#f5f3ee] p-6">
              {hasQr ? (
                <img
                  src={qrDataUrl ?? ""}
                  alt="Generated QR code"
                  className="h-56 w-56 rounded-[24px] object-contain shadow-[0_8px_18px_rgba(15,23,42,0.25)]"
                />
              ) : (
                <div className="flex h-56 w-56 items-center justify-center rounded-[24px] bg-white text-center text-[11px] leading-relaxed text-slate-500">
                  Add content on the left to generate a live QR preview.
                </div>
              )}
            </div>

            {showFrame && frameText && (
              <div
                className="mt-3 rounded-full px-4 py-1.5 text-center text-[11px] font-medium"
                style={{
                  backgroundColor: frameBgColor,
                  color: frameTextColor,
                }}
              >
                {frameText}
              </div>
            )}

            <div className="mt-5 flex gap-2 text-xs">
              <button
                onClick={handleDownload}
                disabled={!hasQr}
                className="flex-1 rounded-full bg-slate-950 px-4 py-2 font-medium text-slate-50 shadow-[0_2px_0_#000000] transition hover:bg-black disabled:opacity-40 disabled:shadow-none"
              >
                ⬇️ Download PNG
              </button>
              <button
                onClick={handleCopyValue}
                disabled={!canGenerate}
                className="flex-1 rounded-full border border-black/10 bg-white px-4 py-2 font-medium text-slate-900 hover:bg-slate-50 disabled:opacity-40"
              >
                🔗 Copy encoded value
              </button>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
              Static PNG QR codes never expire — they keep working as long as
              the destination is valid. For editable, trackable QR codes, plug a
              Kompi short link in behind the scenes.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
