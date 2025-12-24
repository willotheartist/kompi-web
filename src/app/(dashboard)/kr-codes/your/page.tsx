// src/app/(dashboard)/kr-codes/your/page.tsx
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";
import ClientActions from "./your-client-actions";

export const dynamic = "force-dynamic";

type CodeRow = {
  id: string;
  title: string | null;
  destination: string;
  createdAt: Date;
  type: string | null;
  shortCodeId: string | null;
  totalScans: number;
};

export default async function YourKRCodesPage() {
  const user = await requireUser();
  const workspace = await getActiveWorkspace(user.id, null);

  if (!workspace) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No workspace found.
      </div>
    );
  }

  const codes = await prisma.kRCode.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: "desc" },
    take: 25,
    select: {
      id: true,
      title: true,
      destination: true,
      createdAt: true,
      type: true,
      shortCodeId: true,
    },
  });

  const linkIds = codes
    .map((c) => c.shortCodeId)
    .filter((id): id is string => Boolean(id));

  const scanCounts =
    linkIds.length === 0
      ? []
      : await prisma.clickEvent.groupBy({
          by: ["linkId"],
          where: { linkId: { in: linkIds } },
          _count: { _all: true },
        });

  const scansByLinkId = new Map<string, number>(
    scanCounts.map((e) => [e.linkId, e._count._all]),
  );

  const rows: CodeRow[] = codes.map((c) => ({
    ...c,
    totalScans: c.shortCodeId ? scansByLinkId.get(c.shortCodeId) ?? 0 : 0,
  }));

  const totalScans = rows.reduce((sum, r) => sum + r.totalScans, 0);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Your Kompi Codes</h1>
        <p className="text-sm text-muted-foreground">
          Total codes: {rows.length} · Total scans: {totalScans}
        </p>
      </header>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed p-6 text-center">
          <Link
            href="/kr-codes"
            className="inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm text-white"
          >
            Create your first Kompi Code
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((code) => (
            <div
              key={code.id}
              className="flex items-center justify-between rounded-xl bg-white p-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={`/api/kr-codes/${code.id}/thumb.png`}
                  alt="QR"
                  width={64}
                  height={64}
                  className="rounded-md"
                />

                <div className="min-w-0">
                  <div className="truncate font-medium">
                    {code.title ?? "Untitled Kompi Code"}
                  </div>
                  <div className="truncate text-xs text-blue-600">
                    {code.destination}
                  </div>
                </div>
              </div>

              <ClientActions id={code.id} scans={code.totalScans} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
