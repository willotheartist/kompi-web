import type { ReactNode } from "react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

// Pattern: Shell/SettingsLayout
export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
