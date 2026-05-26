import { useState } from 'react'
import './NewInvoices.css'
import './main.css'
import NavBar from './NavBar'
import NewInvoiceItemList from './NewInvoiceItemList'
import NewInvoiceItemsTable from './NewInvoiceItemsTable'

export default function NewInvoice() {
    const [addedItems, setAddedItems] = useState([])
    const totalAmount = addedItems.reduce((sum, item) => {
        return sum + Number(item.price) * item.quantity
    }, 0)

    const handleAddItem = (item, quantity) => {
        const amountToAdd = quantity ?? 1

        setAddedItems((currentItems) => {
            const existingItem = currentItems.find((currentItem) => currentItem.id === item.id)

            if (existingItem) {
                return currentItems.map((currentItem) =>
                    currentItem.id === item.id
                        ? { ...currentItem, quantity: currentItem.quantity + amountToAdd }
                        : currentItem
                )
            }

            return [...currentItems, { ...item, quantity: amountToAdd }]
        })
    }

    const handleRemoveItem = (itemId) => {
        setAddedItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
    }

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="newInvoicePage">
                <section className="newInvoicePanel">
                    <div className="leftPanel">
                        <h2 className="newInvoiceTitle">New Invoice</h2>
                        <input className="newInvoiceInput" id="clientName" placeholder="Client Name" />
                        <input className="newInvoiceInput" id="clientEmail" placeholder="Client Email" />
                        <input className="newInvoiceInput" id="discountCode" placeholder="Discount Code" />

                        <div className="addedItems">
                            <h3 className="addedItemsTitle">Item List</h3>
                            <div className="addedItemsShell">
                                <NewInvoiceItemsTable items={addedItems} onRemoveItem={handleRemoveItem} />
                            </div>
                            <div className="totalAmountRow">
                                <span className="totalAmountLabel">Total Amount:</span>
                                <span className="totalAmountValue">{totalAmount.toFixed(2)}€</span>
                            </div>
                        </div>
                    </div>
                    <div className="rightPanel">
                        <div className="newInvoiceTableShell">
                            <NewInvoiceItemList onAddItem={handleAddItem} />
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}