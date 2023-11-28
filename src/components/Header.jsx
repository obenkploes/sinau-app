'use client'

import { Navbar } from "react-bootstrap"

export default function Header() {
    return(
        <Navbar className="navbar-dark bg-primary bg-gradient">
            <div className="title">
                <Navbar.Brand className="container-fluid fw-bold">SINAU</Navbar.Brand>
            </div>
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <a href="#" className="nav-link text-white">Hello</a>
                    </li>
                </ul>
            </div>
        </Navbar>
    )
}