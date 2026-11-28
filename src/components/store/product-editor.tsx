"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { upload } from "@vercel/blob/client";
import { AlertTriangle, ArrowLeft, Check, ExternalLink, File as FileIcon, ImagePlus, Link2, Loader2, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { buttonStyles } from "@/components/dashboard/ui";
import { PhonePreview } from "@/components/k-cards/PhonePreview";
import {
  DEFAULT_BOOKING,
  PRODUCT_TYPES,
  WEEKDAYS,
  bookingSlots,
  formatMoney,
  productSetupIssues,
  readBookingRules,
  slugify,
  type BookingRules,
  type ProductTypeId,
  type Weekday,
} from "@/lib/store";
import { PUBLIC_PROFILE_URL } from "@/lib/urls";
import { ProductView, type ProductLook } from "./product-view";
import { ProductThumb, StatusPill } from "./store-ui";

type Product = {
  id: string;
  slug: string;
  type: ProductTypeId;
  status: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  coverImage: string | null;
  priceCents: number;
  currency: string;
  payWhatYouWant: boolean;
  minPriceCents: number | null;
  buttonLabel: string | null;
  fileUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  accessUrl: string | null;
  durationMin: number | null;
  booking: unknown;
  thankYouNote: string | null;
};

type Props = {
  initial: Product & { createdAt: string; updatedAt: string };
  look: ProductLook;
  seller: { name: string; avatar: string | null; handle: string | null };
  connectReady: boolean;
  feePercent: number;
  uploadsEnabled: boolean;
};

const DAY_LABEL: Record<Weekday, string> = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
const input = "h-11 w-full rounded-[10px] border border-[#E3E5E7] bg-white px-3.5 text-[15px] text-[#151619] outline-none transition-colors placeholder:text-[#A3A7AD] focus:border-[#151619]";
const label = "mb-1.5 block text-[13.5px] font-medium text-[#3C4045]";

function Section({ title, description, children, id }: { title: string; description?: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="rounded-[16px] border border-[#E3E5E7] bg-white">
      <div className="border-b border-[#EDEEF0] px-5 py-4 sm:px-6">
        <h2 className="text-[16px] font-medium tracking-[-0.02em] text-[#151619]">{title}</h2>
        {description && <p className="mt-0.5 text-[13px] text-[#80858C]">{description}</p>}
      </div>
      <div className="space-y-4 p-5 sm:p-6">{children}</div>
    </section>
  );
}

function Toggle({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} className="flex w-full items-center justify-between gap-3 text-left text-[14.5px] text-[#151619]">
      <span>{children}</span>
      <span className={cn("relative inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full transition-colors", on ? "bg-[#151619]" : "bg-[#DCDFE3]")}>
        <span className={cn("inline-block size-[18px] rounded-full bg-white transition-transform duration-200", on ? "translate-x-[18px]" : "translate-x-[2px]")} />
      </span>
    </button>
  );
}

function MoneyInput({ cents, currency, onChange, placeholder }: { cents: number | null; currency: string; onChange: (c: number | null) => void; placeholder?: string }) {
  const symbol = formatMoney(0, currency).replace(/[\d.,\s]/g, "") || currency.toUpperCase();
  const [text, setText] = useState(cents === null ? "" : (cents / 100).toFixed(cents % 100 ? 2 : 0));
  return (
    <label className="flex h-11 items-center gap-1.5 rounded-[10px] border border-[#E3E5E7] bg-white px-3.5 focus-within:border-[#151619]">
      <span className="text-[15px] text-[#80858C]">{symbol}</span>
      <input
        inputMode="decimal"
        value={text}
        placeholder={placeholder ?? "0"}
        onChange={(e) => {
          const v = e.target.value.replace(/[^0-9.]/g, "");
          setText(v);
          onChange(v === "" ? null : Math.round(Number(v) * 100));
        }}
        className="min-w-0 flex-1 bg-transparent text-[15px] text-[#151619] outline-none"
      />
    </label>
  );
}

