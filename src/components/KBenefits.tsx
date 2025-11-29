"use client";

import Image from "next/image";

type PerkCard = {
  id: string;
  topLabel: string;
  stat: string; // still in data if you need later
  statCaption: string;
  eyebrow: string;
  title: string;
  copy: string;
  meta: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
};

const CARDS: PerkCard[] = [
  {
    id: "studio-rollout",
    topLabel: "Studio · Campaign rollout",
    stat: "800",
    statCaption: "links under control",
    eyebrow: "Studio · Campaign rollout",
    title: "One place for every client launch.",
    copy: "Links, QR flows and bio pages share the same pattern for each rollout.",
    meta: "Campaigns lead · Multi-brand studio",
    tags: ["Travel", "Retail", "North America"],
    imageSrc: "/kompi-platform.png",
    imageAlt: "Creative studio team gathered around a table",
  },
  {
    id: "growth-always-on",
    topLabel: "Growth · Always-on",
    stat: "90%",
    statCaption: "expense automation lift",
    eyebrow: "Growth · Always-on",
    title: "Links you can swap without stress.",
    copy: "Short URLs update once in Kompi instead of across ten tools.",
    meta: "Growth manager · DTC brand",
    tags: ["SaaS", "DTC", "Switzerland"],
    imageSrc: "/kompi-business.png",
    imageAlt: "People running, representing fast growth",
  },
  {
    id: "creator-program",
    topLabel: "Creators · Partner program",
    stat: "60",
    statCaption: "creators in one view",
    eyebrow: "Creators · Partner program",
    title: "Creator links that stay on-brand.",
    copy: "Shared templates for bios, QR posters and K-Cards.",
    meta: "Creator manager · Talent collective",
    tags: ["Talent", "Partner program", "Global"],
    imageSrc: "/kompi-branding.png",
    imageAlt: "Bouquet of flowers in the sky",
  },
];

export default function KBenefits() {
  return (
    <section
      aria-label="Businesses getting the job done with Kompi"
      className="w-full bg-[#F9314A] py-16"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#FFB8D6]/90">
            Kompi in the wild
          </p>
          <h2 className="mt-3 text-[28px] font-semibold leading-tight text-white sm:text-[32px] md:text-[36px]">
            Businesses getting the{" "}
            <span className="wf-serif-accent italic">job done</span>.
          </h2>
        </header>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((card) => (
            <article
              key={card.id}
              className="flex h-full flex-col rounded-3xl bg-white p-4 sm:p-5"
            >
              {/* Image */}
              <div className="mb-4 w-full overflow-hidden rounded-2xl">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  width={960}
                  height={640}
                  className="h-40 w-full object-cover sm:h-44"
                />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#D4FF3F] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#022C17]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  {card.eyebrow}
                </p>

                <h3 className="text-sm font-semibold leading-snug text-neutral-900">
                  {card.title}
                </h3>

                <p className="text-xs leading-relaxed text-neutral-700">
                  {card.copy}
                </p>

                <p className="mt-1 text-[11px] text-neutral-500">
                  {card.meta}
                </p>
              </div>

              {/* CTA */}
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-neutral-900 underline-offset-4 hover:underline"
              >
                Browse story
                <span aria-hidden="true">↗</span>
              </button>
            </article>
          ))}
        </div>

        {/* Footer link */}
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-5 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-white/15"
          >
            Browse all stories
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
