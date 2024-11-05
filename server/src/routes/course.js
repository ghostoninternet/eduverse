import express from 'express'
import asyncHandler from '../middlewares/asyncHandler'

const courseRouter = express.Router()

courseRouter.get('/search', asyncHandler())

export default courseRouter