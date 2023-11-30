'use client'

import { Button, Modal } from "react-bootstrap"
import { MdCancel, MdDelete } from "react-icons/md"

const DeleteModal = ({show,close,handleDelete,data,hide})=>{
    return (
        <Modal show={show} onExit={()=>hide()}>
            <Modal.Header>
                <Modal.Title>Konfirmasi</Modal.Title>
                <Button className="btn-close" onClick={()=>close()}></Button>
            </Modal.Header>
            <Modal.Body>
                <strong>Apakah anda yakin akan menghapus item ini?</strong>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-sm btn-success" onClick={()=>close()}>
                    <MdCancel /> Batal
                </Button>
                <Button className="btn-sm btn-primary" onClick={()=>handleDelete(data)}>
                    <MdDelete /> Hapus
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal