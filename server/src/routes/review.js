import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import reviewControllers from '../controllers/reviewControllers.js'
const reviewRouter = express.Router()

reviewRouter.get('/:courseSlug', asyncHandler(reviewControllers.getCourseReviews))
reviewRouter.post('/', asyncHandler(reviewControllers.createCourseReview))
reviewRouter.put('/:reviewId', asyncHandler(reviewControllers.updateCourseReview))
reviewRouter.delete('/:reviewId', asyncHandler(reviewControllers.deleteCourseReview))

export default reviewRouter