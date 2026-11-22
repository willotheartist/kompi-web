import QRCode from "qrcode";
import { normalizeKRStyle } from "./kr-design";

const xml = (v: string) => v.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]!));
const n = (v: number) => Number(v.toFixed(3));
function roundedPath(x: number, y: number, w: number, h: number, r: number[]) {
  const [a,b,c,d] = r;
  return `M${n(x+a)} ${n(y)}H${n(x+w-b)}Q${n(x+w)} ${n(y)} ${n(x+w)} ${n(y+b)}V${n(y+h-c)}Q${n(x+w)} ${n(y+h)} ${n(x+w-c)} ${n(y+h)}H${n(x+d)}Q${n(x)} ${n(y+h)} ${n(x)} ${n(y+h-d)}V${n(y+a)}Q${n(x)} ${n(y)} ${n(x+a)} ${n(y)}Z`;
}

/** Shared vector renderer: preview, saved thumbnails, SVG and PNG use the same geometry. */
export function renderKRSvg(value: string, rawStyle: unknown, width?: number): string {
  const s = normalizeKRStyle(rawStyle);
  const logo = s.logoEnabled && s.logoUrl;
  const qr = QRCode.create(value || "https://kompi.app", { errorCorrectionLevel: logo ? "H" : s.ecLevel });
  const count: number = qr.modules.size;
  const margin = Math.max(s.frameVariant === "none" ? 4 : 6, s.margin); // Quiet zone is in modules, never screen pixels.
  const frame = s.frameVariant !== "none";
  const label = ["label-bottom", "label-top", "ticket"].includes(s.frameVariant);
  const pad = frame ? 1.5 : 0;
  const base = count + margin * 2;
  const extent = base + pad * 2;
  const labelHeight = label ? 6 : 0;
  const height = extent + labelHeight;
  const top = s.frameVariant === "label-top" ? labelHeight : 0;
  const ox = pad + margin, oy = pad + margin + top;
  const background = s.bg === "transparent" ? "none" : s.bg;
  const shapes: string[] = [];
  const isEye = (x: number,y: number) => (x < 7 && y < 7) || (x >= count-7 && y < 7) || (x < 7 && y >= count-7);
  const dark = (x: number,y: number) => x >= 0 && y >= 0 && x < count && y < count && qr.modules.get(y,x);
  for (let y=0;y<count;y++) for (let x=0;x<count;x++) {
    if (!dark(x,y) || isEye(x,y)) continue;
    const px=ox+x, py=oy+y;
    // Keep timing/alignment/format modules intact; style only data modules.
    const reserved = qr.modules.isReserved(y,x);
    if (reserved || s.dotsType === "square") shapes.push(`<rect x="${px}" y="${py}" width="1" height="1"/>`);
    else if (s.dotsType === "dots") shapes.push(`<circle cx="${px+.5}" cy="${py+.5}" r=".5"/>`);
    else if (s.dotsType === "rounded") shapes.push(`<rect x="${px}" y="${py}" width="1" height="1" rx=".27"/>`);
    else {
      let radii = [.48,.48,.48,.48];
      if (s.dotsType === "extra-rounded") radii = [!dark(x-1,y)&&!dark(x,y-1),!dark(x+1,y)&&!dark(x,y-1),!dark(x+1,y)&&!dark(x,y+1),!dark(x-1,y)&&!dark(x,y+1)].map(v=>v ? .5 : 0);
      if (s.dotsType === "classy") radii=[.48,0,.48,0];
      if (s.dotsType === "classy-rounded") radii=[.5,.16,.5,.16];
      shapes.push(`<path d="${roundedPath(px,py,1,1,radii)}"/>`);
    }
  }
  const eyeShapes: string[]=[];
  for (const [x,y] of [[0,0],[count-7,0],[0,count-7]]) {
    const px=ox+x,py=oy+y;
    const r=s.cornersSquareType === "dot" ? 3.5 : s.cornersSquareType === "extra-rounded" ? 2.5 : 0;
    const inner = Math.max(0,r-1);
    eyeShapes.push(`<path fill-rule="evenodd" d="${roundedPath(px,py,7,7,[r,r,r,r])}${roundedPath(px+1,py+1,5,5,[inner,inner,inner,inner])}"/>`);
    // Optical sizing preserves a readable finder ratio when mixing square and round eyes.
    const coreSize=s.cornersSquareType === "square" && s.cornersDotType === "dot" ? 3.6 : s.cornersSquareType === "dot" && s.cornersDotType === "square" ? 2.8 : 3;
    const coreOffset=(7-coreSize)/2;
    const dot=s.cornersDotType === "dot" ? coreSize/2 : s.cornersDotType === "rounded" ? .8 : 0;
    eyeShapes.push(`<rect x="${n(px+coreOffset)}" y="${n(py+coreOffset)}" width="${coreSize}" height="${coreSize}" rx="${dot}"/>`);
  }
  const frameBackground = frame ? `<rect x="0" y="0" width="${extent}" height="${height}" rx="${s.frameVariant === "ticket" ? 1 : 2.5}" fill="${s.frameColor}"/><rect x="${pad}" y="${pad+top}" width="${base}" height="${base}" rx="1.2" fill="${s.bg === "transparent" ? "#FFFFFF" : s.bg}"/>` : "";
  const labelY=s.frameVariant === "label-top" ? 4.3 : extent+3;
  const caption=label ? `<text x="${extent/2}" y="${labelY}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="600" font-size="${Math.min(2.65, (extent-5)/Math.max(1,s.frameLabel.length)*1.5)}" letter-spacing=".15" fill="#FFFFFF">${xml(s.frameLabel)}</text>` : "";
  const logoSide=count*s.logoSize, logoX=ox+(count-logoSide)/2,logoY=oy+(count-logoSide)/2;
  const logoMarkup=logo ? `${s.logoBgTransparent ? `<rect x="${n(logoX-.65)}" y="${n(logoY-.65)}" width="${n(logoSide+1.3)}" height="${n(logoSide+1.3)}" rx=".7" fill="${s.bg === "transparent" ? "#FFFFFF" : s.bg}"/>` : ""}<image href="${xml(logo)}" x="${n(logoX)}" y="${n(logoY)}" width="${n(logoSide)}" height="${n(logoSide)}" preserveAspectRatio="xMidYMid meet"/>` : "";
  const outputWidth=width ?? s.size;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${outputWidth}" height="${Math.round(outputWidth*height/extent)}" viewBox="0 0 ${extent} ${height}" role="img" aria-label="QR code"><rect width="${extent}" height="${height}" fill="${background}"/>${frameBackground}<g fill="${s.fg}">${shapes.join("")}</g><g fill="${s.eyeColor}">${eyeShapes.join("")}</g>${logoMarkup}${caption}</svg>`;
}
