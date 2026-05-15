import './AdminHero.css'
import '../main.css'
import NavBar from './NavBar'

export default function AdminHero() {
    return (
        <>
            <section className="navBar">
                < NavBar />
            </section>
            <section className="center">
                <div className="heroContent">
                    <h1 className="welcomeTitle">Welcome, Admin User!</h1>

                    <div className="buttonContainer">
                        <a href="/admin/discount-codes"><button className="invoiceButton">Discount Codes</button></a>
                        <a href="/admin/items"><button className="paymentButton">Items/Services</button></a>
                        <a href="/admin/users"><button className="userButton">Users</button></a>
                    </div>
                </div>
            </section>
        </>
    )
}