import { Router } from 'express';
import { getUsers } from '../db.js'

const router = Router();
router.post('/', (req, res) => {
    const { email, password } = req.body;
    const user = getUsers().find((candidate) => candidate.email === email && candidate.password === password) || getUsers().find((candidate) => candidate.username === email && candidate.password === password);

    if (user) {
        res.json({ success: true, user });
        return;
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
})

export default router
