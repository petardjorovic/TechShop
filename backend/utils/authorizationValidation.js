const jwt = require('jsonwebtoken');
const catchAsync = require('./catchAsync');
const AppError = require('./AppError');
const UserModel = require('../models/userModel');

const protect = catchAsync(async (req, res, next) => {
    let token;
    let decoded;
    // * 1) Da li token postoji
    if (!req.headers.authorization) return next(new AppError("You aren't logged in, please login first", 401));
    if (req.headers.authorization) token = req.headers.authorization;

    // * 2) Da li je token validan
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return next(new AppError('Invalid or expired token, you have to login again', 401));
    }
    // jwt.verify(token, process.env.JWT_SECRET, function (err, data) {
    //     if (err) return next(new AppError('Invalid or expired token, you have to login again', 401));
    //     decoded = data;
    // });

    // * 3) Da li postoji user sa ovim tokenom
    const freshUser = await UserModel.findById(decoded.id);
    if (!freshUser) return next(new AppError('There is not such user', 401));

    //* 4) Da li je mozda korisnik promenio password nakon sto je token izdat
    if (freshUser.passwordChangedAt) {
        const passwordChangedAt = freshUser.passwordChangedAt.getTime() / 1000;
        if (decoded.iat < passwordChangedAt) {
            return next(new AppError('Password has been changed. Please log in again.', 401));
        }
    }

    // * 5) Na kraju cemo da setujemo korisnika i da nastavimo u sledeci middleware
    req.user = freshUser;
    next();
});

module.exports = { protect };
