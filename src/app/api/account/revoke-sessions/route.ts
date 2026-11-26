import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError } from "@/lib/api-errors";
export async function POST(){try{const user=await requireUser();await prisma.user.update({where:{id:user.id},data:{sessionVersion:{increment:1}}});return NextResponse.json({ok:true});}catch(error){return apiError(error);}}
