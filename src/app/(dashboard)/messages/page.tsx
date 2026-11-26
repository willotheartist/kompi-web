import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { InboxClient } from "@/components/dashboard/messages/inbox-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Messages" };

const weekAgo = () => Date.now() - 7 * 864e5;

// Server-rendered so the inbox arrives with the page instead of after a client fetch.
export default async function MessagesPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  const [items, cards] = await Promise.all([
    prisma.kCardMessage.findMany({
      where: { ownerId: user.id, isSpam: false, ...(workspace ? { OR: [{ workspaceId: workspace.id }, { workspaceId: null }] } : {}) },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: { id: true, name: true, email: true, phone: true, message: true, intentLabel: true, createdAt: true, kcardId: true },
    }),
    prisma.kCard.findMany({ where: { userId: user.id }, select: { id: true, data: true, slug: true } }),
  ]);
  const cardNames = Object.fromEntries(cards.map((c) => [c.id, ((c.data ?? {}) as { title?: string }).title || (c.slug ? `kompi.app/${c.slug}` : "Your Card")]));
  const since = weekAgo();
  return (
    <InboxClient
      thisWeek={items.filter((m) => m.createdAt.getTime() >= since).length}
      items={items.map((m) => ({ ...m, createdAt: m.createdAt.toISOString(), cardName: cardNames[m.kcardId] ?? "A deleted Card" }))}
    />
  );
}
