const ProductModel = require('../models/productModel');
const AppError = require('../utils/AppError');

const getAllProduct = async (req, res, next) => {
    const products = await ProductModel.find();
    if (products.length > 0) {
        return res.status(200).json({
            status: 'success',
            products: products,
        });
    } else {
        return next(new AppError("There isn't any product in database", 404));
    }
};

module.exports = { getAllProduct };
