"use client";

import * as React from "react";
import { useMemo, useState } from "react";

type Variant = "public" | "dashboard";

interface PasswordGeneratorProps {
  variant?: Variant;
}

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{};:,.<>?/|";

function computeStrengthScore(length: number, pools: number): number {
  let score = 0;
  if (length >= 8) score++;
  if (length >= 12) score++;
  if (length >= 20) score++;
  if (pools >= 3) score++;
  if (pools === 4 && length >= 24) score++;
  return Math.min(score, 4);
}

function strengthLabel(score: number): string {
  return ["Weak", "Weak", "Fair", "Strong", "Very strong"][score];
}

function strengthColor(score: number): string {
  return ["#EF4444", "#EF4444", "#F59E0B", "#10B981", "#059669"][score];
}

function buildCharacterSet(
  includeLowercase: boolean,
  includeUppercase: boolean,
  includeNumbers: boolean,
  includeSymbols: boolean
): string {
  let chars = "";
  if (includeLowercase) chars += LOWERCASE;
  if (includeUppercase) chars += UPPERCASE;
  if (includeNumbers) chars += NUMBERS;
  if (includeSymbols) chars += SYMBOLS;
  return chars;
}

function generatePassword(length: number, charset: string): string {
  let result = "";
  const array = new Uint32Array(length);

  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += charset[array[i] % charset.length];
    }
    return result;
  }

  for (let i = 0; i < length; i++) {
    result += charset[Math.floor(Math.random() * charset.length)];
  }
  return result;
}

export default function PasswordGenerator({
  variant = "public",
}: PasswordGeneratorProps) {
  const [length, setLength] = useState(16);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const [copied, setCopied] = useState(false);
  const [seed, setSeed] = useState(0);

  const poolsCount =
    (includeLowercase ? 1 : 0) +
    (includeUppercase ? 1 : 0) +
    (includeNumbers ? 1 : 0) +
    (includeSymbols ? 1 : 0);

  const strength = computeStrengthScore(length, poolsCount);
  const strengthText = strengthLabel(strength);
  const strengthWidth = `${(strength + 1) * 20}%`;
  const strengthBg = strengthColor(strength);

  const charset = useMemo(
    () =>
      buildCharacterSet(
        includeLowercase,
        includeUppercase,
        includeNumbers,
        includeSymbols
      ),
    [includeLowercase, includeUppercase, includeNumbers, includeSymbols]
  );

  const error = charset.length ? null : "Select at least one character type.";

  const password = useMemo(() => {
    if (!charset.length) return "";
    return generatePassword(length, charset);
  }, [length, charset, seed]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  const characterOptions = [
    { label: "Uppercase", state: includeUppercase, set: setIncludeUppercase },
    { label: "Lowercase", state: includeLowercase, set: setIncludeLowercase },
    { label: "Numbers", state: includeNumbers, set: setIncludeNumbers },
    { label: "Symbols", state: includeSymbols, set: setIncludeSymbols },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {variant === "public" && (
        <div className="mb-6 text-center space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Password generator
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a strong, secure password instantly.
          </p>
        </div>
      )}

      <div className="rounded-[24px] border border-[#E5E5E0] bg-white p-6 shadow-sm space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-2xl border px-4 py-3 bg-[#F9FAFB]">
            <input
              value={password}
              readOnly
              className="flex-1 bg-transparent font-mono text-lg outline-none"
            />

            <button
              onClick={() => setSeed((s) => s + 1)}
              className="text-sm px-3 py-1.5 rounded-xl bg-white border hover:bg-[#F3F4F6]"
              aria-label="Generate a new password"
            >
              ↻
            </button>

            <button
              onClick={handleCopy}
              className="text-sm px-4 py-1.5 rounded-xl bg-black text-white hover:bg-black/90"
              disabled={!password}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="space-y-1">
            <div className="w-full h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden">
              <div
                className="h-full transition-all rounded-full"
                style={{ width: strengthWidth, backgroundColor: strengthBg }}
              />
            </div>

            <div className="text-xs flex justify-between text-muted-foreground">
              <span>Strength</span>
              <span>{strengthText}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#F8FDF8] border p-4 space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Password Length</span>
              <span>{length}</span>
            </div>

            <input
              type="range"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))}
              className="w-full accent-[#4F46E5]"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Characters used</p>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {characterOptions.map((opt) => (
                <label
                  key={opt.label}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={opt.state}
                    onChange={(e) => opt.set(e.target.checked)}
                    className="h-4 w-4 accent-[#4F46E5]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
