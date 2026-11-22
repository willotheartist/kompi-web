export const DEFAULT_KR_EXPORT_WIDTH = 4096;
export const KR_EXPORT_WIDTHS = [1024, 2048, 4096, 8192] as const;
export const KR_EXPORT_DPI = 300;

/** Old saved preview sizes must not silently lower download quality. */
export function resolveKRExportWidth(requested?: string | number | null): number {
  const width = Number(requested);
  return KR_EXPORT_WIDTHS.some(size => size === width) ? width : DEFAULT_KR_EXPORT_WIDTH;
}

/** Set PNG print density without decoding, resampling or changing its alpha. */
export function withKRPrintDensity(png: Uint8Array): Uint8Array<ArrayBuffer> {
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  if (!signature.every((byte, i) => png[i] === byte)) throw new Error("Invalid PNG export.");
  const view = new DataView(png.buffer, png.byteOffset, png.byteLength);
  const chunks: Uint8Array[] = [png.subarray(0, 8)];
  const density = new Uint8Array(21);
  const densityView = new DataView(density.buffer);
  densityView.setUint32(0, 9);
  density.set([112, 72, 89, 115], 4); // pHYs
  const pixelsPerMetre = Math.round(KR_EXPORT_DPI / 0.0254);
  densityView.setUint32(8, pixelsPerMetre);
  densityView.setUint32(12, pixelsPerMetre);
  density[16] = 1;
  let crc = 0xffffffff;
  for (const byte of density.subarray(4, 17)) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  densityView.setUint32(17, (crc ^ 0xffffffff) >>> 0);
  let ended = false;
  for (let offset = 8; offset + 12 <= png.length;) {
    const length = view.getUint32(offset);
    const end = offset + length + 12;
    if (end > png.length) throw new Error("Incomplete PNG export.");
    const type = String.fromCharCode(...png.subarray(offset + 4, offset + 8));
    if (offset === 8 && type !== "IHDR") throw new Error("Invalid PNG header.");
    // A rendered canvas has no source-camera metadata to retain. Remove any
    // stale EXIF density too, since some print apps prefer it over pHYs.
    if (type !== "pHYs" && type !== "eXIf") chunks.push(png.subarray(offset, end));
    if (type === "IHDR") chunks.push(density);
    offset = end;
    if (type === "IEND") { ended = true; break; }
  }
  if (!ended) throw new Error("Incomplete PNG export.");
  const output = new Uint8Array(chunks.reduce((size, chunk) => size + chunk.length, 0));
  let offset = 0;
  for (const chunk of chunks) { output.set(chunk, offset); offset += chunk.length; }
  return output;
}
