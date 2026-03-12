import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Sparkles, Globe2, Bot, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Kompi Chat",
  description:
    "Add a branded AI chat widget to your site, answer questions instantly, capture leads, and guide visitors toward action with Kompi Chat.",
  alternates: {
    canonical: "https://kompi.app/chat",
  },
  openGraph: {
    title: "Kompi Chat | AI chat for websites",
    description:
      "Branded website chat for small businesses, creators, and teams — built inside Kompi.",
    url: "https://kompi.app/chat",
    siteName: "Kompi",
    images: ["/kompicollage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kompi Chat | AI chat for websites",
    description:
      "Add branded AI chat to your site with Kompi Chat.",
    images: ["/kompicollage.png"],
  },
};

const featureCards = [
  {
    icon: Bot,
    title: "Answer instantly",
    body:
      "Give visitors fast answers about pricing, services, booking, products, and common questions — without losing your brand tone.",
  },
  {
    icon: Globe2,
    title: "Train it on your business",
    body:
      "Use your website, help docs, and product details to shape responses so the experience feels relevant, useful, and on-brand.",
  },
  {
    icon: Sparkles,
    title: "Capture more intent",
    body:
      "Turn passive traffic into conversations. Guide visitors toward the right page, booking, enquiry, or next step.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create your chat",
    body:
      "Set your assistant name, welcome message, tone, and visual style from your Kompi workspace.",
  },
  {
    number: "02",
    title: "Add your sources",
    body:
      "Point Kompi Chat at your website and business content so it can answer with more relevance and context.",
  },
  {
    number: "03",
    title: "Install and go live",
    body:
      "Copy one small script, publish, and start turning visits into useful conversations.",
  },
];

export default function ChatPage() {
  return (
    <main className="wf-root min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 pt-32 md:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr),minmax(0,0.92fr)] lg:items-center">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-subtle)]">
              <MessageSquare className="h-4 w-4 text-[#C4C8FF]" />
              New in Kompi
            </div>

            <h1 className="mt-6 max-w-4xl text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.06em]">
              A smarter website chat that feels{" "}
              <span className="wf-serif-accent text-[#111111]">premium</span>,{" "}
              helpful, and on-brand.
            </h1>

            <p className="mt-6 max-w-2xl text-[1.05rem] leading-7 text-[var(--color-subtle)] md:text-[1.12rem]">
              Kompi Chat helps businesses answer questions, capture leads, and guide
              visitors toward action with a branded AI assistant that lives inside
              the Kompi ecosystem.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/dashboard/chat"
                className="inline-flex items-center justify-center rounded-full bg-[#C4C8FF] px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:brightness-[1.03]"
              >
                Open Chat dashboard
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-bg)]"
              >
                Start free
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[var(--color-subtle)]">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#8AA0FF]" />
                Branded widget
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#8AA0FF]" />
                Lead capture ready
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#8AA0FF]" />
                Built for Kompi sites
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-subtle)]">
                    Preview
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-[-0.03em]">
                    Kompi Chat widget
                  </h2>
                </div>
                <div className="rounded-full bg-[#EEF1FF] px-3 py-1 text-[12px] font-medium text-[#32406E]">
                  Live preview
                </div>
              </div>

              <div className="grid gap-0 lg:grid-cols-[1fr_320px]">
                <div className="border-b border-[var(--color-border)] bg-[#FBFBF8] p-6 lg:border-b-0 lg:border-r">
                  <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-5 shadow-[0_12px_32px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-subtle)]">
                          Your website
                        </p>
                        <h3 className="mt-1 text-base font-semibold">W&F Studio</h3>
                      </div>
                      <div className="rounded-full bg-[#DFF6E8] px-3 py-1 text-[12px] font-medium text-[#215C3D]">
                        Online
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="h-3 w-32 rounded-full bg-black/10" />
                      <div className="h-3 w-full rounded-full bg-black/10" />
                      <div className="h-3 w-5/6 rounded-full bg-black/10" />
                      <div className="h-32 rounded-[22px] bg-[#F4F1EA]" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5">
                  <div className="overflow-hidden rounded-[28px] border border-[var(--color-border)] shadow-[0_16px_40px_rgba(0,0,0,0.06)]">
                    <div className="border-b border-[var(--color-border)] bg-[#F8F8F6] px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-subtle)]">
                        Kompi Chat
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Ask us anything</h3>
                        <span className="rounded-full bg-[#EEF1FF] px-2.5 py-1 text-[11px] font-medium text-[#47568E]">
                          AI assistant
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 bg-white p-4">
                      <div className="max-w-[85%] rounded-[18px] rounded-tl-[8px] bg-[#F4F4F1] px-4 py-3 text-sm leading-6 text-[#222]">
                        Hi — I can help with pricing, services, timelines, or the
                        best next step for your project.
                      </div>

                      <div className="ml-auto max-w-[85%] rounded-[18px] rounded-tr-[8px] bg-[#C4C8FF] px-4 py-3 text-sm leading-6 text-[#101010]">
                        What do you offer for startups?
                      </div>

                      <div className="max-w-[92%] rounded-[18px] rounded-tl-[8px] bg-[#F4F4F1] px-4 py-3 text-sm leading-6 text-[#222]">
                        We help with brand identity, product design, websites, and
                        ongoing creative support. I can also guide you to the best
                        package depending on stage and budget.
                      </div>

                      <div className="rounded-[18px] border border-[var(--color-border)] bg-[#FCFCFA] px-4 py-3 text-[13px] text-[var(--color-subtle)]">
                        Ask about pricing, timelines, services, FAQs…
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-6 -left-6 h-28 w-28 rounded-full bg-[#E8ECFF] blur-3xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-6 md:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {featureCards.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 shadow-[0_12px_34px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF1FF] text-[#5264A0]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-subtle)]">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-subtle)]">
              Setup
            </p>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              From idea to live widget in a few clear steps.
            </h2>
            <p className="mt-4 text-[1rem] leading-7 text-[var(--color-subtle)]">
              Keep the setup simple. Kompi Chat is designed to feel premium in the
              dashboard and lightweight on your site.
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-4 rounded-[28px] border border-[var(--color-border)] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C4C8FF] text-sm font-semibold text-[#111]">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-subtle)]">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-20 md:px-8 lg:px-10">
        <div className="rounded-[34px] border border-[var(--color-border)] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.05)] md:px-8 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-subtle)]">
                Kompi Chat
              </p>
              <h2 className="mt-3 text-[clamp(1.9rem,3vw,3rem)] font-semibold leading-[1] tracking-[-0.05em]">
                Add a conversation layer to the rest of Kompi.
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--color-subtle)] md:text-base">
                Use Chat alongside K-Cards, KR Codes, and short links to turn more
                visits into useful intent.
              </p>
            </div>

            <Link
              href="/dashboard/chat"
              className="inline-flex items-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Open Chat dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
