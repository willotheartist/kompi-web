"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import QRCode from "react-qr-code";
import Link from "next/link";

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

  // Generic destination (what we actually send to the backend).
  destination: z.string().optional(),

  // “Smart” fields for non-URL types:
  smsNumber: z.string().optional(),
  smsMessage: z.string().optional(),

  emailAddress: z.string().optional(),
  emailSubject: z.string().optional(),
  emailBody: z.string().optional(),

  phoneNumber: z.string().optional(),

  plainText: z.string().optional(),

  // (In future we could add contact / vCard fields, etc.)

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
  frameVariant?: "none" | "label-bottom" | "label-top";
  frameLabel?: string;
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
    description: "Send people to any website, campaign or landing page.",
    icon: Globe2,
    utmSupported: true,
  },
  {
    id: "file",
    label: "File / PDF",
    description: "Link to a hosted PDF, menu, brochure, or media file.",
    icon: FileText,
    utmSupported: true,
  },
  {
    id: "social",
    label: "Social / Bio",
    description: "Drive people to a social profile or your Kompi bio page.",
    icon: UserCircle2,
    utmSupported: true,
  },
  {
    id: "app",
    label: "App / Store",
    description: "Send users to an app store or download URL.",
    icon: AppWindow,
    utmSupported: true,
  },
  {
    id: "sms",
    label: "SMS",
    description: "Open the SMS app with a prefilled message.",
    icon: MessageCircle,
    utmSupported: false,
  },
  {
    id: "email",
    label: "Email",
    description: "Open the default email client with subject and body.",
    icon: Mail,
    utmSupported: false,
  },
  {
    id: "phone",
    label: "Phone",
    description: "Start a phone call when the code is scanned.",
    icon: Phone,
    utmSupported: false,
  },
  {
    id: "text",
    label: "Plain text",
    description: "Show plain text (instructions, coupon codes, secrets).",
    icon: TypeIcon,
    utmSupported: false,
  },
  {
    id: "wifi",
    label: "Wi-Fi",
    description: "Let people join a Wi-Fi network without typing passwords.",
    icon: Wifi,
    utmSupported: false,
    disabled: true, // teaser
  },
  {
    id: "event",
    label: "Event",
    description: "Add an event (calendar) straight to someone’s device.",
    icon: Calendar,
    utmSupported: false,
    disabled: true,
  },
  {
    id: "location",
    label: "Location",
    description: "Open a location or coordinates in Maps.",
    icon: MapPin,
    utmSupported: false,
    disabled: true,
  },
  {
    id: "multi",
    label: "Multi-URL",
    description: "Different URLs for iOS, Android, desktop (coming soon).",
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
  // Backward compatibility for older codes that used "website", etc.
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
  frameVariant: "none" | "label-bottom" | "label-top";
  frameLabel: string;
};

const DEFAULT_STYLE: StyleState = {
  fg: "#FFFFFF",
  bg: "#020617",
  size: 192,
  margin: 2,
  ecLevel: "M",
  logoUrl: null,
  frameVariant: "none",
  frameLabel: "SCAN ME",
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
    default:
      return "https://...";
  }
}

