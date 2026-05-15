import './Hero.css'
import './main.css'
import NavBar from './NavBar'

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
                        <a href="/invoices"><button className="invoiceButton">Invoices</button></a>
                        <a href="/payments"><button className="paymentButton">Payments</button></a>
                    </div>
                </div>
            </section>
        </>
    )
}