//src/app/qr-code/dynamic/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Dynamic QR Codes | Editable QR Code Generator with Analytics | Kompi",
  description:
    "Create dynamic QR codes you can edit later without reprinting. Point scans at Kompi short links to change destinations, add tracking and see analytics.",
  alternates: {
    canonical: "/qr-code/dynamic",
  },
  openGraph: {
    title: "Dynamic QR Codes – Editable QR Codes with Tracking | Kompi",
    description:
      "Generate dynamic QR codes that point to Kompi short links. Update destinations later, track scans and see which menus, posters or campaigns perform best.",
    url: "/qr-code/dynamic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dynamic QR Codes | Kompi",
    description:
      "Use Kompi to turn any QR code into a dynamic, trackable link. Change where it points without reprinting and see scans over time.",
  },
};

export default function DynamicQrCodesPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#050505]">
      <Navbar />
      <main className="pt-20 pb-16 md:pt-24">
        <div className="mx-auto max-w-5xl px-4">
          {/* Hero */}
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Dynamic QR codes
            </p>
            <h1
              className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-tight text-[#050505] sm:text-[32px]"
              style={{ letterSpacing: "-0.04em" }}
            >
              Dynamic QR codes you can edit
              <br />
              without reprinting anything.
            </h1>
            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-neutral-700">
              A dynamic QR code doesn&apos;t point straight at a fixed URL. Instead,
              it points to a Kompi short link in your workspace. That means you can
              change where it redirects later, turn tracking on or off, and see scan
              analytics over time — without replacing menus, posters or packaging.
            </p>
          </section>

          {/* Benefits */}
          <section className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Edit destinations later
              </h2>
              <p className="mt-2">
                Point each QR at a Kompi short link. When you need to update the
                landing page, you just edit the link in Kompi — the printed QR
                stays the same.
              </p>
            </article>
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                See scan analytics
              </h2>
              <p className="mt-2">
                Track how many times each dynamic QR is scanned, which devices
                people use, and which locations or campaigns perform best.
              </p>
            </article>
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Perfect for long-lived assets
              </h2>
              <p className="mt-2">
                Use dynamic QR codes on menus, signage, brochures and packaging —
                anywhere you don&apos;t want to reprint every time your content
                changes.
              </p>
            </article>
          </section>

          {/* How-to + comparison */}
          <section className="mt-10 grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-start">
            <div>
              <h2 className="text-[18px] font-semibold tracking-tight text-[#050505]">
                How to create a dynamic QR code with Kompi
              </h2>
              <ol className="mt-3 space-y-2 text-[13px] leading-relaxed text-neutral-700">
                <li>
                  <span className="font-semibold">1.</span> Sign in to Kompi and
                  create a new short link for your campaign, menu or landing page.
                </li>
                <li>
                  <span className="font-semibold">2.</span> From the link options,
                  generate a QR code that points at that short link instead of a
                  fixed URL.
                </li>
                <li>
                  <span className="font-semibold">3.</span> Download the QR as a
                  high-resolution PNG and drop it into your print files or
                  displays.
                </li>
                <li>
                  <span className="font-semibold">4.</span> When you need to change
                  the destination, edit the short link in Kompi — the QR code
                  doesn&apos;t need to change.
                </li>
              </ol>
              <p className="mt-4 text-[12px] text-neutral-600">
                Want to start with a simple static QR code instead? You can always
                begin on the{" "}
                <Link href="/qr-code-generator"
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                >
                  free QR code generator
                </Link>{" "}
                and upgrade to dynamic links later.
              </p>
            </div>
            <div className="rounded-2xl border border-black/5 bg-[#0b0b0b] p-4 text-[12px] leading-relaxed text-neutral-100 shadow-[0_24px_60px_rgba(15,23,42,0.75)]">
              <h2 className="text-[13px] font-semibold text-white">
                Dynamic vs static QR codes
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <span className="font-semibold">Static:</span> points directly to
                  a URL or value. Simple, free, never expires — but can&apos;t be
                  edited later.
                </li>
                <li>
                  <span className="font-semibold">Dynamic:</span> points to a Kompi
                  short link you control. Editable destination, scan analytics, and
                  more flexibility for campaigns.
                </li>
              </ul>
              <p className="mt-3 text-neutral-300">
                Kompi lets you use both: static QR codes from the free generator,
                and dynamic QR codes when you&apos;re ready to track performance.
              </p>
            </div>
          </section>

          {/* CTA row */}
          <section className="mt-8 flex flex-wrap items-center gap-3 text-[12px]">
            <Link href="/signin"
              className="inline-flex items-center justify-center rounded-full bg-[#050505] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.75)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
            >
              Start using dynamic QR codes
            </Link>
            <Link href="/qr-code-generator"
              className="text-[12px] font-medium text-neutral-800 underline-offset-4 hover:underline"
            >
              Or create a free static QR code →
            </Link>
          </section>
        </div>
      </main>
      <FooterCTA />
    </div>
  );
}
