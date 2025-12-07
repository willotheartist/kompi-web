// src/app/tools/pdf-to-image/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { PdfToImage } from "@/components/tools/PdfToImage";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "PDF to Image Converter | Export PDF Pages as PNG/JPG | Kompi Tools",
  description:
    "Export PDF pages as PNG or JPG images. Turn PDFs into social graphics, slide previews, and shareable snippets.",
};

const faqs = [
  {
    question: "What does the PDF to image tool do?",
    answer:
      "It lets you export pages from a PDF as image files (PNG or JPG). That means you can turn slides, pages, or sections into graphics you can post, embed, or reuse.",
  },
  {
    question: "Why would I export PDF pages as images?",
    answer:
      "Images are easier to share on social platforms, in carousels, and in slide decks. Instead of sending a whole PDF, you can highlight the most important pages visually.",
  },
  {
    question: "Can I choose which pages to export?",
    answer:
      "Yes. You can export every page, or only a custom range like 1–3 and 7–9. That way you only create the images you actually need.",
  },
  {
    question: "Which formats are available?",
    answer:
      "You can export in PNG for crisper text and UI screenshots, or JPG for lighter-weight images better suited to photography and feeds.",
  },
  {
    question: "Do I need design software for this?",
    answer:
      "No. The whole point of this tool is to avoid jumping into design software just to export a few pages as images.",
  },
  {
    question: "Does Kompi store the images it creates?",
    answer:
      "When you use this inside your Kompi workspace, the exported images are stored as assets you can reuse across link pages, QR menus, and campaigns.",
  },
  {
    question: "Can I use these images outside of Kompi?",
    answer:
      "Yes. You can download the exported images and use them anywhere—presentations, documents, or other platforms.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi PDF to Image Converter",
  url: "https://kompi.app/tools/pdf-to-image",
  applicationCategory: "UtilitiesApplication",
  description:
    "Export PDF pages as PNG or JPG images for social media, slides, and previews.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicPdfToImagePage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1E2330] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · PDF to image</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                PDF pages
              </span>{" "}
              into ready-to-post images.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Upload a PDF, pick PNG or JPG, choose which pages you care about,
              and get a neat list of image files you can use in carousels,
              slides, and previews.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pdf-to-image-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Plan PDF image exports
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Export inside my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Built for slides, carousels & previews
              </div>
              <span>• No design software required</span>
              <span>• Works with standard PDF files</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="pdf-to-image-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <PdfToImage variant="public" />
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              PULL HIGHLIGHTS OUT OF LONG PDFS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Your slides and pages deserve more than &quot;attached PDF&quot;.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Instead of hiding your best work inside a download, export the
              most important pages as images you can share across social,
              newsletters, and decks.
            </p>
          </div>

          <div className="grid gap-8 rounded-3xl bg-[#E3F2FF] p-8 sm:grid-cols-2 sm:p-12">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR CREATORS & EDUCATORS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Turn workshop slides into snackable posts.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Export your strongest slides as images, then turn them into
                carousels, shorts, or stories without rebuilding them from
                scratch.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-72 sm:w-72">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#6B7280]">
                  Slide → image carousel preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the PDF to image converter?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask before they start pulling
              highlights from their PDFs.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E3F2FF] bg-[#F7F7F3] p-5 text-sm"
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
