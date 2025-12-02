"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

type ContentTypeId =
  | "url"
  | "file"
  | "social"
  | "app"
  | "wifi"
  | "location"
  | "contact"
  | "sms"
  | "email"
  | "phone"
  | "text"
  | "calendar"
  | "multi";

type KRCodeStyle = {
  [key: string]: unknown;
  fg?: string;
  bg?: string;
  size?: number;
  margin?: number;
  ecLevel?: "L" | "M" | "Q" | "H";
  logoUrl?: string | null;
  logoEnabled?: boolean;
  logoBgTransparent?: boolean;
  frameVariant?: "none" | "label-bottom" | "label-top";
  frameLabel?: string;
  dotsType?: "square" | "dots" | "rounded";
  cornersSquareType?: "square" | "extra-rounded";
  cornersDotType?: "square" | "dot";
};

type KRCode = {
  id: string;
  title: string | null;
  destination: string;
  style: KRCodeStyle | null;
  createdAt: string;
  type?: ContentTypeId | string | null;
  totalClicks?: number | null;
};

type ListResponse = {
  workspace: { id: string; name: string } | null;
  codes: KRCode[];
};

function labelForContentType(id: string | null | undefined) {
  if (!id) return null;
  const map: Record<string, string> = {
    url: "URL",
    website: "URL",
    file: "File",
    social: "Social",
    app: "App",
    wifi: "Wi-Fi",
    location: "Location",
    contact: "Contact",
    sms: "SMS",
    email: "Email",
    phone: "Phone",
    text: "Text",
    calendar: "Calendar",
    multi: "Multi-URL",
  };
  return map[id] ?? id;
}

