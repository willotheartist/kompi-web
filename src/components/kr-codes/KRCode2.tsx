"use client";

import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type ReactNode,
} from "react";
import QRCodeStyling from "qr-code-styling";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Link2,
  Type as TextIcon,
  Mail,
  Phone,
  MessageCircle,
  Wifi,
  MapPin,
  Instagram,
  Facebook,
  LayoutTemplate,
  QrCode,
  Scan,
  ImagePlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QrType =
  | "url"
  | "text"
  | "email"
  | "phone"
  | "sms"
  | "wifi"
  | "location"
  | "whatsapp"
  | "instagram"
  | "facebook";

type DotStyle = "square" | "rounded" | "circle" | "diamond" | "star" | "plus";
type CornerSquareStyle = "square" | "extra-rounded";
type CornerDotStyle = "square" | "dot";

type DesignPanelId = "frame" | "pattern" | "corners" | "logo" | null;

const CONTENT_TABS: Array<{
  id: QrType;
  label: string;
  helper: string;
  icon: LucideIcon;
}> = [
  {
    id: "url",
    label: "Link",
    helper: "Send people to a website or landing page.",
    icon: Link2,
  },
  {
    id: "text",
    label: "Text",
    helper: "Show a short message or instructions.",
    icon: TextIcon,
  },
  {
    id: "email",
    label: "E-mail",
    helper: "Open a pre-filled email draft.",
    icon: Mail,
  },
  {
    id: "phone",
    label: "Call",
    helper: "Start a phone call on scan.",
    icon: Phone,
  },
  {
    id: "sms",
    label: "SMS",
    helper: "Open a text message with pre-filled content.",
    icon: MessageCircle,
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    helper: "Connect guests to a Wi-Fi network.",
    icon: Wifi,
  },
  {
    id: "location",
    label: "Location",
    helper: "Open a map with this address or place.",
    icon: MapPin,
  },
  {
    id: "whatsapp",
    label: "Whatsapp",
    helper: "Open a WhatsApp chat with a pre-filled message.",
    icon: MessageCircle,
  },
  {
    id: "instagram",
    label: "Instagram",
    helper: "Send people to your Instagram profile.",
    icon: Instagram,
  },
  {
    id: "facebook",
    label: "Facebook",
    helper: "Send people to your Facebook page or profile.",
    icon: Facebook,
  },
];

const PATTERN_PREVIEW: Record<DotStyle, string> = {
  square: "/kroptions/classic.png",
  rounded: "/kroptions/rounded.png",
  circle: "/kroptions/dots.png",
  diamond: "/kroptions/diamond.png",
  star: "/kroptions/star.png",
  plus: "/kroptions/soft.png",
};

const CORNER_FRAME_PREVIEW: Record<CornerSquareStyle, string> = {
  square: "/kroptions/corner s.png",
  "extra-rounded": "/kroptions/corner r.png",
};

const CORNER_DOT_PREVIEW: Record<CornerDotStyle, string> = {
  square: "/kroptions/corner dot s.png",
  dot: "/kroptions/corner dot d.png",
};

type QrCodeDotType =
  | "square"
  | "rounded"
  | "dots"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";

