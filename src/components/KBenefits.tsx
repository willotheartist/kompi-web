`use client`;

import { motion } from "framer-motion";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionContainer = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: easing,
      staggerChildren: 0.18,
      delayChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easing },
  },
};

const media = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.05, ease: easing },
  },
};

export default function KompiHeroVideoSection() {
  return (
    <section className="wf-section bg-white text-[#0A0A0A]">
      <div className="wf-container flex min-h-[90vh] items-center py-16 sm:py-20">
        <motion.div
          className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 sm:gap-12"
          variants={sectionContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* Header */}
          <motion.div
            className="mx-auto max-w-4xl text-center"
            variants={item}
          >
            <h1 className="text-[48px] leading-[1.03] tracking-[-0.02em] sm:text-[55px] md:text-[68px] font-semibold">
              Build Once.
              <span className="block">Share Everywhere.</span>
              <span className="block">Measure Everything.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-[15px] leading-relaxed text-[#111]/80 sm:text-[16px]">
              All the work around links, tracking, pages, and campaigns adds up.
              Kompi brings it together — one platform to create, measure, and
              improve how your work actually performs.
            </p>
          </motion.div>

          {/* Video */}
          <motion.div
            className="w-full max-w-5xl"
            variants={media}
          >
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black/3 shadow-[0_18px_60px_rgba(0,0,0,0.10)]">
              {/* Optional subtle top gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/6 via-transparent to-transparent" />

              <video
                className="block h-auto w-full"
                src="/kompivideo.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
