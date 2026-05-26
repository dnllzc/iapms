import { Router } from 'express'
import conn from '../config/db.js'

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

const newInvoice = (data) => {
    return new Promise((resolve, reject) => {
        const { client_name, client_email, total_amount, created_at, payment_link, user_id, discount_code_id } = data;
        const query = 'INSERT INTO invoice (client_name, client_email, total_amount, created_at, payment_link, user_id, discount_code_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
        conn.query(query, [client_name, client_email, total_amount, created_at, payment_link, user_id, discount_code_id], (err, result) => {
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

router.get('/new', async (req, res, next) => {
    try {
        const newInvoice = await newInvoice(req.body);
        res.json(newInvoice);
    } catch (err) {
        next(err);
    }
})

export default router