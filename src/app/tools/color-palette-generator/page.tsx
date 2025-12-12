import type { Metadata } from "next";
import Link from "next/link";
import { ColorPaletteGenerator } from "@/components/tools/ColorPaletteGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free Color Palette Generator | Brand, Web & UI Color Schemes | Kompi Tools",
  description:
    "Generate beautiful color palettes in seconds. Shuffle, lock, and copy hex codes for your brand, website, UI, and social graphics. Free browser-based color palette generator by Kompi.",
  alternates: {
    canonical: "https://kompi.app/tools/color-palette-generator",
  },
};

const faqs = [
  {
    question: "Is the Kompi color palette generator free?",
    answer:
      "Yes. The Kompi color palette generator is completely free to use, with no account, login, or email required. Open the page, hit the spacebar, and start exploring palettes.",
  },
  {
    question: "What can I use these color palettes for?",
    answer:
      "You can use the palettes for brand identities, landing pages, UI design, pitch decks, social posts, product mockups, and more. Click any color to copy the hex code into Figma, Webflow, Notion, Canva, or your codebase.",
  },
  {
    question: "How does the lock feature work?",
    answer:
      "Lock any color you love and it will stay pinned while you shuffle the rest of the palette. This makes it easy to find the perfect supporting colors around one or two hero tones.",
  },
  {
    question: "Does Kompi store my colors or projects?",
    answer:
      "No. The generator runs in your browser. If you want to keep a palette, copy the hex codes into your brand guidelines, design system, or Kompi workspace.",
  },
  {
    question: "Can I use this color generator with clients or a team?",
    answer:
      "Yes. Many designers and studios use Kompi live on calls to test different color directions with clients, then save the winning palette into their design system.",
  },
  {
    question: "Can I pin this tool to my Kompi dashboard?",
    answer:
      "Yes. When you create a free Kompi account you can add the color palette generator to your dashboard so it is always one click away alongside your other tools.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Color Palette Generator",
  url: "https://kompi.app/tools/color-palette-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate beautiful color palettes in seconds. Shuffle, lock, and copy hex codes for brand, web, and UI design.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicColorPaletteGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-7rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#334139] via-[#C52184] to-[#F9B4ED] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] ring-1 ring-[#E5ECFF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#334139] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · Color palette generator</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Build{" "}
              <span className="bg-gradient-to-r from-[#334139] via-[#C52184] to-[#F9B4ED] bg-clip-text text-transparent">
                scroll-stopping color palettes
              </span>{" "}
              for brands, landing pages, and UI in seconds.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Tap the spacebar to shuffle fresh palettes, lock the swatches you
              love, and copy hex codes straight into your design stack. No more
              guessing hex values or wasting time inside clunky color pickers.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#color-palette-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
              >
                Generate color palettes
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
              <span>• Built for designers, founders, and marketers</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="color-palette-generator-tool"
        className="-mt-10 bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#334139] bg-[#FFFFFF] p-[1px]">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <ColorPaletteGenerator />
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              COLOR PALETTES FOR WHAT YOU ARE BUILDING
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One color generator, three everyday use cases.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Whether you are shipping a new brand, refreshing a product UI, or
              tweaking social graphics, Kompi gives you fast color directions
              that still feel considered and on-brand.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  BRAND & LOGO
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Pick a hero color and build around it
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Lock the one shade you already love, then keep shuffling until
                  you find supporting colors that make your brand feel sharp and
                  intentional.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Explore primary, secondary, and accent combos</li>
                  <li>• See everything at full-width, not tiny swatches</li>
                  <li>• Copy hex codes into your brand guidelines</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Build a brand palette
              </button>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#E6ECFF] p-7 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Landing pages, dashboards, and SaaS UI
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Quickly test calmer, more neutral palettes against louder
                  accent colors. Ideal for SaaS marketing sites, product screens,
                  and design systems.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Avoid clashing tones and oversaturated gradients</li>
                  <li>• Keep primary buttons and alerts feeling consistent</li>
                  <li>• Share palettes with your dev or product team</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Explore UI color schemes
              </button>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#FDECF8] p-7 ring-1 ring-[#F9A8D4]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9D174D]">
                  CONTENT & SOCIAL
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Match your graphics and carousels
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Build color sets you can reuse across posts, thumbnails, and
                  stories so your content feels cohesive instead of random.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Keep one accent color and rotate backgrounds</li>
                  <li>• Use Kompi palettes in Figma, Canva, or Keynote</li>
                  <li>• Save a few go-to combinations for your content calendar</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#9D174D] bg-[#9D174D] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#7F1239]">
                Style my social graphics
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#334139] px-8 py-10 text-center text-[#F9FAFB] sm:px-12">
            <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
              Stop scrolling through endless inspiration boards just to pick colors.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base">
              Kompi gives you full-screen palettes that feel like real interfaces, not
              tiny paint chips. Shuffle, lock, and copy until it feels right, then get
              back to shipping the thing that actually matters.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#color-palette-generator-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#F9FAFB] px-6 py-2.5 text-xs font-semibold text-[#111827] hover:bg:white"
              >
                Generate color palettes
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

      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Color palettes that match the rest of your Kompi setup.
          </h2>

          <div className="grid gap-10 rounded-3xl bg-[#E5ECFF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR FOUNDERS, DESIGNERS, AND OPERATORS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Keep your brand colors consistent across links, QR codes, and pages.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Use the generator to lock in a palette, then reuse the same hex codes in
                your Kompi link pages, QR menus, and dashboards so everything feels like
                one system instead of a patchwork of tools.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#F7F7F3] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#6B7280]">
                  Color generator plus link-in-bio, QR codes, and analytics in one Kompi workspace.
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-10 rounded-3xl bg-[#FFE4F1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 rounded-[2rem] bg-[#F7F7F3] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#4B5563]">
                  Use Kompi live in naming, branding, and positioning workshops.
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR STUDIOS AND AGENCIES
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Turn color exploration into a fast, collaborative moment with clients.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Instead of sending screenshots, share your screen, lock the colors clients
                react to, and leave the session with a palette everyone feels good about.
              </p>
            </div>
          </div>

          <div className="grid gap-10 rounded-3xl bg-[#111827] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F9A8D4] sm:text-sm">
                FOR ANYONE STARTING SOMETHING NEW
              </p>
              <h3 className="text-2xl font-semibold text-[#F9FAFB] sm:text-3xl">
                A tiny tool that removes one more excuse not to launch.
              </h3>
              <p className="text-sm leading-relaxed text-[#E5E7EB] sm:text-base">
                Picking colors should not block the project. Kompi gives you a handful of
                strong starting points so you can decide quickly, document the palette, and
                keep moving.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 rounded-[2rem] bg-[#020617] sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-[#E5E7EB]">
                  Kompi tools are designed for small, confidence-boosting wins that compound.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              CALMER BRAND AND UI DECISIONS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less color-wheel anxiety, more “this feels right, let’s ship”.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Finally stopped overthinking my palette”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “Seeing everything at full height like a real interface made it easy to pick one
                palette and move on with the launch.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great for client design workshops”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We use the Kompi color generator at the start of brand projects to explore
                directions and lock decisions before we hit Figma.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 ring-1 ring-[#E5E7EB]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Fast, clean, and not overwhelming”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “The palettes feel modern and usable, not random neon explosions. Perfect for SaaS
                and product work.”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the Kompi color palette generator?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here is what people usually ask before they make this part of their brand and
              product setup whenever they start something new.
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

      <script
        type="application/ld+json"
         
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
