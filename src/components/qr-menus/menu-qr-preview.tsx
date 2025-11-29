"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type MenuQrPreviewProps = {
  slug: string | null;
};

/**
 * Small QR preview card for a /m/{slug} public menu URL.
 * Uses the `qrcode` library to generate a PNG data URL client-side.
 */
export function MenuQrPreview({ slug }: MenuQrPreviewProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // If there's no slug or we're not in the browser, don't try to generate
    if (!slug || typeof window === "undefined") {
      return;
    }

    const url = `${window.location.origin}/m/${slug}`;
    let cancelled = false;

    QRCode.toDataURL(url, {
      margin: 1,
      width: 256,
    })
      .then((generated: string) => {
        if (!cancelled) {
          setDataUrl(generated);
        }
      })
      .catch((err: unknown) => {
        console.error("Failed to generate QR for menu", err);
        if (!cancelled) {
          setDataUrl(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) {
    return (
      <div
        className="rounded-2xl border px-4 py-4 text-[11px]"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-subtle)",
        }}
      >
        Set a public slug to generate a QR code for this menu.
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border px-4 py-4"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <p className="mb-2 text-xs font-medium" style={{ color: "var(--color-text)" }}>
        QR preview
      </p>
      <p className="mb-3 text-[11px]" style={{ color: "var(--color-subtle)" }}>
        This QR points to <span className="font-mono text-[10px]">/m/{slug}</span>. Scan it with
        your phone camera to preview the live menu.
      </p>
      <div className="flex items-center justify-center">
        {dataUrl ? (
          <img
            src={dataUrl}
            alt={`QR code for /m/${slug}`}
            className="h-40 w-40 rounded-xl bg-white p-2"
          />
        ) : (
          <div
            className="flex h-40 w-40 items-center justify-center rounded-xl text-[11px]"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-subtle)",
              backgroundColor: "var(--color-bg)",
            }}
          >
            Generating QR…
          </div>
        )}
      </div>
    </div>
  );
}
