import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient()
export const GET=async()=>{
    try {
        let data = await prisma.jurusan.findMany({
            include:{
                kelas:true
            }
        })
        return NextResponse.json({jurusan:data},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'Kesalahan database'},{status:401})
    }
}