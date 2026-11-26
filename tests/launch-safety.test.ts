import { test } from "node:test";
import assert from "node:assert/strict";
import { safeReturnPath } from "../src/lib/urls";
import { validateHandle } from "../src/lib/handles";
import { safePublicHref, vcardEscape, cardContentSchema } from "../src/lib/card-content";
import { isPrivatePage, isPublicApi } from "../src/lib/route-policy";
import { getPlanLimits } from "../src/lib/plan-limits";
test("return URLs cannot navigate to another origin", () => {
 for (const url of ["//evil.test", "https://evil.test", "/\\evil.test", "/ok\nLocation: https://evil.test"]) assert.equal(safeReturnPath(url), "/dashboard");
 assert.equal(safeReturnPath("/kr-codes?krcodeId=123"), "/kr-codes?krcodeId=123");
});
test("handles cannot shadow app routes and are normalized", () => {
 for (const slug of ["app", "dashboard", "api", "legal", "ab", "has space", "-hello"]) assert.throws(() => validateHandle(slug));
 assert.equal(validateHandle("@Will-Mattey"), "will-mattey");
});
test("legacy card destinations reject script and embedded-data schemes", () => {
 for(const href of ["javascript:alert(1)", "data:text/html,<h1>x</h1>", "file:///etc/passwd", undefined, null]) assert.equal(safePublicHref(href), null);
 assert.equal(safePublicHref("example.com"), "https://example.com/");
 assert.equal(safePublicHref("mailto:hello@example.com"), "mailto:hello@example.com");
 assert.equal(cardContentSchema.safeParse({ links: [{ id:"1", title:"x", url:"javascript:alert(1)", enabled:true }] }).success, false);
});
test("vCard values cannot inject additional fields", () => { assert.equal(vcardEscape("Name\nEMAIL:other@example.com"), "Name\\nEMAIL:other@example.com"); });
test("private navigation is protected while a guest can use the QR studio", () => {
 for(const path of ["/dashboard", "/dashboard/cards", "/k-cards", "/links/123", "/kr-codes/your"]) assert.equal(isPrivatePage(path), true);
 assert.equal(isPrivatePage("/kr-codes"), false);
 assert.equal(isPublicApi("/api/k-cards/clicks", "GET"), false);
 assert.equal(isPublicApi("/api/k-cards/clicks", "POST"), true);
 assert.equal(isPublicApi("/api/bio/bootstrap", "GET"), false);
 assert.equal(isPublicApi("/api/debug/headers", "GET"), false);
});
test("unknown tiers cannot grant paid quotas", () => { assert.deepEqual(getPlanLimits("admin"), getPlanLimits("FREE")); assert.ok(getPlanLimits("BUSINESS").links > getPlanLimits("CREATOR").links); });