function mapDotStyle(dotStyle: DotStyle): QrCodeDotType {
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

export function KRCode2() {
  const [activeType, setActiveType] = useState<QrType>("url");

  // --- Content state ---
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

  // extra content types
  const [locationQuery, setLocationQuery] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");

  // --- Design state ---
  const [fgColor, setFgColor] = useState("#111827");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [dotStyle, setDotStyle] = useState<DotStyle>("square");
  const [cornerSquareStyle, setCornerSquareStyle] =
    useState<CornerSquareStyle>("square");
  const [cornerDotStyle, setCornerDotStyle] = useState<CornerDotStyle>("dot");
  const [margin, setMargin] = useState(2);
  const [size, setSize] = useState(1024);

  // Logo
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoScale, setLogoScale] = useState<"small" | "medium" | "large">(
    "medium",
  );
  const [removeLogoBg, setRemoveLogoBg] = useState(true);

  // Panel + QR instance
  const [openPanel, setOpenPanel] = useState<DesignPanelId>("pattern");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const qrInstanceRef = useRef<QRCodeStyling | null>(null);
  const lastSizeRef = useRef<number | null>(null);
  const baseObjectUrlRef = useRef<string | null>(null);

  const previewSize = 260; // on-screen preview (download uses `size`)

  // ---------- content encoding ----------

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
      case "location": {
        const q = locationQuery.trim();
        if (!q) return null;
        const encoded = encodeURIComponent(q);
        return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
      }
      case "whatsapp": {
        const num = whatsappNumber.trim();
        if (!num) return null;
        const msg = whatsappMessage.trim();
        const base = `https://wa.me/${num.replace(/[^0-9]/g, "")}`;
        if (!msg) return base;
        return `${base}?text=${encodeURIComponent(msg)}`;
      }
      case "instagram": {
        const handle = instagramHandle.trim().replace(/^@/, "");
        if (!handle) return null;
        return `https://instagram.com/${handle}`;
      }
      case "facebook": {
        const v = facebookUrl.trim();
        if (!v) return null;
        if (v.startsWith("http://") || v.startsWith("https://")) return v;
        return `https://facebook.com/${v}`;
      }
      default:
        return null;
    }
  };

  const encodedValue = buildValueForQr();
  const canGenerate = !!encodedValue;

  // ---------- logo upload / download ----------

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
    link.download = "kompi-qr-code.png";
    link.href = qrDataUrl;
    link.click();
  };

  // ---------- live preview with qr-code-styling ----------

  useEffect(() => {
    if (!canGenerate) {
      setQrDataUrl(null);
      return;
    }

    // Init / resize instance
    if (!qrInstanceRef.current || lastSizeRef.current !== size) {
      qrInstanceRef.current = new QRCodeStyling({
        width: size,
        height: size,
      });
      lastSizeRef.current = size;
    }

    const instance = qrInstanceRef.current;
    if (!instance) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const effectiveMargin = logoDataUrl ? Math.max(margin, 4) : margin;

        instance.update({
          data: encodedValue!,
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
          cornersSquareOptions: {
            type: cornerSquareStyle,
            color: fgColor,
          },
          cornersDotOptions: {
            type: cornerDotStyle,
            color: fgColor,
          },
          image: logoDataUrl || undefined,
          imageOptions: {
            hideBackgroundDots: removeLogoBg,
            imageSize:
              logoScale === "small"
                ? 0.14
                : logoScale === "large"
                ? 0.28
                : 0.2,
            crossOrigin: "anonymous",
          },
        });

        const blob = (await instance.getRawData("png")) as Blob | null;
        if (cancelled || !blob) return;

        const objectUrl = URL.createObjectURL(blob);
        if (baseObjectUrlRef.current) {
          URL.revokeObjectURL(baseObjectUrlRef.current);
        }
        baseObjectUrlRef.current = objectUrl;
        setQrDataUrl(objectUrl);
      } catch (err) {
        console.error("Failed to generate QR", err);
        if (!cancelled) {
          setQrDataUrl(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    canGenerate,
    encodedValue,
    dotStyle,
    fgColor,
    bgColor,
    margin,
    size,
    logoDataUrl,
    logoScale,
    removeLogoBg,
    cornerSquareStyle,
    cornerDotStyle,
  ]);

  useEffect(
    () => () => {
      if (baseObjectUrlRef.current) {
        URL.revokeObjectURL(baseObjectUrlRef.current);
      }
    },
    [],
  );

  const hasQr = !!qrDataUrl;
  const hasContent = !!encodedValue;

  const activeTabMeta = CONTENT_TABS.find((t) => t.id === activeType);

  const renderContentFields = (): ReactNode => {
    switch (activeType) {
      case "url":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Enter your link
            </label>
            <Input
              placeholder="https://"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-11 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
            />
          </div>
        );
      case "text":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Text to show on scan
            </label>
            <Textarea
              rows={3}
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Scan me to see this message…"
              className="rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
            />
          </div>
        );
      case "email":
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">
                Recipient email
              </label>
              <Input
                type="email"
                placeholder="hello@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                className="h-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-900">
                Subject (optional)
              </label>
              <Input
                placeholder="Subject line"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="h-9 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-900">
                Message (optional)
              </label>
              <Textarea
                rows={3}
                placeholder="Message that appears in the email body…"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
          </div>
        );
      case "phone":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Phone number to call
            </label>
            <Input
              type="tel"
              placeholder="+44 7700 900123"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="h-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
            />
          </div>
        );
      case "sms":
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">
                Recipient number
              </label>
              <Input
                type="tel"
                placeholder="+44 7700 900123"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
                className="h-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-900">
                SMS message (optional)
              </label>
              <Textarea
                rows={2}
                placeholder="This text appears in the message body…"
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
          </div>
        );
      case "wifi":
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">
                Network name (SSID)
              </label>
              <Input
                placeholder="MyWifiNetwork"
                value={wifiSsid}
                onChange={(e) => setWifiSsid(e.target.value)}
                className="h-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-900">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                className="h-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-medium text-slate-900">Security</p>
              <div className="flex flex-wrap gap-2">
                {(["WPA", "WEP", "nopass"] as const).map((sec) => {
                  const label =
                    sec === "nopass" ? "No password" : sec.toUpperCase();
                  const active = wifiEncryption === sec;
                  return (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setWifiEncryption(sec)}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-xs font-medium",
                        active
                          ? "border-[#a855f7] bg-[#ede9fe] text-slate-900 shadow-sm"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100",
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      case "location":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Address or place
            </label>
            <Textarea
              rows={2}
              placeholder="123 Example St, City · or a place name"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
            />
            <p className="text-xs text-slate-500">
              We&apos;ll open the default map app with this location.
            </p>
          </div>
        );
      case "whatsapp":
        return (
          <div className="space-y-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-900">
                WhatsApp number
              </label>
              <Input
                type="tel"
                placeholder="+44 7700 900123"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="h-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-900">
                Message (optional)
              </label>
              <Textarea
                rows={2}
                placeholder="This text appears in the WhatsApp message…"
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
              />
            </div>
          </div>
        );
      case "instagram":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Instagram handle
            </label>
            <Input
              placeholder="@yourusername"
              value={instagramHandle}
              onChange={(e) => setInstagramHandle(e.target.value)}
              className="h-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
            />
          </div>
        );
      case "facebook":
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-900">
              Facebook URL or username
            </label>
            <Input
              placeholder="https://facebook.com/yourpage or yourpage"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              className="h-10 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full bg-[#f5f5f6] px-4 py-10">
      <div className="mx-auto max-w-6xl rounded-[32px] bg-white p-6 shadow-sm lg:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* QR type tabs */}
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="grid gap-2 md:grid-cols-4">
                {CONTENT_TABS.map((tab) => {
                  const active = tab.id === activeType;
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveType(tab.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium text-slate-700 transition",
                        active
                          ? "border-[#a855f7] bg-[#ede9fe] text-slate-900 shadow-sm"
                          : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50",
                      )}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
                        <Icon className="h-3.5 w-3.5 text-slate-700" />
                      </span>
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: CONTENT */}
            <Card className="space-y-5 rounded-3xl border border-slate-100 bg-slate-50/60 p-6 shadow-none">
              <SectionHeader
                step={1}
                title="Complete the content"
                description={
                  activeTabMeta?.helper ??
                  "Choose what happens when someone scans your QR Code."
                }
              />

              <div className="rounded-2xl border border-slate-100 bg-white p-5">
                {renderContentFields()}
                {!hasContent && (
                  <p className="mt-4 text-xs text-rose-500">
                    Add valid content above to generate a QR code.
                  </p>
                )}
              </div>
            </Card>

            {/* STEP 2: DESIGN */}
            <Card className="space-y-5 rounded-3xl border border-slate-100 bg-slate-50/60 p-6 shadow-none">
              <SectionHeader
                step={2}
                title="Design your KR Code"
                description="Choose a frame, pattern, corners and logo to match your brand."
              />

              {/* Size + margin strip */}
              <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-slate-100 bg-white p-4">
                <div className="flex-1 space-y-2">
                  <p className="text-xs font-medium text-slate-900">
                    Export size
                  </p>
                  <input
                    type="range"
                    min={512}
                    max={2048}
                    step={128}
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                    className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-slate-200"
                  />
                  <p className="text-[11px] text-slate-500">
                    {size}px · For print, use at least 1000px.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-900">
                    Quiet zone (margin)
                  </p>
                  <Input
                    type="number"
                    min={0}
                    max={10}
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value) || 0)}
                    className="h-9 w-24 rounded-2xl border border-slate-200 bg-slate-50 px-2 text-xs focus:bg-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    Keep some space around the code for better scans.
                  </p>
                </div>
              </div>

              {/* Accordions */}
              <div className="space-y-3">
                {/* Frame (visual only for now) */}
                <DesignPanel
                  id="frame"
                  icon={<LayoutTemplate className="h-5 w-5" />}
                  openPanel={openPanel}
                  setOpenPanel={setOpenPanel}
                  title="Frame"
                  description="Frames make your QR Code stand out from the crowd, inspiring more scans."
                >
                  <p className="text-xs text-slate-500">
                    Frame presets and styles will appear here. (Visual-only
                    placeholder to match design.)
                  </p>
                </DesignPanel>

                {/* Pattern */}
                <DesignPanel
                  id="pattern"
                  icon={<QrCode className="h-5 w-5" />}
                  openPanel={openPanel}
                  setOpenPanel={setOpenPanel}
                  title="QR Code Pattern"
                  description="Choose a pattern for your QR code and select colors."
                >
                  <div className="space-y-4">
                    {/* Pattern style row */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-900">
                        Pattern style
                      </p>
                      <div className="flex items-center gap-2">
                        {(
                          [
                            { key: "square", label: "Classic" },
                            { key: "rounded", label: "Rounded" },
                            { key: "circle", label: "Dots" },
                            { key: "diamond", label: "Diamond" },
                            { key: "star", label: "Star" },
                            { key: "plus", label: "Soft" },
                          ] as const
                        ).map((opt) => {
                          const active = dotStyle === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setDotStyle(opt.key)}
                              className={cn(
                                "flex flex-col items-center px-0 py-0",
                                active ? "opacity-100" : "opacity-60 hover:opacity-100",
                              )}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={PATTERN_PREVIEW[opt.key]}
                                alt={`${opt.label} pattern preview`}
                                className="h-14 w-14"
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <ColorSwatch
                        label="Pattern color"
                        value={fgColor}
                        onChange={setFgColor}
                      />
                      <ColorSwatch
                        label="Background color"
                        value={bgColor}
                        onChange={setBgColor}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500">
                      Remember! For optimal QR code reading results, we
                      recommend using high-contrast colors.
                    </p>
                  </div>
                </DesignPanel>

                {/* Corners */}
                <DesignPanel
                  id="corners"
                  icon={<Scan className="h-5 w-5" />}
                  openPanel={openPanel}
                  setOpenPanel={setOpenPanel}
                  title="QR Code Corners"
                  description="Select your QR code’s corner style."
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-900">
                        Frame around corner dots style
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            { key: "square", label: "Square" },
                            { key: "extra-rounded", label: "Rounded" },
                          ] as const
                        ).map((opt) => {
                          const active = cornerSquareStyle === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setCornerSquareStyle(opt.key)}
                              className={cn(
                                "flex h-16 w-16 items-center justify-center rounded-xl border bg-white text-xs",
                                active
                                  ? "border-[#a855f7] shadow-sm"
                                  : "border-slate-200 hover:border-slate-300",
                              )}
                            >
                              <div className="flex flex-col items-center gap-1">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={CORNER_FRAME_PREVIEW[opt.key]}
                                  alt={`${opt.label} corner frame`}
                                  className="h-8 w-8 object-contain"
                                />
                                <span className="text-[10px] font-medium text-slate-800">
                                  {opt.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-900">
                        Corner dots type
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            { key: "square", label: "Square" },
                            { key: "dot", label: "Dot" },
                          ] as const
                        ).map((opt) => {
                          const active = cornerDotStyle === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setCornerDotStyle(opt.key)}
                              className={cn(
                                "flex h-16 w-16 items-center justify-center rounded-xl border bg-white text-xs",
                                active
                                  ? "border-[#a855f7] shadow-sm"
                                  : "border-slate-200 hover:border-slate-300",
                              )}
                            >
                              <div className="flex flex-col items-center gap-1">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={CORNER_DOT_PREVIEW[opt.key]}
                                  alt={`${opt.label} corner dots`}
                                  className="h-8 w-8 object-contain"
                                />
                                <span className="text-[10px] font-medium text-slate-800">
                                  {opt.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </DesignPanel>

                {/* Logo */}
                <DesignPanel
                  id="logo"
                  icon={<ImagePlus className="h-5 w-5" />}
                  openPanel={openPanel}
                  setOpenPanel={setOpenPanel}
                  title="Add Logo"
                  description="Make your QR code unique by adding your logo or an image."
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-900">
                        Upload your logo (Maximum size: 1 MB)
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-xs font-medium text-slate-900 hover:bg-slate-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoUpload}
                            className="hidden"
                          />
                          <ImagePlus className="mr-2 h-4 w-4" />
                          Upload your logo
                        </label>
                        {logoDataUrl && (
                          <button
                            type="button"
                            onClick={() => setLogoDataUrl(null)}
                            className="text-xs text-rose-600 underline-offset-4 hover:underline"
                          >
                            Remove logo
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-slate-900">
                        Logo size
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {(
                          [
                            { key: "small", label: "Small" },
                            { key: "medium", label: "Medium" },
                            { key: "large", label: "Large" },
                          ] as const
                        ).map((opt) => {
                          const active = logoScale === opt.key;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => setLogoScale(opt.key)}
                              className={cn(
                                "rounded-xl border px-3 py-2 text-xs font-medium",
                                active
                                  ? "border-[#a855f7] bg-[#ede9fe] text-slate-900 shadow-sm"
                                  : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100",
                              )}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setRemoveLogoBg((v) => !v)}
                        className={cn(
                          "rounded-xl border px-3 py-2 text-xs font-medium",
                          removeLogoBg
                            ? "border-[#a855f7] bg-[#ede9fe] text-slate-900 shadow-sm"
                            : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100",
                        )}
                      >
                        {removeLogoBg
                          ? "Hide pattern behind logo"
                          : "Show pattern behind logo"}
                      </button>
                      <p className="text-[11px] text-slate-500">
                        For best results, upload a high-contrast SVG or PNG logo
                        and avoid covering too much of the QR code.
                      </p>
                    </div>
                  </div>
                </DesignPanel>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN: PREVIEW + DOWNLOAD */}
          <div className="lg:sticky lg:top-8 self-start">
            <Card className="flex flex-col rounded-3xl border border-slate-100 bg-slate-50/60 p-6 shadow-none">
              <div className="mb-6 flex justify-center">
                <div
                  className="relative flex items-center justify-center rounded-[26px] border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                  style={{
                    width: previewSize + 60,
                    height: previewSize + 60,
                  }}
                >
                  <div
                    className="flex items-center justify-center rounded-[22px] bg-white"
                    style={{
                      width: previewSize,
                      height: previewSize,
                    }}
                  >
                    {qrDataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={qrDataUrl}
                        alt="QR code preview"
                        className="h-full w-full rounded-[18px] bg-white"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-[18px] border border-dashed border-slate-300 bg-white">
                        <p className="max-w-[160px] text-center text-xs text-slate-400">
                          Your QR code preview will appear here once you add
                          content.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-auto space-y-2">
                <Button
                  type="button"
                  disabled={!hasQr || loading}
                  onClick={handleDownload}
                  className={cn(
                    "h-11 w-full rounded-full text-sm font-semibold",
                    hasQr
                      ? "bg-[#a855f7] text-white hover:bg-[#9333ea]"
                      : "bg-slate-300 text-slate-600",
                    loading && "cursor-wait",
                  )}
                >
                  {hasQr ? "Download your KR Code" : "Add content to download"}
                </Button>
                <p className="text-[11px] text-slate-500">
                  PNG export · {size}px. For print, keep at least 2 cm of clear
                  space around the code.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------- helper components -------- */

function SectionHeader({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-semibold text-white">
        {step}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function DesignPanel({
  id,
  icon,
  title,
  description,
  children,
  openPanel,
  setOpenPanel,
}: {
  id: DesignPanelId;
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  openPanel: DesignPanelId;
  setOpenPanel: (id: DesignPanelId) => void;
}) {
  if (!id) return null;
  const open = openPanel === id;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white">
      <button
        type="button"
        onClick={() => setOpenPanel(open ? null : id)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            {icon}
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-slate-900">{title}</p>
            <p className="text-[11px] text-slate-500">{description}</p>
          </div>
        </div>
        <span className="text-lg leading-none text-slate-400">
          {open ? "−" : "＋"}
        </span>
      </button>
      {open && (
        <div className="border-t border-slate-100 px-4 py-4">{children}</div>
      )}
    </div>
  );
}

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
    <div className="space-y-1.5">
      <span className="text-xs font-medium text-slate-900">{label}</span>
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 rounded-xl border border-slate-200 bg-white">
          <div
            className="absolute inset-[4px] rounded-lg border border-slate-200"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-32 rounded-2xl border border-slate-200 bg-slate-50 px-2 text-xs focus:bg-white"
        />
      </div>
    </div>
  );
}
