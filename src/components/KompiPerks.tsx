"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type PerkCard = {
  id: string;
  label: string;
  title: string;
  accent?: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
};

const PERKS: PerkCard[] = [
  {
    id: "live-campaigns",
    label: "Campaign-ready",
    title: "Live links that stay in sync",
    accent: "everywhere.",
    body: "Update destinations once and keep every QR code, bio and short link in sync.",
    imageSrc: "/kompione.png",
    imageAlt: "Kompi promo artwork",
  },
  {
    id: "qr-magic",
    label: "K-Cards & QR",
    title: "Physical touchpoints that",
    accent: "actually convert.",
    body: "Pair K-Cards and QR posters with smart links so every tap and scan is tracked.",
    imageSrc: "/kompitwo.png",
    imageAlt: "Kompi promo artwork",
  },
  {
    id: "creator-mode",
    label: "Creator mode",
    title: "Bio pages that feel",
    accent: "designed.",
    body: "Ship modern, on-brand link-in-bio pages that look like your brand, not a template.",
    imageSrc: "/kompithree.png",
    imageAlt: "Kompi promo artwork",
  },
  {
    id: "client-reports",
    label: "Client-ready",
    title: "Reports you can drop",
    accent: "into decks.",
    body: "Show clients where clicks come from, per campaign and per workspace.",
    imageSrc: "/kompifour.png",
    imageAlt: "Kompi promo artwork",
  },
  {
    id: "team-workspaces",
    label: "Teams & studios",
    title: "Workspaces built",
    accent: "for rollouts.",
    body: "Give each client or brand its own space with shared links and analytics.",
    imageSrc: "/kompifive.png",
    imageAlt: "Kompi promo artwork",
  },
];

// bold, tennis-style backgrounds
const cardPalettes = [
  { base: "#D8FF43", text: "#111111" }, // Kompi lime
  { base: "#F3EFE8", text: "#111111" }, // soft cream
  { base: "#FF4FD8", text: "#111111" }, // pop magenta
  { base: "#4FD9FF", text: "#111111" }, // cyan
];

// luxe easing
const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function KompiPerks() {
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
    <section
      className="w-full bg-[var(--color-bg)] py-20"
      aria-label="Kompi features and perks"
    >
      {/* Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center text-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: easing }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--color-subtle)]">
            Kompi perks
          </p>

          <h2
            className="font-semibold text-[color:var(--color-text)]
                       text-[32px] leading-[1.05]
                       sm:text-[44px]
                       md:text-[54px]
                       lg:text-[60px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Make every{" "}
            <span className="wf-serif-accent italic text-[color:var(--color-accent)]">
              touchpoint
            </span>{" "}
            feel intentional.
          </h2>

          <p className="max-w-2xl text-[15px] leading-[1.7] text-[color:var(--color-subtle)]">
            From first tap to final report, Kompi keeps links, QR codes and bio
            pages under one roof — so your campaigns feel designed, not duct
            taped.
          </p>

          {/* arrows */}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByPage("left")}
              aria-label="Scroll perks left"
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
              aria-label="Scroll perks right"
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
        </motion.div>
      </div>

      {/* Card rail – tennis-style cards */}
      <div className="mt-14 overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="kompi-perks-scroll mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 no-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: easing }}
        >
          {PERKS.map((perk, index) => {
            const palette = cardPalettes[index % cardPalettes.length];

            return (
              <motion.article
                key={perk.id}
                className="relative w-[360px] shrink-0 snap-start overflow-hidden rounded-[40px]"
                style={{ background: palette.base }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.9,
                  ease: easing,
                  delay: index * 0.18, // slow stagger
                }}
              >
                <div className="flex min-h-[520px] flex-col">
                  {/* TOP: label + title + short copy */}
                  <div className="flex-1 px-8 pt-8 pb-6">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.22em]"
                      style={{ color: `${palette.text}CC` }}
                    >
                      {perk.label}
                    </p>

                    <h3
                      className="mt-4 text-[26px] font-semibold leading-[1.2]"
                      style={{ color: palette.text }}
                    >
                      {perk.title}{" "}
                      {perk.accent && (
                        <span className="wf-serif-accent italic">
                          {perk.accent}
                        </span>
                      )}
                    </h3>

                    <p
                      className="mt-4 max-w-xs text-[14px] leading-[1.6]"
                      style={{ color: `${palette.text}CC` }}
                    >
                      {perk.body}
                    </p>
                  </div>

                  {/* BOTTOM: big rounded image, full width */}
                  <div className="relative h-[260px] w-full overflow-hidden rounded-t-[40px] bg-black">
                    <Image
                      src={perk.imageSrc}
                      alt={perk.imageAlt}
                      fill
                      className="h-full w-full object-cover"
                      sizes="360px"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
