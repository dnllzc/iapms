import { useMemo } from 'react'
import './AdminHero.css'
import '../main.css'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

export default function AdminHero() {
    document.title = "Admin Dashboard - iapms"
    const { user, loading } = useAuth()

    const userName = useMemo(() => {
        if (!user) {
            return 'Admin'
        }

        return user.firstName || 'Admin'
    }, [user])

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="center">
                <div className="heroContent">
                    <h1 className="welcomeTitle">Welcome, {userName}!</h1>

                    <div className="buttonContainer">
                        <Link to="/admin/discount-codes"><button className="invoiceButton">Discount Codes</button></Link>
                        <Link to="/admin/items"><button className="paymentButton">Items/Services</button></Link>
                        <Link to="/admin/users"><button className="userButton">Users</button></Link>
                    </div>
                </div>
            </section>
        </>
    )
}