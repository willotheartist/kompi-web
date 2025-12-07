//src/components/kr-codes/KRCodesPage.tsx

"use client";

import {
  useEffect,
  useMemo,
  useState,
  useRef,
  type ChangeEvent,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QRCodeStyling from "qr-code-styling";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pencil,
  Trash2,
  Globe2,
  FileText,
  UserCircle2,
  Type as TypeIcon,
  Smartphone,
  MessageCircle,
  Mail,
  Phone,
  AppWindow,
  Wifi,
  Calendar,
  MapPin,
  Layers,
  QrCode,
  Target,
} from "lucide-react";

const FormSchema = z.object({
  title: z.string().max(120).optional(),

  destination: z.string().optional(),

  smsNumber: z.string().optional(),
  smsMessage: z.string().optional(),

  emailAddress: z.string().optional(),
  emailSubject: z.string().optional(),
  emailBody: z.string().optional(),

  phoneNumber: z.string().optional(),

  plainText: z.string().optional(),

  // Wi-Fi
  wifiSsid: z.string().optional(),
  wifiPassword: z.string().optional(),
  wifiSecurity: z.enum(["WPA", "WEP", "nopass"]).optional(),
  wifiHidden: z.boolean().optional(),

  // Location
  locationQuery: z.string().optional(),

  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  utm_content: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

type KRCodeStyle = {
  fg?: string;
  bg?: string;
  size?: number;
  margin?: number;
  ecLevel?: "L" | "M" | "Q" | "H";
  logoUrl?: string | null;
  logoEnabled?: boolean;
  logoBgTransparent?: boolean;
  frameVariant?: "none" | "label-bottom" | "label-top";
  frameLabel?: string;
  dotsType?: "square" | "dots" | "rounded";
  cornersSquareType?: "square" | "extra-rounded";
  cornersDotType?: "square" | "dot";
  [key: string]: unknown;
};

type KRCode = {
  id: string;
  title: string | null;
  destination: string;
  style: KRCodeStyle | null;
  createdAt: string;
  type?: ContentTypeId | string | null;
  totalClicks?: number | null;
};

type ListResponse = {
  workspace: { id: string; name: string } | null;
  codes: KRCode[];
};

const CONTENT_TYPES = [
  {
    id: "url",
    label: "URL",
    description: "Send people to any website or landing page.",
    icon: Globe2,
    utmSupported: true,
  },
  {
    id: "file",
    label: "File / PDF",
    description: "Menus, brochures or media files.",
    icon: FileText,
    utmSupported: true,
  },
  {
    id: "social",
    label: "Social / Bio",
    description: "Instagram, TikTok or a Kompi bio.",
    icon: UserCircle2,
    utmSupported: true,
  },
  {
    id: "app",
    label: "App / Store",
    description: "App Store or Play Store links.",
    icon: AppWindow,
    utmSupported: true,
  },
  {
    id: "sms",
    label: "SMS",
    description: "Open SMS with a prefilled message.",
    icon: MessageCircle,
    utmSupported: false,
  },
  {
    id: "email",
    label: "Email",
    description: "Open email with subject & body.",
    icon: Mail,
    utmSupported: false,
  },
  {
    id: "phone",
    label: "Phone",
    description: "Start a phone call.",
    icon: Phone,
    utmSupported: false,
  },
  {
    id: "text",
    label: "Plain text",
    description: "Show any short text or code.",
    icon: TypeIcon,
    utmSupported: false,
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    description: "Join a network without typing.",
    icon: Wifi,
    utmSupported: false,
  },
  {
    id: "event",
    label: "Event",
    description: "Calendar event (coming soon).",
    icon: Calendar,
    utmSupported: false,
    disabled: true,
  },
  {
    id: "location",
    label: "Location",
    description: "Open an address in Maps.",
    icon: MapPin,
    utmSupported: false,
  },
  {
    id: "multi",
    label: "Multi-URL",
    description: "Different URLs per device (soon).",
    icon: Layers,
    utmSupported: false,
    disabled: true,
  },
] as const;

type ContentTypeId = (typeof CONTENT_TYPES)[number]["id"];

function labelForContentType(id: string | null | undefined) {
  if (!id) return null;
  const found = CONTENT_TYPES.find((t) => t.id === id);
  if (found) return found.label;
  if (id === "website") return "URL";
  if (id === "file") return "File";
  return id;
}

type StyleState = {
  fg: string;
  bg: string;
  size: number;
  margin: number;
  ecLevel: "L" | "M" | "Q" | "H";
  logoUrl?: string | null;
  logoEnabled: boolean;
  logoBgTransparent: boolean;
  frameVariant: "none" | "label-bottom" | "label-top";
  frameLabel: string;
  dotsType: "square" | "dots" | "rounded";
  cornersSquareType: "square" | "extra-rounded";
  cornersDotType: "square" | "dot";
};

const DEFAULT_STYLE: StyleState = {
  fg: "#FFFFFF",
  bg: "#020617",
  size: 192,
  margin: 2,
  ecLevel: "M",
  logoUrl: null,
  logoEnabled: false,
  logoBgTransparent: true,
  frameVariant: "none",
  frameLabel: "SCAN ME",
  dotsType: "rounded",
  cornersSquareType: "extra-rounded",
  cornersDotType: "dot",
};

const COLOR_PRESETS: Array<{
  id: string;
  label: string;
  fg: string;
  bg: string;
}> = [
  {
    id: "classic-dark",
    label: "Kompi Night",
    fg: "#FFFFFF",
    bg: "#020617",
  },
  {
    id: "classic-light",
    label: "Clean Light",
    fg: "#020617",
    bg: "#FFFFFF",
  },
  {
    id: "accent-blue",
    label: "Kompi Blue",
    fg: "#EBF3FF",
    bg: "#2643E6",
  },
  {
    id: "accent-amber",
    label: "Sunset",
    fg: "#111827",
    bg: "#FBBF24",
  },
  {
    id: "accent-rose",
    label: "Rose Glow",
    fg: "#FDF2F8",
    bg: "#BE185D",
  },
];

function destinationPlaceholder(type: ContentTypeId) {
  switch (type) {
    case "url":
      return "https://example.com/landing";
    case "file":
      return "https://example.com/menu.pdf";
    case "social":
      return "https://instagram.com/your-handle";
    case "app":
      return "https://apps.apple.com/app/...";
    case "wifi":
      return "Network name (SSID)";
    case "location":
      return "Address or coordinates";
    default:
      return "https://...";
  }
}

function errorCorrectionLabel(level: StyleState["ecLevel"]) {
  switch (level) {
    case "L":
      return "Light";
    case "M":
      return "Recommended";
    case "Q":
      return "High";
    case "H":
      return "Max (logo-ready)";
    default:
      return level;
  }
}

function errorCorrectionDescription(level: StyleState["ecLevel"]) {
  switch (level) {
    case "L":
      return "Best for simple, high-contrast codes without logos.";
    case "M":
      return "Balanced size & readability.";
    case "Q":
      return "More redundancy, good for print.";
    case "H":
      return "Max protection with logos & colors.";
    default:
      return "";
  }
}

type StyledQRCodeProps = {
  value: string;
  size: number;
  style: StyleState;
};

function StyledQRCode({ value, size, style }: StyledQRCodeProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const instance = new QRCodeStyling({
      width: size,
      height: size,
      data: value || "https://kompi.app",
      margin: style.margin,
      image:
        style.logoEnabled && style.logoUrl ? style.logoUrl : undefined,
      imageOptions: {
        hideBackgroundDots: style.logoBgTransparent,
        imageSize: 0.35,
        crossOrigin: "anonymous",
      },
      qrOptions: {
        errorCorrectionLevel:
          style.logoEnabled && style.logoUrl ? "H" : style.ecLevel,
      },
      dotsOptions: {
        color: style.fg,
        type: style.dotsType,
      },
      cornersSquareOptions: {
        type: style.cornersSquareType,
        color: style.fg,
      },
      cornersDotOptions: {
        type: style.cornersDotType,
        color: style.fg,
      },
      backgroundOptions: {
        color: style.bg,
      },
    });

    qrRef.current = instance;
    instance.append(containerRef.current);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      qrRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!qrRef.current) return;

    qrRef.current.update({
      width: size,
      height: size,
      data: value || "https://kompi.app",
      margin: style.margin,
      image:
        style.logoEnabled && style.logoUrl ? style.logoUrl : undefined,
      imageOptions: {
        hideBackgroundDots: style.logoBgTransparent,
        imageSize: 0.35,
        crossOrigin: "anonymous",
      },
      qrOptions: {
        errorCorrectionLevel:
          style.logoEnabled && style.logoUrl ? "H" : style.ecLevel,
      },
      dotsOptions: {
        color: style.fg,
        type: style.dotsType,
      },
      cornersSquareOptions: {
        type: style.cornersSquareType,
        color: style.fg,
      },
      cornersDotOptions: {
        type: style.cornersDotType,
        color: style.fg,
      },
      backgroundOptions: {
        color: style.bg,
      },
    });
  }, [
    value,
    size,
    style.fg,
    style.bg,
    style.margin,
    style.ecLevel,
    style.logoUrl,
    style.logoEnabled,
    style.logoBgTransparent,
    style.dotsType,
    style.cornersSquareType,
    style.cornersDotType,
  ]);

  return <div ref={containerRef} />;
}

