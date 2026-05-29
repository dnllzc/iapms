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

const createDiscountCode = (code, discount_type, value, expiration_date) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO discount_code (code, discount_type, value, expiration_date) VALUES (?, ?, ?, ?)', [code, discount_type, value, expiration_date], (err, result) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(result);
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

router.post('/new', async (req, res, next) => {
    try {
        const { code, discount_type, value, expiration_date } = req.body;
        const result = await createDiscountCode(code, discount_type, value, expiration_date);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
})

router.post('/delete', async (req, res, next) => {
    try {
        const { id } = req.body;
        conn.query('DELETE FROM discount_code WHERE id = ?', [id], (err, result) => {
            if (err) {
                next(err);
                return;
            } 
            res.json(result);
        });
    } catch (err) {
        next(err);
    }
})

export default router