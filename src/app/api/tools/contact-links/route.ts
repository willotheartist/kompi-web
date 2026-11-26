import { NextResponse } from "next/server";
import { z } from "zod";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { requireUser,getActiveWorkspace } from "@/lib/auth";
import { getPlanLimits,limitMessage } from "@/lib/plan-limits";
import { SHORT_LINK_BASE_URL } from "@/lib/urls";
import { ApiError,apiError } from "@/lib/api-errors";
import { checkLinkCreationAllowed } from "@/lib/abuse";
import { checkUrlSafety } from "@/lib/url-safety";
export async function POST(req:Request){try{const user=await requireUser();const body=z.object({targetUrl:z.string().max(4096),workspaceId:z.string().optional(),title:z.string().max(200).optional(),sourceTool:z.string().max(100).optional()}).parse(await req.json());const url=new URL(body.targetUrl);if(!["https:","http:","tel:","sms:","mailto:"].includes(url.protocol))throw new ApiError("Unsupported destination.",400);if(["http:","https:"].includes(url.protocol)&&!(await checkUrlSafety(url.href)).ok)throw new ApiError("This destination cannot be shortened.",400);const blocked=await checkLinkCreationAllowed(user);if(blocked)throw new ApiError(blocked,429);const workspace=await getActiveWorkspace(user.id,body.workspaceId);if(!workspace)throw new ApiError("Workspace not found.",404);const link=await prisma.$transaction(async tx=>{await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${workspace.id}))`;if(await tx.link.count({where:{workspaceId:workspace.id,qrCodes:{none:{}}}})>=getPlanLimits(workspace.plan).links)throw new ApiError(limitMessage("links",workspace.plan),402);return tx.link.create({data:{workspaceId:workspace.id,code:randomBytes(6).toString("base64url"),targetUrl:url.href,title:body.title,isActive:true,config:{sourceTool:body.sourceTool||"contact-link"}}});});return NextResponse.json({...link,shortUrl:`${SHORT_LINK_BASE_URL}/r/${link.code}`},{status:201});}catch(error){return apiError(error);}}
