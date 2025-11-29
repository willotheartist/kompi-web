"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionContainer = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: easing,
      staggerChildren: 0.22,
      delayChildren: 0.24,
    },
  },
};

const headerItem = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easing },
  },
};

const cardsContainer = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easing,
      staggerChildren: 0.24,
      delayChildren: 0.1,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.05,
      ease: easing,
    },
  },
};

export default function PersonasSection() {
  return (
    <section
      className="wf-section"
      style={{ backgroundColor: "#061932", color: "#89CDFB" }}
    >
      <div className="wf-container min-h-screen flex items-center py-14">
        <motion.div
          className="flex w-full flex-col items-center gap-12"
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* Header */}
          <motion.div
            className="text-center max-w-xl space-y-3"
            variants={headerItem}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
              Who Kompi is for
            </p>
            <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold leading-tight">
              Built for{" "}
              <span
                className="wf-serif-accent italic"
                style={{ color: "#FD7CFD" }}
              >
                creators, studios
              </span>{" "}
              & teams.
            </h2>
            <p className="text-sm opacity-80">
              Start solo, grow into a full workspace — Kompi adapts as your
              world gets bigger.
            </p>
          </motion.div>

          {/* Personas row */}
          <motion.div
            className="grid w-full max-w-5xl gap-5 md:grid-cols-3"
            variants={cardsContainer}
          >
            <PersonaCard
              imageSrc="/kompi-analytics.png"
              imageAlt="Creators"
              title="Creators"
              blurb="One link for drops, streams and offers."
              tag="From the Free plan"
            />
            <PersonaCard
              imageSrc="/kompi-branding.png"
              imageAlt="Studios & agencies"
              title="Studios & agencies"
              blurb="Client workspaces with links, bios and QR codes."
              tag="Popular with K-Cards"
            />
            <PersonaCard
              imageSrc="/kompi-platform.png"
              imageAlt="Teams & brands"
              title="Teams & brands"
              blurb="On-brand links, shared analytics, clean handoffs."
              tag="Team plan"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PersonaCard({
  imageSrc,
  imageAlt,
  title,
  blurb,
  tag,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  blurb: string;
  tag: string;
}) {
  return (
    <motion.div
      className="flex h-full min-h-[260px] sm:min-h-[300px] flex-col items-stretch rounded-3xl border border-[#89CDFB]/18 bg-[#071f3c] px-5 py-5"
      variants={cardItem}
    >
      {/* Placeholder image */}
      <div className="mb-5 flex justify-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-[#0b2849]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="text-sm font-semibold text-[#89CDFB]">{title}</h3>
        <p className="text-xs leading-relaxed text-[#A5D8FF]">{blurb}</p>
      </div>

      <span
        className="mt-5 inline-flex w-fit rounded-full bg-[#FD7CFD]/10 px-3 py-1 text-[11px] font-medium"
        style={{ color: "#FD7CFD" }}
      >
        {tag}
      </span>
    </motion.div>
  );
}
