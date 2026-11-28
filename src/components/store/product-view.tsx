"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, CalendarClock, Check, Loader2, LockKeyhole, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { PRODUCT_TYPES, formatMoney, type ProductTypeId, type SlotDay } from "@/lib/store";

export type PublicProduct = {
  id: string;
  slug: string;
  type: ProductTypeId;
  title: string;
  subtitle: string | null;
  description: string | null;
  coverImage: string | null;
  priceCents: number;
  currency: string;
  payWhatYouWant: boolean;
  minPriceCents: number | null;
  buttonLabel: string | null;
  durationMin: number | null;
  fileName?: string | null;
};

export type ProductLook = {
  background: CSSProperties;
  titleColor: string;
  textColor: string;
  titleFont: string;
  bodyFont: string;
  button: CSSProperties;
};

type Props = {
  product: PublicProduct;
  look: ProductLook;
  seller: { name: string; avatar: string | null; handle: string | null };
  /** Preview inside the dashboard: nothing is submitted. */
  preview?: boolean;
  /** Fixed slots for the editor preview (the live page fetches real ones). */
  previewSlots?: SlotDay[];
  className?: string;
};

const field = "h-12 w-full rounded-[12px] border border-[#E3E5E7] bg-white px-3.5 text-[15px] text-[#151619] outline-none transition-colors placeholder:text-[#A3A7AD] focus:border-[#151619]";

function isFree(p: PublicProduct) {
  return p.type === "LEAD_MAGNET" || (!p.payWhatYouWant && p.priceCents === 0);
}

