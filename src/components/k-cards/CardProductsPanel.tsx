"use client";

import Link from "next/link";
import { ArrowDown, ArrowUp, Plus, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_TYPES, formatMoney, type ProductTypeId } from "@/lib/store";
import { ProductThumb } from "@/components/store/store-ui";

export type CardProduct = {
  id: string;
  slug: string;
  type: ProductTypeId;
  status?: string;
  title: string;
  subtitle: string | null;
  coverImage: string | null;
  priceCents: number;
  currency: string;
  payWhatYouWant: boolean;
  buttonLabel: string | null;
  durationMin: number | null;
};

export function cardProductPrice(p: CardProduct) {
  if (p.type === "LEAD_MAGNET" || (!p.payWhatYouWant && p.priceCents === 0)) return "Free";
  return `${p.payWhatYouWant ? "From " : ""}${formatMoney(p.priceCents, p.currency)}`;
}

/** Card editor: choose which store products appear on the Card, and in what order. */
export function CardProductsPanel({ all, selected, onChange }: { all: CardProduct[] | null; selected: string[]; onChange: (ids: string[]) => void }) {
  if (all === null) return <div className="kompi-skeleton h-24 w-full" />;
  if (all.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[14px] border border-dashed border-[#D6D9DE] px-5 py-8 text-center">
        <span className="grid size-11 place-items-center rounded-[12px] bg-[#F3F4F5] text-[#151619]">
          <ShoppingBag size={20} />
        </span>
        <p className="max-w-sm text-[14px] text-[#696C72]">Sell downloads, calls and access, or give away a freebie, right from your Card.</p>
        <Link href="/dashboard/earn/products" className="inline-flex h-9 items-center gap-1.5 rounded-[9px] bg-[#151619] px-3.5 text-[14px] font-medium text-white">
          <Plus size={15} /> Create a product
        </Link>
      </div>
    );
  }
  const onCard = selected.map((id) => all.find((p) => p.id === id)).filter((p): p is CardProduct => Boolean(p));
  const off = all.filter((p) => !selected.includes(p.id));
  const move = (id: string, dir: -1 | 1) => {
    const i = selected.indexOf(id);
    const j = i + dir;
    if (i < 0 || j < 0 || j >= selected.length) return;
    const next = [...selected];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const row = (p: CardProduct, on: boolean, i = 0) => (
    <div key={p.id} className={cn("flex items-center gap-3 rounded-[12px] border px-3 py-2.5", on ? "border-[#E3E5E7] bg-white" : "border-dashed border-[#E3E5E7] bg-[#FAFAFB]")}>
      <ProductThumb type={p.type} cover={p.coverImage} size={40} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] font-medium text-[#151619]">{p.title}</p>
        <p className="truncate text-[12.5px] text-[#80858C]">
          {PRODUCT_TYPES[p.type].short} · {cardProductPrice(p)}
          {p.status && p.status !== "PUBLISHED" && <span className="text-[#C98A00]"> · Draft (hidden until published)</span>}
        </p>
      </div>
      {on && (
        <>
          <button type="button" className="grid size-8 place-items-center rounded-[8px] text-[#80858C] hover:bg-[#F3F4F5] disabled:opacity-30" disabled={i === 0} onClick={() => move(p.id, -1)} aria-label="Move up">
            <ArrowUp size={15} />
          </button>
          <button type="button" className="grid size-8 place-items-center rounded-[8px] text-[#80858C] hover:bg-[#F3F4F5] disabled:opacity-30" disabled={i === onCard.length - 1} onClick={() => move(p.id, 1)} aria-label="Move down">
            <ArrowDown size={15} />
          </button>
        </>
      )}
      <button
        type="button"
        onClick={() => onChange(on ? selected.filter((x) => x !== p.id) : [...selected, p.id])}
        className={cn("h-8 shrink-0 rounded-[8px] px-3 text-[13px] font-medium", on ? "border border-[#E3E5E7] text-[#3C4045] hover:border-[#CDD1D7]" : "bg-[#151619] text-white")}
      >
        {on ? "Remove" : "Add"}
      </button>
    </div>
  );
  return (
    <div className="space-y-4">
      {onCard.length > 0 && <div className="space-y-2">{onCard.map((p, i) => row(p, true, i))}</div>}
      {off.length > 0 && (
        <div className="space-y-2">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#80858C]">Not on your Card</p>
          {off.map((p) => row(p, false))}
        </div>
      )}
      <Link href="/dashboard/earn/products" className="inline-flex text-[13.5px] font-medium text-[#3D5AFE]">
        Manage products →
      </Link>
    </div>
  );
}
