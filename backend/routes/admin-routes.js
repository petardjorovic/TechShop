const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.route('/product').post(upload.single('file'), adminController.addProduct);

module.exports = router;
