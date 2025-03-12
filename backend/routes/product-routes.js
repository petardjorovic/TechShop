const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.route('/').get(productController.getAllProduct);
router.route('/single/:productId').get(productController.getSingleProduct);

module.exports = router;
