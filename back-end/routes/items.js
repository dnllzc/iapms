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

const deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('DELETE FROM item WHERE id = ?', [id], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(rows);
        });
    })
}

const addItem = (name, description, price) => {
    return new Promise((resolve, reject) => {
        conn.query('INSERT INTO item (name, description, price) VALUES (?, ?, ?)', [name, description, price], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(rows);
        });
    })
}

const editItem = (id, name, description, price) => {
    return new Promise((resolve, reject) => {
        conn.query('UPDATE item SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(rows);
        });
    })
}

const getItemInfo = (id) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM item WHERE id = ?', [id], (err, rows, fields) => {
            if (err) {
                reject(err);
                return;
            } 
            resolve(rows[0]);
        });
    })
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

router.post('/new', async (req, res, next) => {
    try {
        const { name, description, price } = req.body;
        const result = await addItem(name, description, price);
        res.json(result);
    } catch (err) {
        next(err);
    }
})

router.post('/delete', async (req, res, next) => {
    try {
        const { id } = req.body;
        const result = await deleteItem(id);
        res.json(result);
    } catch (err) {
        next(err);
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const itemInfo = await getItemInfo(id);
        res.json(itemInfo);
    } catch (err) {
        next(err);
    }
})

router.post('/edit/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, description, price } = req.body;
        const result = await editItem(id, name, description, price);
        res.json(result);
    } catch (err) {
        next(err);
    }
})

export default router