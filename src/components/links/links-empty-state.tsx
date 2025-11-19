"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LinksEmptyState({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const goToCreate = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (workspaceId) params.set("workspaceId", workspaceId);
    const qs = params.toString();
    const href = `/links/new${qs ? `?${qs}` : ""}`;
    router.push(href);
  };

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center text-center px-4">
      <h2 className="text-xl font-semibold text-[color:var(--color-text)]">
        Ready to create your first link?
      </h2>
      <p className="mt-2 max-w-md text-sm text-[color:var(--color-subtle)]">
        Shorten a URL and start tracking clicks in this workspace. You can add
        UTM tags, Kompi Codes™, and more on the next screen.
      </p>
      <Button
        className="mt-6 rounded-full px-6 py-2 text-sm font-medium"
        onClick={goToCreate}
        style={{
          backgroundColor: "var(--color-accent)",
          color: "var(--color-text)",
        }}
      >
        Create your first link
      </Button>
    </div>
  );
}
