//src/app/free-qr-code-generator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { FooterCTA } from "@/components/footer-cta";
import { FreeQrGenerator } from "@/components/qr-code-generator/FreeQrGenerator";
import Faces from "@/components/sections/faces";
import Faqs from "@/components/faqs";

export const metadata: Metadata = {
  title: "Free QR Code Generator | Kompi",
  description:
    "Use Kompi's free QR code generator to create custom QR codes for links, text, email, WiFi and more. Customize colors, add your logo and download high-resolution PNG QR codes for print or digital use.",
};

export default function FreeQrCodeGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F4FBFF] text-[#00201A]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="space-y-4 text-center sm:text-left">
          <span className="inline-flex items-center rounded-full border border-[#B7E5DE] bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#006476]">
            Free QR code tool
          </span>

          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Free QR Code Generator by Kompi
          </h1>

          <p className="mx-auto max-w-2xl text-sm text-[#245656] sm:text-base">
            Use Kompi&apos;s free QR code generator to quickly turn any link, text,
            email or WiFi details into a clean QR code. Customize colors, add a logo
            and download high-resolution PNG files ready for cards, posters, menus
            and packaging.
          </p>

          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-[#3C6B6B]">
            No account required to generate QR codes. When you&apos;re ready for
            analytics, branded landing pages and subscriber tools, you can upgrade
            to Kompi with one click.
          </p>
        </section>

        {/* Generator UI */}
        <section className="sm:mt-4">
          <FreeQrGenerator />
        </section>

        {/* SEO copy block: how it works */}
        <section className="space-y-5 text-sm text-[#245656]">
          <h2 className="text-lg font-semibold text-[#00201A]">
            How to use Kompi&apos;s free QR code generator
          </h2>

          <p className="max-w-3xl">
            Kompi&apos;s free QR code generator is designed for busy teams, creators
            and local businesses that need fast, reliable QR codes without complex
            software. You can create unlimited static QR codes for your links and
            campaigns in just a few steps.
          </p>

          <ol className="list-decimal space-y-2 pl-5 max-w-3xl">
            <li>Select the type of QR code: URL, text, email or WiFi.</li>
            <li>Paste your link or content into the main field.</li>
            <li>Open the style controls to change colors, corners and logo.</li>
            <li>Click &quot;Generate QR code&quot; to preview the result instantly.</li>
            <li>Download a high-resolution PNG and place it on cards, menus or posters.</li>
          </ol>

          <p className="max-w-3xl">
            Because this is a browser-based free QR code generator, your codes are
            created instantly. For most simple use cases you don&apos;t need an account
            or login at all.
          </p>
        </section>

        {/* SEO copy block: use cases + internal links */}
        <section className="space-y-6 text-sm text-[#245656]">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-[#00201A]">
                What you can do with a free QR code generator
              </h2>
              <p>
                QR codes make it easy to move people from the offline world to your
                digital experiences. With Kompi&apos;s free QR code generator you can:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Send people from printed flyers straight to a landing page.</li>
                <li>Link restaurant or bar menus without reprinting every change.</li>
                <li>Add QR codes to business cards that update over time.</li>
                <li>Share WiFi details with guests in a single quick scan.</li>
                <li>Promote newsletters, podcasts or product drops from posters.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#006476]">
                Grow beyond a basic QR code
              </h3>
              <p>
                When you&apos;re ready to go beyond a simple free QR code generator,
                Kompi gives you tools to design beautiful landing cards and track
                engagement over time.
              </p>
              <p>
                Build branded digital cards with{" "}
                <Link
                  href="/k-cards"
                  className="font-medium text-[#006476] underline-offset-4 hover:underline"
                >
                  Kompi K-Cards
                </Link>{" "}
                or create scannable menus with{" "}
                <Link
                  href="/qr-menus"
                  className="font-medium text-[#006476] underline-offset-4 hover:underline"
                >
                  Kompi QR menus
                </Link>
                . Both work perfectly alongside this free QR code generator so you can
                keep everything under one roof.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ / extra SEO content */}
        <section className="space-y-5 text-sm text-[#245656]">
          <h2 className="text-lg font-semibold text-[#00201A]">
            FAQs about our free QR code generator
          </h2>

          <div className="space-y-4 max-w-3xl">
            <div>
              <h3 className="text-sm font-semibold text-[#003426]">
                Is Kompi&apos;s QR code generator really free?
              </h3>
              <p>
                Yes. You can use this free QR code generator to create unlimited
                static QR codes for links, text, email and WiFi. There&apos;s no credit
                card required to generate or download your QR codes.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#003426]">
                Can I customize colors and add a logo?
              </h3>
              <p>
                Absolutely. The designer in the generator lets you change foreground
                and background colors, tweak corner styles and upload a logo so your
                free QR codes still look on-brand.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#003426]">
                What&apos;s the difference between this free QR tool and Kompi plans?
              </h3>
              <p>
                The free QR code generator is perfect for quick one-off codes. Paid
                Kompi plans add tracking, subscribers, branded landing cards and
                workspace tools so teams can manage links, QR codes and menus
                together in one place.
              </p>
            </div>
          </div>
        </section>

      </div>
       <Faces />
      <Faqs />

      {/* Global footer CTA from marketing site */}
      <FooterCTA />
    </main>
  );
}
