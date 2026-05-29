import './DiscountCodes.css'
import '../../main.css'
import NavBar from '../NavBar'
import DiscountCodesList from './DiscountCodesList'

export default function DiscountCodes() {
    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="discountCodePage">
                <section className="discountCodeHeader">
                    <h1 className="discountCodeTitle">Discount Codes</h1>
                    <button className="newDiscountCodeButton">New Discount Code</button>
                </section>

                <section className="discountCodeFilters">
                    <input type="text" className="discountCodeFilterInput" id="codeFilter" placeholder="Filter by code" />
                    <input type="date" className="discountCodeFilterInput" id="expireDateFilter" placeholder="Filter by expire date" />
                    <select className="discountCodeFilterInput" id="typeFilter">
                        <option value="">Filter by type</option>
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed Amount</option>
                    </select>
                </section>

                <section className="discountCodeTableShell">
                    <DiscountCodesList />
                </section>
            </section>
        </>
    )
}