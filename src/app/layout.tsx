//src/app/layout.tsx
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { NavbarGate } from "@/components/navbar-gate";
import { interTight, instrumentSerif } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "Kompi | The Smarter Way to Share Links, QR Codes & Pages",
    template: "%s | Kompi",
  },
  description:
    "Kompi helps creators and teams build smarter links, QR experiences and bio pages — with analytics that show what actually works.",
  metadataBase: new URL("https://kompi.app"),
  alternates: {
    canonical: "https://kompi.app",
  },
  openGraph: {
    type: "website",
    url: "https://kompi.app",
    siteName: "Kompi",
    title: "Kompi | The Smarter Way to Share Links, QR Codes & Pages",
    description:
      "Shorten URLs, create QR menus, build bio pages and track every click with Kompi.",
    images: ["/kompicollage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompi | The Smarter Way to Share Links, QR Codes & Pages",
    description:
      "Share smarter with Kompi: links, QR menus, bio pages and analytics in one place.",
    images: ["/kompicollage.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable}`}
    >
      <body className="wf-root antialiased">
        <Providers>
          <NavbarGate />
          {children}
        </Providers>
      </body>
    </html>
  );
}
