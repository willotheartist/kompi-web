"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/dashboard/glass-card";

type ToolConfig = {
  imageSrc: string;
  imageAlt: string;
  headingLines: [string, string, string, string]; // last line is accent
  body: string; // let the browser wrap this nicely
  href: string;
};

type ToolCardProps = ToolConfig & {
  onClick: () => void;
};

// Single tool card – cream background, image left, controlled heading, natural body wrap.
function ToolCard({
  imageSrc,
  imageAlt,
  headingLines,
  body,
  onClick,
}: ToolCardProps) {
  const [h1, h2, h3, hAccent] = headingLines;

  return (
    <div
      className="flex flex-col items-center gap-4 rounded-[30px] px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-5"
      style={{
        backgroundColor: "#FFF1E3", // warm cream
      }}
    >
      {/* Left: PNG visual */}
      <div className="relative w-full max-w-[190px] sm:max-w-[210px]">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Right: copy + CTA – nudged left for better alignment */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 text-left sm:-ml-4">
        <div className="space-y-3 max-w-[230px] sm:max-w-[260px]">
          {/* Heading – 3 lines + 1 accent line */}
          <h3
            className="text-[1.5rem] font-semibold leading-[1.02]"
            style={{ letterSpacing: "-0.04em" }}
          >
            <span className="block">{h1}</span>
            <span className="block">{h2}</span>
            <span className="block">{h3}</span>
            <span
              className="block"
              style={{
                fontFamily:
                  "var(--font-accent, var(--font-primary, system-ui, -apple-system, BlinkMacSystemFont, sans-serif))",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "1.15em",
                letterSpacing: "-0.03em",
              }}
            >
              {hAccent}
            </span>
          </h3>

          {/* Body – single string, natural wrap */}
          <p
            className="text-[0.85rem] leading-[1.5]"
            style={{ color: "var(--color-subtle)" }}
          >
            {body}
          </p>
        </div>

        {/* CTA – always "Get Started" */}
        <button
          type="button"
          onClick={onClick}
          className="mt-1 inline-flex w-fit items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold"
          style={{
            backgroundColor: "#D4FF3E",
            color: "#000000",
            letterSpacing: "-0.02em",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

// Pattern: FeatureGrid_Dashboard – three promo cards in one panel
export function DashboardFeatureGrid() {
  const router = useRouter();

  const tools: ToolConfig[] = [
    {
      imageSrc: "/kcard-dashboard-card.png",
      imageAlt: "K-Card example",
      headingLines: ["Your", "digital", "card,", "optimized."],
      body:
        "Customize your K-Card, track performance, and make every interaction count.",
      href: "/k-cards",
    },
    {
      imageSrc: "/kr-dashboard-card.png",
      imageAlt: "Kompi Codes example",
      headingLines: ["Your", "QR", "menus,", "upgraded."],
      body:
        "Design Kompi Codes for menus, posters and packaging, then see what gets scanned.",
      href: "/qr-menus",
    },
    {
      imageSrc: "/links-dashboard-card.png",
      imageAlt: "Kompi links example",
      headingLines: ["Your", "links,", "all in", "one."],
      body:
        "Create clean Kompi links and bio pages that stay in sync across every channel.",
      href: "/links/new",
    },
  ];

  return (
    <GlassCard className="space-y-4 bg-[var(--color-bg)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold sm:text-lg">
          Tools to Grow Your Audience
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard
            key={tool.href}
            {...tool}
            onClick={() => router.push(tool.href)}
          />
        ))}
      </div>
    </GlassCard>
  );
}
