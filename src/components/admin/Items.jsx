import './Items.css'
import '../main.css'
import NavBar from './NavBar'
import ItemList from './ItemList'

export default function Items() {
    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="itemPage">
                <section className="itemHeader">
                    <h1 className="itemTitle">Items</h1>
                    <button className="newItemButton">New Item</button>
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