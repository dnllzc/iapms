import { Router } from 'express';
import conn from '../config/db.js';

const getItems = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM item', (err, rows, fields) => {
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
        const items = await getItems();
        res.json(items);
    } catch (err) {
        next(err);
    }
})

export default router