import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default function KCardsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
