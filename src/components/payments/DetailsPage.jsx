import './DetailsPage.css'
import '../main.css'
import NavBar from '../NavBar'
import PaymentLinkItemTable from '../payments/PaymentLinkItemTable'
import { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Link } from 'react-router-dom'

export default function DetailsPage() {
    const pathname = window.location.pathname
    const paymentId = pathname.split('/')[3]

    const [clientName, setClientName] = useState('')
    const [clientEmail, setClientEmail] = useState('')
    const [amountDue, setAmountDue] = useState(0)
    const [status, setStatus] = useState('')
    const [discountCode, setDiscountCode] = useState('None')
    const [discountCodeId, setDiscountCodeId] = useState(null)
    const [issueDate, setIssueDate] = useState('')
    const [payStatus, setPayStatus] = useState('')
    const [paymentDate, setPaymentDate] = useState('')
    const [invoiceId, setInvoiceId] = useState('')

    const fetchPaymentDetails = () => {
        fetch(`/api/payments/details/${paymentId}`)
        .then(res => res.json())
        .then(data => {
            setPayStatus(data.status)
            setPaymentDate(new Date(data.payment_date).toLocaleString())
            setInvoiceId(data.invoice_id)
        })
    }

    const fetchInvoiceDetails = () => {
        fetch(`/api/invoices/${invoiceId}`)
            .then(res => res.json())
            .then(data => {
                setClientName(data.client_name)
                setClientEmail(data.client_email)
                setAmountDue(Number(data.total_amount) || 0)
                setDiscountCodeId(data.discount_code_id)
                setStatus(data.status)
                setIssueDate(new Date(data.created_at).toLocaleString())
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

    useEffect(() => {
        fetchPaymentDetails()
    }, [])

    useEffect(() => {
        fetchInvoiceDetails()
    }, [invoiceId])

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
                        <h2 className="detailsTitle">Payment Details</h2>
                        <div className="detailsInfo">
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Payment ID:</span>
                                <span className="detailsInfoValue" id="paymentId">{paymentId}</span>
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
                                <span className="detailsInfoLabel">Total Amount:</span>
                                <span className="detailsInfoValue" id="amountDue">{amountDue.toFixed(2)}€</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Discount Code:</span>
                                <span className="detailsInfoValue" id="discountCode">{discountCode}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Payment Status:</span>
                                <span className="detailsInfoValue" id="status">{status}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Paid On:</span>
                                <span className="detailsInfoValue" id="createdAt">{paymentDate}</span>
                            </div>
                            <div className="detailsInfoRow">
                                <span className="detailsInfoLabel">Paid With:</span>
                                <span className="detailsInfoValue" id="paymentMethod">Card</span>
                            </div>
                        </div>
                        <div className="detailsBottomInfo">
                            <div className="detailsButtons">
                                <button className="printButton">Print Receipt</button>
                                <Link to='/payments'><button className="backButton">Go Back</button></Link>
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