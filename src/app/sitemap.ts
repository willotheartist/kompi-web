// src/app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kompi.app";
  const now = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/pricing`,
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
    {
      url: `${baseUrl}/qr-code-generator`,
      lastModified: now,
    },
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
      url: `${baseUrl}/signin`,
      lastModified: now,
    },
    // NOTE: dynamic routes like /p/[slug], /menu/[slug], /m/[slug], /k/[slug]
    // can be added later by querying the DB for slugs and pushing them into this array.
  ];
}
