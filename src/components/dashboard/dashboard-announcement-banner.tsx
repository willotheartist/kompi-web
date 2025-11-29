"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function DashboardAnnouncementBanner() {
  const router = useRouter();

  return (
    <section
      className="relative overflow-hidden"
      style={{
        borderRadius: "var(--wf-radius-lg)",
        backgroundColor: "#1e2330",
      }}
    >
      <div className="relative flex flex-col items-start gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        {/* Left: text content */}
        <div className="flex max-w-xl flex-col gap-4">
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#8b9bff" }}
          >
            Kompi Pro · Analytics
          </span>

          <h2 className="text-3xl leading-tight tracking-tight sm:text-4xl">
            <span className="block font-semibold text-slate-50">
              See every click
            </span>
            <span
              className="block text-3xl sm:text-[2.4rem] leading-tight"
              style={{
                fontFamily:
                  "var(--font-instrument-serif), var(--font-inter-tight), system-ui, serif",
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              clearly.
            </span>
          </h2>

          <p className="max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            Upgrade to Kompi Pro for full-history analytics, faster redirects
            and KR insights on every link — right inside your dashboard.
          </p>

          {/* (removed the extra tagline line, as requested) */}

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={() => router.push("/pricing")}
              className="rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Upgrade to Kompi Pro
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/analytics")}
              className="rounded-full border-slate-500 bg-transparent text-sm font-medium text-slate-100 hover:bg-slate-100/5"
            >
              View sample analytics
            </Button>
          </div>
        </div>

        {/* Right: hero image, contained, no crop */}
        <div className="relative mt-4 w-full max-w-sm self-stretch lg:mt-0 lg:self-center">
          <div className="relative h-64 w-full md:h-72">
            <Image
              src="/kompi-analytics.png"
              alt="Kompi analytics preview"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
