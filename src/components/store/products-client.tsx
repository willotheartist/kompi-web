"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Copy, ExternalLink, Loader2, MoreHorizontal, Pencil, Plus, Search, ShoppingBag, Trash2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { EASE, EmptyState, PageHeader, buttonStyles } from "@/components/dashboard/ui";
import { PRODUCT_TYPES, formatMoney, type ProductTypeId } from "@/lib/store";
import { PUBLIC_PROFILE_URL } from "@/lib/urls";
import { ProductThumb, StatusPill, StoreDialog, TYPE_ICON, TYPE_TINT } from "./store-ui";

type Row = {
  id: string;
  slug: string;
  type: ProductTypeId;
  status: string;
  title: string;
  coverImage: string | null;
  priceCents: number;
  currency: string;
  payWhatYouWant: boolean;
  views: number;
  clicks: number;
  orders: number;
  earnedCents: number;
  issues: string[];
  createdAt: string;
};

type Props = {
  rows: Row[];
  stats: { views: number; clicks: number; orders: number; earnedCents: number };
  handle: string | null;
  currency: string;
  connect: { ready: boolean; started: boolean };
  feePercent: number;
};

const TYPE_ORDER: ProductTypeId[] = ["DOWNLOAD", "BOOKING", "LEAD_MAGNET", "PAID_LINK", "TIP"];

export function priceLabel(r: { type: ProductTypeId; priceCents: number; currency: string; payWhatYouWant: boolean }) {
  if (r.type === "LEAD_MAGNET" || (!r.payWhatYouWant && r.priceCents === 0)) return "Free";
  return `${r.payWhatYouWant ? "From " : ""}${formatMoney(r.priceCents, r.currency)}`;
}

