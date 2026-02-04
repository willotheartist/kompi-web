import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FooterCTA } from "@/components/footer-cta";

const SITE_URL = "https://kompi.app";
const SLUG = "url-link-shortener-tool";
const CANONICAL = `${SITE_URL}/blog/${SLUG}`;

// ✅ Pick an existing image from /public (swap anytime)
const FEATURED_IMAGE_PATH = "/growth/links.png";
const FEATURED_IMAGE_URL = `${SITE_URL}${FEATURED_IMAGE_PATH}`;

// ✅ Keyword once in alt (don’t spam)
const FEATURED_IMAGE_ALT = "URL link shortener tool by Kompi";

// ✅ Video from /public (you can swap to another file you have)
const FEATURED_VIDEO_PATH = "/kompivideo.mp4";

export const metadata: Metadata = {
  title: "URL Link Shortener Tool by Kompi",
  description:
    "Kompi is a URL link shortener tool built for cleaner links, better branding, and clear insight into how your shared URLs perform across social, email, QR codes, and offline.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "URL Link Shortener Tool by Kompi",
    description:
      "Create clean, professional short URLs with Kompi. Built for modern sharing across social, email, QR codes, and offline campaigns.",
    url: CANONICAL,
    type: "article",
    images: [
      {
        url: FEATURED_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: FEATURED_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "URL Link Shortener Tool by Kompi",
    description:
      "Create clean, professional short URLs with Kompi — built for modern sharing across social, email, QR codes, and offline.",
    images: [FEATURED_IMAGE_URL],
  },
};

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Page() {
  const faqs = [
    {
      q: "What is a URL link shortener?",
      a: "A URL link shortener takes a long web address and converts it into a shorter, more readable URL that’s easier to share, remember, and use across channels.",
    },
    {
      q: "What’s the difference between Kompi and a basic link shortener?",
      a: "Basic tools only shorten URLs. Kompi is built to help you manage and organise shared URLs over time, keep sharing consistent, and understand engagement without complexity.",
    },
    {
      q: "Can I use Kompi short links for QR codes?",
      a: "Yes. Short links are ideal for QR workflows because they look cleaner, are easier to manage, and work well across print and real-world placements.",
    },
    {
      q: "When should I use a URL shortening tool?",
      a: "Use a shortening tool when you want cleaner URLs, more trustworthy-looking links, easier sharing across platforms, and better control over shared destinations long-term.",
    },
    {
      q: "Is Kompi good for teams?",
      a: "Yes. Kompi is especially useful for teams sharing links across campaigns or projects who want consistency, organisation, and clarity without a heavy workflow.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "URL Link Shortener Tool by Kompi",
    description:
      "Kompi is a URL link shortener tool built for cleaner links, better branding, and real insight into how shared URLs perform across social, email, QR codes, and offline.",
    mainEntityOfPage: CANONICAL,
    url: CANONICAL,
    image: [FEATURED_IMAGE_URL],
    author: { "@type": "Organization", name: "Kompi" },
    publisher: { "@type": "Organization", name: "Kompi" },
  };

  const tools = [
    {
      title: "UTM Builder",
      href: "/tools/utm-builder",
      desc: "Generate clean UTM links for campaigns, then shorten and share them with Kompi.",
      img: "/growth/analytics.png",
      alt: "UTM builder tool for tracking short links",
    },
    {
      title: "QR Code Generator",
      href: "/qr-code/with-logo",
      desc: "Turn your short URL into a QR code people actually scan — perfect for print and events.",
      img: "/growth/kompi-codes.png",
      alt: "QR code generator for a shortened URL",
    },
    {
      title: "Landing Page Creator",
      href: "/landing-page-creator",
      desc: "Create a simple page for your links, then share it using a clean, short URL.",
      img: "/growth/k-cards.png",
      alt: "Landing page creator for sharing links",
    },
    {
      title: "WhatsApp Link Generator",
      href: "/whatsapp-link-generator",
      desc: "Create a WhatsApp click-to-chat link and shorten it for posts, bio, and campaigns.",
      img: "/growth/links.png",
      alt: "WhatsApp link generator with URL shortener tool",
    },
    {
      title: "Hashtag Generator",
      href: "/hashtag-generator",
      desc: "Pair better hashtags with cleaner links for social posts that look more intentional.",
      img: "/growth/subscribers.png",
      alt: "Hashtag generator to promote short links",
    },
    {
      title: "Barcode Generator",
      href: "/barcode-generator",
      desc: "Generate a barcode for packaging or inventory and link it to a short URL destination.",
      img: "/growth/kompi-branding.png",
      alt: "Barcode generator connected to a shortened URL",
    },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* HERO (text left, image right) */}
        <header className="mb-12">
          <p className="text-sm text-neutral-500">Kompi Blog</p>

          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">
                URL Link Shortener Tool by Kompi
              </h1>

              <p className="mt-4 max-w-xl text-lg leading-7 text-neutral-700">
                Clean, professional short URLs built for modern sharing across
                social media, email campaigns, QR codes, and offline materials.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
                >
                  Sign up free
                </Link>
                <Link
                  href="/features/url-shortener"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
                >
                  Explore the URL Shortener feature
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-500">
                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                  Link Shortener
                </span>
                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                  URL Link Shortener
                </span>
                <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                  Link Shortener Tool
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
              <Image
                src={FEATURED_IMAGE_PATH}
                alt={FEATURED_IMAGE_ALT}
                width={1200}
                height={630}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
          {/* CONTENT */}
          <article className="min-w-0">
            {/* INTRO */}
            <section className="space-y-4 text-neutral-800">
              <p className="leading-7">
                If you share links online, you already know the problem: long
                URLs look messy, break in messages, and are hard to track.
              </p>

              <p className="leading-7">
                <strong>Kompi is a URL link shortener tool</strong> built for
                people and businesses who want cleaner links, better branding,
                and real insight into how their shared URLs perform — without
                relying on bloated platforms or black-box analytics.
              </p>

              <p className="leading-7">
                Whether you’re sharing content on social media, sending campaigns
                by email, printing QR codes, or adding links to business cards,
                Kompi helps make every shared URL shorter, clearer, and more
                useful.
              </p>
            </section>

            <div className="my-10 h-px w-full bg-neutral-200" />

            {/* VIDEO SECTION */}
            <section id="video" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Watch: URL link shortener tool in action
              </h2>

              <p className="mt-4 leading-7 text-neutral-800">
                A quick look at how a <strong>URL link shortener</strong> fits
                into real-world sharing — and how Kompi keeps links clean and
                easy to manage.
              </p>

              <div className="mt-6 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-950">
                <video
                  className="h-auto w-full"
                  controls
                  preload="metadata"
                  playsInline
                  aria-label="Video showing the Kompi URL link shortener tool"
                >
                  <source src={FEATURED_VIDEO_PATH} type="video/mp4" />
                </video>
              </div>

              <p className="mt-3 text-sm text-neutral-600">
                Tip: use a short URL + QR code together for print, events, and
                offline discovery.
              </p>
            </section>

            <div className="my-10 h-px w-full bg-neutral-200" />

            {/* WHAT IS */}
            <section id="what-is" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                What is a URL link shortener?
              </h2>

              <div className="mt-4 space-y-4 text-neutral-800">
                <p className="leading-7">
                  A <strong>URL link shortener</strong> takes a long, complex web
                  address and turns it into a short, readable version that’s
                  easy to share and remember.
                </p>

                <h3 className="text-lg font-semibold text-neutral-900">
                  Modern link shortening isn’t just fewer characters
                </h3>

                <p className="leading-7">
                  Today, tools in this space are expected to help manage how
                  links look, behave, and perform across different channels.
                  Instead of acting as disposable shortcuts, shortened URLs are
                  now part of a broader sharing and discovery strategy.
                </p>

                <p className="leading-7">
                  That’s where Kompi focuses its attention.
                </p>
              </div>
            </section>

            <div className="my-10 h-px w-full bg-neutral-200" />

            {/* WHY KOMPI */}
            <section id="why-kompi" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Why use Kompi instead of a basic link shortener?
              </h2>

              <div className="mt-4 space-y-6 text-neutral-800">
                <p className="leading-7">
                  Kompi is designed to go beyond basic shortening. Instead of
                  simply generating short URLs, Kompi helps you manage,
                  organise, and understand your shared links in one place. Each
                  link becomes a reusable asset rather than a one-off redirect.
                </p>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <h3 className="text-lg font-semibold text-neutral-900">
                    What you can do with Kompi
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-800">
                    <li>Create clean, professional-looking URLs</li>
                    <li>Keep branding consistent across shared content</li>
                    <li>Understand how people interact with what you share</li>
                    <li>Update or manage destinations without breaking links</li>
                  </ul>
                  <p className="mt-4 leading-7 text-neutral-700">
                    This makes Kompi especially useful for creators, startups,
                    and teams who share links regularly and want clarity without
                    complexity.
                  </p>
                </div>

                <h3 className="text-lg font-semibold text-neutral-900">
                  Built for control over time
                </h3>
                <p className="leading-7">
                  Links often live longer than you expect. Kompi helps you keep
                  shared URLs organised and manageable over time — across
                  projects, campaigns, and different channels.
                </p>
              </div>
            </section>

            <div className="my-10 h-px w-full bg-neutral-200" />

            {/* USEFUL TOOLS */}
            <section id="useful-tools" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Useful tools to share and track short links
              </h2>

              <p className="mt-4 leading-7 text-neutral-800">
                A <strong>link shortener tool</strong> becomes more powerful
                when it’s paired with simple sharing tools. These Kompi tools
                help you build cleaner campaigns, create QR codes, and keep your
                URLs consistent across channels.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="group rounded-2xl border border-neutral-200 bg-white p-5 hover:bg-neutral-50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
                        <Image
                          src={t.img}
                          alt={t.alt}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-neutral-900 group-hover:underline">
                          {t.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-neutral-700">
                          {t.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div className="my-10 h-px w-full bg-neutral-200" />

            {/* HUMAN FRIENDLY */}
            <section id="human-friendly" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Simple, fast, and human-friendly
              </h2>

              <div className="mt-4 space-y-4 text-neutral-800">
                <p className="leading-7">
                  Kompi is designed to be simple to use, without sacrificing
                  power.
                </p>

                <h3 className="text-lg font-semibold text-neutral-900">
                  Clear UI, no messy dashboards
                </h3>

                <p className="leading-7">
                  You don’t need technical knowledge to create or manage your
                  URLs, and you don’t need to dig through complex dashboards to
                  understand performance. Everything is built to feel clear,
                  fast, and approachable.
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <h3 className="text-lg font-semibold text-neutral-900">
                  When should you use a URL shortening tool?
                </h3>
                <p className="mt-3 leading-7 text-neutral-800">
                  A solution like Kompi is useful whenever you want to:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-800">
                  <li>Share cleaner, more readable URLs</li>
                  <li>Keep links organised in one place</li>
                  <li>Improve trust and clarity when sharing content</li>
                  <li>Understand engagement without complexity</li>
                  <li>Maintain control over shared destinations long-term</li>
                </ul>
              </div>
            </section>

            <div className="my-10 h-px w-full bg-neutral-200" />

            {/* CTA */}
            <section id="cta" className="scroll-mt-24">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-900 p-7 text-white">
                <h2 className="text-xl font-semibold">
                  Start using Kompi as your URL link shortener tool
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/85">
                  Create clean short URLs, keep links organised, and make sharing
                  feel intentional across every channel.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-white/90"
                  >
                    Sign up free
                  </Link>
                  <Link
                    href="/features/url-shortener"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
                  >
                    See URL Shortener feature
                  </Link>
                </div>
              </div>
            </section>

            <div className="my-10 h-px w-full bg-neutral-200" />

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
                Frequently asked questions
              </h2>

              <div className="mt-6 space-y-4">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-2xl border border-neutral-200 bg-white p-5"
                  >
                    <summary className="cursor-pointer list-none font-medium text-neutral-900">
                      <span className="mr-2 inline-block select-none text-neutral-400 group-open:rotate-90">
                        ▸
                      </span>
                      {f.q}
                    </summary>
                    <p className="mt-3 leading-7 text-neutral-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-xs font-medium tracking-wide text-neutral-500">
                ON THIS PAGE
              </p>
              <nav className="mt-4 space-y-2 text-sm">
                {[
                  { href: "#video", label: "Video demo" },
                  { href: "#what-is", label: "What is a URL link shortener?" },
                  { href: "#why-kompi", label: "Why use Kompi?" },
                  { href: "#useful-tools", label: "Useful tools" },
                  { href: "#human-friendly", label: "Simple and human-friendly" },
                  { href: "#cta", label: "Get started" },
                  { href: "#faq", label: "FAQ" },
                ].map((i) => (
                  <a
                    key={i.href}
                    href={i.href}
                    className="block rounded-lg px-2 py-1 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  >
                    {i.label}
                  </a>
                ))}
              </nav>

              <div className="mt-6 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-sm font-medium text-neutral-900">
                  Want the product page?
                </p>
                <p className="mt-1 text-xs leading-5 text-neutral-600">
                  Explore the URL shortener feature and create your first short
                  URL in minutes.
                </p>
                <Link
                  href="/features/url-shortener"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
                >
                  Go to URL Shortener
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <FooterCTA />
    </>
  );
}
