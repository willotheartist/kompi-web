// src/app/free-qr-code-generator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { FreeQrGenerator } from "@/components/qr-code-generator/FreeQrGenerator";

export const metadata: Metadata = {
  title: "Free QR Code Generator | Kompi",
  description:
    "Create custom QR codes for links, text, email, WiFi and more. Free QR code generator by Kompi with colors, logo and high-resolution downloads.",
};

export default function FreeQrCodeGeneratorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-12 lg:px-8">
        {/* Hero */}
        <section className="space-y-4 text-center lg:text-left">
          <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-300">
            Free tool
          </span>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Free QR Code Generator
          </h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Create custom QR codes in seconds. Change colors, add your logo and
            download high-resolution PNGs for your cards, menus and campaigns.
            No sign-up required.
          </p>
        </section>

        {/* New generator UI */}
        <FreeQrGenerator />

        {/* SEO copy block */}
        <section className="mt-8 space-y-6 rounded-3xl border border-slate-800 bg-slate-950/60 p-6 text-sm text-slate-300">
          <h2 className="text-lg font-semibold text-slate-50">
            How to use Kompi&apos;s free QR code generator
          </h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Choose the type of QR code you need: URL, text, email or WiFi.</li>
            <li>Enter your content in the main field.</li>
            <li>Open the dropdowns to set colors, add a logo and customize design.</li>
            <li>Click &quot;Generate QR code&quot; to preview your design instantly.</li>
            <li>Download a high-resolution PNG and use it on cards, menus or posters.</li>
          </ol>
          <p>
            Kompi helps businesses, creators and events connect the offline world
            with digital experiences. Use this free QR code generator as a first
            step, and upgrade to{" "}
            <a
              href="/k-cards"
              className="font-medium text-sky-400 underline-offset-4 hover:underline"
            >
              Kompi K-Cards
            </a>{" "}
            and{" "}
            <Link
              href="/qr-menus"
              className="font-medium text-sky-400 underline-offset-4 hover:underline"
            >
              QR menus
            </Link>{" "}
            when you&apos;re ready for advanced analytics and branding.
          </p>
        </section>
      </div>
    </main>
  );
}