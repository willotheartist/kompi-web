import type { Metadata } from "next";
import { ContactFormDetail } from "../contact-form-detail";

export const metadata: Metadata = {
  title: "Contact form – Kompi",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ContactFormDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="wf-dashboard-main flex flex-col gap-6">
      <ContactFormDetail formId={id} />
    </main>
  );
}
