import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { apiError } from "@/lib/api-errors";
import { rateLimit } from "@/lib/rate-limit";
export async function GET(){try{const user=await requireUser();await rateLimit("account-export",user.id,5,3600);const [workspaces,cards,codes,messages]=await Promise.all([prisma.workspace.findMany({where:{ownerId:user.id},select:{id:true,name:true,slug:true,plan:true,createdAt:true,links:true}}),prisma.kCard.findMany({where:{userId:user.id}}),prisma.kRCode.findMany({where:{userId:user.id}}),prisma.kCardMessage.findMany({where:{ownerId:user.id},select:{id:true,kcardId:true,name:true,email:true,phone:true,message:true,createdAt:true}})]);return NextResponse.json({exportedAt:new Date().toISOString(),profile:{id:user.id,email:user.email,name:user.name,image:user.image,createdAt:user.createdAt},workspaces,cards,qrCodes:codes,messages},{headers:{"Content-Disposition":"attachment; filename=kompi-account-export.json","Cache-Control":"no-store"}});}catch(error){return apiError(error);}}
