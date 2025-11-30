// src/app/features/url-shortener/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // Will render as: "URL Shortener | Kompi"
  title: "URL Shortener",
  description:
    "Kompi’s URL shortener turns long URLs into clean, on-brand short links that plug into Kompi Codes™, K-Cards, Link-in-bio and full analytics.",
  alternates: {
    canonical: "https://kompi.app/features/url-shortener",
  },
  openGraph: {
    type: "website",
    url: "https://kompi.app/features/url-shortener",
    title: "Kompi URL Shortener — On-brand short links for modern brands",
    description:
      "Create design-grade short links that connect to Kompi Codes™, K-Cards and Link-in-bio pages, with clear analytics for every campaign.",
    images: ["/kompicollage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompi URL Shortener — On-brand short links for modern brands",
    description:
      "Shorten and brand every link with Kompi, then track clicks, referrers, devices and campaigns in one calm workspace.",
    images: ["/kompicollage.png"],
  },
};

export default function UrlShortenerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No UI changes – just wraps the feature page with metadata
  return <>{children}</>;
}
