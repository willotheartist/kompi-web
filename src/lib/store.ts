// Kompi store: shared rules for products, prices, fees and booking slots.
// Safe to import from client components (no server-only imports here).

export type ProductTypeId = "DOWNLOAD" | "LEAD_MAGNET" | "BOOKING" | "PAID_LINK" | "TIP";

export const PRODUCT_TYPES: Record<ProductTypeId, { label: string; short: string; description: string; paid: boolean; defaultButton: string; defaultTitle: string }> = {
  DOWNLOAD: { label: "Digital download", short: "Download", description: "Sell files like guides, presets, templates or music. Buyers get a download link right away.", paid: true, defaultButton: "Buy now", defaultTitle: "My digital product" },
  LEAD_MAGNET: { label: "Free lead magnet", short: "Lead magnet", description: "Give away a freebie in exchange for an email. Every signup lands in your subscribers.", paid: false, defaultButton: "Get it free", defaultTitle: "Free guide" },
  BOOKING: { label: "Booking / 1:1 call", short: "Booking", description: "Let people book and pay for a call or session at times that suit you.", paid: true, defaultButton: "Book a call", defaultTitle: "1:1 call" },
  PAID_LINK: { label: "Paid link", short: "Paid link", description: "Charge for access to a private link: a community, video, course or Notion page.", paid: true, defaultButton: "Get access", defaultTitle: "Private access" },
  TIP: { label: "Tip jar", short: "Tips", description: "Let fans support you with a pay-what-you-want tip.", paid: true, defaultButton: "Send a tip", defaultTitle: "Buy me a coffee" },
};

export const CURRENCIES = ["gbp", "usd", "eur", "cad", "aud"] as const;
export type CurrencyId = (typeof CURRENCIES)[number];

/** Kompi's cut of each sale: 5% on Free, nothing on paid plans. */
export const STORE_FEE_PERCENT_FREE = 5;
export function storeFeePercent(plan?: string | null) {
  return !plan || plan === "FREE" ? STORE_FEE_PERCENT_FREE : 0;
}
export function storeFeeCents(amountCents: number, plan?: string | null) {
  return Math.round((amountCents * storeFeePercent(plan)) / 100);
}

/** Stripe's minimum charge is roughly 30p / 50¢. */
export const MIN_CHARGE_CENTS = 50;

