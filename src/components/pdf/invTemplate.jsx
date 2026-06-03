import { useParams } from 'react-router-dom';

export default function InvTemplate({ invoiceId, clientName, clientEmail, amountDue, issueDate }) {
  const companyName = 'Company Name';
  const companyEmail = 'contact@company.com';
  const companyWebsite = 'http://www.company.com';

  return `
    <html>
      <head>
        <title>Invoice INV-${invoiceId}</title>
        <link rel="stylesheet" href="http://88.200.63.148:30092/invTemplate.css" />
      </head>
      <body>
        <section class="inv-template">
            <div class="inv-header">
              <div class="company-info">
                <strong>${companyName}</strong><br />
                ${companyEmail}<br />
                ${companyWebsite}
              </div>
              <div class="invoice-info">
                <div class="invoice-title">Invoice from ${companyName}</div>
                <div class="invoice-number">Invoice: INV-${invoiceId}</div>
              </div>
            </div>

            <div class="amount-date">
              <table class="amount-date-table">
                <thead>
                  <tr>
                    <th>Amount Due</th>
                    <th>Issue Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${amountDue}</td>
                    <td>${issueDate}</td>
                  </tr>
                </tbody>
              </table>

              <div class="summary-title">SUMMARY</div>

              <div class="summary-content">
                <table class="summary-table">
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
                        <span class="description-subtext">Description for Item A</span>
                      </td>
                      <td class="center-align">1</td>
                      <td class="right-align">550.00€</td>
                    </tr>
                    <tr class="amount-row">
                      <td>Amount due</td>
                      <td></td>
                      <td class="right-align">${amountDue}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="inv-footer">
                <div class="processed-by">
                  Invoice issued by ${companyName}<br />
                  ${companyName}
                </div>
                <div class="billed-to">
                  <div class="billed-to-title">Billed to:</div>
                  ${clientName}<br />
                  ${clientEmail}
                </div>
              </div>

              <div class="inv-watermark">INVOICE</div>

            </div>
        </section>
      </body>
    </html>
  `;
}