const ProductModel = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const addProduct = catchAsync(async (req, res, next) => {
    const product = JSON.parse(req.body.product);

    if (req.file) product.image = req.file.filename;
    else return next(new AppError('Image of product is required', 404));
    const newProduct = new ProductModel(product);
    const savedProduct = await newProduct.save();
    res.status(200).json({
        status: 'success',
        message: 'Successufully added product',
        product: newProduct,
    });
});

module.exports = { addProduct };
