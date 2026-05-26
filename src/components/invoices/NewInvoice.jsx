import { useState } from 'react'
import './NewInvoices.css'
import '../main.css'
import NavBar from '../NavBar'
import NewInvoiceItemList from './NewInvoiceItemList'
import NewInvoiceItemsTable from './NewInvoiceItemsTable'

export default function NewInvoice() {
    const [addedItems, setAddedItems] = useState([])
    const totalAmount = addedItems.reduce((sum, item) => {
        return sum + Number(item.price) * item.quantity
    }, 0)

    const handleCreate = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }
        console.log('Create invoice ', { addedItems }, '\nClient Name: ', form.clientName.value, '\nClient Email: ', form.clientEmail.value, '\nDiscount Code: ', form.discountCode.value, '\nTotal Amount: ', totalAmount.toFixed(2))
        //window.location.href = '/invoices'
    }

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
                        <form className="newInvoiceForm" onSubmit={handleCreate}>
                            <input className="newInvoiceInput" id="clientName" name="clientName" placeholder="Client Name" required />
                            <input className="newInvoiceInput" id="clientEmail" name="clientEmail" type="email" placeholder="Client Email" required />
                            <input className="newInvoiceInput" id="discountCode" name="discountCode" placeholder="Discount Code" />

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
                            <div className="newInvoiceButtons">
                                <button className="invoiceActionButtons" id="createButton" type="submit">Create</button>
                                <button className="invoiceActionButtons" id="cancelButton" type="button" onClick={() => (window.location.href = '/invoices')}>Cancel</button>
                            </div>
                        </form>
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