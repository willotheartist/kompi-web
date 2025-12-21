// src/app/api/debug/headers/route.ts
import { NextResponse } from "next/server";

export const runtime = "edge"; // important: forces edge so we can see edge-enriched headers

export async function GET(req: Request) {
  const h = req.headers;

  const pick = (name: string) => h.get(name);

  const data = {
    // Vercel geo headers
    "x-vercel-ip-country": pick("x-vercel-ip-country"),
    "x-vercel-ip-country-region": pick("x-vercel-ip-country-region"),
    "x-vercel-ip-region": pick("x-vercel-ip-region"),
    "x-vercel-ip-city": pick("x-vercel-ip-city"),

    // Cloudflare geo (in case you’re behind CF at some point)
    "cf-ipcountry": pick("cf-ipcountry"),
    "cf-region": pick("cf-region"),
    "cf-ipcity": pick("cf-ipcity"),

    // IP-ish headers
    "x-forwarded-for": pick("x-forwarded-for"),
    "x-real-ip": pick("x-real-ip"),

    // What your middleware would set
    "x-edge-country": pick("x-edge-country"),
    "x-edge-region": pick("x-edge-region"),
    "x-edge-city": pick("x-edge-city"),
    "x-edge-ip": pick("x-edge-ip"),

    // quick sanity
    "user-agent": pick("user-agent"),
    referer: pick("referer"),
    host: pick("host"),
  };

  return NextResponse.json(data);
}
