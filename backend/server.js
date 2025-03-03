const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const AppError = require('./utils/AppError');
const errorController = require('./controllers/errorController');

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Couldn't connect to MongoDB", err));

const app = express();

//* middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//* routes
app.use(require('./routes'));

//* Error 404
app.all('*', (req, res, next) => {
    return next(new AppError(`This page ${req.originalUrl} doesn't exist`, 404));
});

//* Global error handler
app.use(errorController);

app.listen(process.env.PORT, (err) => {
    if (err) console.log('Greska prilikom pokretanja servera', err);
    else console.log('Listening on PORT', process.env.PORT);
});
