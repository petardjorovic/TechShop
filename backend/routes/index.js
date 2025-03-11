const express = require('express');
const router = express.Router();

router.use('/api/v1/user', require('./user-routes'));
router.use('/api/v1/admin', require('./admin-routes'));
router.use('/api/v1/product', require('./product-routes'));

module.exports = router;
