import { Router } from 'express';
import conn from '../config/db.js';

const getPayments = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM payment",  (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(rows);
        });
    });
}

const getPayment = (payment_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM payment WHERE id = ?"
        conn.query(query, [payment_id], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows[0]);
        });
    })
}

const getPaymentDetails = (invoice_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM payment WHERE invoice_id = ?"
        conn.query(query, [invoice_id], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows[0]);
        });
    })
}

const getInvItems = (invoice_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT i.id AS item_id, i.name, i.price, pi.quantity
            FROM invoice_item pi
            JOIN item i ON pi.item_id = i.id
            WHERE pi.invoice_id = ?
        `;
        conn.query(query, [invoice_id], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    })
}

const router = Router();
router.get('/', async (req, res, next) => {
    try {
        const payments = await getPayments();
        res.json(payments);
    } catch (err) {
        next(err);
    }
})

router.get('/details/:id', async (req, res, next) => {
    try {
        const paymentId = req.params?.id
        if (!paymentId) {
            res.status(400).json({ error: 'Payment ID is required' })
            return
        }
        const payment = await getPayment(paymentId)
        if (!payment) {
            res.status(404).json({ error: 'Payment not found' })
            return
        }
        res.json(payment)
    } catch (err) {
        next(err);
    }
})

router.get('/inv/:id', async (req, res, next) => {
    try {
        const invoiceId = req.params?.id
        if (!invoiceId) {
            res.status(400).json({ error: 'Invoice ID is required' })
            return
        }
        const payment = await getPaymentDetails(invoiceId)
        if (!payment) {
            res.status(404).json({ error: 'Payment not found for this invoice' })
            return
        }
        res.json(payment)
    } catch (err) {
        next(err);
    }
})

router.post('/info', async (req, res, next) => {
    try {
        const invoiceId = Number(req.body?.invoice_id)
        if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
            res.status(400).json({ error: 'invoice_id must be a positive integer' })
            return
        }

        const items = await getInvItems(invoiceId)
        res.json(items)
    } catch (err) {
        next(err);
    }
})

router.post('/process', async (req, res, next) => {
    try {
        const invoiceId = Number(req.body?.invoice_id)
        if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
            res.status(400).json({ error: 'invoice_id must be a positive integer' })
            return
        }
        const query_inv = "UPDATE invoice SET status = 'paid' WHERE id = ?"
        const query_pay = "INSERT INTO payment (amount, status, payment_date, invoice_id) VALUES (?, 'success', NOW(), ?)"

        conn.query(query_inv, [invoiceId], (err, result) => {
            if (err) {
                next(err)
                return
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Invoice not found' })
                return
            }
            // Amount is passed in body
            const amount = Number(req.body?.total_amount)
            if (isNaN(amount) || amount < 0) {
                res.status(400).json({ error: 'total_amount must be a non-negative number' })
                return
            }
            conn.query(query_pay, [amount, invoiceId], (err, result) => {
                if (err) {
                    next(err)
                    return
                }
                res.json({ message: 'Payment marked as paid successfully' })
            })
        })
    } catch (err) {
        next(err);
    }
})

export default router