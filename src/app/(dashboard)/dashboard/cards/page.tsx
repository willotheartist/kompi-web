import { requireUser, getActiveWorkspace } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getPlanLimits, planName } from "@/lib/plan-limits";
import { PUBLIC_PROFILE_URL } from "@/lib/urls";
import { CardsClient } from "@/components/dashboard/cards/cards-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Kompi Cards" };

const thirtyDaysAgo = () => new Date(Date.now() - 30 * 864e5);

export default async function CardsPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id);
  const since = thirtyDaysAgo();
  const [cards, views, messages] = await Promise.all([
    prisma.kCard.findMany({ where: { userId: user.id, workspaceId: workspace?.id }, orderBy: { updatedAt: "desc" } }),
    workspace
      ? prisma.engagementEvent.groupBy({ by: ["value"], where: { workspaceId: workspace.id, type: "card_view", createdAt: { gte: since } }, _count: { _all: true } })
      : Promise.resolve([]),
    prisma.kCardMessage.groupBy({ by: ["kcardId"], where: { ownerId: user.id, isSpam: false }, _count: { _all: true } }),
  ]);
  const viewMap = new Map(views.map((v) => [v.value, v._count._all]));
  const messageMap = new Map(messages.map((m) => [m.kcardId, m._count._all]));
  const items = cards.map((card) => {
    const data = (card.data ?? {}) as { title?: string; subtitle?: string; avatarDataUrl?: string; theme?: { background?: string; accent?: string } };
    return {
      id: card.id,
      title: data.title || "Untitled Card",
      subtitle: data.subtitle || "",
      avatar: data.avatarDataUrl || null,
      slug: card.slug,
      published: Boolean(card.isPublic && card.slug),
      publicUrl: card.isPublic && card.slug ? `${PUBLIC_PROFILE_URL}/${card.slug}` : null,
      updatedAt: card.updatedAt.toISOString(),
      views: viewMap.get(card.id) ?? 0,
      messages: messageMap.get(card.id) ?? 0,
    };
  });
  return <CardsClient cards={items} workspaceId={workspace?.id} limit={getPlanLimits(workspace?.plan).kCards} planName={planName(workspace?.plan)} />;
}
