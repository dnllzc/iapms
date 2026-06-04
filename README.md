# Web-Based Invoicing and Payment Management System

This repository hosts the project for Systems 3 course at UP FAMNIT done in student year 2025/26.

## Project Overview

The project is a web-based invoicing and payment management system designed to streamline the process of creating, sending, and managing invoices for businesses. The system allows employees to create and manage invoices, track payment statuses, and generate PDF versions of invoices and payment receipts. Administrators have additional capabilities to manage employee accounts, items for invoicing, and discount codes.

The application is available at http://88.200.63.148:30092/.

## Features

- User authentication and role-based access control
- Invoice creation and management
- Payment processing and status tracking
- PDF generation for invoices and payment receipts
- Employee and item management for administrators
- Discount code management for administrators

## Technologies Used

- Frontend: React.js
- Backend: Node.js with Express
- Database: MariaDB (FAMNIT student server)
- Authentication: Plain text password with sessions and cookies
- PDF Generation: React component for rendering an HTML template as PDF with fetching data from the backend

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dnllzc/iapms.git
    cd iapms
   ```
2. Install dependencies for both frontend and backend:
   ```bash
    npm install
    cd back-end
    npm install
    ```
3. Configure the database connection in `back-end/.env` with your MariaDB credentials, such as:
    ```
    DB_HOST=your_db_host
    DB_PORT=your_db_port
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name

    SESSION_SECRET=your_session_secret
    ```
4. Start the backend server:
   ```bash
    cd back-end
    node index.js
    ```
5. Start the frontend development server:
    ```bash
    cd ..
    npm run dev
    ```
6. Access the application at 'http://localhost:9292'.

**Note: The back-end is on port 9293. All API calls can be made through either the frontend (http://localhost:9292/api) or directly to the backend (http://localhost:9293/api).*
