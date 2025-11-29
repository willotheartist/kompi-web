"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import QRCodeStyling from "qr-code-styling";

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
  const r = Math.max(
    0,
    Math.min(radius, Math.min(width / 2, height / 2))
  );
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

  const [borderRadiusStyle, setBorderRadiusStyle] =
    useState<"square" | "rounded" | "pill">("rounded");
  const [borderColor, setBorderColor] = useState("#e5e7eb");
  const [borderWidth, setBorderWidth] = useState(8);
  const [borderStyle, setBorderStyle] = useState<"solid" | "dashed">("solid");

  // QR dot style & quality
  const [dotStyle, setDotStyle] = useState<DotStyle>("square");
  const [qrQuality, setQrQuality] = useState<QrQuality>("medium");

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

  const previewBorderRadius =
    borderRadiusStyle === "square"
      ? 24
      : borderRadiusStyle === "rounded"
      ? 32
      : 9999;

  const logoScalePercent =
    logoScale === "small" ? 14 : logoScale === "large" ? 22 : 18;

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
            imageSize:
              logoScale === "small"
                ? 0.14
                : logoScale === "large"
                ? 0.22
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
          const padding = qrSize / 16;
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
            previewBorderRadius * (qrSize / 512),
            cardWidth / 2,
            cardHeight / 2
          );

          ctx.save();

          // Card background with rounded corners
          drawRoundedRect(ctx, 0, 0, cardWidth, cardHeight, radius);
          ctx.clip();

          ctx.fillStyle = "#f9fafb";
          ctx.fillRect(0, 0, cardWidth, cardHeight);

          // Card border
          if (borderWidth > 0) {
            ctx.lineWidth = borderWidth * (qrSize / 512);
            ctx.strokeStyle = borderColor;
            if (borderStyle === "dashed") {
              ctx.setLineDash([12 * (qrSize / 512), 8 * (qrSize / 512)]);
            } else {
              ctx.setLineDash([]);
            }

            drawRoundedRect(
              ctx,
              ctx.lineWidth / 2,
              ctx.lineWidth / 2,
              cardWidth - ctx.lineWidth,
              cardHeight - ctx.lineWidth,
              Math.max(0, radius - ctx.lineWidth / 2)
            );
            ctx.stroke();
            ctx.setLineDash([]);
          }

          // QR image
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
            drawRoundedRect(
              ctx,
              qrX,
              barY,
              qrSize,
              barHeight,
              barRadius
            );
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

          // --- Kompi branding (always on for free SEO QR codes) ---
          const brandText = "kompi";
          const brandFontSize = 22 * (qrSize / 512); // scales with quality
          const brandPaddingX = padding;
          const brandPaddingY = padding * 0.75;

          ctx.fillStyle = "#4F46E5"; // Kompi brand-ish purple – tweak if needed
          ctx.font = `600 ${brandFontSize}px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
          ctx.textAlign = "right";
          ctx.textBaseline = "bottom";
          ctx.fillText(
            brandText,
            cardWidth - brandPaddingX,
            cardHeight - brandPaddingY
          );
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
    borderRadiusStyle,
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
    <section className="bg-[var(--color-bg)] px-4 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Hero */}
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--color-text)]">
            Free QR codes that{" "}
            <span className="relative inline-block">
              <span className="font-['Instrument_Serif'] italic">
                just work
              </span>
              <span className="absolute inset-x-0 -bottom-1 h-[2px] rounded-full bg-[var(--color-accent)]" />
            </span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[var(--color-subtle)]">
            Paste a link or add text, customise the QR style and card, then
            download a scan-ready PNG in seconds.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          {/* LEFT: controls */}
          <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] lg:p-7">
            {/* Content type selector */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-subtle)]">
                  QR content type
                </p>
                <p className="text-[11px] text-[var(--color-subtle)]">
                  What happens after{" "}
                  <span className="font-medium text-[var(--color-text)]">
                    the scan
                  </span>
                  .
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {qrTypes.map((type) => {
                  const isActive = type.key === activeType;
                  return (
                    <button
                      key={type.key}
                      type="button"
                      onClick={() => setActiveType(type.key)}
                      className={[
                        "flex flex-col items-start gap-1 rounded-[10px] border p-2 text-left transition-colors",
                        isActive
                          ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                          : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-subtle)] hover:bg-[var(--color-bg)]",
                      ].join(" ")}
                    >
                      <span className="text-base">
                        {qrTypeIcons[type.key]}
                      </span>
                      <span className="text-xs font-medium">
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 1 – content */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--color-bg)] text-[11px] font-medium text-[var(--color-text)]">
                  1
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[var(--color-text)]">
                    Complete the content
                  </p>
                  <p className="text-xs text-[var(--color-subtle)]">
                    This is what opens when someone scans your QR code.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6 text-sm"
              >
                {/* Per-type content fields */}
                {activeType === "url" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-[var(--color-text)]">
                      Enter your website
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://your-restaurant.com/menu"
                      className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                    />
                    <p className="text-[11px] text-[var(--color-subtle)]">
                      Use a full URL including{" "}
                      <span className="font-mono text-[10px]">https://</span>.
                    </p>
                  </div>
                )}

                {activeType === "text" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-[var(--color-text)]">
                      Text to encode
                    </label>
                    <textarea
                      rows={3}
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Scan me to see this text…"
                      className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                    />
                  </div>
                )}

                {activeType === "email" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-[var(--color-text)]">
                        Email address
                      </label>
                      <input
                        type="email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                      />
                    </div>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-[var(--color-text)]">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={emailSubject}
                          onChange={(e) => setEmailSubject(e.target.value)}
                          placeholder="Subject line"
                          className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--color-text)]">
                          Message
                        </label>
                        <input
                          type="text"
                          value={emailBody}
                          onChange={(e) => setEmailBody(e.target.value)}
                          placeholder="Thanks for reaching out…"
                          className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeType === "phone" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-[var(--color-text)]">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+1 555 123 4567"
                      className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                    />
                  </div>
                )}

                {activeType === "sms" && (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-[var(--color-text)]">
                      SMS details
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                      <input
                        type="tel"
                        value={smsNumber}
                        onChange={(e) => setSmsNumber(e.target.value)}
                        placeholder="Number"
                        className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                        placeholder="Message"
                        className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {activeType === "wifi" && (
                  <div className="space-y-3">
                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-[var(--color-text)]">
                          Network name (SSID)
                        </label>
                        <input
                          type="text"
                          value={wifiSsid}
                          onChange={(e) => setWifiSsid(e.target.value)}
                          placeholder="My Wi-Fi"
                          className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--color-text)]">
                          Password
                        </label>
                        <input
                          type="text"
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          placeholder="••••••••"
                          className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-[var(--color-text)]">
                          Encryption
                        </label>
                        <select
                          value={wifiEncryption}
                          onChange={(e) =>
                            setWifiEncryption(
                              e.target.value as "WPA" | "WEP" | "nopass"
                            )
                          }
                          className="mt-1 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text)] focus:outline-none"
                        >
                          <option value="WPA">WPA</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">No password</option>
                        </select>
                      </div>
                      <p className="self-end text-[11px] text-[var(--color-subtle)]">
                        We embed the Wi-Fi details in the QR. Your password
                        never leaves this page.
                      </p>
                    </div>
                  </div>
                )}

                {/* DESIGN PANEL */}
                <div className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--color-surface)] text-[11px] font-medium text-[var(--color-text)]">
                        2
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-[var(--color-text)]">
                          Design your QR code
                        </p>
                        <p className="text-[11px] text-[var(--color-subtle)]">
                          Tweak dot style, card and centre logo for a clean,
                          scannable result.
                        </p>
                      </div>
                    </div>
                    {loading && canGenerate && (
                      <span className="text-[11px] text-[var(--color-subtle)]">
                        Updating preview…
                      </span>
                    )}
                  </div>

                  {/* Hint tabs */}
                  <div className="flex flex-wrap gap-2 text-[11px]">
                    <button
                      type="button"
                      className="rounded-[999px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[var(--color-subtle)]"
                    >
                      Frame
                    </button>
                    <button
                      type="button"
                      className="rounded-[999px] border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] font-medium text-[var(--color-text)]"
                    >
                      Shape
                    </button>
                    <button
                      type="button"
                      className="rounded-[999px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-[var(--color-subtle)]"
                    >
                      Logo
                    </button>
                  </div>

                  {/* Shape & color – with dot style */}
                  <section className="space-y-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-[var(--color-text)]">
                        Shape &amp; color
                      </p>
                      <p className="text-[11px] text-[var(--color-subtle)]">
                        Dot style changes the QR pattern – keep contrast high.
                      </p>
                    </div>

                    {/* Dot style row */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-medium text-[var(--color-text)]">
                        Dot style
                      </p>
                      <div className="flex flex-wrap gap-2">
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
                                "flex items-center gap-2 rounded-[999px] border px-3 py-1.5 text-[11px] transition-colors",
                                isActive
                                  ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-subtle)] hover:bg-[var(--color-bg)]",
                              ].join(" ")}
                            >
                              <span className="flex h-5 w-5 items-center justify-center rounded-[999px] border border-[var(--color-border)] bg-[var(--color-bg)]">
                                <span
                                  className={[
                                    "block h-3 w-3 bg-[var(--color-text)]",
                                    opt.key === "square" && "rounded-[2px]",
                                    opt.key === "rounded" && "rounded-[6px]",
                                    opt.key === "circle" && "rounded-full",
                                    opt.key === "diamond" &&
                                      "rotate-45 rounded-[2px]",
                                    opt.key === "star" &&
                                      "clip-path-[polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]",
                                    opt.key === "plus" &&
                                      "bg-transparent before:block before:h-3 before:w-[1px] before:bg-[var(--color-text)] before:content-[''] after:block after:h-[1px] after:w-3 after:bg-[var(--color-text)] after:content-['']",
                                  ]
                                    .filter(Boolean)
                                    .join(" ")}
                                />
                              </span>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="grid gap-4 text-[11px] md:grid-cols-3">
                      <div className="space-y-2">
                        <p className="text-[var(--color-subtle)]">Foreground</p>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={fgColor}
                            onChange={(e) => setFgColor(e.target.value)}
                            className="h-8 w-12 cursor-pointer rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]"
                          />
                          <span className="text-[var(--color-subtle)]">
                            Dark modules
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[var(--color-subtle)]">Background</p>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={bgColor}
                            onChange={(e) => setBgColor(e.target.value)}
                            className="h-8 w-12 cursor-pointer rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]"
                          />
                          <span className="text-[var(--color-subtle)]">
                            Behind QR
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-[var(--color-subtle)]">Quiet zone</p>
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
                            className="flex-1 accent-[var(--color-accent)]"
                          />
                          <span className="w-5 text-right text-[var(--color-subtle)]">
                            {margin}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Output size / download quality */}
                    <div className="mt-4 space-y-2 rounded-[var(--radius-md)] border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-3 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold text-[var(--color-text)]">
                          Download quality
                        </p>
                        <span className="rounded-full bg-[var(--color-text)] px-2 py-[2px] text-[9px] font-medium tracking-wide text-[var(--color-surface)]">
                          PNG size
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[11px]">
                        {[
                          { key: "low", label: "Low", detail: "512px • quick share" },
                          { key: "medium", label: "Medium", detail: "1024px • default" },
                          { key: "high", label: "High", detail: "2048px • print-ready" },
                        ].map((opt) => {
                          const isActive = qrQuality === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setQrQuality(opt.key as QrQuality)}
                              className={[
                                "flex flex-col items-start gap-[2px] rounded-[999px] border px-3 py-1.5 text-left transition-colors",
                                isActive
                                  ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-surface)]"
                                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-subtle)] hover:bg-[var(--color-bg)]",
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

                      <p className="text-[10px] text-[var(--color-subtle)]">
                        “High” gives you a big, sharp PNG that’s good enough for print.
                      </p>
                    </div>
                  </section>

                  {/* Card & border */}
                  <section className="space-y-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                    <p className="text-xs font-semibold text-[var(--color-text)]">
                      Card &amp; border
                    </p>
                    <div className="grid gap-4 text-[11px] md:grid-cols-3">
                      <div className="space-y-2">
                        <p className="text-[var(--color-subtle)]">Card shape</p>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { key: "square", label: "Square" },
                            { key: "rounded", label: "Rounded" },
                            { key: "pill", label: "Soft" },
                          ].map((opt) => {
                            const isActive = borderRadiusStyle === opt.key;
                            return (
                              <button
                                key={opt.key}
                                type="button"
                                onClick={() =>
                                  setBorderRadiusStyle(
                                    opt.key as "square" | "rounded" | "pill"
                                  )
                                }
                                className={[
                                  "flex flex-col items-center gap-1 rounded-[10px] border px-2 py-1.5 text-[10px] transition-colors",
                                  isActive
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-subtle)] hover:bg-[var(--color-bg)]",
                                ].join(" ")}
                              >
                                <div className="flex h-6 w-9 items-center justify-center rounded-[6px] border border-[var(--color-border)] bg-[var(--color-bg)]">
                                  <div
                                    className={[
                                      "h-3 w-6 border border-[var(--color-text)] bg-[var(--color-surface)]",
                                      opt.key === "square"
                                        ? "rounded-[4px]"
                                        : opt.key === "rounded"
                                        ? "rounded-[10px]"
                                        : "rounded-[999px]",
                                    ].join(" ")}
                                  />
                                </div>
                                {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[var(--color-subtle)]">
                          Border + width
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={borderColor}
                              onChange={(e) => setBorderColor(e.target.value)}
                              className="h-8 w-12 cursor-pointer rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)]"
                            />
                            <span className="text-[var(--color-subtle)]">
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
                                setBorderWidth(Number(e.target.value))
                              }
                              className="flex-1 accent-[var(--color-accent)]"
                            />
                            <span className="w-5 text-right text-[var(--color-subtle)]">
                              {borderWidth}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-[var(--color-subtle)]">
                          Border style
                        </p>
                        <select
                          value={borderStyle}
                          onChange={(e) =>
                            setBorderStyle(e.target.value as "solid" | "dashed")
                          }
                          className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs text-[var(--color-text)] focus:outline-none"
                        >
                          <option value="solid">Solid</option>
                          <option value="dashed">Dashed</option>
                        </select>
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={[
                              "h-[1px] flex-1 border-t border-[var(--color-text)]",
                              borderStyle === "dashed" ? "border-dashed" : "",
                            ].join(" ")}
                          />
                          <span className="text-[10px] text-[var(--color-subtle)]">
                            Preview
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Center logo & frame */}
                  <section className="grid gap-4 text-[11px] md:grid-cols-2">
                    {/* Center logo & shape */}
                    <div className="space-y-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                      <p className="text-xs font-semibold text-[var(--color-text)]">
                        Center logo &amp; shape
                      </p>

                      {/* Upload */}
                      <div className="space-y-2">
                        <label className="text-[11px] text-[var(--color-subtle)]">
                          Upload logo
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="w-full text-[11px] text-[var(--color-subtle)] file:mr-2 file:cursor-pointer file:rounded-[var(--radius-md)] file:border file:border-[var(--color-border)] file:bg-[var(--color-surface)] file:px-3 file:py-1.5 file:text-[11px] file:font-medium file:text-[var(--color-text)]"
                        />
                      </div>

                      {/* Shape & size row */}
                      <div className="flex flex-wrap justify-between gap-6">
                        {/* Shape column */}
                        <div className="min-w-[120px] flex-1 space-y-2">
                          <p className="text-[11px] font-medium text-[var(--color-text)]">
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
                                    setLogoShape(shape as "square" | "circle")
                                  }
                                  className={[
                                    "rounded-[999px] border px-4 py-1.5 text-[11px] capitalize transition-colors",
                                    isActive
                                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-subtle)] hover:bg-[var(--color-bg)]",
                                  ].join(" ")}
                                >
                                  {shape}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Size column */}
                        <div className="min-w-[140px] flex-1 space-y-2">
                          <p className="text-[11px] font-medium text-[var(--color-text)]">
                            Size
                          </p>
                          <div className="inline-flex gap-2">
                            {(["small", "medium", "large"] as LogoScale[]).map(
                              (size) => {
                                const isActive = logoScale === size;
                                return (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={() => setLogoScale(size)}
                                    className={[
                                      "rounded-[999px] border px-4 py-1.5 text-[11px] capitalize transition-colors",
                                      isActive
                                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-subtle)] hover:bg-[var(--color-bg)]",
                                    ].join(" ")}
                                  >
                                    {size}
                                  </button>
                                );
                              }
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-[var(--color-subtle)]">
                        Use a simple mark and avoid covering too much of the
                        center.
                      </p>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <p className="text-[11px] text-[var(--color-subtle)]">
                          Remove background behind logo
                        </p>
                        <button
                          type="button"
                          onClick={() => setRemoveLogoBg((v) => !v)}
                          className={[
                            "inline-flex items-center gap-2 rounded-[999px] border px-2 py-1 text-[10px] transition-colors",
                            removeLogoBg
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-subtle)]",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "relative flex h-4 w-7 items-center rounded-[999px] border border-[var(--color-border)] bg-[var(--color-bg)] transition-colors",
                              removeLogoBg && "border-[var(--color-accent)]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "absolute h-3 w-3 translate-x-[2px] rounded-full bg-[var(--color-subtle)] transition-transform",
                                removeLogoBg &&
                                  "translate-x-[14px] bg-[var(--color-accent)]",
                              ].join(" ")}
                            />
                          </span>
                          {removeLogoBg ? "On" : "Off"}
                        </button>
                      </div>
                    </div>

                    {/* Frame label with on/off toggle */}
                    <div className="space-y-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-[var(--color-text)]">
                          Frame label
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowFrame((v) => !v)}
                          className={[
                            "inline-flex items-center gap-2 rounded-[999px] border px-2 py-1 text-[10px] transition-colors",
                            showFrame
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text)]"
                              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-subtle)]",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "relative flex h-4 w-7 items-center rounded-[999px] border border-[var(--color-border)] bg-[var(--color-bg)] transition-colors",
                              showFrame && "border-[var(--color-accent)]",
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "absolute h-3 w-3 translate-x-[2px] rounded-full bg-[var(--color-subtle)] transition-transform",
                                showFrame &&
                                  "translate-x-[14px] bg-[var(--color-accent)]",
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
                          <label className="text-[11px] text-[var(--color-subtle)]">
                            Text
                          </label>
                          <input
                            type="text"
                            value={frameText}
                            onChange={(e) => setFrameText(e.target.value)}
                            placeholder="Scan me"
                            disabled={!showFrame}
                            className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-subtle)] focus:outline-none disabled:cursor-not-allowed"
                          />
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-2">
                            <label className="block text-[11px] text-[var(--color-subtle)]">
                              Frame bg
                            </label>
                            <input
                              type="color"
                              value={frameBgColor}
                              onChange={(e) =>
                                setFrameBgColor(e.target.value)
                              }
                              disabled={!showFrame}
                              className="h-8 w-12 cursor-pointer rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] disabled:cursor-not-allowed"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block text-[11px] text-[var(--color-subtle)]">
                              Text color
                            </label>
                            <input
                              type="color"
                              value={frameTextColor}
                              onChange={(e) =>
                                setFrameTextColor(e.target.value)
                              }
                              disabled={!showFrame}
                              className="h-8 w-12 cursor-pointer rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Upsell */}
                <div className="mt-4 flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-3 py-3 text-[11px] text-[var(--color-text)]">
                  <span className="mt-[2px] inline-flex h-5 min-w-[38px] items-center justify-center rounded-[10px] bg-[var(--color-accent)] text-[10px] font-semibold uppercase tracking-[0.16em]">
                    Pro
                  </span>
                  <span>
                    Want dynamic QR codes you can edit later and track?{" "}
                    <a
                      href="/signin"
                      className="font-medium underline underline-offset-2"
                    >
                      Create a free Kompi account
                    </a>
                    .
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: preview / step 3 */}
          <aside className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-md)] lg:p-7 lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-[10px] bg-[var(--color-bg)] text-[11px] font-medium text-[var(--color-text)]">
                  3
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[var(--color-text)]">
                    Download QR code
                  </p>
                  <p className="text-[11px] text-[var(--color-subtle)]">
                    This is exactly what your visitors will scan.
                  </p>
                </div>
              </div>
              {canGenerate && (
                <span className="rounded-[10px] bg-[var(--color-accent-soft)] px-3 py-1 text-[10px] font-medium text-[var(--color-text)]">
                  Live preview ·{" "}
                  {qrQuality === "low"
                    ? "low-res PNG"
                    : qrQuality === "medium"
                    ? "medium PNG"
                    : "high-res PNG"}
                </span>
              )}
            </div>

            <div className="flex items-center justify-center bg-[var(--color-bg)] p-4">
              {hasQr ? (
                <div
                  className="flex h-56 w-56 items-center justify-center"
                  style={{
                    borderRadius: previewBorderRadius,
                    borderWidth,
                    borderStyle,
                    borderColor,
                  }}
                >
                  <img
                    src={qrDataUrl ?? ""}
                    alt="Generated QR code"
                    className="h-full w-full rounded-[24px]"
                  />
                </div>
              ) : (
                <div
                  className="flex h-56 w-56 items-center justify-center text-[11px] text-[var(--color-subtle)]"
                  style={{
                    borderRadius: previewBorderRadius,
                    borderWidth,
                    borderStyle,
                    borderColor,
                  }}
                >
                  Add content on the left to generate your QR.
                </div>
              )}
            </div>

            {showFrame && frameText && (
              <div
                className="mt-3 rounded-[var(--radius-md)] px-4 py-1.5 text-center text-[11px] font-medium"
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
                className="flex-1 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-4 py-2 font-medium text-[var(--color-text)] shadow-[var(--shadow-sm)] disabled:opacity-40"
              >
                ⬇️ Download PNG
              </button>
              <button
                onClick={handleCopyValue}
                disabled={!canGenerate}
                className="flex-1 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-transparent px-4 py-2 font-medium text-[var(--color-text)] hover:bg-[var(--color-bg)] disabled:opacity-40"
              >
                🔗 Copy encoded value
              </button>
            </div>

            <p className="mt-3 text-[11px] text-[var(--color-subtle)]">
              {canGenerate
                ? "Static PNG. Your QR will keep working as long as the underlying content is valid."
                : "Once you add content, we’ll create a static PNG QR code you can use anywhere."}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
