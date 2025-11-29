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

export default function InfoScreenTwo() {
  return (
    <section className="w-full h-screen bg-[#E3F2FF]">
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center px-4 py-10 sm:px-6 lg:flex-row lg:px-8 lg:py-0 lg:gap-28">
        {/* LEFT: hero PNG (Kompi Codes visual) */}
        <motion.div
          className="relative mb-10 flex w-full flex-1 items-center justify-center lg:mb-0 lg:justify-start"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: easing }}
        >
          <Image
            src="/kompicollage.png" // replace with your Kompi Codes PNG
            alt="Kompi Codes visual"
            width={960}
            height={720}
            priority
            className="w-full max-w-[560px] h-auto"
          />
        </motion.div>

        {/* RIGHT: Kompi Codes copy + CTA with luxury stagger */}
        <motion.div
          className="flex-1 text-left"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={rightContainer}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700"
            variants={rightItem}
          >
            Kompi Codes
          </motion.p>

          <motion.h1
            className="mt-4 text-[32px] font-semibold leading-[1.05] text-slate-950
                       sm:text-[40px]
                       md:text-[50px]
                       lg:text-[56px]"
            style={{ letterSpacing: "-0.04em" }}
            variants={rightItem}
          >
            Turn anything
            <br />
            into a{" "}
            <span className="wf-serif-accent italic">gateway</span>.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-[15px] leading-[1.7] text-slate-800"
            variants={rightItem}
          >
            Generate beautiful QR-style Kompi Codes automatically for every link
            and page.
          </motion.p>

          <motion.p
            className="mt-2 max-w-xl text-[15px] leading-[1.7] text-slate-800"
            variants={rightItem}
          >
            Print them, post them, share them — we track every scan and route
            people instantly.
          </motion.p>

          <motion.p
            className="mt-3 max-w-xl text-[13px] leading-[1.7] text-slate-600"
            variants={rightItem}
          >
            Perfect for posters, packaging, events and real-world touchpoints.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            variants={rightItem}
          >
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-10 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-900"
            >
              Create Kompi Codes
            </button>

            <button
              type="button"
              className="text-sm font-medium text-slate-950 underline-offset-4 hover:underline"
            >
              See real-world examples
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
