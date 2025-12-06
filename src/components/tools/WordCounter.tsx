"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const value = text || "";

    const characters = value.length;
    const charactersNoSpaces = value.replace(/\s+/g, "").length;

    const words = value
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const lines = value.split(/\r\n|\r|\n/).length;

    // Simple reading time estimate: 200 wpm
    const minutes = words / 200;
    const readingTime =
      minutes < 0.5
        ? "< 1 min"
        : `${Math.round(minutes)} min${Math.round(minutes) > 1 ? "s" : ""}`;

    return {
      words,
      characters,
      charactersNoSpaces,
      lines,
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
    <div className="flex flex-col gap-4 rounded-3xl border bg-card/80 p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight">Word counter</h2>
        <p className="text-sm text-muted-foreground">
          Paste your content below to instantly see word count, characters, and
          estimated reading time.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here…"
          className="min-h-[180px] resize-y rounded-2xl"
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>
              <strong>{stats.words}</strong> words
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              <strong>{stats.characters}</strong> characters
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              <strong>{stats.charactersNoSpaces}</strong> without spaces
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              <strong>{stats.lines}</strong> lines
            </span>
            <span className="hidden sm:inline">·</span>
            <span>
              Reading time: <strong>{stats.readingTime}</strong>
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePasteFromClipboard}
            >
              Paste from clipboard
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordCounter;
