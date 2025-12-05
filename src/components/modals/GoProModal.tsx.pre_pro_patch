"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GoProModalProps {
  open: boolean;
  onClose: () => void;
}

export default function GoProModal({ open, onClose }: GoProModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            className="relative grid w-full max-w-5xl min-h-[380px] md:min-h-[460px]
                       grid-cols-1 overflow-hidden rounded-[var(--radius-lg)]
                       border border-[var(--color-border)]
                       bg-[var(--color-surface)] shadow-md
                       md:grid-cols-[1.25fr_1fr]"
            style={{
              fontFamily:
                '"Inter Tight", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center 
                         justify-center rounded-full border border-[var(--color-border)] 
                         bg-[var(--color-surface)] text-[var(--color-subtle)] 
                         shadow-sm hover:text-[var(--color-text)]"
            >
              <span className="sr-only">Close</span>
              <span aria-hidden>×</span>
            </button>

            {/* LEFT — TEXT */}
            <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
                Kompi Pro
              </p>

              <h2 className="text-3xl md:text-[2.15rem] font-semibold leading-tight text-[var(--color-text)]">
                Upgrade your{" "}
                <span
                  className="italic"
                  style={{
                    fontFamily:
                      '"Instrument Serif", "Times New Roman", serif',
                  }}
                >
                  Kompi
                </span>
                . Make every visit count.
              </h2>

              <p className="text-sm md:text-base text-[var(--color-subtle)] max-w-md">
                Turn every Kompi page, link and QR into a fully branded, fully
                measured touchpoint — without juggling extra tools.
              </p>

              <ul className="mt-2 space-y-2 text-sm text-[var(--color-text)]">
                <li>• Remove Kompi branding from public pages</li>
                <li>• Premium themes for links, bios & Kompi Codes™</li>
                <li>• Deeper insights into what actually converts</li>
              </ul>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  className="bg-[var(--color-accent)] text-[var(--color-text)]
                             rounded-full px-7 py-3 text-sm font-medium shadow-sm
                             hover:bg-[var(--color-accent)]"
                >
                  Start your Pro trial
                </Button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm text-[var(--color-subtle)] underline underline-offset-4"
                >
                  Maybe later
                </button>
              </div>
            </div>

            {/* RIGHT — FULL-COVER IMAGE COLUMN */}
            <div className="relative hidden h-full md:block bg-[var(--color-accent-soft)]">
              <Image
                src="/kompifive.png"
                alt="Kompi Pro preview"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
