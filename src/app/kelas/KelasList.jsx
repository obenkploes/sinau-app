'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Modal, Spinner, Table } from "react-bootstrap"
import { MdAdd } from 'react-icons/md'
import KelasModal from "./KelasModal"

const Kelaslist = () => {
    const [listKelas, setListKelas] = useState([])
    const [modal,setModal]=useState(false)
    useEffect(() => {
        const loadKelas = async () => {
            await axios({
                url: 'api/kelas',
                method: 'get'
            })
                .then(async (res) => {
                    const { kelas } = await res.data
                    setListKelas(kelas)
                })
        }
        loadKelas()
    }, [])
    return (
        <div>
            <Card>
                <Card.Header className="d-flex justify-content-between">
                    <Card.Title >Data kelas</Card.Title>
                    <Button className="btn-sm" onClick={()=>setModal(true)}>
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
                            {listKelas.length < 1 && (
                                <tr className="align-center">
                                    <td colSpan="5" className="text-center" >
                                        <Spinner animation="border" variant="primary" className="my-2" ></Spinner>
                                    </td>
                                </tr>
                            )}
                            {listKelas.length > 0 && listKelas.map((el, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el.kode_kelas}</td>
                                    <td>{el.tingkat}</td>
                                    <td>{el.jurusan.deskripsi}</td>
                                    <td>{index + 1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <KelasModal show={modal} hideModal={()=>setModal(false)}></KelasModal>
        </div>
    )
}

export default Kelaslist