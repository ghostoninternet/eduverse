import express from 'express'
import asyncHandler from '../middlewares/asyncHandler.js'
import uploadControllers from '../controllers/uploadControllers.js'
import uploadHandler from '../middlewares/uploadHandler.js'
const uploadRouter = express.Router()

uploadRouter.post('/image', uploadHandler.uploadImage.single('image'), asyncHandler(uploadControllers.uploadImage))

export default uploadRouter
