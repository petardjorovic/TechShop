const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            unique: true,
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email format'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
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
        gender: {
            type: String,
            enum: ['male', 'female'],
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
        phoneNumber: {
            type: String,
        },
        votedFor: {
            type: Array,
        },
        status: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: 'avatar.webp',
        },
        passwordChangedAt: { type: Date },
        passwordResetToken: { type: String },
        passwordResetTokenExpires: { type: Date },
    },

    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.isPasswordCorrect = async (candidatePassword, currentPassword) => {
    return await bcrypt.compare(candidatePassword, currentPassword);
};

userSchema.methods.createResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
