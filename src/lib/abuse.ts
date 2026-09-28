// src/lib/abuse.ts
// Limits for brand-new accounts, which is where almost all short-link abuse comes from.
import { prisma } from "./prisma";

const NEW_ACCOUNT_DAYS = 7;
const NEW_ACCOUNT_DAILY_LINKS = 5;

/** Returns an error message if this user may not create another link right now. */
export async function checkLinkCreationAllowed(user: {
  id: string;
  createdAt: Date;
  bannedAt: Date | null;
}): Promise<string | null> {
  if (user.bannedAt) return "This account has been suspended.";

  const ageMs = Date.now() - user.createdAt.getTime();
  if (ageMs > NEW_ACCOUNT_DAYS * 24 * 60 * 60 * 1000) return null;

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recent = await prisma.link.count({
    where: { workspace: { ownerId: user.id }, createdAt: { gte: since } },
  });

  if (recent >= NEW_ACCOUNT_DAILY_LINKS) {
    return `New accounts can create up to ${NEW_ACCOUNT_DAILY_LINKS} links per day. Please try again tomorrow.`;
  }
  return null;
}
