import { Router } from 'express'
import { getDiscountCodes } from '../db.js'

const router = Router();
router.get('/', (req, res) => {
    res.json(getDiscountCodes());
})

export default router