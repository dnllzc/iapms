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

const getPaymentInfo = (invoice_id) => {
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

router.post('/info', async (req, res, next) => {
    try {
        const invoiceId = Number(req.body?.invoice_id)
        if (!Number.isInteger(invoiceId) || invoiceId <= 0) {
            res.status(400).json({ error: 'invoice_id must be a positive integer' })
            return
        }

        const items = await getPaymentInfo(invoiceId)
        res.json(items)
    } catch (err) {
        next(err);
    }
})

export default router