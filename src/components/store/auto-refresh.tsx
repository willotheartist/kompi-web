"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Re-renders the page every few seconds while a payment settles. */
export function AutoRefresh({ every = 2500, max = 12 }: { every?: number; max?: number }) {
  const router = useRouter();
  useEffect(() => {
    let n = 0;
    const id = window.setInterval(() => {
      if (++n > max) return window.clearInterval(id);
      router.refresh();
    }, every);
    return () => window.clearInterval(id);
  }, [router, every, max]);
  return null;
}
