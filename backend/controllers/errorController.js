const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        err: err,
        status: err.status,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    if (err.isOperatinal) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error(err, 'Unknown error Petar');
        res.status(500).json({
            status: 'error',
            message: 'An error on server side, please try again',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (procces.env.NODE_ENV === 'production') {
        sendErrorProd(err, res);
    }
};
