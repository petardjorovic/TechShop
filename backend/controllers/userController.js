const UserModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/Email');

//* ==============================
//* ========== REGISTER ==========
//* ==============================
const register = catchAsync(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        await new Email(req.body, 'www.localhost.com').sendWelcome();
        return res.status(200).json({
            status: 'success',
            message: 'User successufully registered',
        });
    } else {
        return next(new AppError('User with this email already exists', 409));
    }
});

//* ===============================
//* ============ LOGIN ============
//* ===============================
const login = catchAsync(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('User with this email was not found, you must register first.', 401));
    }

    if (user.password === req.body.password) {
        return res.status(200).json({
            status: 'suucess',
            message: 'User successufully logged',
        });
    } else {
        return next(new AppError('Wrong credentials', 401));
    }
});

module.exports = {
    register,
    login,
};
