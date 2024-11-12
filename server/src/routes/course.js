import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import courseControllers from '../controllers/courseControllers.js'
const courseRouter = express.Router()

courseRouter.get('/:courseId', asyncHandler(courseControllers.getCourseDetail))
courseRouter.get('/search', asyncHandler(courseControllers.searchCourses))
courseRouter.get('/recommended', asyncHandler(courseControllers.getRecommendedCourses))
courseRouter.get('/free', asyncHandler(courseControllers.getFreeCourses))
courseRouter.get('/popular', asyncHandler(courseControllers.getMostPopularCourses))

// For instructor, optimized later :v
courseRouter.get('/instructor', asyncHandler(courseControllers.getInstructorCourses))
courseRouter.get('/instructor/:courseId', asyncHandler(courseControllers.getInstructorCourseDetail))
courseRouter.get('/instructor/search', asyncHandler(courseControllers.searchInstructorCourses))
courseRouter.post('/instructor', asyncHandler(courseControllers.createNewCourse))
courseRouter.put('/instructor/:exerciseId', asyncHandler(courseControllers.updateCourse))
courseRouter.delete('/instructor/:exerciseId', asyncHandler(courseControllers.deleteCourse))

export default courseRouter