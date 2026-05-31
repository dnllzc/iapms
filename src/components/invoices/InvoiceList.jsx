import { useEffect, useState } from 'react'

export default function InvoiceList() {
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

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString('en-GB');

    // Sort invoices by id in decreasing order
    const sortedInvoices = [...invoices].sort((a, b) => b.id - a.id)
    
    return (
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
                            {sortedInvoices.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{formatDate(element.created_at)}</td>
                                    <td>{element.client_name}</td>
                                    <td>{element.client_email}</td>
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
    )
}