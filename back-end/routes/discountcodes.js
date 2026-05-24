import { Router } from 'express'
import conn from '../config/db.js';

const getDiscountCodes = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM discount_code', (err, rows, fields) => {
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
        const discountCodes = await getDiscountCodes();
        res.json(discountCodes);
    } catch (err) {
        next(err);
    }
})

export default router