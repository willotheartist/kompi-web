"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Loader2, Plus, TicketPercent, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { EASE, EmptyState, PageHeader, buttonStyles } from "@/components/dashboard/ui";
import { discountLabel, formatMoney, normalizeCode } from "@/lib/store";
import { StoreDialog } from "./store-ui";

type Discount = {
  id: string;
  code: string;
  percentOff: number | null;
  amountOffCents: number | null;
  productIds: string[];
  maxUses: number | null;
  uses: number;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
};

const input = "h-11 w-full rounded-[10px] border border-[#E3E5E7] bg-white px-3.5 text-[15px] text-[#151619] outline-none transition-colors placeholder:text-[#A3A7AD] focus:border-[#151619]";
const label = "mb-1.5 block text-[13.5px] font-medium text-[#3C4045]";

function status(d: Discount, now: number) {
  if (!d.isActive) return { text: "Paused", dot: "#A3A7AD", color: "#5A5E65" };
  if (d.expiresAt && new Date(d.expiresAt).getTime() < now) return { text: "Expired", dot: "#D6D9DE", color: "#80858C" };
  if (d.maxUses !== null && d.uses >= d.maxUses) return { text: "Used up", dot: "#D6D9DE", color: "#80858C" };
  return { text: "Active", dot: "#12A150", color: "#0D7A3C" };
}

