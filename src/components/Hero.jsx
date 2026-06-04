import { useMemo } from 'react'
import './Hero.css'
import './main.css'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Hero() {
    document.title = 'Home - iapms'
    const { user, loading } = useAuth()

    const userName = useMemo(() => {
        if (!user) {
            return 'Employee'
        }

        return user.firstName || 'Employee'
    }, [user])

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="center">
                <div className="heroContent">
                    <h1 className="welcomeTitle">Welcome, {loading ? 'Employee' : userName}</h1>

                    <div className="buttonContainer">
                        <Link to="/invoices"><button className="invoiceButton">Invoices</button></Link>
                        <Link to="/payments"><button className="paymentButton">Payments</button></Link>
                    </div>
                </div>
            </section>
        </>
    )
}