/** Picker for a new product's type; creates a draft and opens the editor. */
export function NewProductDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter();
  const [busy, setBusy] = useState<ProductTypeId | null>(null);
  async function create(type: ProductTypeId) {
    setBusy(type);
    try {
      const res = await fetch("/api/store/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't create the product");
      router.push(`/dashboard/earn/products/${json.id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't create the product");
      setBusy(null);
    }
  }
  return (
    <StoreDialog open={open} onOpenChange={onOpenChange} title="What are you selling?" description="Pick a type. You can change the details next." wide>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {TYPE_ORDER.map((type, i) => {
          const meta = PRODUCT_TYPES[type];
          const Icon = TYPE_ICON[type];
          const tint = TYPE_TINT[type];
          return (
            <motion.button
              key={type}
              type="button"
              disabled={Boolean(busy)}
              onClick={() => create(type)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: i * 0.04 }}
              className={cn("group flex items-start gap-3.5 rounded-[14px] border border-[#E3E5E7] p-4 text-left transition-colors hover:border-[#151619] disabled:opacity-60", type === "DOWNLOAD" && "sm:col-span-2")}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-[11px]" style={{ background: tint.bg, color: tint.fg }}>
                {busy === type ? <Loader2 size={20} className="animate-spin" /> : <Icon size={20} strokeWidth={1.8} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2 text-[15px] font-medium text-[#151619]">
                  {meta.label}
                  {!meta.paid && <span className="rounded-full bg-[#E9F8EF] px-2 py-px text-[11px] font-medium text-[#12924A]">Free</span>}
                </span>
                <span className="mt-0.5 block text-[13.5px] leading-snug text-[#696C72]">{meta.description}</span>
              </span>
              <ArrowRight size={16} className="mt-1 shrink-0 text-[#A3A7AD] transition-transform group-hover:translate-x-0.5 group-hover:text-[#151619]" />
            </motion.button>
          );
        })}
      </div>
    </StoreDialog>
  );
}

function RowMenu({ row, handle, onDeleted }: { row: Row; handle: string | null; onDeleted: (archived: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const url = handle ? `${PUBLIC_PROFILE_URL}/${handle}/p/${row.slug}` : null;
  async function remove() {
    if (!window.confirm(row.orders ? "This product has orders, so it will be archived and hidden. Continue?" : "Delete this product?")) return;
    const res = await fetch(`/api/store/products/${row.id}`, { method: "DELETE" });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return toast.error(json.error || "Couldn't delete it");
    onDeleted(Boolean(json.archived));
  }
  const item = "flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left text-[14px] text-[#151619] hover:bg-[#F3F4F5]";
  return (
    <div className="relative">
      <button type="button" className={buttonStyles.icon} aria-label="Product actions" onClick={() => setOpen((o) => !o)} onBlur={() => window.setTimeout(() => setOpen(false), 150)}>
        <MoreHorizontal size={18} />
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-20 w-48 rounded-[12px] border border-[#E3E5E7] bg-white p-1.5">
          <Link href={`/dashboard/earn/products/${row.id}`} className={item}>
            <Pencil size={15} /> Edit
          </Link>
          {url && row.status === "PUBLISHED" && (
            <>
              <a href={url} target="_blank" rel="noreferrer" className={item}>
                <ExternalLink size={15} /> View page
              </a>
              <button type="button" className={item} onMouseDown={(e) => e.preventDefault()} onClick={() => navigator.clipboard.writeText(url).then(() => toast.success("Link copied"))}>
                <Copy size={15} /> Copy link
              </button>
            </>
          )}
          <button type="button" className={cn(item, "text-[#D93036]")} onMouseDown={(e) => e.preventDefault()} onClick={remove}>
            <Trash2 size={15} /> {row.orders ? "Archive" : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}

export function ProductsClient({ rows: initialRows, stats, handle, currency, connect, feePercent }: Props) {
  const router = useRouter();
  const [rows, setRows] = useState(initialRows);
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ProductTypeId | "ALL">("ALL");
  const [status, setStatus] = useState<"ALL" | "PUBLISHED" | "DRAFT" | "SETUP">("ALL");

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (type === "ALL" || r.type === type) &&
          (status === "ALL" || (status === "SETUP" ? r.issues.length > 0 && r.status !== "PUBLISHED" : r.status === status)) &&
          (!query || r.title.toLowerCase().includes(query.toLowerCase())),
      ),
    [rows, type, status, query],
  );

  const statCards = [
    { label: "Views", value: stats.views.toLocaleString() },
    { label: "Clicks", value: stats.clicks.toLocaleString() },
    { label: "Orders", value: stats.orders.toLocaleString() },
    { label: "Earnings", value: formatMoney(stats.earnedCents, currency), hint: feePercent ? `After Kompi's ${feePercent}% fee` : "You keep 100%" },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-8 sm:py-9">
      <PageHeader
        eyebrow="Earn"
        icon={ShoppingBag}
        title="Products"
        description="Sell downloads, bookings and access, collect leads and take tips, all from your Card."
        actions={
          <button type="button" className={buttonStyles.primary} onClick={() => setAdding(true)}>
            <Plus size={17} /> Add product
          </button>
        }
      />

      {!connect.ready && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="mb-5 flex flex-wrap items-center gap-4 rounded-[16px] border border-[#E3E5E7] bg-white p-4 sm:p-5">
          <span className="grid size-11 place-items-center rounded-[11px] bg-[#F3F4F5] text-[#151619]">
            <Wallet size={20} strokeWidth={1.8} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-medium text-[#151619]">{connect.started ? "Finish setting up payouts" : "Get paid with Stripe"}</p>
            <p className="text-[13.5px] text-[#696C72]">
              Connect a Stripe account to sell paid products. Money goes straight to your bank. {feePercent ? `Kompi takes ${feePercent}% on the Free plan, 0% on paid plans.` : "Kompi takes 0% on your plan."}
            </p>
          </div>
          <Link href="/dashboard/earn/payouts" className={buttonStyles.primary}>
            {connect.started ? "Continue setup" : "Set up payouts"}
          </Link>
        </motion.div>
      )}

      {rows.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your store is ready for its first product"
          action={
            <button type="button" className={buttonStyles.primary} onClick={() => setAdding(true)}>
              <Plus size={17} /> Add product
            </button>
          }
        >
          Sell a guide, open your calendar for paid calls, or give away a freebie to grow your list. Products show up on your Card.
        </EmptyState>
      ) : (
        <>
          <div className="mb-5 grid grid-cols-2 overflow-hidden rounded-[16px] border border-[#E3E5E7] bg-white lg:grid-cols-4">
            {statCards.map((s, i) => (
              <div key={s.label} className={cn("px-5 py-4", i % 2 === 1 && "border-l border-[#EDEEF0]", i >= 2 && "border-t border-[#EDEEF0] lg:border-t-0", i === 2 && "lg:border-l")}>
                <p className="text-[13px] text-[#80858C]">{s.label}</p>
                <p className="mt-1 text-[26px] font-medium tracking-[-0.04em] text-[#151619]">{s.value}</p>
                {s.hint && <p className="text-[12px] text-[#A3A7AD]">{s.hint}</p>}
              </div>
            ))}
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <label className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[14px] sm:flex-none">
              <Search size={16} className="text-[#A3A7AD]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="w-full bg-transparent outline-none placeholder:text-[#A3A7AD]" />
            </label>
            <select value={type} onChange={(e) => setType(e.target.value as ProductTypeId | "ALL")} className="h-10 rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[14px] outline-none">
              <option value="ALL">All types</option>
              {TYPE_ORDER.map((t) => (
                <option key={t} value={t}>
                  {PRODUCT_TYPES[t].label}
                </option>
              ))}
            </select>
            <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)} className="h-10 rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[14px] outline-none">
              <option value="ALL">Any status</option>
              <option value="PUBLISHED">Live</option>
              <option value="DRAFT">Draft</option>
              <option value="SETUP">Needs setup</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-[#E3E5E7] bg-white">
            <div className="hidden grid-cols-[minmax(0,1fr)_110px_80px_80px_110px_130px_44px] items-center gap-4 border-b border-[#EDEEF0] px-5 py-3 text-[13px] text-[#80858C] md:grid">
              <span>Product</span>
              <span>Price</span>
              <span className="text-right">Clicks</span>
              <span className="text-right">Orders</span>
              <span className="text-right">Earned</span>
              <span>Status</span>
              <span />
            </div>
            {filtered.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: Math.min(i, 8) * 0.03 }}
                className="group grid grid-cols-[minmax(0,1fr)_44px] items-center gap-x-4 gap-y-2 border-b border-[#EDEEF0] px-4 py-3.5 last:border-b-0 hover:bg-[#FAFAFB] sm:px-5 md:grid-cols-[minmax(0,1fr)_110px_80px_80px_110px_130px_44px]"
              >
                <button type="button" onClick={() => router.push(`/dashboard/earn/products/${r.id}`)} className="flex min-w-0 items-center gap-3 text-left">
                  <ProductThumb type={r.type} cover={r.coverImage} />
                  <span className="min-w-0">
                    <span className="block truncate text-[15px] font-medium text-[#151619]">{r.title}</span>
                    <span className="block truncate text-[13px] text-[#80858C]">
                      {PRODUCT_TYPES[r.type].short}
                      <span className="md:hidden"> · {priceLabel(r)} · {r.orders} orders</span>
                    </span>
                  </span>
                </button>
                <span className="hidden text-[14px] text-[#151619] md:block">{priceLabel(r)}</span>
                <span className="hidden text-right text-[14px] tabular-nums text-[#3C4045] md:block">{r.clicks}</span>
                <span className="hidden text-right text-[14px] tabular-nums text-[#3C4045] md:block">{r.orders}</span>
                <span className="hidden text-right text-[14px] tabular-nums text-[#151619] md:block">{r.earnedCents ? formatMoney(r.earnedCents, r.currency) : "—"}</span>
                <span className="col-start-1 row-start-2 md:col-start-auto md:row-start-auto" title={r.issues.join(" · ")}>
                  <StatusPill status={r.status} needsSetup={r.issues.length > 0} />
                </span>
                <span className="col-start-2 row-span-2 row-start-1 md:col-start-auto md:row-span-1 md:row-start-auto">
                  <RowMenu
                    row={r}
                    handle={handle}
                    onDeleted={(archived) => {
                      setRows((prev) => prev.filter((x) => x.id !== r.id));
                      toast.success(archived ? "Product archived" : "Product deleted");
                    }}
                  />
                </span>
              </motion.div>
            ))}
            {filtered.length === 0 && <p className="px-5 py-10 text-center text-[14px] text-[#80858C]">No products match those filters.</p>}
          </div>
        </>
      )}

      <NewProductDialog open={adding} onOpenChange={setAdding} />
    </div>
  );
}
