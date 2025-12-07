// src/app/tools/image-to-pdf/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ImageToPdf } from "@/components/tools/ImageToPdf";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Image to PDF Converter | Combine Photos Into One PDF | Kompi Tools",
  description:
    "Combine multiple images into a single, clean PDF. Perfect for menus, product shots, carousels, and client previews.",
};

const faqs = [
  {
    question: "What does the image to PDF tool do?",
    answer:
      "It lets you combine multiple images into a single, scrollable PDF. You control the order, orientation, and margins so it feels intentional, not like a random export.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "You can upload common formats like JPG, PNG, and WebP. Once combined, they’re exported as a single PDF you can attach to a Kompi link or QR code.",
  },
  {
    question: "Is there a limit on the number of images?",
    answer:
      "In most use cases, people combine between 3 and 30 images. Exact limits depend on your Kompi plan and file sizes, but this tool is designed for real-world sets, not just single images.",
  },
  {
    question: "Will my images lose quality?",
    answer:
      "The goal is to balance reasonable file size with a crisp viewing experience. Menus, screenshots, and product shots will remain easy to read on mobile and desktop.",
  },
  {
    question: "Can I reorder images before exporting?",
    answer:
      "Yes. Drag-and-drop reordering is available inside your Kompi dashboard. This public version focuses on the layout preview so you can test the flow first.",
  },
  {
    question: "Do I need a Kompi account to use this?",
    answer:
      "You can try the layout and flow for free without signing up. To actually generate and save PDFs as part of your workspace, you’ll need a Kompi account.",
  },
  {
    question: "How does this fit with QR menus and link pages?",
    answer:
      "Once your images are in a PDF, you can hook that file up to a Kompi link or QR menu so visitors always see the latest version from one URL.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Image to PDF Converter",
  url: "https://kompi.app/tools/image-to-pdf",
  applicationCategory: "UtilitiesApplication",
  description:
    "Combine multiple images into a single, clean PDF for menus, product galleries, and client previews.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicImageToPdfPage() {
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
            <span>Kompi Tools · Image to PDF</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                loose images
              </span>{" "}
              into a single shareable PDF.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Drag in screenshots, menu pages, product photos, or story frames.
              Kompi lays them out as a single PDF that&apos;s easier to share,
              download, and connect to your QR codes and link pages.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#image-to-pdf-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Combine images into a PDF
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Save PDFs in my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Runs in your browser
              </div>
              <span>• No design software required</span>
              <span>• Perfect for menus, lookbooks, and galleries</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="image-to-pdf-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <ImageToPdf variant="public" />
          </div>
        </div>
      </section>

      {/* USE-CASE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              A BETTER WAY TO SEND IMAGE SETS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One PDF beats twenty screenshots in a row.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Instead of sending a flood of individual images, bundle them into
              a single PDF that feels more intentional and easier to save.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  MENUS & PRINT BOARDS
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Multi-page menus in one tap
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Stitch your cocktail list, food menu, and specials into one
                  PDF that guests can scroll through easily.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-7 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Product shot lookbooks
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Compile product angles or campaign shots into a PDF you can
                  share with clients, stylists, or collaborators.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  CLIENT REVIEWS
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Storyboards & social mockups
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Send sequences of story frames, ad concepts, or feed mocks as
                  a single, easy-to-comment-on PDF.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE FEATURE PANEL */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl grid gap-10 rounded-3xl bg-white p-8 sm:grid-cols-2 sm:p-12">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6B7280] sm:text-sm">
              DESIGNED FOR HOW PEOPLE ACTUALLY VIEW PDFs
            </p>
            <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
              Make image sets easier to view on mobile.
            </h3>
            <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
              Instead of pinching and zooming on raw images, your audience gets
              a single PDF that scrolls naturally. Great for menus, galleries,
              and visual briefings.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-72 sm:w-72">
              <div className="flex h-full w-full items-center justify-center text-xs text-[#6B7280]">
                PDF page layout preview
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
              Questions about the image to PDF converter?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what teams and creators usually ask before they start
              bundling images into shareable PDFs.
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
