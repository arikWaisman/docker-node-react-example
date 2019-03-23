const { Router } = require('express');

const router = Router();

const api = require('./api');

router.use('/api/v1', api);

module.exports = router;
