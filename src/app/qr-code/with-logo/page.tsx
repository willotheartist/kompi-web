//src/app/qr-code/with-logo/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "QR Codes with Logo | Branded QR Code Generator | Kompi",
  description:
    "Create QR codes with your logo in the middle. Use brand colours, rounded dots and borders while keeping every QR fast and reliable to scan.",
  alternates: {
    canonical: "/qr-code/with-logo",
  },
  openGraph: {
    title: "QR Codes with Logo – Branded QR Codes for Your Business | Kompi",
    description:
      "Generate QR codes with your brand logo and colours. Perfect for menus, packaging, signage and business cards.",
    url: "/qr-code/with-logo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Codes with Logo | Kompi",
    description:
      "Use Kompi to create branded QR codes with your logo, colours and styles. Upgrade to dynamic links and analytics when you need them.",
  },
};

export default function QrWithLogoPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#050505]">
      <Navbar />
      <main className="pt-20 pb-16 md:pt-24">
        <div className="mx-auto max-w-5xl px-4">
          {/* Hero */}
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Branded QR codes
            </p>
            <h1
              className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-tight text-[#050505] sm:text-[32px]"
              style={{ letterSpacing: "-0.04em" }}
            >
              QR codes with your logo,
              <br />
              built to match your brand.
            </h1>
            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-neutral-700">
              Branded QR codes help people trust what they&apos;re scanning.
              With Kompi you can add your logo to the centre of the QR, tune
              colours and dot styles, and keep everything easily scannable on
              modern phones.
            </p>
          </section>

          {/* Benefits */}
          <section className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Drop in your logo
              </h2>
              <p className="mt-2">
                Upload a logo file and Kompi will place it neatly in the
                centre of your QR with enough contrast for reliable scans.
              </p>
            </article>
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Use brand colours
              </h2>
              <p className="mt-2">
                Match your brand by adjusting foreground colours, backgrounds
                and borders. Keep dark colours on light backgrounds for best
                results.
              </p>
            </article>
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Save presets with Kompi
              </h2>
              <p className="mt-2">
                With a Kompi account you can save QR style presets so your
                menus, posters and cards all share the same look.
              </p>
            </article>
          </section>

          {/* How-to */}
          <section className="mt-10 rounded-3xl border border-black/5 bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] md:p-8">
            <h2 className="text-[18px] font-semibold tracking-tight text-[#050505]">
              How to create a QR code with logo
            </h2>
            <ol className="mt-3 space-y-2 text-[13px] leading-relaxed text-neutral-700">
              <li>
                <span className="font-semibold">1.</span> Open the{" "}
                <Link href="/qr-code-generator"
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                >
                  free QR code generator
                </Link>{" "}
                and choose the type of content you want to encode.
              </li>
              <li>
                <span className="font-semibold">2.</span> In the design step,
                upload your logo and adjust the size so it sits clearly in the
                middle of the code.
              </li>
              <li>
                <span className="font-semibold">3.</span> Set foreground and
                background colours with strong contrast to keep scans fast and
                reliable.
              </li>
              <li>
                <span className="font-semibold">4.</span> Download a
                high-resolution PNG and drop it into your print or digital
                designs.
              </li>
            </ol>
          </section>

          {/* CTA */}
          <section className="mt-8 flex flex-wrap items-center gap-3 text-[12px]">
            <Link href="/qr-code-generator"
              className="inline-flex items-center justify-center rounded-full bg-[#050505] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.75)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
            >
              Create a QR code with logo
            </Link>
            <Link href="/qr-code/dynamic"
              className="text-[12px] font-medium text-neutral-800 underline-offset-4 hover:underline"
            >
              Make it dynamic and trackable →
            </Link>
          </section>
        </div>
      </main>
      <FooterCTA />
    </div>
  );
}
