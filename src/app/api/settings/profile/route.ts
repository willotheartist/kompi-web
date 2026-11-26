import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError } from "@/lib/api-errors";
export async function GET() { try { const u=await requireUser(); return NextResponse.json({ id:u.id, name:u.name, email:u.email, image:u.image }); } catch(error) { return apiError(error); } }
export async function PATCH(req: Request) { try { const u=await requireUser(); const data=z.object({ name:z.string().trim().min(1).max(100) }).parse(await req.json()); return NextResponse.json(await prisma.user.update({ where:{id:u.id},data,select:{id:true,name:true,email:true,image:true} })); } catch(error) { return apiError(error); } }
