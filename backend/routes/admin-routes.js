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

router
    .route('/user/:userId?/:userAvatar?')
    .get(authorizationValidation.protect, adminController.getAllUsers)
    .delete(authorizationValidation.protect, adminController.deleteUser)
    .put(authorizationValidation.protect, adminController.editUser);

router
    .route('/category/:categoryId?')
    .post(authorizationValidation.protect, adminController.addCategory)
    .get(authorizationValidation.protect, adminController.getAllCategories)
    .put(authorizationValidation.protect, adminController.editCategory)
    .delete(authorizationValidation.protect, adminController.deleteCategory);

module.exports = router;
