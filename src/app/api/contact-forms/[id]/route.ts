// src/app/api/contact-forms/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

type RouteParams = {
  params: Promise<{ id: string }>;
};

function sanitizeString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function sanitizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);
}

/**
 * GET /api/contact-forms/:id
 * Returns full form config (for the dashboard settings panel).
 */
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireUser();
    const { id: formId } = await params;

    if (!formId) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }

    const form = await prisma.contactForm.findFirst({
      where: {
        id: formId,
        workspace: {
          ownerId: user.id,
        },
      },
    });

    if (!form) {
      return NextResponse.json(
        { error: "Contact form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      form: {
        id: form.id,
        title: form.title,
        description: form.description ?? null,

        includeName: form.includeName,
        includeMessage: form.includeMessage,
        includePhone: form.includePhone,
        includeSubject: form.includeSubject,

        subjectOptions: form.subjectOptions ?? [],
        tags: form.tags ?? [],

        buttonLabel: form.buttonLabel ?? null,
        successMessage: form.successMessage ?? null,

        notificationsEmail: form.notificationsEmail ?? null,

        autoReplySubject: form.autoReplySubject ?? null,
        autoReplyBody: form.autoReplyBody ?? null,

        accentHex: form.accentHex ?? null,
        themeLayout: form.themeLayout ?? null,
        themeFont: form.themeFont ?? null,
        themeCorners: form.themeCorners ?? null,

        spamHoneypotEnabled: form.spamHoneypotEnabled,

        createdAt: form.createdAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("[GET /api/contact-forms/:id] error", err);
    return NextResponse.json(
      { error: "Failed to load contact form" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/contact-forms/:id
 * Updates form settings from the dashboard panel.
 */
export async function PATCH(req: NextRequest, { params }: RouteParams) {
  try {
    const user = await requireUser();
    const { id: formId } = await params;

    if (!formId) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.contactForm.findFirst({
      where: {
        id: formId,
        workspace: {
          ownerId: user.id,
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Contact form not found" },
        { status: 404 }
      );
    }

    const body = (await req.json().catch(() => ({}))) as {
      title?: string;
      description?: string;

      includeName?: boolean;
      includeMessage?: boolean;
      includePhone?: boolean;
      includeSubject?: boolean;

      subjectOptions?: string[];
      tags?: string[];

      buttonLabel?: string;
      successMessage?: string;

      notificationsEmail?: string;

      autoReplySubject?: string;
      autoReplyBody?: string;

      accentHex?: string;
      themeLayout?: string;
      themeFont?: string;
      themeCorners?: string;

      spamHoneypotEnabled?: boolean;
    };

    const updated = await prisma.contactForm.update({
      where: { id: existing.id },
      data: {
        title:
          typeof body.title === "string" && body.title.trim()
            ? body.title.trim()
            : existing.title,
        description:
          typeof body.description === "string"
            ? body.description.trim() || null
            : existing.description,

        includeName:
          typeof body.includeName === "boolean"
            ? body.includeName
            : existing.includeName,
        includeMessage:
          typeof body.includeMessage === "boolean"
            ? body.includeMessage
            : existing.includeMessage,
        includePhone:
          typeof body.includePhone === "boolean"
            ? body.includePhone
            : existing.includePhone,
        includeSubject:
          typeof body.includeSubject === "boolean"
            ? body.includeSubject
            : existing.includeSubject,

        subjectOptions:
          Array.isArray(body.subjectOptions)
            ? sanitizeStringArray(body.subjectOptions)
            : existing.subjectOptions,

        tags:
          Array.isArray(body.tags)
            ? sanitizeStringArray(body.tags)
            : existing.tags,

        buttonLabel:
          typeof body.buttonLabel === "string"
            ? sanitizeString(body.buttonLabel)
            : existing.buttonLabel,
        successMessage:
          typeof body.successMessage === "string"
            ? sanitizeString(body.successMessage)
            : existing.successMessage,

        notificationsEmail:
          typeof body.notificationsEmail === "string"
            ? sanitizeString(body.notificationsEmail)
            : existing.notificationsEmail,

        autoReplySubject:
          typeof body.autoReplySubject === "string"
            ? sanitizeString(body.autoReplySubject)
            : existing.autoReplySubject,
        autoReplyBody:
          typeof body.autoReplyBody === "string"
            ? sanitizeString(body.autoReplyBody)
            : existing.autoReplyBody,

        accentHex:
          typeof body.accentHex === "string"
            ? sanitizeString(body.accentHex)
            : existing.accentHex,
        themeLayout:
          typeof body.themeLayout === "string"
            ? sanitizeString(body.themeLayout)
            : existing.themeLayout,
        themeFont:
          typeof body.themeFont === "string"
            ? sanitizeString(body.themeFont)
            : existing.themeFont,
        themeCorners:
          typeof body.themeCorners === "string"
            ? sanitizeString(body.themeCorners)
            : existing.themeCorners,

        spamHoneypotEnabled:
          typeof body.spamHoneypotEnabled === "boolean"
            ? body.spamHoneypotEnabled
            : existing.spamHoneypotEnabled,
      },
    });

    return NextResponse.json({
      form: {
        id: updated.id,
        title: updated.title,
        description: updated.description ?? null,

        includeName: updated.includeName,
        includeMessage: updated.includeMessage,
        includePhone: updated.includePhone,
        includeSubject: updated.includeSubject,

        subjectOptions: updated.subjectOptions ?? [],
        tags: updated.tags ?? [],

        buttonLabel: updated.buttonLabel ?? null,
        successMessage: updated.successMessage ?? null,

        notificationsEmail: updated.notificationsEmail ?? null,

        autoReplySubject: updated.autoReplySubject ?? null,
        autoReplyBody: updated.autoReplyBody ?? null,

        accentHex: updated.accentHex ?? null,
        themeLayout: updated.themeLayout ?? null,
        themeFont: updated.themeFont ?? null,
        themeCorners: updated.themeCorners ?? null,

        spamHoneypotEnabled: updated.spamHoneypotEnabled,

        createdAt: updated.createdAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("[PATCH /api/contact-forms/:id] error", err);
    return NextResponse.json(
      { error: "Failed to update contact form" },
      { status: 500 }
    );
  }
}
