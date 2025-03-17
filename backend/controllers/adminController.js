const ProductModel = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');

const addProduct = catchAsync(async (req, res, next) => {
    const product = JSON.parse(req.body.product);

    if (req.file) product.image = req.file.filename;
    else return next(new AppError('Image of product is required', 404));
    const newProduct = new ProductModel(product);
    const savedProduct = await newProduct.save();
    res.status(200).json({
        status: 'success',
        message: 'Successufully added product',
    });
});

const deleteSingleProduct = catchAsync(async (req, res, next) => {
    const { productId, productImg } = req.params;
    const deletedProduct = await ProductModel.deleteOne({ _id: productId });
    console.log(deletedProduct, 'deletedProduct');
    if (deletedProduct.acknowledged && deletedProduct.deletedCount === 1) {
        const imgPath = path.join(__dirname, '..', 'uploads', productImg);

        fs.unlink(imgPath, (err) => {
            if (err) return next(new AppError('This product has not been deleted', 400));
        });

        res.status(200).json({
            status: 'success',
            message: 'Succesufully deleted product',
        });
    } else {
        return next(new AppError("This product doesn't exist"));
    }
});

module.exports = { addProduct, deleteSingleProduct };
