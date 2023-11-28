'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Table } from "react-bootstrap"
import {   MdAdd } from 'react-icons/md'

const Kelaslist=()=>{
    const [listKelas,setListKelas]=useState([])
    useEffect(()=>{
        const loadKelas =async()=>{
            await axios({
                url:'api/kelas',
                method:'get'
            })
            .then(async (res)=>{
                const {kelas} = await res.data
                setListKelas(kelas)
                console.log(kelas)
            })
        }
        loadKelas()
    },[])
    return (
        <Card>
            <Card.Header className="d-flex justify-content-between">
                <Card.Title >Data kelas</Card.Title>
                <Button className="btn-sm">
                    <MdAdd /> Tambah
                </Button>
            </Card.Header>
            <Card.Body>
                <Table className="table-sm table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Kelas</th>
                            <th>Tingkat</th>
                            <th>Jurusan</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listKelas.length>0 && listKelas.map((el,index)=>(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{el.kode_kelas}</td>
                                <td>{el.tingkat}</td>
                                <td>{el.jurusan.deskripsi}</td>
                                <td>{index+1}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}

export default Kelaslist