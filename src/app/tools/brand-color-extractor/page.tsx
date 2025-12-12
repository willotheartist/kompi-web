import type { Metadata } from "next";
import Link from "next/link";
import { BrandColorExtractor } from "@/components/tools/BrandColorExtractor";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Brand Color Extractor | Pull Hex Codes From Logos & Screenshots | Kompi Tools",
  description:
    "Upload your logo, screenshot, or brand photo and instantly extract the main colors as hex codes. Perfect for brand kits, landing pages, and UI design.",
};

const faqs = [
  {
    question: "Is the Kompi brand color extractor free?",
    answer:
      "Yes. It runs in your browser and is completely free to use. You don’t need an account or login to extract colors.",
  },
  {
    question: "What kind of images work best?",
    answer:
      "Logos, website screenshots, product photos, and simple brand imagery work best. Avoid very dark, noisy, or low-resolution images for more accurate results.",
  },
  {
    question: "How many colors does this tool extract?",
    answer:
      "Kompi pulls out a small set of dominant colors so you get a clear sense of primary and supporting tones, rather than an overwhelming list of hex codes.",
  },
  {
    question: "Does Kompi store my images or colors?",
    answer:
      "No. The color extraction runs 100% in your browser. Your images and extracted colors are not uploaded or saved to Kompi’s servers.",
  },
  {
    question: "Can I use these colors in my brand kit or design system?",
    answer:
      "Yes. Click any swatch to copy the hex code, then paste it into your brand guidelines, Figma styles, design tokens, or Kompi workspace.",
  },
  {
    question: "How does this fit with the color palette generator?",
    answer:
      "You can start by extracting brand colors from a logo or screenshot, then use the color palette generator to explore supporting palettes around those core tones.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Brand Color Extractor",
  url: "https://kompi.app/tools/brand-color-extractor",
  applicationCategory: "UtilitiesApplication",
  description:
    "Upload an image and extract its main brand colors as hex codes. Ideal for logos, screenshots, and product photos.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicBrandColorExtractorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-7rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#0F172A] via-[#F97316] to-[#FDE68A] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] ring-1 ring-[#E5ECFF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0F172A] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Brand color extractor</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Pull{" "}
              <span className="bg-gradient-to-r from-[#0F172A] via-[#F97316] to-[#FDE68A] bg-clip-text text-transparent">
                real brand colors
              </span>{" "}
              straight from your logo or screenshots.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Upload a logo, landing page screenshot, or product photo. Kompi
              extracts the dominant colors and gives you clean hex codes you
              can drop into your brand kit, design system, or Kompi workspace.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#brand-color-extractor-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
              >
                Extract brand colors
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#E5ECFF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                Runs 100% in your browser
              </div>
              <span>• No login or email required</span>
              <span>• Works with logos, screenshots, and product photos</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="brand-color-extractor-tool"
        className="-mt-10 bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#0F172A] bg-[#FFFFFF] p-[1px]">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <BrandColorExtractor />
          </div>
        </div>
      </section>

      {/* USE CASE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              COLORS FROM THE ASSETS YOU ALREADY HAVE
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One extractor, three everyday branding jobs.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Instead of guessing hex codes from memory, use the assets you
              already ship — logos, screenshots, mockups — and let Kompi tell
              you which colors you&apos;re really using.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  LOGOS & BRAND MARKS
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Get the true brand colors
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Drop in your logo file and pull out clean, reusable hex codes
                  for primary and accent colors.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Capture the exact shades you use</li>
                  <li>• Keep brand decks and sites consistent</li>
                  <li>• Share hex codes with designers and devs</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Extract colors from my logo
              </button>
            </div>

            {/* Card 2 – highlighted */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#FEF3C7] p-7 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Landing pages & product UI
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Screenshot your homepage, dashboard, or app and see which
                  colors are actually doing the heavy lifting.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Check if buttons and links are consistent</li>
                  <li>• Spot rogue colors in your UI</li>
                  <li>• Use the same palette across Kompi tools</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Analyze my current UI
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#FDECF8] p-7 ring-1 ring-[#F9A8D4]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9D174D]">
                  MOCKUPS & CONTENT
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Make content and brand feel aligned
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Use colors from your most recent campaigns so thumbnails,
                  carousels, and landing pages feel like one system.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Steal colors from your best-performing posts</li>
                  <li>• Reuse them across stories and slides</li>
                  <li>• Keep your Kompi pages on-brand</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#9D174D] bg-[#9D174D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#7F1239]">
                Match my content colors
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#0F172A] px-8 py-10 text-center text-[#F9FAFB] sm:px-12">
            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
              Your brand already has colors. Kompi just helps you name them.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base">
              Instead of scrolling through color wheels and guessing, start from
              what you already have in the wild — logos, sites, thumbnails —
              and use Kompi to turn those into a simple, reusable palette.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#brand-color-extractor-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#F9FAFB] px-6 py-2.5 text-xs font-semibold text-[#111827] hover:bg-white"
              >
                Extract brand colors
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#F9FAFB] bg-transparent px-6 py-2.5 text-xs font-medium text-[#F9FAFB] hover:bg-[#F9FAFB]/10"
              >
                Create free Kompi account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the Kompi brand color extractor?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here’s what people usually ask before they start using Kompi for
              brand and product color decisions.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E5E7EB] bg-[#F7F7F3] p-5 text-sm"
              >
                <h3 className="mb-1 text-sm font-medium text-[#1E2330] sm:text-base">
                  {item.question}
                </h3>
                <p className="text-sm leading-relaxed text-[#4B5563]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />

      {/* JSON-LD schema markup */}
      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
