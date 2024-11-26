import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import enrolledCourseControllers from '../controllers/enrolledCourseControllers.js'
import authToken from '../middlewares/authToken.js'
const enrolledCourseRouter = express.Router()
enrolledCourseRouter.use(authToken)
enrolledCourseRouter.get('/completed', asyncHandler(enrolledCourseControllers.getCompletedEnrolledCourses))
enrolledCourseRouter.get('/inProgress', asyncHandler(enrolledCourseControllers.getInProgressEnrolledCourses))
enrolledCourseRouter.get('/:courseId', asyncHandler(enrolledCourseControllers.getEnrolledCourseDetail))
enrolledCourseRouter.post('/:courseId', asyncHandler(enrolledCourseControllers.createNewEnrolledCourse))
enrolledCourseRouter.put('/video-progress/:courseId', asyncHandler(enrolledCourseControllers.updateEnrolledCourseVideoProgress))
enrolledCourseRouter.put('/exercise-progress/:courseId', asyncHandler(enrolledCourseControllers.updateEnrolledCourseExerciseProgress))
enrolledCourseRouter.delete('/:courseId', asyncHandler(enrolledCourseControllers.deleteEnrolledCourse))

export default enrolledCourseRouter