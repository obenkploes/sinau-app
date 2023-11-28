'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { Navbar } from "react-bootstrap";
export default function Home() {
  return (
    <Navbar>
      <div className="container">
        <Navbar.Brand>Helloo</Navbar.Brand>
      </div>
    </Navbar>
  )
}
