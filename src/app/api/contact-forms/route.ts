import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser, getActiveWorkspace } from "@/lib/auth";

/**
 * GET /api/contact-forms
 * List contact forms for the active workspace.
 */
export async function GET(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const workspaceIdParam = searchParams.get("workspaceId");

    const workspace = await getActiveWorkspace(user.id, workspaceIdParam);
    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    const forms = await prisma.contactForm.findMany({
      where: { workspaceId: workspace.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { submissions: true },
        },
      },
    });

    return NextResponse.json({
      forms: forms.map((f) => ({
        id: f.id,
        title: f.title,
        createdAt: f.createdAt.toISOString(),
        submissionsCount: f._count.submissions ?? 0,
        // extra fields for future UI (not yet used by table)
        description: f.description,
        includeName: f.includeName,
        includeMessage: f.includeMessage,
        includePhone: f.includePhone,
        includeSubject: f.includeSubject,
        subjectOptions: f.subjectOptions,
        tags: f.tags,
        buttonLabel: f.buttonLabel,
        successMessage: f.successMessage,
        notificationsEmail: f.notificationsEmail,
        accentHex: f.accentHex,
        themeLayout: f.themeLayout,
        themeFont: f.themeFont,
        themeCorners: f.themeCorners,
      })),
    });
  } catch (err) {
    console.error("[GET /api/contact-forms] error", err);
    return NextResponse.json(
      { error: "Failed to load contact forms" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/contact-forms
 * Create a new contact form for the active workspace.
 *
 * Body: { title, description?, ...OptionBFields? }
 */
export async function POST(req: Request) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const workspaceIdParam = searchParams.get("workspaceId");

    const workspace = await getActiveWorkspace(user.id, workspaceIdParam);
    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const {
      title,
      description,

      includeName,
      includeMessage,
      includePhone,
      includeSubject,

      subjectOptions,
      tags,

      buttonLabel,
      successMessage,

      notificationsEmail,
      autoReplySubject,
      autoReplyBody,

      accentHex,
      themeLayout,
      themeFont,
      themeCorners,
    } = body ?? {};

    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const form = await prisma.contactForm.create({
      data: {
        workspaceId: workspace.id,
        title: title.trim(),
        description:
          typeof description === "string" && description.trim()
            ? description.trim()
            : null,

        includeName:
          typeof includeName === "boolean" ? includeName : true,
        includeMessage:
          typeof includeMessage === "boolean" ? includeMessage : true,
        includePhone:
          typeof includePhone === "boolean" ? includePhone : false,
        includeSubject:
          typeof includeSubject === "boolean" ? includeSubject : false,

        subjectOptions: Array.isArray(subjectOptions)
          ? subjectOptions
              .filter((s: unknown) => typeof s === "string")
              .map((s: string) => s.trim())
              .filter(Boolean)
          : [],

        tags: Array.isArray(tags)
          ? tags
              .filter((t: unknown) => typeof t === "string")
              .map((t: string) => t.trim())
              .filter(Boolean)
          : [],

        buttonLabel:
          typeof buttonLabel === "string" && buttonLabel.trim()
            ? buttonLabel.trim()
            : null,
        successMessage:
          typeof successMessage === "string" && successMessage.trim()
            ? successMessage.trim()
            : null,

        notificationsEmail:
          typeof notificationsEmail === "string" &&
          notificationsEmail.trim()
            ? notificationsEmail.trim()
            : null,

        autoReplySubject:
          typeof autoReplySubject === "string" &&
          autoReplySubject.trim()
            ? autoReplySubject.trim()
            : null,
        autoReplyBody:
          typeof autoReplyBody === "string" &&
          autoReplyBody.trim()
            ? autoReplyBody.trim()
            : null,

        accentHex:
          typeof accentHex === "string" && accentHex.trim()
            ? accentHex.trim()
            : null,
        themeLayout:
          typeof themeLayout === "string" && themeLayout.trim()
            ? themeLayout.trim()
            : null,
        themeFont:
          typeof themeFont === "string" && themeFont.trim()
            ? themeFont.trim()
            : null,
        themeCorners:
          typeof themeCorners === "string" && themeCorners.trim()
            ? themeCorners.trim()
            : null,
      },
    });

    return NextResponse.json(
      {
        form: {
          id: form.id,
          title: form.title,
          createdAt: form.createdAt.toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/contact-forms] error", err);
    return NextResponse.json(
      { error: "Failed to create contact form" },
      { status: 500 }
    );
  }
}
