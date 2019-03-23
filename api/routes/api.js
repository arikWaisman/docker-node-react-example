const { Router } = require('express');

const router = Router();

const user = require('./user');
const patient = require('./patient');
const doctor = require('./doctor');

router.use('/user', user);
router.use('/patient', patient);
router.use('/doctor', doctor);

module.exports = router;