// Inner page component that does the real work
function YourKRCodesPageInner() {
  const [codes, setCodes] = useState<KRCode[]>([]);
  const [workspaceName, setWorkspaceName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [downloadMenuFor, setDownloadMenuFor] = useState<string | null>(null);
  const [deleteIntentFor, setDeleteIntentFor] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/kr-codes", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }

        const data: ListResponse = await res.json();
        if (cancelled) return;

        setWorkspaceName(data.workspace?.name ?? null);
        setCodes(data.codes ?? []);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Failed to load Kompi Codes");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(code: KRCode) {
    setError(null);
    try {
      const res = await fetch(`/api/kr-codes/${code.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error(`Failed with status ${res.status}`);
      }

      setCodes((prev) => prev.filter((c) => c.id !== code.id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete Kompi Code");
    } finally {
      setDeleteIntentFor((current) =>
        current === code.id ? null : current,
      );
    }
  }

  const totalScans =
    codes.reduce((sum, c) => sum + (c.totalClicks ?? 0), 0) ?? 0;

  return (
    <DashboardLayout>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-10 pt-6 md:pb-12">
        {/* Page title inside dashboard shell */}
        <header className="mb-1">
          <h1 className="text-[26px] font-semibold leading-tight text-[#050816] md:text-[30px]">
            Your Kompi Codes
          </h1>
          <p className="mt-1 text-[13px] text-[#6B7280]">
            View, edit, download and track every code you&apos;ve created
            {workspaceName ? (
              <>
                {" "}
                in{" "}
                <span className="font-medium text-[#111827]">
                  {workspaceName}
                </span>
                .
              </>
            ) : (
              "."
            )}
          </p>
          <p className="mt-1 text-[11px] text-[#9CA3AF]">
            Total codes:{" "}
            <span className="font-medium text-[#111827]">
              {codes.length}
            </span>{" "}
            · Total scans:{" "}
            <span className="font-medium text-[#111827]">
              {totalScans}
            </span>
          </p>
        </header>

        {/* Big soft container like the design */}
        <div className="rounded-[36px] bg-[#F3F4F6] px-4 py-4 md:px-8 md:py-6">
          {loading ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[13px] text-[#9CA3AF]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D9F99D] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#A3E635]" />
                </span>
                <span>Loading your QR codes…</span>
              </div>

              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-24 w-full rounded-[32px] bg-[#E5E7EB]"
                />
              ))}
            </div>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : codes.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-[#D1D5DB] bg-white px-6 py-8 text-center text-sm text-[#6B7280]">
              No Kompi Codes yet.
              <br />
              <Link
                href="/dashboard/kr-codes"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-[#4C6FFF] px-5 py-2 text-[13px] font-medium text-white"
              >
                Create your first Kompi Code
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {codes.map((code) => {
                const isMenuOpen = downloadMenuFor === code.id;
                const isDeleteOpen = deleteIntentFor === code.id;

                const created = new Date(code.createdAt);
                const createdDate = created.toLocaleDateString();
                const createdTime = created.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                });

                return (
                  <div
                    key={code.id}
                    className="flex flex-col gap-4 rounded-[32px] bg-white px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6 md:py-5"
                  >
                    {/* LEFT: QR + title / URL / type */}
                    <div className="flex flex-1 items-center gap-4 md:gap-6">
                      <div className="hidden md:block">
                        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-[10px] bg-white">
                          <Image
                            src={`/api/kr-codes/${code.id}/png`}
                            alt={code.title || "Kompi Code"}
                            width={96}
                            height={96}
                            className="h-24 w-24 object-contain"
                          />
                        </div>
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="truncate text-[17px] font-semibold text-[#050816]">
                          {code.title || "Untitled Kompi Code"}
                        </div>
                        <div className="truncate text-[13px] text-[#4C6FFF]">
                          {code.destination}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#6B7280]">
                          <span>
                            Type:{" "}
                            <span className="font-medium">
                              {labelForContentType(code.type)}
                            </span>
                          </span>
                          <span>{createdDate}</span>
                          <span>{createdTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: stats + actions */}
                    <div className="flex flex-col items-stretch gap-2 text-[13px] md:flex-row md:items-center md:gap-6">
                      {/* Total scans */}
                      <div className="flex items-center justify-between gap-2 md:flex-col md:items-start">
                        <span className="text-[13px] text-[#6B7280]">
                          Total scans
                        </span>
                        <span className="text-[18px] font-semibold text-[#050816]">
                          {code.totalClicks ?? 0}
                        </span>
                      </div>

                      {/* Icons + buttons */}
                      <div className="flex flex-wrap items-center justify-end gap-3">
                        {/* Edit icon */}
                        <Link
                          href={`/kr-codes/${code.id}/edit`}
                          aria-label="Edit Kompi Code"
                          className="inline-flex items-center justify-center p-1.5 text-[#111827] hover:opacity-80"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        {/* Delete icon */}
                        <button
                          type="button"
                          aria-label="Delete Kompi Code"
                          onClick={() =>
                            setDeleteIntentFor((current) =>
                              current === code.id ? null : code.id,
                            )
                          }
                          className="inline-flex items-center justify-center p-1.5 text-[#EF4444] hover:opacity-80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>

                        {/* Analytics pill */}
                        <Link
                          href={`/kr-codes/${code.id}`}
                          className="inline-flex items-center justify-center rounded-full bg-[#E5E7EB] px-5 py-2 text-[13px] font-medium text-[#111827] hover:bg-[#D1D5DB]"
                        >
                          Analytics
                        </Link>

                        {/* Download pill + dropdown for PNG / SVG */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setDownloadMenuFor((current) =>
                                current === code.id ? null : code.id,
                              )
                            }
                            className="inline-flex items-center justify-center rounded-full bg-[#4C6FFF] px-5 py-2 text-[13px] font-medium text-white hover:bg-[#3B5BDB]"
                          >
                            Download
                          </button>

                          {isMenuOpen && (
                            <div
                              className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-[#E5E7EB] bg-white p-1 shadow-md"
                              onMouseLeave={() =>
                                setDownloadMenuFor(null)
                              }
                            >
                              <Link
                                href={`/api/kr-codes/${code.id}/svg`}
                                target="_blank"
                                className="block rounded-xl px-3 py-2 text-[12px] text-[#111827] hover:bg-[#F3F4F6]"
                                onClick={() =>
                                  setDownloadMenuFor(null)
                                }
                              >
                                Download SVG
                              </Link>
                              <Link
                                href={`/api/kr-codes/${code.id}/png`}
                                target="_blank"
                                className="block rounded-xl px-3 py-2 text-[12px] text-[#111827] hover:bg-[#F3F4F6]"
                                onClick={() =>
                                  setDownloadMenuFor(null)
                                }
                              >
                                Download PNG
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Inline delete confirmation */}
                      {isDeleteOpen && (
                        <div className="w-full text-right text-[11px] text-[#6B7280] md:text-right">
                          <span>Delete this Kompi Code? </span>
                          <button
                            type="button"
                            className="font-medium text-[#EF4444] underline-offset-2 hover:underline"
                            onClick={() => handleDelete(code)}
                          >
                            Yes, delete
                          </button>
                          <button
                            type="button"
                            className="ml-2 underline-offset-2 hover:underline"
                            onClick={() => setDeleteIntentFor(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}

// Default export: wrap inner page in Suspense for useSearchParams bailouts
export default function YourKRCodesPage() {
  return (
    <Suspense fallback={<div />}>
      <YourKRCodesPageInner />
    </Suspense>
  );
}
