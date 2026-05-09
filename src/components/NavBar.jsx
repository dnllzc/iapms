import './NavBar.css'

export default function NavBar() {
    return (
        <nav className="navBar">
            <a href="/">Home</a>
            <a href="/invoices">Invoices</a>
            <a href="/payments">Payments</a>
        </nav>
    )
}