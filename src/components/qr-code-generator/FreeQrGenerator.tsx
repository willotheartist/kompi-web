"use client";
import { Suspense } from "react";
import QRStudio from "@/components/kr-codes/QRStudio";
export function FreeQrGenerator() { return <Suspense fallback={<p>Loading QR studio…</p>}><QRStudio /></Suspense>; }
