'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Form, ListGroup, Modal } from "react-bootstrap"
import { MdSave } from "react-icons/md"


const KelasModal = (props) => {
    const [listJurusan,setListJurusan]=useState([])
    const [kelas, setKelas] = useState({
        kode_kelas: '',
        tingkat:10,
        jurusan_id:0
    })
    const handleInput = e => {
        const { name, value } = e.target
        setKelas(prevstate => ({
            ...prevstate,
            [name]: value
        }))
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios({
            url:'api/kelas',
            method:'post',
            data:kelas
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        const loadJurusan = async ()=>{
            await axios({
                url:'api/jurusan',method:'GET'
            })
            .then(res=>{
                const {jurusan}=res.data
                setKelas(prev=>({
                    ...prev,
                    jurusan_id:jurusan[0].id
                }))
                setListJurusan(jurusan)
            })
        }
        loadJurusan()
    },[])
    return (
        <Modal show={props.show}>
            <Modal.Header>
                <Modal.Title>Form kelas</Modal.Title>
                <Button className="btn-close" onClick={() => props.hideModal()}></Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="kode_kelas" className="mb-3">
                        <Form.Label>Kode kelas</Form.Label>
                        <Form.Control type="text" placeholder="X-TP" autoFocus value={kelas.kode_kelas} name="kode_kelas" onChange={handleInput} />
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
                            {listJurusan.length>0 && listJurusan.map((el,index)=>(
                                <option key={index} value={el.id}>{el.kode_jurusan +'-'+el.deskripsi}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button type="submit" className="form-control">
                            <MdSave className="me-1 mb-1" size="18"/>
                            Simpan
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default KelasModal