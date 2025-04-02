const AppError = require('./AppError');

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            //* Mongoose validation
            if (err.name === 'ValidationError') {
                let messages = Object.values(err.errors).map((el) => el.message);
                let message = messages.join('. ');
                return next(new AppError(message, 400));
            }

            //* Mongoose Duplicate Key
            if (err.code === 11000) {
                const [value] = Object.values(err.keyValue);
                let message = `There is already a field with value ${value}.Please use another value.`;
                return next(new AppError(message, 400));
            }

            console.error(err, 'catchAsync error');

            //* Stripe validation
            switch (err?.type) {
                case 'StripeCardError':
                    console.error(`A payment error occurred: ${err.message}`);
                    return next(new AppError(err.message), 404);
                case 'StripeInvalidRequestError':
                    console.error('An invalid request occurred.');
                default:
                    console.error('Another problem occurred, maybe unrelated to Stripe.');
            }

            return next(new AppError('An error on server side', 500));
        });
    };
};
