export function isPrivatePage(path: string) { return ["/dashboard", "/links", "/k-cards", "/qr-menus", "/settings", "/analytics", "/messages", "/builder", "/preview", "/kr-codes/your"].some(p => path === p || path.startsWith(`${p}/`)); }
export function isPublicApi(path: string, method: string) {
  if (path.startsWith("/api/auth/") || path.startsWith("/api/chat/public/")) return true;
  if (["/api/stripe/webhook", "/api/health", "/api/handles/check"].includes(path)) return true;
  if (method === "POST" && ["/api/k-cards/messages", "/api/k-cards/clicks", "/api/k-cards/views"].includes(path)) return true;
  return method === "POST" && /^\/api\/contact-forms\/[^/]+\/submissions$/.test(path);
}
