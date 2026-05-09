import './NavBar.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <nav className="navBar">
            <Link to="/">Home</Link>
            <Link to="/invoices">Invoices</Link>
            <Link to="/payments">Payments</Link>
        </nav>
    )
}