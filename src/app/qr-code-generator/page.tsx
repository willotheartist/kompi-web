// src/app/qr-code-generator/page.tsx

import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Globe,
  Utensils,
  Wifi,
  Contact,
  Ticket,
  Type,
  MousePointerClick,
  Palette,
  Download,
  Link2,
  Mail,
  MessageSquareText,
  FileText,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { QrGenerator } from "@/components/qr-code-generator/QrGenerator";

export const metadata: Metadata = {
  title: "Free QR Code Generator | Create Custom QR Codes Online | Kompi",
  description:
    "Create free QR codes in seconds. Paste a link, text or Wi-Fi details, customise the QR style and download a scan-ready PNG. Upgrade with Kompi for analytics, dynamic QR codes and brand presets.",
  alternates: { canonical: "/qr-code-generator" },
  openGraph: {
    title: "Free QR Code Generator – Custom QR Codes that Just Work | Kompi",
    description:
      "Generate free QR codes for menus, posters, business cards and more. Customise colours, borders and logo, then download a scan-ready PNG. Plug into Kompi for dynamic links and analytics.",
    url: "/qr-code-generator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator | Kompi",
    description:
      "Create custom QR codes online in seconds. Free generator with advanced options, plus Kompi’s link tracking, bio pages and QR tools when you’re ready.",
  },
};

/* -------------------------------------------------------------------------- */
/*  SMALL UI PRIMITIVES (flat + /with-logo vibe)                              */
/* -------------------------------------------------------------------------- */

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-4">{children}</div>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-[0.34em] text-[#5177e1]">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-center text-3xl md:text-5xl font-bold tracking-tight text-[#0B0F1A]">
      {children}
    </h2>
  );
}

function SectionSub({ children }: { children: ReactNode }) {
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
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl border border-neutral-200 bg-white ${className}`}>
      {children}
    </section>
  );
}

function CardBody({ children }: { children: ReactNode }) {
  return <div className="px-6 py-10 sm:px-10 sm:py-12">{children}</div>;
}

type SectionShellProps = {
  children: ReactNode;
  id?: string;
  tone?: "white" | "soft";
};

function SectionShell({ children, id, tone = "soft" }: SectionShellProps) {
  const toneClass = tone === "white" ? "bg-white" : "bg-[#f7f7f4]";
  return (
    <section id={id} className={`${toneClass} border-t border-neutral-200 py-20 md:py-28`}>
      <Container>{children}</Container>
    </section>
  );
}

function IconBadge({
  icon,
  bg = "bg-neutral-100",
}: {
  icon: ReactNode;
  bg?: string;
}) {
  return (
    <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${bg}`}>
      <div className="h-5 w-5 text-[#0B0F1A]">{icon}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SECTIONS                                                                  */
/* -------------------------------------------------------------------------- */

