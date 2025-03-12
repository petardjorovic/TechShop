const ProductModel = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const getAllProduct = catchAsync(async (req, res, next) => {
    const products = await ProductModel.find();
    if (products.length > 0) {
        res.status(200).json({
            status: 'success',
            products,
        });
    } else {
        return next(new AppError("There isn't any product in database", 404));
    }
});

const getSingleProduct = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
    const product = await ProductModel.findById(productId);
    if (product) {
        const { createdAt, updatedAt, __v, ...newProduct } = product.toObject();
        res.status(200).json({
            status: 'success',
            product: newProduct,
        });
    } else {
        return next(new AppError("There isn't such product in our database", 404));
    }
});

module.exports = { getAllProduct, getSingleProduct };
