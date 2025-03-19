const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const authorizationValidation = require('../utils/authorizationValidation');
const upload = multer({ dest: 'uploads/' });

router
    .route('/product/:productId?/:productImg?')
    .post(authorizationValidation.protect, upload.single('file'), adminController.addProduct)
    .delete(authorizationValidation.protect, adminController.deleteSingleProduct)
    .put(authorizationValidation.protect, upload.single('file'), adminController.editSingleProduct);

module.exports = router;
