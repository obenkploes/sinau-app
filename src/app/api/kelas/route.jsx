import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const GET=async()=>{
    let data = await prisma.kelas.findMany({
        include:{
            jurusan:true
        }
    })
    return NextResponse.json({kelas:data},{status:200})
}