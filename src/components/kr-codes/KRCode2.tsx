"use client";
import { Suspense } from "react";
import QRStudio from "@/components/kr-codes/QRStudio";
export function KRCode2() { return <Suspense fallback={<p>Loading QR studio…</p>}><QRStudio /></Suspense>; }
