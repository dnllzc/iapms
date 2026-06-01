import './DetailsPage.css'
import '../main.css'
import NavBar from '../NavBar'
import PaymentLinkItemTable from '../payments/PaymentLinkItemTable'
import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function DetailsPage() {
    const pathname = window.location.pathname
    const invoiceId = pathname.split('/')[3]

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [amountDue, setAmountDue] = useState(0)
    const [status, setStatus] = useState('')

    const fetchInvoiceDetails = () => {
        fetch(`/api/invoices/${invoiceId}`)
            .then(res => res.json())
            .then(data => {
                setClientName(data.client_name)
                setClientEmail(data.client_email)
                setAmountDue(Number(data.total_amount) || 0)
                setStatus(data.status)
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

    useEffect(() => {
        fetchInvoiceDetails()
    }, [])

    useEffect(() => {
        checkPaidStatus()
    })

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="detailsPage">
                <section className="detailsPanel">
                    <div className="leftPanel">
                        <h2 className="detailsTitle">Invoice Details</h2>
                        <div className="detailsInfo">
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Invoice ID:</span>
                                <span className="detailsInfoValue" id="invoiceId">{invoiceId}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Issued to:</span>
                                <span className="detailsInfoValue" id="clientName">{clientName}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Client email:</span>
                                <span className="detailsInfoValue" id="clientEmail">{clientEmail}</span>
                            </div>
                            <div className="detailsInfoRow detailsInfoRowEmphasis">
                                <span className="detailsInfoLabel">Amount Due:</span>
                                <span className="detailsInfoValue" id="amountDue">{amountDue.toFixed(2)}€</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Status:</span>
                                <span className="detailsInfoValue" id="status">{status}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Created At:</span>
                                <span className="detailsInfoValue" id="createdAt">{new Date().toLocaleString()}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Payment Link:</span>
                                <span className="detailsInfoValue" id="paymentLinks"><a href={`http://88.200.63.148:30092/pay/` + invoiceId} className="paymentLink">View Payment Link</a></span>
                            </div>
                        </div>
                        <div className="detailsBottomInfo">
                            <div className="detailsButtons">
                                <CopyToClipboard text={`http://88.200.63.148:30092/pay/` + invoiceId}>
                                    <button className="copyButton">Copy Payment Link</button>
                                </CopyToClipboard>
                                <button className="printButton">Print Receipt</button>
                                <button className="cancelButton">Invalidate Invoice</button>
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