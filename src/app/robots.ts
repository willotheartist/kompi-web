// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://kompi.app";

  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "/api/",
        "/dashboard/",
        "/signin",
        "/signup",
        "/reset-password",
        "/forgot-password",
        
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