/** Resize an image in the browser so covers stay light (stored inline). */
async function imageToDataUrl(file: File, max = 1400): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.85);
}

function bytes(n: number | null) {
  if (!n) return "";
  return n > 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1e3))} KB`;
}

export function ProductEditor({ initial, look, seller, connectReady, feePercent, uploadsEnabled }: Props) {
  const [p, setP] = useState<Product>(initial);
  const [saving, setSaving] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [publishing, setPublishing] = useState(false);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [linkMode, setLinkMode] = useState(!uploadsEnabled || Boolean(initial.fileUrl && !initial.fileUrl.includes("blob.vercel-storage.com")));
  const coverInput = useRef<HTMLInputElement | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const pending = useRef<Partial<Product>>({});
  const timer = useRef<number | null>(null);
  const meta = PRODUCT_TYPES[p.type];
  const rules = useMemo(() => readBookingRules(p.booking ?? DEFAULT_BOOKING), [p.booking]);
  const issues = productSetupIssues(p, connectReady);
  const live = p.status === "PUBLISHED";
  const pageUrl = seller.handle ? `${PUBLIC_PROFILE_URL}/${seller.handle}/p/${p.slug}` : null;

  async function flush() {
    const body = pending.current;
    pending.current = {};
    if (!Object.keys(body).length) return;
    setSaving("saving");
    try {
      const res = await fetch(`/api/store/products/${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't save");
      setSaving("saved");
      if (json.product?.slug) setP((prev) => ({ ...prev, slug: json.product.slug }));
    } catch (e) {
      setSaving("error");
      toast.error(e instanceof Error ? e.message : "Couldn't save");
    }
  }

  function update(patch: Partial<Product>, now = false) {
    setP((prev) => ({ ...prev, ...patch }));
    pending.current = { ...pending.current, ...patch };
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(flush, now ? 0 : 700);
  }

  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (Object.keys(pending.current).length) e.preventDefault();
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, []);

  function setRules(next: Partial<BookingRules>) {
    update({ booking: { ...rules, ...next } });
  }

  async function togglePublish() {
    if (timer.current) window.clearTimeout(timer.current);
    await flush();
    setPublishing(true);
    try {
      const status = live ? "DRAFT" : "PUBLISHED";
      const res = await fetch(`/api/store/products/${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Couldn't publish");
      setP((prev) => ({ ...prev, status }));
      toast.success(status === "PUBLISHED" ? "Your product is live" : "Moved back to draft");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't publish");
    } finally {
      setPublishing(false);
    }
  }

  async function onCover(file?: File | null) {
    if (!file) return;
    try {
      update({ coverImage: await imageToDataUrl(file) }, true);
    } catch {
      toast.error("That image couldn't be read.");
    }
  }

  async function onFile(file?: File | null) {
    if (!file) return;
    setUploadPct(0);
    try {
      const blob = await upload(`store/${p.id}/${file.name}`, file, { access: "public", handleUploadUrl: "/api/store/upload", multipart: file.size > 20e6, onUploadProgress: (e) => setUploadPct(Math.round(e.percentage)) });
      update({ fileUrl: blob.url, fileName: file.name, fileSize: file.size }, true);
      toast.success("File uploaded");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadPct(null);
    }
  }

  const previewSlots = useMemo(() => (p.type === "BOOKING" ? bookingSlots(rules, p.durationMin ?? 30, []).slice(0, 7) : undefined), [p.type, rules, p.durationMin]);
  const timezones = useMemo(() => {
    try {
      return (Intl as unknown as { supportedValuesOf: (k: string) => string[] }).supportedValuesOf("timeZone");
    } catch {
      return [rules.timezone];
    }
  }, [rules.timezone]);

  const charges = p.type !== "LEAD_MAGNET";

  return (
    <div>
      {/* Top bar */}
      <div className="mb-6 rounded-[16px] border border-[#E3E5E7] bg-white">
        <div className="flex flex-wrap items-center gap-3 px-3 py-3 sm:px-4">
          <Link href="/dashboard/earn/products" className={buttonStyles.icon} aria-label="Back to products">
            <ArrowLeft size={18} />
          </Link>
          <ProductThumb type={p.type} cover={p.coverImage} size={38} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15.5px] font-medium text-[#151619]">{p.title || "Untitled product"}</p>
            <p className="flex items-center gap-1.5 text-[12.5px] text-[#80858C]">
              {meta.label} ·
              {saving === "saving" ? (
                <>
                  <Loader2 size={11} className="animate-spin" /> Saving…
                </>
              ) : saving === "error" ? (
                <span className="text-[#D93036]">Not saved</span>
              ) : (
                <>
                  <Check size={11} /> Saved
                </>
              )}
            </p>
          </div>
          <StatusPill status={p.status} needsSetup={issues.length > 0} />
          {live && pageUrl && (
            <a href={pageUrl} target="_blank" rel="noreferrer" className={buttonStyles.secondary}>
              View <ExternalLink size={15} />
            </a>
          )}
          <button type="button" onClick={togglePublish} disabled={publishing || (!live && issues.length > 0)} className={live ? buttonStyles.secondary : buttonStyles.primary} title={!live && issues.length ? issues.join(" · ") : undefined}>
            {publishing && <Loader2 size={16} className="animate-spin" />}
            {live ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div className="flex w-full min-w-0 flex-col gap-5">
          {issues.length > 0 && !live && (
            <div className="flex items-start gap-3 rounded-[14px] border border-[#F1DFB5] bg-[#FFFAF0] px-4 py-3.5 text-[14px] text-[#6B4A00]">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-[#C98A00]" />
              <div>
                <p className="font-medium">To publish, you still need to:</p>
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  {issues.map((i) => (
                    <li key={i}>
                      {i === "Connect Stripe to get paid" ? (
                        <Link href="/dashboard/earn/payouts" className="underline underline-offset-2">
                          {i}
                        </Link>
                      ) : (
                        i
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <Section title="Details" description="What people see on your product page.">
            <div>
              <span className={label}>Title</span>
              <input className={input} value={p.title} maxLength={120} onChange={(e) => update({ title: e.target.value })} />
            </div>
            <div>
              <span className={label}>Short line</span>
              <input className={input} value={p.subtitle ?? ""} maxLength={200} placeholder={p.type === "BOOKING" ? "A focused 30-minute session on your portfolio" : "One line that sells it"} onChange={(e) => update({ subtitle: e.target.value || null })} />
            </div>
            <div>
              <span className={label}>Description</span>
              <textarea className={cn(input, "h-auto min-h-[140px] py-3 leading-relaxed")} value={p.description ?? ""} maxLength={5000} placeholder="What's included, who it's for, what they'll get…" onChange={(e) => update({ description: e.target.value || null })} />
            </div>
            <div>
              <span className={label}>Cover image</span>
              {p.coverImage ? (
                <div className="relative w-fit">
                  <img src={p.coverImage} alt="" className="aspect-[16/10] w-72 rounded-[12px] border border-[#EDEEF0] object-cover" />
                  <div className="absolute right-2 top-2 flex gap-1.5">
                    <button type="button" className="grid size-8 place-items-center rounded-full bg-white text-[#151619]" onClick={() => coverInput.current?.click()} aria-label="Replace image">
                      <ImagePlus size={15} />
                    </button>
                    <button type="button" className="grid size-8 place-items-center rounded-full bg-white text-[#D93036]" onClick={() => update({ coverImage: null }, true)} aria-label="Remove image">
                      <X size={15} />
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => coverInput.current?.click()} className="flex aspect-[16/10] w-72 flex-col items-center justify-center gap-2 rounded-[12px] border border-dashed border-[#CDD1D7] text-[14px] text-[#696C72] transition-colors hover:border-[#151619] hover:text-[#151619]">
                  <ImagePlus size={22} strokeWidth={1.7} />
                  Add a cover
                </button>
              )}
              <input ref={coverInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={(e) => onCover(e.target.files?.[0])} />
            </div>
            <div>
              <span className={label}>Button text</span>
              <input className={input} value={p.buttonLabel ?? ""} maxLength={40} placeholder={meta.defaultButton} onChange={(e) => update({ buttonLabel: e.target.value || null })} />
            </div>
          </Section>

          {charges && (
            <Section title="Price" description={feePercent ? `Kompi keeps ${feePercent}% on the Free plan (0% on paid plans). Stripe's card fees apply.` : "You keep 100%. Stripe's card fees apply."}>
              {p.type !== "TIP" && (
                <Toggle on={p.payWhatYouWant} onChange={(v) => update({ payWhatYouWant: v, minPriceCents: v ? (p.minPriceCents ?? 0) : null })}>
                  Let buyers choose what to pay
                </Toggle>
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <span className={label}>{p.payWhatYouWant ? "Suggested amount" : "Price"}</span>
                  <MoneyInput cents={p.priceCents} currency={p.currency} onChange={(c) => update({ priceCents: c ?? 0 })} />
                  {!p.payWhatYouWant && p.priceCents === 0 && <p className="mt-1.5 text-[12.5px] text-[#80858C]">Free: buyers just enter their email.</p>}
                </div>
                {p.payWhatYouWant && (
                  <div>
                    <span className={label}>Minimum</span>
                    <MoneyInput cents={p.minPriceCents} currency={p.currency} onChange={(c) => update({ minPriceCents: c })} />
                  </div>
                )}
              </div>
              {p.priceCents > 0 && (
                <p className="text-[13px] text-[#696C72]">
                  You get about <span className="font-medium text-[#151619]">{formatMoney(Math.round(p.priceCents * (1 - feePercent / 100)), p.currency)}</span> per sale before Stripe’s card fee.
                </p>
              )}
            </Section>
          )}

          {(p.type === "DOWNLOAD" || p.type === "LEAD_MAGNET") && (
            <Section title={p.type === "DOWNLOAD" ? "The file" : "The freebie"} description="Buyers get it on the order page and by email.">
              {p.fileUrl ? (
                <div className="flex items-center gap-3 rounded-[12px] border border-[#E3E5E7] p-3">
                  <span className="grid size-10 place-items-center rounded-[10px] bg-[#F3F4F5] text-[#151619]">{linkMode ? <Link2 size={18} /> : <FileIcon size={18} />}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14.5px] font-medium text-[#151619]">{p.fileName || p.fileUrl}</p>
                    <p className="text-[12.5px] text-[#80858C]">{p.fileSize ? bytes(p.fileSize) : "Link"}</p>
                  </div>
                  <button type="button" className={buttonStyles.icon} aria-label="Remove file" onClick={() => update({ fileUrl: null, fileName: null, fileSize: null }, true)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : linkMode ? (
                <div>
                  <span className={label}>Link to your file</span>
                  <input className={input} placeholder="https://drive.google.com/…" defaultValue="" onBlur={(e) => e.target.value && update({ fileUrl: e.target.value, fileName: null, fileSize: null }, true)} />
                  <p className="mt-1.5 text-[12.5px] text-[#80858C]">Google Drive, Dropbox, Notion… make sure anyone with the link can open it.</p>
                </div>
              ) : (
                <button type="button" disabled={uploadPct !== null} onClick={() => fileInput.current?.click()} className="flex w-full flex-col items-center justify-center gap-2 rounded-[14px] border border-dashed border-[#CDD1D7] px-4 py-8 text-[14px] text-[#696C72] transition-colors hover:border-[#151619] hover:text-[#151619]">
                  {uploadPct !== null ? (
                    <>
                      <Loader2 size={22} className="animate-spin" /> Uploading… {uploadPct}%
                      <span className="h-1.5 w-48 overflow-hidden rounded-full bg-[#EDEEF0]">
                        <span className="block h-full bg-[#151619] transition-[width]" style={{ width: `${uploadPct}%` }} />
                      </span>
                    </>
                  ) : (
                    <>
                      <Upload size={22} strokeWidth={1.7} /> Upload a file <span className="text-[12.5px] text-[#A3A7AD]">PDF, ZIP, audio, video… up to 500 MB</span>
                    </>
                  )}
                </button>
              )}
              <input ref={fileInput} type="file" hidden onChange={(e) => onFile(e.target.files?.[0])} />
              {!p.fileUrl && uploadsEnabled && (
                <button type="button" className="text-[13.5px] font-medium text-[#3D5AFE]" onClick={() => setLinkMode((m) => !m)}>
                  {linkMode ? "Upload a file instead" : "Use a link instead"}
                </button>
              )}
              {p.type === "LEAD_MAGNET" && !p.fileUrl && (
                <div>
                  <span className={label}>…or a link they unlock</span>
                  <input className={input} value={p.accessUrl ?? ""} placeholder="https://…" onChange={(e) => update({ accessUrl: e.target.value || null })} />
                </div>
              )}
            </Section>
          )}

          {p.type === "PAID_LINK" && (
            <Section title="Private link" description="Only buyers see this, on their order page and in their email.">
              <input className={input} value={p.accessUrl ?? ""} placeholder="https://your-community.com/invite/…" onChange={(e) => update({ accessUrl: e.target.value || null })} />
            </Section>
          )}

          {p.type === "BOOKING" && (
            <Section title="Availability" description="People can book any open slot inside these hours.">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <span className={label}>Length</span>
                  <select className={input} value={p.durationMin ?? 30} onChange={(e) => update({ durationMin: Number(e.target.value) })}>
                    {[15, 20, 30, 45, 60, 90, 120].map((m) => (
                      <option key={m} value={m}>
                        {m} minutes
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <span className={label}>Your time zone</span>
                  <select className={input} value={rules.timezone} onChange={(e) => setRules({ timezone: e.target.value })}>
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz.replace(/_/g, " ")}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="divide-y divide-[#EDEEF0] rounded-[12px] border border-[#E3E5E7]">
                {WEEKDAYS.map((d) => {
                  const ranges = rules.days[d] ?? [];
                  const setRanges = (next: [string, string][]) => setRules({ days: { ...rules.days, [d]: next } });
                  return (
                    <div key={d} className="flex flex-wrap items-start gap-3 px-3.5 py-2.5">
                      <label className="flex h-9 w-32 items-center gap-2.5 text-[14.5px] text-[#151619]">
                        <input type="checkbox" className="size-4 accent-[#151619]" checked={ranges.length > 0} onChange={(e) => setRanges(e.target.checked ? [["09:00", "17:00"]] : [])} />
                        {DAY_LABEL[d]}
                      </label>
                      {ranges.length ? (
                        <div className="flex flex-col gap-2">
                          {ranges.map((range, i) => (
                            <div key={i} className="flex items-center gap-2 text-[14px] text-[#80858C]">
                              <input type="time" className="h-9 rounded-[8px] border border-[#E3E5E7] px-2 text-[#151619]" value={range[0]} onChange={(e) => setRanges(ranges.map((r, j) => (j === i ? [e.target.value, r[1]] : r)))} />
                              to
                              <input type="time" className="h-9 rounded-[8px] border border-[#E3E5E7] px-2 text-[#151619]" value={range[1]} onChange={(e) => setRanges(ranges.map((r, j) => (j === i ? [r[0], e.target.value] : r)))} />
                              {ranges.length > 1 && (
                                <button type="button" className="grid size-8 place-items-center rounded-[8px] text-[#A3A7AD] hover:bg-[#F3F4F5] hover:text-[#151619]" aria-label="Remove these hours" onClick={() => setRanges(ranges.filter((_, j) => j !== i))}>
                                  <X size={15} />
                                </button>
                              )}
                              {i === ranges.length - 1 && ranges.length < 4 && (
                                <button type="button" className="h-8 rounded-[8px] px-2 text-[13px] font-medium text-[#3D5AFE] hover:bg-[#F3F4F5]" onClick={() => setRanges([...ranges, [range[1] < "18:00" ? "18:00" : range[1], range[1] < "18:00" ? "20:00" : "23:00"]])}>
                                  + Add hours
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="flex h-9 items-center text-[14px] text-[#A3A7AD]">Unavailable</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <span className={label}>Minimum notice</span>
                  <select className={input} value={rules.noticeHours} onChange={(e) => setRules({ noticeHours: Number(e.target.value) })}>
                    {[0, 2, 4, 12, 24, 48, 72].map((h) => (
                      <option key={h} value={h}>
                        {h === 0 ? "None" : h < 24 ? `${h} hours` : `${h / 24} day${h > 24 ? "s" : ""}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className={label}>Book up to</span>
                  <select className={input} value={rules.daysAhead} onChange={(e) => setRules({ daysAhead: Number(e.target.value) })}>
                    {[7, 14, 21, 30, 60, 90].map((d) => (
                      <option key={d} value={d}>
                        {d} days ahead
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <span className={label}>Gap between calls</span>
                  <select className={input} value={rules.bufferMin} onChange={(e) => setRules({ bufferMin: Number(e.target.value) })}>
                    {[0, 5, 10, 15, 30, 60].map((m) => (
                      <option key={m} value={m}>
                        {m ? `${m} minutes` : "None"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <span className={label}>Where you’ll meet</span>
                <input className={input} value={rules.location ?? ""} placeholder="Zoom / Google Meet link, phone or address" onChange={(e) => setRules({ location: e.target.value })} />
                <p className="mt-1.5 text-[12.5px] text-[#80858C]">Shown after booking and added to the calendar invite.</p>
              </div>
            </Section>
          )}

          <Section title="After purchase" description="A note on the order page and in the email.">
            <textarea
              className={cn(input, "h-auto min-h-[100px] py-3 leading-relaxed")}
              value={p.thankYouNote ?? ""}
              maxLength={2000}
              placeholder={p.type === "BOOKING" ? "Looking forward to it! Bring your questions…" : "Thanks so much! Here's how to get the most from it…"}
              onChange={(e) => update({ thankYouNote: e.target.value || null })}
            />
          </Section>

          <Section title="Page address">
            <label className="flex h-11 items-center rounded-[10px] border border-[#E3E5E7] bg-white pl-3.5 text-[15px] focus-within:border-[#151619]">
              <span className="shrink-0 text-[#80858C]">{seller.handle ? `kompi.app/${seller.handle}/p/` : "…/p/"}</span>
              <input key={p.slug} className="min-w-0 flex-1 bg-transparent pr-3.5 text-[#151619] outline-none" defaultValue={p.slug} onBlur={(e) => e.target.value !== p.slug && update({ slug: slugify(e.target.value) }, true)} />
            </label>
            {!seller.handle && <p className="text-[12.5px] text-[#80858C]">Publish a Card first so your products have a public address.</p>}
            <p className="text-[13px] text-[#696C72]">
              To show this on your Card, open the{" "}
              <Link href="/dashboard/cards" className="font-medium text-[#151619] underline underline-offset-2">
                Card editor
              </Link>{" "}
              and add it under Products.
            </p>
          </Section>
        </div>

        <aside aria-label="Product preview" className="hidden xl:block">
          <div className="sticky top-24">
            <p className="mb-3 text-[13.5px] text-[#80858C]">Preview</p>
            <PhonePreview>
              {() => (
                <ProductView
                  preview
                  previewSlots={previewSlots}
                  look={look}
                  seller={seller}
                  product={{ ...p, fileName: p.fileName }}
                />
              )}
            </PhonePreview>
          </div>
        </aside>
      </div>
    </div>
  );
}
