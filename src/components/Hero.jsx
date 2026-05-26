import './Hero.css'
import './main.css'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <>
            <section className="navBar">
                    < NavBar />
            </section>
            <section className="center">
                <div className="heroContent">
                    <h1 className="welcomeTitle">Welcome, Employee User!</h1>

                    <div className="buttonContainer">
                        <Link to="/invoices"><button className="invoiceButton">Invoices</button></Link>
                        <Link to="/payments"><button className="paymentButton">Payments</button></Link>
                    </div>
                </div>
            </section>
        </>
    )
}