"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Variant = "public" | "dashboard";

interface PasswordGeneratorProps {
  variant?: Variant;
}

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?/|";

function computeStrengthScore(length: number, pools: number): number {
  // extremely simple heuristic: 0–4
  let score = 0;
  if (length >= 8) score += 1;
  if (length >= 12) score += 1;
  if (length >= 20) score += 1;
  if (pools >= 3) score += 1;
  if (pools === 4 && length >= 24) score += 1;
  return Math.min(score, 4);
}

function strengthLabel(score: number): string {
  switch (score) {
    case 0:
    case 1:
      return "Weak";
    case 2:
      return "Fair";
    case 3:
      return "Strong";
    case 4:
      return "Very strong";
    default:
      return "Weak";
  }
}

function strengthBarWidth(score: number): string {
  switch (score) {
    case 0:
    case 1:
      return "25%";
    case 2:
      return "50%";
    case 3:
      return "75%";
    case 4:
      return "100%";
    default:
      return "25%";
  }
}

export function PasswordGenerator({ variant = "public" }: PasswordGeneratorProps) {
  const [length, setLength] = useState(16);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const poolsCount =
    (includeLowercase ? 1 : 0) +
    (includeUppercase ? 1 : 0) +
    (includeNumbers ? 1 : 0) +
    (includeSymbols ? 1 : 0);

  const score = computeStrengthScore(length, poolsCount);
  const label = strengthLabel(score);
  const barWidth = strengthBarWidth(score);

  function buildCharacterSet(): string {
    let chars = "";
    if (includeLowercase) chars += LOWERCASE;
    if (includeUppercase) chars += UPPERCASE;
    if (includeNumbers) chars += NUMBERS;
    if (includeSymbols) chars += SYMBOLS;
    return chars;
  }

  function generate() {
    const charset = buildCharacterSet();
    if (!charset.length) {
      setError("Select at least one character type.");
      return;
    }
    setError(null);

    let result = "";
    const array = new Uint32Array(length);
    if (
      typeof window !== "undefined" &&
      window.crypto &&
      window.crypto.getRandomValues
    ) {
      window.crypto.getRandomValues(array);
      for (let i = 0; i < length; i++) {
        const index = array[i] % charset.length;
        result += charset[index];
      }
    } else {
      for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * charset.length);
        result += charset[index];
      }
    }
    setPassword(result);
    setCopied(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Failed to copy", e);
    }
  }

  // Auto-generate on mount and whenever options change
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols]);

  const showHeader = variant === "public";

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showHeader && (
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Generate a secure, random password
          </h1>
          <p className="text-sm text-muted-foreground">
            Use the Kompi password generator to instantly create strong, unique passwords.
          </p>
        </div>
      )}

      <div className="rounded-2xl border bg-card shadow-sm p-4 sm:p-6 space-y-4">
        {/* Output row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Input
              aria-label="Generated password"
              value={password}
              readOnly
              className="font-mono text-base sm:text-lg"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              onClick={handleCopy}
              disabled={!password}
              className="shrink-0"
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Strength bar */}
        <div className="space-y-1">
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: barWidth }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Password strength</span>
            <span className="font-medium">{label}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 space-y-4 rounded-xl bg-muted/40 p-4">
          {/* Length slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Password length</span>
              <span className="tabular-nums text-muted-foreground">
                {length} characters
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={8}
                max={64}
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
                className="flex-1 accent-foreground"
              />
            </div>
          </div>

          {/* Character set checkboxes */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Characters used</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                />
                <span>Uppercase</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                />
                <span>Lowercase</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                />
                <span>Numbers</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                <span>Symbols</span>
              </label>
            </div>
          </div>

          {error && (
            <p className="text-xs text-destructive mt-2">
              {error}
            </p>
          )}
        </div>

        {variant === "public" && (
          <p className="mt-3 text-[11px] leading-snug text-muted-foreground">
            Tip: Use a different password for every site you sign in to. Kompi helps you
            create secure links, QR codes, and experiences that are safer to share.
          </p>
        )}
      </div>
    </div>
  );
}

export default PasswordGenerator;
