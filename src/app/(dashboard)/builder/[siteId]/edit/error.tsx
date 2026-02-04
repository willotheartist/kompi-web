// src/app/(dashboard)/builder/[siteId]/edit/error.tsx
"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 900 }}>Builder Editor Error</h1>
      <pre style={{ marginTop: 10, whiteSpace: "pre-wrap", opacity: 0.85 }}>{error.message}</pre>
    </div>
  );
}
