const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        author: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: () => {
                return new Date();
            },
        },
        content: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
        },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        productTitle: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const commentModel = mongoose.model('Comment', commentSchema);
module.exports = commentModel;
