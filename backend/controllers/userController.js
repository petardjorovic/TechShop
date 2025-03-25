const UserModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/Email');
const signToken = require('../utils/signToken');
const fs = require('fs');
const path = require('path');

//* ==============================
//* ========== REGISTER ==========
//* ==============================
const register = catchAsync(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        await new Email(
            { email: savedUser.email, username: savedUser.username },
            process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://petarshop.onrender.com'
        ).sendWelcome();
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
    const user = await UserModel.findOne({ email: req.body.email }).select('+password');
    if (!user) {
        return next(new AppError('User with this email was not found, you must register first.', 401));
    }

    const correctPassword = await user.isPasswordCorrect(req.body.password, user.password);
    if (!correctPassword) return next(new AppError('Wrong credentials', 401));

    const { password, __v, _id, createdAt, updatedAt, ...dataUser } = user.toObject();

    const token = signToken(user._id);

    return res.status(200).json({
        status: 'success',
        user: dataUser,
        token,
    });
});

//* Edit User Profile
const editUserProfile = catchAsync(async (req, res, next) => {
    const userData = req.body.data ? JSON.parse(req.body.data) : req.body;

    const user = req.user;
    if (!user) return next(new AppError('There is not such user', 404));

    if (req.file) {
        if (user.avatar !== 'avatar.webp') {
            const oldImagePath = path.join(__dirname, '..', 'uploads', 'users', user.avatar);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
        userData.avatar = req.file.filename;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, userData, { new: true, runValidators: true });

    if (!updatedUser) return next(new AppError('An error occurred, please try later', 404));

    res.status(200).json({
        status: 'success',
        message: 'You have successufully updated profile',
    });
});

//* Get Single User
const getSingleUser = catchAsync(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id);
    if (!user) return next(new AppError('You have to be logged in or there is not such user', 401));
    const { _id, __v, createdAt, updatedAt, ...userData } = user.toObject();
    res.status(200).json({
        status: 'success',
        user: userData,
    });
});

module.exports = {
    register,
    login,
    editUserProfile,
    getSingleUser,
};
