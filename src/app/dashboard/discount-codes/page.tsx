// src/app/dashboard/discount-codes/page.tsx
import type { Metadata } from "next";
import { DiscountCodesTable } from "@/components/discounts/discount-codes-table";

export const metadata: Metadata = {
  title: "Discount codes – Kompi",
};

export default function DiscountCodesPage() {
  return (
    <main className="wf-dashboard-main flex flex-col gap-6">
      <DiscountCodesTable />
    </main>
  );
}
