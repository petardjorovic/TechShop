const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

//* models
const UserModel = require('./models/userModel');

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Couldn't connect to MongoDB", err));

const app = express();

//* middlewares
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//* register
//* ====================
app.post('/register', async (req, res, next) => {
    try {
        console.log(req.body, 'req.body');
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            const newUser = new UserModel(req.body);
            console.log(newUser, 'newUser');
            try {
                const savedUser = await newUser.save();
                return res.status(200).json({
                    status: 'success',
                    message: 'User successufully registered',
                });
            } catch (error) {
                return res.status(500).json({
                    status: 'error',
                    message: 'The user has not been saved in the database',
                    errMessage: error.message,
                });
            }
        } else {
            return res.status(409).json({
                status: 'fail',
                message: 'User with this email already exists',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error on server side',
            errMessage: error.message,
        });
    }
});

//* login
//* ======================
app.post('/login', async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        console.log(user, 'user');
        if (user) {
            if (user.password === req.body.password) {
                return res.status(200).json({
                    status: 'suucess',
                    message: 'User successufully logged',
                });
            } else {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Wrong credentials',
                });
            }
        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'User with this email was not found',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Error on server side',
            errMessage: error.message,
        });
    }
});

app.listen(process.env.PORT, (err) => {
    if (err) console.log('Greska prilikom pokretanja servera', err);
    else console.log('Listening on PORT', process.env.PORT);
});
