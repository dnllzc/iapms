import './PaymentLink.css'
import '../main.css'
import NavBar from '../NavBar'
import PaymentLinkItemTable from './PaymentLinkItemTable'
import { useState, useEffect } from 'react'

export default function PaymentLink() {
    const pathname = window.location.pathname
    const invoiceId = pathname.split('/')[2]

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [amountDue, setAmountDue] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            invoice_id: invoiceId,
            total_amount: amountDue.toFixed(2),
        }

        fetch('/api/payments/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
            .then(({ ok, data }) => {
                if (ok) {
                    alert('Payment successful!')
                    //window.location.href = `/payment-success/${invoiceId}`
                } else {
                    alert('Payment failed. Please try again.')
                    //window.location.reload()
                }
            })
            .catch((error) => {
                console.error('Error processing payment:', error)
                alert('Payment failed. Please try again.')
            })
    }

    const fetchInvoiceDetails = () => {
        fetch(`/api/invoices/${invoiceId}`)
            .then(res => res.json())
            .then(data => {
                setClientName(data.client_name)
                setClientEmail(data.client_email)
                setAmountDue(Number(data.total_amount) || 0)
            })
    }

    useEffect(() => {
        fetchInvoiceDetails()
    }, [])

    return (
        <>
            <section className="paymentLinkPage">
                <section className="paymentLinkPanel">
                    <div className="leftPanel">
                        <h2 className="paymentLinkTitle">Make a payment</h2>
                        <div className="paymentInfo">
                            <p className="clientInfoLabel">Invoice ID:</p>
                            <p className="clientInfoValue" id='invoiceId'>{invoiceId}</p>
                            <p className="clientInfoLabel">Issued to:</p>
                            <p className="clientInfoValue" id='clientName'>{clientName}</p>
                            <p className="clientInfoLabel" id='clientEmail'>{clientEmail}</p>
                            <p className="clientInfoLabel">Amount Due:</p>
                            <p className="clientInfoValue" id='amountDue'>{amountDue.toFixed(2)}€</p>
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