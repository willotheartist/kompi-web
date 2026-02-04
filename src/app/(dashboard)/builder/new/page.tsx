// src/app/(dashboard)/builder/new/page.tsx
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireDbUser } from "@/lib/builder/authz";
import { ensureWorkspaceForUser } from "@/lib/builder/ensure-workspace";
import { buildDefaultPages, buildDefaultSiteGlobals } from "@/lib/builder/default-site";
import { isNonEmptyString, normalizeSlug } from "@/lib/builder/types";
import BriefCaptureClient from "./BriefCaptureClient";

type StartupStage = "idea" | "waitlist" | "live";
type PrimaryGoal = "collect_emails" | "book_demos" | "explain_product";
type StyleChoice = "1" | "2" | "3" | "4" | "5";

function toJson(v: unknown): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(v)) as Prisma.InputJsonValue;
}

function clampLen(s: string, max: number): string {
  const t = s.trim();
  return t.length > max ? t.slice(0, max) : t;
}

function computeIncludeWaitlist(stage: StartupStage, goal: PrimaryGoal): boolean {
  return stage === "waitlist" || goal === "collect_emails";
}

function computeGlobalCta(includeWaitlist: boolean, goal: PrimaryGoal): { label: string; href: string; style: "primary" } {
  if (goal === "collect_emails") {
    return { label: "Join the waitlist", href: includeWaitlist ? "/waitlist" : "/pricing", style: "primary" };
  }
  if (goal === "book_demos") {
    return { label: "Book a demo", href: "/contact", style: "primary" };
  }
  return { label: "See product", href: "/product", style: "primary" };
}

function patchDefaultPagesCopy(params: {
  pages: ReturnType<typeof buildDefaultPages>;
  startupName: string;
  oneLiner: string;
  targetAudience: string;
  includeWaitlistInsteadOfPricing: boolean;
  primaryGoal: PrimaryGoal;
}) {
  const { pages, startupName, oneLiner, targetAudience, includeWaitlistInsteadOfPricing, primaryGoal } = params;

  // HOME hero
  const home = pages.find((p) => p.type === "HOME");
  if (home) {
    const hero = home.sections.find((s) => s.type === "HERO");
    if (hero) {
      const existing = (hero.content ?? {}) as Record<string, unknown>;
      hero.content = {
        ...existing,
        headline: isNonEmptyString(oneLiner) ? oneLiner : `${startupName} — a calm, credible site in minutes.`,
        subheadline: isNonEmptyString(targetAudience)
          ? `Built for ${targetAudience}.`
          : "A polished startup site with strong defaults and zero design stress.",
        // Prefer aligning hero CTA with global CTA intent.
        cta:
          primaryGoal === "collect_emails"
            ? { label: "Join the waitlist", href: includeWaitlistInsteadOfPricing ? "/waitlist" : "/pricing" }
            : primaryGoal === "book_demos"
              ? { label: "Book a demo", href: "/contact" }
              : { label: "See product", href: "/product" },
      };
    }

    const socialProof = home.sections.find((s) => s.type === "SOCIAL_PROOF");
    if (socialProof) {
      const existing = (socialProof.content ?? {}) as Record<string, unknown>;
      socialProof.content = {
        ...existing,
        headline: "Trusted by early teams",
      };
    }
  }

  // WAITLIST page copy (if present)
  const waitlist = pages.find((p) => p.type === "WAITLIST");
  if (waitlist) {
    const wl = waitlist.sections.find((s) => s.type === "WAITLIST");
    if (wl) {
      const existing = (wl.content ?? {}) as Record<string, unknown>;
      wl.content = {
        ...existing,
        title: `Join ${startupName}`,
        subtitle: isNonEmptyString(oneLiner) ? oneLiner : "Be the first to know when we launch.",
        formLabel: "Email",
        buttonLabel: "Join",
      };
    }
  }

  // ABOUT page copy
  const about = pages.find((p) => p.type === "ABOUT");
  if (about) {
    const ab = about.sections.find((s) => s.type === "ABOUT");
    if (ab) {
      const existing = (ab.content ?? {}) as Record<string, unknown>;
      ab.content = {
        ...existing,
        title: `About ${startupName}`,
        body:
          isNonEmptyString(oneLiner) && isNonEmptyString(targetAudience)
            ? `${oneLiner}\n\nWe’re building for ${targetAudience}.`
            : isNonEmptyString(oneLiner)
              ? `${oneLiner}\n\nTell the story: why you exist, what you believe, and who you serve.`
              : "Tell the story: why you exist, what you believe, and who you serve.",
      };
    }
  }

  // CONTACT page copy (kept minimal; editor can change)
  const contact = pages.find((p) => p.type === "CONTACT");
  if (contact) {
    const ct = contact.sections.find((s) => s.type === "CONTACT");
    if (ct) {
      const existing = (ct.content ?? {}) as Record<string, unknown>;
      ct.content = {
        ...existing,
        title: "Contact",
        subtitle: "We reply within 1–2 business days.",
      };
    }
  }
}

