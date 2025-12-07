import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "QR Codes for Restaurants | Free Menu QR Code Generator | Kompi",
  description:
    "Create QR codes for restaurant menus, tables and takeaway packaging. Link guests to up-to-date menus and specials without reprinting.",
  alternates: {
    canonical: "/qr-code/for-restaurant",
  },
  openGraph: {
    title: "QR Codes for Restaurants – Menu QR Codes for Tables & Takeaway | Kompi",
    description:
      "Generate QR codes for your restaurant or café menu. Use static codes for simple menus or dynamic QR codes for menus that change often.",
    url: "/qr-code/for-restaurant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Menu QR Codes | Kompi",
    description:
      "Use Kompi to create QR codes for menus, ordering pages and feedback forms. Update links later with dynamic QR codes.",
  },
};

export default function RestaurantQrCodesPage() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] text-[#050505]">
      <Navbar />
      {/* main content in a container, footer full-width below */}
      <main className="pt-20 pb-16 md:pt-24">
        <div className="mx-auto max-w-5xl px-4">
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              QR codes for restaurants
            </p>
            <h1
              className="mt-3 text-[28px] font-semibold leading-[1.1] tracking-tight text-[#050505] sm:text-[32px]"
              style={{ letterSpacing: "-0.04em" }}
            >
              Menu QR codes for tables,
              <br />
              windows and takeaway boxes.
            </h1>
            <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-neutral-700">
              QR codes make it easy for guests to open your latest menu, drinks
              list or specials from their own phone. With Kompi you can start
              with free static menu QR codes, then upgrade to dynamic QR codes
              when you want to update links without reprinting.
            </p>
          </section>

          <section className="mt-8 grid gap-5 md:grid-cols-3">
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                QR menus on every table
              </h2>
              <p className="mt-2">
                Print QR codes on table tents, coasters or stickers so guests
                can pull up your menu instantly without waiting.
              </p>
            </article>
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Always up to date
              </h2>
              <p className="mt-2">
                Use{" "}
                <Link
                  href="/qr-code/dynamic"
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                >
                  dynamic QR codes
                </Link>{" "}
                to change menus, pricing or specials without replacing the
                printed code.
              </p>
            </article>
            <article className="rounded-2xl border border-black/5 bg-white/90 p-4 text-[12px] leading-relaxed text-neutral-700 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              <h2 className="text-[13px] font-semibold text-[#050505]">
                Works with Kompi QR menus
              </h2>
              <p className="mt-2">
                Build full digital menus and menu QR codes inside Kompi, then
                track how many guests are scanning and visiting each menu.
              </p>
            </article>
          </section>

          <section className="mt-10 rounded-3xl border border-black/5 bg-white/95 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] md:p-8">
            <h2 className="text-[18px] font-semibold tracking-tight text-[#050505]">
              How to create a restaurant menu QR code
            </h2>
            <ol className="mt-3 space-y-2 text-[13px] leading-relaxed text-neutral-700">
              <li>
                <span className="font-semibold">1.</span> Upload your menu or
                publish it on your website or a Kompi menu / landing page.
              </li>
              <li>
                <span className="font-semibold">2.</span> Open the{" "}
                <Link
                  href="/qr-code-generator"
                  className="font-medium text-neutral-900 underline-offset-4 hover:underline"
                >
                  free QR code generator
                </Link>{" "}
                and paste the menu link as the destination.
              </li>
              <li>
                <span className="font-semibold">3.</span> Customise colours
                and, if you want, add your logo so guests recognise your
                brand.
              </li>
              <li>
                <span className="font-semibold">4.</span> Download the QR as a
                high-resolution PNG and add it to table tents, posters,
                windows or takeaway packaging.
              </li>
            </ol>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-[12px]">
              <Link
                href="/qr-code-generator"
                className="inline-flex items-center justify-center rounded-full bg-[#050505] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.75)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
              >
                Create a free menu QR code
              </Link>
              <Link
                href="/qr-menus"
                className="text-[12px] font-medium text-neutral-800 underline-offset-4 hover:underline"
              >
                Explore Kompi QR menus →
              </Link>
            </div>
          </section>
        </div>
      </main>
      {/* Footer CTA now sits on its own, full-width */}
      <FooterCTA />
    </div>
  );
}
