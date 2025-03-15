const stripe = require('stripe');
const stripeSK = stripe(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const makePayment = catchAsync(async (req, res, next) => {
    if (!req.body.amount || !req.body.currency) return next(new AppError('Amount and currency are required', 400));

    const paymentIntent = await stripeSK.paymentIntents.create({
        amount: req.body.amount * 100,
        currency: req.body.currency.toLowerCase(),
    });

    res.status(200).json({
        status: 'success',
        clientSecret: paymentIntent.client_secret,
    });
});

module.exports = { makePayment };
