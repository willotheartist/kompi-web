// src/components/tools/ToolCard.tsx
"use client";

import * as React from "react";
import type { ToolDefinition } from "@/lib/tools-config";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import {
  Shield,
  Sparkles,
  FileText,
  FileIcon,
  Image as ImageIcon,
  Type,
  Hash,
  User,
  Braces,
  ReceiptText,
  PlayCircle,
  MessageCircle,
} from "lucide-react";

interface ToolCardProps {
  tool: ToolDefinition;
  enabled?: boolean;
  onToggle?: () => void;
}

const ICON_COMPONENTS: Record<ToolDefinition["icon"], LucideIcon> = {
  shield: Shield,
  sparkles: Sparkles,
  "file-text": FileText,
  file: FileIcon,
  image: ImageIcon,
  type: Type,
  hash: Hash,
  user: User,
  json: Braces,
  invoice: ReceiptText,
  play: PlayCircle,
  whatsapp: MessageCircle,
};

export function ToolCard({ tool, enabled = false, onToggle }: ToolCardProps) {
  const isComingSoon = tool.status === "coming-soon";
  const Icon = ICON_COMPONENTS[tool.icon] ?? Sparkles;

  const buttonLabel = isComingSoon ? "Coming soon" : enabled ? "Added" : "Add";

  const handleClick = () => {
    if (isComingSoon || !onToggle) return;
    onToggle();
  };

  return (
    <div
      className="group flex h-full min-h-[230px] flex-col rounded-[32px] border bg-card/80 px-5 py-5 shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1.5 hover:bg-card hover:shadow-xl hover:backdrop-blur-lg"
      style={{
        borderColor: enabled ? "#111111" : "var(--color-border)",
        boxShadow: enabled
          ? "0 0 0 2px #111111"
          : "0 16px 40px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top content */}
      <div className="flex items-start gap-4 pr-6 sm:pr-10">
        {/* Icon + pill */}
        <div className="flex flex-col items-start gap-2">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-3xl transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundColor: tool.accentColor }}
          >
            <Icon className="h-8 w-8" strokeWidth={2.1} />
          </div>
          <div
            className="rounded-full px-3 py-1 text-[11px] font-medium leading-none"
            style={{ backgroundColor: tool.accentColor }}
          >
            {tool.category}
          </div>
        </div>

        {/* Title + description */}
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-semibold leading-tight tracking-tight">
            {tool.name}
          </h3>
          <p className="text-m text-muted-foreground pr-6 sm:pr-10">
            {tool.shortDescription}
          </p>
        </div>
      </div>

      {/* Bottom bar – anchored to bottom for uniform button position */}
      <div className="mt-auto pt-5">
        <Button
          type="button"
          size="lg"
          disabled={isComingSoon}
          onClick={handleClick}
          className="h-10 w-full rounded-full text-sm font-medium transition-transform duration-150 group-hover:translate-y-[1px]"
          style={{
            backgroundColor: isComingSoon ? "#F3F3F3" : "#111111",
            color: isComingSoon ? "#999999" : "#FFFFFF",
          }}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}

export default ToolCard;
