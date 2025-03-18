const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/').post(commentController.addProductComment);

router.route('/filter/:productId').get(commentController.getProductComments);

module.exports = router;
