const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log("Couldn't connect to MongoDB", err));

const app = express();

// * middlewares

app.use(cors());

app.listen(process.env.PORT, (err) => {
    if (err) console.log('Greska prilikom pokretanja servera', err);
    else console.log('Listening on PORT', process.env.PORT);
});
