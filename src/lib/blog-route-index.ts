import fs from "fs";
import path from "path";

export type BlogRoutePost = {
  slug: string;
  title: string;
  description: string;
  href: string;
  cover: string;
};

const BLOG_DIR = path.join(process.cwd(), "src/app/blog");

function extractStringField(file: string, field: "title" | "description"): string | null {
  const re = new RegExp(String.raw`\\b\\s*:\\s*(["\x27])([^\\n\\r]*?)\\1`, "m");
  const m = file.match(re);
  if (!m) return null;
  return m[2].trim();
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function stableCover(slug: string) {
  const covers = [
    "/solutions/solutions19.png",
    "/solutions/solutions20.png",
    "/solutions/solutions21.png",
    "/solutions/solutions22.png",
    "/solutions/solutions23.png",
    "/solutions/solutions24.png",
    "/solutions/solutions25.png",
    "/solutions/solutions26.png",
  ];
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return covers[h % covers.length];
}

export function getBlogRoutesIndex(): BlogRoutePost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const entries = fs.readdirSync(BLOG_DIR, { withFileTypes: true });

  const slugs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => name !== "page.tsx");

  const posts = slugs
    .map((slug) => {
      const pagePath = path.join(BLOG_DIR, slug, "page.tsx");
      if (!fs.existsSync(pagePath)) return null;

      const src = fs.readFileSync(pagePath, "utf8");

      const title = extractStringField(src, "title") ?? titleFromSlug(slug);
      const description = extractStringField(src, "description") ?? "";

      return {
        slug,
        title,
        description,
        href: `/blog/${slug}`,
        cover: stableCover(slug),
      } satisfies BlogRoutePost;
    })
    .filter(Boolean) as BlogRoutePost[];

  posts.sort((a, b) => a.slug.localeCompare(b.slug));
  return posts;
}
