import { Router } from 'express';
import { getPayments } from '../db.js'

const router = Router();
router.get('/', (req, res) => {
    res.json(getPayments());
})

export default router