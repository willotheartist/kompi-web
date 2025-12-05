"use client";

import { Button } from "@/components/ui/button";

interface GoProBannerProps {
  onGoProClick?: () => void;
}

export function GoProBanner({ onGoProClick }: GoProBannerProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 bg-[var(--color-surface)] 
                 border-t border-[var(--color-border)] shadow-sm"
      style={{
        fontFamily:
          '"Inter Tight", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
          <p className="text-xs font-medium tracking-wide text-[var(--color-subtle)] uppercase">
            Kompi Pro
          </p>
          <p className="text-sm text-[var(--color-text)]">
            Unlock more tools to help your links{" "}
            <span
              className="italic"
              style={{
                fontFamily:
                  '"Instrument Serif", "Times New Roman", serif',
              }}
            >
              perform
            </span>{" "}
            better.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            type="button"
            onClick={onGoProClick}
            className="bg-[var(--color-accent)] text-[var(--color-text)] 
                       hover:bg-[var(--color-accent)] rounded-full px-5 py-2 
                       text-sm font-medium shadow-sm"
          >
            ⚡ Go Pro
          </Button>
        </div>
      </div>
    </div>
  );
}
