"use client";

import { FormEvent } from "react";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

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

const COLORS = {
  // main palette
  darkBg: "#0c4138", // link mode card bg
  lightBg: "#eaf77a", // KR mode card bg
  navy: "#0c4138", // toggle background / dark button
  neon: "#eaf77a", // selected toggle / light button
  lightText: "#eaf77a",
  darkText: "#0c4138",
  underlineDark: "#194f43",
  underlineLight: "#c7e55d",
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
  const isKr = quickMode === "kr";

  const cardStyle = !isKr
    ? {
        backgroundColor: COLORS.darkBg,
        color: COLORS.lightText,
        borderColor: COLORS.darkBg,
        boxShadow: "none",
      }
    : {
        backgroundColor: COLORS.lightBg,
        color: COLORS.darkText,
        borderColor: COLORS.lightBg,
        boxShadow: "none",
      };

  const textColor = !isKr ? COLORS.lightText : COLORS.darkText;
  const underlineColor = !isKr ? COLORS.underlineLight : COLORS.underlineDark;

  return (
    <GlassCard
      className="rounded-[20px] border px-5 py-5 md:px-7 md:py-6"
      style={cardStyle}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p
            className="text-sm font-semibold leading-tight"
            style={{ color: textColor }}
          >
            Quick Create
          </p>
          <p
            className="text-lg font-semibold leading-tight md:text-xl"
            style={{ color: textColor }}
          >
            Drop a link, Kompi does the rest.
          </p>
        </div>

        {/* Toggle pill */}
        <div
          className="hidden shrink-0 items-center rounded-full p-1 text-[11px] font-medium md:flex"
          style={{
            backgroundColor: COLORS.navy,
            borderRadius: 9999,
          }}
        >
          {/* Short link side */}
          <button
            type="button"
            onClick={() => onQuickModeChange("link")}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-transform"
            style={
              quickMode === "link"
                ? {
                    backgroundColor: COLORS.neon,
                    color: COLORS.navy,
                  }
                : {
                    color: COLORS.lightText,
                  }
            }
          >
            <Link2 className="h-3.5 w-3.5" />
            <span>Short link</span>
          </button>

          {/* KR code side */}
          <button
            type="button"
            onClick={() => onQuickModeChange("kr")}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-transform"
            style={
              quickMode === "kr"
                ? {
                    backgroundColor: COLORS.neon,
                    color: COLORS.navy,
                  }
                : {
                    color: COLORS.lightText,
                  }
            }
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>KR code</span>
          </button>
        </div>
      </div>

      {/* Input + CTA */}
      <form
        className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center"
        onSubmit={onSubmit}
      >
        <div className="flex-1">
          <Input
            value={quickUrl}
            onChange={(e) => onQuickUrlChange(e.target.value)}
            disabled={isCreating}
            placeholder="Paste any long URL"
            className={cn(
              "h-10 w-full border-0 border-b bg-transparent px-0 text-sm md:text-base",
              "rounded-none shadow-none border-x-0 border-t-0",
              "focus-visible:ring-0 focus-visible:border-b-2 focus-visible:outline-none"
            )}
            style={{
              borderBottomColor: underlineColor,
              color: textColor,
            }}
          />
        </div>

        <Button
          type="submit"
          disabled={isCreating}
          className="mt-3 inline-flex items-center justify-center rounded-full px-6 text-sm font-semibold md:mt-0"
          style={{
            backgroundColor: !isKr ? COLORS.lightBg : COLORS.navy,
            color: !isKr ? COLORS.navy : COLORS.lightText,
            opacity: isCreating ? 0.7 : 1,
          }}
        >
          {isCreating
            ? "Working..."
            : quickMode === "link"
            ? "Create Kompi link"
            : "Create KR code"}
        </Button>
      </form>

      {/* Minimal advanced link, aligned right */}
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={onOpenAdvanced}
          className="text-[11px] font-medium underline-offset-2 hover:underline"
          style={{ color: textColor }}
        >
          Advanced
        </button>
      </div>
    </GlassCard>
  );
}
