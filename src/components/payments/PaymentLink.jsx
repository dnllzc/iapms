import './PaymentLink.css'
import '../main.css'
import NavBar from '../NavBar'
import PaymentLinkItemTable from './PaymentLinkItemTable'
import { useState, useEffect } from 'react'

export default function PaymentLink() {
    const pathname = window.location.pathname
    const invoiceId = pathname.split('/')[2]
    document.title = "Payment Link - Invoice #" + invoiceId + " - iapms"

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [amountDue, setAmountDue] = useState(0)
    const [discountCode, setDiscountCode] = useState('')
    const [discountCodeId, setDiscountCodeId] = useState(null)
    const [discountApplied, setDiscountApplied] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('discountCodeId at submit:', discountCodeId)

        const payload = {
            invoice_id: invoiceId,
            total_amount: amountDue.toFixed(2),
        }

        try {
            const res = await fetch('/api/payments/process', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            const data = await res.json()

            if (res.ok) {
                if (discountCodeId) {
                    await updateAmountDue(amountDue, discountCodeId)
                }
                window.location.href = '/payment-done/' + invoiceId
            } else {
                alert('Payment failed. Please try again.')
            }
        } catch (error) {
            console.error('Error processing payment:', error)
            alert('Payment failed. Please try again.')
        }
    }

    const fetchInvoiceDetails = () => {
        fetch(`/api/invoices/${invoiceId}`)
            .then(res => res.json())
            .then(data => {
                setClientName(data.client_name)
                setClientEmail(data.client_email)
                setAmountDue(Number(data.total_amount) || 0)
                if (data.discount_code) {
                    setDiscountCode(data.discount_code)
                    setDiscountApplied(true)
                }
            })
    }

    const checkPaidStatus = () => {
        fetch(`/api/invoices/${invoiceId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'paid') {
                    alert('This invoice has already been paid.')
                    window.location.href = '/payment-done/' + invoiceId
                }
            })
    }

    const handleDiscount = () => {
        fetch('/api/discountcodes/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: discountCode }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setDiscountApplied(true)
                    setDiscountCodeId(data.id)
                    if (data.discount_type === 'percentage') {
                        setAmountDue(prev => prev - (prev * (data.value / 100)))
                    } else if (data.discount_type === 'fixed') {
                        setAmountDue(prev => Math.max(0, prev - data.value))
                    }
                } else {
                    alert('Invalid discount code.')
                    console.error('Error applying discount:', data.message)
                    console.log('Response data:', data)
                    console.log('Request payload:', { code: discountCode })
                }
            })
    }

    const updateAmountDue = (newAmount, codeId) => {
        return fetch('/api/invoices/apply-discount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ invoice_id: invoiceId, discount_code_id: codeId, total_amount: newAmount.toFixed(2) }),
        })
            .then(res => res.json()
            .then(data => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {
                if (!ok) {
                    console.error("Failed to apply discount: ", data)
                }
            })
    }

    useEffect(() => {
        fetchInvoiceDetails()
    }, [])

    useEffect(() => {
        checkPaidStatus()
    })

    return (
        <>
            <section className="paymentLinkPage">
                <section className="paymentLinkPanel">
                    <div className="leftPanel">
                        <h2 className="paymentLinkTitle">Make a payment</h2>
                        <div className="paymentInfo">
                            <div className="paymentInfoRow">
                                <span className="paymentInfoLabel">Invoice ID:</span>
                                <span className="paymentInfoValue" id="invoiceId">INV-{invoiceId}</span>
                            </div>
                            <div className="paymentInfoRow">
                                <span className="paymentInfoLabel">Issued to:</span>
                                <span className="paymentInfoValue" id="clientName">{clientName}</span>
                            </div>
                            <div className="paymentInfoRow">
                                <span className="paymentInfoLabel">Client email:</span>
                                <span className="paymentInfoValue" id="clientEmail">{clientEmail}</span>
                            </div>
                            <div className="paymentInfoRow paymentInfoRowEmphasis">
                                <span className="paymentInfoLabel">Amount Due:</span>
                                <span className="paymentInfoValue" id="amountDue">{amountDue.toFixed(2)}€</span>
                            </div>
                        </div>
                        <div className="paymentProcess">
                            <form className="paymentForm" onSubmit={handleSubmit}>
                                <label htmlFor="cardholderName">Cardholder Name</label>
                                <input type="text" className="paymentCardInput" id="cardholderName" name="cardholderName" placeholder="John Doe" required />
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" className="paymentCardInput" id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" required />
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input type="text" className="paymentCardInput" id="expiryDate" name="expiryDate" placeholder="MM/YY" required />
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" className="paymentCardInput" id="cvv" name="cvv" placeholder="123" required />
                                {discountApplied ? 
                                    <input type="text" className="paymentCardInput" id="discount" name="discount" placeholder={discountCode} disabled /> :
                                    <>
                                    <input type="text" className="paymentCardInput" id="discount" name="discount" placeholder="Discount Code" onChange={(e) => setDiscountCode(e.target.value.trim())} />
                                    <button type="button" className="applyDiscountButton" onClick={handleDiscount}>Apply Discount</button>
                                    </>
                                }
                                <button type="submit" className="payButton">Pay Now</button>
                            </form>
                        </div>
                        
                    </div>
                    <div className="rightPanel">
                        <div className="paymentLinkItemTableShell">
                            <PaymentLinkItemTable invoice_id={invoiceId}/>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}