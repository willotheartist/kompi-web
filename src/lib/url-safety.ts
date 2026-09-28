// src/lib/url-safety.ts
// Guards user-supplied destination URLs against Google Safe Browsing so Kompi
// short links can't be used to forward people to phishing/malware sites.
// Requires GOOGLE_SAFE_BROWSING_API_KEY; without it only the scheme check runs.

const SAFE_BROWSING_ENDPOINT =
  "https://safebrowsing.googleapis.com/v4/threatMatches:find";

const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map<string, { unsafe: boolean; expires: number }>();

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

async function isFlaggedBySafeBrowsing(url: string): Promise<boolean> {
  const key = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
  if (!key) {
    console.warn("URL_SAFETY: GOOGLE_SAFE_BROWSING_API_KEY not set, skipping lookup");
    return false;
  }

  const cached = cache.get(url);
  if (cached && cached.expires > Date.now()) return cached.unsafe;

  try {
    const res = await fetch(`${SAFE_BROWSING_ENDPOINT}?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: { clientId: "kompi", clientVersion: "1.0" },
        threatInfo: {
          threatTypes: [
            "MALWARE",
            "SOCIAL_ENGINEERING",
            "UNWANTED_SOFTWARE",
            "POTENTIALLY_HARMFUL_APPLICATION",
          ],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: [{ url }],
        },
      }),
      signal: AbortSignal.timeout(2500),
    });

    if (!res.ok) {
      console.error("URL_SAFETY: lookup failed", res.status);
      return false;
    }

    const data = (await res.json()) as { matches?: unknown[] };
    const unsafe = Array.isArray(data.matches) && data.matches.length > 0;
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
  if (await isFlaggedBySafeBrowsing(url.toString())) {
    return { ok: false, reason: "unsafe" };
  }
  return { ok: true };
}
