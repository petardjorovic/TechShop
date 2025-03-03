const UserModel = require('../models/userModel');
const AppError = require('../utils/AppError');

//* ==============================
//* ========== REGISTER ==========
//* ==============================
const register = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            const newUser = new UserModel(req.body);
            try {
                const savedUser = await newUser.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'User successufully registered',
                });
            } catch (error) {
                console.error(error);
                return next(new AppError('The user has not been saved in the database', 500));
            }
        } else {
            return next(new AppError('User with this email already exists', 409));
        }
    } catch (error) {
        console.error(error);
        return next(new AppError('Error on server side', 500));
    }
};

//* ===============================
//* ============ LOGIN ============
//* ===============================
const login = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            if (user.password === req.body.password) {
                return res.status(200).json({
                    status: 'suucess',
                    message: 'User successufully logged',
                });
            } else {
                return next(new AppError('Wrong credentials', 401));
            }
        } else {
            return next(new AppError('User with this email was not found', 404));
        }
    } catch (error) {
        console.error(error);
        return next(new AppError('Error on server side', 500));
    }
};

module.exports = {
    register,
    login,
};
