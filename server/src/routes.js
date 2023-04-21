import { Router } from 'express';
import { SlipsController } from './controllers/slips.js';

const router = Router() // eslint-disable-line

const Slips = new SlipsController()

router.get('/slips', Slips.getSlips)
router.get('/slips/:id', Slips.getSlipById)

export { router };
