import type { ReactNode } from "react";
import { requireUser } from "@/lib/auth";
export const metadata = { robots: { index: false, follow: false } };
export default async function AuthenticatedDashboard({ children }: { children: ReactNode }) { await requireUser(); return children; }
