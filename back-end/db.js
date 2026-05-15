const invoices = [
    { id: 0, email: "john@example.com", name: "John Doe", date: "09-05-2026", status: "Paid" },
    { id: 1, email: "jane@example.com", name: "Jane Smith", date: "09-05-2026", status: "Pending" },
    { id: 2, email: "bob@example.com", name: "Bob Johnson", date: "09-05-2026", status: "Pending" },
    { id: 3, email: "alice@example.com", name: "Alice Brown", date: "09-05-2026", status: "Paid" },
    { id: 4, email: "charlie@example.com", name: "Charlie Davis", date: "08-05-2026", status: "Paid" },
    { id: 5, email: "david@example.com", name: "David Wilson", date: "08-05-2026", status: "Pending" },
    { id: 6, email: "emily@example.com", name: "Emily Taylor", date: "08-05-2026", status: "Paid" },
    { id: 7, email: "frank@example.com", name: "Frank Miller", date: "07-05-2026", status: "Pending" },
    { id: 8, email: "grace@example.com", name: "Grace Anderson", date: "07-05-2026", status: "Paid" },
    { id: 9, email: "henry@example.com", name: "Henry White", date: "06-05-2026", status: "Pending" },
    { id: 10, email: "ivy@example.com", name: "Ivy Green", date: "04-05-2026", status: "Paid" },
    { id: 11, email: "jack@example.com", name: "Jack Harris", date: "04-05-2026", status: "Pending" },
    { id: 12, email: "lisa@example.com", name: "Lisa Moore", date: "03-05-2026", status: "Paid" },
    { id: 13, email: "mike@example.com", name: "Mike Johnson", date: "02-05-2026", status: "Pending" },
    { id: 14, email: "nancy@example.com", name: "Nancy Lee", date: "02-05-2026", status: "Paid" },
    { id: 15, email: "olivia@example.com", name: "Olivia Brown", date: "02-05-2026", status: "Pending" },
];

const payments = [
    { id: 0, email: "jane@example.com", name: "Jane Smith", date: "10-05-2026", status: "Failed" },
    { id: 1, email: "bob@example.com", name: "Bob Johnson", date: "10-05-2026", status: "Failed" },
    { id: 2, email: "john@example.com", name: "John Doe", date: "09-05-2026", status: "Success" },
    { id: 3, email: "alice@example.com", name: "Alice Brown", date: "09-05-2026", status: "Success" },
    { id: 4, email: "charlie@example.com", name: "Charlie Davis", date: "08-05-2026", status: "Success" },
    { id: 5, email: "emily@example.com", name: "Emily Taylor", date: "08-05-2026", status: "Success" },
    { id: 6, email: "grace@example.com", name: "Grace Anderson", date: "07-05-2026", status: "Success" },
    { id: 7, email: "ivy@example.com", name: "Ivy Green", date: "04-05-2026", status: "Success" },
    { id: 8, email: "lisa@example.com", name: "Lisa Moore", date: "03-05-2026", status: "Success" },
    { id: 9, email: "nancy@example.com", name: "Nancy Lee", date: "02-05-2026", status: "Success" },
]

const users = [
    { id: 0, email: "admin@example.com", firstName: "Admin", lastName: "User", role: "Admin", status: "Active" },
    { id: 1, email: "employee@example.com", firstName: "Employee", lastName: "User", role: "Employee", status: "Active" },
    { id: 2, email: "disabled@example.com", firstName: "Disabled", lastName: "User", role: "Employee", status: "Disabled" }
]

const discountCodes = [
    { id: 0, expires: "31-08-2026", type: "percentage", code: "SUMMER20", value: 20 },
    { id: 1, expires: "30-09-2026", type: "fixed", code: "SAVE10", value: 10 },
    { id: 2, expires: "31-12-2026", type: "percentage", code: "HOLIDAY15", value: 15 },
    { id: 3, expires: "30-11-2026", type: "fixed", code: "WELCOME5", value: 5 },
    { id: 4, expires: "31-10-2026", type: "percentage", code: "FALL25", value: 25 },
    { id: 5, expires: "30-09-2026", type: "fixed", code: "FLASH50", value: 50 },
]

const items = [
    { id: 0, name: "Item A", description: "Description for Item A", price: 100.00 },
    { id: 1, name: "Item B", description: "Description for Item A", price: 100.00 },
    { id: 2, name: "Item C", description: "Description for Item B", price: 150.00 },
    { id: 3, name: "Item D", description: "Description for Item C", price: 200.00 },
    { id: 4, name: "Item E", description: "Description for Item D", price: 250.00 },
    { id: 5, name: "Item F", description: "Description for Item E", price: 300.00 },
    { id: 6, name: "Item G", description: "Description for Item F", price: 350.00 },

]

export function getInvoices() {
    return invoices;
}

export function getDiscountCodes() {
    return discountCodes;
}

export function getPayments() {
    return payments;
}

export function getUsers() {
    return users;
}

export function getItems() {
    return items;
}