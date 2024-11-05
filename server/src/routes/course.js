import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import courseControllers from '../controllers/courseControllers.js'
const courseRouter = express.Router()

courseRouter.get('/search', asyncHandler(courseControllers.searchCourses))
courseRouter.get('/recommended', asyncHandler(courseControllers.getRecommendedCourses))
courseRouter.get('/free', asyncHandler(courseControllers.getFreeCourses))
courseRouter.get('/popular', asyncHandler(courseControllers.getMostPopularCourses))
export default courseRouter