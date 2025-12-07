"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function KSuite3() {
  const easing: [number, number, number, number] = [0.18, 0.8, 0.3, 1];

  return (
    <section className="bg-[#F7F7F3] px-4 sm:px-6 lg:px-8">
      <motion.div
        className="mx-auto flex min-h-[100vh] max-w-7xl flex-col items-center gap-32 py-16 lg:flex-row lg:items-center lg:py-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 1.1,
          ease: easing,
        }}
      >
        {/* VIDEO SIDE */}
        <motion.div
          className="w-full lg:flex-1"
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1.1,
            delay: 0.1,
            ease: easing,
          }}
        >
          <motion.div
            className="relative aspect-[16/9] w-full overflow-hidden rounded-[20px] bg-[#111111]"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: easing }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.35),transparent_55%)] mix-blend-soft-light" />
            <video
              src="/videos/passgen/password-generator-with-kompi.mp4"
              className="h-full w-full rounded-[20px] object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>
        </motion.div>

        {/* TEXT SIDE */}
        <motion.div
          className="w-full max-w-xl lg:flex-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 1.1,
            delay: 0.45,
            ease: easing,
          }}
        >
          <motion.h2
            className="text-3xl font-semibold leading-extra-tight tracking-tight text-[#111111] sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.9,
              delay: 0.5,
              ease: easing,
            }}
          >
            Tie up all the loose ends<br />in your workflow 
          </motion.h2>

          <motion.p
            className="mt-5 text-sm leading-relaxed text-[#6B6B6B] sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.9,
              delay: 0.7,
              ease: easing,
            }}
          >
            Most small teams guess their way through analytics. Kompi Suite replaces
            that guesswork with a single, reliable system for creating links, tracking
            performance and understanding what actually works. Every scan, click and
            visit rolls into one clear view, making marketing decisions feel easier
            and far more confident. You stop juggling tools, stop losing data, and
            start learning from every campaign. Suite gives you the clarity
            to grow without wasting time or budget.
          </motion.p>

          {/* CTA BUTTON (fixed) */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{
              duration: 0.9,
              delay: 0.9,
              ease: easing,
            }}
          >
            <Link
              href="/kompi-suite#content-tools"
              className="group inline-flex items-center gap-4 text-sm font-medium text-[#111111]"
            >
              <span className="tracking-tight">Learn more</span>

              <span
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-full border-2 border-[#111111]
                  bg-[#111111] text-white
                  text-lg font-semibold leading-none
                  shadow-[0_4px_0_0_rgba(0,0,0,1)]
                  transition-all duration-200
                  group-hover:-translate-y-[2px]
                  group-hover:shadow-[0_6px_0_0_rgba(0,0,0,1)]
                "
              >
                <span className="translate-x-[1px]">→</span>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
