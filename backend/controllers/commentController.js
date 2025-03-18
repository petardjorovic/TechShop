const catchAsync = require('../utils/catchAsync');
const CommentModel = require('../models/commentModel');
const AppError = require('../utils/AppError');

const addProductComment = catchAsync(async (req, res, next) => {
    const newComment = new CommentModel(req.body);

    const savedComment = await newComment.save();
    if (savedComment) {
        return res.status(200).json({
            status: 'success',
            message: 'You have successfully submitted a comment, awaiting approval',
        });
    } else {
        return next(new AppError('The comment has not been sent, please try again', 404));
    }
});

const getProductComments = catchAsync(async (req, res, next) => {
    const allComments = await CommentModel.find({ productId: req.params.productId }); // mogli smo i da chainujemo status: true
    if (!allComments.length) return next(new AppError('There is not any comment for this product', 404));

    return res.status(200).json({
        status: 'success',
        allComments,
    });
});

module.exports = { addProductComment, getProductComments };
