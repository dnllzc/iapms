import './invTemplate.css';

export default function InvTemplate() {
  const companyName = 'Company Name';
  const companyEmail = 'contact@company.com';
  const companyWebsite = 'http://www.company.com';

  const pathname = window.location.pathname;
  const type = pathname.split('/')[2];
  const id = pathname.split('/')[3];

  if (type === 'invoice') {
    const invoice = true;
  } else {
    const invoice = false;
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
                    <th>Issue Date</th>
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
                      <td className="right-align">550.00€</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="inv-footer">
                <div className="processed-by">
                  Invoice issued by {companyName}<br />
                  {companyName}
                </div>
                <div className="billed-to">
                  <div className="billed-to-title">Billed to:</div>
                  {clientName}<br />
                  {clientEmail}
                </div>
              </div>

              <div className="inv-watermark">INVOICE</div>

            </div>
        </section>
    </>
  );
}