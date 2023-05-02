import { Router } from 'express';
import { SlipsController } from './controllers/slips.js';
import { DriversController } from './controllers/drivers.js';
import { AccountsController } from './controllers/accounts.js';

const router = Router() // eslint-disable-line

const Slips = new SlipsController()
const Drivers = new DriversController()
const Accounts = new AccountsController()

router.get('/slips', Slips.getSlips)
router.get('/slips/:id', Slips.getSlipById)
router.post('/slips', Slips.createSlip)

router.get('/drivers', Drivers.getDrivers)
router.get('/drivers/:id', Drivers.getDriverById)

router.post('/accounts', Accounts.createAccount)
router.post('/login', Accounts.login)

export { router };
