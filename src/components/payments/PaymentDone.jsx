import './PaymentLink.css'
import '../main.css'
import NavBar from '../NavBar'
import PaymentLinkItemTable from './PaymentLinkItemTable'
import { useState, useEffect } from 'react'
import { handlePrint } from '../pdf/invTemplate.jsx'

export default function PaymentDone() {
    const pathname = window.location.pathname
    const invoiceId = pathname.split('/')[2]

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [amountDue, setAmountDue] = useState(0)
    const [paymentId, setPaymentId] = useState('')
    const [discountCodeId, setDiscountCodeId] = useState(null)
    const [discountCode, setDiscountCode] = useState('')

    const fetchInvoiceDetails = () => {
        fetch(`/api/invoices/${invoiceId}`)
            .then(res => res.json())
            .then(data => {
                setClientName(data.client_name)
                setClientEmail(data.client_email)
                setAmountDue(Number(data.total_amount) || 0)
                if (data.discount_code_id) {
                    setDiscountCodeId(data.discount_code_id)
                    fetchDiscountCode(data.discount_code_id)
                }
            })
    }

    const checkPaidStatus = () => {
        fetch(`/api/invoices/${invoiceId}`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'pending') {
                    alert('This invoice has not been paid yet. Redirecting...')
                    window.location.href = `/pay/${invoiceId}`
                } else {
                    fetch('/api/payments/info', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ invoice_id: invoiceId })
                    }).then(res => res.json())
                    .then(paymentInfo => {
                        if (paymentInfo.status === 'failed') {
                            alert('The payment failed. \nPlease try again. Redirecting...')
                            window.location.href = `/pay/${invoiceId}`
                        }
                     })
                }
            })
    }

    const fetchPaymentId = () => {
        fetch('/api/payments/inv/' + invoiceId)
            .then(res => res.json())
            .then(data => {
                setPaymentId(data.id)
            })
    }

    const fetchDiscountCode = (discountCodeId) => {
        if (!discountCodeId) return
        fetch('/api/discountcodes/' + discountCodeId)
            .then(res => res.json())
            .then(data => {
                if (data.discount_type === 'percentage') {
                    setDiscountCode(data.code + ' (' + data.value + '% off)')
                } else if (data.discount_type === 'fixed') {
                    setDiscountCode(data.code + ' (' + data.value + '€ off)')
                }
            })
    }

    useEffect(() => {
        fetchInvoiceDetails()
    }, [])

    useEffect(() => {
        checkPaidStatus()
    })

    useEffect(() => {
        fetchPaymentId()
    }, [invoiceId])

    return (
        <>
            <section className="paymentLinkPage">
                <section className="paymentLinkPanel">
                    <div className="leftPanel">
                        <h2 className="paymentLinkTitle">Payment Confirmation</h2>
                        <div className="paymentInfo">
                            <div className="paymentInfoRow">
                                <span className="paymentInfoLabel">Invoice ID:</span>
                                <span className="paymentInfoValue" id="invoiceId">INV-{invoiceId}</span>
                            </div>
                            <div className="paymentInfoRow">
                                <span className="paymentInfoLabel">Receipt ID:</span>
                                <span className="paymentInfoValue" id="paymentId">RCP-{paymentId}</span>
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
                                <span className="paymentInfoLabel">Amount Paid:</span>
                                <span className="paymentInfoValue" id="amountDue">{amountDue.toFixed(2)}€</span>
                            </div>
                            <div className="paymentInfoRow paymentInfoRowEmphasis">
                                <span className="paymentInfoLabel">Discount Code:</span>
                                <span className="paymentInfoValue" id="discountCode">{discountCode || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="paymentProcess">
                            <div className="paymentForm">
                                <div className="paymentProcessRow">
                                    <p className="paymentProcessText">Thank you for your payment! Your transaction has been successfully processed.</p>
                                </div>
                                <button className="printButton" onClick={() => handlePrint('receipt', paymentId)}>Print Receipt</button>
                            </div>
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