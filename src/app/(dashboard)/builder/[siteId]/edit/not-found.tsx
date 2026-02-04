// src/app/(dashboard)/builder/[siteId]/edit/not-found.tsx
export default function NotFound() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 900 }}>Not found</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>Site not found or you don’t have access.</p>
    </div>
  );
}
