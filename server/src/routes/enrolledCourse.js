import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import enrolledCourseControllers from '../controllers/enrolledCourseControllers.js'

const enrolledCourseRouter = express.Router()

enrolledCourseRouter.get('/:courseId', asyncHandler(enrolledCourseControllers.getEnrolledCourseDetail))
enrolledCourseRouter.post('/:courseId', asyncHandler(enrolledCourseControllers.createNewEnrolledCourse))
enrolledCourseRouter.put('/video-progress/:courseId', asyncHandler(enrolledCourseControllers.updateEnrolledCourseVideoProgress))
enrolledCourseRouter.put('/exercise-progress/:courseId', asyncHandler(enrolledCourseControllers.updateEnrolledCourseExerciseProgress))
enrolledCourseRouter.delete('/:courseId', asyncHandler(enrolledCourseControllers.deleteEnrolledCourse))

export default enrolledCourseRouter