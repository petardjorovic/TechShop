const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authorizationValidation = require('../utils/authorizationValidation');

router
    .route('/')
    .post(commentController.addProductComment)
    .get(commentController.getAllComments)
    .patch(authorizationValidation.protect, commentController.changeCommentStatus);

router.route('/filter/:productId').get(commentController.getProductComments);

module.exports = router;
