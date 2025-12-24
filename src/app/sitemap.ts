// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { TOOL_DEFINITIONS } from "@/lib/tools-config";

import { getAllPSEOPages } from "@/lib/pseo/dataset";

export const dynamic = "force-dynamic";

function parseISODateOrFallback(value: unknown, fallback: Date): Date {
  if (typeof value !== "string") return fallback;
  // Expect "YYYY-MM-DD"
  const iso = value.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return fallback;

  const d = new Date(iso);
  // Guard invalid date
  if (Number.isNaN(d.getTime())) return fallback;
  return d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kompi.app";

  // Stable date string (avoid locale variance)
  const now = new Date();
  const lastModified = new Date(now.toISOString().slice(0, 10));

  const entries: MetadataRoute.Sitemap = [];

  // Core static marketing + product routes
  entries.push(
    { url: `${baseUrl}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/customers`, lastModified, changeFrequency: "monthly", priority: 0.8 },

    // Product pages
    { url: `${baseUrl}/k-cards`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/kr-codes`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/qr-menus`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/kompi-suite`, lastModified, changeFrequency: "monthly", priority: 0.7 },

    // Growth / analytics
    { url: `${baseUrl}/analytics`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/growth`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/features/url-shortener`, lastModified, changeFrequency: "weekly", priority: 0.75 },

    // QR landers
    { url: `${baseUrl}/qr-code-generator`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/free-qr-code-generator`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/qr-code/dynamic`, lastModified, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/qr-code/static`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/qr-code/with-logo`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/qr-code/email`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/qr-code/for-restaurant`, lastModified, changeFrequency: "weekly", priority: 0.8 },

    // Tools hub
    { url: `${baseUrl}/tools`, lastModified, changeFrequency: "weekly", priority: 0.75 },

    // Blog hub
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 }
  );

  // Tools (available only)
  for (const tool of TOOL_DEFINITIONS.filter((t) => t.status === "available")) {
    entries.push({
      url: `${baseUrl}${tool.publicPath}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.65,
    });
  }

  // PSEO blog pages (dataset-controlled)
  // IMPORTANT: Do NOT gate sitemap on quality heuristics — it prevents discovery.
  const inputs = getAllPSEOPages();

  for (const input of inputs) {
    if (!input.index) continue;

    const pseoLastModified = parseISODateOrFallback(
      input.updatedAt ?? input.publishedAt,
      lastModified
    );

    entries.push({
      url: `${baseUrl}/blog/${input.slug}`,
      lastModified: pseoLastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
