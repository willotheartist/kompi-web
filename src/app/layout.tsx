import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kompi — The modern OS for small business",
  description:
    "All the tools a small business needs—AI website builder, CRM, tasks, invoicing, campaigns—integrated for £49/mo.",
  metadataBase: new URL("http://localhost:3001"),
  openGraph: {
    title: "Kompi — The modern OS for small business",
    description: "Replace 6+ tools with one calm, AI-native platform.",
    url: "/",
    siteName: "Kompi",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompi — The modern OS for small business",
    description: "Replace 6+ tools with one calm, AI-native platform.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} min-h-full bg-white text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
