"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

// Pattern: Banner_AnnouncementPro
export function DashboardAnnouncementBanner() {
  const router = useRouter();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        borderRadius: "var(--wf-radius-lg)",
      }}
    >
      {/* Hero background image */}
      <div className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[320px] lg:min-h-[360px]">
        <Image
          src="/herobg.png"
          alt="Kompi V2 hero background"
          fill
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Content overlay */}
        <div className="relative z-10 flex h-full items-center px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-14">
          <div
            className="flex flex-col gap-5 sm:gap-6 md:gap-7 max-w-xl"
            style={{
              color: "var(--color-bg)",
              fontFamily:
                "var(--font-inter-tight), system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {/* New product pill – fixed width + pink token */}
            <span
              className="inline-flex items-center justify-center rounded-full border px-6 py-2 text-[11px] font-semibold tracking-[0.16em] uppercase"
              style={{
                backgroundColor: "var(--color-accent-pink)", // use subtle token so theme can make this pink
                color: "var(--color-text)",
                borderColor: "var(--color-subtle)",
                maxWidth: "280px",
              }}
            >
              New product
            </span>

            {/* Heading + body */}
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                Kompi.{" "}
                <span
                  style={{
                    fontFamily:
                      "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
                    fontStyle: "italic",
                  }}
                >
                  V2
                </span>
              </h2>

              {/* Force 3-line layout like the design */}
              <p className="text-sm sm:text-base md:text-lg max-w-xl">
                <span className="block">
                  Unlock your full potential with Kompi&apos;s new tools.
                </span>
                <span className="block">
                  Make your world clickable and
                </span>
                <span className="block">track your impact.</span>
              </p>
            </div>

            {/* CTA button */}
            <Button
              type="button"
              onClick={() => router.push("/pricing")}
              className="inline-flex w-max items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
              style={{
                backgroundColor: "var(--color-accent)",
                color: "var(--color-text)",
                borderRadius: "999px",
              }}
            >
              <Zap className="h-4 w-4" />
              Go Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
