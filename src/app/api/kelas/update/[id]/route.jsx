import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
export async function POST(request,{params}){
    const dt= await request.json()
    const update = await prisma.kelas.update({
        where:{
            id:parseInt(params.id)
        },
        data:{
            kode_kelas:dt.kode_kelas,
            tingkat:dt.tingkat,
            jurusan_id:dt.jurusan_id,
        }
    })
    const dtbaru = await prisma.kelas.findFirst({
        where:{
            id:parseInt(params.id)
        },
        include:{
            jurusan:true
        }
    })
    return NextResponse.json({kelas:dtbaru})

}