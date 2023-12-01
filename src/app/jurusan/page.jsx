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
                        <Form>
                            <Form.Group controlId="kode_jurusan" className="mb-3">
                                <Form.Label>Kode Jurusan</Form.Label>
                                <Form.Control type="text" name="kode_jurusan" placeholder="RPL" autoFocus />
                            </Form.Group>
                            <Form.Group controlId="deskripsi" className="mb-3">
                                <Form.Label>Deskripsi</Form.Label>
                                <Form.Control type="text" name="deskripsi" placeholder="Rekayasa Perangkat Lunak"  />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button className="btn-primary  form-control">
                                    <MdSave className="mb-1" /> Simpan
                                </Button>
                                <Button className="btn-success  form-control mt-1">
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
                                            <Button className="btn-sm btn-success"><MdEdit /></Button>
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