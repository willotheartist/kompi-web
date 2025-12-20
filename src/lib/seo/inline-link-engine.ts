// src/lib/seo/inline-link-engine.ts
import staticPages from "./static-pages.json";

function maxLinksForText(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.min(12, Math.floor(words / 260)));
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Simple heuristic: avoid linking inside an HTML tag
function isInsideHtmlTag(full: string, index: number) {
  const before = full.slice(0, index);
  const lastLt = before.lastIndexOf("<");
  const lastGt = before.lastIndexOf(">");
  return lastLt > lastGt;
}

export function linkTextSafely(text: string, currentUrl: string): string {
  if (!text) return text;

  const pages = staticPages.filter((p) => p.url !== currentUrl);

  const keywordMap: { keyword: string; url: string }[] = [];

  for (const p of pages) {
    for (const kw of p.keywords) {
      const keyword = (kw || "").trim();
      // Skip ultra-short keywords; they cause garbage linking
      if (keyword.length < 4) continue;
      keywordMap.push({ keyword, url: p.url });
    }
  }

  // Sort by longest keyword first (avoids partial matching issues)
  keywordMap.sort((a, b) => b.keyword.length - a.keyword.length);

  let linked = text;
  const linkedSet = new Set<string>();
  let totalLinks = 0;
  const maxLinks = maxLinksForText(text);

  for (const { keyword, url } of keywordMap) {
    if (totalLinks >= maxLinks) break;

    const key = keyword.toLowerCase();
    if (linkedSet.has(key)) continue;

    const safeKw = escapeRegex(keyword);
    const regex = new RegExp(`\\b(${safeKw})\\b`, "i");

    const match = linked.match(regex);
    if (!match || match.index === undefined) continue;

    if (isInsideHtmlTag(linked, match.index)) continue;

    linked = linked.replace(regex, (m) => {
      linkedSet.add(key);
      totalLinks += 1;
      return `<a href="${url}" class="kompi-inline-link">${m}</a>`;
    });
  }

  return linked;
}
