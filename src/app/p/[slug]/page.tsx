/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

type Params = { slug: string } | Promise<{ slug: string }>;

async function resolve(
  params: Params
): Promise<{ slug: string }> {
  return params instanceof Promise ? await params : params;
}

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await resolve(props.params);
  const bio = await prisma.bioPage.findFirst({
    where: { slug },
    orderBy: { updatedAt: "desc" },
  });

  if (!bio) {
    return {
      title: "Page not found",
      description: "This public page does not exist.",
    };
  }

  const title = bio.title || "Links";
  const description =
    bio.description || "All important links in one place.";
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/p/${slug}`,
      type: "website",
    },
  };
}

export default async function PublicBioPage(props: {
  params: Params;
}) {
  const { slug } = await resolve(props.params);

  const bio = await prisma.bioPage.findFirst({
    where: { slug },
    orderBy: { updatedAt: "desc" },
  });

  if (!bio) {
    notFound();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-800 px-4">
      <Card className="w-full max-w-md p-6 bg-white/95 backdrop-blur">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-neutral-900">
            {bio.title || "Links"}
          </h1>
          {bio.description && (
            <p className="text-sm text-neutral-600">
              {bio.description}
            </p>
          )}
        </div>
      </Card>
    </main>
  );
}
