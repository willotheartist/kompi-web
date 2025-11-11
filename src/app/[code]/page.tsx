import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

const RESERVED_PREFIXES = [
  "api",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "assets",
  "images"
];

type Props = {
  params: Promise<{ code: string }>;
};

export default async function ShortLinkPage(props: Props) {
  const { code } = await props.params;

  if (!code) {
    notFound();
  }

  if (RESERVED_PREFIXES.some((prefix) => code.startsWith(prefix))) {
    notFound();
  }

  const link = await prisma.link.findFirst({
    where: {
      code,
      isActive: true,
    },
  });

  if (!link) {
    notFound();
  }

  await prisma.link.update({
    where: { id: link.id },
    data: { clicks: { increment: 1 } },
  });

  redirect(link.targetUrl);
}
