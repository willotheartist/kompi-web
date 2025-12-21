// src/lib/pseo/section-generators/utm-presets.ts
import type { PSEOPageInput, PSEOSection } from "../types";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function defaultsForChannel(channel: string) {
  const c = channel.toLowerCase();

  if (c.includes("google ads") || c.includes("adwords")) {
    return {
      utm_source: "google",
      utm_medium: "cpc",
      campaigns: ["brand", "nonbrand", "remarketing"],
      contents: ["headline_a", "headline_b", "sitelink"],
    };
  }

  if (c.includes("meta") || c.includes("facebook") || c.includes("instagram ads")) {
    return {
      utm_source: "meta",
      utm_medium: "paid_social",
      campaigns: ["prospecting", "retargeting", "promo"],
      contents: ["creative_a", "creative_b", "story"],
    };
  }

  if (c.includes("newsletter") || c.includes("email")) {
    return {
      utm_source: "newsletter",
      utm_medium: "email",
      campaigns: ["weekly_digest", "launch", "promo"],
      contents: ["top_link", "cta_button", "footer_link"],
    };
  }

  if (c.includes("whatsapp") || c.includes("sms") || c.includes("telegram")) {
    return {
      utm_source: slugify(channel).replace(/_/g, ""),
      utm_medium: "messaging",
      campaigns: ["broadcast", "support", "promo"],
      contents: ["cta", "template_a", "template_b"],
    };
  }

  if (c.includes("qr")) {
    return {
      utm_source: "qr",
      utm_medium: "offline",
      campaigns: ["poster", "table_tent", "flyer"],
      contents: ["placement_a", "placement_b", "placement_c"],
    };
  }

  return {
    utm_source: slugify(channel).replace(/_/g, ""),
    utm_medium: "social",
    campaigns: ["bio_link", "post", "story"],
    contents: ["cta", "creative_a", "creative_b"],
  };
}

export function generateUTMPresets(input: PSEOPageInput): PSEOSection {
  const channel = input.entity?.type === "channel" ? input.entity.value : "your channel";
  const d = defaultsForChannel(channel);

  const examples = [
    {
      name: "Default / evergreen",
      url: `https://example.com/?utm_source=${encodeURIComponent(
        d.utm_source
      )}&utm_medium=${encodeURIComponent(d.utm_medium)}&utm_campaign=${encodeURIComponent(
        d.campaigns[0]
      )}`,
      notes:
        "Use this as your baseline. Keep it stable so you can compare performance across weeks.",
    },
    {
      name: "Campaign test (placement/creative split)",
      url: `https://example.com/?utm_source=${encodeURIComponent(
        d.utm_source
      )}&utm_medium=${encodeURIComponent(d.utm_medium)}&utm_campaign=${encodeURIComponent(
        d.campaigns[1]
      )}&utm_content=${encodeURIComponent(d.contents[0])}`,
      notes:
        "Change utm_content to test creative/placement while source + medium stay constant.",
    },
    {
      name: "Promo burst",
      url: `https://example.com/?utm_source=${encodeURIComponent(
        d.utm_source
      )}&utm_medium=${encodeURIComponent(d.utm_medium)}&utm_campaign=${encodeURIComponent(
        d.campaigns[2]
      )}&utm_content=${encodeURIComponent(d.contents[1])}`,
      notes:
        "For time-bound promotions. Keep the naming consistent so reporting stays clean.",
    },
  ];

  const lines: string[] = [];

  lines.push(
    `Use these as **copy/paste starting points** for tracking links from **${channel}**. The goal is simple: clean names that turn into readable analytics.`,
    ``,
    `Recommended defaults (edit any of these in the builder):`,
    `• utm_source=${d.utm_source}`,
    `• utm_medium=${d.utm_medium}`,
    `• utm_campaign examples: ${d.campaigns.join(", ")}`,
    `• utm_content examples: ${d.contents.join(", ")}`,
    ``,
    `Copy/paste examples:`
  );

  for (const ex of examples) {
    lines.push(`• ${ex.name}`);
    lines.push(`  • URL: ${ex.url}`);
    lines.push(`  • Notes: ${ex.notes}`);
  }

  lines.push(
    ``,
    `Quick rules that prevent messy reports:`,
    `• Keep utm_source + utm_medium stable for the channel.`,
    `• Put “what changed” into utm_campaign (initiative) and utm_content (creative/placement).`,
    `• Avoid spaces and inconsistent casing. Prefer lowercase + underscores.`,
    `• If you can’t explain a parameter in 3 seconds, your future self won’t either.`
  );

  return {
    id: "utm-presets",
    title: "Copy/paste UTM presets",
    content: lines.join("\n"),
  };
}
