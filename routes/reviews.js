const express = require('express')
const router = express.Router({ mergeParams: true });


const catchAsync = require('../utils/catchAsync')

const Campground = require('../models/campground')
const Review = require('../models/review')

const { validateReview, isReviewAuthor } = require('../middleware')
const { isLoggedIn } = require('../utils/authUser')

//controller
const review = require('../controllers/reviews')


router.post('/', isLoggedIn, validateReview, catchAsync(review.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview))


module.exports = router;