import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PUBLIC_PROFILE_URL } from "@/lib/urls";
import { PRODUCT_TYPES, formatMoney, type ProductTypeId } from "@/lib/store";
import { productLookFromCard } from "@/lib/store-look";
import { cn } from "@/lib/utils";
import { ProductThumb } from "@/components/store/store-ui";

const TINT: Record<string, string> = { DOWNLOAD: "#EEF1FF", LEAD_MAGNET: "#E9F8EF", BOOKING: "#FFF3E2", PAID_LINK: "#F3EEFF", TIP: "#FFEEF1" };

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ handle: string }> };

const load = cache(async (handle: string) => {
  const card = await prisma.kCard.findUnique({ where: { slug: handle, user: { bannedAt: null } }, select: { isPublic: true, data: true, workspaceId: true } });
  if (!card?.isPublic || !card.workspaceId) return null;
  const products = await prisma.product.findMany({
    where: { workspaceId: card.workspaceId, status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: { id: true, slug: true, type: true, title: true, subtitle: true, coverImage: true, priceCents: true, currency: true, payWhatYouWant: true, durationMin: true },
  });
  return { card, products };
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const found = await load(handle);
  if (!found) return { title: "Not found", robots: { index: false } };
  const name = ((found.card.data ?? {}) as { title?: string }).title || handle;
  return { title: `Shop · ${name}`, alternates: { canonical: `${PUBLIC_PROFILE_URL}/${handle}/shop` } };
}

function price(p: { type: string; priceCents: number; currency: string; payWhatYouWant: boolean }) {
  if (p.type === "LEAD_MAGNET" || (!p.payWhatYouWant && p.priceCents === 0)) return "Free";
  return `${p.payWhatYouWant ? "From " : ""}${formatMoney(p.priceCents, p.currency)}`;
}

/** Every published product from a seller, in their Card's theme. */
export default async function ShopPage({ params }: Props) {
  const { handle } = await params;
  const found = await load(handle);
  if (!found) notFound();
  const data = (found.card.data ?? {}) as { title?: string; subtitle?: string; avatarDataUrl?: string | null; theme?: unknown };
  const look = productLookFromCard(data.theme);
  const name = data.title || handle;
  return (
    <main className={cn("min-h-dvh", look.bodyFont)} style={look.background}>
      <div className="mx-auto w-full max-w-[880px] px-5 pb-16 pt-6 sm:px-8">
        <Link href={`/${handle}`} className="mb-8 inline-flex h-11 items-center gap-2 rounded-full bg-white/90 pl-1.5 pr-4 text-[14px] font-medium text-[#151619]" style={{ fontFamily: "var(--font-primary), system-ui, sans-serif" }}>
          {data.avatarDataUrl ? <img src={data.avatarDataUrl} alt="" className="size-8 rounded-full object-cover" /> : <ArrowLeft size={16} className="ml-1.5" />}
          {name}
        </Link>
        <h1 className={cn("text-[34px] font-semibold leading-tight tracking-[-0.02em] sm:text-[42px]", look.titleFont)} style={{ color: look.titleColor }}>
          Shop
        </h1>
        <p className="mt-1.5 text-[16px]" style={{ color: look.textColor }}>
          {found.products.length} {found.products.length === 1 ? "product" : "products"} from {name}
        </p>

        {found.products.length === 0 ? (
          <p className="mt-10 rounded-[20px] bg-white/90 p-8 text-center text-[15px] text-[#696C72]">Nothing for sale right now. Check back soon.</p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2" style={{ fontFamily: "var(--font-primary), system-ui, sans-serif" }}>
            {found.products.map((p) => (
              <Link key={p.id} href={`/${handle}/p/${p.slug}`} className="group flex flex-col overflow-hidden rounded-[22px] border border-black/5 bg-white text-[#151619] transition-transform duration-200 hover:-translate-y-0.5">
                {p.coverImage ? (
                  <img src={p.coverImage} alt="" className="aspect-[16/10] w-full object-cover" />
                ) : (
                  <div className="grid aspect-[16/7] w-full place-items-center" style={{ background: TINT[p.type] }}>
                    <ProductThumb type={p.type as ProductTypeId} size={64} className="border-0 bg-white/70" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#80858C]">
                    {p.type === "BOOKING" && p.durationMin ? `${p.durationMin} min call` : PRODUCT_TYPES[p.type as ProductTypeId].short}
                  </p>
                  <p className="mt-1 text-[18px] font-semibold leading-snug tracking-[-0.01em]">{p.title}</p>
                  {p.subtitle && <p className="mt-1 line-clamp-2 text-[14px] text-[#696C72]">{p.subtitle}</p>}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-[17px] font-semibold">{price(p)}</span>
                    <span className="grid size-9 place-items-center rounded-full bg-[#151619] text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
