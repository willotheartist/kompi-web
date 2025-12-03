// src/components/solutions/SolutionsToolsStrip.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ToolConfig = {
  imageSrc: string;
  imageAlt: string;
  headingLines: [string, string, string, string]; // last line is accent
  body: string;
  href: string;
};

type ToolCardProps = ToolConfig & {
  className?: string;
};

function SolutionToolCard({
  imageSrc,
  imageAlt,
  headingLines,
  body,
  href,
  className,
}: ToolCardProps) {
  const [h1, h2, h3, hAccent] = headingLines;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-[30px] px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-5 sm:py-5",
        className
      )}
      // 3. new neutral card color
      style={{
        backgroundColor: "#ffffffff",
      }}
    >
      {/* Left: PNG visual */}
      <div className="relative w-full max-w-[100px] sm:max-w-[120px]">
        <div className="relative aspect-[5/5] w-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Right: copy + CTA */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4 text-left sm:-ml-4">
        <div className="space-y-3 max-w-[230px] sm:max-w-[260px]">
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

          <p
            className="text-[0.85rem] leading-[1.5]"
            style={{ color: "var(--color-subtle)" }}
          >
            {body}
          </p>
        </div>

        {/* 6. lighter weight, slightly tighter button */}
        <Link
          href={href}
          className="mt-1 inline-flex w-fit items-center justify-center rounded-full px-5 py-2 text-sm font-medium"
          style={{
            backgroundColor: "#D4FF3E",
            color: "#000000",
            letterSpacing: "-0.02em",
          }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

type SolutionsToolsStripProps = {
  className?: string;
};

export function SolutionsToolsStrip({ className }: SolutionsToolsStripProps) {
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
    // 2. no outer box/outline – just a clean section
    <section className={cn("space-y-6", className)}>
      {/* 4. remove “Kompi platform” eyebrow */}
      {/* 1. also removed the subcopy eyebrow sentence */}
      <div className="space-y-2 text-left">
        {/* 5. bigger heading; “Audience” in Instrument Serif via CSS var */}
        <h2 className="text-xl font-medium text-[var(--color-text)] sm:text-3xl">
          Tools to Grow Your{" "}
          <span
            className="italic"
            style={{
              fontFamily:
                "var(--font-accent, var(--font-primary, system-ui, -apple-system, BlinkMacSystemFont, sans-serif))",
            }}
          >
            Audience
          </span>
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {tools.map((tool) => (
          <SolutionToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </section>
  );
}

export default SolutionsToolsStrip;
