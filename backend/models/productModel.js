const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Product title is required'],
        },
        description: {
            type: String,
            required: [true, 'Product description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Product price is required'],
        },
        image: {
            type: String,
            required: [true, 'Product Image is required'],
        },
        rating: {
            type: Number,
            default: 0,
        },
        allRatings: {
            type: Array,
        },
    },
    {
        timestamps: true,
    }
);

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
