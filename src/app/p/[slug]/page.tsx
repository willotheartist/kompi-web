// src/app/p/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const bio = await prisma.bioPage.findFirst({
    where: { slug },
    orderBy: { updatedAt: "desc" },
  });

  if (!bio) {
    return {
      title: "Page not found",
      description: "This public page does not exist.",
      robots: { index: false, follow: false },
    };
  }

  const title = bio.title || "Links";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title,
    description: "All important links in one place.",
    openGraph: {
      title,
      description: "All important links in one place.",
      url: `${baseUrl}/p/${slug}`,
      type: "website",
    },
  };
}

export default async function PublicBioPage({ params }: PageProps) {
  const { slug } = await params;

  const bio = await prisma.bioPage.findFirst({
    where: { slug },
    orderBy: { updatedAt: "desc" },
  });

  if (!bio) notFound();

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-neutral-900 to-neutral-800 px-4">
      <Card className="w-full max-w-md p-6 bg-white/95 backdrop-blur">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-neutral-900">
            {bio.title || "Links"}
          </h1>
          <p className="text-sm text-neutral-600">
            All important links in one place.
          </p>
        </div>
      </Card>
    </main>
  );
}
