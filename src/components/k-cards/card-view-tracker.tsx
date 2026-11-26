"use client";
import { useEffect } from "react";
export function CardViewTracker({ slug }: { slug: string }) { useEffect(() => { void fetch("/api/k-cards/views", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug }), keepalive: true }).catch(() => {}); }, [slug]); return null; }
