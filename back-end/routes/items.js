import { Router } from 'express';
import { getItems } from '../db.js'

const router = Router();
router.get('/', (req, res) => {
    res.json(getItems());
})

export default router