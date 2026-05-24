import { Router } from 'express';
import conn from '../config/db.js';

const getUsers = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users', (err, rows, fields) => {
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
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

export default router