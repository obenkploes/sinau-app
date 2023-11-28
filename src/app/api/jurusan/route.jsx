import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export const GET=async()=>{
    let data = await prisma.jurusan.findMany({
        include:{
            kelas:true
        }
    })
    return NextResponse.json({jurusan:data},{status:200})
}