// src/app/(seo)/barcode-generator/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import {
Barcode,
  Boxes,
  Download,
    Layers,
    Truck,
  Zap,
  ShieldCheck,
} from "lucide-react";
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
  alternates: { canonical: "/barcode-generator" },
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
  robots: { index: true, follow: true },
};

/* -------------------------------------------------------------------------- */
/*  SMALL UI PRIMITIVES (same vibe as /qr-gen-online)                          */
/* -------------------------------------------------------------------------- */

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-4">{children}</div>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-[0.34em] text-[#5177e1]">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto max-w-2xl text-center text-base md:text-lg leading-relaxed text-neutral-600">
      {children}
    </p>
  );
}

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-neutral-200 bg-white shadow-sm ${className}`}>
      {children}
    </section>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 py-10 sm:px-10 sm:py-12">{children}</div>;
}

function Figure({
  src,
  alt,
  aspect = "aspect-[16/10]",
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  priority?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      <div className={`relative w-full ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  HERO                                                                      */
/* -------------------------------------------------------------------------- */

function BarcodeIntroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-24 -z-10 transform-gpu blur-3xl">
        <div className="mx-auto h-56 max-w-3xl bg-gradient-to-r from-[#FDBA74] via-[#9BDFD1] to-[#4B9FFF] opacity-70" />
      </div>

      <div className="mx-auto flex flex-col items-center justify-center py-14 md:py-20 text-center">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-neutral-200">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1E2330] text-[10px] font-semibold text-white">
            K
          </span>
          <span>Kompi Tools · Free online barcode generator</span>
        </div>

        <div className="space-y-7 md:space-y-9">
          <h1 className="text-center text-5xl md:text-6xl font-extrabold tracking-tight text-[#0B0F1A]">
            Free{" "}
            <span className="bg-gradient-to-r from-[#FDBA74] to-[#4B9FFF] bg-clip-text text-transparent">
              barcode generator
            </span>{" "}
            for products, shelves and inventory.
          </h1>

          <p className="mx-auto max-w-3xl text-lg md:text-xl leading-relaxed text-neutral-700">
            Generate Code 128, EAN, UPC and more in seconds. Paste your data, preview instantly,
            then download crisp PNG or SVG barcodes ready for labels, packaging and documents.
          </p>

          <p className="mx-auto max-w-xl text-sm md:text-base leading-relaxed text-neutral-600">
            No desktop software. Runs fully in your browser. Built to feel like a modern tool — not a legacy barcode site.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#barcode-generator-tool"
              className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] shadow-md shadow-[#1E2330]/25 transition hover:bg-black"
            >
              Generate barcodes
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
            >
              Save barcodes in my Kompi workspace
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 text-sm font-medium text-neutral-600">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-neutral-200">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
              <span>Code 128, EAN, UPC &amp; more</span>
            </div>
            <span>• Print-ready PNG &amp; SVG</span>
            <span>• Works with POS &amp; scanners</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  TOOL                                                                      */
/* -------------------------------------------------------------------------- */

function BarcodeToolSection() {
  return (
    <section id="barcode-generator-tool" className="scroll-mt-28">
      <Container>
        <Card className="bg-white">
          <CardBody>
            <Eyebrow>TRY IT NOW</Eyebrow>
            <SectionTitle>Generate your barcode</SectionTitle>
            <SectionSub>
              Choose a barcode type, paste your value, preview instantly — then download a crisp barcode file.
              Looking for QR codes?{" "}
              <Link
                href="/qr-code-generator"
                className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
              >
                Open the QR code generator
              </Link>
              .
            </SectionSub>

            <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-3 sm:p-4 md:p-6 shadow-sm">
              <BarcodeGenerator />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3 text-sm md:text-base text-neutral-600">
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Barcode + QR in one place</h3>
                <p>
                  Use barcodes alongside{" "}
                  <Link
                    href="/kr-codes"
                    className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                  >
                    KR Codes
                  </Link>{" "}
                  to keep everything organised inside one workspace.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Connect to smarter links</h3>
                <p>
                  Pair offline materials with branded URLs via{" "}
                  <Link
                    href="/links"
                    className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                  >
                    Kompi Links
                  </Link>{" "}
                  for clean destinations and full control.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-neutral-900">Campaign tracking ready</h3>
                <p>
                  Add UTMs with the{" "}
                  <Link
                    href="/tools/utm-builder"
                    className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700"
                  >
                    UTM builder
                  </Link>{" "}
                  to connect offline placements to analytics.
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  ICON FEATURES                                                             */
/* -------------------------------------------------------------------------- */

function IconFeature({
  icon,
  bg,
  title,
  children,
}: {
  icon: React.ReactNode;
  bg: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: bg }}>
        <div className="h-5 w-5 text-[#0B0F1A]">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-[#0B0F1A]">{title}</h3>
      <p className="text-sm leading-relaxed text-neutral-600">{children}</p>
    </div>
  );
}

function BarcodeFeatureIcons() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <Eyebrow>FEATURES</Eyebrow>
            <SectionTitle>Everything you expect from a modern barcode generator</SectionTitle>
            <SectionSub>
              Fast previews, clean downloads, and formats that work with retail, warehousing and internal ops.
            </SectionSub>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <IconFeature icon={<Zap className="h-5 w-5" />} bg="#E0F2FE" title="Instant preview">
              Paste your code and see the barcode update immediately — no slow refresh loops.
            </IconFeature>

            <IconFeature icon={<Barcode className="h-5 w-5" />} bg="#DCFCE7" title="Popular formats">
              Generate Code 128, EAN-13/8, UPC-A/E, Code 39 and more — depending on your workflow.
            </IconFeature>

            <IconFeature icon={<Download className="h-5 w-5" />} bg="#FEF3C7" title="Crisp exports">
              Download high-quality PNG for everyday print, or SVG when you need sharp scaling.
            </IconFeature>

            <IconFeature icon={<ShieldCheck className="h-5 w-5" />} bg="#EDE9FE" title="Scanner-friendly">
              Designed for readability and quiet space so scanners and POS systems pick it up reliably.
            </IconFeature>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  VIDEO                                                                      */
/* -------------------------------------------------------------------------- */

function BarcodeVideoSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>60-SECOND DEMO</Eyebrow>
            <SectionTitle>Watch how the barcode generator works</SectionTitle>
            <SectionSub>
              Choose a format, paste your code, preview instantly — then download a print-ready barcode file.
            </SectionSub>
          </div>

          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-neutral-200 bg-black shadow-sm">
            <video className="aspect-video w-full object-cover" src={SEO_VIDEO_SRC} autoPlay muted loop playsInline preload="metadata" />
          </div>

          <p className="text-center text-sm text-neutral-600">
            Want QR codes too?{" "}
            <Link href="/qr-gen-online" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
              Try the free QR gen online
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  LONG-FORM (BROKEN INTO CARDS)                                              */
/* -------------------------------------------------------------------------- */

function BarcodeLongFormArticle() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4]" aria-labelledby="barcode-guide-heading">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <Card>
            <CardBody>
              <Eyebrow>BARCODE GUIDE</Eyebrow>
              <h2 id="barcode-guide-heading" className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                What is a barcode generator, and when should you use one?
              </h2>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                Barcodes are still the backbone of retail, inventory and logistics. They’re fast for scanners, reliable for systems,
                and universally supported by POS setups. Kompi’s <strong>online barcode generator</strong> keeps the workflow clean:
                pick a format, encode your value, then export a crisp asset you can print anywhere.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                <Figure src="/kompi-platform.png" alt="Kompi platform UI" aspect="aspect-[16/10]" priority />
                <Figure src="/kompi-analytics.png" alt="Kompi analytics UI" aspect="aspect-[16/10]" />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>CHOOSING FORMATS</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Picking the right barcode type
              </h3>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                Different barcode standards exist for different environments. Here’s a simple mental model:
              </p>

              <ul className="mt-8 mx-auto max-w-3xl space-y-4 text-left text-base md:text-lg leading-relaxed text-neutral-700 list-disc list-inside">
                <li>
                  <strong>Code 128:</strong> flexible and high-density — great for logistics, internal labels and alphanumeric IDs.
                </li>
                <li>
                  <strong>EAN-13 / EAN-8:</strong> common retail barcodes across many regions — often required for packaged goods.
                </li>
                <li>
                  <strong>UPC-A / UPC-E:</strong> widely used in North America for consumer products.
                </li>
                <li>
                  <strong>Code 39:</strong> simple and robust — good for assets, documents, badges and internal tracking.
                </li>
              </ul>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                If your retailer, marketplace, or scanner vendor specifies a format — follow that spec. Otherwise, Code 128 is a strong default for internal workflows.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Eyebrow>BEST PRACTICES</Eyebrow>
              <h3 className="mt-4 text-center text-4xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
                Print, size and scan reliability
              </h3>

              <p className="mt-6 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                A good barcode is mostly about clarity: sharp edges, enough quiet space (blank margin), and printing at a sensible size for the scan distance.
                Always print a sample and test it with your actual scanner before rolling out at scale.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-[#E0F2FE] flex items-center justify-center">
                      <Boxes className="h-5 w-5 text-[#0B0F1A]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#0B0F1A]">Labels & bins</h4>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    For shelves and bins, prioritize readability over compactness. A slightly larger barcode prevents mis-scans.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                      <Truck className="h-5 w-5 text-[#0B0F1A]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#0B0F1A]">Packaging</h4>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Avoid curved or glossy areas when possible. Test under real lighting and handling.
                  </p>
                </div>

                <div className="rounded-3xl border border-neutral-200 bg-white p-7 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-[#EDE9FE] flex items-center justify-center">
                      <Layers className="h-5 w-5 text-[#0B0F1A]" />
                    </div>
                    <h4 className="text-lg font-semibold text-[#0B0F1A]">Documents</h4>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    PNG works well for docs and quick prints; use SVG if your designer will scale it significantly.
                  </p>
                </div>
              </div>

              <p className="mt-10 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed text-neutral-700">
                For customer-facing experiences, pair barcodes with{" "}
                <Link href="/qr-code-generator" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  QR codes
                </Link>{" "}
                so machines and people both have a clean path.
              </p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  USE CASE CARDS                                                            */
/* -------------------------------------------------------------------------- */

function BarcodeUseCasesSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>BARCODES FOR EVERYDAY OPERATIONS</Eyebrow>
            <SectionTitle>One barcode generator, three very normal use cases.</SectionTitle>
            <SectionSub>
              Retail, warehousing, internal labels — generate barcodes that scan reliably and download assets that print clean.
            </SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">RETAIL & ECOMMERCE</p>
                <h3 className="text-xl font-bold text-[#0B0F1A]">Product & shelf labels</h3>
                <p className="text-base text-neutral-700">
                  Turn SKUs, GTINs and product IDs into scan-ready barcodes for checkout and stock counts.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-700">
                  <li>• EAN / UPC formats for retail</li>
                  <li>• Print clean labels fast</li>
                  <li>• Pair with QR for customers</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#DBEAFE] p-7 ring-2 ring-[#1E2330]">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  Recommended
                </div>
                <h3 className="text-xl font-bold text-[#0B0F1A]">Warehousing & logistics</h3>
                <p className="text-base text-neutral-800">
                  Use Code 128 for locations, totes, pallets and manifests in fast-moving environments.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-800">
                  <li>• Label aisle / rack / bin</li>
                  <li>• Speed up picking</li>
                  <li>• Reduce manual entry</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#ECFDF5] p-7 ring-1 ring-[#A7F3D0]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#047857]">INTERNAL & EVENTS</p>
                <h3 className="text-xl font-bold text-[#0B0F1A]">Assets, passes & docs</h3>
                <p className="text-base text-neutral-700">
                  Add scannable IDs to devices, badges and files so everything stays trackable.
                </p>
                <ul className="mt-3 space-y-2 text-base text-neutral-700">
                  <li>• Track gear and equipment</li>
                  <li>• Add IDs to paperwork</li>
                  <li>• Combine with QR for info</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  STRIP (rectangular, breathing room)                                       */
/* -------------------------------------------------------------------------- */

function BarcodeStripSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="rounded-3xl bg-[#1E2330] px-8 py-14 text-center text-[#E5F9F0] sm:px-12 md:px-16 md:py-20">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Your barcodes shouldn&apos;t live in a totally separate system.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-[#E5E7EB] leading-relaxed">
            Generate barcodes that sit alongside QR codes, links, menus and analytics. One workspace, one workflow — not five random tools.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#barcode-generator-tool"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#111827] hover:bg-[#F7F7F3]"
            >
              Generate barcodes
            </a>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Create free Kompi account
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  WHY KOMPI                                                                 */
/* -------------------------------------------------------------------------- */

function BarcodeWhyKompiSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>WHY KOMPI</Eyebrow>
            <SectionTitle>Why use Kompi as your barcode generator?</SectionTitle>
            <SectionSub>
              You get a clean barcode tool plus a broader Kompi toolkit for QR codes, links, menus and workspaces.
            </SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">MODERN UI</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">No legacy barcode websites</h3>
              <p className="text-base text-neutral-600">
                Generate barcodes fast, preview instantly, and download files that print clean.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-emerald-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600">ONE TOOLKIT</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Barcodes + QR + links</h3>
              <p className="text-base text-neutral-600">
                Keep systems scanning barcodes while people scan QR codes — all inside Kompi.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-neutral-200 p-7 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">READY TO SCALE</p>
              <h3 className="text-xl font-bold text-[#0B0F1A]">Built for teams</h3>
              <p className="text-base text-neutral-600">
                Use workspaces to organise assets across brands, projects, locations and clients.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  COMPARISON                                                                */
/* -------------------------------------------------------------------------- */

function BarcodeComparisonSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>COMPARISON</Eyebrow>
            <SectionTitle>Kompi vs typical barcode tools</SectionTitle>
            <SectionSub>
              Traditional barcode tools are often clunky, desktop-first, and disconnected. Kompi is clean, web-based, and part of a bigger workflow.
            </SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm md:text-base border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="py-4 pr-4 font-bold text-neutral-900">Feature</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Kompi Barcode Generator</th>
                      <th className="py-4 px-4 font-bold text-neutral-900">Typical tools</th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-700">
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Access</td>
                      <td className="py-4 px-4">Runs in your browser, no installs.</td>
                      <td className="py-4 px-4">Often desktop apps or dated sites.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Formats</td>
                      <td className="py-4 px-4">Common retail + ops formats (EAN/UPC/128).</td>
                      <td className="py-4 px-4">Limited formats or confusing controls.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Export quality</td>
                      <td className="py-4 px-4">Crisp PNG + scalable SVG.</td>
                      <td className="py-4 px-4">Often PNG-only or low-res.</td>
                    </tr>
                    <tr className="border-b border-neutral-100">
                      <td className="py-4 pr-4">Connected workflow</td>
                      <td className="py-4 px-4">Integrates with QR codes, links and workspaces.</td>
                      <td className="py-4 px-4">Barcode-only, disconnected tools.</td>
                    </tr>
                    <tr>
                      <td className="py-4 pr-4">Team friendly</td>
                      <td className="py-4 px-4">Built for creators, brands and agencies.</td>
                      <td className="py-4 px-4">Single-use downloads.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-8 text-center text-base md:text-lg text-neutral-600">
                Want QR journeys as well? Pair barcodes with Kompi&apos;s{" "}
                <Link href="/qr-gen-online" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  QR gen online
                </Link>{" "}
                and routes through{" "}
                <Link href="/links" className="underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-700">
                  Kompi Links
                </Link>
                .
              </p>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  TESTIMONIALS                                                              */
/* -------------------------------------------------------------------------- */

function BarcodeTestimonialSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-12 md:space-y-14">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>LESS FRICTION</Eyebrow>
            <SectionTitle>More “scan, done”. Less “where’s that barcode file?”</SectionTitle>
            <SectionSub>Clean generation, clean exports, and a workflow that plays nice with your existing stack.</SectionSub>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“Finally not a 2009 barcode site”</p>
              <p className="mt-3 text-base text-neutral-600">“We generated labels in minutes and the scans were instantly reliable.”</p>
            </div>

            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“Exports are crisp”</p>
              <p className="mt-3 text-base text-neutral-600">“PNG for quick prints, SVG for packaging — both looked sharp.”</p>
            </div>

            <div className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <p className="mb-3 text-sm text-[#FBBF24]">★★★★★</p>
              <p className="text-lg font-bold text-[#0B0F1A]">“One place with QR + links”</p>
              <p className="mt-3 text-base text-neutral-600">“Barcodes for ops, QR codes for customers. Same toolkit.”</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

function BarcodeFaqSection() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>FAQ</Eyebrow>
            <SectionTitle>Barcode generator FAQs</SectionTitle>
            <SectionSub>Everything you need to know about using Kompi as your online barcode generator.</SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                      <span className="text-base md:text-lg font-semibold text-neutral-900">{faq.question}</span>
                      <span className="text-sm text-neutral-500 group-open:hidden">+</span>
                      <span className="text-sm text-neutral-500 hidden group-open:inline">−</span>
                    </summary>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  TRUST                                                                     */
/* -------------------------------------------------------------------------- */

function BarcodeTrustSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>TRUST</Eyebrow>
            <SectionTitle>Reliability, privacy and responsible barcode use</SectionTitle>
            <SectionSub>
              Barcodes are only as good as the data and printing behind them. Keep identifiers clean, prints sharp, and scans tested.
            </SectionSub>
          </div>

          <Card>
            <CardBody>
              <div className="mx-auto max-w-3xl space-y-6 text-center text-base md:text-lg leading-relaxed text-neutral-700">
                <p>
                  Use consistent identifiers (GTIN/EAN where required, or clean internal conventions for locations and assets).
                  Print at sensible sizes and test with your actual scanner hardware before rolling out at scale.
                </p>
                <p>
                  For customer-facing journeys, pair barcodes with QR codes that route through destinations you control.
                  Use Kompi workspaces to keep everything organised across teams, brands and campaigns.
                </p>
                <p>
                  If you’re combining barcodes with trackable links, keep destinations branded and trustworthy — the experience depends on where people end up.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  RELATED LINKS                                                             */
/* -------------------------------------------------------------------------- */

function BarcodeRelatedLinksSection() {
  const links = [
    { href: "/qr-code-generator", label: "QR code generator" },
    { href: "/qr-code/with-logo", label: "QR code generator with logo" },
    { href: "/links", label: "Kompi Links — branded short links" },
    { href: "/k-cards", label: "Kompi Cards — digital business cards" },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#f7f7f4] border-t border-neutral-200">
      <Container>
        <div className="space-y-10 md:space-y-12">
          <div className="space-y-4 md:space-y-5">
            <Eyebrow>EXPLORE MORE</Eyebrow>
            <SectionTitle>Related Kompi tools & pages</SectionTitle>
            <SectionSub>Build a complete offline-to-online workflow with QR codes, links and workspaces.</SectionSub>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex items-center justify-between rounded-3xl bg-white border border-neutral-200 px-6 py-5 text-base md:text-lg font-semibold text-neutral-900 shadow-sm hover:border-neutral-400 transition-colors"
              >
                <span>{item.label}</span>
                <span className="opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  JSON-LD                                                                   */
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
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

function getHowToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to generate a barcode with Kompi",
    description: "Simple steps for creating a barcode using Kompi's free online barcode generator tool.",
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
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function BarcodeGeneratorSeoPage() {
  const jsonLd = [getWebAppSchema(), getFaqSchema(), getHowToSchema(), getVideoSchema()];

  return (
    <>
      <Script id="barcode-generator-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
        <Navbar />

        {/* Match /qr-gen-online rhythm */}
        <main className="pt-20 md:pt-28 pb-24 space-y-24 md:space-y-32">
          <section>
            <Container>
              <BarcodeIntroSection />
            </Container>
          </section>

          <BarcodeToolSection />
          <BarcodeFeatureIcons />
          <BarcodeVideoSection />
          <BarcodeLongFormArticle />
          <BarcodeUseCasesSection />
          <BarcodeStripSection />
          <BarcodeWhyKompiSection />
          <BarcodeComparisonSection />
          <BarcodeTestimonialSection />
          <BarcodeFaqSection />
          <BarcodeTrustSection />
          <BarcodeRelatedLinksSection />
        </main>

        <FooterCTA />
      </div>
    </>
  );
}
