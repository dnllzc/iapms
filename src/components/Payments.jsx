import './Payments.css'
import './main.css'
import NavBar from './NavBar'
import PaymentList from './PaymentList'

export default function Payments() {
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
                    <input type="text" className="paymentFilterInput" id="emailFilter" placeholder="Filter by email" />
                    <input type="text" className="paymentFilterInput" id="nameFilter" placeholder="Filter by name" />
                    <input type="date" className="paymentFilterInput" id="dateFilter" placeholder="Filter by date" />
                    <select className="paymentFilterInput paymentFilterSelect" id="statusFilter" defaultValue="">
                        <option value="">All Statuses</option>
                        <option value="Paid">Success</option>
                        <option value="Pending">Failed</option>
                    </select>
                </section>

                <section className="paymentTableShell">
                    <PaymentList />
                </section>
            </section>
        </>
    )
}