export function formatMoney(cents: number, currency = "gbp") {
  const whole = cents % 100 === 0;
  try {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: currency.toUpperCase(), minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: 2 }).format(cents / 100);
  } catch {
    return `${(cents / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}

export function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "product"
  );
}

// ---------------- Bookings ----------------

export type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
export const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
export type BookingRules = {
  timezone: string;
  days: Partial<Record<Weekday, [string, string][]>>;
  noticeHours: number;
  daysAhead: number;
  bufferMin: number;
  location?: string;
};

export const DEFAULT_BOOKING: BookingRules = {
  timezone: "Europe/London",
  days: { mon: [["09:00", "17:00"]], tue: [["09:00", "17:00"]], wed: [["09:00", "17:00"]], thu: [["09:00", "17:00"]], fri: [["09:00", "17:00"]] },
  noticeHours: 12,
  daysAhead: 21,
  bufferMin: 0,
};

export function readBookingRules(raw: unknown): BookingRules {
  const r = (raw && typeof raw === "object" ? raw : {}) as Partial<BookingRules>;
  const days: BookingRules["days"] = {};
  for (const d of WEEKDAYS) {
    const ranges = Array.isArray(r.days?.[d]) ? r.days![d]! : [];
    const ok = ranges.filter((x) => Array.isArray(x) && /^\d\d:\d\d$/.test(x[0]) && /^\d\d:\d\d$/.test(x[1]) && x[0] < x[1]).slice(0, 4);
    if (ok.length) days[d] = ok as [string, string][];
  }
  let timezone = typeof r.timezone === "string" ? r.timezone : DEFAULT_BOOKING.timezone;
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone: timezone });
  } catch {
    timezone = DEFAULT_BOOKING.timezone;
  }
  const num = (v: unknown, d: number, min: number, max: number) => (typeof v === "number" && Number.isFinite(v) ? Math.max(min, Math.min(max, Math.round(v))) : d);
  return {
    timezone,
    days: raw ? days : DEFAULT_BOOKING.days,
    noticeHours: num(r.noticeHours, DEFAULT_BOOKING.noticeHours, 0, 24 * 14),
    daysAhead: num(r.daysAhead, DEFAULT_BOOKING.daysAhead, 1, 90),
    bufferMin: num(r.bufferMin, 0, 0, 240),
    location: typeof r.location === "string" ? r.location.slice(0, 500) : undefined,
  };
}

/** Offset (ms) of `tz` from UTC at instant `t`. */
function tzOffset(t: number, tz: string) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(new Date(t));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return Date.UTC(get("year"), get("month") - 1, get("day"), get("hour") % 24, get("minute"), get("second")) - Math.floor(t / 1000) * 1000;
}

/** The UTC instant for a wall-clock time in `tz`. */
export function zonedTime(y: number, m: number, d: number, hh: number, mm: number, tz: string) {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const first = guess - tzOffset(guess, tz);
  return first - (tzOffset(first, tz) - tzOffset(guess, tz));
}

function localDateParts(t: number, tz: string) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }).formatToParts(new Date(t));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { y: Number(get("year")), m: Number(get("month")), d: Number(get("day")), wd: get("weekday").slice(0, 3).toLowerCase() as Weekday };
}

export type SlotDay = { date: string; label: string; slots: { start: string; label: string }[] };

/**
 * Bookable start times, grouped by the seller's local day.
 * `taken` are start instants (ms) of live orders.
 */
export function bookingSlots(rules: BookingRules, durationMin: number, taken: { start: number; end: number }[], now = Date.now()): SlotDay[] {
  const out: SlotDay[] = [];
  const dur = Math.max(5, durationMin) * 60_000;
  const step = Math.max(15, Math.min(durationMin, 60)) * 60_000;
  const earliest = now + rules.noticeHours * 3_600_000;
  const buffer = rules.bufferMin * 60_000;
  const dayFmt = new Intl.DateTimeFormat("en-GB", { timeZone: rules.timezone, weekday: "short", day: "numeric", month: "short" });
  const timeFmt = new Intl.DateTimeFormat("en-GB", { timeZone: rules.timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  for (let i = 0; i <= rules.daysAhead; i++) {
    const { y, m, d, wd } = localDateParts(now + i * 86_400_000, rules.timezone);
    const ranges = rules.days[wd] ?? [];
    const slots: SlotDay["slots"] = [];
    for (const [a, b] of ranges) {
      const [ah, am] = a.split(":").map(Number);
      const [bh, bm] = b.split(":").map(Number);
      const startT = zonedTime(y, m, d, ah, am, rules.timezone);
      const endT = zonedTime(y, m, d, bh, bm, rules.timezone);
      for (let t = startT; t + dur <= endT; t += step) {
        if (t < earliest) continue;
        const clash = taken.some((o) => t < o.end + buffer && t + dur + buffer > o.start);
        if (!clash) slots.push({ start: new Date(t).toISOString(), label: timeFmt.format(new Date(t)) });
      }
    }
    const date = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (slots.length && !out.some((o) => o.date === date)) out.push({ date, label: dayFmt.format(new Date(zonedTime(y, m, d, 12, 0, rules.timezone))), slots });
  }
  return out;
}

export function formatBookingTime(start: Date | string, tz: string, durationMin?: number | null) {
  const s = new Date(start);
  const day = new Intl.DateTimeFormat("en-GB", { timeZone: tz, weekday: "long", day: "numeric", month: "long" }).format(s);
  const t = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZoneName: "short" }).format(s);
  return `${day} at ${t}${durationMin ? ` · ${durationMin} min` : ""}`;
}

// ---------------- Setup checks ----------------

export type ProductLike = {
  type: ProductTypeId;
  title: string;
  priceCents: number;
  payWhatYouWant: boolean;
  minPriceCents?: number | null;
  fileUrl?: string | null;
  accessUrl?: string | null;
  durationMin?: number | null;
  booking?: unknown;
};

/** What still needs doing before a product can be sold. Empty means ready. */
export function productSetupIssues(p: ProductLike, connectReady: boolean): string[] {
  const issues: string[] = [];
  if (!p.title.trim()) issues.push("Add a title");
  const charges = p.type !== "LEAD_MAGNET" && (p.payWhatYouWant ? (p.minPriceCents ?? 0) > 0 || p.priceCents > 0 : p.priceCents > 0);
  if (p.type !== "LEAD_MAGNET" && !p.payWhatYouWant && p.priceCents > 0 && p.priceCents < MIN_CHARGE_CENTS) issues.push("Set a price of at least 50p");
  if (charges && !connectReady) issues.push("Connect Stripe to get paid");
  if (p.type === "DOWNLOAD" && !p.fileUrl) issues.push("Upload a file or add a file link");
  if (p.type === "LEAD_MAGNET" && !p.fileUrl && !p.accessUrl) issues.push("Add the freebie: a file or a link");
  if (p.type === "PAID_LINK" && !p.accessUrl) issues.push("Add the private link buyers get");
  if (p.type === "BOOKING") {
    if (!p.durationMin) issues.push("Set how long the call is");
    const rules = readBookingRules(p.booking);
    if (!Object.keys(rules.days).length) issues.push("Add your available hours");
  }
  return issues;
}

// ---------------- Discounts ----------------

export type DiscountLike = { percentOff: number | null; amountOffCents: number | null };

/** How much a discount takes off a price. Prices under the card minimum become free. */
export function discountAmount(amountCents: number, d: DiscountLike) {
  const off = d.percentOff ? Math.round((amountCents * Math.min(100, Math.max(0, d.percentOff))) / 100) : Math.max(0, d.amountOffCents ?? 0);
  const left = Math.max(0, amountCents - off);
  // Anything below Stripe's minimum charge is rounded down to free.
  return left > 0 && left < MIN_CHARGE_CENTS ? amountCents : Math.min(amountCents, off);
}

export function discountLabel(d: DiscountLike, currency: string) {
  return d.percentOff ? `${d.percentOff}% off` : `${formatMoney(d.amountOffCents ?? 0, currency)} off`;
}

export function normalizeCode(code: string) {
  return code.trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "").slice(0, 32);
}
