// index.js
import { createRequire } from "module";
import invoices from './routes/invoices.js'
import payments from './routes/payments.js'
import users from './routes/users.js'
import discountCodes from './routes/discountcodes.js'
import items from './routes/items.js'
import auth from './routes/auth.js'
import dotenv from 'dotenv'

dotenv.config()

import msql from './config/db.js'

const require = createRequire(import.meta.url);
const express = require('express')
const session = require('express-session')
const app = express()
const port = 30093

app.use(express.json())
app.use(session({
  secret: process.env.SESSION_SECRET || 'iapms-dev-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 1000 * 60 * 60 * 8,
  },
}))

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

app.get('/api', (req, res) => {
    res.json({ message: 'API is running!' })
})

app.use('/api/auth', auth)

app.use('/api/users', users)
app.use('/api/invoices', invoices)
app.use('/api/payments', payments)
app.use('/api/discountcodes', discountCodes)
app.use('/api/items', items)

// Test database connection
msql.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database successfully!');
        connection.release();
    }
});