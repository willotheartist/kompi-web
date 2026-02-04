// src/app/(dashboard)/preview/layout.tsx
import "../../globals.css";
import type { ReactNode } from "react";

export default function DraftPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        margin: 0,
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        background: "#fafafa",
        color: "#111",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
