import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navBar">
            <Link to="/admin">Home</Link>
            <Link to="/admin">Discount Codes</Link>
            <Link to="/admin">Items/Services</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/">Log Out</Link>
        </nav>
    )
}