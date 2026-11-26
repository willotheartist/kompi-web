import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
export class ApiError extends Error { constructor(message: string, public status = 400) { super(message); } }
export function apiError(error: unknown) {
  if (error instanceof ApiError) return NextResponse.json({ error: error.message }, { status: error.status });
  if (error && typeof error === "object" && "digest" in error && String(error.digest).startsWith("NEXT_REDIRECT")) return NextResponse.json({ error: "Please sign in to continue." }, { status: 401 });
  if (error instanceof ZodError) return NextResponse.json({ error: error.issues[0]?.message || "Check your details." }, { status: 400 });
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return NextResponse.json({ error: "That address is already in use. Choose another." }, { status: 409 });
  console.error("API request failed", error instanceof Error ? error.message : "Unknown error");
  return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
}
