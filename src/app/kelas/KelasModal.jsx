'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, ListGroup, Modal } from "react-bootstrap"
import { MdSave } from "react-icons/md"
import Notifikasi from "@/components/Notifikasi"


const KelasModal = (props) => {

    const [listJurusan, setListJurusan] = useState([])
    const [kelas, setKelas] = useState(props.dataKelas)
    const [showNotifikasi, setShowNotifikasi] = useState(false)
    const [title,setTitle]=useState('Informasi')
    const [message,setMessage]=useState('')
    const handleInput = e => {
        const { name, value } = e.target
        setKelas(prevstate => ({
            ...prevstate,
            [name]: value
        }))
    }
    const handleShow = () => {
        setKelas(props.dataKelas)
        if (kelas.jurusan_id < 1) {
            setKelas(prev => ({
                ...prev,
                jurusan_id: listJurusan[0].id
            }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowNotifikasi(false)
        let urlTarget = kelas.id > 0 ? 'api/kelas/' + kelas.id : 'api/kelas'
        let mtd = kelas.id>0?'put':'post'
        await axios({
            url: urlTarget,
            method: mtd,
            data: kelas
        })
            .then(res => {
                if (kelas.id > 0) {
                    props.update(res.data.kelas)
                    setMessage('Data berhasil diperbaharui')
                } else {
                    props.add(res.data.kelas)
                    setMessage('Data berhasil ditambahkan')
                }
                // console.log(res.data.kelas)
                setShowNotifikasi(true)
            })
            .catch(err =>{
                setTitle('Peringatan')
                setMessage('Kesalahan jaringan!')
                setShowNotifikasi(true)
            })
        props.hideModal()
    }
    useEffect(() => {
        const loadJurusan = async () => {
            await axios({
                url: 'api/jurusan', method: 'GET'
            })
                .then(res => {
                    const { jurusan } = res.data
                    setListJurusan(jurusan)
                })
        }
        loadJurusan()
    }, [])
    return (
        <>
            <Modal show={props.show} onEnter={() => handleShow()} onExit={() => props.hide()} >
                <Modal.Header>
                    <Modal.Title>Form kelas</Modal.Title>
                    <Button className="btn-close" onClick={() => props.hideModal()}></Button>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="kode_kelas" className="mb-3">
                            <Form.Label>Kode kelas</Form.Label>
                            <Form.Control type="text" placeholder="X-TP" autoFocus value={kelas.kode_kelas} name="kode_kelas" onChange={handleInput} required />
                        </Form.Group>
                        <Form.Group controlId="tingkat" className="mb-3">
                            <Form.Label>Tingkat</Form.Label>
                            <Form.Select name="tingkat" onChange={handleInput} >
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="jurusan_id" className="mb-3">
                            <Form.Label>Jurusan</Form.Label>
                            <Form.Select name="jurusan_id" onChange={handleInput} >
                                {listJurusan.length > 0 && listJurusan.map((el, index) => (
                                    <option key={index} value={el.id}>{el.kode_jurusan + '-' + el.deskripsi}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button type="submit" className="form-control">
                                <MdSave className="me-1 mb-1" size="18" />
                                Simpan
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <Notifikasi showToast={showNotifikasi} close={()=>setShowNotifikasi(!showNotifikasi)} title={title} message={message} />
        </>
    )
}

export default KelasModal