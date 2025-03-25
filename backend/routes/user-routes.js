const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorizationValidation = require('../utils/authorizationValidation');
const multer = require('multer');
const uploadUsers = multer({ dest: 'uploads/users' });

// router.route('/register').post(userController.register)  // moze i ovako ako zelis da na isti endpoint nakacis vise methoda
router.post('/register', userController.register);

router.post('/login', userController.login);

router.route('/editUser').put(authorizationValidation.protect, uploadUsers.single('file'), userController.editUserProfile);

router.route('/getSingleUser').get(authorizationValidation.protect, userController.getSingleUser);

module.exports = router;
