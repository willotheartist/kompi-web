"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Update these to match the actual filenames in /public/faces
const FACES = [
  "/faces/face77.png",
  "/faces/face78.png",
  "/faces/face79.png",
  "/faces/face80.png",
  "/faces/face81.png",
  "/faces/face82.png",
  "/faces/face83.png",
  "/faces/face84.png",
  "/faces/face85.png",
];

// slow, calm loop
const SCROLL_DURATION = 45;

export default function Faces() {
  const reduceMotion = useReducedMotion();
  const loopFaces = [...FACES, ...FACES];

  return (
    <section className="w-full bg-[#1E2330]">
      <div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        {/* Heading */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: easing }}
        >
          <h2
            className="text-[26px] leading-tight text-[#C4C8FF] sm:text-[32px] md:text-[36px]"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="block">Do more with your</span>
            <span className="block">
              <span className="wf-serif-accent italic text-white">
                digital presence.
              </span>
              <span className="ml-1 wf-serif-accent italic text-[#C4C8FF]">
                Own it.
              </span>
            </span>
          </h2>
        </motion.div>

        {/* Faces rail */}
        <div className="mt-10 w-full max-w-5xl">
          <div className="relative overflow-hidden">
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A0F1F] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0A0F1F] to-transparent" />

            {reduceMotion ? (
              // manual scroll fallback
              <div className="flex gap-5 overflow-x-auto px-4 pb-4 no-scrollbar">
                {FACES.map((src, i) => (
                  <FaceTile key={src + i} src={src} />
                ))}
              </div>
            ) : (
              <motion.div
                className="flex gap-5 px-4 pb-4"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  duration: SCROLL_DURATION,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {loopFaces.map((src, i) => (
                  <FaceTile key={src + i} src={src} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaceTile({ src }: { src: string }) {
  return (
    <div className="relative h-[180px] w-[150px] shrink-0 overflow-hidden rounded-[40px] sm:h-[200px] sm:w-[170px]">
      <Image
        src={src}
        alt="Kompi creator"
        fill
        className="object-cover"
        sizes="170px"
      />
    </div>
  );
}
