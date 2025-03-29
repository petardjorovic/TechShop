const UserModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/Email');
const signToken = require('../utils/signToken');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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

//* ============================
//* === CHANGE USER PASSWORD ===
//* ============================
const changePassword = catchAsync(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).select('+password');
    if (!user) return next(new AppError('There is not such user', 404));
    const checkPassword = await user.isPasswordCorrect(req.body.currentPassword, user.password);
    if (!checkPassword) return next(new AppError('You have to enter valid current password', 401));
    if (req.body.newPassword !== req.body.confirmNewPassword) return next(new AppError('New entered passwords must match', 400));
    user.password = req.body.newPassword;
    user.passwordChangedAt = Date.now();
    const savedNewUserPass = await user.save();
    if (!savedNewUserPass) return next(new AppError('An error on server, please try later', 500));

    res.status(200).json({
        status: 'success',
        message: 'You have succesuffully changed your password. Please login again with new password',
    });
});

//* =======================
//* === FORGOT PASSWORD ===
//* =======================
const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new AppError('There is not user with this email', 404));

    const token = user.createResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    try {
        await new Email(
            { email: user.email, username: user.username },
            process.env.NODE_ENV === 'development'
                ? `http://localhost:5173/resetPassword/${token}`
                : `https://petarshop.onrender.com/resetPassword/${token}`
        ).sendResetPassword();

        res.status(200).json({
            status: 'success',
            message: 'Password reset link send to the user email',
        });
    } catch (err) {
        console.log(err, 'err mail');

        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError('There was an error sending password reset email. Please try again later', 500));
    }
});

//* ======================
//* === RESET PASSWORD ===
//* ======================
const resetPassword = catchAsync(async (req, res, next) => {
    // 1. IF THE USER EXISTS WITH THE GIVEN TOKEN OR TOKEN HAS NOT EXPIRED
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await UserModel.findOne({ passwordResetToken: token, passwordResetTokenExpires: { $gt: Date.now() } });
    if (!user) return next(new AppError('Token is invalid or has expired', 400));
    if (req.body.newPassword !== req.body.confirmNewPassword) {
        return next(new AppError('New Password and Confirm New Password must match ', 400));
    }

    // 2. RESETING THE USER PASSWORD
    user.password = req.body.newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();
    const savedUser = await user.save();
    if (!savedUser) return next(new AppError('An error occurred on server side, please try again later', 500));

    res.status(200).json({
        status: 'success',
        message: 'You have successufully reset your password, now you have to login with new password',
    });
});

//* =========================
//* === EDIT USER PROFILE ===
//* =========================
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

//* =======================
//* === GET SINGLE USER ===
//* =======================
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
    changePassword,
    forgotPassword,
    resetPassword,
};
