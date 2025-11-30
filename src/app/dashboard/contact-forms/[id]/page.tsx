// src/app/dashboard/contact-forms/[id]/page.tsx

import type { Metadata } from "next";
import { ContactFormDetail } from "../contact-form-detail";

export const metadata: Metadata = {
  title: "Contact form – Kompi",
};

type PageProps = {
  params: { id: string };
};

export default function ContactFormDetailPage({ params }: PageProps) {
  const { id } = params;

  return (
    <main className="wf-dashboard-main flex flex-col gap-6">
      <ContactFormDetail formId={id} />
    </main>
  );
}