export function ProductView({ product: p, look, seller, preview, previewSlots, className }: Props) {
  const free = isFree(p);
  const suggested = Math.max(p.priceCents, p.minPriceCents ?? 0, 100);
  const chips = useMemo(() => (p.payWhatYouWant ? [suggested, suggested * 2, suggested * 4] : []), [p.payWhatYouWant, suggested]);
  const [amount, setAmount] = useState(suggested);
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [fetchedDays, setDays] = useState<SlotDay[] | null>(null);
  const days = preview ? (previewSlots ?? []) : fetchedDays;
  const [tz, setTz] = useState<string | null>(null);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [codeOpen, setCodeOpen] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeBusy, setCodeBusy] = useState(false);
  const [applied, setApplied] = useState<{ code: string; label: string; discountCents: number; totalCents: number } | null>(null);

  useEffect(() => {
    if (p.type !== "BOOKING" || preview) return;
    let live = true;
    fetch(`/api/store/slots?productId=${encodeURIComponent(p.id)}`)
      .then((r) => r.json())
      .then((j) => {
        if (!live) return;
        setDays(Array.isArray(j.days) ? j.days : []);
        setTz(j.timezone ?? null);
      })
      .catch(() => live && setDays([]));
    return () => {
      live = false;
    };
  }, [p.id, p.type, preview]);

  const chosenAmount = p.payWhatYouWant ? (custom ? Math.round(Number(custom) * 100) || 0 : amount) : (applied?.totalCents ?? p.priceCents);
  const codesAllowed = !free && !p.payWhatYouWant;
  const freeNow = free || (applied !== null && applied.totalCents === 0);
  const needsEmail = freeNow || p.type === "BOOKING";
  const meta = PRODUCT_TYPES[p.type];
  const cta =
    p.buttonLabel?.trim() ||
    meta.defaultButton;
  const priceText = freeNow ? "Free" : formatMoney(chosenAmount || 0, p.currency);

  async function applyCode() {
    setError(null);
    if (preview) return setNotice("Codes work on your live page.");
    if (!codeInput.trim()) return;
    setCodeBusy(true);
    try {
      const res = await fetch(`/api/store/discount?productId=${encodeURIComponent(p.id)}&code=${encodeURIComponent(codeInput)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "That code isn't valid.");
      setApplied(json);
      setCodeOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "That code isn't valid.");
    } finally {
      setCodeBusy(false);
    }
  }

  async function submit() {
    setError(null);
    if (preview) {
      setNotice("This is a preview. Buttons work on your live page.");
      return;
    }
    if (p.type === "BOOKING" && !slot) return setError("Pick a time first.");
    if (needsEmail && !/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email.");
    if (p.payWhatYouWant && chosenAmount < (p.minPriceCents ?? 0)) return setError(`The minimum is ${formatMoney(p.minPriceCents ?? 0, p.currency)}.`);
    setBusy(true);
    try {
      const res = await fetch("/api/store/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: p.id,
          handle: seller.handle ?? undefined,
          amountCents: p.payWhatYouWant ? chosenAmount : undefined,
          slot: slot ?? undefined,
          email: email || undefined,
          name: name || undefined,
          note: note || undefined,
          discountCode: applied?.code,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || "Something went wrong. Please try again.");
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) return await navigator.share({ title: p.title, url });
      await navigator.clipboard.writeText(url);
      setNotice("Link copied");
    } catch {}
  }

  const activeDay = days?.[day];

  return (
    <div className={cn("flex min-h-full flex-col", look.bodyFont, className)} style={look.background}>
      <div className="mx-auto flex w-full max-w-[600px] flex-1 flex-col px-5 pb-10 pt-5 sm:px-8">
        <div className="mb-6 flex items-center justify-between">
          {seller.handle ? (
            <a href={preview ? undefined : `/${seller.handle}`} className="inline-flex h-11 items-center gap-2 rounded-full bg-white/90 pl-1.5 pr-4 text-[14px] font-medium text-[#151619]" style={{ fontFamily: "var(--font-primary), system-ui, sans-serif" }}>
              {seller.avatar ? <img src={seller.avatar} alt="" className="size-8 rounded-full object-cover" /> : <ArrowLeft size={16} className="ml-1.5" />}
              {seller.name}
            </a>
          ) : (
            <span />
          )}
          <button type="button" onClick={share} className="grid size-11 place-items-center rounded-full bg-white/90 text-[#151619]" aria-label="Share">
            <Share size={18} />
          </button>
        </div>

        {p.coverImage && <img src={p.coverImage} alt="" className="mb-6 aspect-[16/10] w-full rounded-[20px] object-cover" />}

        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/85 px-3 py-1 text-[12.5px] font-medium text-[#151619]" style={{ fontFamily: "var(--font-primary), system-ui, sans-serif" }}>
          {p.type === "BOOKING" && <CalendarClock size={13} />}
          {p.type === "PAID_LINK" && <LockKeyhole size={13} />}
          {p.type === "BOOKING" && p.durationMin ? `${p.durationMin} min call` : meta.short}
        </span>
        <h1 className={cn("text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-[36px]", look.titleFont)} style={{ color: look.titleColor }}>
          {p.title}
        </h1>
        {p.subtitle && (
          <p className="mt-2 text-[17px] leading-snug" style={{ color: look.textColor }}>
            {p.subtitle}
          </p>
        )}
        {p.description && (
          <div className="mt-5 whitespace-pre-line text-[15.5px] leading-relaxed" style={{ color: look.textColor }}>
            {p.description}
          </div>
        )}

        {/* Purchase panel: always light, so it reads on any theme. */}
        <div className="mt-7 rounded-[22px] border border-black/5 bg-white p-5 text-[#151619] sm:p-6" style={{ fontFamily: "var(--font-primary), system-ui, sans-serif" }}>
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <span className="text-[15px] text-[#696C72]">{p.type === "TIP" ? "Choose an amount" : p.type === "BOOKING" ? "Pick a time" : free ? "Free" : "Price"}</span>
            {!p.payWhatYouWant && (
              <span className="flex items-baseline gap-2">
                {applied && <span className="text-[16px] text-[#A3A7AD] line-through">{formatMoney(p.priceCents, p.currency)}</span>}
                <span className="text-[26px] font-semibold tracking-[-0.03em]">{priceText}</span>
              </span>
            )}
          </div>

          {p.payWhatYouWant && (
            <div className="mb-4 grid grid-cols-3 gap-2">
              {chips.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setAmount(c);
                    setCustom("");
                  }}
                  className={cn("h-12 rounded-[12px] border text-[16px] font-semibold transition-colors", !custom && amount === c ? "border-[#151619] bg-[#151619] text-white" : "border-[#E3E5E7] hover:border-[#151619]")}
                >
                  {formatMoney(c, p.currency)}
                </button>
              ))}
              <label className="col-span-3 flex h-12 items-center gap-2 rounded-[12px] border border-[#E3E5E7] px-3.5 text-[15px] focus-within:border-[#151619]">
                <span className="text-[#80858C]">Other amount</span>
                <input inputMode="decimal" value={custom} onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ""))} placeholder={(suggested / 100).toFixed(0)} className="min-w-0 flex-1 bg-transparent text-right font-semibold outline-none" />
              </label>
            </div>
          )}

          {p.type === "BOOKING" && (
            <div className="mb-4">
              {days === null ? (
                <div className="grid h-24 place-items-center text-[#80858C]">
                  <Loader2 className="animate-spin" size={20} />
                </div>
              ) : days.length === 0 ? (
                <p className="rounded-[12px] bg-[#F7F7F8] px-4 py-5 text-center text-[14px] text-[#696C72]">No times available right now. Check back soon.</p>
              ) : (
                <>
                  <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1">
                    {days.map((d, i) => (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => {
                          setDay(i);
                          setSlot(null);
                        }}
                        className={cn("shrink-0 rounded-[12px] border px-3.5 py-2 text-[13.5px] font-medium transition-colors", day === i ? "border-[#151619] bg-[#151619] text-white" : "border-[#E3E5E7] hover:border-[#151619]")}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {activeDay?.slots.map((s) => (
                      <button key={s.start} type="button" onClick={() => setSlot(s.start)} className={cn("h-11 rounded-[10px] border text-[14.5px] font-medium tabular-nums transition-colors", slot === s.start ? "border-[#151619] bg-[#151619] text-white" : "border-[#E3E5E7] hover:border-[#151619]")}>
                        {s.label}
                      </button>
                    ))}
                  </div>
                  {tz && <p className="mt-2 text-[12px] text-[#A3A7AD]">Times shown in {tz.replace(/_/g, " ")}</p>}
                </>
              )}
            </div>
          )}

          {codesAllowed && (
            <div className="mb-4">
              {applied ? (
                <div className="flex items-center justify-between rounded-[12px] border border-dashed border-[#12A150] bg-[#F3FBF6] px-3.5 py-2.5 text-[14px]">
                  <span className="text-[#0D7A3C]">
                    <span className="font-mono font-semibold tracking-[0.04em]">{applied.code}</span> · {applied.label}
                  </span>
                  <button type="button" className="text-[13px] font-medium text-[#696C72] hover:text-[#151619]" onClick={() => setApplied(null)}>
                    Remove
                  </button>
                </div>
              ) : codeOpen ? (
                <div className="flex gap-2">
                  <input className={cn(field, "font-mono uppercase tracking-[0.04em]")} placeholder="CODE" value={codeInput} onChange={(e) => setCodeInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && applyCode()} autoFocus />
                  <button type="button" onClick={applyCode} disabled={codeBusy} className="h-12 shrink-0 rounded-[12px] border border-[#151619] px-4 text-[14.5px] font-semibold text-[#151619] disabled:opacity-60">
                    {codeBusy ? <Loader2 size={16} className="animate-spin" /> : "Apply"}
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => setCodeOpen(true)} className="text-[13.5px] font-medium text-[#696C72] underline-offset-2 hover:text-[#151619] hover:underline">
                  Have a discount code?
                </button>
              )}
            </div>
          )}

          {needsEmail && (
            <div className="mb-4 grid gap-2">
              <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              <input className={field} placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
              {p.type === "BOOKING" && <textarea className={cn(field, "h-auto min-h-[84px] py-3")} placeholder="Anything they should know? (optional)" value={note} onChange={(e) => setNote(e.target.value)} />}
            </div>
          )}

          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="flex min-h-[56px] w-full items-center justify-center gap-2 px-5 text-[16px] font-semibold transition-transform active:scale-[0.99] disabled:opacity-70"
            style={{ ...look.button, borderRadius: Math.min(Number(look.button.borderRadius ?? 14), 18) }}
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : null}
            {cta}
            {!freeNow && (p.type !== "BOOKING" || slot) ? <span className="opacity-80">· {priceText}</span> : null}
          </button>
          {error && <p className="mt-3 text-center text-[13.5px] text-[#D93036]">{error}</p>}
          {notice && !error && (
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[13.5px] text-[#696C72]">
              <Check size={14} /> {notice}
            </p>
          )}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[12.5px] text-[#A3A7AD]">
            {freeNow ? "Delivered to your inbox instantly" : <><LockKeyhole size={12} /> Secure checkout with Stripe</>}
          </p>
        </div>

        <a href="https://kompi.app" className="mx-auto mt-10 text-[12.5px] font-medium opacity-70" style={{ color: look.textColor, fontFamily: "var(--font-primary), system-ui, sans-serif" }}>
          Powered by Kompi
        </a>
      </div>
    </div>
  );
}