async function createUniqueSlug(slugRaw: string) {
  const slugBase = normalizeSlug(slugRaw);
  let slug = slugBase;

  for (let i = 0; i < 50; i++) {
    const exists = await prisma.builderSite.findUnique({ where: { slug } });
    if (!exists) break;
    slug = `${slugBase}-${i + 2}`;
  }

  return slug;
}

export default async function BuilderNewPage() {
  const auth = await requireDbUser();
  if (!auth.ok) {
    return (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Create site</h1>
        <p style={{ marginTop: 8, opacity: 0.8 }}>You must be signed in.</p>
      </div>
    );
  }

  async function createSiteAction(formData: FormData) {
    "use server";

    const auth2 = await requireDbUser();
    if (!auth2.ok) {
      return { ok: false as const, error: "You must be signed in." };
    }

    const ws = await ensureWorkspaceForUser(auth2.user.id);

    const startupNameRaw = String(formData.get("startupName") ?? "");
    const oneLinerRaw = String(formData.get("oneLiner") ?? "");
    const targetAudienceRaw = String(formData.get("targetAudience") ?? "");
    const startupStageRaw = String(formData.get("startupStage") ?? "idea");
    const primaryGoalRaw = String(formData.get("primaryGoal") ?? "explain_product");
    const styleChoiceRaw = String(formData.get("styleChoice") ?? "1");

    const startupName = isNonEmptyString(startupNameRaw) ? clampLen(startupNameRaw, 60) : "New Site";
    const oneLiner = clampLen(oneLinerRaw, 140);
    const targetAudience = clampLen(targetAudienceRaw, 80);

    const startupStage: StartupStage =
      startupStageRaw === "waitlist" ? "waitlist" : startupStageRaw === "live" ? "live" : "idea";

    const primaryGoal: PrimaryGoal =
      primaryGoalRaw === "collect_emails"
        ? "collect_emails"
        : primaryGoalRaw === "book_demos"
          ? "book_demos"
          : "explain_product";

    const styleChoice: StyleChoice =
      styleChoiceRaw === "2"
        ? "2"
        : styleChoiceRaw === "3"
          ? "3"
          : styleChoiceRaw === "4"
            ? "4"
            : styleChoiceRaw === "5"
              ? "5"
              : "1";

    const includeWaitlistInsteadOfPricing = computeIncludeWaitlist(startupStage, primaryGoal);

    const slug = await createUniqueSlug(startupName);

    const globals = buildDefaultSiteGlobals();
    const pages = buildDefaultPages(includeWaitlistInsteadOfPricing);

    // Patch globals safely (brand/navigation/globalCta are JSON blobs in DB)
    const globalCta = computeGlobalCta(includeWaitlistInsteadOfPricing, primaryGoal);

    const nextBrand: Record<string, unknown> = {
      ...(globals.brand ?? {}),
      brandName: startupName,
      // Keep existing system key (current code uses CALM_A); store the onboarding pick separately.
      styleVariant: (globals.brand as any)?.styleVariant ?? "CALM_A",
      styleVariantChoice: `VARIANT_${styleChoice}`,
      // Store brief-capture inputs in brand metadata for later use.
      brief: {
        oneLiner,
        targetAudience,
        startupStage,
        primaryGoal,
      },
    };

    const nextGlobals = {
      ...globals,
      brand: nextBrand,
      globalCta,
    };

    // Patch default page section copy using the brief-capture inputs.
    patchDefaultPagesCopy({
      pages,
      startupName,
      oneLiner,
      targetAudience,
      includeWaitlistInsteadOfPricing,
      primaryGoal,
    });

    const created = await prisma.builderSite.create({
      data: {
        workspaceId: ws.id,
        name: startupName,
        slug,
        brand: nextGlobals.brand ? toJson(nextGlobals.brand) : undefined,
        navigation: nextGlobals.navigation ? toJson(nextGlobals.navigation) : undefined,
        globalCta: nextGlobals.globalCta ? toJson(nextGlobals.globalCta) : undefined,
        pages: {
          create: pages.map((p) => ({
            type: p.type,
            title: p.title ?? null,
            path: p.path ?? null,
            order: p.order,
            sections: {
              create: p.sections.map((s) => ({
                type: s.type,
                variant: String(s.variant),
                isHidden: Boolean(s.isHidden),
                order: s.order,
                content: toJson(s.content),
              })),
            },
          })),
        },
      },
      select: { id: true },
    });

    redirect(`/builder/${created.id}/edit`);
  }

  return <BriefCaptureClient createSiteAction={createSiteAction} />;
}
