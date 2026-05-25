import { Router } from 'express';
import conn from '../config/db.js';

const router = Router();

const getUsers = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users', (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const users = await getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        return res.json({ success: true, message: 'Login successful', user });
    } catch (err) {
        next(err);
    }
})

export default router
