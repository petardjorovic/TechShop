const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await ProductModel.find().populate('categoryId');
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

const rateSingleProduct = catchAsync(async (req, res, next) => {
    if (req.body.productRate < 1 || req.body.productRate > 5) return next(new AppError('The rating must be between 1 and 5', 400));
    const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.body.productId,
        { $push: { allRatings: req.body.productRate } },
        { new: true }
    );

    if (!updatedProduct) return next(new AppError('There is not such product', 404));

    const savedProduct = await updatedProduct.save();
    if (!savedProduct) return next(new AppError('Product could not save to db', 404));

    const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, { $push: { votedFor: req.body.productId } }, { new: true });

    if (!updatedUser) return next(new AppError('An error occurred please try later', 500));

    const { password, __v, _id, createdAt, updatedAt, ...dataUser } = updatedUser.toObject();

    return res.status(200).json({
        status: 'success',
        message: 'You have successufully rated this product',
        user: dataUser,
        product: updatedProduct,
    });
});

module.exports = { getAllProducts, getSingleProduct, rateSingleProduct };
