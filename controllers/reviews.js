const catchAsync = require('./../utills/catchAsync')
const AppError = require('./../utills/appError')
const Review = require('../models/Review');
const Shop = require('../models/Shop');

// @desc      Get reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/shop/:shop/reviews
// @access    Public
exports.getReviews = catchAsync(async (req, res, next) => {
  if (req.params.shopId) {
    const reviews = await Review.find({ shop: req.params.shopId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'shop',
    select: 'name description'
  });

  if (!review) {
    return next(
      new AppError(`No review found with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc      Add review
// @route     POST /api/v1/shop/:shop/reviews
// @access    Private
exports.addReview = catchAsync(async (req, res, next) => {
  req.body.shop = req.params.shopId;
  req.body.user = req.user.id;

  const shop = await Shop.findById(req.params.shopId);

  if (!shop) {
    return next(
      new AppError(
        `No shop with the id of ${req.params.shopId}`,
        404
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review
  });
});

// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateReview = catchAsync(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new AppError(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError(`Not authorized to update review`, 401));
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: review
  });
});

// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new AppError(`No review with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new AppError(`Not authorized to update review`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
