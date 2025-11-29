// src/app/qr-code-generator/page.tsx

import type { Metadata } from "next";
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
    <section
      aria-label="Popular QR code templates"
      className="bg-[#F5F0FF] px-4 py-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              QR code ideas
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
              Fast templates for popular QR code types
            </h2>
          </div>
          <p className="max-w-xs text-[11px] text-slate-600">
            Use the free QR code generator above to create any of these in a
            few seconds — no account needed.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
          {cards.map((card) => (
            <article
              key={card.label}
              className="flex flex-col justify-between rounded-2xl border border-violet-100 bg-white px-3 py-3 text-left shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
            >
              <h3 className="text-[12px] font-semibold text-slate-950">
                {card.label}
              </h3>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewToQrSection() {
  return (
    <section
      id="qr-basics"
      className="bg-[#100921] px-4 py-16 text-slate-50"
      aria-labelledby="qr-basics-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:items-start">
        {/* Left: image */}
        <div className="relative w-full max-w-md flex-1">
          <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-emerald-400/10 blur-2xl" />
          <div className="relative rounded-[28px] border border-white/10 bg-slate-950/40 p-4 shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
            <img
              src="/kompi-analytics.png"
              alt="Kompi dashboard with QR analytics and links"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Right: copy */}
        <div className="flex-1 max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-200">
            New to QR codes?
          </p>
          <h2
            id="qr-basics-heading"
            className="mt-3 text-[26px] font-semibold leading-[1.1] tracking-tight sm:text-[32px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Everything you need to know
            <br />
            about{" "}
            <span className="wf-serif-accent italic text-violet-100">
              free QR codes
            </span>
            .
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-slate-200">
            A QR code is just a visual way of storing information — usually a
            URL. When someone scans it, their camera opens whatever you&apos;ve
            encoded: a website, menu, Wi-Fi network, contact card and more.
          </p>

          <ul className="mt-5 space-y-2 text-[13px] leading-relaxed text-slate-200">
            <li>• Kompi&apos;s free generator creates static PNG QR codes.</li>
            <li>
              • Static QR codes never expire — they work as long as the
              destination is valid.
            </li>
            <li>
              • Free downloads include a tiny{" "}
              <span className="font-semibold">Kompi</span> logo mark, similar
              to other QR providers.
            </li>
            <li>
              • Want editable destinations and scan analytics? Use a{" "}
              <span className="font-semibold">Kompi link</span> behind your QR.
            </li>
          </ul>

          <p className="mt-4 text-[12px] text-slate-300">
            Upgrade to dynamic QR codes in Kompi and change where a QR points
            without reprinting anything.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-[12px]">
            <a
              href="/signin"
              className="inline-flex items-center justify-center rounded-full bg-slate-50 px-7 py-2.5 font-semibold text-slate-950 shadow-lg shadow-violet-500/40 transition hover:bg-white"
            >
              Open Kompi dashboard
            </a>
            <a
              href="/pricing"
              className="text-[12px] font-medium text-violet-100 underline-offset-4 hover:underline"
            >
              See QR & link plans →
            </a>
          </div>
        </div>
      </div>
    </section>
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
    <section
      id="how-it-works"
      className="bg-white px-4 py-16"
      aria-labelledby="qr-how-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            How it works
          </p>
          <h2
            id="qr-how-heading"
            className="mt-2 text-[26px] font-semibold leading-[1.15] tracking-tight text-slate-950 sm:text-[30px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Create a free QR code
            <br />
            in three simple steps.
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-600">
            The generator at the top of this page handles everything. You don&apos;t
            need an account to create or download a QR code.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.step}
              className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-[12px] bg-slate-900 text-[11px] font-semibold text-slate-50">
                  {step.step}
                </div>
                <h3 className="text-sm font-semibold text-slate-950">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-600">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
    <section
      id="use-cases"
      className="bg-white px-4 pb-16 pt-10"
      aria-labelledby="qr-use-cases-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="qr-use-cases-heading"
          className="text-[24px] font-semibold tracking-tight text-slate-950 sm:text-[26px]"
          style={{ letterSpacing: "-0.04em" }}
        >
          Where Kompi QR codes
          <br />
          make the biggest impact.
        </h2>
        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-slate-600">
          Turn anything with a surface into a smart link. Kompi QR codes work
          anywhere you can print or display an image — and dynamic QR codes let
          you change destinations later.
        </p>

        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-[0_14px_36px_rgba(15,23,42,0.06)]"
            >
              <h3 className="text-sm font-semibold text-slate-950">
                {card.title}
              </h3>
              <p className="mt-3 text-[12px] leading-relaxed text-slate-600">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
    <section
      id="platform"
      className="bg-[#FFF8EC] px-4 py-16"
      aria-labelledby="qr-platform-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700/80">
              Kompi platform
            </p>
            <h2
              id="qr-platform-heading"
              className="mt-2 text-[26px] font-semibold leading-[1.15] tracking-tight text-slate-950 sm:text-[30px]"
              style={{ letterSpacing: "-0.04em" }}
            >
              More than a free
              <br />
              QR code generator.
            </h2>
            <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-slate-800">
              Behind every QR you create, you can plug into Kompi&apos;s full
              platform — short links, QR menus, KR Codes, bio pages and rich
              analytics. One login, one place to see how people actually find
              you.
            </p>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {cards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-2xl border border-amber-100 bg-white/80 p-4 text-left shadow-[0_16px_40px_rgba(180,83,9,0.15)]"
                >
                  <h3 className="text-[13px] font-semibold text-slate-950">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-700">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-[12px]">
              <a
                href="/pricing"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-2.5 font-semibold text-white shadow-lg shadow-slate-900/40 transition hover:bg-black"
              >
                See Kompi plans
              </a>
              <a
                href="/signin"
                className="text-[12px] font-medium text-slate-900 underline-offset-4 hover:underline"
              >
                Or create a free account →
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-gradient-to-br from-amber-300/50 via-orange-400/20 to-pink-400/20 blur-2xl" />
            <div className="relative rounded-[28px] border border-amber-100 bg-white p-4 shadow-[0_26px_70px_rgba(148,64,12,0.35)]">
              <img
                src="/kompi-platform.png"
                alt="Kompi platform with links, QR codes and analytics"
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <section
      id="qr-types"
      className="bg-white px-4 py-16"
      aria-labelledby="qr-types-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="qr-types-heading"
          className="text-[24px] font-semibold tracking-tight text-slate-950 sm:text-[26px]"
          style={{ letterSpacing: "-0.04em" }}
        >
          What type of QR codes
          <br />
          can you create for free?
        </h2>
        <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-slate-600">
          Kompi&apos;s free QR code generator supports the most common QR types
          out of the box. Choose the one you need in the content step above.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {types.map((type) => (
            <article
              key={type.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
            >
              <h3 className="text-[13px] font-semibold text-slate-950">
                {type.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
                {type.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
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
    <section
      id="faq"
      className="bg-slate-50 px-4 py-16"
      aria-labelledby="qr-faq-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="qr-faq-heading"
          className="text-[24px] font-semibold tracking-tight text-slate-950 sm:text-[26px]"
          style={{ letterSpacing: "-0.04em" }}
        >
          Frequently asked questions
          <br />
          about Kompi QR codes.
        </h2>
        <div className="mt-7 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/80">
          {faqs.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium text-slate-900">
                <span>{item.q}</span>
                <span className="ml-4 text-xs text-slate-500 group-open:hidden">
                  +
                </span>
                <span className="ml-4 hidden text-xs text-slate-500 group-open:inline">
                  −
                </span>
              </summary>
              <div className="px-4 pb-4 text-[12px] leading-relaxed text-slate-600">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
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
    <div className="min-h-screen bg-slate-50">
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
        <FaqSection />

        <FooterCTA />

        {/* SEO: FAQ structured data */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </main>
    </div>
  );
}
