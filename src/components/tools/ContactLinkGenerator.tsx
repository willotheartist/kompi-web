// src/components/tools/ContactLinkGenerator.tsx
"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type Mode = "whatsapp" | "phone" | "sms";

interface ContactLinkGeneratorProps {
  /** layout style (public landing vs compact widget) */
  variant?: "public" | "compact";
  /** behaviour: public SEO page vs logged-in dashboard */
  context?: "public" | "dashboard";
}

const COUNTRIES = [
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
];

function formatDigits(raw: string) {
  return raw.replace(/[^\d]/g, "");
}

function getCountryByDial(dial: string) {
  return COUNTRIES.find((c) => c.dial === dial) ?? COUNTRIES[0];
}

export default function ContactLinkGenerator({
  variant = "public",
  context = "public",
}: ContactLinkGeneratorProps) {
  const [mode, setMode] = useState<Mode>("whatsapp");
  const [countryDial, setCountryDial] = useState("+44");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [message, setMessage] = useState(
    "Hi! I found you via Kompi and would love to get in touch."
  );
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // NEW: dashboard-specific state
  const [saving, setSaving] = useState(false);
  const [savedShortUrl, setSavedShortUrl] = useState<string | null>(null);

  const isDashboard = context === "dashboard";

  const selectedCountry = getCountryByDial(countryDial);

  const fullPhone = useMemo(() => {
    const dialDigits = formatDigits(countryDial);
    const localDigits = formatDigits(phoneLocal);
    if (!dialDigits || !localDigits) return "";
    return `+${dialDigits}${localDigits}`;
  }, [countryDial, phoneLocal]);

  const link = useMemo(() => {
    if (!fullPhone) return "";

    if (mode === "phone") {
      return `tel:${fullPhone}`;
    }

    if (mode === "sms") {
      const params = new URLSearchParams();
      if (message.trim()) params.set("body", message.trim());
      const query = params.toString();
      return query ? `sms:${fullPhone}?${query}` : `sms:${fullPhone}`;
    }

    // WhatsApp
    const digitsOnly = formatDigits(fullPhone);
    const params = new URLSearchParams();
    if (message.trim()) params.set("text", message.trim());
    const query = params.toString();
    return query
      ? `https://wa.me/${digitsOnly}?${query}`
      : `https://wa.me/${digitsOnly}`;
  }, [mode, fullPhone, message]);

  // Base short link (wa.me / tel / sms)
  const displayShortLink = useMemo(() => {
    if (!link) return "";
    if (mode === "whatsapp") {
      try {
        const url = new URL(link);
        const path = url.pathname.replace(/^\//, "");
        return `wa.me/${path}`;
      } catch {
        return link.replace(/^https?:\/\//, "");
      }
    }
    return link.replace(/^https?:\/\//, "");
  }, [link, mode]);

  // NEW: if we have a stored Kompi short URL in dashboard, prefer that
  const uiShortLink = isDashboard
    ? savedShortUrl ?? displayShortLink
    : displayShortLink;

  async function handleCopy() {
    if (!link) return;
    const textToCopy = isDashboard && uiShortLink ? uiShortLink : link;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  async function handleGenerateClick() {
    if (!link) return;

    // Public SEO version: just open the modal like before
    if (!isDashboard) {
      setShowModal(true);
      setCopied(false);
      return;
    }

    // Dashboard: store as a Kompi link first
    setShowModal(true);
    setCopied(false);
    setSaving(true);
    setSavedShortUrl(null);

    try {
      const res = await fetch("/api/tools/contact-links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetUrl: link,
          title: null,
          sourceTool: "whatsapp-link-generator",
          config: {
            mode,
            countryDial,
            hasMessage: !!message.trim(),
          },
        }),
      });

      if (res.ok) {
        const data: {
          id: string;
          code: string | null;
          shortUrl: string | null;
          targetUrl: string;
        } = await res.json();

        if (data.shortUrl) {
          setSavedShortUrl(data.shortUrl);
        }
      } else {
        console.error("Failed to store contact link", await res.text());
      }
    } catch (err) {
      console.error("CONTACT_LINK_SAVE_ERROR", err);
    } finally {
      setSaving(false);
    }
  }

  const showMessageField = mode === "whatsapp" || mode === "sms";

  const previewMessage =
    message.trim() || "Hi! I found you via Kompi and would love to get in touch.";

  // Reset stored short URL when inputs change (new link)
  useEffect(() => {
    setSavedShortUrl(null);
  }, [mode, fullPhone, message]);

  const body = (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex flex-wrap items-center gap-2 rounded-full bg-[#F7F7F3] p-1">
        <button
          type="button"
          onClick={() => setMode("whatsapp")}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-medium sm:text-sm ${
            mode === "whatsapp"
              ? "bg-[#1E2330] text-[#F7F7F3]"
              : "text-[#4B5563]"
          }`}
        >
          WhatsApp link
        </button>
        <button
          type="button"
          onClick={() => setMode("phone")}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-medium sm:text-sm ${
            mode === "phone"
              ? "bg-[#1E2330] text-[#F7F7F3]"
              : "text-[#4B5563]"
          }`}
        >
          Phone call link
        </button>
        <button
          type="button"
          onClick={() => setMode("sms")}
          className={`flex-1 rounded-full px-3 py-2 text-xs font-medium sm:text-sm ${
            mode === "sms"
              ? "bg-[#1E2330] text-[#F7F7F3]"
              : "text-[#4B5563]"
          }`}
        >
          SMS link
        </button>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-start">
        {/* Left – form */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#4B5563] sm:text-sm">
              Type your phone number
            </label>
            <div className="flex gap-2">
              <Select
                value={countryDial}
                onValueChange={(value) => setCountryDial(value)}
              >
                <SelectTrigger className="w-40 bg-white text-sm">
                  <SelectValue>
                    <span className="inline-flex items-center gap-1">
                      <span>{selectedCountry.flag}</span>
                      <span className="text-xs font-medium text-[#111827]">
                        {selectedCountry.dial}
                      </span>
                    </span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-64">
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.dial}>
                      <span className="inline-flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span className="text-xs">
                          {c.name} ({c.dial})
                        </span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="7700 900000"
                value={phoneLocal}
                onChange={(e) => setPhoneLocal(e.target.value)}
                className="bg-white text-sm"
              />
            </div>
            <p className="text-[11px] text-[#9CA3AF] sm:text-xs">
              Remember to check your country code and remove any leading 0.
            </p>
          </div>

          {showMessageField && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#4B5563] sm:text-sm">
                Custom message (optional)
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="bg-[#F7F7F3] text-sm"
              />
              <p className="text-[11px] text-[#9CA3AF] sm:text-xs">
                Example: “Hi, I want more info about your product.”
              </p>
            </div>
          )}

          {/* Single CTA row */}
          <div className="pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                type="button"
                onClick={handleGenerateClick}
                disabled={!link || (isDashboard && saving)}
                className="rounded-full bg-[#1E2330] px-5 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black"
              >
                {isDashboard && saving
                  ? "Saving link..."
                  : "Generate link & QR"}
              </Button>
              {link && mode === "whatsapp" && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-[#006B81] underline-offset-2 hover:underline"
                >
                  Preview in WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right – WhatsApp-style preview */}
        <div className="hidden h-full w-full md:block">
          <div className="mx-auto max-w-sm rounded-[2rem] border border-[#E5E7EB] bg-white shadow-sm">
            <div className="flex items-center gap-2 rounded-t-[2rem] bg-[#F3F4F6] px-4 py-3">
              <div className="h-7 w-7 rounded-full bg-[#D1D5DB]" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-[#111827]">
                  {fullPhone || "+44 7700 900000"}
                </span>
                <span className="text-[11px] text-[#6B7280]">
                  WhatsApp preview
                </span>
              </div>
            </div>
            <div className="flex min-h-[220px] flex-col justify-end gap-2 bg-[#F5F5F4] px-4 pb-4 pt-3">
              <div className="self-end rounded-2xl bg-[#DCF8C6] px-3 py-2 text-xs text-[#111827] shadow-sm">
                {previewMessage}
              </div>
              <div className="mt-3 h-8 rounded-full bg-white/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const wrapped =
    variant === "compact" ? (
      body
    ) : (
      <Card className="border-none bg-transparent shadow-none">
        <CardContent className="p-0">{body}</CardContent>
      </Card>
    );

  const signupHref = link
    ? `/signup?intent=whatsapp-qr&target=${encodeURIComponent(link)}`
    : "/signup";

  return (
    <>
      {wrapped}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md rounded-[2.5rem] bg-white p-0">
          <div className="max-h-[90vh] overflow-y-auto px-6 py-8 sm:px-8 sm:py-10">
            <DialogHeader className="space-y-2 text-center">
              <DialogTitle className="text-2xl font-semibold leading-snug text-[#0F3D33] sm:text-3xl">
                Here&apos;s your WhatsApp
                <br />
                short link.
              </DialogTitle>
              <DialogDescription className="text-sm text-[#6B7280]">
                {isDashboard
                  ? "This link is ready to share from your Kompi workspace."
                  : "Copy &amp; share it anywhere you want to be contacted."}
              </DialogDescription>
            </DialogHeader>

            {/* Short link row */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-xl">
                <span role="img" aria-label="WhatsApp">
                  💬
                </span>
              </div>
              <div className="text-xl font-semibold tracking-tight text-[#111827] sm:text-2xl">
                {uiShortLink || "wa.me/44706"}
              </div>
            </div>

            {/* Kompi PRO upsell – keep for public; hide in dashboard */}
            {!isDashboard && (
              <div className="mt-8 rounded-[1.75rem] bg-[#F5F5FF] px-5 py-5 sm:px-6 sm:py-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#6366F1] via-[#A855F7] to-[#38BDF8] text-white">
                    ⚡
                  </div>
                  <div className="text-sm font-semibold text-[#111827] sm:text-base">
                    Upgrade to Kompi PRO
                  </div>
                </div>

                <ul className="space-y-1.5 text-sm text-[#111827]">
                  <li>🔥 Get Branded links</li>
                  <li>🔥 Edit phone, message and URL</li>
                  <li>🔥 Analytics of clicks per day, hour, country etc..</li>
                  <li>
                    🔥 Access to All Kompi Pro Features including KR, KCard,
                    Link-in-Bio, Link Shortener and many more.
                  </li>
                </ul>

                <Link
                  href="/pricing"
                  className="mt-5 inline-flex w-full items-center justify-between rounded-full bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#38BDF8] px-6 py-3 text-sm font-semibold text-white shadow-sm"
                >
                  <span>Upgrade to Kompi PRO</span>
                  <span className="text-[11px] font-normal">
                    – Unlock New Features Now.
                  </span>
                </Link>
              </div>
            )}

            {/* QR section – square icon + text */}
            <div className="mt-8 flex items-start gap-5 sm:gap-7">
              {/* Square QR icon */}
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-transparent text-[#111827]">
                <div className="grid grid-cols-3 gap-2">
                  {/* row 1 */}
                  <div className="h-6 w-6 rounded-2xl border-[5px] border-[#111827]" />
                  <div className="h-6 w-6 rounded-full bg-[#111827]" />
                  <div className="h-6 w-6 rounded-2xl border-[5px] border-[#111827]" />
                  {/* row 2 */}
                  <div className="h-6 w-6 rounded-full bg-[#111827]" />
                  <div className="h-6 w-6 rounded-full bg-[#111827]/10" />
                  <div className="h-6 w-6 rounded-full bg-[#111827]" />
                  {/* row 3 */}
                  <div className="h-6 w-6 rounded-2xl border-[5px] border-[#111827]" />
                  <div className="h-6 w-6 rounded-full bg-[#111827]" />
                  <div className="h-6 w-6 rounded-2xl border-[5px] border-[#111827]" />
                </div>
              </div>

              <div className="space-y-2 text-left text-sm text-[#4B5563]">
                <p className="text-lg font-semibold text-[#0F3D33]">
                  Turn your link into
                  <br />
                  a QR Code.
                </p>
                <p className="leading-relaxed">
                  Create a Kompi QR, then customise colours, logo and style in
                  the editor. Perfect for menus, posters, business cards and
                  more.
                </p>
              </div>
            </div>

            {/* Bottom buttons */}
            <div className="mt-10 mb-1 flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={handleCopy}
                disabled={!link || (isDashboard && saving)}
                className="h-14 flex-1 rounded-full bg-[#111827] text-sm font-semibold text-white hover:bg-black"
              >
                {copied ? "Copied!" : "Copy Link"}
              </Button>
              <Link
                href={signupHref}
                className="h-14 flex-1 rounded-full border border-[#111827] bg-[#F5F5F5] text-center text-sm font-semibold leading-[3.5rem] text-[#111827] hover:bg-[#E5E7EB]"
              >
                Create QR Code
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
