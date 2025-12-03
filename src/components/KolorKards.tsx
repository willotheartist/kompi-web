"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

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

// ~40s loop for calm marquee
const SCROLL_DURATION = 40;

export default function KolorKards() {
  const shouldReduceMotion = useReducedMotion();
  const loopCards = useMemo(() => [...cards, ...cards], []);

  return (
    <section className="w-full min-h-[80vh] py-16 bg-[var(--color-bg)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-subtle)]">
            What Kompi Does
          </p>

          <div
            role="heading"
            aria-level={2}
            style={{ letterSpacing: "-0.04em" }}
            className="font-semibold text-[color:var(--color-text)]
                       text-[32px] leading-[1.05]
                       sm:text-[44px]
                       md:text-[54px]"
          >
            <span>What </span>
            <span className="wf-serif-accent italic">Kompi</span>
            <span> Does</span>
          </div>

          <p className="max-w-2xl text-[15px] leading-[1.7] text-[color:var(--color-subtle)]">
            Your essential toolkit for sharing, tracking, and growing online.
          </p>
        </div>
      </div>

      {/* Auto-scrolling track */}
      <div className="mt-10 relative overflow-x-hidden overflow-y-visible">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-bg)] to-transparent" />

        {shouldReduceMotion ? (
          // manual scroll if reduced motion is enabled
          <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8 no-scrollbar">
            {cards.map((card) => (
              <KolorCardItem key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <motion.div
            className="mx-auto flex max-w-none gap-6 px-4 sm:px-6 lg:px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: SCROLL_DURATION,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {loopCards.map((card, idx) => (
              <KolorCardItem key={`${card.id}-${idx}`} card={card} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function KolorCardItem({ card }: { card: KolorCard }) {
  return (
    <article
      className="group flex min-w-[260px] max-w-sm flex-col rounded-[32px] px-6 py-6 sm:px-7 sm:py-7 
                 shadow-[0_1px_0_rgba(15,15,15,0.08)] border border-black/5
                 transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{ backgroundColor: card.bg }}
    >
      {/* simple “visual” block instead of image */}
      <div className="mb-4">
        <div
          className="h-9 w-9 rounded-2xl"
          style={{ backgroundColor: `${card.headingColor}1A` }} // subtle tint
        />
      </div>

      <h3
        className="text-lg sm:text-xl font-semibold tracking-tight"
        style={{ color: card.headingColor }}
      >
        {card.title}
      </h3>

      <p
        className="mt-3 text-[14px] leading-relaxed"
        style={{ color: card.bodyColor }}
      >
        {card.description}
      </p>
    </article>
  );
}
