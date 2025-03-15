const AppError = require('./AppError');

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            console.error(err, 'catchAsync error');

            //* Mongoose validation
            if (err.name === 'ValidationError') {
                let messages = Object.values(err.errors).map((el) => el.message);
                let message = messages.join('. ');
                return next(new AppError(message, 400));
            }

            //* Stripe validation
            switch (err?.type) {
                case 'StripeCardError':
                    console.log(`A payment error occurred: ${err.message}`);
                    return next(new AppError(err.message), 404);
                case 'StripeInvalidRequestError':
                    console.log('An invalid request occurred.');
                    return next(new AppError('An invalid request occurred.'), 404);
                default:
                    console.log('Another problem occurred, maybe unrelated to Stripe.');
                    return next(new AppError('Another problem occurred, maybe unrelated to Stripe.'), 404);
            }

            return next(new AppError('An error on server side', 500));
        });
    };
};