export function DiscountsClient({ initial, products, currency }: { initial: Discount[]; products: { id: string; title: string }[]; currency: string }) {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [now] = useState(() => Date.now());
  const [form, setForm] = useState({ code: "", kind: "percent" as "percent" | "amount", value: "", all: true, productIds: [] as string[], maxUses: "", expires: "" });

  async function create() {
    const value = Number(form.value);
    if (!value || value <= 0) return toast.error(form.kind === "percent" ? "Enter a percentage" : "Enter an amount");
    setBusy(true);
    try {
      const res = await fetch("/api/store/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          percentOff: form.kind === "percent" ? Math.round(value) : null,
          amountOffCents: form.kind === "amount" ? Math.round(value * 100) : null,
          productIds: form.all ? [] : form.productIds,
          maxUses: form.maxUses ? Number(form.maxUses) : null,
          expiresAt: form.expires ? new Date(`${form.expires}T23:59:59`).toISOString() : null,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't create the code");
      setItems((prev) => [{ ...json.discount }, ...prev]);
      setOpen(false);
      setForm({ code: "", kind: "percent", value: "", all: true, productIds: [], maxUses: "", expires: "" });
      toast.success(`${json.discount.code} is ready to share`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't create the code");
    } finally {
      setBusy(false);
    }
  }

  async function toggle(d: Discount) {
    const res = await fetch(`/api/store/discounts/${d.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: !d.isActive }) });
    if (!res.ok) return toast.error("Couldn't update the code");
    setItems((prev) => prev.map((x) => (x.id === d.id ? { ...x, isActive: !d.isActive } : x)));
  }

  async function remove(d: Discount) {
    if (!window.confirm(`Delete ${d.code}?`)) return;
    const res = await fetch(`/api/store/discounts/${d.id}`, { method: "DELETE" });
    if (!res.ok) return toast.error("Couldn't delete the code");
    setItems((prev) => prev.filter((x) => x.id !== d.id));
  }

  const addButton = (
    <button type="button" className={buttonStyles.primary} onClick={() => setOpen(true)}>
      <Plus size={17} /> New code
    </button>
  );

  return (
    <div>
      <PageHeader eyebrow="Earn" icon={TicketPercent} title="Discounts" description="Codes buyers enter at checkout for money off your products." actions={addButton} />

      {items.length === 0 ? (
        <EmptyState icon={TicketPercent} title="No discount codes yet" action={addButton}>
          Run a launch offer, thank your subscribers or reward a community with a code like LAUNCH20.
        </EmptyState>
      ) : (
        <div className="overflow-hidden rounded-[16px] border border-[#E3E5E7] bg-white">
          <div className="hidden grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)_110px_120px_88px] gap-4 border-b border-[#EDEEF0] px-5 py-3 text-[13px] text-[#80858C] md:grid">
            <span>Code</span>
            <span>Discount</span>
            <span>Applies to</span>
            <span className="text-right">Used</span>
            <span>Status</span>
            <span />
          </div>
          {items.map((d, i) => {
            const s = status(d, now);
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE, delay: Math.min(i, 8) * 0.03 }}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 border-b border-[#EDEEF0] px-4 py-3.5 last:border-b-0 sm:px-5 md:grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)_110px_120px_88px]"
              >
                <button type="button" className="flex w-fit items-center gap-2 rounded-[8px] border border-dashed border-[#CDD1D7] px-2.5 py-1 font-mono text-[14px] font-medium tracking-[0.04em] text-[#151619] hover:border-[#151619]" onClick={() => navigator.clipboard.writeText(d.code).then(() => toast.success("Code copied"))}>
                  {d.code} <Copy size={13} className="text-[#A3A7AD]" />
                </button>
                <span className="text-[14.5px] text-[#151619]">{discountLabel(d, currency)}</span>
                <span className="col-span-2 truncate text-[13.5px] text-[#696C72] md:col-span-1">
                  {d.productIds.length ? d.productIds.map((id) => products.find((p) => p.id === id)?.title).filter(Boolean).join(", ") || "Removed products" : "All products"}
                  {d.expiresAt && <span className="text-[#A3A7AD]"> · until {new Date(d.expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>}
                </span>
                <span className="text-[14px] tabular-nums text-[#3C4045] md:text-right">
                  {d.uses}
                  {d.maxUses !== null ? ` / ${d.maxUses}` : ""}
                </span>
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#EDEEF0] px-2.5 py-1 text-[12.5px] font-medium" style={{ color: s.color }}>
                  <span className="size-1.5 rounded-full" style={{ background: s.dot }} />
                  {s.text}
                </span>
                <span className="flex justify-end gap-1">
                  <button type="button" onClick={() => toggle(d)} className="h-8 rounded-[8px] border border-[#E3E5E7] px-2.5 text-[12.5px] font-medium text-[#3C4045] hover:border-[#CDD1D7]">
                    {d.isActive ? "Pause" : "Resume"}
                  </button>
                  <button type="button" onClick={() => remove(d)} className={buttonStyles.icon} aria-label="Delete code">
                    <Trash2 size={15} />
                  </button>
                </span>
              </motion.div>
            );
          })}
        </div>
      )}

      <StoreDialog open={open} onOpenChange={setOpen} title="New discount code" description="Share it anywhere. Buyers enter it on the product page.">
        <div className="space-y-4">
          <div>
            <span className={label}>Code</span>
            <input className={cn(input, "font-mono uppercase tracking-[0.04em]")} placeholder="LAUNCH20" value={form.code} onChange={(e) => setForm({ ...form, code: normalizeCode(e.target.value) })} />
          </div>
          <div>
            <span className={label}>Discount</span>
            <div className="flex gap-2">
              <div className="inline-flex shrink-0 rounded-[10px] border border-[#E3E5E7] p-1 text-[14px]">
                {(["percent", "amount"] as const).map((k) => (
                  <button key={k} type="button" onClick={() => setForm({ ...form, kind: k })} className={cn("h-9 rounded-[7px] px-3", form.kind === k ? "bg-[#F1F2F4] font-medium text-[#151619]" : "text-[#80858C]")}>
                    {k === "percent" ? "% off" : `${formatMoney(0, currency).replace(/[\d.,\s]/g, "")} off`}
                  </button>
                ))}
              </div>
              <input className={input} inputMode="decimal" placeholder={form.kind === "percent" ? "20" : "5"} value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value.replace(/[^0-9.]/g, "") })} />
            </div>
          </div>
          <div>
            <span className={label}>Applies to</span>
            <label className="mb-2 flex items-center gap-2.5 text-[14.5px] text-[#151619]">
              <input type="checkbox" className="size-4 accent-[#151619]" checked={form.all} onChange={(e) => setForm({ ...form, all: e.target.checked })} /> All products
            </label>
            {!form.all && (
              <div className="max-h-40 space-y-1.5 overflow-y-auto rounded-[10px] border border-[#E3E5E7] p-2.5">
                {products.length === 0 && <p className="text-[13px] text-[#80858C]">No paid products yet.</p>}
                {products.map((p) => (
                  <label key={p.id} className="flex items-center gap-2.5 text-[14px] text-[#151619]">
                    <input
                      type="checkbox"
                      className="size-4 accent-[#151619]"
                      checked={form.productIds.includes(p.id)}
                      onChange={(e) => setForm({ ...form, productIds: e.target.checked ? [...form.productIds, p.id] : form.productIds.filter((x) => x !== p.id) })}
                    />
                    {p.title}
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <span className={label}>Usage limit</span>
              <input className={input} inputMode="numeric" placeholder="Unlimited" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value.replace(/\D/g, "") })} />
            </div>
            <div>
              <span className={label}>Ends on</span>
              <input className={input} type="date" value={form.expires} onChange={(e) => setForm({ ...form, expires: e.target.value })} />
            </div>
          </div>
          <button type="button" disabled={busy || form.code.length < 3} onClick={create} className={cn(buttonStyles.primary, "w-full justify-center")}>
            {busy && <Loader2 size={16} className="animate-spin" />} Create code
          </button>
        </div>
      </StoreDialog>
    </div>
  );
}
