const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authorizationValidation = require('../utils/authorizationValidation');

router.route('/').get(productController.getAllProduct);
router
    .route('/single/:productId?')
    .get(productController.getSingleProduct)
    .patch(authorizationValidation.protect, productController.rateSingleProduct);

module.exports = router;
