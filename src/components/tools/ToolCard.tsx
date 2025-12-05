"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ToolDefinition } from "@/lib/tools-config";

interface ToolCardProps {
  tool: ToolDefinition;
  enabled?: boolean;
  onToggle?: () => void;
}

export function ToolCard({ tool, enabled = false, onToggle }: ToolCardProps) {
  const isComingSoon = tool.status === "coming-soon";

  const buttonLabel = isComingSoon ? "Soon" : enabled ? "Added" : "Add";

  return (
    <div
      className="flex h-full flex-col rounded-[32px] border bg-card p-4 sm:p-5 shadow-sm"
      style={{
        borderColor: enabled ? "#111111" : "var(--color-border)",
        boxShadow: enabled ? "0 0 0 2px #111111" : "0 10px 40px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top image / illustration area */}
      <div className="mb-4 rounded-3xl overflow-hidden">
        <div
          className="h-32 w-full"
          style={{
            background:
              "linear-gradient(135deg, #FFF1BF 0%, #FF98D4 35%, #B782FF 70%, #111111 100%)",
          }}
        />
      </div>

      {/* Title & description */}
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold leading-tight">
          {tool.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {tool.shortDescription}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="mt-4 flex items-center justify-between gap-3">
        {!isComingSoon && (
          <div className="hidden text-[11px] text-muted-foreground sm:block">
            <span>Public page:&nbsp;</span>
            <Link
              href={tool.publicPath}
              className="underline underline-offset-2 hover:text-foreground"
            >
              {tool.publicPath}
            </Link>
          </div>
        )}
        {isComingSoon && (
          <div className="text-[11px] text-muted-foreground">
            We&apos;re putting the finishing touches on this tool.
          </div>
        )}

        <Button
          type="button"
          size="lg"
          disabled={isComingSoon}
          onClick={onToggle}
          className="ml-auto w-28 rounded-full text-sm font-medium"
          style={{
            backgroundColor: isComingSoon
              ? "#F3F3F3"
              : enabled
              ? "#F5FF7A"
              : "#222222",
            color: isComingSoon ? "#999999" : enabled ? "#111111" : "#FFFFFF",
          }}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

export default ToolCard;
