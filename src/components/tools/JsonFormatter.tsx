"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

type JsonFormatterVariant = "public" | "dashboard";

interface JsonFormatterProps {
  variant?: JsonFormatterVariant;
}

type FormatMode = "pretty" | "minified";

function safeParseJson(input: string): { ok: boolean; value?: unknown; error?: string } {
  try {
    const value = JSON.parse(input);
    return { ok: true, value };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid JSON. Could not parse input.";
    return { ok: false, error: message };
  }
}

export function JsonFormatter({ variant = "public" }: JsonFormatterProps) {
  const [raw, setRaw] = useState<string>("");
  const [mode, setMode] = useState<FormatMode>("pretty");
  const [indent, setIndent] = useState<number>(2);
  const [output, setOutput] = useState<string>("");
  const [lastError, setLastError] = useState<string | null>(null);
  const [copied, setCopied] = useState<"raw" | "output" | null>(null);

  const hasOutput = output.trim().length > 0;
  const hasInput = raw.trim().length > 0;

  const parsedStatus = useMemo(() => {
    if (!hasInput) return { state: "idle" as const };
    const result = safeParseJson(raw);
    if (!result.ok) {
      return { state: "error" as const, message: result.error };
    }
    return { state: "valid" as const };
  }, [raw, hasInput]);

  function handleFormat() {
    if (!hasInput) {
      toast("Paste some JSON first", {
        description: "Drop in a payload, response body, or config snippet.",
      });
      return;
    }

    const result = safeParseJson(raw);
    if (!result.ok) {
      const message = result.error ?? "Invalid JSON";
      setLastError(message);
      toast.error("Invalid JSON", {
        description: message,
      });
      return;
    }

    setLastError(null);
    const formatted =
      mode === "pretty"
        ? JSON.stringify(result.value, null, indent)
        : JSON.stringify(result.value);
    setOutput(formatted);
  }

  function handleCopy(which: "raw" | "output") {
    const text = which === "raw" ? raw : output;
    if (!text.trim()) return;

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {
        // ignore
      });
    }
    setCopied(which);
    setTimeout(() => {
      setCopied((current) => (current === which ? null : current));
    }, 1500);
  }

  const wrapperPadding =
    variant === "dashboard" ? "p-5 sm:p-6 lg:p-7" : "p-5 sm:p-6 lg:p-8";

  return (
    <div
      className={[
        "rounded-[32px] border border-[#E5E5E0] bg-[#FBFBF8]",
        "flex flex-col gap-6 sm:gap-7 lg:gap-8",
        wrapperPadding,
      ].join(" ")}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold tracking-[0.26em] text-[#7C7C72] uppercase">
            JSON TOOL
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-[#111111] sm:text-2xl">
            Clean up payloads without leaving Kompi.
          </h2>
          <p className="max-w-md text-xs text-[#6B6B6B] sm:text-sm">
            Paste API responses, webhook payloads, or config files and format, validate,
            and copy them in one place.
          </p>
        </div>

        <div className="flex gap-2 rounded-full bg-[#F0EFE8] p-1 text-[11px]">
          <button
            type="button"
            onClick={() => setMode("pretty")}
            className={[
              "rounded-full px-3 py-1 transition",
              mode === "pretty"
                ? "bg-[#111111] text-[#F7F7F3]"
                : "text-[#555555]",
            ].join(" ")}
          >
            Pretty
          </button>
          <button
            type="button"
            onClick={() => setMode("minified")}
            className={[
              "rounded-full px-3 py-1 transition",
              mode === "minified"
                ? "bg-[#111111] text-[#F7F7F3]"
                : "text-[#555555]",
            ].join(" ")}
          >
            Minify
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch">
        {/* LEFT – input */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-[#6B6B6B]">
              Raw JSON
            </p>
            <button
              type="button"
              onClick={() => handleCopy("raw")}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#7A7A72] hover:text-[#111111]"
            >
              {copied === "raw" ? "COPIED" : "COPY INPUT"}
            </button>
          </div>

          <div className="relative flex-1">
            <Textarea
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              placeholder='Paste JSON here, e.g. {"name": "Kompi", "tools": 3}'
              className="min-h-[220px] w-full resize-vertical rounded-2xl border border-[#E3E1DA] bg-white px-3 py-3 font-mono text-[12px] leading-relaxed text-[#111827] shadow-[0_0_0_1px_rgba(15,23,42,0.02)]"
            />
            <div className="pointer-events-none absolute inset-x-3 bottom-2 flex justify-between text-[10px] text-[#A3A3A0]">
              <span>
                {raw.trim().length
                  ? `${raw.length.toLocaleString()} characters`
                  : "Ready for any JSON payload"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <p className="text-xs text-[#6B6B6B]">Indentation</p>
              <div className="flex items-center gap-2 rounded-full bg-[#E9E7DF] px-3 py-1 text-[11px]">
                {[2, 4].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setIndent(n)}
                    className={[
                      "h-7 min-w-[36px] rounded-full px-3 text-center font-medium transition",
                      indent === n
                        ? "bg-[#111111] text-[#F7F7F3]"
                        : "text-[#555555]",
                    ].join(" ")}
                  >
                    {n} spaces
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {parsedStatus.state === "valid" && (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#DCFCE7] px-3 py-1 text-[11px] font-medium text-[#166534]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                  JSON valid
                </span>
              )}
              {parsedStatus.state === "error" && (
                <span className="inline-flex max-w-xs items-center gap-2 rounded-full bg-[#FEF2F2] px-3 py-1 text-[11px] text-[#991B1B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
                  Invalid JSON
                </span>
              )}
              <Button
                type="button"
                size="sm"
                className="rounded-full bg-[#111111] px-5 text-xs font-medium text-[#F7F7F3] hover:bg-black"
                onClick={handleFormat}
              >
                {hasOutput ? "Re-format JSON" : "Format JSON"}
              </Button>
            </div>
          </div>

          {lastError && (
            <div className="rounded-2xl border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[11px] text-[#7F1D1D]">
              {lastError}
            </div>
          )}
        </div>

        {/* RIGHT – output */}
        <div className="flex min-w-0 flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-[#6B6B6B]">
              {mode === "pretty" ? "Formatted JSON" : "Minified JSON"}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopy("output")}
                className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#7A7A72] hover:text-[#111111]"
              >
                {copied === "output" ? "COPIED" : "COPY OUTPUT"}
              </button>
            </div>
          </div>

          <div className="relative flex-1 rounded-2xl border border-[#DFDDD5] bg-[#111111]">
            <div className="absolute inset-0 flex">
              <div className="hidden w-10 shrink-0 border-r border-[#1F2937] bg-[#020617] py-3 pl-2 pr-1 text-right text-[10px] text-[#6B7280] sm:block">
                {hasOutput &&
                  output
                    .split("\n")
                    .map((_, idx) => (
                      <div key={idx} className="leading-5">
                        {idx + 1}
                      </div>
                    ))}
              </div>
              <pre className="min-h-[220px] flex-1 overflow-auto px-3 py-3 font-mono text-[11px] leading-5 text-[#E5E7EB]">
                {hasOutput
                  ? output
                  : "// Output will appear here once your JSON is valid and formatted."}
              </pre>
            </div>
          </div>

          <p className="text-[11px] text-[#8B8B80]">
            Formatting runs in your browser. Nothing is sent to Kompi servers.
          </p>
        </div>
      </div>
    </div>
  );
}

export default JsonFormatter;
