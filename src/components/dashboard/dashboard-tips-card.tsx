// src/components/dashboard/dashboard-tips-card.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

type TipCard = {
  href: string;
  imageSrc: string;
  title: string;
  topic: string;
  author: string;
};

function ArticleCard({ item }: { item: TipCard }) {
  return (
    <Link
      href={item.href}
      className="group block overflow-hidden rounded-[14px] bg-white"
      aria-label={item.title}
    >
      {/* Image: dominant and consistent */}
      <div className="relative h-[150px] w-full overflow-hidden">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 360px"
        />
      </div>

      {/* Title */}
      <div className="px-6 py-4">
        <h3 className="text-[19px] font-semibold leading-[1.15] tracking-[-0.015em] text-neutral-900">
          {item.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-neutral-200" />

      {/* Topic row */}
      <div className="grid grid-cols-2 items-center px-6 py-4 text-[12px]">
        <span className="font-semibold text-neutral-900">Topic</span>
        <span className="text-neutral-500">{item.topic}</span>
      </div>

      <div className="h-px w-full bg-neutral-200" />

      {/* Author row + arrow */}
      <div className="grid grid-cols-[auto,1fr,auto] items-center gap-3 px-6 py-4 text-[13px]">
        <span className="font-semibold text-neutral-900">Written by:</span>
        <span className="text-neutral-500">{item.author}</span>
        <ArrowRight className="h-5 w-5 text-neutral-900 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function ReadMoreCard() {
  return (
    <Link
      href="/growth"
      className="group relative block h-full overflow-hidden rounded-[26px]"
      style={{ backgroundColor: "#DDFB73" }}
      aria-label="Read more useful articles"
    >
      <div className="flex h-full flex-col justify-between px-8 py-8">
        <div className="max-w-[240px]">
          <p className="text-[34px] font-semibold leading-[1.02] tracking-[-0.03em] text-neutral-900">
            Read more
            <br />
            useful
            <br />
            articles to
            <br />
            help boost
            <br />
            your brand
          </p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-6">
          <span className="text-2xl font-semibold text-neutral-900">→</span>
          <span className="text-2xl font-semibold text-neutral-900">→</span>
          <span className="text-2xl font-semibold text-neutral-900">→</span>
        </div>
      </div>
    </Link>
  );
}

export function DashboardTipsCard() {
  const items: TipCard[] = [
    {
      href: "/growth",
      imageSrc: "/tips/one.png",
      title: "Five Ways to Use Kompi Cards to Get More Clients",
      topic: "Marketing",
      author: "Kompi Editorial",
    },
    {
      href: "/growth",
      imageSrc: "/tips/two.png",
      title: "How to Turn a QR Scan Into a Repeat Customer",
      topic: "Growth",
      author: "Kompi Editorial",
    },
    {
      href: "/growth",
      imageSrc: "/tips/three.png",
      title: "Build a Link Strategy That Works Across Every Platform",
      topic: "Strategy",
      author: "Kompi Editorial",
    },
  ];

  return (
    <section className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-xl font-semibold text-[color:var(--color-text)]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--color-text)]">
            <BookOpen className="h-4 w-4 text-[color:var(--color-text)]" />
          </span>
          <span>Tips &amp; playbooks</span>
        </h2>

        <Link
          href="/growth"
          className="text-sm font-medium text-[color:var(--color-subtle)] hover:text-[color:var(--color-text)]"
        >
          View all
        </Link>
      </div>

      {/* Layout: 3 wide cards + 1 narrower lime card (no page scroll) */}
      <div className="w-full min-w-0 overflow-hidden">
        <div className="grid w-full min-w-0 gap-6 grid-cols-[1fr_1fr_1fr_0.78fr]">
          {items.map((item, idx) => (
            <ArticleCard key={idx} item={item} />
          ))}
          <ReadMoreCard />
        </div>
      </div>
    </section>
  );
}
