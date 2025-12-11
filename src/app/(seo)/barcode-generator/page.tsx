// src/app/(seo)/barcode-generator/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { BarcodeGenerator } from "@/components/tools/BarcodeGenerator";

const DOMAIN = "https://kompi.app";
const SEO_VIDEO_SRC = "/seo/barcode-generator.mp4";
const SEO_VIDEO_ABS = `${DOMAIN}${SEO_VIDEO_SRC}`;
const SEO_THUMBNAIL_ABS = `${DOMAIN}/kompi-platform.png`;

type FaqItem = {
  question: string;
  answer: string;
};

type HowToStep = {
  position: number;
  name: string;
  text: string;
};

const faqs: FaqItem[] = [
  {
    question: "What is a barcode generator and how does it work?",
    answer:
      "A barcode generator is an online tool that converts product codes, SKUs, GTINs or internal references into a scannable barcode image. Kompi’s barcode generator lets you choose the barcode type, enter your data, preview the result and download high-quality PNG or SVG barcodes for labels, packaging and documents.",
  },
  {
    question: "Is the Kompi barcode generator free to use?",
    answer:
      "Yes. You can use Kompi’s barcode generator online for free to create and download barcodes for everyday use. When you’re ready for more, you can upgrade to a Kompi workspace for features like QR codes, analytics, dynamic links and team collaboration.",
  },
  {
    question: "Which barcode formats can I create with Kompi?",
    answer:
      "Kompi supports popular 1D barcode types used in retail, ecommerce and logistics, including Code 128, EAN-13, EAN-8, UPC-A, UPC-E and Code 39. Pick the format that matches your POS system, warehouse scanners or marketplace requirements before generating your barcode.",
  },
  {
    question: "Can I download barcodes as high-quality PNG or SVG?",
    answer:
      "Yes. After you generate a barcode with Kompi, you can download it as a high-resolution PNG image or as a vector-based SVG. PNG is ideal for quick print and digital use, while SVG is perfect for professional printing where you might resize the barcode without losing sharpness.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No. Kompi’s barcode generator runs fully in your browser. You don’t need any desktop software or driver configuration — just open the page, enter your data and download your barcode from any modern device.",
  },
  {
    question: "Can I use Kompi barcodes in a physical retail store?",
    answer:
      "Absolutely. Many merchants use Kompi to generate barcodes that are compatible with their scanners and POS systems. Just be sure you’re using valid product identifiers such as GTIN or EAN codes when required by your retail partners or marketplaces.",
  },
  {
    question: "What’s the difference between barcodes and QR codes?",
    answer:
      "Barcodes are 1D codes made of vertical lines that encode a limited amount of numeric or alphanumeric data, ideal for products, inventory and logistics. QR codes are 2D codes that can store more data, such as URLs, menus and contact cards. Kompi supports both barcodes and QR codes so you can handle product identification and customer experiences in one platform.",
  },
  {
    question: "Can I track scans from my barcodes?",
    answer:
      "Standard 1D barcodes don’t include analytics by themselves, but Kompi helps you connect barcodes to smart destinations. For example, combine barcodes with Kompi Links and QR codes that route through trackable URLs, so you can understand engagement alongside your other QR and link campaigns.",
  },
  {
    question: "Is there a limit to how many barcodes I can generate?",
    answer:
      "For normal usage there’s effectively no practical limit — you can generate as many barcodes as you need for SKUs, shelves, bins and internal labels. If you’re automating barcode generation at scale, using Kompi workspaces and a paid plan is recommended for reliability and collaboration.",
  },
];

const howToSteps: HowToStep[] = [
  {
    position: 1,
    name: "Choose your barcode format",
    text: "Open Kompi’s barcode generator and select the barcode type that fits your use case, such as Code 128 for flexible alphanumeric codes or EAN-13 for retail product barcodes.",
  },
  {
    position: 2,
    name: "Enter the data to encode",
    text: "Paste or type the value you want to encode in the barcode. This could be a GTIN, EAN, SKU, internal location code or any supported alphanumeric string.",
  },
  {
    position: 3,
    name: "Adjust size, margins and label text",
    text: "Use the customization options to tweak the height, width, quiet zone and optional human-readable label so your barcode fits perfectly into your label or packaging design.",
  },
  {
    position: 4,
    name: "Generate, test and download",
    text: "Generate your barcode, test it with a scanner or smartphone app, then download it as a high-quality PNG or SVG for use in documents, labels, boxes or signage.",
  },
];

