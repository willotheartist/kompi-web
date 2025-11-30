// src/app/api/contact-forms/[id]/submissions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import type { Prisma } from "@prisma/client";

type RouteContext = {
  // ✅ Match the validator: params is a Promise<{ id: string }>
  params: Promise<{ id: string }>;
};

/**
 * GET /api/contact-forms/:id/submissions
 * Returns form + submissions for the owner (dashboard inbox).
 */
export async function GET(_req: NextRequest, ctx: RouteContext) {
  try {
    const user = await requireUser();

    // ✅ params is now a Promise, so await it
    const { id: formId } = await ctx.params;

    if (!formId) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 },
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
        { status: 404 },
      );
    }

    const submissions = await prisma.contactSubmission.findMany({
      where: { formId: form.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      form: {
        id: form.id,
        title: form.title,
        createdAt: form.createdAt.toISOString(),
      },
      submissions: submissions.map((s) => ({
        id: s.id,
        name: s.name,
        email: s.email,
        message: s.message,
        meta: s.meta,
        createdAt: s.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error("[GET /api/contact-forms/:id/submissions] error", err);
    return NextResponse.json(
      { error: "Failed to load contact form submissions" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/contact-forms/:id/submissions
 * Public submission endpoint – used by K-Cards, menus, bio pages, etc.
 *
 * Body:
 * {
 *   name?, email?, phone?, subject?, message,
 *   meta?: { sourceSlug?, sourceType?, ... },
 *   honey?: string // honeypot spam trap
 * }
 */
export async function POST(req: NextRequest, ctx: RouteContext) {
  try {
    // ✅ same fix: await params
    const { id: formId } = await ctx.params;

    if (!formId) {
      return NextResponse.json(
        { error: "Form ID is required" },
        { status: 400 },
      );
    }

    const form = await prisma.contactForm.findUnique({
      where: { id: formId },
    });

    if (!form) {
      return NextResponse.json(
        { error: "Contact form not found" },
        { status: 404 },
      );
    }

    const body = await req.json().catch(
      () => ({} as Record<string, unknown>),
    );

    const {
      name,
      email,
      phone,
      subject,
      message,
      meta,
      honey, // honeypot – if filled, likely a bot
    } = body as {
      name?: string;
      email?: string;
      phone?: string;
      subject?: string;
      message?: string;
      meta?: Record<string, unknown>;
      honey?: string;
    };

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const isSpam =
      typeof honey === "string" && honey.trim().length > 0;

    // Make Prisma happy: meta must be InputJsonValue | undefined
    const safeMeta: Prisma.InputJsonValue | undefined =
      meta && typeof meta === "object"
        ? (meta as Prisma.InputJsonValue)
        : undefined;

    const submission = await prisma.contactSubmission.create({
      data: {
        formId: form.id,
        name:
          typeof name === "string" && name.trim()
            ? name.trim()
            : null,
        email:
          typeof email === "string" && email.trim()
            ? email.trim()
            : null,
        phone:
          typeof phone === "string" && phone.trim()
            ? phone.trim()
            : null,
        subject:
          typeof subject === "string" && subject.trim()
            ? subject.trim()
            : null,
        message: message.trim(),
        tags: form.tags ?? [],
        meta: safeMeta,
        isSpam,
      },
    });

    // TODO (Optional, next step):
    // - If form.notificationsEmail is set, send a notification email.
    // - If form.autoReplySubject/body are set and email is present, send auto-response.

    return NextResponse.json(
      {
        ok: true,
        id: submission.id,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/contact-forms/:id/submissions] error", err);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 },
    );
  }
}
