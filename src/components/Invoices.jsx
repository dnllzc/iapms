import './Invoices.css'
import './main.css'
import NavBar from './NavBar'
import InvoiceList from './InvoiceList'

export default function Invoices() {
    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="invoicePage">
                <section className="invoiceHeader">
                    <h1 className="invoiceTitle">Invoices</h1>
                    <button className="newInvoiceButton">New Invoice</button>
                </section>

                <section className="invoiceFilters">
                    <input type="text" className="invoiceFilterInput" id="emailFilter" placeholder="Filter by email" />
                    <input type="text" className="invoiceFilterInput" id="nameFilter" placeholder="Filter by name" />
                    <input type="date" className="invoiceFilterInput" id="dateFilter" placeholder="Filter by date" />
                    <select className="invoiceFilterInput invoiceFilterSelect" id="statusFilter" defaultValue="">
                        <option value="">All Statuses</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                </section>

                <section className="invoiceTableShell">
                    <InvoiceList />
                </section>
            </section>
        </>
    )
}