import rawPages from "./static-pages.json";

export type StaticPage = {
  url: string;
  title: string;
  keywords: string[];
  topic?: string;
};

const pages = rawPages as StaticPage[];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Turn matching keyword phrases in plain text into internal <a> links.
 * - Links only to other pages (never the current one)
 * - At most one anchor per target URL
 */
export function autoLinkText(text: string, currentUrl: string): string {
  if (!text) return text;

  let result = text;
  const linkedUrls = new Set<string>();

  for (const page of pages) {
    if (page.url === currentUrl) continue;
    if (linkedUrls.has(page.url)) continue;

    for (const kw of page.keywords) {
      if (!kw.trim()) continue;

      const pattern = new RegExp(`\\b(${escapeRegExp(kw)})\\b`, "i");

      if (pattern.test(result)) {
        result = result.replace(
          pattern,
          `<a href="${page.url}" class="text-[#006B81] underline decoration-[#A3CF3D] decoration-2 underline-offset-4">$1</a>`
        );
        linkedUrls.add(page.url);
        break;
      }
    }
  }

  return result;
}
