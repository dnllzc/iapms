import './Payments.css'
import '../main.css'
import NavBar from '../NavBar'
import PaymentList from './PaymentList'
import { useState } from 'react'

export default function Payments() {
    const [filters, setFilters] = useState({
        email: '',
        name: '',
        date: '',
        status: ''
    })

    const handleFilter = (e) => {
        setFilters(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const clearFilters = () => {
        setFilters({
            email: '',
            name: '',
            date: '',
            status: ''
        })
        document.getElementById('email').value = ''
        document.getElementById('name').value = ''
        document.getElementById('date').value = ''
        document.getElementById('status').value = ''
    }

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="paymentPage">
                <section className="paymentHeader">
                    <h1 className="paymentTitle">Payments</h1>
                </section>

                <section className="paymentFilters">
                    <input type="text" className="paymentFilterInput" id="email" placeholder="Filter by email" onChange={handleFilter} />
                    <input type="text" className="paymentFilterInput" id="name" placeholder="Filter by name" onChange={handleFilter} />
                    <input type="date" className="paymentFilterInput" id="date" placeholder="Filter by date" onChange={handleFilter} />
                    <select className="paymentFilterInput paymentFilterSelect" id="status" defaultValue="" onChange={handleFilter}>
                        <option value="">All Statuses</option>
                        <option value="Paid">Success</option>
                        <option value="Pending">Failed</option>
                    </select>
                    <button className="newInvoiceButton" onClick={clearFilters}>Clear Filters</button>
                </section>

                <section className="paymentTableShell">
                    <PaymentList filters={filters} />
                </section>
            </section>
        </>
    )
}