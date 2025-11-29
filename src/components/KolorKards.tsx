"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type KolorCard = {
  id: number;
  title: string;
  description: string;
  bg: string;
  headingColor: string;
  bodyColor: string;
};

const LIME = "#D8FF43";

const cards: KolorCard[] = [
  {
    id: 1,
    title: "Smart Link Shortening",
    description:
      "Create clean, fast, branded short links in seconds and track every click with precision.",
    bg: "#FFD0E5", // pink
    headingColor: "#820019", // wine on pink
    bodyColor: "#5B0010",
  },
  {
    id: 2,
    title: "Advanced Analytics",
    description:
      "See what’s performing with clear insights into clicks, referrers, devices, locations, and UTMs.",
    bg: LIME, // branded lime
    headingColor: "#111111",
    bodyColor: "#222222",
  },
  {
    id: 3,
    title: "Custom Domains",
    description:
      "Strengthen your brand by connecting your own domain and making every link feel truly yours.",
    bg: "#820019", // wine
    headingColor: "#FFD0E5", // pink on wine
    bodyColor: "#FFE7F2",
  },
  {
    id: 4,
    title: "Kompi Bio Pages",
    description:
      "Build a modern, beautiful link-in-bio page that showcases everything you create — all tracked in one place.",
    bg: "#F5C9FF",
    headingColor: "#1B1333",
    bodyColor: "#332553",
  },
  {
    id: 5,
    title: "Built-in UTM Builder",
    description:
      "Generate UTMs effortlessly, measure campaigns properly, and understand which channels actually work.",
    bg: "#FFE57A",
    headingColor: "#201000",
    bodyColor: "#382312",
  },
  {
    id: 6,
    title: "Instant QR Codes",
    description:
      "Share anywhere with auto-generated QR codes designed to look great and perform everywhere.",
    bg: "#C6FFF3",
    headingColor: "#003333",
    bodyColor: "#124543",
  },
  {
    id: 7,
    title: "Workspaces & Teams",
    description:
      "Keep projects organized, collaborate with your team, and manage links at scale with ease.",
    bg: "#FFE9C2",
    headingColor: "#23140A",
    bodyColor: "#3D2513",
  },
  {
    id: 8,
    title: "Fast Redirect Engine",
    description:
      "Deliver lightning-quick, reliable redirects powered by edge technology for maximum performance.",
    bg: "#BFD4FF",
    headingColor: "#041333",
    bodyColor: "#12254B",
  },
];

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function KolorKards() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollByPage = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    const amount = container.clientWidth * 0.9;
    container.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header – same pattern as Why Kompi / Who's Kompi For */}
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
            What Kompi Does
          </p>

          <div
            role="heading"
            aria-level={2}
            style={{ letterSpacing: "-0.04em" }}
            className="font-semibold text-neutral-900
                       text-[32px] leading-[1.05]
                       sm:text-[44px]
                       md:text-[54px]
                       lg:text-[60px]"
          >
            <span>What </span>
            <span className="wf-serif-accent italic">Kompi</span>
            <span> Does</span>
          </div>

          <p className="max-w-2xl text-[15px] leading-[1.7] text-neutral-600">
            Your essential toolkit for sharing, tracking, and growing online.
          </p>

          {/* Arrows */}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByPage("left")}
              aria-label="Scroll left"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-neutral-900 ring-1 ring-black/5 transition hover:bg-neutral-900 hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByPage("right")}
              aria-label="Scroll right"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white ring-1 ring-black/5 transition hover:bg-neutral-800"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal track – one row of Linktree-style cards */}
      <div className="mt-14 overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="kolor-kards-scroll mx-auto flex max-w-7xl gap-8 overflow-x-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: easing }}
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.id}
              style={{ backgroundColor: card.bg }}
              className="flex h-[560px] w-[420px] shrink-0 snap-start flex-col rounded-[40px] px-10 pt-10 pb-9"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.75,
                ease: easing,
                delay: index * 0.06,
              }}
              whileHover={{ y: -8, scale: 1.01 }}
            >
              {/* IMAGE AREA – same image for now, you can swap later */}
              <div className="relative mb-12 h-[210px] rounded-[32px] overflow-hidden bg-white/70">
                <Image
                  src="/kompiphoto.png"
                  alt="Kompi feature"
                  fill
                  className="object-cover"
                  sizes="420px"
                />
              </div>

              {/* Text block – sits lower in the card like the example */}
              <div className="mt-4">
                <h3
                  className="text-2xl font-semibold tracking-tight"
                  style={{ color: card.headingColor }}
                >
                  {card.title}
                </h3>

                <p
                  className="mt-4 text-[15px] leading-relaxed"
                  style={{ color: card.bodyColor }}
                >
                  {card.description}
                </p>
              </div>

              {/* Spacer to keep bottom breathing room */}
              <div className="mt-auto" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
