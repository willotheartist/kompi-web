"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

const copyContainer = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: easing,
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: easing,
    },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="wf-section" style={{ backgroundColor: "#424BE7" }}>
      <div className="wf-container">
        <motion.div
          className="flex flex-col items-center gap-10 py-10 lg:flex-row lg:items-center lg:gap-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.05, ease: easing }}
        >
          {/* LEFT: copy, luxury stagger */}
          <motion.div
            className="w-full flex-1 text-left"
            variants={copyContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p
              className="text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: "#FBA3FB" }}
              variants={copyItem}
            >
              Kompi in your stack
            </motion.p>

            <motion.h2
              className="mt-4 text-[30px] font-semibold leading-[1.05]
                         sm:text-[36px]
                         md:text-[42px]
                         lg:text-[46px]"
              style={{ letterSpacing: "-0.04em", color: "#FBA3FB" }}
              variants={copyItem}
            >
              A single link layer
              <br />
              for everything you{" "}
              <span className="wf-serif-accent italic">ship</span>.
            </motion.h2>

            <motion.p
              className="mt-5 max-w-xl text-[15px] leading-[1.7]"
              style={{ color: "#FFE5FF" }}
              variants={copyItem}
            >
              Launch a campaign, post a video, drop a product — Kompi keeps
              every touchpoint behind one clean URL, with analytics that follow
              the story instead of each platform.
            </motion.p>

            <motion.ul
              className="mt-5 space-y-2 text-[14px]"
              style={{ color: "#FFE5FF" }}
              variants={copyItem}
            >
              <li>Use one link across Instagram, TikTok, X, email and QR.</li>
              <li>Swap destinations without breaking old posts.</li>
              <li>Keep your team, clients and reports all in one workspace.</li>
            </motion.ul>

            <motion.div
              className="mt-7 inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs"
              style={{ backgroundColor: "#3038C5", color: "#FBA3FB" }}
              variants={copyItem}
            >
              <span
                className="inline-flex h-6 items-center rounded-full px-2 text-[11px] font-semibold"
                style={{ backgroundColor: "#252C9C", color: "#FBA3FB" }}
              >
                Link layer
              </span>
              <span className="opacity-90">
                One Kompi link, many destinations.
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT: single raw image, no box */}
          <motion.div
            className="relative mb-4 flex w-full flex-1 items-center justify-center lg:mb-0 lg:justify-end"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: easing, delay: 0.15 }}
          >
            <Image
              src="/kompiboxes.png"
              alt="Kompi in your stack"
              width={420}
              height={420}
              priority
              className="w-full max-w-[560px] h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
