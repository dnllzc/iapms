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

const createUser = (first_name, last_name, email, password, role) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)', [first_name, last_name, email, password, role], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

const editUser = (id, first_name, last_name, email, password, role) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ?, role = ? WHERE id = ?', [first_name, last_name, email, password, role, id], (err, result) => {
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
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        next(err);
    }
});

router.post('/new', async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, role } = req.body;
        const result = await createUser(first_name, last_name, email, password, role);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {        
        const { id } = req.body;
        const result = await deleteUser(id);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.put('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, password, role } = req.body;
        const result = await editUser(id, first_name, last_name, email, password, role);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const users = await getUsers();
        const user = users.find(u => u.id === parseInt(id));
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

export default router