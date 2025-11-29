"use client";

import { motion } from "framer-motion";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easing,
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easing },
  },
};

export default function TestimonialsSection() {
  return (
    <section className="wf-section wf-section-tight bg-white">
      <div className="wf-container">
        <motion.div
          className="flex flex-col items-center gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* Header */}
          <motion.div
            className="text-center space-y-3 max-w-xl"
            variants={item}
          >
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-neutral-500">
              Loved by teams & creators
            </p>
            <h2 className="wf-heading wf-section-heading wf-section-heading-center text-[28px] sm:text-[32px]">
              People who{" "}
              <span className="wf-serif-accent italic">live</span> in clean
              links.
            </h2>
          </motion.div>

          {/* Cards */}
          <motion.div
            className="grid w-full max-w-4xl gap-4 md:grid-cols-3"
            variants={item}
          >
            <TestimonialCard
              badge="Studios"
              quote="“Kompi replaced three tools in a week.”"
              meta="Campaigns agency"
              tone="pink"
            />
            <TestimonialCard
              badge="Brands"
              quote="“QRs, short links and K-Cards all point to the same place.”"
              meta="DTC growth team"
              tone="yellow"
            />
            <TestimonialCard
              badge="Creators"
              quote="“We ship new promos without worrying about broken bios.”"
              meta="Talent studio"
              tone="mint"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({
  badge,
  quote,
  meta,
  tone,
}: {
  badge: string;
  quote: string;
  meta: string;
  tone: "pink" | "yellow" | "mint";
}) {
  const toneClass =
    tone === "pink"
      ? "bg-[#F4C6FF]"
      : tone === "yellow"
      ? "bg-[#E8F739]"
      : "bg-[#BBF8E1]";

  return (
    <div
      className={`flex h-full flex-col justify-between rounded-2xl px-4 py-4 ${toneClass}`}
    >
      <span className="inline-flex w-fit rounded-full bg-black/5 px-3 py-1 text-[11px] font-medium text-neutral-900">
        {badge}
      </span>
      <p className="mt-3 text-sm font-medium text-neutral-900">{quote}</p>
      <p className="mt-3 text-xs text-neutral-700">{meta}</p>
    </div>
  );
}
