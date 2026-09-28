// src/lib/url-safety.ts
// Guards user-supplied destination URLs against Google Web Risk (the commercial
// Safe Browsing API) so Kompi short links can't be used to forward people to
// phishing/malware sites.
// Requires GOOGLE_SAFE_BROWSING_API_KEY; without it only the scheme check runs.

const WEB_RISK_ENDPOINT = "https://webrisk.googleapis.com/v1/uris:search";
const THREAT_TYPES = ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"];

const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map<string, { unsafe: boolean; expires: number }>();

// Free dynamic-DNS and tunnelling services. They're rarely used for legitimate
// short-link destinations and are a favourite for throwaway phishing pages.
const BLOCKED_HOST_SUFFIXES = [
  // afraid.org FreeDNS
  "twilightparadox.com",
  "mooo.com",
  "chickenkiller.com",
  "strangled.net",
  "crabdance.com",
  "jumpingcrab.com",
  "ignorelist.com",
  // other dynamic DNS
  "duckdns.org",
  "ddns.net",
  "hopto.org",
  "zapto.org",
  "sytes.net",
  "no-ip.org",
  "no-ip.biz",
  "dynu.net",
  // tunnels
  "ngrok.io",
  "ngrok.app",
  "ngrok-free.app",
  "ngrok-free.dev",
  "trycloudflare.com",
  "loca.lt",
  "serveo.net",
  "localhost.run",
];

function isBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  // Raw IPv4 / IPv6 destinations
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.startsWith("[")) return true;
  return BLOCKED_HOST_SUFFIXES.some((d) => host === d || host.endsWith(`.${d}`));
}

export type UrlSafetyResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unsafe" };

function parseHttpUrl(raw: string): URL | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

async function isFlaggedByWebRisk(url: string): Promise<boolean> {
  const key = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  if (!key) {
    console.warn("URL_SAFETY: GOOGLE_SAFE_BROWSING_API_KEY not set, skipping lookup");
    return false;
  }

  const cached = cache.get(url);
  if (cached && cached.expires > Date.now()) return cached.unsafe;

  try {
    const params = new URLSearchParams({ uri: url, key });
    for (const t of THREAT_TYPES) params.append("threatTypes", t);
    const res = await fetch(`${WEB_RISK_ENDPOINT}?${params}`, {
      signal: AbortSignal.timeout(2500),
    });

    if (!res.ok) {
      console.error("URL_SAFETY: lookup failed", res.status);
      return false;
    }

    const data = (await res.json()) as { threat?: { threatTypes?: string[] } };
    const unsafe = (data.threat?.threatTypes?.length ?? 0) > 0;
    cache.set(url, { unsafe, expires: Date.now() + CACHE_TTL_MS });
    return unsafe;
  } catch (error) {
    console.error("URL_SAFETY: lookup error", error);
    return false;
  }
}

export async function checkUrlSafety(raw: string): Promise<UrlSafetyResult> {
  const url = parseHttpUrl(raw);
  if (!url) return { ok: false, reason: "invalid" };
  if (isBlockedHost(url.hostname)) return { ok: false, reason: "unsafe" };
  if (await isFlaggedByWebRisk(url.toString())) {
    return { ok: false, reason: "unsafe" };
  }
  return { ok: true };
}
