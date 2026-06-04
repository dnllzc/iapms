import './DiscountCodes.css'
import '../../main.css'
import NavBar from '../NavBar'
import DiscountCodesList from './DiscountCodesList'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function DiscountCodes() {
    const [filters, setFilters] = useState({
        code: '',
        expireDate: '',
        type: ''
    })

    const handleFilter = (e) => {
        setFilters(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const clearFilters = () => {
        setFilters({
            code: '',
            expireDate: '',
            type: ''
        })

        document.getElementById('code').value = ''
        document.getElementById('expireDate').value = ''
        document.getElementById('type').value = ''
    }

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="discountCodePage">
                <section className="discountCodeHeader">
                    <h1 className="discountCodeTitle">Discount Codes</h1>
                    <Link to="/admin/discount-codes/new"><button className="newDiscountCodeButton">New Discount Code</button></Link>
                </section>

                <section className="discountCodeFilters">
                    <input type="text" className="discountCodeFilterInput" id="code" placeholder="Filter by code" onChange={handleFilter} />
                    <input type="date" className="discountCodeFilterInput" id="expireDate" placeholder="Filter by expire date" onChange={handleFilter} />
                    <select className="discountCodeFilterInput" id="type" defaultValue="" onChange={handleFilter}>
                        <option value="">Filter by type</option>
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                    </select>
                    <button className="newInvoiceButton" onClick={clearFilters}>Clear Filters</button>
                </section>

                <section className="discountCodeTableShell">
                    <DiscountCodesList filters={filters} />
                </section>
            </section>
        </>
    )
}