"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Thin ink bar along the top edge that starts the instant an internal link is
 * clicked and completes when the new route renders. Gives immediate feedback
 * while server components stream in.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const search = useSearchParams();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      setState("loading");
      if (timer.current) window.clearTimeout(timer.current);
      // Never leave the bar hanging (e.g. a navigation that was cancelled).
      timer.current = window.setTimeout(() => setState("idle"), 8000);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- completing the bar is a direct reaction to the route change.
    setState((s) => (s === "loading" ? "done" : s));
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 480);
  }, [pathname, search]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px]">
      <div
        className="h-full origin-left bg-[#151619]"
        style={{
          transform: state === "idle" ? "scaleX(0)" : state === "loading" ? "scaleX(0.72)" : "scaleX(1)",
          opacity: state === "loading" ? 1 : 0,
          transition:
            state === "loading"
              ? "transform 2.4s cubic-bezier(.08,.82,.17,1), opacity .1s"
              : state === "done"
                ? "transform .2s ease-out, opacity .25s ease .18s"
                : "none",
        }}
      />
    </div>
  );
}
