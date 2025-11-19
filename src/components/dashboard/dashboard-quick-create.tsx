"use client";

import { FormEvent } from "react";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, QrCode } from "lucide-react";

type QuickMode = "link" | "kr";

type DashboardQuickCreateProps = {
  quickMode: QuickMode;
  onQuickModeChange: (mode: QuickMode) => void;
  quickUrl: string;
  onQuickUrlChange: (value: string) => void;
  isCreating: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onOpenAdvanced: () => void;
};

// Pattern: QuickCreateBar
export function DashboardQuickCreate({
  quickMode,
  onQuickModeChange,
  quickUrl,
  onQuickUrlChange,
  isCreating,
  onSubmit,
  onOpenAdvanced,
}: DashboardQuickCreateProps) {
  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p
            className="text-[11px] font-semibold tracking-[0.16em] uppercase"
            style={{ color: "var(--color-subtle)" }}
          >
            Quick create
          </p>
          <h2 className="text-lg font-semibold">
            Spin up a{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-instrument-serif), var(--font-inter-tight), system-ui",
                fontStyle: "italic",
              }}
            >
              {quickMode === "link"
                ? "Kompi link"
                : "Kompi Code™ (KR)"}
            </span>{" "}
            in seconds
          </h2>
          <p
            className="text-sm"
            style={{ color: "var(--color-subtle)" }}
          >
            Paste any URL and we&apos;ll handle the short link,
            tracking and KR-ready mode for you.
          </p>
        </div>
        <div
          className="flex items-center gap-1 rounded-full p-1"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
          }}
        >
          <button
            onClick={() => onQuickModeChange("link")}
            className="px-3 py-1.5 rounded-full text-xs flex items-center"
            style={
              quickMode === "link"
                ? {
                    backgroundColor: "var(--color-accent-soft)",
                    color: "var(--color-text)",
                  }
                : { color: "var(--color-subtle)" }
            }
          >
            <Link2 className="h-3.5 w-3.5 mr-1" />
            Short link
          </button>
          <button
            onClick={() => onQuickModeChange("kr")}
            className="px-3 py-1.5 rounded-full text-xs flex items-center"
            style={
              quickMode === "kr"
                ? {
                    backgroundColor: "var(--color-accent-soft)",
                    color: "var(--color-text)",
                  }
                : { color: "var(--color-subtle)" }
            }
          >
            <QrCode className="h-3.5 w-3.5 mr-1" />
            KR code
          </button>
        </div>
      </div>

      <form
        className="flex flex-col md:flex-row gap-3 items-stretch"
        onSubmit={onSubmit}
      >
        <Input
          value={quickUrl}
          onChange={(e) => onQuickUrlChange(e.target.value)}
          disabled={isCreating}
          className="text-sm"
          style={{
            backgroundColor: "var(--color-bg)",
            borderColor: "var(--color-border)",
            color: "var(--color-text)",
          }}
          placeholder={
            quickMode === "link"
              ? "Paste any long URL to shorten with Kompi..."
              : "Paste a destination URL to generate a Kompi KR code..."
          }
        />
        <Button
          type="submit"
          disabled={isCreating}
          className="whitespace-nowrap rounded-full px-6 text-sm"
          style={{
            backgroundColor: "var(--color-text)",
            color: "var(--color-bg)",
            borderRadius: "999px",
            opacity: isCreating ? 0.7 : 1,
          }}
        >
          {isCreating
            ? "Working..."
            : quickMode === "link"
            ? "Create Kompi link"
            : "Generate KR code"}
        </Button>
      </form>

      <div
        className="flex flex-wrap gap-4 text-xs items-center"
        style={{ color: "var(--color-subtle)" }}
      >
        <span>Auto-UTMs from workspace rules</span>
        <span>•</span>
        <span>Instant analytics &amp; history</span>
        <span>•</span>
        <span>KR-ready for print &amp; screens</span>
        <button
          type="button"
          onClick={onOpenAdvanced}
          className="ml-auto text-xs font-medium underline-offset-2 hover:underline"
          style={{ color: "var(--color-subtle)" }}
        >
          Advanced create
        </button>
      </div>
    </GlassCard>
  );
}
