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
            min: [0, 'Price must be a positive number'],
        },
        image: {
            type: String,
            required: [true, 'Product Image is required'],
        },
        allRatings: {
            type: [Number],
            default: [],
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required'],
        },
    },
    {
        timestamps: true,
    }
);

// Definisanje virtualnog polja za izračunavanje proseka ocena
productSchema.virtual('rating').get(function () {
    if (this.allRatings.length === 0) return 0; // Ako nema ocena, vraća 0
    const total = this.allRatings.reduce((sum, rating) => sum + rating, 0);
    return total / this.allRatings.length;
});

// Možemo uključiti virtualne vrednosti u rezultat .toJSON ili .toObject
productSchema.set('toJSON', {
    virtuals: true,
});

productSchema.set('toObject', {
    virtuals: true,
});

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
