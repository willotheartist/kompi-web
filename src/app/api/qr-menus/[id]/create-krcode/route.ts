import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser,getActiveWorkspace } from "@/lib/auth";
import { PUBLIC_SITE_URL } from "@/lib/urls";
import { ApiError,apiError } from "@/lib/api-errors";
import { getPlanLimits,limitMessage } from "@/lib/plan-limits";
export async function POST(_req:NextRequest,{params}:{params:Promise<{id:string}>}){try{const user=await requireUser();const {id}=await params;const menu=await prisma.menu.findFirst({where:{id,userId:user.id}});if(!menu?.slug)throw new ApiError("Menu not found.",404);const workspace=await getActiveWorkspace(user.id);if(!workspace)throw new ApiError("Workspace not found.",404);const destination=`${PUBLIC_SITE_URL}/m/${menu.slug}`;const krCode=await prisma.$transaction(async tx=>{await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${workspace.id}))`;const existing=await tx.kRCode.findFirst({where:{userId:user.id,workspaceId:workspace.id,destination}});if(existing)return existing;if(await tx.kRCode.count({where:{workspaceId:workspace.id}})>=getPlanLimits(workspace.plan).krCodes)throw new ApiError(limitMessage("krCodes",workspace.plan),402);return tx.kRCode.create({data:{userId:user.id,workspaceId:workspace.id,title:menu.title||"QR Menu",destination,type:"menu"}});});return NextResponse.json({success:true,krCode});}catch(error){return apiError(error);}}