function getStyleForCode(code: KRCode): StyleState {
  const base = DEFAULT_STYLE;
  const s = (code.style ?? {}) as KRCodeStyle;

  return {
    ...base,
    fg: (s.fg as string) || base.fg,
    bg: (s.bg as string) || base.bg,
    size: base.size,
    margin: (s.margin as number) ?? base.margin,
    ecLevel: (s.ecLevel as StyleState["ecLevel"]) ?? base.ecLevel,
    logoUrl:
      (s.logoUrl as string | null | undefined) ?? base.logoUrl ?? null,
    logoEnabled:
      (s.logoEnabled as boolean | undefined) ??
      (s.logoUrl ? true : base.logoEnabled),
    logoBgTransparent:
      (s.logoBgTransparent as boolean | undefined) ??
      base.logoBgTransparent,
    frameVariant:
      (s.frameVariant as StyleState["frameVariant"]) ??
      base.frameVariant,
    frameLabel: (s.frameLabel as string) ?? base.frameLabel,
    dotsType:
      (s.dotsType as StyleState["dotsType"]) ?? base.dotsType,
    cornersSquareType:
      (s.cornersSquareType as StyleState["cornersSquareType"]) ??
      base.cornersSquareType,
    cornersDotType:
      (s.cornersDotType as StyleState["cornersDotType"]) ??
      base.cornersDotType,
  };
}

