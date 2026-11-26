import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import vm from "node:vm";
import ts from "typescript";
import * as errors from "../src/lib/api-errors";
import * as limits from "../src/lib/plan-limits";
const require = createRequire(import.meta.url);
function harness(signedIn = true) {
  let cards = [{ id: "mine", userId: "owner", workspaceId: "ws" }, { id: "theirs", userId: "someone-else", workspaceId: "other" }];
  type Filter = { where: { id?: string; userId: string } };
  type Card = typeof cards[number];
  type Db = { $executeRaw: () => Promise<number>; kCard: { findFirst: (args: Filter) => Promise<Card | null>; deleteMany: (args: Filter) => Promise<{count:number}> }; $transaction: <T>(fn: (tx: Db) => Promise<T>) => Promise<T> };
  const prisma: Db = {
    $executeRaw: async () => 0,
    kCard: {
      findFirst: async ({ where }: Filter) => cards.find(card => card.userId === where.userId && (!where.id || card.id === where.id)) || null,
      deleteMany: async ({ where }: Filter) => { const before = cards.length; cards = cards.filter(card => !(card.userId === where.userId && card.id === where.id)); return { count: before - cards.length }; },
    },
    $transaction: async <T>(fn: (tx: Db) => Promise<T>): Promise<T> => fn(prisma),
  };
  const mocks: Record<string, unknown> = { "@/lib/auth": { requireUser: async () => { if (!signedIn) throw new errors.ApiError("Sign in", 401); return { id: "owner" }; } }, "@/lib/prisma": { prisma }, "./prisma": { prisma }, "./api-errors": errors, "@/lib/api-errors": errors, "./auth": {}, "./plan-limits": limits, "@/lib/card-content": {} };
  function load(path: string) { const exports: Record<string, unknown> = {}; const source = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText; vm.runInNewContext(source, { exports, require: (id: string) => id in mocks ? mocks[id] : require(id), URL, Response, Request, console }); return exports; }
  mocks["@/lib/card-service"] = load("../src/lib/card-service.ts");
  const api = load("../src/app/api/k-cards/route.ts") as { DELETE: (req: Request) => Promise<Response> };
  return { remove: (id = "") => api.DELETE(new Request(`https://kompi.app/api/k-cards?cardId=${id}`, { method: "DELETE" })), remaining: () => cards.map(card => card.id) };
}
test("Card deletion rejects anonymous requests and another owner's ID", async () => { assert.equal((await harness(false).remove("mine")).status, 401); const app = harness(); assert.equal((await app.remove("theirs")).status, 404); assert.deepEqual(app.remaining(), ["mine", "theirs"]); });
test("Card deletion requires an explicit ID and removes only that owner's Card", async () => { const app = harness(); assert.equal((await app.remove()).status, 400); assert.equal((await app.remove("mine")).status, 200); assert.deepEqual(app.remaining(), ["theirs"]); assert.equal((await app.remove("mine")).status, 404); });
