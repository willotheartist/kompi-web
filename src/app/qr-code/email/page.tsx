import type { Metadata } from "next";
import Link from "next/link";
import { QrGenerator } from "@/components/qr-code-generator/QrGenerator";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title: "Email QR Codes | Free Email QR Code Generator | Kompi",
  description:
    "Create email QR codes that open a prefilled message in one scan. Use Kompi to generate email QR codes for support, bookings, events and more.",
  alternates: {
    canonical: "https://kompi.app/qr-code/email",
  },
};

const faqs = [
  {
    question: "Do email QR codes work on all phones?",
    answer:
      "Yes. Email QR codes use the standard mailto format, which iOS and Android both understand. When someone scans the QR, their default mail app opens with the address and details you encoded.",
  },
  {
    question: "Can I track how many times an email QR code is scanned?",
    answer:
      "You can track scans by pointing your QR at a Kompi short link instead of a raw mailto value. That turns it into a dynamic QR code with analytics inside your Kompi dashboard.",
  },
  {
    question: "Do email QR codes send the message automatically?",
    answer:
      "No. Scanning the QR only fills in the email; the user still reviews and taps send in their own email app. Nothing is sent without their input.",
  },
  {
    question: "Do email QR codes expire?",
    answer:
      "Static email QR codes do not expire — they keep working as long as the encoded email address is still valid. Dynamic QR codes stay active while your Kompi link and workspace are active.",
  },
  {
    question: "Can I use email QR codes on menus, posters or packaging?",
    answer:
      "Absolutely. Just make sure the printed QR has good contrast and is large enough to scan from a normal viewing distance. Test a printed sample before rolling it out everywhere.",
  },
  {
    question: "Which email address should I use?",
    answer:
      "Use an inbox that is regularly monitored by your team. Many businesses create a dedicated address like hello@, bookings@ or support@ so email QR codes always reach the right place.",
  },
  {
    question: "Can I change the destination address later?",
    answer:
      "With static QR codes, the encoded email address is fixed. If you want to change the destination later, use a Kompi short link and dynamic QR code instead so you can edit it without reprinting.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi Email QR Code Generator",
  url: "https://kompi.app/qr-code/email",
  applicationCategory: "UtilitiesApplication",
  description:
    "Create email QR codes that open a prefilled message in one scan with Kompi's free email QR code generator.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function EmailQrCodePage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO – same structure as password generator */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#E8F739] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111827] text-[10px] font-semibold text-white">
              QR
            </span>
            <span>Kompi QR Tools · Email QR codes</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Email QR codes that{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                open a message
              </span>{" "}
              in the right inbox with one scan.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Paste an email address, pick a subject line and optional message, and
              Kompi builds an email QR code that opens a prefilled email in one scan.
              Perfect for support, bookings, event questions, feedback and anything
              else you want people to email you about.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#email-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Create an email QR code
              </a>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-[#1E2330] bg-[#FFFFFF] px-7 py-3 text-sm font-medium text-[#1E2330] shadow-sm hover:bg-[#F7F7F3]"
              >
                Add to my Kompi dashboard
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-[#6B7280] sm:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 ring-1 ring-[#E3F2FF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                Opens the mail app in one scan
              </div>
              <span>• Works on menus, posters & packaging</span>
              <span>• No login or account required</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION – dark card with generator inside */}
      <section
        id="email-tool"
        className="-mt-10 bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#111827] p-[1px] shadow-xl shadow-[#111827]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <QrGenerator />
          </div>
        </div>
      </section>

      {/* PLAN-STYLE CARDS – three ways to use email QRs */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              CHOOSE YOUR EMAIL QR STYLE
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              One generator, three ways to open your inbox.
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Use email QR codes as a quick contact button, a support channel, or a
              structured way to capture feedback without typing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-7 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  QUICK CONTACT
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Simple hello
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  QR codes that open a blank email to your main address — ideal for
                  general enquiries and introductions.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Great for business cards</li>
                  <li>• Perfect for shop windows</li>
                  <li>• Easy for one-off questions</li>
                </ul>
              </div>
              <div className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#1E2330] bg-white px-4 py-2.5 text-xs font-medium text-[#1E2330]">
                Create a simple contact QR
              </div>
            </div>

            {/* Card 2 – highlighted */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-7 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1E2330] px-3 py-1 text-[11px] font-semibold text-[#F7F7F3]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A3CF3D]" />
                  Recommended
                </div>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Support inbox
                </h3>
                <p className="text-sm text-[#111827] sm:text-base">
                  Email QR codes that prefill the subject line so your team instantly
                  knows what each message is about.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#111827]">
                  <li>• &quot;Support request&quot; or &quot;Order question&quot;</li>
                  <li>• Easier triage and routing</li>
                  <li>• Ideal for receipts & packaging</li>
                </ul>
              </div>
              <div className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#1E2330] px-4 py-2.5 text-xs font-semibold text-[#F7F7F3]">
                Create a support email QR
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-7 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  STRUCTURED FEEDBACK
                </p>
                <h3 className="text-xl font-semibold text-[#1E2330] sm:text-2xl">
                  Guided replies
                </h3>
                <p className="text-sm text-[#4B5563] sm:text-base">
                  Prefill the subject and a short message stub so people know exactly
                  what to include when they email you.
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-[#374151]">
                  <li>• Perfect for feedback and reviews</li>
                  <li>• Helps you collect the right details</li>
                  <li>• Great for restaurants & events</li>
                </ul>
              </div>
              <div className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#006B81] bg-[#006B81] px-4 py-2.5 text-xs font-semibold text-white">
                Create a feedback email QR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRIGHT STRIP */}
      <section className="bg-[#F7F7F3] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[999px] bg-[#E8F739] px-8 py-10 text-center shadow-md sm:px-12">
            <h2 className="text-xl font-semibold text-[#1E2330] sm:text-2xl md:text-3xl">
              Ready to turn scans into conversations?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[#111827] sm:text-base">
              Use Kompi&apos;s free email QR code generator now, then connect it to your
              Kompi dashboard so every scan becomes a clear, trackable email.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#email-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-6 py-2.5 text-xs font-semibold text-[#F7F7F3] shadow hover:bg-black"
              >
                Create an email QR code
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

      {/* FEATURE PANELS – with Kompi visuals instead of videos */}
      <section className="bg-[#FFFFFF] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-12">
          <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Email QR codes that feel at home everywhere you print.
          </h2>

          {/* Panel 1 */}
          <div className="grid gap-10 rounded-3xl bg-[#E3F2FF] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR RESTAURANTS & CAFÉS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                Bookings, special requests and feedback in one scan.
              </h3>
              <p className="text-sm leading-relaxed text-[#374151] sm:text-base">
                Put email QR codes on menus, receipts and table tents so guests can
                ask about bookings, allergies or feedback without waiting for the
                right moment to talk.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <img
                  src="/kompiimage18.png"
                  alt="Kompi QR codes on restaurant materials"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <div className="grid gap-10 rounded-3xl bg-[#9BDFD1] p-10 sm:grid-cols-2 sm:p-16">
            <div className="order-2 flex items-center justify-center sm:order-1">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#F7F7F3] shadow-md sm:h-80 sm:w-80">
                <img
                  src="/kompiimage19.png"
                  alt="Kompi QR codes used in campaigns and events"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 space-y-5 sm:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#1E2330] sm:text-sm">
                FOR RETAIL, TEAMS & EVENTS
              </p>
              <h3 className="text-2xl font-semibold text-[#1E2330] sm:text-3xl">
                One QR, the right inbox for every campaign.
              </h3>
              <p className="text-sm leading-relaxed text-[#111827] sm:text-base">
                Use email QR codes on posters, packaging, flyers, badges and event
                signage. Each scan opens an email with the context baked into the
                subject line so your team knows exactly what it&apos;s about.
              </p>
            </div>
          </div>

          {/* Panel 3 */}
          <div className="grid gap-10 rounded-3xl bg-[#111827] p-10 sm:grid-cols-2 sm:p-16">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E3F2FF] sm:text-sm">
                FOR OPERATIONS & SUPPORT TEAMS
              </p>
              <h3 className="text-2xl font-semibold text-[#E3F2FF] sm:text-3xl">
                Keep every request structured and answerable.
              </h3>
              <p className="text-sm leading-relaxed text-[#E5E7EB] sm:text-base">
                Prefill subjects and message stubs so every email arrives with the
                details you need. Pair email QR codes with Kompi&apos;s short links
                and analytics when you want full visibility into how often they&apos;re
                scanned.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="h-56 w-56 overflow-hidden rounded-[2rem] bg-[#0B1220] shadow-md sm:h-80 sm:w-80">
                <img
                  src="/kompi-platform.png"
                  alt="Kompi platform with QR analytics and links"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMPLE TESTIMONIAL ROW */}
      <section className="bg-[#F7F7F3] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6B7280] sm:text-sm">
              PEOPLE SEEM TO LIKE SCANNING INSTEAD OF TYPING
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Tiny QR code, big upgrade to how people contact you.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Guests actually email us now”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We put email QR codes on our menus for bookings and allergy notes.
                It made it way easier for people to reach us without phoning.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Great for campaigns and posters”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “We use email QR codes on event flyers so questions go to the right
                inbox. People love how fast it is.”
              </p>
            </div>
            <div className="rounded-3xl bg-[#FFFFFF] p-5 shadow-sm ring-1 ring-[#E3F2FF]">
              <p className="mb-2 text-xs text-[#FBBF24]">★★★★★</p>
              <p className="text-sm font-semibold text-[#1E2330]">
                “Clean, no-nonsense design”
              </p>
              <p className="mt-2 text-xs text-[#4B5563]">
                “Feels like a real product page, not a tech demo. The generator is
                front and center and the rest of the page actually explains how to
                use email QR codes well.”
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
              Questions about email QR codes?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s what people usually want to know about using email QR codes
              with Kompi. No jargon, just straight answers.
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
