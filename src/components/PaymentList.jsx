export default function PaymentList() {
    const testPayments = [
        { id: 10, email: "jane@example.com", name: "Jane Smith", date: "10-05-2026", status: "Failed" },
        { id: 9, email: "bob@example.com", name: "Bob Johnson", date: "10-05-2026", status: "Failed" },
        { id: 8, email: "john@example.com", name: "John Doe", date: "09-05-2026", status: "Success" },
        { id: 7, email: "alice@example.com", name: "Alice Brown", date: "09-05-2026", status: "Success" },
        { id: 6, email: "charlie@example.com", name: "Charlie Davis", date: "08-05-2026", status: "Success" },
        { id: 5, email: "emily@example.com", name: "Emily Taylor", date: "08-05-2026", status: "Success" },
        { id: 4, email: "grace@example.com", name: "Grace Anderson", date: "07-05-2026", status: "Success" },
        { id: 3, email: "ivy@example.com", name: "Ivy Green", date: "04-05-2026", status: "Success" },
        { id: 2, email: "lisa@example.com", name: "Lisa Moore", date: "03-05-2026", status: "Success" },
        { id: 1, email: "nancy@example.com", name: "Nancy Lee", date: "02-05-2026", status: "Success" },
    ]
    
    return (
        <table className="paymentTable">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Client Name</th>
                                <th>Client Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testPayments.map((element, index) => (
                                <tr key={index}>
                                    <td>{element.date}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.status}</td>
                                    <td>
                                        <div className="paymentActions">
                                            <button className="paymentActionButton" id="detailsButton">Print PDF</button>
                                            <button className="paymentActionButton" id="printButton">Details</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}