import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import KCardsPage, { type KCardsInitialData } from "@/components/k-cards/KCardsPage";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function KCardsRoutePage() {
  const user = await requireUser();

  const kcard = await prisma.kCard.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });

  const initialData = (kcard?.data ?? null) as KCardsInitialData | null;

  return (
    <DashboardLayout>
      <KCardsPage initialData={initialData} />
    </DashboardLayout>
  );
}
