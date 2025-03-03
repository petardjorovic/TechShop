const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// router.route('/register').post(userController.register)  // moze i ovako ako zelis da na isti endpoint nakacis vise methoda
router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;
