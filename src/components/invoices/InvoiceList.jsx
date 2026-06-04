import { useEffect, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'
import { handlePrint } from '../pdf/invTemplate.jsx'

export default function InvoiceList({ filters }) {
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

    const filteredInvoices = [...invoices]
        .sort((a, b) => b.id - a.id)
        .filter((inv) => {
            const emailMatch = inv.client_email.toLowerCase().includes(filters.email.toLowerCase())
            const nameMatch = inv.client_name.toLowerCase().includes(filters.name.toLowerCase())
            const dateMatch = filters.date ? formatDate(inv.created_at) === formatDate(filters.date) : true
            const statusMatch = filters.status ? inv.status === filters.status : true
            return emailMatch && nameMatch && dateMatch && statusMatch
        })
    
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
                            {filteredInvoices.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{formatDate(element.created_at)}</td>
                                    <td>{element.client_name}</td>
                                    <td>{element.client_email}</td>
                                    <td>{element.status}</td>
                                    <td>
                                        <div className="invoiceActions">
                                            <Link to={`/invoices/details/` + element.id}>
                                                <button className="invoiceActionButton" id="detailsButton">Details</button>
                                            </Link>
                                            <button className="invoiceActionButton" id="printButton" onClick={() => handlePrint('invoice', element.id)}>Print PDF</button>
                                            <CopyToClipboard text={`http://88.200.63.148:30092/pay/` + element.id} onCopy={() => alert("Link copied to clipboard!")}>
                                                <button className="invoiceActionButton" id="copyLinkButton">Copy Link</button>
                                            </CopyToClipboard>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}