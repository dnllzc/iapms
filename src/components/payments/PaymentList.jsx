import { useEffect, useState } from 'react'

export default function PaymentList() {
    const [payments, setPayments] = useState([])
        
        useEffect(() => {
            fetch('/api/payments')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response failed')
                    }
                    return response.json()
                })
                .then((data) => {
                    setPayments(data)
                })
                .catch((error) => {
                    console.error('Error fetching payments:', error)
                })
        }, [])

        const [invoices, setInvoices] = useState([])

        useEffect(() => {
            fetch('/api/invoices')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response failed')
                    }
                    return response.json()
                })
                .then((data) => {
                    setInvoices(data)
                })
                .catch((error) => {
                    console.error('Error fetching invoices:', error)
                })
        }, [])

    // Sort payments by id in decreasing order
    const sortedPayments = [...payments].sort((a, b) => b.id - a.id)

    // Map payments to include client name and email from invoices
    const enrichedPayments = sortedPayments.map((payment) => {
        const invoice = invoices.find((inv) => inv.id === payment.invoice_id)
        return {
            ...payment,
            name: invoice ? invoice.client_name : 'Unknown',
            email: invoice ? invoice.client_email : 'Unknown',
        }
    })

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString('en-GB');
    
    return (
        <table className="paymentTable">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client Name</th>
                                <th>Client Email</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enrichedPayments.map((element) => (
                                <tr key={element.id}>
                                    <td>{formatDate(element.payment_date)}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.amount.toFixed(2)}€</td>
                                    <td>{element.status}</td>
                                    <td>
                                        <div className="paymentActions">
                                            <button className="paymentActionButton" id="detailsButton">Print PDF</button>
                                            <button className="paymentActionButton" id="printButton">Details</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}