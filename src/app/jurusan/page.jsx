'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { MdCancel, MdDelete, MdEdit, MdSave } from "react-icons/md"

const { Card, Row, Col, Form, Table, Button } = require("react-bootstrap")

const Jurusan =()=>{
    // variable
    const [listJurusan,setListJurusan]=useState([])
    const [jurusan,setJurusan]=useState({
        id:0,
        kode_jurusan:'',
        deskripsi:''
    })

    const handleInput=e=>{
        const {name,value}= e.target
        setJurusan(prev=>({
            ...prev,
            [name]:value
        }))
    }
    const handleCancel = ()=>{
        setJurusan({
            id:0,
            kode_jurusan:'',
            deskripsi:'' 
        })
        document.getElementById('kode_jurusan').focus()
    }
    const handleEdit=(dt)=>{
        setJurusan(dt)
        document.getElementById('kode_jurusan').focus()
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        let mt = jurusan.id >0 ?'put':'post'
        await axios({
            url:'api/jurusan',
            method:mt,
            data:jurusan
        })
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        const loadData=async()=>{
            await axios({
                url:'api/jurusan',method:'get'
            })
            .then(res=>{
                setListJurusan(res.data.jurusan)
            })
            .catch(err=>{
                console.log(err);
            })
        }
        loadData()
    },[])
    return(
        <Row >
            <Col lg={3} >
                <Card>
                    <Card.Header className="text-bg-primary">
                        <Card.Title>Form jurusan</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="kode_jurusan" className="mb-3">
                                <Form.Label>Kode Jurusan</Form.Label>
                                <Form.Control type="text" name="kode_jurusan" placeholder="RPL" autoFocus onChange={e=>handleInput(e)} value={jurusan.kode_jurusan} required/>
                            </Form.Group>
                            <Form.Group controlId="deskripsi" className="mb-3">
                                <Form.Label>Deskripsi</Form.Label>
                                <Form.Control type="text" name="deskripsi" placeholder="Rekayasa Perangkat Lunak"  onChange={e=>handleInput(e)} value={jurusan.deskripsi} required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button className="btn-primary  form-control" type="submit">
                                    <MdSave className="mb-1" /> Simpan
                                </Button>
                                <Button className="btn-success  form-control mt-1" onClick={()=>handleCancel()}>
                                    <MdCancel className="mb-1" /> Batal
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
            <Col className="mt-md-2">
                <Card>
                    <Card.Header className="text-bg-primary">
                        <Card.Title>Data jurusan</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table className="table-sm table-bordered ">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Kode jurusan</th>
                                    <th>Deskripsi</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listJurusan.length>0 && listJurusan.map((el,index)=>(
                                    <tr key={index} className="align-middle">
                                        <td>{index + 1}</td>
                                        <td>{el.kode_jurusan}</td>
                                        <td>{el.deskripsi}</td>
                                        <td >
                                            <Button className="btn-sm btn-success" onClick={()=>handleEdit(el)}><MdEdit /></Button>
                                            <Button className="btn-sm btn-danger ms-1"><MdDelete /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Jurusan