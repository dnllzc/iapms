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

const getCodeInfo = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM discount_code WHERE id = ?', [id], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(rows[0]);
        });
    });
}

const updateCodeInfo = (id, code, discount_type, value, expiration_date) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE discount_code SET code = ?, discount_type = ?, value = ?, expiration_date = ? WHERE id = ?', [code, discount_type, value, expiration_date, id], (err, result) => {
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

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const codeInfo = await getCodeInfo(id);
        res.json(codeInfo);
    } catch (err) {
        next(err);
    }
})

router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { code, discount_type, value, expiration_date } = req.body;
        const result = await updateCodeInfo(id, code, discount_type, value, expiration_date);
        res.json(result);
    } catch (err) {
        next(err);
    }
})

router.post('/check', async (req, res, next) => {
    try {
        const { code } = req.body;
        conn.query('SELECT * FROM discount_code WHERE code = ?', [code], (err, rows, fields) => {
            if (err) {
                next(err);
                return;
            } 
            if (rows.length === 0) {
                res.status(404).json({ message: 'Discount code not found' });
                return;
            }
            const discountCode = rows[0];
            const currentDate = new Date();
            if (discountCode.expiration_date < currentDate) {
                res.status(400).json({ message: 'Discount code has expired' });
                return;
            }
            res.json(discountCode);
        });
    } catch (err) {
        next(err);
    }
})

export default router