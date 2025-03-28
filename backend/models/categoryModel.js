const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: [true, 'Category name is required'],
    },
});

// ! UKOLIKO KORISTIMO MONGOOSE METODU populate() onda je potrebno virtualno polje
// // Dodajemo virtualno polje "products" koje odnosi proizvode koji pripadaju ovoj kategoriji
// categorySchema.virtual('products', {
//     ref: 'Product', // Model koji želimo da popunimo (Product)
//     localField: '_id', // Polje u kategoriji (ID kategorije)
//     foreignField: 'categoryId', // Polje u proizvodu koje sadrži ID kategorije
//     justOne: false, // Omogućava vraćanje više proizvoda
// });

// // Možemo uključiti virtualne vrednosti u rezultat .toJSON ili .toObject
// categorySchema.set('toJSON', {
//     virtuals: true,
// });

// categorySchema.set('toObject', {
//     virtuals: true,
// });

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;
