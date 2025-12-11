import staticPages from "./static-pages.json";

// Words will be linked only once per page
export function linkTextSafely(text: string, currentUrl: string): string {
  if (!text) return text;

  const pages = staticPages.filter(p => p.url !== currentUrl);

  // Sort by longest keyword first (avoids partial matching issues)
  const keywordMap: { keyword: string; url: string }[] = [];

  for (const p of pages) {
    for (const kw of p.keywords) {
      keywordMap.push({ keyword: kw, url: p.url });
    }
  }

  keywordMap.sort((a, b) => b.keyword.length - a.keyword.length);

  let linked = text;
  const linkedSet = new Set(); // prevent multiple links of same keyword

  for (const { keyword, url } of keywordMap) {
    const safeKw = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(`\\b(${safeKw})\\b`, "i");

    if (linkedSet.has(keyword.toLowerCase())) continue;

    linked = linked.replace(regex, (match) => {
      linkedSet.add(keyword.toLowerCase());
      return `<a href="${url}" class="kompi-inline-link">${match}</a>`;
    });
  }

  return linked;
}
