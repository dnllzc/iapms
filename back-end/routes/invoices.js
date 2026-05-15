import { Router } from 'express'
import { getInvoices } from '../db.js'

const router = Router();

router.get('/', (req, res) => {
    res.json(getInvoices());
})

export default router