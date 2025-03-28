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
    if (!allComments) return next(new AppError('There is not such product and its comments', 404));

    return res.status(200).json({
        status: 'success',
        allComments,
    });
});

const getAllComments = catchAsync(async (req, res, next) => {
    const allComments = await CommentModel.find({});
    if (!allComments) return next(new AppError(`There is not any comment`, 404));

    res.status(200).json({
        status: 'success',
        allComments,
    });
});

const changeCommentStatus = catchAsync(async (req, res, next) => {
    const changedComment = await CommentModel.findByIdAndUpdate(
        req.body.commentId,
        { status: req.body.status },
        { new: true, runValidators: true }
    );
    if (!changedComment) return next(new AppError('There is not such comment', 404));

    res.status(200).json({
        status: 'success',
        message: 'You have successufully changed comment',
    });
});

const deleteComment = catchAsync(async (req, res, next) => {
    const deletedComment = await CommentModel.deleteOne({ _id: req.params.commentId });
    if (deletedComment.acknowledged && deletedComment.deletedCount === 1) {
        return res.status(200).json({
            status: 'success',
            message: 'Comment succesufully deleted',
        });
    } else {
        return next(new AppError('There is not such comment', 404));
    }
});

module.exports = { addProductComment, getProductComments, getAllComments, changeCommentStatus, deleteComment };
