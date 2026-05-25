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

const router = Router();
router.get('/', async (req, res, next) => {
    try {
        const invoices = await getInvoices();
        res.json(invoices);
    } catch (err) {
        next(err);
    }
})

export default router