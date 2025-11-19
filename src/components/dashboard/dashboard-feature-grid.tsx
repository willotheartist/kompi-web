"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/dashboard/glass-card";
import { QrCode, Sparkles, ArrowRight } from "lucide-react";

// Simple icon stub to avoid extra imports
function LayoutTemplateIcon() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center">
      <span
        className="inline-block h-4 w-3 rounded-sm"
        style={{
          border: "1px solid var(--color-text)",
        }}
      />
    </span>
  );
}

// Pattern: FeatureGrid_DashboardCarousel
export function DashboardFeatureGrid() {
  const router = useRouter();

  return (
    <GlassCard className="space-y-4 md:space-y-6 bg-[var(--color-bg)]">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-semibold">
          Tools to grow your audience
        </h2>
        <p
          className="text-xs md:text-sm max-w-xl"
          style={{ color: "var(--color-subtle)" }}
        >
          Turn Kompi links into full experiences – from scannable codes to
          branded pages and smart cards.
        </p>
      </div>

      {/* Cards strip */}
      <div className="grid auto-cols-[minmax(220px,1fr)] grid-flow-col gap-4 overflow-x-auto pb-1 md:auto-cols-auto md:grid-flow-row md:grid-cols-3 md:overflow-visible">
        {/* Card 1 */}
        <button
          type="button"
          onClick={() => router.push("/kr-codes")}
          className="flex h-full min-h-[260px] flex-col rounded-[24px] text-left shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Top media block with image */}
          <div
            className="relative w-full overflow-hidden rounded-t-[24px]"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            <div className="relative h-32 sm:h-36 md:h-40">
              <Image
                src="/feature-kr-codes.png"
                alt="Kompi Codes (KR) preview"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom content */}
          <div className="flex flex-1 flex-col gap-3 rounded-b-[24px] px-4 pb-4 pt-3">
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--color-accent-soft)" }}
                >
                  <QrCode className="h-3.5 w-3.5" />
                </span>
                <span>Kompi Codes™ (KR)</span>
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-subtle)" }}
              >
                Turn any Kompi link into a scannable code for print, packaging,
                and screens.
              </p>
            </div>
            <span
              className="mt-auto inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              Open KR tools
              <ArrowRight className="ml-1.5 h-3 w-3" />
            </span>
          </div>
        </button>

        {/* Card 2 */}
        <button
          type="button"
          onClick={() => router.push("/p")}
          className="flex h-full min-h-[260px] flex-col rounded-[24px] text-left shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Top media block with image */}
          <div
            className="relative w-full overflow-hidden rounded-t-[24px]"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            <div className="relative h-32 sm:h-36 md:h-40">
              <Image
                src="/feature-bio-page.png"
                alt="Link-in-bio page preview"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom content */}
          <div className="flex flex-1 flex-col gap-3 rounded-b-[24px] px-4 pb-4 pt-3">
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--color-accent-soft)" }}
                >
                  <LayoutTemplateIcon />
                </span>
                <span>Link-in-bio page</span>
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-subtle)" }}
              >
                Collect all your Kompi links into one branded landing page that
                works everywhere you share.
              </p>
            </div>
            <span
              className="mt-auto inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              Build a bio page
              <ArrowRight className="ml-1.5 h-3 w-3" />
            </span>
          </div>
        </button>

        {/* Card 3 */}
        <button
          type="button"
          onClick={() => router.push("/k-cards")}
          className="flex h-full min-h-[260px] flex-col rounded-[24px] text-left shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Top media block with image */}
          <div
            className="relative w-full overflow-hidden rounded-t-[24px]"
            style={{ backgroundColor: "var(--color-accent-soft)" }}
          >
            <div className="relative h-32 sm:h-36 md:h-40">
              <Image
                src="/feature-k-cards.png"
                alt="K-Cards preview"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom content */}
          <div className="flex flex-1 flex-col gap-3 rounded-b-[24px] px-4 pb-4 pt-3">
            <div className="space-y-1.5">
              <p className="flex items-center gap-1.5 text-sm font-semibold">
                <span
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ backgroundColor: "var(--color-accent-soft)" }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span>K-Cards</span>
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-subtle)" }}
              >
                Smart business cards powered by Kompi links and KR Codes, ready
                to scan and share in one tap.
              </p>
            </div>
            <span
              className="mt-auto inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-text)",
              }}
            >
              Explore K-Cards
              <ArrowRight className="ml-1.5 h-3 w-3" />
            </span>
          </div>
        </button>
      </div>
    </GlassCard>
  );
}
