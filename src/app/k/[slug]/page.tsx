import PublicHandlePage, { generateMetadata as cardMetadata } from "@/app/[handle]/page";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return cardMetadata({ params: Promise.resolve({ handle: slug }) }); }
export default async function LegacyCard({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return PublicHandlePage({ params: Promise.resolve({ handle: slug }) }); }
