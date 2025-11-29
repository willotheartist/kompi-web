"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const rightContainer = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: easing,
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

const rightItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.1,
      ease: easing,
    },
  },
};

export default function InfoScreenThree() {
  return (
    <section className="w-full h-screen bg-[#1E2330]">
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center px-4 py-10 sm:px-6 lg:flex-row lg:px-8 lg:py-0 lg:gap-28">
        {/* LEFT: hero PNG (Kompi Analytics visual) */}
        <motion.div
          className="relative mb-10 flex w-full flex-1 items-center justify-center lg:mb-0 lg:justify-start"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: easing }}
        >
          <Image
            src="/kompi-analytics.png" // replace with your analytics PNG
            alt="Kompi analytics overview"
            width={960}
            height={720}
            priority
            className="w-full max-w-[560px] h-auto"
          />
        </motion.div>

        {/* RIGHT: Kompi Analytics copy + CTA */}
        <motion.div
          className="flex-1 text-left"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={rightContainer}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A5B0FF]"
            variants={rightItem}
          >
            Kompi analytics
          </motion.p>

          <motion.h1
            className="mt-4 text-[32px] font-semibold leading-[1.05] text-[#F1F1F1]
                       sm:text-[40px]
                       md:text-[50px]
                       lg:text-[56px]"
            style={{ letterSpacing: "-0.04em" }}
            variants={rightItem}
          >
            See every click
            <br />
            <span className="wf-serif-accent italic">clearly</span>.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-[15px] leading-[1.7] text-[#F1F1F1]"
            variants={rightItem}
          >
            Kompi gives you real-time insights into referrers, locations,
            devices, and UTMs &mdash; all visualized simply.
          </motion.p>

          <motion.p
            className="mt-2 max-w-xl text-[15px] leading-[1.7] text-[#D2D5E3]"
            variants={rightItem}
          >
            No extra dashboards, no confusing charts. Just clean, precise
            analytics built into every link.
          </motion.p>

          <motion.p
            className="mt-3 max-w-xl text-[13px] leading-[1.7] text-[#C0C4D6]"
            variants={rightItem}
          >
            Understand your audience in seconds.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            variants={rightItem}
          >
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#F1F1F1] px-10 py-3.5 text-sm font-semibold text-[#111827] shadow-lg transition hover:bg-white"
            >
              Explore Kompi analytics
            </button>

            <button
              type="button"
              className="text-sm font-medium text-[#F1F1F1] underline-offset-4 hover:underline"
            >
              View a sample report
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
