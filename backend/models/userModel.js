const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
            // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email is not valid'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            // validate: {
            //     validator: () => {

            //     }
            // }
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

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
