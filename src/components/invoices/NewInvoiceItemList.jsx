import { useEffect, useState } from 'react'

export default function NewInvoiceItemList({ onAddItem }) {
    const [invoices, setInvoices] = useState([])
    const [quantity, changeQuantity] = useState([])
    
    useEffect(() => {
        fetch('/api/items')
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

    const sortedItems = [...invoices].sort((a, b) => a.id - b.id)
    const itemCount = sortedItems.length

    useEffect(() => {
        changeQuantity(Array(itemCount).fill(1))
    }, [itemCount])

    const incrementQuantity = (index) => {
        changeQuantity((prevQuantities) => {
            const newQuantities = [...prevQuantities]
            newQuantities[index] += 1
            return newQuantities
        })
    }

    const decrementQuantity = (index) => {
        changeQuantity((prevQuantities) => {
            const newQuantities = [...prevQuantities]
            if (newQuantities[index] > 1) {
                newQuantities[index] -= 1
            }
            return newQuantities
        })
    }

    
    return (
        <table className="newInvoiceTable">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedItems.map((element, index) => (
                                <tr key={element.id}>
                                    <td>{element.name}</td>
                                    <td>{element.price.toFixed(2)}€</td>
                                    <td>
                                        <div className="quantityContainer">
                                            <button className="quantityButton" id="decreaseButton" onClick={() => decrementQuantity(index)}>-</button>
                                            <span className="quantityValue">{quantity[index] ?? 1}</span>
                                            <button className="quantityButton" id="increaseButton" onClick={() => incrementQuantity(index)}>+</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="newInvoiceActions">
                                            <button
                                                className="invoiceActionButton"
                                                id="addButton"
                                                type="button"
                                                onClick={() => onAddItem?.(element, quantity[index] ?? 1)}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}