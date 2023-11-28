import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export const GET = async () => {
    let data = await prisma.kelas.findMany({
        include: {
            jurusan: true
        }
    })
    return NextResponse.json({ kelas: data }, { status: 200 })
}

export const POST = async (request) => {
    const { kode_kelas, tingkat, jurusan_id } = await request.json()
    let simpan = true
    try {
        const query = await prisma.kelas.create({
            data: {
                kode_kelas: kode_kelas,
                tingkat: `${tingkat}`,
                jurusan_id: jurusan_id
            }
        })
    } catch (error) {
        console.log(error)
        simpan = false
    }
    return NextResponse.json({ message: kode_kelas,jurusan :jurusan_id,tingkat:tingkat })
}