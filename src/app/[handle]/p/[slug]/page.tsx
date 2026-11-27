import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROFILE_URL } from "@/lib/urls";
import { productLookFromCard } from "@/lib/store-look";
import { ProductView } from "@/components/store/product-view";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ handle: string; slug: string }> };

const load = cache(async (handle: string, slug: string) => {
  const card = await prisma.kCard.findUnique({ where: { slug: handle, user: { bannedAt: null } }, select: { isPublic: true, data: true, workspaceId: true } });
  if (!card?.isPublic || !card.workspaceId) return null;
  const product = await prisma.product.findFirst({ where: { workspaceId: card.workspaceId, slug, status: "PUBLISHED" } });
  if (!product) return null;
  return { card, product };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle, slug } = await params;
  const found = await load(handle, slug);
  if (!found) return { title: "Not found", robots: { index: false } };
  const { product } = found;
  const url = `${PUBLIC_PROFILE_URL}/${handle}/p/${product.slug}`;
  return {
    title: product.title,
    description: product.subtitle || product.description?.slice(0, 160) || undefined,
    alternates: { canonical: url },
    openGraph: { title: product.title, description: product.subtitle ?? undefined, url, ...(product.coverImage?.startsWith("https://") ? { images: [product.coverImage] } : {}) },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle, slug } = await params;
  const found = await load(handle, slug);
  if (!found) notFound();
  const { card, product } = found;
  const data = (card.data ?? {}) as { title?: string; avatarDataUrl?: string | null; theme?: unknown };
  await prisma.product.update({ where: { id: product.id }, data: { views: { increment: 1 } } }).catch(() => {});
  return (
    <main className="min-h-dvh">
      <ProductView
        className="min-h-dvh"
        look={productLookFromCard(data.theme)}
        seller={{ name: data.title || handle, avatar: data.avatarDataUrl ?? null, handle }}
        product={{
          id: product.id,
          slug: product.slug,
          type: product.type,
          title: product.title,
          subtitle: product.subtitle,
          description: product.description,
          coverImage: product.coverImage,
          priceCents: product.priceCents,
          currency: product.currency,
          payWhatYouWant: product.payWhatYouWant,
          minPriceCents: product.minPriceCents,
          buttonLabel: product.buttonLabel,
          durationMin: product.durationMin,
        }}
      />
    </main>
  );
}
