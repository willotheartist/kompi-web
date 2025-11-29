// src/app/menu/[slug]/page.tsx
// Thin wrapper that reuses the public QR menu page at /m/[slug]

export const dynamic = "force-dynamic";

export { default } from "@/app/m/[slug]/page";
