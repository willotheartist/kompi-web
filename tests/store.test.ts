import assert from "node:assert/strict";
import { test } from "node:test";
import { bookingSlots, formatMoney, productSetupIssues, readBookingRules, storeFeeCents, zonedTime } from "../src/lib/store";
import { isPublicApi } from "../src/lib/route-policy";

test("Kompi takes 5% on Free and nothing on paid plans", () => {
  assert.equal(storeFeeCents(1000, "FREE"), 50);
  assert.equal(storeFeeCents(1999, null), 100);
  assert.equal(storeFeeCents(1000, "STARTER"), 0);
  assert.equal(storeFeeCents(1000, "CREATOR"), 0);
});

test("money formats without stray decimals", () => {
  assert.equal(formatMoney(1500, "gbp"), "£15");
  assert.equal(formatMoney(1250, "gbp"), "£12.50");
});

test("zoned times respect daylight saving", () => {
  // 09:00 in London is 08:00 UTC in summer and 09:00 UTC in winter.
  assert.equal(new Date(zonedTime(2026, 7, 1, 9, 0, "Europe/London")).toISOString(), "2026-07-01T08:00:00.000Z");
  assert.equal(new Date(zonedTime(2026, 12, 1, 9, 0, "Europe/London")).toISOString(), "2026-12-01T09:00:00.000Z");
  assert.equal(new Date(zonedTime(2026, 12, 1, 9, 0, "America/New_York")).toISOString(), "2026-12-01T14:00:00.000Z");
});

test("booking slots skip notice period, taken times and closed days", () => {
  const rules = readBookingRules({ timezone: "Europe/London", days: { mon: [["09:00", "11:00"]] }, noticeHours: 0, daysAhead: 7, bufferMin: 0 });
  const now = Date.UTC(2026, 11, 6, 12); // Sunday 6 Dec 2026, noon
  const monday9 = Date.UTC(2026, 11, 7, 9);
  const days = bookingSlots(rules, 30, [{ start: monday9, end: monday9 + 30 * 60_000 }], now);
  assert.equal(days.length, 1);
  assert.deepEqual(days[0].slots.map((s) => s.label), ["09:30", "10:00", "10:30"]);
});

test("products need the right pieces before they can be published", () => {
  const base = { title: "Guide", priceCents: 1500, payWhatYouWant: false };
  assert.deepEqual(productSetupIssues({ ...base, type: "DOWNLOAD", fileUrl: "https://x.test/a.pdf" }, true), []);
  assert.ok(productSetupIssues({ ...base, type: "DOWNLOAD" }, true).includes("Upload a file or add a file link"));
  assert.ok(productSetupIssues({ ...base, type: "DOWNLOAD", fileUrl: "https://x.test/a.pdf" }, false).includes("Connect Stripe to get paid"));
  // Free things don't need Stripe.
  assert.deepEqual(productSetupIssues({ ...base, priceCents: 0, type: "LEAD_MAGNET", accessUrl: "https://x.test" }, false), []);
});

test("buyers can reach store endpoints without signing in", () => {
  assert.equal(isPublicApi("/api/store/checkout", "POST"), true);
  assert.equal(isPublicApi("/api/store/slots", "GET"), true);
  assert.equal(isPublicApi("/api/store/download/abc", "GET"), true);
  assert.equal(isPublicApi("/api/stripe/connect-webhook", "POST"), true);
  assert.equal(isPublicApi("/api/store/products", "POST"), false);
  assert.equal(isPublicApi("/api/store/connect", "POST"), false);
});

test("discounts take money off, and tiny leftovers become free", async () => {
  const { discountAmount, normalizeCode } = await import("../src/lib/store");
  assert.equal(discountAmount(2000, { percentOff: 25, amountOffCents: null }), 500);
  assert.equal(discountAmount(2000, { percentOff: null, amountOffCents: 500 }), 500);
  assert.equal(discountAmount(400, { percentOff: null, amountOffCents: 1000 }), 400);
  // 30p left is under Stripe's minimum, so the whole price comes off.
  assert.equal(discountAmount(1000, { percentOff: 97, amountOffCents: null }), 1000);
  assert.equal(normalizeCode(" launch 20! "), "LAUNCH20");
});
