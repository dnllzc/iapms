import './DetailsPage.css'
import '../main.css'
import NavBar from '../NavBar'
import PaymentLinkItemTable from '../payments/PaymentLinkItemTable'
import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import InvTemplate from '../pdf/invTemplate.jsx'

export default function DetailsPage() {
    const pathname = window.location.pathname
    const invoiceId = pathname.split('/')[3]

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [amountDue, setAmountDue] = useState(0)
    const [invoiceDate, setInvoiceDate] = useState('')
    const [status, setStatus] = useState('')
    const [discountCode, setDiscountCode] = useState('None')
    const [discountCodeId, setDiscountCodeId] = useState(null)

    const fetchInvoiceDetails = () => {
        fetch(`/api/invoices/${invoiceId}`)
            .then(res => res.json())
            .then(data => {
                setClientName(data.client_name)
                setClientEmail(data.client_email)
                setAmountDue(Number(data.total_amount) || 0)
                setInvoiceDate(new Date(data.created_at).toLocaleString())
                setStatus(data.status)
                setDiscountCodeId(data.discount_code_id)
            })
    }

    const fetchDiscountCode = () => {
        if (discountCodeId) {
            fetch(`/api/discountcodes/${discountCodeId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.code) {
                        if (data.discount_type === 'percentage') {
                            setDiscountCode(`${data.code} (${data.value}% off)`)
                        } else if (data.discount_type === 'fixed') {
                            setDiscountCode(`${data.code} (${data.value.toFixed(2)}€ off)`)
                        } else {
                            setDiscountCode(data.code)
                        }
                    }
                }
            )
        } else {
            setDiscountCode('None')
        }
    }

    const invalidateInvoice = () => {
        if (status === 'paid') {
            alert('Cannot invalidate a paid invoice.')
            return
        }
        if (!window.confirm('Are you sure you want to invalidate invoice #' + invoiceId + '? This action cannot be undone.')) {
            return
        }
        fetch(`/api/invoices/delete/${invoiceId}`)
        .then(res => {
            if (res.ok) {
                alert('Invoice invalidated successfully.')
                window.location.href = '/invoices'
            } else {
                alert('Failed to invalidate invoice. Please try again.')
            }
        })
    }

    const handlePrint = () => {
        const printWindow = window.open(`/print/invoice/${invoiceId}`, '_blank')
        printWindow.document.close()
        setTimeout(() => {
            printWindow.focus()
            printWindow.print()
            printWindow.close()
        }, 500)
    }

    useEffect(() => {
        fetchInvoiceDetails()
    }, [])

    useEffect(() => {
        fetchDiscountCode()
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
                                <span className="detailsInfoLabel">Discount Code:</span>
                                <span className="detailsInfoValue" id="discountCode">{discountCode}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Status:</span>
                                <span className="detailsInfoValue" id="status">{status}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Created At:</span>
                                <span className="detailsInfoValue" id="createdAt">{invoiceDate}</span>
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
                                <button className="printButton" onClick={handlePrint}>Print Receipt</button>
                                <button className="cancelButton" onClick={invalidateInvoice}>Invalidate Invoice</button>
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