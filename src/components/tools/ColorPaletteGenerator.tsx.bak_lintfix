"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

type PaletteColor = {
  hex: string;
  locked: boolean;
  favorite?: boolean;
};

type ColorPaletteGeneratorProps = {
  variant?: "full" | "minimal";
};

function randomHex(): string {
  const letters = "0123456789ABCDEF";
  let value = "#";
  for (let i = 0; i < 6; i++) {
    value += letters[Math.floor(Math.random() * 16)];
  }
  return value;
}

function generatePalette(previous: PaletteColor[] | null, size: number): PaletteColor[] {
  if (!previous || previous.length === 0) {
    return Array.from({ length: size }, () => ({
      hex: randomHex(),
      locked: false,
    }));
  }

  return previous.map((color) =>
    color.locked
      ? color
      : {
          ...color,
          hex: randomHex(),
        }
  );
}

function getTextColorClass(hex: string): string {
  const value = hex.replace("#", "");
  if (value.length !== 6) return "text-white";

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "text-slate-900" : "text-white";
}

const INITIAL_PALETTE: PaletteColor[] = [
  { hex: "#334139", locked: false },
  { hex: "#1E2D24", locked: false },
  { hex: "#C52184", locked: false },
  { hex: "#E574BC", locked: false },
  { hex: "#F9B4ED", locked: false },
];

export function ColorPaletteGenerator({ variant = "full" }: ColorPaletteGeneratorProps) {
  const [colors, setColors] = useState<PaletteColor[]>(INITIAL_PALETTE);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const shuffleAll = useCallback(() => {
    setColors((prev) => generatePalette(prev, 5));
  }, []);

  const shuffleSingle = useCallback((index: number) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index && !color.locked
          ? {
              ...color,
              hex: randomHex(),
            }
          : color
      )
    );
  }, []);

  const toggleLock = useCallback((index: number) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index
          ? {
              ...color,
              locked: !color.locked,
            }
          : color
      )
    );
  }, []);

  const toggleFavorite = useCallback((index: number) => {
    setColors((prev) =>
      prev.map((color, i) =>
        i === index
          ? {
              ...color,
              favorite: !color.favorite,
            }
          : color
      )
    );
  }, []);

  const handleCopy = useCallback((hex: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
      return;
    }

    const normalized = hex.toUpperCase();

    navigator.clipboard
      .writeText(normalized)
      .then(() => {
        setCopiedHex(normalized);
        setTimeout(() => {
          setCopiedHex((current) => (current === normalized ? null : current));
        }, 1200);
      })
      .catch(() => {});
  }, []);

  const openContrastChecker = useCallback((hex: string) => {
    if (typeof window === "undefined") return;
    const clean = hex.replace("#", "");
    const url = `https://color-contrast.com/?bg=${encodeURIComponent(clean)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleKeydown(event: KeyboardEvent) {
      if (event.code === "Space" || event.key === " ") {
        event.preventDefault();
        shuffleAll();
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [shuffleAll]);

  // We intentionally trigger an initial shuffle when the component mounts.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    shuffleAll();
  }, [shuffleAll]);

  const isMinimal = variant === "minimal";

  return (
    <div className="flex flex-col gap-3">
      {!isMinimal && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Press spacebar to generate color palettes</span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 px-3 text-[11px]"
            onClick={shuffleAll}
          >
            Shuffle
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-[32px] border bg-slate-950/5 shadow-sm">
        <div className="grid min-h-[380px] sm:min-h-[440px] md:min-h-[520px] grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
          {colors.map((color, index) => {
            const textClass = getTextColorClass(color.hex);
            const isCopied = copiedHex === color.hex.toUpperCase();
            const label = color.hex.toLowerCase();

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                className="group relative flex flex-col items-center justify-end px-4 pb-10 pt-16 outline-none transition-transform hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900/70"
                style={{ backgroundColor: color.hex }}
                onClick={() => handleCopy(color.hex)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCopy(color.hex);
                  }
                }}
              >
                <div className="absolute inset-y-10 right-5 hidden items-center sm:flex">
                  <div className="flex flex-col gap-2 rounded-full bg-black/20 px-2 py-3 backdrop-blur-sm opacity-0 translate-x-2 transition group-hover:opacity-100 group-hover:translate-x-0">
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs bg-white/10 hover:bg-white/25"
                      onClick={(event) => {
                        event.stopPropagation();
                        openContrastChecker(color.hex);
                      }}
                    >
                      ◐
                    </button>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs bg-white/10 hover:bg-white/25"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleFavorite(index);
                      }}
                    >
                      {color.favorite ? "♥" : "♡"}
                    </button>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs bg-white/10 hover:bg-white/25"
                      onClick={(event) => {
                        event.stopPropagation();
                        shuffleSingle(index);
                      }}
                    >
                      ⟳
                    </button>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs bg-white/10 hover:bg-white/25"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCopy(color.hex);
                      }}
                    >
                      ⧉
                    </button>
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs bg-white/10 hover:bg-white/25"
                      onClick={(event) => {
                        event.stopPropagation();
                        toggleLock(index);
                      }}
                    >
                      {color.locked ? "🔒" : "🔓"}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1 text-center">
                  <span
                    className={`text-2xl sm:text-3xl font-semibold tracking-tight ${textClass}`}
                  >
                    {label}
                  </span>
                  <span
                    className={`text-[11px] leading-none opacity-80 ${textClass}`}
                  >
                    {isCopied ? "Copied" : "Tap to copy"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ColorPaletteGenerator;
