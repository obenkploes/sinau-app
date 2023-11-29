import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const GET = async () => {
    let data = await prisma.kelas.findMany({
        include: {
            jurusan: true
        },
    })
    return NextResponse.json({ kelas: data }, { status: 200 })
}

export const POST = async (request) => {
    const dt = await request.json()
    let simpan = true
    try {
        const query = await prisma.kelas.create({
            data: {
                kode_kelas: dt.kode_kelas,
                tingkat: dt.tingkat,
                jurusan_id: dt.jurusan_id
            }
        })
    } catch (error) {
        console.log(dt)
        simpan = false
    }
    const dtBaru = await prisma.kelas.findFirst({
        orderBy:{
            id:'desc'
        },
        include:{
            jurusan:true
        }
    })
    return NextResponse.json({kelas:dtBaru })
}