const express = require('express');
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} = require('../controllers/reviews');

const Review = require('../models/Review');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'shop',
      select: 'name description'
    }),
    getReviews
  )

  router
  .route('/:id/reviews')
  .post(addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('customer', 'admin'), updateReview)
  .delete(protect, authorize('customer', 'admin'), deleteReview);

module.exports = router;
