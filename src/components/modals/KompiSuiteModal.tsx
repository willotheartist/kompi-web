"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface KompiSuiteModalProps {
  open: boolean;
  onClose: () => void;
}

export function KompiSuiteModal({ open, onClose }: KompiSuiteModalProps) {
  const router = useRouter();

  const handleUpgrade = () => {
    onClose();
    // For now, send them to billing settings; later you can swap this
    // to a direct Stripe checkout link for the Kompi Suite product.
    router.push("/dashboard/settings/billing");
  };

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
            className="relative w-full max-w-lg rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl"
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

            <div className="space-y-4 pt-2">
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
                Kompi Suite
              </p>

              <h2 className="text-2xl font-semibold leading-tight text-[var(--color-text)]">
                Unlock all Kompi tools in your dashboard.
              </h2>

              <p className="text-sm text-[var(--color-subtle)]">
                Add any tool to your workspace sidebar and keep your favorite
                generators, calculators and converters just one click away.
              </p>

              <div className="rounded-2xl bg-[var(--color-bg)] px-4 py-3 text-sm">
                <p className="font-medium text-[var(--color-text)]">
                  Kompi Suite – <span className="text-[var(--color-accent)]">£19.99/mo</span>
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-[var(--color-subtle)]">
                  <li>Full access to all dashboard tools</li>
                  <li>Pin tools into your Kompi workspace sidebar</li>
                  <li>Centralize campaigns, content and analytics</li>
                </ul>
              </div>

              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 rounded-full px-4 text-sm"
                  onClick={onClose}
                >
                  Maybe later
                </Button>
                <Button
                  type="button"
                  className="h-9 rounded-full bg-[var(--color-accent)] px-5 text-sm font-semibold text-[var(--color-text)] shadow-sm hover:shadow-md"
                  onClick={handleUpgrade}
                >
                  Upgrade to Kompi Suite
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
