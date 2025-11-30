// src/app/pricing/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  // This will become: "Pricing | Kompi" because of the root template
  title: "Pricing",
  description:
    "Simple Kompi pricing for creators, studios and teams. Start free, then unlock Kompi Codes™, smart redirects, custom domains and studio-grade analytics.",
  alternates: {
    canonical: "https://kompi.app/pricing",
  },
  openGraph: {
    type: "website",
    url: "https://kompi.app/pricing",
    title: "Kompi Pricing — Free, Creator & Studio plans",
    description:
      "Compare Kompi plans for links, QR menus, bio pages and analytics. Start free, upgrade when you’re ready.",
    images: ["/kompicollage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompi Pricing — Free, Creator & Studio plans",
    description:
      "See Kompi’s pricing for modern brands, creators and studios. Start free and scale into smart routing and custom branding.",
    images: ["/kompicollage.png"],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No UI changes – just pass the pricing page through
  return <>{children}</>;
}
