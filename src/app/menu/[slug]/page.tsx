// src/app/menu/[slug]/page.tsx
// Thin wrapper that reuses the public QR menu page at /m/[slug]

export const dynamic = "force-dynamic";

import MPage from "@/app/m/[slug]/page";

type PageProps = {
  params?: Promise<{ slug: string }>;
};

export default async function MenuSlugPage({ params }: PageProps) {
  const resolved = (await params) ?? { slug: "" };
  return <MPage params={resolved} />;
}
