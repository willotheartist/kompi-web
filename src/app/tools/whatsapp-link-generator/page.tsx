import type { Metadata } from "next";
import Link from "next/link";
import ContactLinkGenerator from "@/components/tools/ContactLinkGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free WhatsApp Link Generator | Click-to-Chat, Call & SMS Links | Kompi Tools",
  description:
    "Create WhatsApp click-to-chat links, click-to-call phone links, and SMS links in seconds with Kompi's free contact link generator.",
};

const faqs = [
  {
    question: "What does the Kompi contact link generator do?",
    answer:
      "It helps you create WhatsApp click-to-chat links, click-to-call phone links, and SMS links. You can then use these on your website, social bio, buttons, QR codes, or inside Kompi k-cards and menus.",
  },
  {
    question: "Is this WhatsApp link generator free?",
    answer:
      "Yes. You can create as many WhatsApp, phone, and SMS links as you like for free. No login is required to use the public tool.",
  },
  {
    question: "How do WhatsApp links work?",
    answer:
      "A WhatsApp link uses the wa.me format. When someone taps it on a device with WhatsApp installed, it opens a chat window with your number, and optionally a prefilled message you set in this tool.",
  },
  {
    question: "Which phone number format should I use?",
    answer:
      "Include your full international number with country code, such as +44 7700 900000. Kompi cleans the number and builds a link that works globally where the app is supported.",
  },
  {
    question: "Can I prefill a message in WhatsApp or SMS links?",
    answer:
      "Yes. You can add an optional message. When someone taps the link, that message will appear in their chat or SMS composer before they press send.",
  },
  {
    question: "Do you store my phone number or messages?",
    answer:
      "No. Everything is generated in real time for you in this tool. Kompi does not save your phone numbers or messages from this public page.",
  },
  {
    question: "Can I turn these links into QR codes?",
    answer:
      "Yes. After you generate a link, you can copy it into Kompi's QR tools or into any QR generator to make a scannable code for print materials, menus, or posters.",
  },
  {
    question: "How does this help with marketing?",
    answer:
      "Clear contact links reduce friction. When you share one-tap links to WhatsApp, phone, or SMS, more people actually reach out from your campaigns, profiles, and landing pages.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi WhatsApp & Contact Link Generator",
  url: "https://kompi.app/tools/whatsapp-link-generator",
  applicationCategory: "UtilitiesApplication",
  description:
    "Generate WhatsApp click-to-chat links, click-to-call phone links, and SMS links for your website, QR codes, and Kompi cards.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function WhatsAppLinkGeneratorPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#006B81] text-[10px] font-semibold text-white">
              K
            </span>
            <span>Kompi Tools · WhatsApp & contact links</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              One{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                free link generator
              </span>{" "}
              for WhatsApp, phone calls, and SMS.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Stop googling obscure URL formats. Type your phone number once,
              choose WhatsApp, phone, or SMS, and Kompi creates the perfect
              click-to-contact link for you — ready to paste anywhere.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Generate a contact link
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Works with WhatsApp, phone & SMS
              </div>
              <span>• No login required</span>
              <span>• Perfect for bios, buttons & QR codes</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL – directly under hero */}
      <section
        id="contact-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-3xl rounded-[2rem] bg-[#1E2330] p-[1px] shadow-xl shadow-[#1E2330]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <ContactLinkGenerator variant="compact" />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS – WhatsApp / Phone / SMS */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              THREE CHANNELS, ONE TOOL
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Turn your number into links people actually tap.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Build simple, human-friendly contact flows: WhatsApp for chats,
              phone links for urgent calls, and SMS for quick confirmations or
              bookings.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* WhatsApp */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  WHATSAPP
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Click-to-chat links
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Send people straight into a WhatsApp chat with your team or
                  business, with an optional prefilled message.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Perfect for social bios & link-in-bio</li>
                  <li>• Great for support & sales teams</li>
                  <li>• Works globally where WhatsApp is supported</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]">
                Make a WhatsApp link
              </button>
            </div>

            {/* Phone */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-7 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                  Most tapped
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Click-to-call buttons
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Turn your phone number into one-tap call links that work from
                  mobile browsers and many desktop apps.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• Ideal for bookings & urgent enquiries</li>
                  <li>• Great for restaurants, salons & local services</li>
                  <li>• Easy to drop into any website or Kompi card</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3] hover:bg-black">
                Make a call link
              </button>
            </div>

            {/* SMS */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  SMS / TEXT
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Prefilled SMS links
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Create SMS links with ready-to-send messages for confirmations,
                  waitlists, or quick inbound leads.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Helpful for regions where WhatsApp isn&apos;t the norm</li>
                  <li>• Works with many default SMS apps</li>
                  <li>• Easy to pair with QR codes at checkout</li>
                </ul>
              </div>
              <button className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#006B81] bg-[#006B81] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#034557]">
                Make an SMS link
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* BRIGHT STRIP */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#E8F739] px-8 py-10 text-center shadow-md sm:px-12">
            <h2 className="text-xl font-semibold text-[#1E2330] sm:text-2xl md:text-3xl">
              Turn “DM us” into one-tap contact buttons.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#111827] sm:text-base">
              Generate your links once in Kompi, reuse them everywhere, and add
              them as buttons in your k-cards, menus, and QR-powered experiences.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] shadow hover:bg-black"
              >
                Generate a contact link
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-6 py-2.5 text-xs font-medium text-[#1E2330] hover:bg-[#F7F7F3]"
              >
                Create free Kompi account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE TESTIMONIAL ROW */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              USED BY TEAMS & SOLO CREATORS
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tiny link changes, big lift in replies.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#F7F7F3] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Higher reply rate from IG”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “Switching to a WhatsApp click link from a plain number made a
                noticeable difference in people actually reaching out.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#F7F7F3] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great for QR menus”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We pair the links with QR codes on tables so guests can text or
                WhatsApp us instead of calling the bar.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#F7F7F3] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “No more googling URL formats”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “I used to look up WhatsApp link syntax every time. Now I just
                use this tool, save it in Kompi, done.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F7F3] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about WhatsApp & contact links?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here are the most common questions we hear from people using Kompi
              to power their contact flows.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-2xl border border-[#E3F2FF] bg-[#FFFFFF] p-5 text-sm"
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

      {/* Global footer CTA */}
      <FooterCTA />

      {/* JSON-LD schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