function QuickTemplatesStrip() {
  const cards = [
    { label: "Website link", body: "Send people straight to a landing page, store or booking link.", icon: <Globe className="h-5 w-5" /> },
    { label: "Restaurant menu", body: "Put QR menus on tables, windows and takeaway packaging.", icon: <Utensils className="h-5 w-5" /> },
    { label: "Wi-Fi QR code", body: "Let guests join your Wi-Fi without typing a password.", icon: <Wifi className="h-5 w-5" /> },
    { label: "vCard / contact", body: "Share your contact details from a business card or flyer.", icon: <Contact className="h-5 w-5" /> },
    { label: "Event or ticket", body: "Link to RSVPs, ticket pages or event info in one scan.", icon: <Ticket className="h-5 w-5" /> },
    { label: "Plain text", body: "Show instructions, discount codes or short messages.", icon: <Type className="h-5 w-5" /> },
  ];

  return (
    <SectionShell tone="white" id="ideas">
      <div className="space-y-12">
        <div className="space-y-4">
          <Eyebrow>QR CODE IDEAS</Eyebrow>
          <SectionTitle>
            Fast templates for
            <br />
            popular QR code types.
          </SectionTitle>
          <SectionSub>
            Start with a use case instead of a blank canvas. Pick a template and tweak the content in the generator above.
          </SectionSub>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {cards.map((card) => (
            <div key={card.label} className="rounded-3xl bg-[#F7F7F3] p-6 ring-1 ring-[#E5E7EB]">
              <IconBadge icon={card.icon} bg="bg-white" />
              <h3 className="mt-4 text-sm font-semibold text-[#0B0F1A]">{card.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{card.body}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-neutral-600">
          Use the free QR code generator at the top of this page to create any of these in a few seconds — no account needed.
        </p>
      </div>
    </SectionShell>
  );
}

function NewToQrSection() {
  return (
    <SectionShell id="qr-basics" tone="soft">
      <Card>
        <CardBody>
          <div className="space-y-10">
            <div className="space-y-4">
              <Eyebrow>NEW TO QR CODES?</Eyebrow>
              <SectionTitle>
                Everything you need to know
                <br />
                about <span className="wf-serif-accent italic text-neutral-800">free QR codes</span>.
              </SectionTitle>
              <SectionSub>
                A QR code is just a visual way of storing information — usually a URL. When someone scans it, their camera opens
                whatever you&apos;ve encoded: a website, menu, Wi-Fi network, contact card and more.
              </SectionSub>
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              {/* Image (no frame, no glow, no shadow) */}
              <div className="overflow-hidden rounded-3xl bg-neutral-900">
                <img
                  src="/kompi-analytics.png"
                  alt="Kompi dashboard with QR analytics and links"
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Copy */}
              <div className="space-y-5">
                <ul className="space-y-2 text-base leading-relaxed text-neutral-700">
                  <li>• Kompi&apos;s free generator creates static PNG QR codes.</li>
                  <li>• Static QR codes never expire — they work as long as the destination is valid.</li>
                  <li>
                    • Free downloads include a tiny <span className="font-semibold">Kompi</span> logo mark, similar to other QR providers.
                  </li>
                  <li>
                    • Want editable destinations and scan analytics? Use a <span className="font-semibold">Kompi link</span> behind your QR.
                  </li>
                </ul>

                <p className="text-sm text-neutral-600">
                  Upgrade to dynamic QR codes in Kompi and change where a QR points without reprinting anything.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/signin"
                    className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] transition hover:bg-black"
                  >
                    Open Kompi dashboard
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] hover:bg-[#F7F7F3]"
                  >
                    See QR &amp; link plans →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </SectionShell>
  );
}

function HowItWorksSection() {
  const steps = [
    { step: "1", title: "Choose what your QR does", body: "Select a QR type and add a URL, Wi-Fi details, contact info, SMS or plain text.", icon: <MousePointerClick className="h-5 w-5" /> },
    { step: "2", title: "Design the QR code card", body: "Pick dot style, colours, borders and optional logo so it feels on-brand but still scannable.", icon: <Palette className="h-5 w-5" /> },
    { step: "3", title: "Download a high-quality PNG", body: "Export a crisp PNG up to 2048px. Print it on menus, flyers, posters, packaging and more.", icon: <Download className="h-5 w-5" /> },
  ];

  return (
    <SectionShell id="how-it-works" tone="white">
      <div className="space-y-12">
        <div className="space-y-4">
          <Eyebrow>HOW IT WORKS</Eyebrow>
          <SectionTitle>
            Create a free QR code
            <br />
            in three simple steps.
          </SectionTitle>
          <SectionSub>
            The generator at the top of this page handles everything. You don&apos;t need an account to create or download a QR code.
          </SectionSub>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="rounded-3xl bg-[#F7F7F3] p-7 ring-1 ring-[#E5E7EB]">
              <div className="flex items-center gap-4">
                <IconBadge icon={s.icon} bg="bg-white" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">Step {s.step}</p>
                  <h3 className="mt-1 text-base font-semibold text-[#0B0F1A]">{s.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function UseCasesSection() {
  const cards = [
    { title: "Restaurants & cafés", body: "Put QR menus on tables, windows, receipts and takeaway boxes that always point customers to the right page." },
    { title: "Flyers, posters & events", body: "Connect street posters, campus flyers or out-of-home ads to ticketing, RSVPs or promo landing pages." },
    { title: "Business cards & packaging", body: "Link to your website, Kompi bio page, support hub or socials without changing your printed materials." },
  ];

  return (
    <SectionShell id="use-cases" tone="soft">
      <div className="space-y-12">
        <div className="space-y-4">
          <Eyebrow>USE CASES</Eyebrow>
          <SectionTitle>
            Where Kompi QR codes
            <br />
            make the biggest impact.
          </SectionTitle>
          <SectionSub>
            Turn anything with a surface into a smart link. Kompi QR codes work anywhere you can print or display an image — and dynamic
            QR codes let you change destinations later.
          </SectionSub>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <h3 className="text-base font-semibold text-[#0B0F1A]">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function PlatformPitchSection() {
  const cards = [
    { title: "Dynamic QR codes", body: "Point QR codes at Kompi short links so you can change destinations later and keep printed codes in use." },
    { title: "Link analytics that make sense", body: "See clicks and scans by device, country and referrer, so you know which campaigns and locations perform best." },
    { title: "Bio pages, QR menus & KR Codes", body: "Create Kompi bio pages, branded QR menus and trackable KR Codes from the same workspace and share them everywhere." },
  ];

  return (
    <SectionShell id="platform" tone="white">
      <Card>
        <CardBody>
          <div className="space-y-12">
            <div className="space-y-4">
              <Eyebrow>KOMPI PLATFORM</Eyebrow>
              <SectionTitle>
                More than a free
                <br />
                QR code generator.
              </SectionTitle>
              <SectionSub>
                Behind every QR you create, you can plug into Kompi&apos;s full platform — short links, QR menus, KR Codes, bio pages and
                rich analytics. One login, one place to see how people actually find you.
              </SectionSub>
            </div>

            <div className="grid gap-10 md:grid-cols-2 md:items-center">
              <div className="grid gap-4">
                {cards.map((card) => (
                  <div key={card.title} className="rounded-3xl bg-[#F7F7F3] p-6 ring-1 ring-[#E5E7EB]">
                    <h3 className="text-sm font-semibold text-[#0B0F1A]">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-700">{card.body}</p>
                  </div>
                ))}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-8 py-3.5 text-sm font-semibold text-[#F7F7F3] transition hover:bg-black"
                  >
                    See Kompi plans
                  </Link>
                  <Link
                    href="/signin"
                    className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-white px-8 py-3.5 text-sm font-semibold text-[#1E2330] hover:bg-[#F7F7F3]"
                  >
                    Or create a free account →
                  </Link>
                </div>
              </div>

              {/* Image (no frame, no glow, no shadow) */}
              <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#E5E7EB]">
                <img
                  src="/kompi-platform.png"
                  alt="Kompi platform with links, QR codes and analytics"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </SectionShell>
  );
}

function TypesGridSection() {
  const types = [
    { title: "URL QR codes", body: "Send people to any website, store or landing page with one scan.", icon: <Link2 className="h-5 w-5" /> },
    { title: "Wi-Fi QR codes", body: "Let guests connect without typing your network name and password.", icon: <Wifi className="h-5 w-5" /> },
    { title: "vCard / contact QR codes", body: "Share your contact details so people can save them in one tap.", icon: <Contact className="h-5 w-5" /> },
    { title: "Email QR codes", body: "Open a pre-filled email to your address with subject and message.", icon: <Mail className="h-5 w-5" /> },
    { title: "SMS QR codes", body: "Start a text conversation with a pre-written message and number.", icon: <MessageSquareText className="h-5 w-5" /> },
    { title: "Plain text QR codes", body: "Show instructions, coupon codes or any short text on scan.", icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <SectionShell id="qr-types" tone="soft">
      <div className="space-y-12">
        <div className="space-y-4">
          <Eyebrow>QR TYPES</Eyebrow>
          <SectionTitle>
            What type of QR codes
            <br />
            can you create for free?
          </SectionTitle>
          <SectionSub>
            Kompi&apos;s free QR code generator supports the most common QR types out of the box. Choose the one you need in the content
            step above.
          </SectionSub>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {types.map((type) => (
            <div key={type.title} className="rounded-3xl bg-white p-7 ring-1 ring-[#E5E7EB]">
              <div className="flex items-start gap-4">
                <IconBadge icon={type.icon} bg="bg-[#F7F7F3]" />
                <div>
                  <h3 className="text-base font-semibold text-[#0B0F1A]">{type.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{type.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function RelatedQrToolsSection() {
  const links = [
    { href: "/qr-code/dynamic", label: "Dynamic QR codes", body: "Create QR codes you can update later without reprinting." },
    { href: "/qr-code/static", label: "Static QR codes", body: "Simple QR codes that point straight to a URL or text." },
    { href: "/qr-code/with-logo", label: "QR codes with logo", body: "Add your brand mark in the middle of a scannable QR." },
    { href: "/qr-code/for-restaurant", label: "QR codes for restaurants", body: "Menu QR codes for tables, windows and takeaway packaging." },
  ];

  return (
    <SectionShell id="more-qr-tools" tone="white">
      <div className="space-y-12">
        <div className="space-y-4">
          <Eyebrow>MORE QR TOOLS</Eyebrow>
          <SectionTitle>Explore more free QR code tools.</SectionTitle>
          <SectionSub>Expand beyond basic QR files: dynamic updates, logo styling, and industry-specific flows.</SectionSub>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-3xl bg-[#F7F7F3] p-6 ring-1 ring-[#E5E7EB] transition hover:bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-[#0B0F1A]">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.body}</p>
                </div>
                <span className="mt-1 opacity-60 group-hover:opacity-100 transition-opacity">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function FaqSection() {
  const faqs = [
    { q: "Is this QR code generator really free?", a: "Yes. You can create and download static QR codes as PNG files for free without creating a Kompi account." },
    { q: "Do free QR codes show the Kompi logo?", a: "Yes. Free QR codes include a small Kompi mark in the corner, similar to how other QR providers brand their codes. Paid Kompi plans unlock fully white-label QR codes and advanced branding options." },
    { q: "Do the QR codes expire?", a: "Static QR codes created here never expire. They will keep working as long as the underlying URL, Wi-Fi details or other encoded value is still valid." },
    { q: "What’s the difference between static and dynamic QR codes?", a: "Static QR codes point directly to a fixed value, such as a URL. Dynamic QR codes point to a Kompi short link, which you can edit later and track with analytics — without changing the printed code." },
    { q: "Can I track how many times my QR is scanned?", a: "Scan tracking is available when your QR points to a Kompi short link. Create the link inside your Kompi dashboard, then generate a dynamic QR from it to see clicks and scans over time." },
    { q: "Can I customise colours and add my own logo?", a: "Yes. The free QR generator lets you change colours, dot styles, borders and upload a logo. With a Kompi account you can save presets, sync brand colours and use your own domain." },
  ];

  return (
    <SectionShell id="faq" tone="soft">
      <div className="space-y-12">
        <div className="space-y-4">
          <Eyebrow>FAQ</Eyebrow>
          <SectionTitle>
            Frequently asked questions
            <br />
            about Kompi QR codes.
          </SectionTitle>
          <SectionSub>Quick answers about free downloads, scan reliability, and when to upgrade.</SectionSub>
        </div>

        <Card>
          <CardBody>
            <div className="space-y-4">
              {faqs.map((item) => (
                <details key={item.q} className="group rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span className="text-base md:text-lg font-semibold text-neutral-900">{item.q}</span>
                    <span className="text-sm text-neutral-500 group-open:hidden">+</span>
                    <span className="hidden text-sm text-neutral-500 group-open:inline">−</span>
                  </summary>
                  <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700">{item.a}</p>
                </details>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------------- */
/*  PAGE                                                                      */
/* -------------------------------------------------------------------------- */

export default function QrCodeGeneratorPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this QR code generator really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. You can create and download static QR codes as PNG files for free without creating a Kompi account.",
        },
      },
      {
        "@type": "Question",
        name: "Do free QR codes show the Kompi logo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Free QR codes include a small Kompi mark in the corner, similar to how other QR providers brand their codes. Paid Kompi plans unlock fully white-label QR codes and advanced branding options.",
        },
      },
      {
        "@type": "Question",
        name: "Do the QR codes expire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Static QR codes created here never expire. They will keep working as long as the underlying URL, Wi-Fi details or other encoded value is still valid.",
        },
      },
      {
        "@type": "Question",
        name: "What’s the difference between static and dynamic QR codes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Static QR codes point directly to a fixed value, such as a URL. Dynamic QR codes point to a Kompi short link, which you can edit later and track with analytics — without changing the printed code.",
        },
      },
      {
        "@type": "Question",
        name: "Can I track how many times my QR is scanned?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Scan tracking is available when your QR points to a Kompi short link. Create the link inside your Kompi dashboard, then generate a dynamic QR from it to see clicks and scans over time.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customise colours and add my own logo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The free QR generator lets you change colours, dot styles, borders and upload a logo. With a Kompi account you can save presets, sync brand colours and use your own domain.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#f7f7f4] text-[#050505]">
      <Navbar />

      {/* Stronger padding so header never overlaps */}
      <main className="pt-20 md:pt-28">
        {/* DO NOT WRAP THE GENERATOR */}
        <QrGenerator />

        <QuickTemplatesStrip />
        <NewToQrSection />
        <HowItWorksSection />
        <UseCasesSection />
        <PlatformPitchSection />
        <TypesGridSection />
        <RelatedQrToolsSection />
        <FaqSection />

        <FooterCTA />
      </main>

      {/* SEO: FAQ structured data */}
      <Script id="qr-code-generator-faq-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
    </div>
  );
}
