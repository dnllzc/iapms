import './Invoices.css'
import './main.css'
import NavBar from './NavBar'

export default function Invoices() {
    const testInvoices = [
        { id: 1, email: "john@example.com", name: "John Doe", date: "2023-01-01", status: "Paid" },
        { id: 2, email: "jane@example.com", name: "Jane Smith", date: "2023-01-02", status: "Pending" },
        { id: 3, email: "bob@example.com", name: "Bob Johnson", date: "2023-01-03", status: "Pending" },
        { id: 4, email: "alice@example.com", name: "Alice Brown", date: "2023-01-04", status: "Paid" },
        { id: 5, email: "charlie@example.com", name: "Charlie Davis", date: "2023-01-05", status: "Paid" }
    ]

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
                    <table className="invoiceTable">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Date</th>
                                <th>Client Name</th>
                                <th>Client Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testInvoices.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.id}</td>
                                    <td>{element.date}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.status}</td>
                                    <td>
                                        <div className="invoiceActions">
                                            <button className="invoiceActionButton" id="detailsButton">Details</button>
                                            <button className="invoiceActionButton" id="printButton">Print PDF</button>
                                            <button className="invoiceActionButton" id="copyLinkButton">Copy Link</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </section>
        </>
    )
}