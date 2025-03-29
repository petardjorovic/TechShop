const ProductModel = require('../models/productModel');
const UserModel = require('../models/userModel');
const CategoryModel = require('../models/categoryModel');
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
    // console.log(deletedProduct, 'deletedProduct');
    if (deletedProduct.acknowledged && deletedProduct.deletedCount === 1) {
        const imgPath = path.join(__dirname, '..', 'uploads', productImg);

        fs.unlink(imgPath, (err) => {
            if (err) return next(new AppError('Image of this product has not been deleted', 500));
        });

        res.status(200).json({
            status: 'success',
            message: 'Succesufully deleted product',
        });
    } else {
        return next(new AppError("This product doesn't exist"));
    }
});

const editSingleProduct = catchAsync(async (req, res, next) => {
    const productData = req.body.product ? JSON.parse(req.body.product) : req.body;

    const product = await ProductModel.findById(productData.id);
    if (!product) return next(new AppError('There is not such product', 404));

    if (req.file) {
        if (product.image) {
            const oldImagePath = path.join(__dirname, '..', 'uploads', product.image);
            if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
        }
        productData.image = req.file.filename;
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(productData.id, productData, { new: true, runValidators: true });

    if (!updatedProduct) return next(new AppError('An error occured, please try again later', 404));

    return res.status(200).json({
        status: 'success',
        message: 'You have successufully updated product',
    });
});

const getAllUsers = catchAsync(async (req, res, next) => {
    const allUsers = await UserModel.find({});
    if (!allUsers) return next(new AppError('An error occurred, please try later', 500));

    res.status(200).json({
        status: 'success',
        allUsers,
    });
});

const deleteUser = catchAsync(async (req, res, next) => {
    const deletedUser = await UserModel.deleteOne({ _id: req.params.userId });
    if (deletedUser.acknowledged && deletedUser.deletedCount === 1) {
        if (req.params.userAvatar !== 'avatar.webp') {
            const oldAvatarPath = path.join(__dirname, '..', 'uploads', 'users', req.params.userAvatar);

            if (fs.existsSync(oldAvatarPath)) {
                fs.unlink(oldAvatarPath, (err) => {
                    if (err) {
                        console.error(err, 'delete user avatar error');
                        return next(new AppError('Avatar of this user has not been deleted, 500'));
                    }
                });
            }
        }

        return res.status(200).json({
            status: 'success',
            message: 'User succesufully deleted',
        });
    } else {
        return next(new AppError('There is not such user', 404));
    }
});

const addCategory = catchAsync(async (req, res, next) => {
    const category = new CategoryModel(req.body);
    const savedCategory = await category.save();
    console.log(savedCategory, 'savedCategory');
    if (!savedCategory) return next(new AppError("An error occurred, category couldn't be saved", 500));

    res.status(200).json({
        status: 'success',
        message: 'Category successufully saved.',
    });
});

const getAllCategories = catchAsync(async (req, res, next) => {
    // const allCategories = await CategoryModel.find();
    const allCategories = await CategoryModel.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'categoryId',
                as: 'products',
                pipeline: [{ $project: { createdAt: 0, updatedAt: 0, __v: 0 } }],
            },
        },
        {
            $project: {
                categoryName: 1,
                products: 1,
            },
        },
    ]);

    if (!allCategories) return next(new AppError('An error occurred, please try later', 500));

    res.status(200).json({
        status: 'success',
        allCategories,
    });
});

const editCategory = catchAsync(async (req, res, next) => {
    console.log(req.body, 'req.body');
    res.send('ok');
    // TODO logika za edit category
});

module.exports = {
    addProduct,
    deleteSingleProduct,
    editSingleProduct,
    getAllUsers,
    deleteUser,
    addCategory,
    getAllCategories,
    editCategory,
};