export default function KRCodesPage() {
  const [workspace, setWorkspace] =
    useState<ListResponse["workspace"]>(null);
  const [codes, setCodes] = useState<KRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [qrLimitError, setQrLimitError] = useState<string | null>(null);

  const [style, setStyle] = useState<StyleState>(DEFAULT_STYLE);
  const [contentType, setContentType] =
    useState<ContentTypeId>("url");
  const [hoverType, setHoverType] =
    useState<ContentTypeId | null>(null);
  const [showUtms, setShowUtms] = useState(false);
  const [showMoreTypes, setShowMoreTypes] = useState(false);
  const [designerOpen, setDesignerOpen] = useState(true);

  const [downloadMenuFor, setDownloadMenuFor] =
    useState<string | null>(null);
  const [deleteIntentFor, setDeleteIntentFor] =
    useState<string | null>(null);

  const [createdPreview, setCreatedPreview] =
    useState<KRCode | null>(null);

  const [editingCode, setEditingCode] =
    useState<KRCode | null>(null);
  const isEditing = !!editingCode;

  const searchParams = useSearchParams();
  const router = useRouter();
  const krcodeIdFromQuery = searchParams.get("krcodeId");

  const form = useForm<FormValues>({
    // still using any resolver, keep simple
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(FormSchema as any),
    defaultValues: {
      title: "",
      destination: "",
      smsNumber: "",
      smsMessage: "",
      emailAddress: "",
      emailSubject: "",
      emailBody: "",
      phoneNumber: "",
      plainText: "",
      wifiSsid: "",
      wifiPassword: "",
      wifiSecurity: "WPA",
      wifiHidden: false,
      locationQuery: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    },
  });

  const watchDestination = form.watch("destination");
  const smsNumber = form.watch("smsNumber");
  const smsMessage = form.watch("smsMessage");
  const emailAddress = form.watch("emailAddress");
  const emailSubject = form.watch("emailSubject");
  const emailBody = form.watch("emailBody");
  const phoneNumber = form.watch("phoneNumber");
  const plainText = form.watch("plainText");

  const wifiSsid = form.watch("wifiSsid");
  const wifiPassword = form.watch("wifiPassword");
  const wifiSecurity = form.watch("wifiSecurity");
  const wifiHidden = form.watch("wifiHidden");
  const locationQuery = form.watch("locationQuery");

  const utm_source = form.watch("utm_source");
  const utm_medium = form.watch("utm_medium");
  const utm_campaign = form.watch("utm_campaign");
  const utm_term = form.watch("utm_term");
  const utm_content = form.watch("utm_content");

  const activeType =
    CONTENT_TYPES.find(
      (t) => t.id === (hoverType ?? contentType),
    ) ?? CONTENT_TYPES[0];

  const utmSupported = !!CONTENT_TYPES.find(
    (t) => t.id === contentType && t.utmSupported,
  );

  const urlPreview = useMemo(() => {
    if (
      contentType === "url" ||
      contentType === "file" ||
      contentType === "social" ||
      contentType === "app"
    ) {
      const destination = watchDestination;
      if (!destination) return "";
      try {
        const u = new URL(destination);
        if (utm_source) u.searchParams.set("utm_source", utm_source);
        if (utm_medium) u.searchParams.set("utm_medium", utm_medium);
        if (utm_campaign)
          u.searchParams.set("utm_campaign", utm_campaign);
        if (utm_term) u.searchParams.set("utm_term", utm_term);
        if (utm_content)
          u.searchParams.set("utm_content", utm_content);
        return u.toString();
      } catch {
        return destination;
      }
    }

    if (contentType === "sms") {
      if (!smsNumber) return "";
      const base = `sms:${smsNumber}`;
      if (!smsMessage) return base;
      const encoded = encodeURIComponent(smsMessage);
      return `${base}?&body=${encoded}`;
    }

    if (contentType === "email") {
      if (!emailAddress) return "";
      const params = new URLSearchParams();
      if (emailSubject) params.set("subject", emailSubject);
      if (emailBody) params.set("body", emailBody);
      const query = params.toString();
      return query
        ? `mailto:${emailAddress}?${query}`
        : `mailto:${emailAddress}`;
    }

    if (contentType === "phone") {
      if (!phoneNumber) return "";
      return `tel:${phoneNumber}`;
    }

    if (contentType === "text") {
      return plainText || "";
    }

    if (contentType === "wifi") {
      if (!wifiSsid) return "";
      const t = wifiSecurity || "WPA";
      const hidden = wifiHidden ? "H:true;" : "";
      const passwordPart =
        t === "nopass" ? "" : `P:${wifiPassword ?? ""};`;
      return `WIFI:T:${t};S:${wifiSsid};${passwordPart}${hidden};`;
    }

    if (contentType === "location") {
      if (!locationQuery) return "";
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        locationQuery,
      )}`;
    }

    return watchDestination || "";
  }, [
    contentType,
    watchDestination,
    smsNumber,
    smsMessage,
    emailAddress,
    emailSubject,
    emailBody,
    phoneNumber,
    plainText,
    wifiSsid,
    wifiPassword,
    wifiSecurity,
    wifiHidden,
    locationQuery,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
  ]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/kr-codes", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }
        const data: ListResponse = await res.json();
        if (!cancelled) {
          setWorkspace(data.workspace);
          setCodes(data.codes ?? []);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load KR Codes");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!krcodeIdFromQuery || codes.length === 0) return;
    const target = codes.find((c) => c.id === krcodeIdFromQuery);
    if (!target) return;
    handleEdit(target);
  }, [krcodeIdFromQuery, codes]);

  function buildDestinationForSubmit(values: FormValues): string | null {
    if (
      contentType === "url" ||
      contentType === "file" ||
      contentType === "social" ||
      contentType === "app"
    ) {
      const raw = values.destination?.trim();
      if (!raw) return null;
      try {
        const u = new URL(raw);
        if (values.utm_source)
          u.searchParams.set("utm_source", values.utm_source);
        if (values.utm_medium)
          u.searchParams.set("utm_medium", values.utm_medium);
        if (values.utm_campaign)
          u.searchParams.set("utm_campaign", values.utm_campaign);
        if (values.utm_term)
          u.searchParams.set("utm_term", values.utm_term);
        if (values.utm_content)
          u.searchParams.set("utm_content", values.utm_content);
        return u.toString();
      } catch {
        return raw;
      }
    }

    if (contentType === "sms") {
      if (!values.smsNumber) return null;
      const base = `sms:${values.smsNumber}`;
      if (!values.smsMessage) return base;
      const encoded = encodeURIComponent(values.smsMessage);
      return `${base}?&body=${encoded}`;
    }

    if (contentType === "email") {
      if (!values.emailAddress) return null;
      const params = new URLSearchParams();
      if (values.emailSubject)
        params.set("subject", values.emailSubject);
      if (values.emailBody) params.set("body", values.emailBody);
      const query = params.toString();
      return query
        ? `mailto:${values.emailAddress}?${query}`
        : `mailto:${values.emailAddress}`;
    }

    if (contentType === "phone") {
      if (!values.phoneNumber) return null;
      return `tel:${values.phoneNumber}`;
    }

    if (contentType === "text") {
      if (!values.plainText) return null;
      return values.plainText;
    }

    if (contentType === "wifi") {
      if (!values.wifiSsid) return null;
      const t = values.wifiSecurity || "WPA";
      const hidden = values.wifiHidden ? "H:true;" : "";
      const passwordPart =
        t === "nopass" ? "" : `P:${values.wifiPassword ?? ""};`;
      return `WIFI:T:${t};S:${values.wifiSsid};${passwordPart}${hidden};`;
    }

    if (contentType === "location") {
      if (!values.locationQuery) return null;
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        values.locationQuery,
      )}`;
    }

    const fallback = values.destination?.trim();
    return fallback || null;
  }

  async function onSubmit(values: FormValues) {
    setCreating(true);
    setError(null);
    setFormError(null);
    setQrLimitError(null);

    const destinationForCode =
      buildDestinationForSubmit(values);

    if (!destinationForCode) {
      setCreating(false);
      setFormError(
        "Please fill in the required fields for this code type.",
      );
      return;
    }

    const utmSupportedForPayload = !!CONTENT_TYPES.find(
      (t) => t.id === contentType && t.utmSupported,
    );

    const stylePayload = {
      fg: style.fg,
      bg: style.bg,
      size: style.size,
      margin: style.margin,
      ecLevel: style.ecLevel,
      logoUrl: style.logoEnabled ? style.logoUrl ?? null : null,
      logoEnabled: style.logoEnabled,
      logoBgTransparent: style.logoBgTransparent,
      frameVariant: style.frameVariant,
      frameLabel: style.frameLabel,
      dotsType: style.dotsType,
      cornersSquareType: style.cornersSquareType,
      cornersDotType: style.cornersDotType,
    };

    // Edit existing code
    if (editingCode) {
      const payload = {
        title: values.title ?? null,
        destination: destinationForCode,
        type: contentType,
        utm: utmSupportedForPayload
          ? {
              source: values.utm_source || undefined,
              medium: values.utm_medium || undefined,
              campaign: values.utm_campaign || undefined,
              term: values.utm_term || undefined,
              content: values.utm_content || undefined,
            }
          : undefined,
        style: stylePayload,
      };

      try {
        const res = await fetch(`/api/kr-codes/${editingCode.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(
            `Failed to update KR Code: ${res.status} ${text}`,
          );
        }

        const updated: KRCode = await res.json();
        setCodes((prev) =>
          prev.map((c) =>
            c.id === updated.id ? { ...c, ...updated } : c,
          ),
        );
        setEditingCode(null);
        setCreatedPreview(null);
      } catch (err) {
        console.error(err);
        setError("Failed to update KR Code");
      } finally {
        setCreating(false);
      }

      return;
    }

    // Create new code
    const payload = {
      title: values.title || undefined,
      destination: destinationForCode,
      createShortLink: true,
      type: contentType,
      utm: utmSupportedForPayload
        ? {
            source: values.utm_source || undefined,
            medium: values.utm_medium || undefined,
            campaign: values.utm_campaign || undefined,
            term: values.utm_term || undefined,
            content: values.utm_content || undefined,
          }
        : undefined,
      style: stylePayload,
    };

    try {
      const res = await fetch("/api/kr-codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (res.status === 402) {
        const textMessage = await res.text();
        setQrLimitError(
          textMessage ||
            "Free plan limit reached: you’ve created the maximum number of Kompi Codes for this workspace.",
        );
        setCreating(false);
        return;
      }

      if (!res.ok) {
        const text = await res.text();
        throw new Error(
          `Failed to create KR Code: ${res.status} ${text}`,
        );
      }

      const created: KRCode = await res.json();
      const createdWithClicks: KRCode = {
        ...created,
        totalClicks: 0,
      };
      setCodes((prev) => [createdWithClicks, ...prev]);
      setCreatedPreview(createdWithClicks);
      form.reset();
      setStyle(DEFAULT_STYLE);
      setContentType("url");
      setShowUtms(false);
    } catch (err) {
      console.error(err);
      setError("Failed to create KR Code");
    } finally {
      setCreating(false);
    }
  }

  function handleEdit(code: KRCode) {
    setEditingCode(code);

    const candidateType = (code.type as ContentTypeId | undefined) ?? "url";
    const safeType: ContentTypeId = CONTENT_TYPES.some(
      (t) => t.id === candidateType,
    )
      ? candidateType
      : "url";

    setContentType(safeType);

    form.reset({
      title: code.title ?? "",
      destination:
        safeType === "url" ||
        safeType === "file" ||
        safeType === "social" ||
        safeType === "app"
          ? code.destination
          : "",
      smsNumber: "",
      smsMessage: "",
      emailAddress: "",
      emailSubject: "",
      emailBody: "",
      phoneNumber: "",
      plainText: "",
      wifiSsid: "",
      wifiPassword: "",
      wifiSecurity: "WPA",
      wifiHidden: false,
      locationQuery: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    });

    setStyle(getStyleForCode(code));

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  async function handleDelete(code: KRCode) {
    setError(null);
    try {
      const res = await fetch(`/api/kr-codes/${code.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }
      setCodes((prev) =>
        prev.filter((c) => c.id !== code.id),
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete KR Code");
    } finally {
      setDeleteIntentFor((current) =>
        current === code.id ? null : current,
      );
    }
  }

  const totalScans =
    codes.reduce(
      (sum, c) => sum + (c.totalClicks ?? 0),
      0,
    ) ?? 0;

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setStyle((s) => ({
        ...s,
        logoUrl: result,
        logoEnabled: true,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="wf-dashboard-main w-full bg-[var(--color-bg)]">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-6 md:gap-8 md:pb-12">
                <header className="flex flex-col gap-5 rounded-3xl bg-[#1E2330] px-4 py-4 md:flex-row md:items-stretch md:justify-between md:px-7 md:py-6">
          {/* LEFT: static hero image + copy */}
          <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
            <div className="md:w-[120px]">
              <Image
                src="/kompi-platform.png"
                alt="Kompi Codes hero"
                width={360}
                height={120}
                className="h-auto w-full rounded-2xl"
                priority
              />
            </div>

            <div className="space-y-2 md:pl-6">
              <p
                className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#A5B0FF]"
                style={{
                  fontFamily: "var(--font-instrument-serif), system-ui, serif",
                }}
              >
                KR / QR CODES
              </p>
              <h1 className="text-2xl leading-tight text-white md:text-3xl">
                <span className="mr-1.5 font-medium">Create a new</span>
                <span
                  className="italic"
                  style={{
                    fontFamily: "var(--font-instrument-serif), system-ui, serif",
                    fontWeight: 500,
                  }}
                >
                  Kompi Code
                </span>
              </h1>
              <p className="max-w-md text-xs text-[#9CA3AF] md:text-sm">
                Drop a destination, pick the look, and ship QR stickers that feel like part of your brand.
              </p>
            </div>
          </div>

          {/* RIGHT: workspace activity pill */}
          <div className="mt-4 w-full max-w-xs md:mt-0 md:ml-6">
            <div className="flex h-full flex-col justify-between rounded-[32px] bg-[#A5B0FF] px-6 py-5 text-[#020617]">
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{
                  fontFamily: "var(--font-instrument-serif), system-ui, serif",
                }}
              >
                WORKSPACE ACTIVITY
              </p>

              <div className="mt-3 flex items-end justify-between gap-6">
                <div>
                  <p className="text-[11px] opacity-80">Codes</p>
                  <p className="text-2xl font-semibold leading-tight">
                    {codes.length}
                  </p>
                </div>

                <div className="flex items-end gap-6">
                  <div className="h-10 w-px bg-[#7D8BFF]" />
                  <div className="text-right">
                    <p className="text-[11px] opacity-80">Total scans</p>
                    <p className="text-2xl font-semibold leading-tight">
                      {totalScans}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-snug opacity-80">
                All scans route through Kompi for clean, workspace-level analytics.
              </p>
            </div>
          </div>
        </header>


        {qrLimitError && (
          <div className="mt-4 rounded-[32px] bg-white px-6 py-5 shadow-sm ring-1 ring-[var(--color-border)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <p
                  className="text-lg font-semibold leading-snug text-[#013425]"
                  style={{
                    fontFamily:
                      '"Instrument Serif", system-ui, serif',
                  }}
                >
                  You’ve reached your limit on the Free plan.
                </p>
                <p className="text-xs md:text-sm text-[color:var(--color-subtle)]">
                  {qrLimitError}
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-2 text-xs md:text-sm md:flex-row md:items-center">
                <Link
                  href="/dashboard/settings/billing"
                  className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(15,23,42,0.35)] bg-gradient-to-r from-[#7B8CFF] via-[#A5B0FF] to-[#D8FF3B] hover:brightness-105 transition"
                >
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="text-base">⚡</span>
                  </span>
                  <span className="flex flex-col leading-tight text-left">
                    <span>Upgrade to Kompi PRO</span>
                    <span className="text-[10px] font-normal opacity-80">
                      Unlock new features now.
                    </span>
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setQrLimitError(null)}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] px-4 py-2 text-xs font-medium text-[color:var(--color-subtle)] hover:bg-[var(--color-bg)]"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Row 1: create + preview */}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1.05fr)]">
          {/* LEFT */}
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <CardHeader className="border-b border-[var(--color-border)] pb-4">
              <CardTitle className="flex items-center justify-between text-sm font-semibold text-[color:var(--color-text)]">
                <span>Code setup</span>
                <span className="text-[11px] font-normal text-[color:var(--color-subtle)]">
                  1. Type • 2. Destination • 3. Design
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              {/* Type summary bar */}
              <div className="rounded-xl bg-[var(--color-bg)] px-4 py-2 text-[11px] text-[color:var(--color-subtle)]">
                {activeType.label} • {activeType.description}
              </div>
              {/* Type selector */}
              {(() => {
                const enabledTypes = CONTENT_TYPES.filter(
                  (t) => !("disabled" in t && t.disabled),
                );
                const primaryTypes = enabledTypes.slice(0, 6);
                const extraTypes = enabledTypes.slice(6);

                return (
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Primary types */}
                    {primaryTypes.map((t) => {
                      const Icon = t.icon;
                      const isActive = t.id === contentType;

                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setContentType(t.id)}
                          onMouseEnter={() => setHoverType(t.id)}
                          onMouseLeave={() => setHoverType(null)}
                          className={
                            "group inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-left text-xs transition " +
                            (isActive
                              ? "border-[#A5B0FF] bg-[#A5B0FF]/90 text-black shadow-sm"
                              : "border-[var(--color-border)] bg-[var(--color-bg)] text-[color:var(--color-text)] hover:border-[#A5B0FF] hover:bg-[#A5B0FF]/20")
                          }
                        >
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
                            <Icon className="h-4 w-4" />
                          </span>
                          <span
                            className="whitespace-nowrap"
                            style={{
                              fontFamily:
                                '"Instrument Serif", system-ui, serif',
                            }}
                          >
                            {t.label}
                          </span>
                        </button>
                      );
                    })}

                    {/* Extra types – revealed when clicking More */}
                    {showMoreTypes &&
                      extraTypes.map((t) => {
                        const Icon = t.icon;
                        const isActive = t.id === contentType;

                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setContentType(t.id)}
                            onMouseEnter={() => setHoverType(t.id)}
                            onMouseLeave={() => setHoverType(null)}
                            className={
                              "group inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-left text-xs transition " +
                              (isActive
                                ? "border-[#A5B0FF] bg-[#A5B0FF]/90 text-black shadow-sm"
                                : "border-[var(--color-border)] bg-[var(--color-bg)] text-[color:var(--color-text)] hover:border-[#A5B0FF] hover:bg-[#A5B0FF]/20")
                            }
                          >
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]">
                              <Icon className="h-4 w-4" />
                            </span>
                            <span
                              className="whitespace-nowrap"
                              style={{
                                fontFamily:
                                  '"Instrument Serif", system-ui, serif',
                              }}
                            >
                              {t.label}
                            </span>
                          </button>
                        );
                      })}

                    {/* More button */}
                    {extraTypes.length > 0 && !showMoreTypes && (
                      <button
                        type="button"
                        onClick={() => setShowMoreTypes(true)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2 text-xs text-[color:var(--color-text)] hover:border-[#A5B0FF] hover:bg-[#A5B0FF]/10"
                      >
                        <span
                          className="whitespace-nowrap"
                          style={{
                            fontFamily:
                              '"Instrument Serif", system-ui, serif',
                          }}
                        >
                          More
                        </span>
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* Create form */}

              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[color:var(--color-text)]">
                    Title{" "}
                    <span className="font-normal text-[color:var(--color-subtle)]">
                      (optional)
                    </span>
                  </label>
                  <Input
                    className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                    placeholder="Spring campaign flyer"
                    {...form.register("title")}
                  />
                </div>

                {/* Dynamic fields */}
                {(() => {
                  if (
                    contentType === "url" ||
                    contentType === "file" ||
                    contentType === "social" ||
                    contentType === "app"
                  ) {
                    return (
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          Destination
                        </label>
                        <Input
                          className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                          placeholder={destinationPlaceholder(
                            contentType,
                          )}
                          {...form.register("destination")}
                        />
                      </div>
                    );
                  }

                  if (contentType === "sms") {
                    return (
                      <div className="grid gap-3 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Phone number
                          </label>
                          <Input
                            className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="+44 7700 900000"
                            {...form.register("smsNumber")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Message
                          </label>
                          <Input
                            className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="Hey, I found you from this poster…"
                            {...form.register("smsMessage")}
                          />
                        </div>
                      </div>
                    );
                  }

                  if (contentType === "email") {
                    return (
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Email address
                          </label>
                          <Input
                            className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="hello@brand.com"
                            {...form.register("emailAddress")}
                          />
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[color:var(--color-text)]">
                              Subject
                            </label>
                            <Input
                              className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                              placeholder="Kompi campaign enquiry"
                              {...form.register("emailSubject")}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[color:var(--color-text)]">
                              Body (optional)
                            </label>
                            <Input
                              className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                              placeholder="Hi there, I scanned your QR code and…"
                              {...form.register("emailBody")}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (contentType === "phone") {
                    return (
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          Phone number
                        </label>
                        <Input
                          className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                          placeholder="+44 7700 900000"
                          {...form.register("phoneNumber")}
                        />
                      </div>
                    );
                  }

                  if (contentType === "text") {
                    return (
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          Plain text
                        </label>
                        <Textarea
                          rows={3}
                          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                          placeholder="Show a coupon code, instructions, or any short text…"
                          {...form.register("plainText")}
                        />
                      </div>
                    );
                  }

                  if (contentType === "wifi") {
                    return (
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Network name (SSID)
                          </label>
                          <Input
                            className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="MyCafe-Wifi"
                            {...form.register("wifiSsid")}
                          />
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[color:var(--color-text)]">
                              Password
                            </label>
                            <Input
                              className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                              placeholder="Optional"
                              {...form.register("wifiPassword")}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[color:var(--color-text)]">
                              Security
                            </label>
                            <select
                              className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-xs text-[color:var(--color-text)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                              {...form.register("wifiSecurity")}
                            >
                              <option value="WPA">WPA/WPA2</option>
                              <option value="WEP">WEP</option>
                              <option value="nopass">
                                Open network
                              </option>
                            </select>
                          </div>
                        </div>
                        <label className="flex items-center gap-2 text-[11px] text-[color:var(--color-subtle)]">
                          <input
                            type="checkbox"
                            className="h-3 w-3 rounded border border-[var(--color-border)]"
                            {...form.register("wifiHidden")}
                          />
                          Hidden network
                        </label>
                      </div>
                    );
                  }

                  if (contentType === "location") {
                    return (
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          Address or coordinates
                        </label>
                        <Input
                          className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                          placeholder="221B Baker Street, London"
                          {...form.register("locationQuery")}
                        />
                      </div>
                    );
                  }

                  // fallback
                  return (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[color:var(--color-text)]">
                        Destination / payload
                      </label>
                      <Input
                        className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                        placeholder="This is what your QR encodes…"
                        {...form.register("destination")}
                      />
                    </div>
                  );
                })()}

                {/* UTM card */}
                {utmSupported && (
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)]">
                          <Target className="h-4 w-4 text-[color:var(--color-text)]" />
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-[color:var(--color-text)]">
                            UTM tracking
                          </p>
                          <p className="text-xs text-[color:var(--color-subtle)]">
                            Optional campaign parameters for analytics.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowUtms((prev) => !prev)}
                        className={
                          "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium transition " +
                          (showUtms
                            ? "bg-[var(--color-accent-soft)] text-[color:var(--color-text)]"
                            : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-text)]")
                        }
                      >
                        {showUtms ? "UTM enabled" : "Add UTM"}
                      </button>
                    </div>

                    {showUtms ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs text-[color:var(--color-text)]">
                            Source
                          </label>
                          <Input
                            className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="poster, newsletter"
                            {...form.register("utm_source")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-[color:var(--color-text)]">
                            Medium
                          </label>
                          <Input
                            className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="qr, print"
                            {...form.register("utm_medium")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-[color:var(--color-text)]">
                            Campaign
                          </label>
                          <Input
                            className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="spring_launch"
                            {...form.register("utm_campaign")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-[color:var(--color-text)]">
                            Term (optional)
                          </label>
                          <Input
                            className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="headline_a"
                            {...form.register("utm_term")}
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-xs text-[color:var(--color-text)]">
                            Content (optional)
                          </label>
                          <Textarea
                            rows={2}
                            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                            placeholder="banner_variant_a"
                            {...form.register("utm_content")}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-[color:var(--color-subtle)]">
                        Add source & campaign tags when you want to track
                        offline placements.
                      </p>
                    )}
                  </div>
                )}

                {/* Footer */}
                {(formError || error) && (<p className="pt-1 text-xs text-red-400">{formError || error}</p>)}

                {(formError || error) && (
                  <p className="pt-1 text-xs text-red-400">
                    {formError || error}
                  </p>
                )}
              </form>

              {/* Divider */}
              <div className="h-px w-full bg-[var(--color-border)]" />

              {/* Design panel */}
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4">
                <button
                  type="button"
                  onClick={() =>
                    setDesignerOpen((prev) => !prev)
                  }
                  className="flex w-full items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 text-left">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)]">
                      <QrCode className="h-4 w-4 text-[color:var(--color-text)]" />
                    </span>
                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-[color:var(--color-text)]">
                        Design
                      </p>
                      <p className="text-xs text-[color:var(--color-subtle)]">
                        Colors, shapes & logo – keep codes on-brand.
                      </p>
                    </div>
                  </div>
                  <span
                    className={
                      "inline-flex h-6 w-11 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-0.5 transition-all " +
                      (designerOpen
                        ? "justify-end"
                        : "justify-start")
                    }
                  >
                    <span className="h-4 w-4 rounded-full bg-[var(--color-accent)]" />
                  </span>
                </button>

                {designerOpen && (
                  <div className="mt-4 space-y-6">
                    {/* COLORS SECTION */}
                    <section className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-[color:var(--color-text)]">
                            Colors
                          </p>
                          <p className="text-[11px] text-[color:var(--color-subtle)]">
                            Brand colors, size & error correction.
                          </p>
                        </div>
                      </div>

                      {/* Presets */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Color presets
                          </label>
                          <span className="text-[10px] text-[color:var(--color-subtle)]">
                            Tap to start, then tweak.
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {COLOR_PRESETS.map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() =>
                                setStyle((s) => ({
                                  ...s,
                                  fg: preset.fg,
                                  bg: preset.bg,
                                }))
                              }
                              className="flex items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1.5 text-[11px] text-[color:var(--color-text)] hover:border-[var(--color-accent)]"
                            >
                              <span
                                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-[var(--color-border)]"
                                style={{ background: preset.bg }}
                              >
                                <span
                                  className="h-2 w-2 rounded-[5px]"
                                  style={{ background: preset.fg }}
                                />
                              </span>
                              <span>{preset.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Foreground / background */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Foreground
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
                              value={style.fg}
                              onChange={(e) =>
                                setStyle((s) => ({
                                  ...s,
                                  fg: e.target.value,
                                }))
                              }
                            />
                            <Input
                              className="h-9 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-xs text-[color:var(--color-text)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                              value={style.fg}
                              onChange={(e) =>
                                setStyle((s) => ({
                                  ...s,
                                  fg: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Background
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              className="h-8 w-10 cursor-pointer rounded border border-[var(--color-border)] bg-transparent"
                              value={style.bg}
                              onChange={(e) =>
                                setStyle((s) => ({
                                  ...s,
                                  bg: e.target.value,
                                }))
                              }
                            />
                            <Input
                              className="h-9 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-xs text-[color:var(--color-text)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                              value={style.bg}
                              onChange={(e) =>
                                setStyle((s) => ({
                                  ...s,
                                  bg: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Size & margin */}
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Size ({style.size}px)
                          </label>
                          <input
                            type="range"
                            min={128}
                            max={320}
                            value={style.size}
                            onChange={(e) =>
                              setStyle((s) => ({
                                ...s,
                                size: Number(e.target.value),
                              }))
                            }
                            className="w-full accent-[var(--color-accent)]"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Margin ({style.margin})
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={8}
                            value={style.margin}
                            onChange={(e) =>
                              setStyle((s) => ({
                                ...s,
                                margin: Number(e.target.value),
                              }))
                            }
                            className="w-full accent-[var(--color-accent)]"
                          />
                        </div>
                      </div>

                      {/* Error correction */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          Error correction
                        </label>
                        <div className="grid gap-2 text-[11px] md:grid-cols-4">
                          {(
                            [
                              { level: "L", name: "Light" },
                              { level: "M", name: "Recommended" },
                              { level: "Q", name: "High" },
                              { level: "H", name: "Max" },
                            ] as const
                          ).map((opt) => (
                            <button
                              key={opt.level}
                              type="button"
                              className={[
                                "flex flex-col rounded-2xl border px-2.5 py-2 text-left transition",
                                style.ecLevel === opt.level
                                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[color:var(--color-text)]"
                                  : "border-[var(--color-border)] text-[color:var(--color-subtle)] hover:border-[var(--color-accent)] hover:text-[color:var(--color-text)]",
                              ].join(" ")}
                              onClick={() =>
                                setStyle((s) => ({
                                  ...s,
                                  ecLevel:
                                    opt.level as StyleState["ecLevel"],
                                }))
                              }
                            >
                              <span className="text-[11px] font-semibold">
                                {errorCorrectionLabel(
                                  opt.level as StyleState["ecLevel"],
                                )}
                              </span>
                              <span className="mt-0.5 text-[10px] leading-snug">
                                {errorCorrectionDescription(
                                  opt.level as StyleState["ecLevel"],
                                )}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* SHAPES SECTION */}
                    <section className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-[color:var(--color-text)]">
                            Shapes
                          </p>
                          <p className="text-[11px] text-[color:var(--color-subtle)]">
                            Body dots, eye frames & frames.
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        {/* Dot style */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Dot style
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: "square", label: "Square" },
                              { id: "dots", label: "Dots" },
                              { id: "rounded", label: "Rounded" },
                            ].map((opt) => {
                              const isActive = style.dotsType === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() =>
                                    setStyle((s) => ({
                                      ...s,
                                      dotsType: opt.id as StyleState["dotsType"],
                                    }))
                                  }
                                  className={[
                                    "rounded-2xl border px-2.5 py-2 text-[10px] transition",
                                    isActive
                                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[color:var(--color-text)] shadow-sm"
                                      : "border-[var(--color-border)] text-[color:var(--color-subtle)] hover:border-[var(--color-accent)] hover:text-[color:var(--color-text)]",
                                  ].join(" ")}
                                >
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
                                      <div className="grid grid-cols-3 gap-[2px]">
                                        {Array.from({ length: 9 }).map((_, i) => (
                                          <div
                                            key={i}
                                            className={[
                                              "h-1.5 w-1.5 bg-[color:var(--color-text)]",
                                              opt.id == "square"
                                                ? "rounded-[2px]"
                                                : opt.id == "dots"
                                                ? "rounded-full"
                                                : "rounded-[999px]",
                                            ].join(" ")}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <span>{opt.label}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Corner squares */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Corner squares
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: "square", label: "Classic" },
                              { id: "extra-rounded", label: "Rounded" },
                            ].map((opt) => {
                              const isActive = style.cornersSquareType === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() =>
                                    setStyle((s) => ({
                                      ...s,
                                      cornersSquareType: opt.id as StyleState["cornersSquareType"],
                                    }))
                                  }
                                  className={[
                                    "rounded-2xl border px-2.5 py-2 text-[10px] transition",
                                    isActive
                                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[color:var(--color-text)] shadow-sm"
                                      : "border-[var(--color-border)] text-[color:var(--color-subtle)] hover:border-[var(--color-accent)] hover:text-[color:var(--color-text)]",
                                  ].join(" ")}
                                >
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className="relative h-10 w-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
                                      <div
                                        className={[
                                          "absolute inset-1 border border-[color:var(--color-text)]",
                                          opt.id == "square" ? "rounded-[3px]" : "rounded-[12px]",
                                        ].join(" ")}
                                      />
                                    </div>
                                    <span>{opt.label}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Corner dots */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Corner dots
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: "square", label: "Square" },
                              { id: "dot", label: "Dot" },
                            ].map((opt) => {
                              const isActive = style.cornersDotType === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() =>
                                    setStyle((s) => ({
                                      ...s,
                                      cornersDotType: opt.id as StyleState["cornersDotType"],
                                    }))
                                  }
                                  className={[
                                    "rounded-2xl border px-2.5 py-2 text-[10px] transition",
                                    isActive
                                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[color:var(--color-text)] shadow-sm"
                                      : "border-[var(--color-border)] text-[color:var(--color-subtle)] hover:border-[var(--color-accent)] hover:text-[color:var(--color-text)]",
                                  ].join(" ")}
                                >
                                  <div className="flex flex-col items-center gap-1.5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
                                      <div className="flex gap-1.5">
                                        {Array.from({ length: 3 }).map((_, i) => (
                                          <div
                                            key={i}
                                            className={[
                                              "h-2.5 w-2.5 bg-[color:var(--color-text)]",
                                              opt.id == "square" ? "rounded-[3px]" : "rounded-full",
                                            ].join(" ")}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                    <span>{opt.label}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Frame style */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Frame style
                          </label>
                          <span className="text-[10px] text-[color:var(--color-subtle)]">
                            Make it feel like a sticker.
                          </span>
                        </div>

                        <div className="grid gap-2 sm:grid-cols-3">
                          {[
                            {
                              id: "none",
                              label: "Minimal",
                              description: "Just the code.",
                            },
                            {
                              id: "label-bottom",
                              label: "Sticker",
                              description: "Label below the code.",
                            },
                            {
                              id: "label-top",
                              label: "Banner",
                              description: "Label above the code.",
                            },
                          ].map((f) => {
                            const isActive = style.frameVariant === (f.id as StyleState["frameVariant"]);

                            return (
                              <button
                                key={f.id}
                                type="button"
                                onClick={() =>
                                  setStyle((s) => ({
                                    ...s,
                                    frameVariant: f.id as StyleState["frameVariant"],
                                  }))
                                }
                                className={[
                                  "flex flex-col gap-1 rounded-2xl border px-3 py-2 text-left text-[11px] transition",
                                  isActive
                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[color:var(--color-text)] shadow-sm"
                                    : "border-[var(--color-border)] text-[color:var(--color-subtle)] hover:border-[var(--color-accent)] hover:text-[color:var(--color-text)]",
                                ].join(" ")}
                              >
                                <div className="flex items-center justify-center">
                                  <div className="flex flex-col items-center gap-1 rounded-xl bg-[var(--color-bg)] px-3 py-2">
                                    {f.id === "label-top" && (
                                      <div className="h-1.5 w-12 rounded-full bg-[var(--color-border)]" />
                                    )}

                                    <div className="h-7 w-7 rounded-[7px] border border-[var(--color-border)] bg-[var(--color-surface)]" />

                                    {f.id === "label-bottom" && (
                                      <div className="h-1.5 w-12 rounded-full bg-[var(--color-border)]" />
                                    )}
                                  </div>
                                </div>

                                <div className="mt-1">
                                  <div className="font-semibold">
                                    {f.label}
                                  </div>
                                  <div className="text-[10px] leading-snug">
                                    {f.description}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {style.frameVariant !== "none" && (
                          <div className="space-y-2">
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <label className="text-xs font-medium text-[color:var(--color-text)]">
                                Frame label
                              </label>
                              <span className="text-[10px] text-[color:var(--color-subtle)]">
                                Short and action-oriented works best.
                              </span>
                            </div>

                            <Input
                              className="h-10 w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5B0FF] focus-visible:ring-offset-0 transition-shadow"
                              value={style.frameLabel}
                              onChange={(e) =>
                                setStyle((s) => ({
                                  ...s,
                                  frameLabel: e.target.value,
                                }))
                              }
                              placeholder="SCAN ME"
                            />

                            <div className="flex flex-wrap gap-1.5">
                              {[
                                "SCAN ME",
                                "OPEN MENU",
                                "OPEN SITE",
                                "FOLLOW US",
                              ].map((label) => (
                                <button
                                  key={label}
                                  type="button"
                                  onClick={() =>
                                    setStyle((s) => ({
                                      ...s,
                                      frameLabel: label,
                                    }))
                                  }
                                  className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 text-[10px] text-[color:var(--color-subtle)] hover:border-[var(--color-accent)] hover:text-[color:var(--color-text)]"
                                >
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* LOGO SECTION */}
                    <section className="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-[color:var(--color-text)]">
                            Logo
                          </p>
                          <p className="text-[11px] text-[color:var(--color-subtle)]">
                            Center logo, with optional background removal.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            setStyle((s) => ({
                              ...s,
                              logoEnabled: !s.logoEnabled,
                            }))
                          }
                          className={
                            "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium transition " +
                            (style.logoEnabled
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[color:var(--color-text)]"
                              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-subtle)]")
                          }
                        >
                          {style.logoEnabled ? "On" : "Off"}
                        </button>
                      </div>

                      {style.logoEnabled && (
                        <>
                          <div className="flex items-center gap-3">
                            <input
                              id="designer-logo-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleLogoUpload}
                            />
                            <label
                              htmlFor="designer-logo-upload"
                              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] font-medium text-[color:var(--color-text)] hover:bg-[var(--color-bg)] cursor-pointer"
                            >
                              Upload logo
                            </label>
                            {style.logoUrl && (
                              <button
                                type="button"
                                onClick={() =>
                                  setStyle((s) => ({
                                    ...s,
                                    logoUrl: null,
                                    logoEnabled: false,
                                  }))
                                }
                                className="text-[11px] text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          {style.logoUrl && (
                            <div className="flex items-center gap-3 text-[11px] text-[color:var(--color-subtle)]">
                              <div className="h-10 w-10 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={style.logoUrl}
                                  alt="Logo preview"
                                  className="h-full w-full object-contain"
                                />
                              </div>
                              <p>
                                This logo is used in previews and PNG/SVG exports.
                              </p>
                            </div>
                          )}

                          <label className="flex items-center gap-2 text-[11px] text-[color:var(--color-subtle)]">
                            <input
                              type="checkbox"
                              className="h-3 w-3 rounded border border-[var(--color-border)]"
                              checked={style.logoBgTransparent}
                              onChange={(e) =>
                                setStyle((s) => ({
                                  ...s,
                                  logoBgTransparent: e.target.checked,
                                }))
                              }
                            />
                            Remove background dots behind logo
                          </label>
                        </>
                      )}
                    </section>

                    <p className="text-[11px] text-[color:var(--color-subtle)]">
                      You can also upload logos for existing codes in the list below – they’ll use the same rendering engine.
                    </p>
                  </div>
                )}
              </div>
            
              {/* NEW: Form footer CTA */}
              <div className="mt-6 flex flex-col gap-4 border-t border-[var(--color-border)] pt-3 md:flex-row md:items-center md:justify-between">
                <div className="text-xs text-[color:var(--color-subtle)]">
                  <div>Destination preview</div>
                  <div className="mt-1 break-all text-[11px] text-[color:var(--color-text)]">
                    {urlPreview || "—"}
                  </div>
                </div>

                <div className="flex flex-col items-stretch gap-1 md:items-end">
                  <Button
                    type="button"
                    disabled={creating}
                    onClick={form.handleSubmit(onSubmit)}
                    className="md:min-w-[220px] inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[var(--color-accent-soft)] transition disabled:opacity-60"
                  >
                    {creating ? (isEditing ? "Saving…" : "Creating…") : isEditing ? "Save changes" : "Create Kompi Code"}
                  </Button>
                </div>
              </div>

</CardContent>
          </Card>

          {/* RIGHT: Live preview */}
          <div className="sticky top-24">
            <Card className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
              <CardHeader className="border-b border-[var(--color-border)] pb-4">
                <CardTitle className="flex items-center justify-between text-sm font-semibold text-[color:var(--color-text)]">
                  <span>Live preview</span>
                  <span className="text-[11px] font-normal text-[color:var(--color-subtle)]">
                    Updates as you type
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 pt-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div
                    className={[
                      "inline-flex flex-col items-center justify-center rounded-3xl",
                      style.frameVariant === "none"
                        ? "border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
                        : "",
                      style.frameVariant === "label-bottom"
                        ? "border border-[var(--color-accent)] bg-[var(--color-surface)] px-5 py-4 shadow-sm"
                        : "",
                      style.frameVariant === "label-top"
                        ? "border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4"
                        : "",
                    ].join(" ")}
                  >
                    {style.frameVariant === "label-top" && (
                      <div className="mb-2 inline-flex items-center rounded-full bg-[var(--color-accent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black shadow-sm">
                        {style.frameLabel || "SCAN ME"}
                      </div>
                    )}

                    <div
                      className="rounded-2xl p-3"
                      style={{ backgroundColor: style.bg }}
                    >
                      <div className="relative inline-block">
                        <StyledQRCode
                          value={urlPreview || "https://kompi.app"}
                          size={style.size}
                          style={style}
                        />
                      </div>
                    </div>

                    {style.frameVariant === "label-bottom" && (
                      <div className="mt-2 inline-flex items-center rounded-full bg-[var(--color-accent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black shadow-sm">
                        {style.frameLabel || "SCAN ME"}
                      </div>
                    )}
                  </div>

                  <p className="max-w-xs text-center text-xs text-[color:var(--color-subtle)]">
                    Final PNG/SVG downloads use your workspace domain and
                    keep this styling.
                  </p>
                </div>
              
              {/* NEW: Form footer CTA */}
              <div className="mt-6 flex flex-col gap-4 border-t border-[var(--color-border)] pt-3 md:flex-row md:items-center md:justify-between">
                <div className="text-xs text-[color:var(--color-subtle)]">
                  <div>Destination preview</div>
                  <div className="mt-1 break-all text-[11px] text-[color:var(--color-text)]">
                    {urlPreview || "—"}
                  </div>
                </div>

                <div className="flex flex-col items-stretch gap-1 md:items-end">
                  <Button
                    type="button"
                    disabled={creating}
                    onClick={form.handleSubmit(onSubmit)}
                    className="md:min-w-[220px] inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-2.5 text-sm font-semibold text-[color:var(--color-text)] hover:bg-[var(--color-accent-soft)] transition disabled:opacity-60"
                  >
                    {creating ? (isEditing ? "Saving…" : "Creating…") : isEditing ? "Save changes" : "Create Kompi Code"}
                  </Button>
                </div>
              </div>

</CardContent>
            </Card>
          </div>
        </div>

      </section>

      {createdPreview && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-[color:var(--color-text)]">
                  Kompi Code created
                </h2>
                <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                  Your new code is ready to share, download, or print.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCreatedPreview(null)}
                className="text-xs text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="inline-flex flex-col items-center justify-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)] px-5 py-4">
                <div className="rounded-2xl bg-[var(--color-surface)] p-3">
                  <StyledQRCode
                    value={createdPreview.destination}
                    size={192}
                    style={getStyleForCode(createdPreview)}
                  />
                </div>
                <p className="mt-3 max-w-xs text-center text-xs text-[color:var(--color-subtle)]">
                  Scan this preview, or use the buttons below to share and
                  download.
                </p>
              </div>

              <div className="mt-3 w-full space-y-2">
                <div className="truncate text-center text-[11px] text-[color:var(--color-subtle)]">
                  {createdPreview.title || "New Kompi Code"} •{" "}
                  {createdPreview.destination}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    type="button"
                    className="rounded-full px-4 py-1.5 text-xs"
                    onClick={async () => {
                      try {
                        if (navigator.share) {
                          await navigator.share({
                            title:
                              createdPreview.title ||
                              "New Kompi Code",
                            url: createdPreview.destination,
                          });
                        } else if (
                          navigator.clipboard &&
                          navigator.clipboard.writeText
                        ) {
                          await navigator.clipboard.writeText(
                            createdPreview.destination,
                          );
                          alert("Link copied to clipboard");
                        }
                      } catch (err) {
                        console.error("Share failed", err);
                      }
                    }}
                  >
                    Share
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full px-4 py-1.5 text-xs"
                    onClick={() => {
                      const a =
                        document.createElement("a");
                      a.href = `/api/kr-codes/${createdPreview.id}/png`;
                      a.target = "_blank";
                      a.rel = "noopener noreferrer";
                      a.click();
                    }}
                  >
                    Download PNG
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full px-4 py-1.5 text-xs"
                    onClick={() => {
                      const a =
                        document.createElement("a");
                      a.href = `/api/kr-codes/${createdPreview.id}/svg`;
                      a.target = "_blank";
                      a.rel = "noopener noreferrer";
                      a.click();
                    }}
                  >
                    Download SVG
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    className="rounded-full px-4 py-1.5 text-xs"
                    onClick={() => setCreatedPreview(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
