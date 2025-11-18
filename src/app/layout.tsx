/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { NavbarGate } from "@/components/navbar-gate";
import { interTight, instrumentSerif } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Kompi Links",
  description: "Links, bios, Kompi Codes™ & analytics for modern brands.",
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
