// src/app/api/builder/sites/[id]/publish/route.ts
import { prisma } from "@/lib/prisma";
import { requireDbUser } from "@/lib/builder/authz";
import { buildSiteSnapshot } from "@/lib/builder/buildSnapshot";
import { validateSectionContent } from "@/lib/builder/validateSection";
import { NextResponse } from "next/server";

type PublishValidationError = {
  pageId: string;
  pageType: string;

  sectionId: string; // empty for page-level errors
  sectionType: string; // empty for page-level errors
  sectionVariant: string; // empty for page-level errors

  message: string;
};

// V0 opinionated required sections.
// If you want to relax this later, make this configurable per workspace/template.
const REQUIRED_SECTIONS_BY_PAGE_TYPE: Record<string, string[]> = {
  HOME: ["NAVBAR", "HERO", "FOOTER"],
  PRODUCT: ["NAVBAR", "FEATURES", "FOOTER"],
  PRICING: ["NAVBAR", "PRICING", "FOOTER"],
  WAITLIST: ["NAVBAR", "WAITLIST", "FOOTER"],
  ABOUT: ["NAVBAR", "ABOUT", "FOOTER"],
  CONTACT: ["NAVBAR", "CONTACT", "FOOTER"],
};

function asString(v: any) {
  return String(v ?? "");
}

function extractMissingFieldMessage(schemaError: string, sectionType: string) {
  // validateSectionContent returns: "Missing required field: X"
  const prefix = "Missing required field:";
  if (!schemaError.startsWith(prefix)) return schemaError;

  const field = schemaError.slice(prefix.length).trim();
  if (!field) return schemaError;

  // Nicer, section-aware phrasing
  if (field === "items") return `${sectionType} requires at least 1 item.`;
  if (field === "plans") return `${sectionType} requires at least 1 plan.`;
  if (field === "steps") return `${sectionType} requires at least 1 step.`;
  if (field === "headline") return `${sectionType} headline is required.`;
  if (field === "body") return `${sectionType} body is required.`;
  if (field === "email") return `${sectionType} email is required.`;

  return `${sectionType} is missing required field: ${field}`;
}

function validateSnapshotForPublish(snapshot: any): PublishValidationError[] {
  const errors: PublishValidationError[] = [];
  const pages: any[] = Array.isArray(snapshot?.pages) ? snapshot.pages : [];

  const visiblePages = pages.filter((p) => !p?.isHidden);

  // ---------- Guardrail: HOME must exist (and be visible) ----------
  const home = pages.find((p) => asString(p?.type) === "HOME");
  if (!home || home?.isHidden) {
    errors.push({
      pageId: asString(home?.id),
      pageType: "HOME",
      sectionId: "",
      sectionType: "",
      sectionVariant: "",
      message: "Publish blocked: HOME page is missing (or hidden).",
    });
  }

  // ---------- Guardrail: visible pages must have >= 1 visible section ----------
  for (const p of visiblePages) {
    const sectionsAll: any[] = Array.isArray(p?.sections) ? p.sections : [];
    const visibleSections = sectionsAll.filter((s) => !s?.isHidden);

    if (visibleSections.length === 0) {
      errors.push({
        pageId: asString(p?.id),
        pageType: asString(p?.type),
        sectionId: "",
        sectionType: "",
        sectionVariant: "",
        message: "Publish blocked: page has no visible sections.",
      });
    }
  }

  // ---------- Guardrail: required sections by page type ----------
  for (const p of visiblePages) {
    const pageType = asString(p?.type);
    const required = REQUIRED_SECTIONS_BY_PAGE_TYPE[pageType] ?? [];
    if (required.length === 0) continue;

    const sectionsAll: any[] = Array.isArray(p?.sections) ? p.sections : [];
    const visibleSections = sectionsAll.filter((s) => !s?.isHidden);
    const presentTypes = new Set(visibleSections.map((s) => asString(s?.type)));

    for (const needed of required) {
      if (!presentTypes.has(needed)) {
        errors.push({
          pageId: asString(p?.id),
          pageType,
          sectionId: "",
          sectionType: needed,
          sectionVariant: "",
          message: `Publish blocked: required section missing: ${needed}`,
        });
      }
    }
  }

  // ---------- Guardrail: section content validation ----------
  for (const p of visiblePages) {
    const sections: any[] = Array.isArray(p?.sections) ? p.sections : [];

    for (const s of sections) {
      if (s?.isHidden) continue;

      const sectionType = asString(s?.type);
      const sectionVariant = asString(s?.variant);

      const res = validateSectionContent(sectionType as any, sectionVariant as any, s?.content);

      if (!res.ok) {
        errors.push({
          pageId: asString(p?.id),
          pageType: asString(p?.type),
          sectionId: asString(s?.id),
          sectionType,
          sectionVariant,
          message: extractMissingFieldMessage(res.error, sectionType),
        });
      }
    }
  }

  return errors;
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const auth = await requireDbUser();
  if (!auth.ok) return new NextResponse("Unauthorized", { status: 401 });

  const site = await prisma.builderSite.findFirst({
    where: { id, workspace: { ownerId: auth.user.id } },
    select: { id: true },
  });

  if (!site) return new NextResponse("Not found", { status: 404 });

  const snapshot = await buildSiteSnapshot(site.id);

  const errors = validateSnapshotForPublish(snapshot);
  if (errors.length > 0) {
    return NextResponse.json(
      {
        error: "Publish blocked: validation failed",
        details: errors,
      },
      { status: 400 }
    );
  }

  await prisma.$transaction([
    prisma.builderPublishedSnapshot.create({
      data: {
        siteId: site.id,
        data: snapshot,
      },
    }),
    prisma.builderSite.update({
      where: { id: site.id },
      data: {
        isPublished: true,
        publishedAt: new Date(),
      },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
