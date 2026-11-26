import type { ReactNode } from "react";
import { SettingsSection, SettingsTabs } from "@/components/dashboard/settings/settings-tabs";

export const metadata = { title: "Settings" };

// The dashboard shell comes from the (dashboard) route group; this adds the settings tabs.
export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <SettingsTabs />
      <SettingsSection>{children}</SettingsSection>
    </div>
  );
}
