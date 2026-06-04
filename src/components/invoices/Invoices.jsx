import './Invoices.css'
import '../main.css'
import NavBar from '../NavBar'
import InvoiceList from './InvoiceList'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Invoices() {
    const [filters, setFilters] = useState({
        email: '',
        name: '',
        date: '',
        status: ''
    })

    const handleFilter = (e) => {
        setFilters(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="invoicePage">
                <section className="invoiceHeader">
                    <h1 className="invoiceTitle">Invoices</h1>
                    <Link to="/invoices/new"><button className="newInvoiceButton">New Invoice</button></Link>
                </section>

                <section className="invoiceFilters">
                    <input type="text" className="invoiceFilterInput" id="email" placeholder="Filter by email" onChange={handleFilter} />
                    <input type="text" className="invoiceFilterInput" id="name" placeholder="Filter by name" onChange={handleFilter} />
                    <input type="date" className="invoiceFilterInput" id="date" placeholder="Filter by date" onChange={handleFilter} />
                    <select className="invoiceFilterInput invoiceFilterSelect" id="status" defaultValue="" onChange={handleFilter}>
                        <option value="">All Statuses</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                </section>

                <section className="invoiceTableShell">
                    <InvoiceList filters={filters} />
                </section>
            </section>
        </>
    )
}