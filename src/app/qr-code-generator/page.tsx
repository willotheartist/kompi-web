// src/app/qr-code-generator/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Navbar } from "@/components/navbar";
import { FooterCTA } from "@/components/footer-cta";
import { QrGenerator } from "@/components/qr-code-generator/QrGenerator";

export const metadata: Metadata = {
  title: "Free QR Code Generator | Create Custom QR Codes Online | Kompi",
  description:
    "Create free QR codes in seconds. Paste a link, text or Wi-Fi details, customise the QR style and download a scan-ready PNG. Upgrade with Kompi for analytics, dynamic QR codes and brand presets.",
  alternates: {
    canonical: "/qr-code-generator",
  },
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

// Shared layout shell for cards
type SectionShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

const SectionShell = ({ children, className = "", id }: SectionShellProps) => (
  <section id={id} className={`px-4 py-12 ${className}`}>
    <div className="mx-auto max-w-6xl">
      <div className="rounded-3xl border border-black/5 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.10)] md:p-8">
        {children}
      </div>
    </div>
  </section>
);

// --- Sections ---

function QuickTemplatesStrip() {
  const cards = [
    {
      label: "Website link",
      body: "Send people straight to a landing page, store or booking link.",
    },
    {
      label: "Restaurant menu",
      body: "Put QR menus on tables, windows and takeaway packaging.",
    },
    {
      label: "Wi-Fi QR code",
      body: "Let guests join your Wi-Fi without typing a password.",
    },
    {
      label: "vCard / contact",
      body: "Share your contact details from a business card or flyer.",
    },
    {
      label: "Event or ticket",
      body: "Link to RSVPs, ticket pages or event info in one scan.",
    },
    {
      label: "Plain text",
      body: "Show instructions, discount codes or short messages.",
    },
  ];

  return (
    <SectionShell className="pt-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            QR code ideas
          </p>
          <h2
            className="mt-2 text-[22px] font-semibold leading-[1.15] tracking-tight text-[#050505] sm:text-[24px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Fast templates for
            <br />
            popular QR code types.
          </h2>
          <p className="mt-3 text-[12px] leading-relaxed text-neutral-600">
            Start with a use case instead of a blank canvas. Pick a template and
            tweak the content in the generator above.
          </p>
        </div>
        <p className="max-w-xs text-[11px] leading-relaxed text-neutral-500">
          Use the free QR code generator at the top of this page to create any
          of these in a few seconds — no account needed.
        </p>
      </div>

      <div className="mt-7 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => (
          <article
            key={card.label}
            className="flex flex-col justify-between rounded-2xl border border-black/5 bg-[#f5f3ee]/80 px-3 py-3 text-left shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
          >
            <h3 className="text-[12px] font-semibold text-[#050505]">
              {card.label}
            </h3>
            <p className="mt-2 text-[11px] leading-relaxed text-neutral-600">
              {card.body}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function NewToQrSection() {
  return (
    <SectionShell>
      <div
        id="qr-basics"
        className="flex flex-col items-center gap-10 md:flex-row md:items-start"
        aria-labelledby="qr-basics-heading"
      >
        {/* Left: image */}
        <div className="relative w-full max-w-md flex-1">
          <div className="pointer-events-none absolute -inset-5 rounded-[32px] bg-gradient-to-br from-purple-300/30 via-fuchsia-300/20 to-emerald-300/20 blur-2xl" />
          <div className="relative rounded-[28px] border border-black/5 bg-[#0b0b0b] p-4 shadow-[0_28px_70px_rgba(15,23,42,0.75)]">
            <img
              src="/kompi-analytics.png"
              alt="Kompi dashboard with QR analytics and links"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Right: copy */}
        <div className="flex-1 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
            New to QR codes?
          </p>
          <h2
            id="qr-basics-heading"
            className="mt-3 text-[26px] font-semibold leading-[1.1] tracking-tight text-[#050505] sm:text-[30px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Everything you need to know
            <br />
            about{" "}
            <span className="wf-serif-accent italic text-neutral-800">
              free QR codes
            </span>
            .
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-neutral-700">
            A QR code is just a visual way of storing information — usually a
            URL. When someone scans it, their camera opens whatever you&apos;ve
            encoded: a website, menu, Wi-Fi network, contact card and more.
          </p>

          <ul className="mt-5 space-y-2 text-[13px] leading-relaxed text-neutral-700">
            <li>• Kompi&apos;s free generator creates static PNG QR codes.</li>
            <li>
              • Static QR codes never expire — they work as long as the
              destination is valid.
            </li>
            <li>
              • Free downloads include a tiny{" "}
              <span className="font-semibold">Kompi</span> logo mark, similar to
              other QR providers.
            </li>
            <li>
              • Want editable destinations and scan analytics? Use a{" "}
              <span className="font-semibold">Kompi link</span> behind your QR.
            </li>
          </ul>

          <p className="mt-4 text-[12px] text-neutral-600">
            Upgrade to dynamic QR codes in Kompi and change where a QR points
            without reprinting anything.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-[12px]">
            <Link href="/signin"
              className="inline-flex items-center justify-center rounded-full bg-[#050505] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.75)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
            >
              Open Kompi dashboard
            </Link>
            <Link href="/pricing"
              className="text-[12px] font-medium text-neutral-800 underline-offset-4 hover:underline"
            >
              See QR & link plans →
            </Link>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: "1",
      title: "Choose what your QR does",
      body: "Select a QR type and add a URL, Wi-Fi details, contact info, SMS or plain text.",
    },
    {
      step: "2",
      title: "Design the QR code card",
      body: "Pick dot style, colours, borders and optional logo so it feels on-brand but still scannable.",
    },
    {
      step: "3",
      title: "Download a high-quality PNG",
      body: "Export a crisp PNG up to 2048px. Print it on menus, flyers, posters, packaging and more.",
    },
  ];

  return (
    <SectionShell id="how-it-works">
      <div aria-labelledby="qr-how-heading">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            How it works
          </p>
          <h2
            id="qr-how-heading"
            className="mt-2 text-[24px] font-semibold leading-[1.15] tracking-tight text-[#050505] sm:text-[26px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Create a free QR code
            <br />
            in three simple steps.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-neutral-700">
            The generator at the top of this page handles everything. You
            don&apos;t need an account to create or download a QR code.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.step}
              className="flex flex-col rounded-2xl border border-black/5 bg-[#f5f3ee]/80 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-[12px] bg-[#050505] text-[11px] font-semibold text-white">
                  {step.step}
                </div>
                <h3 className="text-sm font-semibold text-[#050505]">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-neutral-700">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function UseCasesSection() {
  const cards = [
    {
      title: "Restaurants & cafés",
      body: "Put QR menus on tables, windows, receipts and takeaway boxes that always point customers to the right page.",
    },
    {
      title: "Flyers, posters & events",
      body: "Connect street posters, campus flyers or out-of-home ads to ticketing, RSVPs or promo landing pages.",
    },
    {
      title: "Business cards & packaging",
      body: "Link to your website, Kompi bio page, support hub or socials without changing your printed materials.",
    },
  ];

  return (
    <SectionShell id="use-cases">
      <div aria-labelledby="qr-use-cases-heading">
        <h2
          id="qr-use-cases-heading"
          className="text-[24px] font-semibold tracking-tight text-[#050505] sm:text-[26px]"
          style={{ letterSpacing: "-0.04em" }}
        >
          Where Kompi QR codes
          <br />
          make the biggest impact.
        </h2>
        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-700">
          Turn anything with a surface into a smart link. Kompi QR codes work
          anywhere you can print or display an image — and dynamic QR codes let
          you change destinations later.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-black/5 bg-[#f5f3ee]/80 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.08)]"
            >
              <h3 className="text-sm font-semibold text-[#050505]">
                {card.title}
              </h3>
              <p className="mt-3 text-[12px] leading-relaxed text-neutral-700">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function PlatformPitchSection() {
  const cards = [
    {
      title: "Dynamic QR codes",
      body: "Point QR codes at Kompi short links so you can change destinations later and keep printed codes in use.",
    },
    {
      title: "Link analytics that make sense",
      body: "See clicks and scans by device, country and referrer, so you know which campaigns and locations perform best.",
    },
    {
      title: "Bio pages, QR menus & KR Codes",
      body: "Create Kompi bio pages, branded QR menus and trackable KR Codes from the same workspace and share them everywhere.",
    },
  ];

  return (
    <SectionShell id="platform">
      <div
        className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center"
        aria-labelledby="qr-platform-heading"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Kompi platform
          </p>
          <h2
            id="qr-platform-heading"
            className="mt-2 text-[24px] font-semibold leading-[1.15] tracking-tight text-[#050505] sm:text-[26px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            More than a free
            <br />
            QR code generator.
          </h2>
          <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-neutral-700">
            Behind every QR you create, you can plug into Kompi&apos;s full
            platform — short links, QR menus, KR Codes, bio pages and rich
            analytics. One login, one place to see how people actually find
            you.
          </p>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-black/5 bg-[#f5f3ee]/80 p-4 text-left shadow-[0_16px_40px_rgba(15,23,42,0.08)]"
              >
                <h3 className="text-[13px] font-semibold text-[#050505]">
                  {card.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-neutral-700">
                  {card.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-[12px]">
            <Link href="/pricing"
              className="inline-flex items-center justify-center rounded-full bg-[#050505] px-7 py-2.5 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.75)] transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.9)]"
            >
              See Kompi plans
            </Link>
            <Link href="/signin"
              className="text-[12px] font-medium text-neutral-800 underline-offset-4 hover:underline"
            >
              Or create a free account →
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="pointer-events-none absolute -inset-5 rounded-[32px] bg-gradient-to-br from-amber-300/40 via-orange-300/20 to-pink-300/20 blur-2xl" />
          <div className="relative rounded-[28px] border border-black/5 bg-white p-4 shadow-[0_26px_70px_rgba(148,64,12,0.35)]">
            <img
              src="/kompi-platform.png"
              alt="Kompi platform with links, QR codes and analytics"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

function TypesGridSection() {
  const types = [
    {
      title: "URL QR codes",
      body: "Send people to any website, store or landing page with one scan.",
    },
    {
      title: "Wi-Fi QR codes",
      body: "Let guests connect without typing your network name and password.",
    },
    {
      title: "vCard / contact QR codes",
      body: "Share your contact details so people can save them in one tap.",
    },
    {
      title: "Email QR codes",
      body: "Open a pre-filled email to your address with subject and message.",
    },
    {
      title: "SMS QR codes",
      body: "Start a text conversation with a pre-written message and number.",
    },
    {
      title: "Plain text QR codes",
      body: "Show instructions, coupon codes or any short text on scan.",
    },
  ];

  return (
    <SectionShell id="qr-types">
      <div aria-labelledby="qr-types-heading">
        <h2
          id="qr-types-heading"
          className="text-[24px] font-semibold tracking-tight text-[#050505] sm:text-[26px]"
          style={{ letterSpacing: "-0.04em" }}
        >
          What type of QR codes
          <br />
          can you create for free?
        </h2>
        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-neutral-700">
          Kompi&apos;s free QR code generator supports the most common QR types
          out of the box. Choose the one you need in the content step above.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {types.map((type) => (
            <article
              key={type.title}
              className="rounded-2xl border border-black/5 bg-[#f5f3ee]/80 p-4"
            >
              <h3 className="text-[13px] font-semibold text-[#050505]">
                {type.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-neutral-700">
                {type.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}


function RelatedQrToolsSection() {
  const links = [
    {
      href: "/qr-code/dynamic",
      label: "Dynamic QR codes",
      body: "Create QR codes you can update later without reprinting.",
    },
    {
      href: "/qr-code/static",
      label: "Static QR codes",
      body: "Simple QR codes that point straight to a URL or text.",
    },
    {
      href: "/qr-code/with-logo",
      label: "QR codes with logo",
      body: "Add your brand mark in the middle of a scannable QR.",
    },
    {
      href: "/qr-code/for-restaurant",
      label: "QR codes for restaurants",
      body: "Menu QR codes for tables, windows and takeaway packaging.",
    },
  ];

  return (
    <SectionShell id="more-qr-tools">
      <div aria-labelledby="more-qr-tools-heading">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
          More QR tools
        </p>
        <h2
          id="more-qr-tools-heading"
          className="mt-2 text-[24px] font-semibold tracking-tight text-[#050505]"
          style={{ letterSpacing: "-0.04em" }}
        >
          Explore more free QR code tools.
        </h2>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block rounded-2xl border border-black/5 bg-[#f5f3ee]/80 p-4"
            >
              <h3 className="text-[13px] font-semibold text-[#050505]">{item.label}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-neutral-700">{item.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}


function FaqSection() {
  const faqs = [
    {
      q: "Is this QR code generator really free?",
      a: "Yes. You can create and download static QR codes as PNG files for free without creating a Kompi account.",
    },
    {
      q: "Do free QR codes show the Kompi logo?",
      a: "Yes. Free QR codes include a small Kompi mark in the corner, similar to how other QR providers brand their codes. Paid Kompi plans unlock fully white-label QR codes and advanced branding options.",
    },
    {
      q: "Do the QR codes expire?",
      a: "Static QR codes created here never expire. They will keep working as long as the underlying URL, Wi-Fi details or other encoded value is still valid.",
    },
    {
      q: "What’s the difference between static and dynamic QR codes?",
      a: "Static QR codes point directly to a fixed value, such as a URL. Dynamic QR codes point to a Kompi short link, which you can edit later and track with analytics — without changing the printed code.",
    },
    {
      q: "Can I track how many times my QR is scanned?",
      a: "Scan tracking is available when your QR points to a Kompi short link. Create the link inside your Kompi dashboard, then generate a dynamic QR from it to see clicks and scans over time.",
    },
    {
      q: "Can I customise colours and add my own logo?",
      a: "Yes. The free QR generator lets you change colours, dot styles, borders and upload a logo. With a Kompi account you can save presets, sync brand colours and use your own domain.",
    },
  ];

  return (
    <SectionShell id="faq" className="pb-14">
      <div aria-labelledby="qr-faq-heading">
        <h2
          id="qr-faq-heading"
          className="text-[24px] font-semibold tracking-tight text-[#050505] sm:text-[26px]"
          style={{ letterSpacing: "-0.04em" }}
        >
          Frequently asked questions
          <br />
          about Kompi QR codes.
        </h2>
        <div className="mt-7 rounded-2xl border border-black/5 bg-white/90">
          {faqs.map((item, index) => (
            <details
              key={item.q}
              className={`group border-b border-black/5 last:border-b-0 ${
                index === 0 ? "rounded-t-2xl" : ""
              } ${index === faqs.length - 1 ? "rounded-b-2xl" : ""}`}
            >
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-[#050505]">
                <span>{item.q}</span>
                <span className="ml-4 text-xs text-neutral-500 group-open:hidden">
                  +
                </span>
                <span className="ml-4 hidden text-xs text-neutral-500 group-open:inline">
                  −
                </span>
              </summary>
              <div className="px-4 pb-4 text-[12px] leading-relaxed text-neutral-700">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

// --- Page ---

export default function QrCodeGeneratorPage() {
  // FAQ schema for rich results
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
    <div className="min-h-screen bg-[#f5f3ee] text-[#050505]">
      <Navbar />
      {/* Padding so the fixed header doesn’t overlap */}
      <main className="pt-16 md:pt-20">
        {/* Generator is the hero + main H1 */}
        <QrGenerator />

        {/* Supporting sections */}
        <QuickTemplatesStrip />
        <NewToQrSection />
        <HowItWorksSection />
        <UseCasesSection />
        <PlatformPitchSection />
        <TypesGridSection />
        <RelatedQrToolsSection />
        <FaqSection />

        <FooterCTA />

        {/* SEO: FAQ structured data */}
        <script
          type="application/ld+json"
           
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
    </div>
  );
}
