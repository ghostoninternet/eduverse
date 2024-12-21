import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import authToken from '../middlewares/authToken.js'
import reviewControllers from '../controllers/reviewControllers.js'
import courseDaos from '../daos/courseDaos.js'
import mongoose from 'mongoose';

const reviewRouter = express.Router()

reviewRouter.use(authToken)
reviewRouter.get('/:courseId', async (req, res, next) => {
    const { courseId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      // Tìm kiếm courseId từ courseSlug
      const course = await courseDaos.findCourseBySlug({ courseSlug: courseId });
      if (!course) {
        return res.status(400).json({ error: "Invalid course ID or slug" });
      }
      req.params.courseId = course._id; // Cập nhật params
    }
    next();
  }, asyncHandler(reviewControllers.getCourseReviews));
reviewRouter.post('/', asyncHandler(reviewControllers.createCourseReview))
reviewRouter.put('/:reviewId', asyncHandler(reviewControllers.updateCourseReview))
reviewRouter.delete('/:reviewId', asyncHandler(reviewControllers.deleteCourseReview))

export default reviewRouter