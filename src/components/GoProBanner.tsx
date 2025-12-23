"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface GoProBannerProps {
  onGoProClick?: () => void;
}

export function GoProBanner({ onGoProClick }: GoProBannerProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (onGoProClick) {
      onGoProClick();
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/billing/create-checkout-session", {
        method: "POST",
      });

      if (!res.ok) {
        let message = "Could not start checkout";
        try {
          const data = await res.json();
          if (data?.error && typeof data.error === "string") {
            message = data.error;
          }
        } catch {
          // ignore
        }
        toast.error(message);
        return;
      }

      const data: { url?: string } = await res.json();

      if (!data.url) {
        toast.error("Stripe checkout URL is missing");
        return;
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("GoProBanner handleClick error:", err);
      toast.error("Something went wrong starting checkout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 bg-(--color-surface) 
                 border-t border-(--color-border) shadow-sm"
      style={{
        fontFamily:
          '"Inter Tight", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center md:gap-2">
          <p className="text-xs font-medium tracking-wide text-(--color-subtle) uppercase">
            Kompi Pro
          </p>
          <p className="text-sm text-(--color-text)">
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
            onClick={handleClick}
            disabled={loading}
            className="bg-(--color-accent) text-(--color-text) 
                       hover:bg-(--color-accent) rounded-full px-5 py-2 
                       text-sm font-medium shadow-sm"
          >
            {loading ? "Redirecting…" : "⚡ Go Pro"}
          </Button>
        </div>
      </div>
    </div>
  );
}