// Build a human-readable label for error correction
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
      return "Balanced size & readability. Great default choice.";
    case "Q":
      return "More redundancy so damaged codes still scan.";
    case "H":
      return "Maximum protection when you place logos or busy colors.";
    default:
      return "";
  }
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
  const [designerOpen, setDesignerOpen] = useState(true);

  const [uploadingLogoFor, setUploadingLogoFor] =
    useState<string | null>(null);

  const [downloadMenuFor, setDownloadMenuFor] =
    useState<string | null>(null);
  const [deleteIntentFor, setDeleteIntentFor] =
    useState<string | null>(null);

  const [createdPreview, setCreatedPreview] =
    useState<KRCode | null>(null);

  const form = useForm<FormValues>({
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
    // For “URL-like” types: build URL with UTMs.
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
        // Not a full URL – just return raw value.
        return destination;
      }
    }

    // SMS
    if (contentType === "sms") {
      if (!smsNumber) return "";
      const base = `sms:${smsNumber}`;
      if (!smsMessage) return base;
      const encoded = encodeURIComponent(smsMessage);
      return `${base}?&body=${encoded}`;
    }

    // Email
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

    // Phone
    if (contentType === "phone") {
      if (!phoneNumber) return "";
      return `tel:${phoneNumber}`;
    }

    // Plain text
    if (contentType === "text") {
      return plainText || "";
    }

    // Fallback
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

  function buildDestinationForSubmit(values: FormValues): string | null {
    // URL-like
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
        // Allow non-URL values too – just raw string
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

    // fallback
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
      style: {
        fg: style.fg,
        bg: style.bg,
        size: style.size,
        margin: style.margin,
        ecLevel: style.ecLevel,
        logoUrl: style.logoUrl ?? null,
        frameVariant: style.frameVariant,
        frameLabel: style.frameLabel,
      },
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

  // Prefill the create form from an existing KR Code (lightweight "edit" flow").
  function handleEdit(code: KRCode) {
    form.reset({
      title: code.title ?? "",
      destination: code.destination,
      smsNumber: "",
      smsMessage: "",
      emailAddress: "",
      emailSubject: "",
      emailBody: "",
      phoneNumber: "",
      plainText: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    });

    const styleFromCode = code.style;
    if (styleFromCode) {
      const {
        fg,
        bg,
        size,
        margin,
        ecLevel,
        logoUrl,
        frameVariant,
        frameLabel,
      } = styleFromCode as KRCodeStyle;
      setStyle((prev) => ({
        fg: (fg as string) || prev.fg,
        bg: (bg as string) || prev.bg,
        size: (size as number) || prev.size,
        margin: (margin as number) || prev.margin,
        ecLevel:
          (ecLevel as StyleState["ecLevel"]) || prev.ecLevel,
        logoUrl:
          (logoUrl as string | null | undefined) ??
          prev.logoUrl ??
          null,
        frameVariant:
          (frameVariant as StyleState["frameVariant"]) ??
          prev.frameVariant,
        frameLabel:
          (frameLabel as string | undefined) ??
          prev.frameLabel,
      }));
    }

    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Delete KR Code and remove from list (called only after branded confirm).
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

  return (
    <main className="wf-dashboard-main w-full bg-[var(--color-bg)]">
      <section className="wf-dashboard-content mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-6 md:gap-8 md:pb-12">
        {/* Page header – more luxe */}
        <header className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--color-text)] md:text-4xl">
              Create a new{" "}
              <span className="font-serif italic">Kompi Code</span>
            </h1>
            <p className="max-w-xl text-base text-[color:var(--color-subtle)]">
              One QR code for menus, posters, stickers and more. Pick an
              action, style it to your brand, and download in print-ready
              formats.
            </p>
          </div>
          <div className="inline-flex min-w-[240px] flex-col gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 text-right shadow-sm">
            <span className="inline-flex h-1.5 w-1.5 self-end rounded-full bg-[var(--color-accent)]" />
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--color-subtle)]">
              Workspace activity
            </p>
            <div className="mt-1 flex items-baseline justify-end gap-4 text-[color:var(--color-text)]">
              <div className="text-left">
                <p className="text-[11px] text-[color:var(--color-subtle)]">
                  Codes
                </p>
                <p className="text-lg font-semibold leading-tight">
                  {codes.length}
                </p>
              </div>
              <span className="h-7 w-px bg-[var(--color-border)]" />
              <div className="text-left">
                <p className="text-[11px] text-[color:var(--color-subtle)]">
                  Total scans
                </p>
                <p className="text-lg font-semibold leading-tight">
                  {totalScans}
                </p>
              </div>
            </div>
            <p className="mt-1 text-[11px] text-[color:var(--color-subtle)]">
              All scans route through Kompi for full analytics.
            </p>
          </div>
        </header>

        {qrLimitError && (
          <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-xs md:flex-row md:items-center md:justify-between md:text-sm">
            <div>
              <p className="font-medium text-[color:var(--color-text)]">
                {qrLimitError}
              </p>
              <p className="mt-1 text-[color:var(--color-subtle)]">
                Upgrade to the Creator plan to unlock more Kompi Codes in
                this workspace.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                className="rounded-full px-4 py-1.5 text-xs font-semibold"
              >
                <Link href="/dashboard/settings/billing">
                  Upgrade to Creator
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full px-4 py-1.5 text-xs"
                onClick={() => setQrLimitError(null)}
              >
                Not now
              </Button>
            </div>
          </div>
        )}

        {/* Row 1: create + preview */}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1.05fr)]">
          {/* LEFT: create + design */}
          <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
            <CardHeader className="border-b border-[var(--color-border)] pb-4">
              <CardTitle className="flex items-center justify-between text-sm font-semibold text-[color:var(--color-text)]">
                <span>Code details</span>
                <span className="text-[11px] font-normal text-[color:var(--color-subtle)]">
                  1. Choose type • 2. Set destination • 3. Design
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
              {/* Hover banner */}
              <div className="rounded-xl bg-[var(--color-bg)] px-4 py-2 text-[11px] text-[color:var(--color-subtle)]">
                {activeType.description}
              </div>

              {/* Type selector – more "tile" like */}
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {CONTENT_TYPES.map((t) => {
                  const isActive = t.id === contentType;
                  const Icon = t.icon;
                  const disabled =
                    "disabled" in t && t.disabled;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      disabled={disabled}
                      onClick={() =>
                        !disabled && setContentType(t.id)
                      }
                      onMouseEnter={() =>
                        !disabled && setHoverType(t.id)
                      }
                      onMouseLeave={() =>
                        !disabled && setHoverType(null)
                      }
                      className={[
                        "flex items-center gap-2 rounded-2xl border px-3 py-2 text-left text-[11px] transition",
                        disabled
                          ? "cursor-not-allowed border-dashed border-[var(--color-border)] bg-[var(--color-bg)] text-[color:var(--color-subtle)]/60"
                          : isActive
                          ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[color:var(--color-text)] shadow-sm"
                          : "border-[var(--color-border)] bg-[var(--color-bg)] text-[color:var(--color-subtle)] hover:border-[var(--color-accent)] hover:text-[color:var(--color-text)]",
                      ].join(" ")}
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--color-surface)]">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <div className="flex-1 space-y-0.5">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                          {t.label}
                        </div>
                        <div className="line-clamp-2 text-[10px] text-[color:var(--color-subtle)]">
                          {t.description}
                        </div>
                      </div>
                      {disabled && (
                        <span className="ml-0.5 rounded-full bg-[var(--color-bg)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]">
                          Soon
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

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
                    className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                    placeholder="Spring campaign flyer"
                    {...form.register("title")}
                  />
                </div>

                {/* Dynamic content fields */}
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
                          Destination URL
                        </label>
                        <Input
                          className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
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
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                            placeholder="+44 7700 900000"
                            {...form.register("smsNumber")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[color:var(--color-text)]">
                            Message
                          </label>
                          <Input
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
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
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
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
                              className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                              placeholder="Kompi campaign enquiry"
                              {...form.register("emailSubject")}
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[color:var(--color-text)]">
                              Body (optional)
                            </label>
                            <Input
                              className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
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
                          className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
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
                          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                          placeholder="Show a coupon code, instructions, or any short text…"
                          {...form.register("plainText")}
                        />
                      </div>
                    );
                  }

                  // Fallback if we add more types later.
                  return (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[color:var(--color-text)]">
                        Destination / payload
                      </label>
                      <Input
                        className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                        placeholder="This is what your QR encodes…"
                        {...form.register("destination")}
                      />
                    </div>
                  );
                })()}

                {/* Advanced tracking – UTM card */}
                {utmSupported && (
                  <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-4">
                    <div className="mb-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)]">
                          <Target className="h-4 w-4 text-[color:var(--color-text)]" />
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-[color:var(--color-text)]">
                            Advanced tracking (UTM)
                          </p>
                          <p className="text-xs text-[color:var(--color-subtle)]">
                            Append campaign parameters so you know which
                            posters, menus or campaigns drive scans.
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
                        {showUtms ? "UTM enabled" : "Enable UTM"}
                      </button>
                    </div>

                    {showUtms ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <label className="text-xs text-[color:var(--color-text)]">
                            UTM source
                          </label>
                          <Input
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                            placeholder="poster, newsletter"
                            {...form.register("utm_source")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-[color:var(--color-text)]">
                            UTM medium
                          </label>
                          <Input
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                            placeholder="qr, print"
                            {...form.register("utm_medium")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-[color:var(--color-text)]">
                            UTM campaign
                          </label>
                          <Input
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                            placeholder="spring_launch"
                            {...form.register("utm_campaign")}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-[color:var(--color-text)]">
                            UTM term (optional)
                          </label>
                          <Input
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                            placeholder="headline_a"
                            {...form.register("utm_term")}
                          />
                        </div>
                        <div className="space-y-1.5 md:col-span-2">
                          <label className="text-xs text-[color:var(--color-text)]">
                            UTM content (optional)
                          </label>
                          <Textarea
                            rows={2}
                            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                            placeholder="banner_variant_a"
                            {...form.register("utm_content")}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-[color:var(--color-subtle)]">
                        Turn this on to track exactly which offline touchpoints
                        are working.
                      </p>
                    )}
                  </div>
                )}

                {/* Form footer */}
                <div className="flex flex-col gap-4 border-t border-[var(--color-border)] pt-3 md:flex-row md:items-center md:justify-between">
                  <div className="text-xs text-[color:var(--color-subtle)]">
                    <div>Destination preview:</div>
                    <div className="mt-1 break-all text-[11px] text-[color:var(--color-text)]">
                      {urlPreview || "—"}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={creating}
                    className="md:min-w-[180px] rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[color:var(--color-text)] shadow-sm hover:shadow-md disabled:opacity-70"
                  >
                    {creating ? "Creating…" : "Create Kompi Code"}
                  </Button>
                </div>

                {(formError || error) && (
                  <p className="pt-1 text-xs text-red-400">
                    {formError || error}
                  </p>
                )}
              </form>

              {/* Divider between form and design controls */}
              <div className="h-px w-full bg-[var(--color-border)]" />

              {/* Design & frame – collapsible */}
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
                        Design &amp; frame
                      </p>
                      <p className="text-xs text-[color:var(--color-subtle)]">
                        Color presets, error correction and frames – keep
                        everything on-brand.
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
                  <div className="mt-4 space-y-4">
                    {/* Presets */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          Color presets
                        </label>
                        <span className="text-[10px] text-[color:var(--color-subtle)]">
                          Start from a theme, then tweak.
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

                    {/* Foreground / background pickers */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          Foreground (dots)
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
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)]"
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
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)]"
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

                    {/* Frame controls */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <label className="text-xs font-medium text-[color:var(--color-text)]">
                          Frame style
                        </label>
                        <span className="text-[10px] text-[color:var(--color-subtle)]">
                          Make your code feel like a sticker on posters or
                          tables.
                        </span>
                      </div>

                      {/* Frame variants as big tiles */}
                      <div className="grid gap-2 sm:grid-cols-3">
                        {[
                          {
                            id: "none",
                            label: "Minimal",
                            description: "Just the code, no frame.",
                          },
                          {
                            id: "label-bottom",
                            label: "Sticker",
                            description:
                              "Rounded sticker with label under the code.",
                          },
                          {
                            id: "label-top",
                            label: "Banner",
                            description:
                              "Headline above the code – great for posters.",
                          },
                        ].map((f) => {
                          const isActive =
                            style.frameVariant ===
                            (f.id as StyleState["frameVariant"]);

                          return (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() =>
                                setStyle((s) => ({
                                  ...s,
                                  frameVariant:
                                    f.id as StyleState["frameVariant"],
                                }))
                              }
                              className={[
                                "flex flex-col gap-1 rounded-2xl border px-3 py-2 text-left text-[11px] transition",
                                isActive
                                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[color:var(--color-text)] shadow-sm"
                                  : "border-[var(--color-border)] text-[color:var(--color-subtle)] hover:border-[var(--color-accent)] hover:text-[color:var(--color-text)]",
                              ].join(" ")}
                            >
                              {/* Tiny frame preview */}
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

                      {/* Label controls only when frame is active */}
                      {style.frameVariant !== "none" && (
                        <div className="space-y-2">
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <label className="text-xs font-medium text-[color:var(--color-text)]">
                              Frame label
                            </label>
                            <span className="text-[10px] text-[color:var(--color-subtle)]">
                              Short, action-oriented copy works best.
                            </span>
                          </div>

                          <Input
                            className="h-9 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[color:var(--color-text)] placeholder:text-[color:var(--color-subtle)]"
                            value={style.frameLabel}
                            onChange={(e) =>
                              setStyle((s) => ({
                                ...s,
                                frameLabel: e.target.value,
                              }))
                            }
                            placeholder="SCAN ME"
                          />

                          {/* Quick presets */}
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

                    <p className="text-[11px] text-[color:var(--color-subtle)]">
                      Logo upload and advanced shapes will plug into this same
                      designer later – no new workflow to learn.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: preview only (sticky) */}
          <div className="sticky top-24">
            <Card className="flex h-full flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
              <CardHeader className="border-b border-[var(--color-border)] pb-4">
                <CardTitle className="flex items-center justify-between text-sm font-semibold text-[color:var(--color-text)]">
                  <span>Live Preview</span>
                  <span className="text-[11px] font-normal text-[color:var(--color-subtle)]">
                    Updates as you type
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 pt-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  {/* Frame + QR */}
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
                        <QRCode
                          value={urlPreview || "https://kompi.app"}
                          size={style.size}
                          fgColor={style.fg}
                          bgColor={style.bg}
                          level={
                            style.logoUrl ? "H" : style.ecLevel
                          }
                        />
                        {style.logoUrl && (
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                            <div
                              className="flex items-center justify-center rounded-md bg-white/90"
                              style={{
                                width: style.size * 0.22,
                                height: style.size * 0.22,
                              }}
                            >
                              <img
                                src={style.logoUrl}
                                alt="Logo"
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {style.frameVariant === "label-bottom" && (
                      <div className="mt-2 inline-flex items-center rounded-full bg-[var(--color-accent)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-black shadow-sm">
                        {style.frameLabel || "SCAN ME"}
                      </div>
                    )}
                  </div>

                  <p className="max-w-xs text-center text-xs text-[color:var(--color-subtle)]">
                    This is a preview of your Kompi Code. The final printed
                    code will use your workspace’s domain and redirect
                    through Kompi for full analytics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Row 2: full-width "Your KR Codes" */}
        <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-2 border-b border-[var(--color-border)] pb-4">
            <div>
              <CardTitle className="text-sm font-semibold text-[color:var(--color-text)]">
                Your Kompi Codes
              </CardTitle>
              <p className="mt-1 text-xs text-[color:var(--color-subtle)]">
                {workspace
                  ? `Workspace: ${workspace.name}`
                  : "No workspace yet — we’ll create one when you generate your first code."}
              </p>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3"
                  >
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-40 rounded-full" />
                      <Skeleton className="h-3 w-64 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : codes.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center text-sm text-[color:var(--color-subtle)]">
                No Kompi Codes yet. Create your first one above to
                start tracking scans.
              </div>
            ) : (
              <div className="space-y-3">
                {codes.map((code) => {
                  const isMenuOpen =
                    downloadMenuFor === code.id;
                  const isDeleteOpen =
                    deleteIntentFor === code.id;
                  return (
                    <div
                      key={code.id}
                      className="flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3 md:flex-row md:items-center md:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="hidden rounded-xl bg-[var(--color-surface)] p-2 md:block">
                          <div className="relative inline-block">
                            {(() => {
                              const styleFromCode =
                                (code.style ??
                                  {}) as KRCodeStyle;
                              const hasLogo =
                                !!(styleFromCode.logoUrl as
                                  | string
                                  | null
                                  | undefined);
                              const ecLevel =
                                (hasLogo
                                  ? "H"
                                  : styleFromCode.ecLevel) ??
                                "M";
                              return (
                                <QRCode
                                  value={code.destination}
                                  size={56}
                                  fgColor={
                                    styleFromCode.fg ??
                                    "#FFFFFF"
                                  }
                                  bgColor={
                                    styleFromCode.bg ??
                                    "#020617"
                                  }
                                  level={
                                    ecLevel as
                                      | "L"
                                      | "M"
                                      | "Q"
                                      | "H"
                                  }
                                />
                              );
                            })()}
                            {(() => {
                              const styleFromCode =
                                (code.style ??
                                  {}) as KRCodeStyle;
                              const logo =
                                styleFromCode.logoUrl as
                                  | string
                                  | null
                                  | undefined;
                              if (!logo) return null;
                              return (
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                  <div
                                    className="flex items-center justify-center rounded-sm bg-white/90"
                                    style={{
                                      width: 56 * 0.2,
                                      height: 56 * 0.2,
                                    }}
                                  >
                                    <img
                                      src={logo}
                                      alt="Logo"
                                      className="max-h-full max-w-full object-contain"
                                    />
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-[color:var(--color-text)]">
                            {code.title ||
                              "Untitled Kompi Code"}
                          </div>
                          <div className="break-all text-[11px] text-[color:var(--color-subtle)]">
                            {code.destination}
                          </div>
                          <div className="text-[11px] text-[color:var(--color-subtle)]">
                            {code.type
                              ? `Type: ${labelForContentType(code.type)} • `
                              : ""}
                            Created{" "}
                            {new Date(
                              code.createdAt,
                            ).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs">
                        <div className="flex flex-col items-end">
                          <span className="text-[color:var(--color-subtle)]">
                            Total scans
                          </span>
                          <span className="text-base font-semibold text-[color:var(--color-text)]">
                            {code.totalClicks ?? 0}
                          </span>
                        </div>

                        {/* Actions: Edit / Delete / Download + inline confirm */}
                        <div className="relative flex items-center gap-1.5">
                          {/* Edit icon button */}
                          <button
                            type="button"
                            onClick={() => handleEdit(code)}
                            aria-label="Edit Kompi Code"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>

                          {/* Logo upload */}
                          <div className="relative ml-1">
                            <input
                              id={`logo-upload-${code.id}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file =
                                  e.target.files?.[0];
                                if (!file) return;
                                setUploadingLogoFor(
                                  code.id,
                                );
                                try {
                                  const fd = new FormData();
                                  fd.append("file", file);
                                  const res =
                                    await fetch(
                                      `/api/kr-codes/${code.id}/logo`,
                                      {
                                        method: "POST",
                                        body: fd,
                                        credentials:
                                          "include",
                                      },
                                    );
                                  if (!res.ok) {
                                    console.error(
                                      "Logo upload failed",
                                      await res.text(),
                                    );
                                  } else {
                                    const json =
                                      await res.json();
                                    setStyle((s) => ({
                                      ...s,
                                      logoUrl:
                                        json.logoUrl as string,
                                    }));
                                    setCodes((prev) =>
                                      prev.map((c) =>
                                        c.id === code.id
                                          ? {
                                              ...c,
                                              style: {
                                                ...(c.style ??
                                                  {}),
                                                logoUrl:
                                                  json.logoUrl,
                                                ecLevel:
                                                  "H",
                                              },
                                            }
                                          : c,
                                      ),
                                    );
                                  }
                                } catch (err) {
                                  console.error(
                                    "Logo upload error",
                                    err,
                                  );
                                } finally {
                                  setUploadingLogoFor(
                                    (current) =>
                                      current ===
                                      code.id
                                        ? null
                                        : current,
                                  );
                                  e.target.value = "";
                                }
                              }}
                            />
                            <label
                              htmlFor={`logo-upload-${code.id}`}
                              className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] font-medium text-[color:var(--color-text)] hover:bg-[var(--color-bg)] cursor-pointer"
                            >
                              {uploadingLogoFor === code.id
                                ? "Uploading…"
                                : "Upload logo"}
                            </label>
                          </div>

                          {/* Delete icon button (opens confirm) */}
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteIntentFor(
                                (current) =>
                                  current === code.id
                                    ? null
                                    : code.id,
                              )
                            }
                            aria-label="Delete Kompi Code"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-red-500 hover:bg-[var(--color-bg)]"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>

                          <Link
                            href={`/kr-codes/${code.id}`}
                            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[11px] font-medium text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                          >
                            Analytics
                          </Link>

                          {/* Download button + popover */}
                          <div className="relative ml-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-xs text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                              onClick={() =>
                                setDownloadMenuFor(
                                  (current) =>
                                    current ===
                                    code.id
                                      ? null
                                      : code.id,
                                )
                              }
                            >
                              Download
                            </Button>

                            {isMenuOpen && (
                              <div
                                className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1 shadow-md"
                                onMouseLeave={() =>
                                  setDownloadMenuFor(
                                    null,
                                  )
                                }
                              >
                                <Link
                                  href={`/api/kr-codes/${code.id}/svg`}
                                  target="_blank"
                                  className="block rounded-xl px-3 py-2 text-[11px] text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                                  onClick={() =>
                                    setDownloadMenuFor(
                                      null,
                                    )
                                  }
                                >
                                  Download SVG
                                </Link>
                                <Link
                                  href={`/api/kr-codes/${code.id}/png`}
                                  target="_blank"
                                  className="block rounded-xl px-3 py-2 text-[11px] text-[color:var(--color-text)] hover:bg-[var(--color-bg)]"
                                  onClick={() =>
                                    setDownloadMenuFor(
                                      null,
                                    )
                                  }
                                >
                                  Download PNG
                                </Link>
                              </div>
                            )}
                          </div>

                          {/* Inline delete confirmation popover */}
                          {isDeleteOpen && (
                            <div className="absolute right-0 top-full z-20 mt-2 w-60 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 shadow-md">
                              <p className="text-xs font-medium text-[color:var(--color-text)]">
                                Delete this{" "}
                                <span
                                  style={{
                                    fontFamily:
                                      "Instrument Serif, system-ui, serif",
                                    fontStyle:
                                      "italic",
                                  }}
                                >
                                  code
                                </span>
                                ?
                              </p>
                              <p className="mt-1 text-[11px] text-[color:var(--color-subtle)]">
                                This action can’t be
                                undone and will stop
                                tracking scans from
                                this Kompi Code.
                              </p>
                              <div className="mt-3 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(code)
                                  }
                                  className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--color-text)] px-3 py-1.5 text-xs font-semibold text-[var(--color-bg)] hover:opacity-90"
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setDeleteIntentFor(
                                      null,
                                    )
                                  }
                                  className="inline-flex flex-1 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-text)] hover:bg-[var(--color-surface)]"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
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
                  <QRCode
                    value={createdPreview.destination}
                    size={192}
                    fgColor="#020617"
                    bgColor="#FFFFFF"
                    level="M"
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
