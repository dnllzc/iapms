import './Items.css'
import '../../main.css'
import NavBar from '../NavBar'
import ItemList from './ItemList'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Items() {
    document.title = "Items - iapms"
    const [filters, setFilters] = useState({
        name: ''
    })

    const handleFilter = (e) => {
        setFilters(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const clearFilters = () => {
        setFilters({
            name: ''
        })
        document.getElementById('name').value = ''
    }
    
    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="itemPage">
                <section className="itemHeader">
                    <h1 className="itemTitle">Items</h1>
                    <Link to="/admin/items/new"><button className="newItemButton">New Item</button></Link>
                </section>

                <section className="itemFilters">
                    <input type="text" className="itemFilterInput" id="name" placeholder="Filter by name" onChange={handleFilter} />
                    <button className="newInvoiceButton" onClick={clearFilters}>Clear Filters</button>
                </section>

                <section className="itemTableShell">
                    <ItemList filters={filters} />
                </section>
            </section>
        </>
    )
}