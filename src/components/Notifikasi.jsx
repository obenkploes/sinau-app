'use client'

import { Toast, ToastContainer } from "react-bootstrap"

export default function Notifikasi({ showToast, title, message, close }) {
    return (
        <ToastContainer position="top-end" className="me-2 mb-2">
            <Toast show={showToast} onClose={() => close()} delay={5000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}