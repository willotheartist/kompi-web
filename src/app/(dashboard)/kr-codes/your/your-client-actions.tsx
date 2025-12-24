// src/app/(dashboard)/kr-codes/your/your-client-actions.tsx
"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function ClientActions({
  id,
  scans,
}: {
  id: string;
  scans: number;
}) {
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this Kompi Code?")) return;
    setLoading(true);
    await fetch(`/api/kr-codes/${id}`, { method: "DELETE" });
    location.reload();
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="text-right">
        <div className="text-xs text-muted-foreground">Scans</div>
        <div className="font-medium">{scans}</div>
      </div>

      <Link
        href={`/kr-codes/${id}`}
        className="rounded-full bg-gray-100 px-4 py-1"
      >
        Analytics
      </Link>

      <button
        onClick={onDelete}
        disabled={loading}
        className="text-red-500 hover:opacity-80"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
