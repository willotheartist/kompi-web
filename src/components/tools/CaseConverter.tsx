"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type CaseMode =
  | "upper"
  | "lower"
  | "sentence"
  | "title"
  | "capitalized";

function toSentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*[a-zà-ÿ])|([.!?]\s+[a-zà-ÿ])/g, (match) =>
    match.toUpperCase(),
  );
}

function toTitleCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(/\b([\p{L}\p{N}']+)\b/gu, (word) => {
    // keep common “small words” lowercase unless at start
    const smallWords = [
      "and",
      "or",
      "but",
      "a",
      "an",
      "the",
      "for",
      "nor",
      "on",
      "at",
      "to",
      "from",
      "by",
      "in",
      "of",
      "with",
    ];
    const bare = word.toLowerCase();
    if (smallWords.includes(bare)) return bare;
    return bare.charAt(0).toUpperCase() + bare.slice(1);
  });
}

function toCapitalized(text: string): string {
  return text.replace(/\b([\p{L}\p{N}']+)\b/gu, (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });
}

function transformText(text: string, mode: CaseMode): string {
  switch (mode) {
    case "upper":
      return text.toUpperCase();
    case "lower":
      return text.toLowerCase();
    case "sentence":
      return toSentenceCase(text);
    case "title":
      return toTitleCase(text);
    case "capitalized":
      return toCapitalized(text);
    default:
      return text;
  }
}

export function CaseConverter() {
  const [text, setText] = useState("");
  const [lastMode, setLastMode] = useState<CaseMode | null>(null);

  const hasText = text.trim().length > 0;
  const length = text.length;

  function handleTransform(mode: CaseMode) {
    if (!text) return;
    setText((prev) => transformText(prev, mode));
    setLastMode(mode);
  }

  function handleCopy() {
    if (!hasText || typeof navigator === "undefined") return;
    navigator.clipboard?.writeText(text).catch(() => {
      // ignore errors
    });
  }

  function handleClear() {
    setText("");
    setLastMode(null);
  }

  function handlePasteFromClipboard() {
    if (typeof navigator === "undefined" || !navigator.clipboard?.readText) {
      return;
    }
    navigator.clipboard
      .readText()
      .then((value) => setText(value))
      .catch(() => {
        // ignore
      });
  }

  return (
    <div className="flex flex-col gap-4 rounded-3xl border bg-card/80 p-4 sm:p-5 shadow-sm">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold tracking-tight">
          Case converter
        </h2>
        <p className="text-sm text-muted-foreground">
          Paste your text and convert it to uppercase, lowercase, sentence case,
          or title case with one click.
        </p>
      </div>

      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste or type your text here…"
        className="min-h-[180px] resize-y rounded-2xl"
      />

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleTransform("upper")}
            disabled={!hasText}
          >
            UPPERCASE
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleTransform("lower")}
            disabled={!hasText}
          >
            lowercase
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleTransform("sentence")}
            disabled={!hasText}
          >
            Sentence case
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleTransform("title")}
            disabled={!hasText}
          >
            Title Case
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => handleTransform("capitalized")}
            disabled={!hasText}
          >
            Capitalize Words
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>
              <strong>{length}</strong> characters
            </span>
            {lastMode && (
              <>
                <span className="hidden sm:inline">·</span>
                <span>
                  Last applied:{" "}
                  <strong>
                    {
                      {
                        upper: "UPPERCASE",
                        lower: "lowercase",
                        sentence: "Sentence case",
                        title: "Title Case",
                        capitalized: "Capitalize Words",
                      }[lastMode]
                    }
                  </strong>
                </span>
              </>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePasteFromClipboard}
            >
              Paste
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!hasText}
              onClick={handleCopy}
            >
              Copy
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={!hasText}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseConverter;
