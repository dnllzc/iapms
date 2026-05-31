import './PaymentLink.css'
import '../main.css'
import NavBar from '../NavBar'
import { Link } from 'react-router-dom'
import PaymentLinkItemTable from './PaymentLinkItemTable'

export default function PaymentLink() {
    const pathname = window.location.pathname
    const invoiceId = pathname.split('/')[2]

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Payment was successful!')

        const response = fetch('/api/payments/mark-paid', {
            // TODO
        })
    }

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
                            <p className="clientInfoValue" id='clientName'>John Doe</p>
                            <p className='clientInfoValue' id='clientEmail'>john.doe@example.com</p>
                            <p className="clientInfoLabel">Amount Due:</p>
                            <p className="clientInfoValue" id='amountDue'>150.00€</p>
                        </div>
                        <div className="paymentProcess">
                            <form className="paymentForm">
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