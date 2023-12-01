'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MdAnalytics, MdClass, MdHome } from "react-icons/md";
export default function Sidebar() {
    const path = usePathname()
    const menu = [
        { text: 'Dashboard', path: '/', icon: MdHome },
        { text: 'Kelas', path: '/kelas', icon: MdClass },
        { text: 'Jurusan', path: '/jurusan', icon: MdAnalytics },
    ]
    return (
        <div id="sidebar" className="text-bg-primary">
            <ul className="nav flex-column">
                {menu.map((el, index) => (
                    <li className="nav-item" key={index}>
                        <Link href={el.path} className={path==el.path?'active nav-link d-flex align-items-center':"nav-link d-flex align-items-center" }>
                            <el.icon size={20} className="me-1"  /> {el.text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}