export const metadata: Metadata = {
  title: "Free Online Barcode Generator | Create Barcodes Fast with Kompi",
  description:
    "Generate barcodes online in seconds. Use Kompi’s free barcode generator to create Code 128, EAN-13, UPC and more. Download print-ready PNG or SVG barcodes for products, inventory and logistics.",
  keywords: [
    "barcode generator",
    "online barcode generator",
    "free barcode maker",
    "create barcodes online",
    "Code 128 generator",
    "EAN-13 barcode generator",
    "UPC barcode generator",
    "product barcode generator",
    "inventory barcode labels",
    "barcode image PNG",
    "vector barcode SVG",
    "retail barcode creator",
    "barcode generator for ecommerce",
    "GS1 barcode compatible",
    "barcode and QR code platform",
    "Kompi barcode tool",
  ],
  alternates: {
    canonical: "/barcode-generator",
  },
  openGraph: {
    title: "Free Online Barcode Generator | Create Barcodes Fast with Kompi",
    description:
      "Create scan-ready barcodes for products, shelves and inventory. Kompi’s online barcode generator supports Code 128, EAN, UPC and more, with print-ready PNG and SVG exports.",
    url: `${DOMAIN}/barcode-generator`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Barcode Generator | Create Barcodes Fast with Kompi",
    description:
      "Generate Code 128, EAN-13, UPC and more with Kompi’s barcode generator. Download high-quality barcode images and connect them with QR codes and smart links.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* -------------------------------------------------------------------------- */
/*  HERO – barcode-focused intro                                             */
/* -------------------------------------------------------------------------- */

function BarcodeHeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 transform-gpu blur-3xl">
        <div className="mx-auto h-48 max-w-3xl bg-gradient-to-r from-[#f97316]/15 via-[#4b5563]/10 to-[#22c55e]/20 opacity-80" />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 pb-10 pt-12 text-center sm:px-6 md:pb-14 md:pt-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#111827] shadow-sm ring-1 ring-neutral-200">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[10px] font-semibold text-white">
            K
          </span>
          <span>Kompi Tools · Free online barcode generator</span>
        </div>

        <div className="space-y-6 sm:space-y-7">
          <h1 className="text-3xl font-semibold tracking-tight text-[#050505] sm:text-4xl md:text-5xl">
            Free{" "}
            <span className="bg-[linear-gradient(120deg,#0f172a,#4b5563,#111827)] bg-clip-text text-transparent">
              barcode generator
            </span>{" "}
            to turn product codes into scan-ready barcodes.
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
            Use Kompi&apos;s fast online barcode generator to create barcodes for products, shelves
            and inventory. Choose your format, paste your code and download crisp PNG or SVG
            barcodes ready for print and scanning.
          </p>

          <p className="mx-auto max-w-xl text-xs leading-relaxed text-[#6B7280] sm:text-sm">
            No clunky desktop software — just clean, reliable barcodes that work with POS systems,
            warehouse scanners and ecommerce workflows. Perfect for small brands, warehouses,
            agencies and creators.
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#barcode-generator-tool"
              className="inline-flex items-center justify-center rounded-full bg-[#111827] px-7 py-3 text-sm font-medium text-[#F9FAFB] shadow-md shadow-[#111827]/25 transition hover:bg-black"
            >
              Generate barcodes
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-[#111827] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#111827] shadow-sm hover:bg-[#F7F7F3]"
            >
              Save barcodes in my Kompi workspace
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-neutral-200">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>Code 128, EAN, UPC & more</span>
            </div>
            <span>• High-res PNG & SVG outputs</span>
            <span>• Works with POS & warehouse scanners</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  TOOL SECTION – render BarcodeGenerator directly                          */
/* -------------------------------------------------------------------------- */

function BarcodeToolSection() {
  return (
    <section
      id="barcode-generator-tool"
      className="px-4 pt-2 md:pt-4"
      aria-label="Kompi barcode generator tool"
    >
      <div className="mx-auto max-w-5xl space-y-4">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5 text-left">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
              Try the Kompi barcode generator
            </h2>
            <p className="max-w-2xl text-xs text-neutral-600 sm:text-sm">
              Choose your barcode type, paste your product or inventory code, and export a crisp,
              scan-ready barcode image. Perfect for retail labels, warehouse bins, packaging and
              documentation.
            </p>
          </div>
          <p className="text-xs text-neutral-500">
            Looking for QR codes instead?{" "}
            <Link
              href="/qr-code-generator"
              className="font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
            >
              Open the QR code generator
            </Link>
            .
          </p>
        </header>

        {/* Unwrapped tool component so we don't pull in dashboard UI */}
        <div className="rounded-[2rem] bg-white border border-neutral-200 shadow-sm p-3 sm:p-4 md:p-5">
          <BarcodeGenerator />
        </div>

        <div className="grid gap-4 pt-1 text-xs text-neutral-600 sm:grid-cols-3 sm:text-sm">
          <div>
            <h3 className="font-semibold text-neutral-900">Barcode + QR in one place</h3>
            <p>
              Use this barcode generator alongside{" "}
              <Link
                href="/kr-codes"
                className="font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
              >
                Kompi KR Codes
              </Link>{" "}
              to manage both QR codes and barcodes inside one workspace.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Connect to smarter links</h3>
            <p>
              Point offline materials to branded short URLs using{" "}
              <Link
                href="/links"
                className="font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
              >
                Kompi Links
              </Link>{" "}
              and keep full control of destinations.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-neutral-900">Campaign tracking ready</h3>
            <p>
              Combine barcodes with QR codes that include UTM parameters from the{" "}
              <Link
                href="/tools/utm-builder"
                className="font-medium text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
              >
                UTM builder
              </Link>{" "}
              for end-to-end attribution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  VIDEO SECTION                                                            */
/* -------------------------------------------------------------------------- */

function BarcodeVideoSection() {
  return (
    <section className="px-4 mt-12 md:mt-14">
      <div className="mx-auto max-w-5xl space-y-6 text-center">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Watch how to generate barcodes with Kompi
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
            See the barcode generator in action — from choosing the right format to downloading
            print-ready barcodes you can drop into labels, packaging and documentation.
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-[2rem] bg-white border border-neutral-200 shadow-sm p-3 sm:p-4 md:p-5">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900/80 flex items-center justify-center">
            <video
              className="h-full w-full"
              src={SEO_VIDEO_SRC}
              controls
              preload="metadata"
              poster="/kompi-platform.png"
            >
              Sorry, your browser doesn&apos;t support embedded videos. You can watch it directly
              at <a href={SEO_VIDEO_SRC}>this link</a>.
            </video>
          </div>
        </div>

        <p className="text-xs text-neutral-600 sm:text-sm">
          Follow along in your own browser and use the live generator above to create your first
          barcodes in under a minute.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  LONG-FORM ARTICLE                                                        */
/* -------------------------------------------------------------------------- */

function BarcodeLongFormArticleSection() {
  return (
    <section
      className="px-4 mt-14 md:mt-16"
      aria-labelledby="barcode-guide-heading"
    >
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white border border-neutral-200 shadow-sm p-6 md:p-8 lg:p-10 space-y-8 text-neutral-800 text-sm md:text-base leading-relaxed">
        <header className="space-y-3">
          <h2
            id="barcode-guide-heading"
            className="text-2xl md:text-3xl font-semibold tracking-tight"
          >
            How to generate barcodes online for products, shelves and inventory
          </h2>
          <p>
            Barcodes might feel old-school compared to QR codes, but they’re still the backbone of
            retail, ecommerce and logistics. They make scanners fast, databases reliable and
            inventory much easier to control. The problem is that many barcode tools still feel
            like they were built a decade ago. Kompi’s{" "}
            <strong>online barcode generator</strong> brings barcodes into the same clean, modern
            toolkit you already use for QR codes, links and menus.
          </p>
        </header>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Why teams still rely on 1D barcodes in a QR-first world
          </h3>
          <p>
            QR codes have become the default for customer-facing experiences. They&apos;re perfect
            for menus, campaigns, subscriptions and everything where you want people to scan and
            land on a URL. But behind the scenes — inside warehouses, stockrooms and supply chains —
            one-dimensional barcodes remain king.
          </p>
          <p>
            They&apos;re simple, fast and deeply integrated into POS systems, scanners and ERPs all
            over the world. When a cashier scans an item, when a picker scans a bin location, or
            when a warehouse records a pallet, they&apos;re almost always working with traditional
            barcodes. Kompi lets you generate those same barcodes online, while still giving you
            access to tools like the{" "}
            <Link
              href="/qr-code-generator"
              className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
            >
              QR code generator
            </Link>{" "}
            and{" "}
            <Link
              href="/qr-code/with-logo"
              className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
            >
              QR code with logo
            </Link>{" "}
            for richer customer journeys.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Picking the right barcode type for your workflow
          </h3>
          <p>
            Different barcode formats solve different problems. The Kompi barcode generator lets
            you choose the type that matches your hardware and standards:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Code 128:</strong> high-density, flexible and supports a wide range of
              characters. It&apos;s ideal for logistics labels, internal codes and custom
              workflows where you control the data.
            </li>
            <li>
              <strong>EAN-13 / EAN-8:</strong> standard retail barcodes across much of the world.
              If you&apos;re selling in supermarkets or major retailers, this is often what they
              expect on your packaging.
            </li>
            <li>
              <strong>UPC-A / UPC-E:</strong> similar to EAN but more common in North America.
              These are widely used on consumer goods and everyday items in stores.
            </li>
            <li>
              <strong>Code 39:</strong> simple, robust and perfect for internal asset labels,
              equipment tags, ID badges and documents where you need basic alphanumeric codes.
            </li>
          </ul>
          <p>
            When in doubt, check what your scanner or POS system expects. Many devices support
            multiple formats, but marketplaces and large retailers often specify exactly which type
            and structure you should use. Kompi gives you the flexibility to experiment, then lock
            in a standard once you know what works best.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            From code to label: best practices for scannable barcodes
          </h3>
          <p>
            Even the best barcode generator can’t rescue bad data. Good barcoding starts with
            clear, consistent identifiers. For products, this usually means officially issued GTIN
            or EAN codes. For internal use, it means defined naming conventions: product-SKU,
            aisle-row-bin, asset-category-ID and so on.
          </p>
          <p>
            Once your data is in a good place, Kompi makes it straightforward to turn those values
            into barcodes:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Choose the barcode format your scanner or POS supports.</li>
            <li>Paste or type the exact code you want to encode, without extra spaces.</li>
            <li>Decide whether to show a human-readable label below the bars.</li>
            <li>Generate the barcode and test it with your scanner or a phone app.</li>
          </ol>
          <p>
            If a barcode doesn’t scan reliably, check that it’s large enough, printed sharply and
            has enough quiet space (blank margin) around it. The barcodes from Kompi are optimised
            for clarity, but low-quality printers or smudged labels can still cause problems —
            especially on very small stickers.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Using barcodes alongside QR codes and smart links
          </h3>
          <p>
            Barcodes are great for machines. QR codes are great for people. With Kompi, they don’t
            have to live in separate universes. You can use barcodes wherever scanners are
            involved, then layer QR codes on top for human journeys.
          </p>
          <p>
            For example, you could:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Put a barcode and QR code side-by-side on packaging so staff can scan barcodes into
              stock systems while customers scan QR codes to view product pages.
            </li>
            <li>
              Use barcodes to label shelf locations, and add QR codes that open a{" "}
              <Link
                href="/qr-menus"
                className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
              >
                QR menu
              </Link>{" "}
              or SOP for that area.
            </li>
            <li>
              Combine barcodes with a digital business card powered by{" "}
              <Link
                href="/k-cards"
                className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
              >
                K-Cards
              </Link>{" "}
              for staff or field reps — barcodes for internal ID, QR codes for contact details.
            </li>
          </ul>
          <p>
            Behind the scenes, you can route QR codes and links through{" "}
            <Link
              href="/links"
              className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
            >
              Kompi Links
            </Link>{" "}
            and the{" "}
            <Link
              href="/tools/utm-builder"
              className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
            >
              UTM builder
            </Link>{" "}
            to track engagement and understand which placements perform best.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl md:text-2xl font-semibold">
            Scaling from a handful of SKUs to thousands
          </h3>
          <p>
            Many teams start by creating just a few barcodes for a pilot project or a handful of
            products. Over time, those needs grow: more SKUs, more shelves, more locations and more
            people who all need access to the same barcodes and QR codes.
          </p>
          <p>
            Kompi is built to handle that journey. You can begin with simple free usage of the{" "}
            <strong>barcode generator</strong>, then move into workspaces where you manage QR
            codes, links and creator tools for your whole team. Because everything lives inside one
            interface, you don’t end up with different teams using different random generators and
            file naming conventions.
          </p>
          <p>
            In short: you get the simplicity of a single-purpose barcode maker, plus the
            flexibility of a broader growth stack when you’re ready for it.
          </p>
        </section>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  USE CASE / TYPES SECTION                                                 */
/* -------------------------------------------------------------------------- */

function BarcodeUseCasesSection() {
  return (
    <section className="bg-[#FFFFFF] border-top border-neutral-200 mt-16 md:mt-20">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-10">
        <header className="mx-auto max-w-3xl space-y-3 text-center">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#111827] sm:text-sm">
            BARCODES FOR EVERYDAY OPERATIONS
          </h2>
          <p className="text-2xl md:text-3xl font-semibold tracking-tight">
            One barcode generator, many very normal use cases.
          </p>
          <p className="text-sm md:text-base text-[#4B5563]">
            Kompi&apos;s <strong>free online barcode generator</strong> works across retail,
            ecommerce, warehouses and events. Start small or roll it out across your whole workspace
            — without changing tools later.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-6 ring-1 ring-[#E5E7EB]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                RETAIL & ECOMMERCE
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-[#111827]">
                Product & shelf labels
              </h3>
              <p className="text-sm text-[#4B5563]">
                Give every SKU and shelf location a scan-ready barcode your staff can rely on at
                checkout and in stock counts.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                <li>• Turn SKUs and GTINs into labels</li>
                <li>• Use EAN or UPC formats for retail</li>
                <li>• Pair with QR codes for customers</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-[#DBEAFE] p-6 ring-2 ring-[#1D4ED8]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-3 py-1 text-[11px] font-semibold text-[#EFF6FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                Recommended
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-[#111827]">
                Warehousing & logistics
              </h3>
              <p className="text-sm text-[#111827]">
                Use Code 128 and similar formats to mark locations, totes, pallets and manifests in
                fast-moving environments.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                <li>• Label aisle / rack / bin locations</li>
                <li>• Speed up picking and put-away</li>
                <li>• Reduce mis-scans and manual entry</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-[#ECFDF5] p-6 ring-1 ring-[#A7F3D0]">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#047857]">
                INTERNAL & EVENTS
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-[#111827]">
                Assets, passes & docs
              </h3>
              <p className="text-sm text-[#4B5563]">
                Attach barcodes to devices, badges and files so you always have a scannable
                identifier, no matter where it goes.
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                <li>• Track laptops, cameras and gear</li>
                <li>• Add barcodes to ID cards & passes</li>
                <li>• Combine with QR codes for extra info</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  WHY KOMPI                                                                */
/* -------------------------------------------------------------------------- */

function BarcodeWhyKompiSection() {
  return (
    <section className="bg-[#F7F7F3] border-t border-neutral-200">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-8">
        <header className="space-y-3 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Why use Kompi as your barcode generator?
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-neutral-600">
            Instead of a one-off barcode site, you get a clean{" "}
            <strong>online barcode generator</strong> plus a full Kompi toolkit for QR codes, links,
            menus and growth workflows.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white border border-neutral-200 p-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-700">
              MODERN INTERFACE
            </p>
            <h3 className="text-sm font-semibold text-neutral-900">
              No outdated desktop software
            </h3>
            <p className="text-xs md:text-sm text-neutral-600">
              Generate barcodes from your browser, share them with your team and reuse them across
              labels and documents — without installing anything.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-emerald-200 p-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">
              ONE TOOLKIT
            </p>
            <h3 className="text-sm font-semibold text-neutral-900">
              Barcodes, QR and links together
            </h3>
            <p className="text-xs md:text-sm text-neutral-600">
              Use barcodes for systems and QR codes for people. Everything routes through the same
              Kompi workspace for a consistent stack.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-neutral-200 p-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
              READY TO SCALE
            </p>
            <h3 className="text-sm font-semibold text-neutral-900">
              Built for teams & agencies
            </h3>
            <p className="text-xs md:text-sm text-neutral-600">
              Start as a solo user, then add teammates, clients and brands. Kompi workspaces keep
              everything organised as you grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  COMPARISON TABLE                                                         */
/* -------------------------------------------------------------------------- */

function BarcodeComparisonSection() {
  return (
    <section className="bg-[#f7f7f4] border-t border-neutral-200">
      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-6">
        <header className="space-y-3 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Kompi barcode generator vs typical barcode tools
          </h2>
          <p className="text-sm md:text-base text-neutral-700">
            Many barcode tools were designed around desktop print workflows. Kompi is built around
            modern teams who also use QR codes, links and analytics — all in one place.
          </p>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs md:text-sm">
            <thead>
              <tr className="border-b border-neutral-300 bg-white">
                <th className="py-3 pr-4 font-semibold">Feature</th>
                <th className="py-3 px-4 font-semibold">Kompi barcode generator</th>
                <th className="py-3 px-4 font-semibold">Traditional tools</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Access</td>
                <td className="py-3 px-4">Web-based, works in any modern browser.</td>
                <td className="py-3 px-4">Often Windows-only desktop apps.</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Integration with QR codes</td>
                <td className="py-3 px-4">
                  Deeply integrated with{" "}
                  <Link
                    href="/kr-codes"
                    className="underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-700"
                  >
                    KR Codes
                  </Link>{" "}
                  and QR tools.
                </td>
                <td className="py-3 px-4">Usually barcode-only, no QR features.</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Output formats</td>
                <td className="py-3 px-4">High-res PNG and vector-friendly SVG.</td>
                <td className="py-3 px-4">PNG, sometimes limited vector support.</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Team & workspace support</td>
                <td className="py-3 px-4">
                  Workspaces for brands, teams and agencies with shared tools.
                </td>
                <td className="py-3 px-4">Single-user licences on individual machines.</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 pr-4">Part of a growth stack</td>
                <td className="py-3 px-4">
                  Connects to links, QR menus,{" "}
                  <Link
                    href="/k-cards"
                    className="underline underline-offset-2 decoration-neutral-300 hover:decoration-neutral-700"
                  >
                    K-Cards
                  </Link>{" "}
                  and more.
                </td>
                <td className="py-3 px-4">Rarely integrated with broader tools.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Onboarding & learning curve</td>
                <td className="py-3 px-4">Clean UI, quick to learn for non-technical users.</td>
                <td className="py-3 px-4">Complex UIs, manual templates & setup.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs md:text-sm text-neutral-600">
          Already using Kompi for QR codes or menus? Adding the{" "}
          <strong>barcode generator</strong> is a natural extension — no new logins, no extra
          systems and no extra training for your team.
        </p>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ / TRUST / RELATED LINKS                                              */
/* -------------------------------------------------------------------------- */

function BarcodeFaqSection() {
  return (
    <section className="bg-[#f7f7f4] border-t border-neutral-200">
      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <header className="mb-6 space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Barcode generator FAQs
          </h2>
          <p className="text-sm md:text-base text-neutral-700">
            Everything you need to know about using Kompi as your online barcode generator for
            products, shelves and internal workflows.
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-neutral-200 bg-white p-4 md:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2">
                <span className="text-sm md:text-base font-medium">{faq.question}</span>
                <span className="hidden text-xs text-neutral-500 group-open:inline">−</span>
                <span className="inline text-xs text-neutral-500 group-open:hidden">+</span>
              </summary>
              <p className="mt-3 text-xs md:text-sm text-neutral-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function BarcodeTrustSection() {
  return (
    <section className="bg-white border-t border-neutral-200">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-12 space-y-4 text-xs md:text-sm text-neutral-700">
        <h2 className="text-base md:text-lg font-semibold tracking-tight">
          Reliability, privacy and responsible barcode use
        </h2>
        <p>
          Kompi provides tools to help you generate and manage barcodes and QR codes. As with any
          code, the quality of the experience depends on the data behind it and how you print and
          share it. Use clear, consistent identifiers, print at appropriate sizes and always test
          your barcodes before rolling them out at scale.
        </p>
        <p>
          For QR codes and smart links, Kompi lets you keep control over destinations and campaigns.
          You can update or pause links without reprinting when you use dynamic setups, and keep
          everything connected to a single workspace for your team.
        </p>
        <p>
          By combining barcodes, QR codes and links under one roof, Kompi helps you build workflows
          that feel reliable for staff and safe for customers — across packaging, menus, assets and
          more.
        </p>
      </div>
    </section>
  );
}

function BarcodeRelatedLinksSection() {
  return (
    <section className="bg-[#f7f7f4] border-t border-neutral-200">
      <div className="mx-auto max-w-4xl px-4 py-10 md:py-12 space-y-4">
        <h2 className="text-base md:text-lg font-semibold tracking-tight">
          Related Kompi tools & pages
        </h2>
        <p className="text-xs md:text-sm text-neutral-700">
          Explore more Kompi tools that pair perfectly with your barcodes:
        </p>
        <ul className="grid gap-3 md:grid-cols-2 text-xs md:text-sm">
          <li>
            <Link
              href="/qr-code-generator"
              className="inline-flex w-full items-center justify-between rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-neutral-400 transition-colors"
            >
              <span>QR code generator</span>
              <span>↗</span>
            </Link>
          </li>
          <li>
            <Link
              href="/qr-code/with-logo"
              className="inline-flex w-full items-center justify-between rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-neutral-400 transition-colors"
            >
              <span>QR code generator with logo</span>
              <span>↗</span>
            </Link>
          </li>
          <li>
            <Link
              href="/qr-menus"
              className="inline-flex w-full items-center justify-between rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-neutral-400 transition-colors"
            >
              <span>QR menus for restaurants</span>
              <span>↗</span>
            </Link>
          </li>
          <li>
            <Link
              href="/k-cards"
              className="inline-flex w-full items-center justify-between rounded-2xl bg-white border border-neutral-200 px-4 py-3 hover:border-neutral-400 transition-colors"
            >
              <span>Kompi Cards – digital business cards</span>
              <span>↗</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD                                                                  */
/* -------------------------------------------------------------------------- */

function getWebAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Kompi Barcode Generator",
    applicationCategory: "UtilityApplication",
    description:
      "Free online barcode generator by Kompi. Create Code 128, EAN-13, UPC and other barcodes, then download print-ready PNG or SVG files for your products and inventory.",
    operatingSystem: "Any",
    url: `${DOMAIN}/barcode-generator`,
  };
}

function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function getHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate a barcode with Kompi",
    description:
      "Simple steps for creating a barcode using Kompi's free online barcode generator tool.",
    step: howToSteps.map((step) => ({
      "@type": "HowToStep",
      position: step.position,
      name: step.name,
      text: step.text,
    })),
  };
}

function getVideoSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "How to use Kompi's barcode generator",
    description:
      "Step-by-step walkthrough of creating barcodes online with Kompi, choosing the right format and downloading print-ready assets.",
    thumbnailUrl: [SEO_THUMBNAIL_ABS],
    uploadDate: "2025-01-01",
    contentUrl: SEO_VIDEO_ABS,
    embedUrl: SEO_VIDEO_ABS,
  };
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                     */
/* -------------------------------------------------------------------------- */

export default function BarcodeGeneratorSeoPage() {
  const webAppSchema = getWebAppSchema();
  const faqSchema = getFaqSchema();
  const howToSchema = getHowToSchema();
  const videoSchema = getVideoSchema();

  const jsonLd = [webAppSchema, faqSchema, howToSchema, videoSchema];

  return (
    <>
      <Script
        id="barcode-generator-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />
        <main className="pt-16 md:pt-20 pb-20 space-y-16 md:space-y-20">
          <section className="px-4">
            <div className="mx-auto max-w-5xl">
              <BarcodeHeroSection />
            </div>
          </section>

          <BarcodeToolSection />
          <BarcodeVideoSection />
          <BarcodeLongFormArticleSection />
          <BarcodeUseCasesSection />
          <BarcodeWhyKompiSection />
          <BarcodeComparisonSection />
          <BarcodeFaqSection />
          <BarcodeTrustSection />
          <BarcodeRelatedLinksSection />
        </main>
        <FooterCTA />
      </div>
    </>
  );
}
