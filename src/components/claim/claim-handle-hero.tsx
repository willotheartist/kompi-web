// src/components/claim/claim-handle-hero.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "checking" | "available" | "taken" | "invalid" | "error";

export function ClaimHandleHero() {
  const router = useRouter();

  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const [claiming, setClaiming] = useState(false);

  const trimmed = handle.trim();

  const isValidHandle = (value: string) =>
    /^[a-zA-Z0-9._-]{3,24}$/.test(value);

  /**
   * Returns true if the handle is available, false if not / invalid / error.
   */
  async function checkAvailability(): Promise<boolean> {
    if (!trimmed) {
      setStatus("invalid");
      setMessage(
        "Handles must be 3–24 characters using letters, numbers, dots, dashes or underscores."
      );
      return false;
    }

    if (!isValidHandle(trimmed)) {
      setStatus("invalid");
      setMessage(
        "Handles must be 3–24 characters using letters, numbers, dots, dashes or underscores."
      );
      return false;
    }

    try {
      setChecking(true);
      setStatus("checking");
      setMessage(`Checking @${trimmed}…`);

      const res = await fetch(
        `/api/handles/check?handle=${encodeURIComponent(trimmed)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();

      if (data?.available) {
        setStatus("available");
        setMessage(
          `Nice — @${trimmed} is available. Claim it and make it yours.`
        );
        return true;
      } else {
        setStatus("taken");
        setMessage("This handle isn’t available. Try another one.");
        return false;
      }
    } catch (err) {
      console.error("handle check error", err);
      setStatus("error");
      setMessage("We couldn’t check that just now. Please try again.");
      return false;
    } finally {
      setChecking(false);
    }
  }

  async function onClaim() {
    // Ensure it’s valid + available before sending to signup
    const ok = await checkAvailability();
    if (!ok) return;

    try {
      setClaiming(true);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("kompi_pending_handle", trimmed);
      }

      router.push(`/signup?handle=${encodeURIComponent(trimmed)}`);
    } finally {
      setClaiming(false);
    }
  }

  const canClaim =
    !checking &&
    !claiming &&
    !!trimmed &&
    isValidHandle(trimmed) &&
    status !== "taken" &&
    status !== "error";

  return (
    <section
      className="claim-handle-hero min-h-screen w-full"
      style={{
        backgroundColor: "#111827", // big dark backdrop
        color: "#F9FAFB",
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col justify-center gap-10 px-6 py-16 lg:flex-row lg:items-center">
        {/* LEFT: copy + input */}
        <div className="max-w-xl">
          {/* Headline – mix Inter Tight + Instrument Serif word */}
          <div className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            <div>Claim your</div>
            <div>
              <span
                className="italic"
                style={{ fontFamily: '"Instrument Serif", serif' }}
              >
                Kompi
              </span>{" "}
              handle.
            </div>
          </div>

          <p className="mt-4 text-sm text-white/80 sm:text-base">
            Lock in your @handle so it’s yours across links, profiles and QR
            codes.
          </p>

          {/* Input + button row */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch">
            {/* Big rounded input with prefix */}
            <div className="relative flex-1">
              <div
                className="flex h-16 w-full items-center rounded-full px-6 text-lg sm:text-xl"
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#111827",
                }}
              >
                {/* Prefix – kompi.app/ in light lavender */}
                <span
                  className="pointer-events-none select-none"
                  style={{ color: "#A9B4FF" }}
                >
                  kompi.app/
                </span>

                <input
                  type="text"
                  value={handle}
                  onChange={(e) => {
                    const next = e.target.value.replace(/\s+/g, "");
                    setHandle(next);
                    if (status !== "idle") {
                      setStatus("idle");
                      setMessage(
                        "3–24 characters. Letters, numbers, dots, dashes and underscores only."
                      );
                    }
                  }}
                  className="ml-1 flex-1 border-none bg-transparent text-inherit outline-none placeholder:text-gray-400"
                  style={{ color: "#111827" }} // user text dark
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                />
              </div>

              {/* Status / helper text */}
              <p
                className="mt-2 text-xs sm:text-sm"
                style={{
                  color:
                    status === "taken" ||
                    status === "invalid" ||
                    status === "error"
                      ? "#F87171"
                      : "rgba(249,250,251,0.8)",
                }}
              >
                {message ??
                  "3–24 characters. Letters, numbers, dots, dashes and underscores only."}
              </p>
            </div>

            {/* Claim button */}
            <button
              type="button"
              onClick={onClaim}
              disabled={!canClaim}
              className="mt-3 inline-flex h-16 items-center justify-center rounded-full px-10 text-lg font-semibold sm:mt-0"
              style={{
                backgroundColor: canClaim ? "#D9F45B" : "#A3E07A",
                color: "#111827",
                opacity: canClaim ? 1 : 0.7,
              }}
            >
              {claiming || checking ? "Checking…" : "Claim"}
            </button>
          </div>
        </div>

        {/* RIGHT: visual cards – you’ll design this bit */}
        <div className="relative mt-10 h-64 w-full max-w-md lg:mt-0">
          {/* TODO: drop in your Kompi card imagery / animations */}
        </div>
      </div>
    </section>
  );
}

export default ClaimHandleHero;
