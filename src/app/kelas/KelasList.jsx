'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Card, Modal, Spinner, Table } from "react-bootstrap"
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md'
import KelasModal from "./KelasModal"

const Kelaslist = () => {
    const [listKelas, setListKelas] = useState([])
    const [modal, setModal] = useState(false)
    const [kelas, setKelas] = useState({
        id: 0,
        kode_kelas: '',
        tingkat: 10,
        jurusan_id: 0
    })
    const addKelas = (kelasBaru) => {
        let dt = listKelas
        dt.push(kelasBaru)
        setListKelas(dt)
    }
    const updateKelas = (kelasBaru) => {
        let dt = listKelas
        let index = dt.findIndex(el => el.id == kelasBaru.id)
        dt[index]= kelasBaru
        setListKelas(dt)
    }
    const handleHide = () => {
        setKelas({
            id: 0,
            kode_kelas: '',
            tingkat: 10,
            jurusan_id: 0
        })
    }
    const handleEdit = kelas => {
        setKelas(kelas)
        setModal(true)
    }
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
                    <Button className="btn-sm" onClick={() => setModal(true)}>
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
                                <tr key={index} className="align-middle">
                                    <td>{index + 1}</td>
                                    <td>{el.kode_kelas}</td>
                                    <td>{el.tingkat}</td>
                                    <td>{el.jurusan.deskripsi}</td>
                                    <td style={{ width: 100 }} className="text-center">
                                        <Button className="btn-sm btn-success" onClick={() => handleEdit(el)}>
                                            <MdEdit />
                                        </Button>
                                        <Button className="btn-sm btn-danger ms-1">
                                            <MdDelete />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <KelasModal show={modal} hideModal={() => setModal(false)} dataKelas={kelas} hide={handleHide} add={addKelas} update={updateKelas}></KelasModal>
        </div>
    )
}

export default Kelaslist