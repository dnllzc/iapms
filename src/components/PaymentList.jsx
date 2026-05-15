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
    
    return (
        <table className="paymentTable">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client Name</th>
                                <th>Client Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.date}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
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