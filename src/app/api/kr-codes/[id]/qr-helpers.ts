import { prisma } from "@/lib/prisma";
import { normalizeKRStyle } from "@/lib/kr-design";
import { renderKRSvg } from "@/lib/kr-render";
import fs from "node:fs/promises";
import path from "node:path";
import { requireUser } from "@/lib/auth";

export async function getKrCodeLinkAndUrl(id: string, _req: Request) {
  const krcode = await prisma.kRCode.findUnique({ where: { id } });
  if (!krcode) throw new Error("Not found");
  // Direct codes can contain network credentials; downloads require their owner.
  if (!krcode.shortCodeId) {
    const user = await requireUser();
    if (user.id !== krcode.userId) throw new Error("Not found");
  }
  const link = krcode.shortCodeId ? await prisma.link.findUnique({ where: { id: krcode.shortCodeId } }) : null;
  if (krcode.shortCodeId && !link) throw new Error("Linked code not found");
  // Keep the exact persisted short URL, including its original/custom domain.
  const qrUrl = krcode.destination;
  const style = normalizeKRStyle(krcode.style);
  if (style.logoUrl?.startsWith("/uploads/krcodes/")) {
    try {
      const bytes = await fs.readFile(path.join(process.cwd(), "public", style.logoUrl));
      const mime = /\.jpe?g$/i.test(style.logoUrl) ? "image/jpeg" : /\.webp$/i.test(style.logoUrl) ? "image/webp" : "image/png";
      style.logoUrl = `data:${mime};base64,${bytes.toString("base64")}`;
    } catch { style.logoUrl = null; }
  }
  return { krcode, link, qrUrl, style };
}

export async function savedKRSvg(id: string, req: Request, thumbnail = false) {
  const { qrUrl, style } = await getKrCodeLinkAndUrl(id, req);
  return renderKRSvg(qrUrl, style, thumbnail ? 256 : Math.max(512, style.size));
}
