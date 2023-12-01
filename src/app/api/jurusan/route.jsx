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

export const POST=async(request)=>{
    const {kode_jurusan,deskripsi}= await request.json()
    try{
        let save = await prisma.jurusan.create({
            data:{
                kode_jurusan:kode_jurusan,
                deskripsi:deskripsi
            }
        })
        if (save) {
            const dt = await prisma.jurusan.findFirst({
                include:{
                    kelas:true
                },
                orderBy:{
                    id:'desc'
                }
            })
            return NextResponse.json({jurusan:dt},{status:200})
        }
        return NextResponse.json({message:'Data gagal disimpan'},{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json({message:'Kesalahan basis data'},{status:401})
    }
}

export const PUT=async (request)=>{
    const {id,kode_jurusan,deskripsi}=await request.json()
    try {
        const update = await prisma.jurusan.update({
            where:{
                id:id
            },
            data:{
                kode_jurusan:kode_jurusan,
                deskripsi:deskripsi
            }
        })
        const dt = await prisma.jurusan.findFirst({where:{id:id}})
        return NextResponse.json({jurusan:dt},{status:200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:'Kesalahan basis data'},{status:401})
    }
}