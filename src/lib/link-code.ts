import { ApiError } from "./api-errors";
export function normalizeLinkCode(raw: string) { const code = raw.trim(); if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]{2,47}$/.test(code)) throw new ApiError("Use 3–48 letters, numbers, hyphens or underscores for your short link."); return code; }
