const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/product').post(upload.single('file'), productController.addProduct);

module.exports = router;
