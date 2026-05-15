// index.js
import { createRequire } from "module";
import invoices from './routes/invoices.js'
import payments from './routes/payments.js'
import users from './routes/users.js'
import discountCodes from './routes/discountcodes.js'
import items from './routes/items.js'

const require = createRequire(import.meta.url);
const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

app.get('/api', (req, res) => {
    res.json({ message: 'API is running!' })
})

app.use('/api/users', users)
app.use('/api/invoices', invoices)
app.use('/api/payments', payments)
app.use('/api/discountcodes', discountCodes)
app.use('/api/items', items)