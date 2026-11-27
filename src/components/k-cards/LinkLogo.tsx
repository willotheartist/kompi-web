"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { Link2 } from "lucide-react";
import { cn } from "@/lib/utils";

/** Hostname for a link as typed (with or without https://), or null while it isn't a real domain yet. */
export function linkHost(raw: string): string | null {
  const value = raw.trim();
  if (!value || /^(mailto|tel):/i.test(value)) return null;
  try {
    const host = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).hostname.replace(/^www\./, "");
    return /\.[a-z]{2,}$/i.test(host) ? host : null;
  } catch {
    return null;
  }
}

/**
 * The site's own logo (via its favicon) for a link, e.g. Dribbble or Behance.
 * Falls back to a link icon while the address is incomplete or the site has no icon.
 */
export function LinkLogo({ url, size = 40, className, muted }: { url: string; size?: number; className?: string; muted?: boolean }) {
  const host = linkHost(useDeferredValue(url));
  const [failedHost, setFailedHost] = useState<string | null>(null);
  const [loadedHost, setLoadedHost] = useState<string | null>(null);
  const img = useRef<HTMLImageElement>(null);
  const failed = host !== null && failedHost === host;

  // An image that errors before hydration never fires onError, so check once mounted.
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && host) {
      if (el.naturalWidth === 0) setFailedHost(host);
      else setLoadedHost(host);
    }
  }, [host]);

  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-[11px] border border-[#E9EBEE] bg-white transition-[opacity,filter] duration-200",
        muted && "opacity-50 grayscale",
        className,
      )}
      style={{ width: size, height: size }}
      title={host ?? undefined}
    >
      {host && !failed ? (
        <img
          key={host}
          ref={img}
          src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`}
          alt=""
          width={Math.round(size * 0.55)}
          height={Math.round(size * 0.55)}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setLoadedHost(host)}
          onError={() => setFailedHost(host)}
          className={cn("rounded-[4px] object-contain transition-[opacity,transform] duration-300", loadedHost === host ? "scale-100 opacity-100" : "scale-75 opacity-0")}
        />
      ) : (
        <Link2 className="text-[#A2A6AC]" style={{ width: size * 0.42, height: size * 0.42 }} />
      )}
    </span>
  );
}
