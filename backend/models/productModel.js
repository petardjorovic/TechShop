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
        // rating: {
        //     type: Number,
        //     default: 0.0,
        // },
        allRatings: {
            type: [Number],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

// productSchema.pre('save', function (next) {
//     // Filtriraj sve nebrojčane vrednosti iz allRatings
//     this.allRatings = this.allRatings.filter((rate) => typeof rate === 'number' && !isNaN(rate));

//     if (this.allRatings.length === 0) {
//         this.rating = 0.0;
//     } else {
//         this.rating = parseFloat((this.allRatings.reduce((total, rate) => total + rate, 0) / this.allRatings.length).toFixed(2));

//         console.log(this.rating, 'ovo je rating');
//     }
//     next();
// });

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
