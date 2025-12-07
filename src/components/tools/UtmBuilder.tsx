// src/components/tools/UtmBuilder.tsx
"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";

type UtmBuilderVariant = "public" | "dashboard";

interface UtmBuilderProps {
  variant?: UtmBuilderVariant;
}

type UtmParams = {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
};

function normaliseBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";

  // Add protocol if missing
  if (!/^https?:\/\//i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

function buildUtmUrl(baseUrl: string, params: UtmParams): string {
  const normalised = normaliseBaseUrl(baseUrl);
  if (!normalised) return "";

  const url = new URL(normalised);

  const insertParam = (key: string, value: string) => {
    if (!value.trim()) return;
    url.searchParams.set(key, value.trim());
  };

  insertParam("utm_source", params.source);
  insertParam("utm_medium", params.medium);
  insertParam("utm_campaign", params.campaign);
  insertParam("utm_term", params.term);
  insertParam("utm_content", params.content);

  return url.toString();
}

export function UtmBuilder({ variant = "public" }: UtmBuilderProps) {
  const [baseUrl, setBaseUrl] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");
  const [copied, setCopied] = useState(false);

  const hasAnyParam =
    utmSource || utmMedium || utmCampaign || utmTerm || utmContent;

  const resultUrl = useMemo(
    () =>
      hasAnyParam
        ? buildUtmUrl(baseUrl, {
            source: utmSource,
            medium: utmMedium,
            campaign: utmCampaign,
            term: utmTerm,
            content: utmContent,
          })
        : "",
    [baseUrl, hasAnyParam, utmSource, utmMedium, utmCampaign, utmTerm, utmContent]
  );

  function handleCopy() {
    if (!resultUrl) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(resultUrl).catch(() => {
        // ignore
      });
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const wrapperPadding =
    variant === "dashboard"
      ? "p-5 sm:p-6 lg:p-7"
      : "p-5 sm:p-6 lg:p-7";

  return (
    <div
      className={[
        "rounded-[32px] border border-[#E5E5E0] bg-white",
        "flex flex-col gap-6 sm:gap-7 lg:gap-8",
        wrapperPadding,
      ].join(" ")}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
        {/* LEFT – form */}
        <div className="space-y-7">
          {/* Base URL */}
          <div className="space-y-3">
            <label className="block text-[22px] leading-tight font-semibold tracking-[-0.03em]">
              Base URL
            </label>
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://example.com/landing-page"
              className="w-full border-0 border-b border-black/80 bg-transparent px-0 pb-1.5 text-[18px] font-normal tracking-tight outline-none placeholder:text-[rgba(156,163,175,1)] focus-visible:border-[rgba(129,140,248,1)]"
            />
            <p className="text-xs text-[#8B8B8B]">
              Paste the page you want people to land on. We&apos;ll layer UTM
              parameters on top.
            </p>
          </div>

          {/* Quick presets */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-[#6B6B6B]">
              Quick presets
            </p>
            <div className="flex flex-wrap gap-2">
              <PresetPill
                label="Newsletter"
                onClick={() => {
                  setUtmSource("newsletter");
                  setUtmMedium("email");
                }}
              />
              <PresetPill
                label="Instagram bio"
                onClick={() => {
                  setUtmSource("instagram-bio");
                  setUtmMedium("social");
                }}
              />
              <PresetPill
                label="TikTok profile"
                onClick={() => {
                  setUtmSource("tiktok-profile");
                  setUtmMedium("social");
                }}
              />
              <PresetPill
                label="Paid ads"
                onClick={() => {
                  setUtmSource("meta-ads");
                  setUtmMedium("cpc");
                }}
              />
            </div>
          </div>

          {/* UTM fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="utm_source *"
              value={utmSource}
              onChange={setUtmSource}
              placeholder="newsletter, instagram, tiktok..."
              helper="Where the click is coming from."
            />
            <Field
              label="utm_medium *"
              value={utmMedium}
              onChange={setUtmMedium}
              placeholder="email, social, cpc..."
              helper="The type of channel."
            />
            <Field
              label="utm_campaign"
              value={utmCampaign}
              onChange={setUtmCampaign}
              placeholder="spring_launch, black_friday..."
              helper="Campaign name, promo, or theme."
            />
            <Field
              label="utm_term"
              value={utmTerm}
              onChange={setUtmTerm}
              placeholder="optional keyword"
              helper="Optional keyword for search / ads."
            />
            <Field
              label="utm_content"
              value={utmContent}
              onChange={setUtmContent}
              placeholder="hero_button, footer_link..."
              helper="Optional placement / creative label."
            />
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="max-w-xs text-xs text-[#8B8B8B]">
              Add at least a <span className="font-medium">source</span> and{" "}
              <span className="font-medium">medium</span> to generate a clean
              tracking link.
            </p>
            <Button
              type="button"
              size="sm"
              className="rounded-full px-5 text-sm font-medium bg-black text-white hover:bg-black/90"
              onClick={handleCopy}
              disabled={!resultUrl}
            >
              {copied
                ? "Copied!"
                : resultUrl
                ? "Copy tracking link"
                : "Add UTM details"}
            </Button>
          </div>
        </div>

        {/* RIGHT – preview */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium tracking-tight text-[#111111]">
              Generated URL
            </h3>
            <div className="rounded-2xl border border-[#E4E4DE] bg-[#FBFBF8] px-3 py-3 text-xs">
              {resultUrl ? (
                <p className="break-all text-[#111827]">{resultUrl}</p>
              ) : (
                <p className="text-[#9CA3AF]">
                  Your full UTM link will appear here once you add details.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold tracking-[0.18em] text-[#6B7280]">
              UTM PARAMETERS
            </h4>
            <div className="rounded-2xl border border-[#E5E5E0] bg-[#F7F7F3] p-3 text-xs">
              <ParamRow label="utm_source" value={utmSource} />
              <ParamRow label="utm_medium" value={utmMedium} />
              <ParamRow label="utm_campaign" value={utmCampaign} />
              <ParamRow label="utm_term" value={utmTerm} />
              <ParamRow label="utm_content" value={utmContent} />
            </div>
          </div>

          <p className="text-[11px] text-[#8B8B8B]">
            Paste this link into ads, bios, and emails. Kompi or your analytics
            tool will classify traffic based on the UTM fields you&apos;ve
            filled in.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[#111827]">
        {props.label}
      </label>
      <input
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className="w-full rounded-xl border border-[#E5E5E0] bg-white px-3 py-2 text-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[rgba(129,140,248,1)]"
      />
      {props.helper && (
        <p className="text-[11px] text-[#9CA3AF]">{props.helper}</p>
      )}
    </div>
  );
}

function ParamRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-[#E5E5E0] py-1 last:border-none">
      <span className="font-mono text-[11px] text-[#6B7280]">{label}</span>
      <span className="max-w-[60%] truncate text-[11px] text-[#111827]">
        {value || <span className="text-[#D1D5DB]">– not set –</span>}
      </span>
    </div>
  );
}

function PresetPill({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full border border-[#E5E5E0] bg-[#F7F7F3] px-3 py-1.5 text-xs font-medium text-[#111827] hover:bg-black hover:text-white transition"
    >
      {label}
    </button>
  );
}

export default UtmBuilder;
