// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { TOOL_DEFINITIONS } from "@/lib/tools-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kompi.app";
  const now = new Date();

  // Core static marketing + product routes
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/analytics`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/features/url-shortener`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/growth`,
      lastModified: now,
    },

    // QR & QR generator landers
    {
      url: `${baseUrl}/qr-code-generator`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/free-qr-code-generator`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/qr-code/dynamic`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/qr-code/email`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/qr-code/for-restaurant`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/qr-code/static`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/qr-code/with-logo`,
      lastModified: now,
    },

    // Product / solution pages
    {
      url: `${baseUrl}/k-cards`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/kr-codes`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/KR-Codes-QR-Code-Generator`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/qr-menus`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/kompi-suite`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/customers`,
      lastModified: now,
    },

    // Tools hub
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
    },

    // NOTE: dynamic routes like /p/[slug], /menu/[slug], /m/[slug], /k/[slug]
    // can be added later by querying the DB for slugs and pushing them into this array.
  ];

  // All currently AVAILABLE tools – e.g. /tools/password-generator, /tools/word-counter, etc.
  const toolEntries: MetadataRoute.Sitemap = TOOL_DEFINITIONS
    .filter((tool) => tool.status === "available")
    .map((tool) => ({
      url: `${baseUrl}${tool.publicPath}`,
      lastModified: now,
    }));

  return [...staticEntries, ...toolEntries];
}
