import sharp from "sharp";
import { MAX_KR_LOGO_DATA_URL, MAX_KR_LOGO_EDGE } from "./kr-logos";

/** Keep print detail, strip metadata and never enlarge a low-resolution original. */
export async function prepareKRLogo(input: Buffer) {
  const image = sharp(input, { limitInputPixels: 20_000_000 });
  const metadata = await image.metadata();
  if (!metadata.format || !["png", "jpeg", "webp"].includes(metadata.format)) {
    throw new Error("Use a PNG, JPG or WebP logo.");
  }
  const bytes = await image.rotate().resize(MAX_KR_LOGO_EDGE, MAX_KR_LOGO_EDGE, {
    fit: "inside", withoutEnlargement: true,
  }).png().toBuffer();
  const dataUrl = `data:image/png;base64,${bytes.toString("base64")}`;
  if (dataUrl.length > MAX_KR_LOGO_DATA_URL) throw new Error("Try a simpler or smaller logo.");
  return { bytes, dataUrl };
}
