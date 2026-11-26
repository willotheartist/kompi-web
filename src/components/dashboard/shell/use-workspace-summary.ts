"use client";

import { useEffect, useState } from "react";

export type WorkspaceSummary = {
  workspaceId?: string;
  plan?: string | null;
  planName: string;
  limits: { links: number; krCodes: number; kCards: number };
  usage?: { links: number; krCodes: number; kCards: number };
};

// One request shared by every consumer (sidebar meter, account menu, palette).
let cache: WorkspaceSummary | null = null;
let inflight: Promise<WorkspaceSummary | null> | null = null;
let fetchedAt = 0;
const listeners = new Set<(s: WorkspaceSummary | null) => void>();
const STALE_MS = 30_000;

function load(force = false) {
  if (!force && inflight) return inflight;
  if (!force && cache && Date.now() - fetchedAt < STALE_MS) return Promise.resolve(cache);
  inflight = fetch("/api/account/summary", { cache: "no-store" })
    .then((r) => (r.ok ? (r.json() as Promise<WorkspaceSummary>) : null))
    .catch(() => null)
    .then((value) => {
      if (value) {
        cache = value;
        fetchedAt = Date.now();
      }
      listeners.forEach((fn) => fn(cache));
      inflight = null;
      return cache;
    });
  return inflight;
}

export function refreshWorkspaceSummary() {
  return load(true);
}

export function useWorkspaceSummary(enabled = true) {
  const [summary, setSummary] = useState<WorkspaceSummary | null>(cache);
  useEffect(() => {
    if (!enabled) return;
    listeners.add(setSummary);
    void load();
    const onFocus = () => document.visibilityState === "visible" && void load();
    window.addEventListener("focus", onFocus);
    return () => {
      listeners.delete(setSummary);
      window.removeEventListener("focus", onFocus);
    };
  }, [enabled]);
  return summary;
}
