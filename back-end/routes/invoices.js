import { Router } from 'express'
import conn from '../config/db.js'

const toMySqlDateTime = (value) => {
    const date = value ? new Date(value) : new Date()

    if (Number.isNaN(date.getTime())) {
        return new Date().toISOString().slice(0, 19).replace('T', ' ')
    }

    return date.toISOString().slice(0, 19).replace('T', ' ')
}

const getInvoices = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM invoice', (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(rows);
        });
    });
}

const createInvoice = (data) => {
    return new Promise((resolve, reject) => {
        const { client_name, client_email, total_amount, created_at, payment_link, user_id, discount_code_id } = data;
        const query = 'INSERT INTO invoice (client_name, client_email, total_amount, created_at, payment_link, user_id, discount_code_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const createdAtValue = toMySqlDateTime(created_at)

        conn.query(query, [client_name, client_email, total_amount, createdAtValue, payment_link, user_id, discount_code_id], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ id: result.insertId, ...data });
        });
    })
}

const addItem = (data) => {
    return new Promise((resolve, reject) => {
        const { quantity, price, item_id, invoice_id } = data;
        const query = 'INSERT INTO invoice_item (quantity, price, item_id, invoice_id) VALUES (?, ?, ?, ?)';
        conn.query(query, [quantity, price, item_id, invoice_id], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve({ id: result.insertId, ...data });
        });
    })
}

const router = Router();
router.get('/', async (req, res, next) => {
    try {
        const invoices = await getInvoices();
        res.json(invoices);
    } catch (err) {
        next(err);
    }
})

router.post('/new', async (req, res, next) => {
    try {
        const createdInvoice = await createInvoice(req.body);
        res.json(createdInvoice);
    } catch (err) {
        next(err);
    }
})

router.post('/additems', async (req, res, next) => {
    try {
        const { items } = req.body;

        if (!Array.isArray(items)) {
            const newItem = await addItem(req.body);
            res.json(newItem);
            return;
        }

        const insertedItems = [];
        for (const item of items) {
            insertedItems.push(await addItem(item));
        }

        res.json(insertedItems);
    } catch (err) {
        next(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const invoiceId = req.params.id;
        const query = 'SELECT * FROM invoice WHERE id = ?';
        conn.query(query, [invoiceId], (err, rows) => {
            if (err) {
                next(err);
                return;
            }
            if (rows.length === 0) {
                res.status(404).json({ message: 'Invoice not found' });
                return;
            }
            res.json(rows[0]);
        });
    } catch (err) {
        next(err);
    }
})

export default router