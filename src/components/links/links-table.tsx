"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface LinkItem {
  id: string;
  code: string;
  targetUrl: string;
  isActive: boolean;
  totalClicks: number;
}

interface LinksTableProps {
  links: LinkItem[];
  baseUrl: string;
}

export function LinksTable({ links, baseUrl }: LinksTableProps) {
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [qrId, setQrId] = useState<string | null>(null);

  const copy = (code: string) => {
    const url = `${baseUrl}/r/${code}`;
    navigator.clipboard.writeText(url);
    toast("Short link copied", { description: url });
  };

  const toggle = (link: LinkItem) => {
    startTransition(async () => {
      const res = await fetch(`/api/links/${link.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !link.isActive }),
      });

      if (!res.ok) {
        toast.error(await res.text());
        return;
      }

      toast.success("Link updated");
      window.location.reload();
    });
  };

  const confirmDelete = () => {
    if (!deleteId) return;
    const id = deleteId;

    startTransition(async () => {
      const res = await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        toast.error(await res.text());
        return;
      }

      toast.success("Link deleted");
      setDeleteId(null);
      window.location.reload();
    });
  };

  if (!links.length) {
    return (
      <Card className="p-6 mt-4 text-sm text-neutral-500">
        No links yet. Create your first one above.
      </Card>
    );
  }

  return (
    <Card className="mt-4 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-3 px-4">Short link</th>
            <th className="py-3 px-4">Target</th>
            <th className="py-3 px-4">Clicks</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {
            const shortUrl = `${baseUrl}/r/${link.code}`;
            const qrUrl = `/api/links/${link.id}/qr`;

            return (
              <tr key={link.id} className="border-b last:border-0">
                <td className="py-3 px-4 font-medium">
                  {shortUrl}
                </td>
                <td className="py-3 px-4 max-w-xs truncate">
                  {link.targetUrl}
                </td>
                <td className="py-3 px-4">
                  {link.totalClicks || 0}
                </td>
                <td className="py-3 px-4">
                  {link.isActive ? "Active" : "Inactive"}
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copy(link.code)}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    onClick={() => toggle(link)}
                  >
                    {link.isActive ? "Disable" : "Enable"}
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={`/links/${link.id}`}>Analytics</a>
                  </Button>

                  <Dialog
                    open={qrId === link.id}
                    onOpenChange={(open) =>
                      setQrId(open ? link.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        QR
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-sm">
                      <DialogHeader>
                        <DialogTitle>
                          Download QR code
                        </DialogTitle>
                        <DialogDescription>
                          Perfect for cards, posters, menus, and
                          packaging.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 flex flex-col items-center gap-3">
                        <div className="p-3 bg-white rounded-2xl border border-neutral-200 shadow-sm">
                          <Image
                            src={qrUrl}
                            alt="QR code"
                            width={192}
                            height={192}
                            className="w-48 h-48"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-1 text-xs text-neutral-500">
                          <span>{shortUrl}</span>
                          <a
                            href={qrUrl}
                            download={`${link.code}.png`}
                            className="mt-1 inline-flex items-center px-3 py-1.5 rounded-full border border-neutral-800 text-neutral-900 text-xs font-medium"
                          >
                            Download PNG
                          </a>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={deleteId === link.id}
                    onOpenChange={(open) =>
                      setDeleteId(open ? link.id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Delete this link?
                        </DialogTitle>
                        <DialogDescription>
                          This is permanent and removes analytics
                          for this link.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-2 mt-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeleteId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-white"
                          disabled={isPending}
                          onClick={confirmDelete}
                        >
                          {isPending
                            ? "Deleting..."
                            : "Delete link"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
