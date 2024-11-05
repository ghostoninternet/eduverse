import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import courseControllers from '../controllers/courseControllers.js'
const courseRouter = express.Router()

courseRouter.get('/search', asyncHandler(courseControllers.searchCourses))

export default courseRouter