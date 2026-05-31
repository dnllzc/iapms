import { useState } from 'react'
import './NewInvoices.css'
import '../main.css'
import NavBar from '../NavBar'
import NewInvoiceItemList from './NewInvoiceItemList'
import NewInvoiceItemsTable from './NewInvoiceItemsTable'

export default function NewInvoice() {
    const [addedItems, setAddedItems] = useState([])
    const [discount, setDiscount] = useState(null)
    const [discountCodeInput, setDiscountCodeInput] = useState('')

    // subtotal before discount
    const subtotal = addedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // total after applying discount (if any)
    const totalAmount = (() => {
        if (!discount) return subtotal
        if (discount.discount_type === 'percentage') {
            return subtotal * (1 - Number(discount.value) / 100)
        }
        if (discount.discount_type === 'fixed') {
            return Math.max(0, subtotal - Number(discount.value))
        }
        return subtotal
    })()

    const handleCreate = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if (!form.checkValidity()) {
            form.reportValidity()
            return
        }
        console.log('Create invoice ', { addedItems }, '\nClient Name: ', form.clientName.value, '\nClient Email: ', form.clientEmail.value, '\nDiscount Code: ', form.discountCode.value, '\nTotal Amount: ', totalAmount.toFixed(2))
        //window.location.href = '/invoices'

        const payloadInvoice = {
            client_name: form.clientName.value,
            client_email: form.clientEmail.value,
            total_amount: totalAmount.toFixed(2),
            created_at: new Date().toISOString(),
            payment_link: '',
            user_id: 1,
            discount_code_id: discount ? discount.id : null,
        }

        const payloadItems = addedItems.map(item => ({
            quantity: item.quantity,
            price: item.price * item.quantity,
            item_id: item.id,
            invoice_id: null,
        }))

        fetch('/api/invoices/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payloadInvoice),
        }).then(res => {
            if (!res.ok) throw new Error(`Status ${res.status}`)
            return res.json()
        }).then(data => {
            const createdInvoiceId = data.id ?? data.invoice_id
            const itemsWithInvoiceId = payloadItems.map(item => ({ ...item, invoice_id: createdInvoiceId }))

            fetch('/api/invoices/additems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: itemsWithInvoiceId }),
            }).then(res => {
                if (!res.ok) throw new Error(`Status ${res.status}`)
                return res.json()
            }).then(() => {
                alert('Invoice created successfully!')
                window.location.href = '/invoices'
            }).catch(error => {
                console.error('Error creating invoice items:', error)
                alert('Error creating invoice items. Please try again later.')
            })
        }).catch(error => {
            console.error('Error creating invoice:', error)
            alert('Error creating invoice. Please try again later.')
        })
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

    const handleApplyDiscount = (discountCode) => {
        const code = typeof discountCode === 'string' && discountCode.length ? discountCode : discountCodeInput
        if (!code) {
            alert('Please enter a discount code.')
            return
        }
        console.log('Apply discount code:', code)
        fetch('/api/discountcodes')
            .then((res) => {
                if (!res.ok) throw new Error(`Status ${res.status}`)
                return res.json()
            })
            .then((codes) => {
                const found = Array.isArray(codes) ? codes.find(c => String(c.code) === String(code)) : null
                if (!found) {
                    alert('Invalid discount code. Please try again.')
                    return
                }

                if (found.expiration_date) {
                    const exp = new Date(found.expiration_date)
                    const now = new Date()
                    if (exp < now) {
                        alert('Discount code has expired.')
                        return
                    }
                }

                setDiscount(found)
                alert('Discount code applied successfully!')
            })
            .catch((error) => {
                console.error('Error applying discount code:', error)
                alert('Error applying discount code. Try again later.')
            })
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
                            <input className="newInvoiceInput" id="discountCode" name="discountCode" placeholder="Discount Code" value={discountCodeInput} onChange={(e) => setDiscountCodeInput(e.target.value)} />
                            <button className="newInvoiceButton" id="applyDiscountButton" type="button" onClick={handleApplyDiscount} >Apply Discount</button>

                            <div className="addedItems">
                            <h3 className="addedItemsTitle">Item List</h3>
                            <div className="addedItemsShell">
                                <NewInvoiceItemsTable items={addedItems} onRemoveItem={handleRemoveItem} />
                            </div>
                            <div className="totalAmountRow">
                                <span className="totalAmountLabel">Total Amount:</span>
                                <span className="totalAmountValue">{totalAmount.toFixed(2)}€</span>
                            </div>
                            <div className="discountInfoRow">
                                <span className="discountInfoLabel">Applied Discount:</span>
                                <span className="discountInfoValue">
                                    {discount ? `${discount.code} (${discount.discount_type === 'percentage' ? discount.value + '%' : discount.value + '€'})` : 'None'}
                                </span>
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