import './Users.css'
import '../../main.css'
import NavBar from '../NavBar'
import UserList from './UserList'
import { Link } from 'react-router-dom'

export default function Users() {
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
                    <input type="text" className="userFilterInput" id="emailFilter" placeholder="Filter by email" />
                    <input type="text" className="userFilterInput" id="nameFilter" placeholder="Filter by name" />
                </section>

                <section className="userTableShell">
                    <UserList />
                </section>
            </section>
        </>
    )
}