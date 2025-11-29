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

export default function InfoScreenSix() {
  return (
    <section className="w-full h-screen bg-[#006B81] text-[#BBF8E1]">
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center px-4 py-10 sm:px-6 lg:flex-row lg:px-8 lg:py-0 lg:gap-28">
        {/* LEFT: hero PNG (Kompi Branding visual) */}
        <motion.div
          className="relative mb-10 flex w-full flex-1 items-center justify-center lg:mb-0 lg:justify-start"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: easing }}
        >
          <Image
            src="/kompi-branding.png" // replace with your Kompi Branding PNG
            alt="Kompi branding customization"
            width={960}
            height={720}
            priority
            className="w-full max-w-[560px] h-auto"
          />
        </motion.div>

        {/* RIGHT: Kompi Branding copy + CTA */}
        <motion.div
          className="flex-1 text-left"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={rightContainer}
        >
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.22em]"
            variants={rightItem}
          >
            Kompi branding
          </motion.p>

          <motion.h1
            className="mt-4 text-[32px] font-semibold leading-[1.05]
                       sm:text-[40px]
                       md:text-[50px]
                       lg:text-[56px]"
            style={{ letterSpacing: "-0.04em" }}
            variants={rightItem}
          >
            Your brand,
            <br />
            your{" "}
            <span className="wf-serif-accent italic">voice</span>.
          </motion.h1>

          <motion.p
            className="mt-5 max-w-xl text-[15px] leading-[1.7]"
            variants={rightItem}
          >
            Kompi gives you the freedom to shape every link, page and touchpoint
            to match your identity.
          </motion.p>

          <motion.p
            className="mt-2 max-w-xl text-[15px] leading-[1.7]"
            variants={rightItem}
          >
            Use your own domains, your style, your message — all delivered
            through clean, modern tools built to elevate your presence.
          </motion.p>

          <motion.p
            className="mt-3 max-w-xl text-[13px] leading-[1.7]"
            variants={rightItem}
          >
            Show the world who you are, your way.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            variants={rightItem}
          >
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-[#BBF8E1] px-10 py-3.5 text-sm font-semibold text-[#006B81] shadow-lg transition hover:brightness-95"
            >
              Brand Kompi your way
            </button>

            <button
              type="button"
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              Explore branding options
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
