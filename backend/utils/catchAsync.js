const AppError = require('./AppError');

module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            console.error(err, 'catchAsync error');
            if (err.name === 'ValidationError') {
                let messages = Object.values(err.errors).map((el) => el.message);
                let message = messages.join('. ');
                return next(new AppError(message, 400));
            }
            return next(new AppError('An error on server side', 500));
        });
    };
};
