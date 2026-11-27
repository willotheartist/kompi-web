"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, Download, Receipt, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { EASE, EmptyState, PageHeader, buttonStyles } from "@/components/dashboard/ui";
import { PRODUCT_TYPES, formatBookingTime, formatMoney, type ProductTypeId } from "@/lib/store";
import { OrderStatusPill, ProductThumb } from "./store-ui";

type OrderRow = {
  id: string;
  status: string;
  buyerEmail: string | null;
  buyerName: string | null;
  buyerNote: string | null;
  amountCents: number;
  feeCents: number;
  currency: string;
  createdAt: string;
  bookingStart: string | null;
  timezone: string | null;
  product: { id: string; title: string; type: ProductTypeId; coverImage: string | null; durationMin: number | null };
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "sales", label: "Sales" },
  { id: "bookings", label: "Bookings" },
  { id: "signups", label: "Signups" },
  { id: "abandoned", label: "Abandoned" },
] as const;

function when(iso: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function csv(rows: OrderRow[]) {
  const head = ["Date", "Product", "Type", "Buyer name", "Buyer email", "Status", "Amount", "Kompi fee", "Currency", "Booking", "Note"];
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const body = rows.map((o) =>
    [o.createdAt, o.product.title, PRODUCT_TYPES[o.product.type].label, o.buyerName ?? "", o.buyerEmail ?? "", o.status, (o.amountCents / 100).toFixed(2), (o.feeCents / 100).toFixed(2), o.currency.toUpperCase(), o.bookingStart ?? "", o.buyerNote ?? ""].map((v) => esc(String(v))).join(","),
  );
  const blob = new Blob([[head.join(","), ...body].join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "kompi-orders.csv";
  a.click();
  URL.revokeObjectURL(a.href);
}

export function OrdersClient({ orders }: { orders: OrderRow[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const [now] = useState(() => Date.now());

  const upcoming = useMemo(
    () =>
      orders
        .filter((o) => o.bookingStart && ["PAID", "FREE"].includes(o.status) && new Date(o.bookingStart).getTime() > now)
        .sort((a, b) => a.bookingStart!.localeCompare(b.bookingStart!))
        .slice(0, 4),
    [orders, now],
  );

  const shown = useMemo(
    () =>
      orders.filter((o) => {
        const done = ["PAID", "FREE", "REFUNDED"].includes(o.status);
        const ok =
          filter === "all" ? o.status !== "CANCELLED" :
          filter === "sales" ? o.amountCents > 0 && done :
          filter === "bookings" ? o.product.type === "BOOKING" && done :
          filter === "signups" ? o.status === "FREE" :
          o.status === "CANCELLED" || o.status === "PENDING";
        const q = query.toLowerCase();
        return ok && (!q || [o.buyerEmail, o.buyerName, o.product.title].some((v) => v?.toLowerCase().includes(q)));
      }),
    [orders, filter, query],
  );

  const revenue = orders.filter((o) => o.status === "PAID").reduce((a, o) => a + o.amountCents - o.feeCents, 0);
  const currency = orders[0]?.currency ?? "gbp";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-7 sm:px-8 sm:py-9">
      <PageHeader
        eyebrow="Earn"
        icon={Receipt}
        title="Orders"
        description={orders.length ? `${orders.filter((o) => ["PAID", "FREE"].includes(o.status)).length} completed · ${formatMoney(revenue, currency)} earned` : "Sales, bookings and signups from your products."}
        actions={
          orders.length > 0 && (
            <button type="button" className={buttonStyles.secondary} onClick={() => csv(shown)}>
              <Download size={16} /> Export CSV
            </button>
          )
        }
      />

      {orders.length === 0 ? (
        <EmptyState icon={Receipt} title="No orders yet" action={<Link href="/dashboard/earn/products" className={buttonStyles.primary}>Go to products</Link>}>
          When someone buys, books or signs up, it shows up here, and you get an email.
        </EmptyState>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div className="mb-5 rounded-[16px] border border-[#E3E5E7] bg-white p-4 sm:p-5">
              <p className="mb-3 flex items-center gap-2 text-[14px] font-medium text-[#151619]">
                <CalendarClock size={16} className="text-[#C46A07]" /> Coming up
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {upcoming.map((o) => (
                  <div key={o.id} className="rounded-[12px] border border-[#EDEEF0] px-3.5 py-3">
                    <p className="text-[14.5px] font-medium text-[#151619]">{o.buyerName || o.buyerEmail}</p>
                    <p className="text-[13px] text-[#696C72]">{formatBookingTime(o.bookingStart!, o.timezone ?? "Europe/London", o.product.durationMin)}</p>
                    <p className="truncate text-[12.5px] text-[#A3A7AD]">{o.product.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-[11px] border border-[#E3E5E7] bg-white p-1 text-[14px]">
              {FILTERS.map((f) => (
                <button key={f.id} type="button" onClick={() => setFilter(f.id)} className={cn("h-8 rounded-[8px] px-3 transition-colors", filter === f.id ? "bg-[#F1F2F4] font-medium text-[#151619]" : "text-[#80858C] hover:text-[#151619]")}>
                  {f.label}
                </button>
              ))}
            </div>
            <label className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-[10px] border border-[#E3E5E7] bg-white px-3 text-[14px] sm:max-w-xs">
              <Search size={16} className="text-[#A3A7AD]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search buyers or products" className="w-full bg-transparent outline-none placeholder:text-[#A3A7AD]" />
            </label>
          </div>

          <div className="overflow-hidden rounded-[16px] border border-[#E3E5E7] bg-white">
            <div className="hidden grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_110px_150px_130px] gap-4 border-b border-[#EDEEF0] px-5 py-3 text-[13px] text-[#80858C] md:grid">
              <span>Buyer</span>
              <span>Product</span>
              <span className="text-right">Amount</span>
              <span>Status</span>
              <span>Date</span>
            </div>
            {shown.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: Math.min(i, 10) * 0.02 }}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 border-b border-[#EDEEF0] px-4 py-3.5 last:border-b-0 sm:px-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_110px_150px_130px]"
              >
                <div className="min-w-0">
                  <p className="truncate text-[14.5px] font-medium text-[#151619]">{o.buyerName || o.buyerEmail || "Unknown buyer"}</p>
                  {o.buyerName && o.buyerEmail && <p className="truncate text-[13px] text-[#80858C]">{o.buyerEmail}</p>}
                  {o.buyerNote && <p className="mt-1 line-clamp-2 text-[13px] text-[#696C72]">“{o.buyerNote}”</p>}
                </div>
                <div className="col-span-2 flex min-w-0 items-center gap-2.5 md:col-span-1">
                  <ProductThumb type={o.product.type} cover={o.product.coverImage} size={32} />
                  <div className="min-w-0">
                    <p className="truncate text-[14px] text-[#151619]">{o.product.title}</p>
                    {o.bookingStart && <p className="truncate text-[12.5px] text-[#C46A07]">{formatBookingTime(o.bookingStart, o.timezone ?? "Europe/London")}</p>}
                  </div>
                </div>
                <span className="col-start-2 row-start-1 text-right text-[14.5px] tabular-nums text-[#151619] md:col-start-auto md:row-start-auto">{o.amountCents ? formatMoney(o.amountCents, o.currency) : "Free"}</span>
                <span>
                  <OrderStatusPill status={o.status} />
                </span>
                <span className="text-[13.5px] text-[#696C72]">{when(o.createdAt)}</span>
              </motion.div>
            ))}
            {shown.length === 0 && <p className="px-5 py-10 text-center text-[14px] text-[#80858C]">Nothing here yet.</p>}
          </div>
        </>
      )}
    </div>
  );
}
