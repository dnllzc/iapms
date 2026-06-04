import './Users.css'
import '../../main.css'
import NavBar from '../NavBar'
import UserList from './UserList'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Users() {
    document.title = "Users - iapms"
    const [filters, setFilters] = useState({
        email: '',
        name: ''
    })

    const handleFilter = (e) => {
        setFilters(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const clearFilters = () => {
        setFilters({
            email: '',
            name: ''
        })
        document.getElementById('email').value = ''
        document.getElementById('name').value = ''
    }

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="userPage">
                <section className="userHeader">
                    <h1 className="userTitle">Users</h1>
                    <Link to="/admin/users/new"><button className="newUserButton">New User</button></Link>
                </section>

                <section className="userFilters">
                    <input type="text" className="userFilterInput" id="email" placeholder="Filter by email" onChange={handleFilter} />
                    <input type="text" className="userFilterInput" id="name" placeholder="Filter by name" onChange={handleFilter} />
                    <button className="newInvoiceButton" onClick={clearFilters}>Clear Filters</button>
                </section>

                <section className="userTableShell">
                    <UserList filters={filters} />
                </section>
            </section>
        </>
    )
}