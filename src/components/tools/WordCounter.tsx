"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const value = text || "";
    const trimmed = value.trim();

    const characters = value.length;
    const charactersNoSpaces = value.replace(/\s+/g, "").length;

    const words =
      trimmed.length === 0
        ? 0
        : trimmed
            .split(/\s+/)
            .filter(Boolean).length;

    const lines = value === "" ? 0 : value.split(/\r\n|\r|\n/).length;

    // Rough sentence count: split on . ! ?
    const sentences =
      trimmed.length === 0
        ? 0
        : trimmed
            .split(/[.!?]+/)
            .map((s) => s.trim())
            .filter(Boolean).length;

    // Paragraphs: blocks of text separated by 1+ blank lines
    const paragraphs =
      trimmed.length === 0
        ? 0
        : value
            .split(/\n{2,}/)
            .map((p) => p.trim())
            .filter(Boolean).length;

    // Simple reading time estimate: 200 wpm
    const minutesFloat = words / 200;
    const readingTime =
      minutesFloat < 0.5
        ? "< 1 min"
        : `${Math.round(minutesFloat)} min${
            Math.round(minutesFloat) > 1 ? "s" : ""
          }`;

    return {
      words,
      characters,
      charactersNoSpaces,
      lines,
      sentences,
      paragraphs,
      readingTime,
    };
  }, [text]);

  function handleClear() {
    setText("");
  }

  function handlePasteFromClipboard() {
    if (typeof navigator === "undefined" || !navigator.clipboard?.readText) {
      return;
    }
    navigator.clipboard
      .readText()
      .then((value) => setText(value))
      .catch(() => {
        // ignore clipboard errors
      });
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl border bg-card/80 p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Word counter
        </h2>
        <p className="text-sm text-muted-foreground">
          Paste your content to see words, characters, sentences, and estimated
          reading time.
        </p>
      </div>

      {/* Stats bar (like your design header) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 rounded-2xl border bg-background/60 p-3 sm:p-4">
        <StatBlock label="Words" value={stats.words} />
        <StatBlock label="Characters" value={stats.characters} />
        <StatBlock label="Sentences" value={stats.sentences} />
        <StatBlock label="Paragraphs" value={stats.paragraphs} />
        <StatBlock label="Lines" value={stats.lines} className="hidden lg:flex" />
        <StatBlock
          label="Reading"
          value={stats.readingTime}
          emphasis
          className="col-span-2 sm:col-span-1 justify-self-end text-right lg:text-left"
        />
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-border" />

      {/* Editor + footer */}
      <div className="flex flex-col gap-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here…"
          className="min-h-[200px] resize-y rounded-2xl border bg-background/70 font-mono text-[13px] sm:text-sm leading-relaxed"
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Secondary inline stats on small screens (optional) */}
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground sm:hidden">
            <span>
              <strong>{stats.words}</strong> words
            </span>
            <span>·</span>
            <span>
              <strong>{stats.characters}</strong> chars
            </span>
            <span>·</span>
            <span>
              <strong>{stats.readingTime}</strong>
            </span>
          </div>

          <div className="flex gap-2 ml-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePasteFromClipboard}
            >
              Paste from clipboard
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

type StatBlockProps = {
  label: string;
  value: string | number;
  emphasis?: boolean;
  className?: string;
};

function StatBlock({ label, value, emphasis, className }: StatBlockProps) {
  return (
    <div
      className={[
        "flex flex-col justify-between rounded-xl px-2 py-1.5 sm:px-2.5 sm:py-2",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <span
        className={
          emphasis
            ? "text-base sm:text-lg font-semibold"
            : "text-base sm:text-lg font-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}

export default WordCounter;
