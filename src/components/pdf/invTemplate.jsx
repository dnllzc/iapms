import { useState, useEffect } from 'react';
import './invTemplate.css';

export default function InvTemplate() {
  const companyName = 'Company Name';
  const companyEmail = 'contact@company.com';
  const companyWebsite = 'http://www.company.com';

  const pathname = window.location.pathname;
  const type = pathname.split('/')[2];
  const id = pathname.split('/')[3];
  
  const invoice = type === 'invoice';
  const [invoiceId, setInvoiceId] = useState(id);
  const [amountDue, setAmountDue] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const getInvoiceData = async () => {
    try {
      fetch('/api/invoices/' + id)
        .then(response => response.json())
        .then(data => {
          setAmountDue(data.total_amount);
          setIssueDate(new Date(data.created_at).toLocaleString());
          setClientName(data.client_name);
          setClientEmail(data.client_email);
        })
        .catch(error => {
          console.error('Error fetching invoice data:', error);
        });
    } catch (error) {
      console.error('Error fetching invoice data:', error);
    }
  }

  if (invoice) {
    useEffect(() => {
      getInvoiceData();
    }, []);
  }

  return (
    <>
        <section className="inv-template">
            <div className="inv-header">
              <div className="company-info">
                <strong>{companyName}</strong><br />
                {companyEmail}<br />
                {companyWebsite}
              </div>
                { invoice ? (
                  <div className="invoice-info">
                    <div className="invoice-title">Invoice from {companyName}</div>
                    <div className="invoice-number">Invoice: INV-{invoiceId}</div>
                  </div>
                ) : (
                  <div className="invoice-info">
                    <div className="invoice-title">Receipt from {companyName}</div>
                    <div className="invoice-number">Receipt: RCP-{invoiceId}</div>
                  </div>
                )}
            </div>

            <div className="amount-date">
              <table className="amount-date-table">
                <thead>
                  <tr>
                    <th>{invoice ? 'Amount Due' : 'Amount Paid'}</th>
                    <th>{invoice ? 'Issue Date' : 'Payment Date'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{amountDue}</td>
                    <td>{issueDate}</td>
                  </tr>
                </tbody>
              </table>

              <div className="summary-title">SUMMARY</div>

              <div className="summary-content">
                <table className="summary-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        Item A
                        <span className="description-subtext">Description for Item A</span>
                      </td>
                      <td className="center-align">1</td>
                      <td className="right-align">550.00€</td>
                    </tr>
                    <tr className="amount-row">
                      <td>Amount due</td>
                      <td></td>
                      <td className="right-align">{amountDue}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="inv-footer">
                <div className="processed-by">
                  {invoice ? 'Invoice Issued ' : 'Receipt issued ' }by {companyName}<br />
                  {companyName}
                </div>
                <div className="billed-to">
                  <div className="billed-to-title">Billed to:</div>
                  {clientName}<br />
                  {clientEmail}
                </div>
              </div>

              <div className="inv-watermark">{invoice ? 'INVOICE' : 'RECEIPT'}</div>

            </div>
        </section>
    </>
  );
}