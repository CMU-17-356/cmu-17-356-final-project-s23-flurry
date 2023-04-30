import { Router } from 'express';
import { SlipsController } from './controllers/slips.js';
import { DriversController } from './controllers/drivers.js';

const router = Router() // eslint-disable-line

const Slips = new SlipsController()
const Drivers = new DriversController()

router.get('/slips', Slips.getSlips)
router.get('/slips/:id', Slips.getSlipById)
router.post('/slips', Slips.createSlip)

router.get('/drivers', Drivers.getDrivers)
router.get('/drivers/:id', Drivers.getDriverById)

export { router };