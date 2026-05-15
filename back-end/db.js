const invoices = [
    { id: 16, email: "john@example.com", name: "John Doe", date: "09-05-2026", status: "Paid" },
    { id: 15, email: "jane@example.com", name: "Jane Smith", date: "09-05-2026", status: "Pending" },
    { id: 14, email: "bob@example.com", name: "Bob Johnson", date: "09-05-2026", status: "Pending" },
    { id: 13, email: "alice@example.com", name: "Alice Brown", date: "09-05-2026", status: "Paid" },
    { id: 12, email: "charlie@example.com", name: "Charlie Davis", date: "08-05-2026", status: "Paid" },
    { id: 11, email: "david@example.com", name: "David Wilson", date: "08-05-2026", status: "Pending" },
    { id: 10, email: "emily@example.com", name: "Emily Taylor", date: "08-05-2026", status: "Paid" },
    { id: 9, email: "frank@example.com", name: "Frank Miller", date: "07-05-2026", status: "Pending" },
    { id: 8, email: "grace@example.com", name: "Grace Anderson", date: "07-05-2026", status: "Paid" },
    { id: 7, email: "henry@example.com", name: "Henry White", date: "06-05-2026", status: "Pending" },
    { id: 6, email: "ivy@example.com", name: "Ivy Green", date: "04-05-2026", status: "Paid" },
    { id: 5, email: "jack@example.com", name: "Jack Harris", date: "04-05-2026", status: "Pending" },
    { id: 4, email: "lisa@example.com", name: "Lisa Moore", date: "03-05-2026", status: "Paid" },
    { id: 3, email: "mike@example.com", name: "Mike Johnson", date: "02-05-2026", status: "Pending" },
    { id: 2, email: "nancy@example.com", name: "Nancy Lee", date: "02-05-2026", status: "Paid" },
    { id: 1, email: "olivia@example.com", name: "Olivia Brown", date: "02-05-2026", status: "Pending" },
];

const payments = [
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

const users = [
    { id: 2, email: "employee@example.com", firstName: "Employee", lastName: "User", role: "Employee", status: "Active" },
    { id: 1, email: "admin@example.com", firstName: "Admin", lastName: "User", role: "Admin", status: "Active" },
]

export function getInvoices() {
    return invoices;
}

export function getPayments() {
    return payments;
}

export function getUsers() {
    return users;
}
