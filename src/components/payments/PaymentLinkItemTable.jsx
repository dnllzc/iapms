import { useEffect, useState } from 'react'

export default function PaymentLinkItemTable({ invoice_id }) {
    const [items, setItems] = useState([])

    useEffect(() => {
        const fetchItems = async () => {
            try {
                if (!invoice_id) {
                    setItems([])
                    return
                }

                const response = await fetch('/api/payments/info/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ invoice_id })
                })

                if (!response.ok) {
                    throw new Error(`Status ${response.status}`)
                }

                const data = await response.json()
                setItems(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error('Error fetching payment link items:', error)
            }
        }

        fetchItems()
    }, [invoice_id])

    return (
        <>
            <table className="paymentLinkTable paymentLinkItemTable">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.item_id}>
                        <td>{item.name}</td>
                        <td>{item.price.toFixed(2)}€</td>
                        <td>{item.quantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}