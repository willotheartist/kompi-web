import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import KCardsPage, { type KCardsInitialData } from "@/components/k-cards/KCardsPage";
import { requireUser } from "@/lib/auth";
import { findOwnedCard, createCard } from "@/lib/card-service";
import { PUBLIC_PROFILE_URL } from "@/lib/urls";
export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default async function CardEditor({ searchParams }: { searchParams: Promise<{ cardId?: string }> }) { const user = await requireUser(); const { cardId } = await searchParams; const card = await findOwnedCard(user.id, cardId) || await createCard(user.id); return <DashboardLayout pageTitle="Kompi Cards"><KCardsPage cardId={card.id} initialData={card.data as KCardsInitialData} baseUrl={PUBLIC_PROFILE_URL} /></DashboardLayout>; }
