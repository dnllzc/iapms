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

const router = Router();
router.get('/', async (req, res, next) => {
    try {
        const payments = await getPayments();
        res.json(payments);
    } catch (err) {
        next(err);
    }
})

export default router