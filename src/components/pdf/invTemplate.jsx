import { useState, useEffect } from 'react';
import './invTemplate.css';

export function handlePrint(type, id) {
  const url = 
    type === 'invoice' 
    ? '/print/invoice/' + id 
    : '/print/receipt/' + id
  const printWindow = window.open(url, '_blank');
  if (!printWindow) return
  printWindow.document.close()
  setTimeout(() => {
      printWindow.focus()
      printWindow.print()
      printWindow.close()
  }, 500)
}

export default function InvTemplate() {
  const companyName = 'Company Name';
  const companyEmail = 'contact@company.com';
  const companyWebsite = 'http://www.company.com';

  const pathname = window.location.pathname;
  const type = pathname.split('/')[2];
  const id = pathname.split('/')[3];
  
  const invoice = type === 'invoice';
  const [invoiceId, setInvoiceId] = useState('');
  const [receiptId, setReceiptId] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [items, setItems] = useState([]);
  const [discountCode, setDiscountCode] = useState('');

  const getInvoiceData = async (invId) => {
    try {
      const response = await fetch('/api/invoices/' + invId)
      const data = await response.json();
      setInvoiceId(data.id);
      setAmountDue(data.total_amount.toFixed(2) + '€');
      setIssueDate(new Date(data.created_at).toLocaleString());
      setClientName(data.client_name);
      setClientEmail(data.client_email);
      if (data.discount_code_id) {
        await getDiscountCode(data.discount_code_id);
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error);
    }
  }

  const getPaymentData = async (payId) => {
    try {
      const response = await fetch('/api/payments/details/' + payId)
      const data = await response.json();
      setReceiptId(data.id);
      setAmountDue(data.amount.toFixed(2) + '€');
      setIssueDate(new Date(data.payment_date).toLocaleString());
      setInvoiceId(data.invoice_id);
      getInvoiceData(data.invoice_id);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  }

  const getDiscountCode = async (discountCodeId) => {
    try {
      const response = await fetch('/api/discountcodes/' + discountCodeId);
      const data = await response.json();
      if (data.discount_type === 'percentage') {
        setDiscountCode(data.code + ' (' + data.value + '% off)');
      } else if (data.discount_type === 'fixed') {
        setDiscountCode(data.code + ' (' + data.value + '€ off)');
      } else {
        setDiscountCode(data.code);
      }
    } catch (error) {
      console.error('Error fetching discount code:', error);
    }
  }

  const getItems = async () => {
    try {
      const response = await fetch('/api/payments/info/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ invoice_id: invoiceId })
      })
      const itemsData = await response.json();

      const dataWithDesc = await Promise.all(itemsData.map(async (item) => {
        try {
          const descResponse = await fetch('/api/items/' + item.item_id);
          const itemData = await descResponse.json();

          return {
            ...item,
            description: itemData.description || ''
          };
        } catch (error) {
          console.error('Error fetching item description for item ID ' + item.item_id + ':', error);
        }
      }));
      setItems(dataWithDesc);
      console.log('Items data:', itemsData);
    } catch (error) {
      console.error('Error fetching items data:', error);
    }
  }

  if (invoice) {
    useEffect(() => {
      getInvoiceData(id);
    }, []);
  } else {
    useEffect(() => {
      getPaymentData(id);
    }, []);
  }

  useEffect(() => {
    if (invoiceId) {
      getItems();
    }
  }, [invoiceId]);

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
                    <div className="invoice-number">Receipt: RCP-{receiptId}</div>
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
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.name}
                          <span className="description-subtext">{item.description}</span>
                        </td>
                        <td className="center-align">{item.quantity}</td>
                        <td className="right-align">{item.price.toFixed(2) + '€'}</td>
                      </tr>
                    ))}
                    <tr className="discount-row">
                      <td>Discount</td>
                      <td></td>
                      <td className="right-align">{discountCode ? discountCode : 'N/A'}</td>
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