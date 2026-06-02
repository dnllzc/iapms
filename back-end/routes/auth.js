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

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(Array.isArray(results) ? results[0] : null);
        });
    });
}

const buildSessionUser = (user) => ({
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    fullName: `${user.first_name} ${user.last_name}`.trim(),
    email: user.email,
    role: user.role,
})

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

        req.session.user = buildSessionUser(user);

        return res.json({ success: true, message: 'Login successful', user: req.session.user });
    } catch (err) {
        next(err);
    }
})

router.get('/me', async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        const user = await findUserById(req.session.user.id);
        if (!user) {
            req.session.destroy(() => {});
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        return res.json({ success: true, user: buildSessionUser(user) });
    } catch (err) {
        next(err);
    }
})

router.post('/logout', (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.clearCookie('connect.sid');
            res.json({ success: true, message: 'Logged out' });
        });
    } catch (err) {
        next(err);
    }
})

export default router
