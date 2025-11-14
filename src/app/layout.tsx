// @ts-nocheck
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { NavbarGate } from "@/components/navbar-gate";
import { instrumentSerif } from "@/lib/fonts";

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
    <html lang="en">
      <body
        className={`
          ${instrumentSerif.variable}
          bg-neutral-50 text-neutral-900 antialiased
        `}
      >
        <Providers>
          <NavbarGate>
            <Navbar />
          </NavbarGate>
          {children}
        </Providers>
      </body>
    </html>
  );
}
