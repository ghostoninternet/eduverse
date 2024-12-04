import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import courseControllers from '../controllers/courseControllers.js'
const courseRouter = express.Router()

// courseRouter.get('/:courseId', asyncHandler(courseControllers.getCourseDetail))
courseRouter.get('/search', asyncHandler(courseControllers.searchCourses))
courseRouter.get('/recommended', asyncHandler(courseControllers.getRecommendedCourses))
courseRouter.get('/free', asyncHandler(courseControllers.getFreeCourses))
courseRouter.get('/popular', asyncHandler(courseControllers.getMostPopularCourses))

// For instructor, optimized later :v
courseRouter.get('/instructor', asyncHandler(courseControllers.getInstructorCourses))
courseRouter.get('/instructor/search', asyncHandler(courseControllers.searchInstructorCourses))
courseRouter.post('/instructor', asyncHandler(courseControllers.createNewCourse))
courseRouter.get('/instructor/:courseId', asyncHandler(courseControllers.getInstructorCourseDetail))
courseRouter.put('/instructor/:courseId', asyncHandler(courseControllers.updateCourse))
courseRouter.delete('/instructor/:courseId', asyncHandler(courseControllers.deleteCourse))

//the parameter :courseId will include /search, /recommended, /free, /popular route above, so adjust at the end
courseRouter.get('/:courseSlug', asyncHandler(courseControllers.getCourseDetail))
export default courseRouter
