import './Items.css'
import '../../main.css'
import NavBar from '../NavBar'
import ItemList from './ItemList'
import { Link } from 'react-router-dom'

export default function Items() {
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
                    <input type="text" className="itemFilterInput" id="nameFilter" placeholder="Filter by name" />
                </section>

                <section className="itemTableShell">
                    <ItemList />
                </section>
            </section>
        </>
    )
}