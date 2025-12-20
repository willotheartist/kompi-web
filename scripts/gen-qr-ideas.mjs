import fs from "node:fs";
import path from "node:path";

const outPath = path.join(process.cwd(), "src/content/pseo/datasets/qr-ideas.generated.json");

const industries = [
  "restaurants","cafes","bars","pubs","food trucks","bakeries","hotels","gyms","yoga studios","salons",
  "barbershops","spas","dentists","clinics","pharmacies","real estate","car dealerships","museums","galleries",
  "events","weddings","festivals","conferences","schools","universities","charities","churches","retail stores",
  "markets","bookshops","restaurants (fine dining)","takeaways","nightclubs","co-working spaces","agencies",
  "photographers","musicians","artists","creators","influencers","streamers","restaurants (fast casual)",
  "restaurants (pizza)","restaurants (sushi)","restaurants (vegan)","cafes (specialty coffee)","cafes (tea rooms)"
];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/\&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const pages = industries.map((ind) => {
  const industryLabel = ind.replace(/\s*\(.*?\)\s*/g, "").trim();
  const slug = `qr-code-ideas-for-${slugify(ind)}`;
  return {
    slug,
    cluster: "qr-codes",
    hub: "qr-codes",
    intent: "informational",
    primaryKeyword: `QR code ideas for ${industryLabel}`,
    secondaryKeywords: [
      `${industryLabel} QR code ideas`,
      `how to use QR codes for ${industryLabel}`
    ],
    entity: { type: "industry", value: industryLabel },
    kompiTools: ["/qr-menus", "/qr-code/dynamic", "/qr-code/with-logo", "/links/new"],
    index: true
  };
});

fs.writeFileSync(outPath, JSON.stringify(pages, null, 2));
console.log(`Wrote ${pages.length} pages -> ${outPath}`);
