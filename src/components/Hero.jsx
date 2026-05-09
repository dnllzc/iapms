import './Hero.css'
import './main.css'

export default function Hero() {
    const type = 'admin'
    return (
        <section className="center">
            <div className="heroContent">
                <h1 className="welcomeTitle">Welcome, {type}!</h1>

                <div className="buttonContainer">
                    <a href="/invoices"><button className="invoiceButton">Invoices</button></a>
                    <a href="/payments"><button className="paymentButton">Payments</button></a>
                </div>
            </div>
        </section>
    )
}