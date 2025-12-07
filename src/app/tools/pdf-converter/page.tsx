// src/app/tools/pdf-converter/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { PdfConverter } from "@/components/tools/PdfConverter";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "PDF Link Converter | Turn PDFs Into Trackable Links & QR Codes | Kompi Tools",
  description:
    "Turn your PDFs into clean, trackable Kompi links and QR codes. Perfect for menus, guides, lead magnets, portfolios, and more.",
};

const faqs = [
  {
    question: "What does the Kompi PDF converter do?",
    answer:
      "Instead of attaching PDFs everywhere, Kompi helps you turn them into short, trackable links and QR codes. That way you know how many people are actually opening your files.",
  },
  {
    question: "Is this a PDF editor or compressor?",
    answer:
      "No. This tool focuses on link and distribution. It takes an existing PDF and turns it into a shareable Kompi link you can track across campaigns, QR codes, and link pages.",
  },
  {
    question: "Can I upload multiple PDFs at once?",
    answer:
      "Yes. You can upload multiple PDFs in one go and generate a set of Kompi link formats, one per file, ready to plug into your dashboard.",
  },
  {
    question: "Do people need a Kompi account to view the PDFs?",
    answer:
      "No. Your viewers just tap your link or scan the QR code. They don’t need a Kompi account to open the PDF you’re sharing.",
  },
  {
    question: "Can I see how many times a PDF was opened?",
    answer:
      "Yes. When you connect this tool to your Kompi workspace, each PDF link shows clicks and basic analytics, just like your other Kompi links.",
  },
  {
    question: "Are my PDFs stored securely?",
    answer:
      "Kompi is built with privacy and security in mind. Files are handled over HTTPS and tied to your workspace. You stay in control of what’s live, and you can revoke links at any time.",
  },
  {
    question: "Does this work for restaurants and venues?",
    answer:
      "Yes. Many restaurants, cafes, and venues use Kompi to turn menus and event PDFs into QR menus with built-in link analytics.",
  },
  {
    question: "Do you change the content of my PDF?",
    answer:
      "No. This tool focuses on distribution, not editing. Your PDF content stays exactly as you exported it from your design tool or document editor.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi PDF Link Converter",
  url: "https://kompi.app/tools/pdf-converter",
  applicationCategory: "UtilitiesApplication",
  description:
    "Turn PDFs into clean, trackable Kompi links and QR codes for menus, guides, lead magnets, and more.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicPdfConverterPage() {
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
            <span>Kompi Tools · PDF link converter</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Turn static PDFs into{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                trackable links & QR codes
              </span>{" "}
              in a few clicks.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Upload a menu, guide, or lead magnet once. Kompi turns it into a
              clean, trackable link you can drop into bios, emails, and QR
              codes—without hunting down the latest version.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pdf-converter-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Convert a PDF into a link
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Save PDF links in my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Runs 100% in your browser
              </div>
              <span>• No login required to test the tool</span>
              <span>• Perfect for menus, guides, and resources</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="pdf-converter-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <PdfConverter variant="public" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              PUT YOUR PDF WHERE PEOPLE ACTUALLY TAP
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One PDF converter, three ways to use it.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Whether it&apos;s a menu, a handbook, or a free download, you
              shouldn&apos;t be guessing how people get to it. Use Kompi to
              give every PDF a link with real analytics behind it.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  RESTAURANTS & CAFES
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Menus that update in one place
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Print once, update forever. Change the PDF, keep the same link
                  and QR code on tables and posters.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• One QR menu, even if prices change</li>
                  <li>• Track scans by time and location</li>
                  <li>• No more re-printing for small tweaks</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Convert my menu to a QR link
              </button>
            </div>

            {/* Card 2 – highlighted */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-7 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Lead magnets & downloadables
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Turn your checklists, templates, and guides into PDF links
                  that plug straight into your link-in-bio and email flows.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Replace static attachments with smart links</li>
                  <li>• See which guides people actually open</li>
                  <li>• Use one link across multiple campaigns</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Turn my lead magnet into a Kompi link
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  TEAMS & CLIENTS
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Portfolios & handbooks
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Share brand books, onboarding docs, or case study PDFs as
                  links you can quietly update in the background.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Keep one link in client decks and docs</li>
                  <li>• Update files without resending everything</li>
                  <li>• See which assets people open the most</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#006B81] bg-[#006B81] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#034557]">
                Turn my PDFs into smart links
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE PANEL STRIP */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#E8F739] px-8 py-10 text-center shadow-md sm:px-12">
            <h2 className="text-xl font-semibold text-[#1E2330] sm:text-2xl md:text-3xl">
              Stop emailing attachments. Start sharing one reliable link.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#111827] sm:text-base">
              With Kompi, your &quot;latest version&quot; always lives at the
              same URL—whether someone taps it from a QR code, a link page, or
              an email you sent months ago.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#pdf-converter-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] shadow hover:bg-black"
              >
                Try the PDF converter
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-6 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]"
              >
                Create a free Kompi account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE PANELS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            PDFs that fit into the rest of your Kompi setup.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E3F2FF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                LINKS, QR CODES, AND MENUS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                One PDF link that works everywhere you need it.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Use the same Kompi link on your link-in-bio, posters, table
                tents, and emails. If you update the PDF later, the link stays
                the same—but the content changes.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#6B7280]">
                  Link-in-bio + QR preview
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#9BDFD1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <div className="flex h-full w-full items-center justify-center text-xs text-[#0F172A]">
                  Great for teams & client assets
                </div>
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR TEAMS & CLIENT WORK
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Send fewer &quot;here&apos;s the updated PDF&quot; emails.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Give clients and collaborators one stable link that always shows
                the current version. Kompi takes care of routing; you keep
                editing on your side.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL ROW */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              FROM ATTACHMENTS TO SMART LINKS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Less &quot;Did you get the attachment?&quot;, more &quot;Here&apos;s the link.&quot;
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                &quot;Our menu QR finally feels stable&quot;
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                &quot;We used to reprint QR codes every time prices changed.
                Now we just upload a new PDF and keep the same Kompi link.&quot;
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                &quot;Better than sending heavy attachments&quot;
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                &quot;Clients click one link and always see the current
                handbook. It keeps everything feeling more professional.&quot;
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                &quot;We can finally see who opens what&quot;
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                &quot;Link analytics on our downloads showed us which resources
                people actually care about. That shapes what we make next.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FFFFFF] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the PDF link converter?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually ask when they move from static
              attachments to trackable PDF links.
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

      {/* JSON-LD schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
