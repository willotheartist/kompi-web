import type { Metadata } from "next";
import Link from "next/link";
import JsonFormatter from "@/components/tools/JsonFormatter";
import { FooterCTA } from "@/components/footer-cta";

export const metadata: Metadata = {
  title:
    "Free JSON Formatter & Validator | Clean API Payloads Fast | Kompi Tools",
  description:
    "Format, validate, and minify JSON payloads directly in your browser. Perfect for API responses, webhooks, configs, and request bodies.",
};

const faqs = [
  {
    question: "Is the Kompi JSON formatter free?",
    answer:
      "Yes. The JSON formatter is free to use with no login or signup required.",
  },
  {
    question: "Is my JSON sent to Kompi servers?",
    answer:
      "No. Formatting happens in your browser. Kompi does not store or inspect the JSON you paste into this tool.",
  },
  {
    question: "What can I use this formatter for?",
    answer:
      "It works well for API responses, request bodies, webhook payloads, log snippets, and configuration files.",
  },
  {
    question: "Can I use this inside my Kompi dashboard?",
    answer:
      "Yes. When you create a free Kompi account you can pin the JSON formatter as a dashboard tool so it’s always one click away.",
  },
  {
    question: "Does it support big JSON payloads?",
    answer:
      "Yes, for most practical use cases. Extremely large payloads may be slow depending on your device and browser.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kompi JSON Formatter",
  url: "https://kompi.app/tools/json-formatter",
  applicationCategory: "DeveloperApplication",
  description:
    "Format, validate, and minify JSON payloads directly in your browser.",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function PublicJsonFormatterPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F3] text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-[-8rem] -z-10 transform-gpu blur-3xl">
          <div className="mx-auto h-64 max-w-3xl bg-gradient-to-r from-[#F4C6FF] via-[#A3CF3D] to-[#9BDFD1] opacity-60" />
        </div>

        <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-[#1E2330] shadow-sm ring-1 ring-[#E3F2FF]">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1F2933] text-[10px] font-semibold text-white">
              {}
            </span>
            <span>Kompi Tools · JSON formatter</span>
          </div>

          <div className="space-y-7">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Make{" "}
              <span className="bg-[#E8F739] px-2 text-[#1E2330]">
                messy JSON readable
              </span>{" "}
              in a single paste.
            </h1>

            <p className="mx-auto max-w-3xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Paste any JSON payload and instantly format, validate, and
              minify it—without leaving your browser, opening an IDE, or
              searching for another tool.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#json-formatter-tool"
                className="inline-flex items-center justify-center rounded-full bg-[#1E2330] px-7 py-3 text-sm font-medium text-[#F7F7F3] shadow-md shadow-[#1E2330]/30 transition hover:bg-black"
              >
                Format my JSON
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
                Runs 100% in your browser
              </div>
              <span>• No login required</span>
              <span>• Perfect for APIs, webhooks & config</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOOL SECTION */}
      <section
        id="json-formatter-tool"
        className="bg-[#F7F7F3] px-4 pb-20 pt-0 sm:px-6 lg:px-8 -mt-10"
      >
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#111111] p-[1px] shadow-xl shadow-[#111111]/30">
          <div className="rounded-[1.9rem] bg-[#FFFFFF] px-4 py-5 sm:px-6 sm:py-7 lg:px-8 lg:py-8">
            <JsonFormatter variant="public" />
          </div>
        </div>
      </section>

      {/* USE-CASES STRIP */}
      <section className="bg-[#FFFFFF] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E2330] sm:text-sm">
              JSON, BUT LESS CHAOTIC
            </h2>
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Built for devs, operators, and curious teammates.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col justify-between rounded-3xl bg-[#F7F7F3] p-6 shadow-sm ring-1 ring-[#E3F2FF]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                  API RESPONSES
                </p>
                <h3 className="text-lg font-semibold text-[#1E2330]">
                  Inspect payloads quickly
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Paste responses from your API client and read them like a
                  human instead of a wall of characters.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#F4C6FF] p-6 shadow-lg shadow-[#F4C6FF]/40 ring-2 ring-[#1E2330]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1E2330]">
                  WEBHOOKS & LOGS
                </p>
                <h3 className="text-lg font-semibold text-[#1E2330]">
                  Untangle noisy log lines
                </h3>
                <p className="text-sm text-[#111827]">
                  Format production logs or webhook payloads before you drop
                  them into tickets, docs, or DMs.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-3xl bg-[#E3F2FF] p-6 shadow-sm ring-1 ring-[#9BDFD1]">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#006B81]">
                  CONFIG & SETTINGS
                </p>
                <h3 className="text-lg font-semibold text-[#1E2330]">
                  Safer edits for config files
                </h3>
                <p className="text-sm text-[#4B5563]">
                  Pretty-print config, make changes, then minify again before
                  you paste it back into your app or dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#F7F7F3] px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl gap-14 space-y-10 lg:grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] lg:space-y-0">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about the JSON formatter?
            </h2>
            <p className="text-sm leading-relaxed text-[#4B5563] sm:text-base">
              Here&apos;s how this tool fits into your Kompi workflow alongside
              links, QR codes, and contact forms.
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

      <FooterCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
