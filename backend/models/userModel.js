const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
        username: {
            type: String,
            // required: [true, 'Username is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            unique: true,
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email is not valid'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            // validate: {
            //     validator: (field) => {
            //         //* Password must contain one lowercase letter, one uppercase letter,
            //         //* one digit from 0 to 9, one special character, no space, and it must be 8-16 characters long.
            //         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?!.* ).{8,16}$/;
            //         return passwordRegex.test(field);
            //     },
            //     message: 'Password is not valid',
            // },
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        postCode: {
            type: String,
        },
        votedFor: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
