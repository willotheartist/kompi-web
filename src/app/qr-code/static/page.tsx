import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Static QR Codes | Free Static QR Code Generator | Kompi",
  description:
    "Create static QR codes for links, Wi-Fi, contact details and more. Simple, free QR codes that never expire as long as the destination stays live.",
  alternates: {
    canonical: "/qr-code/static",
  },
  openGraph: {
    title: "Static QR Codes – Free QR Codes That Never Expire | Kompi",
    description:
      "Generate static QR codes in seconds. Point them at any URL or value and print them on menus, posters, flyers or packaging.",
    url: "/qr-code/static",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Static QR Codes | Kompi",
    description:
      "Use Kompi’s free generator to create static QR codes for websites, menus, Wi-Fi and more. No account required.",
  },
};

export default function StaticQrCodesPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#050505]">
      <Navbar />
      <main className="pt-20 pb-16 md:pt-24">
        <div className="mx-auto max-w-5xl px-4">
          {/* Hero */}
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              Static QR codes
            </p>
            <h1
              className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-tight text-[#050505] sm:text-[32px]"
              style={{ letterSpacing: "-0.04em" }}
            >
              Static QR codes that just work,
              <br />
              with no expiry date.
            </h1>
            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-neutral-700">
              A static QR code points straight at a fixed value — usually a URL,
              Wi-Fi network, piece of text or contact card. Once you create and
              print it, the QR code itself never changes and never expires as
              long as the destination stays live.
            </p>
          </section>

          {/* Benefits */}
          <section className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Simple and reliable
              </h2>
              <p className="mt-2">
                Static QR codes are ideal when you know your link won&apos;t
                change. They scan instantly and work anywhere a normal URL
                would work.
              </p>
            </article>
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Free to create
              </h2>
              <p className="mt-2">
                Use Kompi&apos;s free{" "}
                <a
                  href="/qr-code-generator"
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                >
                  QR code generator
                </a>{" "}
                to create static QR codes without signing up.
              </p>
            </article>
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Great for one-off campaigns
              </h2>
              <p className="mt-2">
                Perfect for simple posters, flyers or short-term promos where
                you don&apos;t need analytics or editable destinations.
              </p>
            </article>
          </section>

          {/* Static vs dynamic explanation */}
          <section className="mt-10 rounded-3xl border border-black/5 bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] md:p-8">
            <h2 className="text-[18px] font-semibold tracking-tight text-[#050505]">
              When to use static vs dynamic QR codes
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-neutral-700">
              Choose a static QR code when you&apos;re happy with a fixed
              destination and don&apos;t need scan tracking. If you want to
              change where a QR points later or see analytics,{" "}
              <a
                href="/qr-code/dynamic"
                className="font-medium text-neutral-900 underline-offset-4 hover:underline"
              >
                switch to dynamic QR codes
              </a>{" "}
              powered by Kompi short links.
            </p>
          </section>

          {/* CTA */}
          <section className="mt-8 flex flex-wrap items-center gap-3 text-[12px]">
            <a
              href="/qr-code-generator"
              className="inline-flex items-center justify-center rounded-full bg-[#050505] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.75)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
            >
              Open free static QR generator
            </a>
            <a
              href="/qr-code/dynamic"
              className="text-[12px] font-medium text-neutral-800 underline-offset-4 hover:underline"
            >
              Learn about dynamic QR codes →
            </a>
          </section>
        </div>
      </main>
      <FooterCTA />
    </div>
  );
}
