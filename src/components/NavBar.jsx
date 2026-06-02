import './NavBar.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function NavBar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const isAdmin = user?.role === 'admin'

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <nav className="navBar">
            <Link to={isAdmin ? '/admin' : '/home'}>Home</Link>

            {isAdmin && (
                <>
                    <Link to="/admin/discount-codes">Discount Codes</Link>
                    <Link to="/admin/items">Items/Services</Link>
                    <Link to="/admin/users">Users</Link>
                    <div className="divider" />
                </>
            )}
            <Link to="/invoices">Invoices</Link>
            <Link to="/payments">Payments</Link>
            <div className="divider" />
            <button type="button" className="navBarLogoutButton" onClick={handleLogout}>Log Out</button>
        </nav>
    )
}