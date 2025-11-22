import { prisma } from "@/lib/prisma";

export async function getKrCodeLinkAndUrl(id: string, req: Request) {
  // Look up the KR Code
  const krcode = await prisma.kRCode.findUnique({
    where: { id },
  });

  if (!krcode || !krcode.shortCodeId) {
    throw new Error("KR Code or short link not found");
  }

  // Look up the linked short URL
  const link = await prisma.link.findUnique({
    where: { id: krcode.shortCodeId },
  });

  if (!link || !link.code) {
    throw new Error("Linked short code not found");
  }

  // Determine app origin (use NEXT_PUBLIC_APP_URL if set, otherwise infer)
  const origin =
    process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;

  // ✅ This is the URL that will hit /r/[code] and create ClickEvent rows
  const qrUrl = `${origin}/r/${link.code}`;

  return { krcode, link, qrUrl };
}
