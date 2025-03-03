const express = require('express');
const router = express.Router();

router.use('/api/v1/user', require('./user-routes'));

module.exports = router;
